/* global console, document, localStorage, process, window */

import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import path from "node:path";
import { chromium } from "playwright";

const URL = process.env.AUDIT_URL || "http://127.0.0.1:3000";
const OUT_DIR = process.env.AUDIT_OUT_DIR || "reports/web-audit/latest";
const PORT = Number(process.env.AUDIT_DEBUG_PORT || 9223);
const isCI = Boolean(process.env.CI);

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 720 },
  { name: "mobile", width: 390, height: 844 },
];

function scoreCategory(lhr, key) {
  return Math.round((lhr.categories[key]?.score ?? 0) * 100);
}

function makeRecommendation(severity, title, detail) {
  return { severity, title, detail };
}

async function collectLayoutSignals(browser, viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem("dpac.onboarded.v1", "1"));
  await page.goto(URL, { waitUntil: "networkidle" });

  const signals = await page.evaluate(() => {
    const box = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    };

    const panels = [...document.querySelectorAll(".panel")].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        title: el.querySelector(".panelTitle")?.textContent?.trim() || "Panel",
        y: Math.round(r.y),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    });

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      scrollHeight: document.documentElement.scrollHeight,
      header: box(".topBar"),
      mainGrid: box(".mainGrid"),
      sideNav: box(".sideNav"),
      workspace: box(".workspace"),
      toolHeader: box(".toolHeader"),
      contentGrid: box(".contentGrid"),
      panels,
      heroButtons: document.querySelectorAll(".heroButton").length,
    };
  });

  await context.close();
  return signals;
}

function layoutRecommendations(name, signals) {
  const recs = [];
  const scrollRatio = signals.scrollHeight / signals.viewport.height;
  const headerRatio = (signals.header?.height || 0) / signals.viewport.height;
  const tallPanels = signals.panels.filter((panel) => panel.height > signals.viewport.height * 1.25);

  if (scrollRatio > 2.1) {
    recs.push(
      makeRecommendation(
        "high",
        `${name}: excessive vertical depth`,
        `Document is ${scrollRatio.toFixed(1)}x the viewport height. Prioritize the recommendation panel above secondary inputs, collapse long pickers, or move hero selection into tabs/drawers.`,
      ),
    );
  }

  if (headerRatio > 0.18) {
    recs.push(
      makeRecommendation(
        "medium",
        `${name}: header consumes too much first-screen space`,
        `Header uses ${Math.round(headerRatio * 100)}% of viewport height. Compact status pills or move secondary status below the fold on small screens.`,
      ),
    );
  }

  for (const panel of tallPanels) {
    recs.push(
      makeRecommendation(
        "medium",
        `${name}: ${panel.title} panel is too tall`,
        `${panel.title} is ${panel.height}px tall. Cap internal picker heights, avoid equal-height grid stretching, and keep the primary recommendation sticky or independently sized.`,
      ),
    );
  }

  if (signals.viewport.width >= 1100 && signals.sideNav?.width >= 220) {
    recs.push(
      makeRecommendation(
        "low",
        `${name}: side navigation is expensive`,
        `Side nav takes ${signals.sideNav.width}px before content starts. A compact icon rail or top segmented mode switch would recover horizontal space for dense coaching data.`,
      ),
    );
  }

  return recs;
}

async function run() {
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    channel: isCI ? undefined : "chrome",
    headless: true,
    args: [`--remote-debugging-port=${PORT}`],
  });

  try {
    const lighthouseResult = await lighthouse(
      URL,
      {
        port: PORT,
        output: ["json", "html"],
        logLevel: "error",
      },
      undefined,
    );

    if (!lighthouseResult) {
      throw new Error("Lighthouse did not return a result.");
    }

    const [jsonReport, htmlReport] = lighthouseResult.report;
    await fs.writeFile(path.join(OUT_DIR, "lighthouse.json"), jsonReport);
    await fs.writeFile(path.join(OUT_DIR, "lighthouse.html"), htmlReport);

    const axeContext = await browser.newContext();
    const page = await axeContext.newPage();
    await page.addInitScript(() => localStorage.setItem("dpac.onboarded.v1", "1"));
    await page.goto(URL, { waitUntil: "networkidle" });
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    await axeContext.close();

    const layout = [];
    let recommendations = [];
    for (const viewport of viewports) {
      const signals = await collectLayoutSignals(browser, viewport);
      layout.push({ name: viewport.name, ...signals });
      recommendations = recommendations.concat(layoutRecommendations(viewport.name, signals));
    }

    const lhr = lighthouseResult.lhr;
    const scores = {
      performance: scoreCategory(lhr, "performance"),
      accessibility: scoreCategory(lhr, "accessibility"),
      bestPractices: scoreCategory(lhr, "best-practices"),
      seo: scoreCategory(lhr, "seo"),
    };

    if (scores.performance < 80) {
      recommendations.push(
        makeRecommendation(
          "high",
          "Improve Lighthouse performance",
          `Performance scored ${scores.performance}. Open reports/web-audit/latest/lighthouse.html for the exact audits.`,
        ),
      );
    }

    if (axe.violations.length > 0) {
      recommendations.push(
        makeRecommendation(
          "high",
          "Fix automated accessibility violations",
          `${axe.violations.length} WCAG-related violations detected by axe. See axe.json for selectors and rule ids.`,
        ),
      );
    }

    const summary = {
      url: URL,
      generatedAt: new Date().toISOString(),
      scores,
      axeViolations: axe.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        nodes: violation.nodes.length,
      })),
      layout,
      recommendations,
    };

    await fs.writeFile(path.join(OUT_DIR, "axe.json"), JSON.stringify(axe, null, 2));
    await fs.writeFile(path.join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2));

    console.log(`Web audit complete for ${URL}`);
    console.log(JSON.stringify({ scores, recommendations: recommendations.slice(0, 8) }, null, 2));
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
