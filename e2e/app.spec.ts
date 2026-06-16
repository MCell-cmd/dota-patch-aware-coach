import { test, expect } from "@playwright/test";

async function gotoApp(page: import("@playwright/test").Page) {
  await page.goto("/");
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("dpac.onboarded.v1", "1"));
});

test("la home carga con el draft y una recomendacion", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".brandTitle")).toBeVisible();
  await expect(page.locator(".resultName")).toBeVisible();
  const heroCount = await page.locator(".heroGrid .heroButton").count();
  expect(heroCount).toBeGreaterThan(5);
  expect(heroCount).toBeLessThan(30);
});

test("el pool propio se filtra por rol seleccionado", async ({ page }) => {
  await gotoApp(page);
  const pool = page.locator(".fieldGroup").filter({ hasText: "Mi Pool de Héroes" });

  await expect(pool.getByRole("button", { name: /Viper/ })).toBeVisible();
  await expect(pool.getByRole("button", { name: /Juggernaut/ })).toHaveCount(0);

  await page.getByRole("radio", { name: "Carry" }).click();
  await expect(pool.getByRole("button", { name: /Juggernaut/ })).toBeVisible();
  await expect(pool.getByRole("button", { name: /Drow Ranger/ })).toBeVisible();
  await expect(pool.getByRole("button", { name: /Zeus/ })).toHaveCount(0);

  await page.getByRole("radio", { name: "Support 5" }).click();
  await expect(pool.getByRole("button", { name: /Crystal Maiden/ })).toBeVisible();
  await expect(pool.getByRole("button", { name: /Oracle/ })).toBeVisible();
  await expect(pool.getByRole("button", { name: /Viper/ })).toHaveCount(0);
});

test("aliados y enemigos tambien muestran el roster completo", async ({ page }) => {
  await gotoApp(page);
  const allyColumn = page.locator(".fieldGroup").filter({ hasText: "Aliados ya elegidos" });
  const enemyColumn = page.locator(".fieldGroup").filter({ hasText: "Enemigos ya elegidos" });

  await expect(allyColumn.getByRole("button", { name: /Abaddon/ })).toBeVisible();
  await expect(enemyColumn.getByRole("button", { name: /Abaddon/ })).toBeVisible();
  expect(await allyColumn.locator(".slotButton").count()).toBeGreaterThan(100);
  expect(await enemyColumn.locator(".slotButton").count()).toBeGreaterThan(100);
});

test("el desglose muestra el radar de scoring", async ({ page }) => {
  await gotoApp(page);
  await page.locator(".detailsToggleBtn").click();
  await expect(page.locator(".radarChart")).toBeVisible();
});

test("cambiar el pool actualiza la recomendacion sin romper", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".resultName")).toBeVisible();
  await page.locator(".heroButton", { hasText: "Shadow Fiend" }).click();
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".resultName")).toBeVisible();
  await expect(page.locator(".radialScoreNum")).toBeVisible();
});

test("el buscador del pool filtra heroes", async ({ page }) => {
  await gotoApp(page);
  await page.getByLabel(/Buscar en Mi Pool/).fill("queen");
  await expect(page.locator(".heroButton")).toHaveCount(1);
  await expect(page.locator(".heroButton")).toContainText("Queen of Pain");
});

test("vaciar el pool pide marcar heroes en vez de recomendar al azar", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".resultName")).toBeVisible();
  const selected = page.locator('.heroButton[aria-pressed="true"]');
  while ((await selected.count()) > 0) {
    await selected.first().click();
  }
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".resultName")).toHaveCount(0);
  await expect(page.getByText(/Marca tu pool/i)).toBeVisible({ timeout: 10_000 });
});

test("cambiar enemigos visibles cambia el pick recomendado", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".resultName")).toHaveText("Viper");

  const enemyColumn = page.locator(".fieldGroup").filter({ hasText: "Enemigos ya elegidos" });
  await enemyColumn.getByRole("button", { name: /Phantom Assassin/ }).click();
  await enemyColumn.getByRole("button", { name: /Lion/ }).click();
  await enemyColumn.getByRole("button", { name: /Tidehunter/ }).click();
  await enemyColumn.getByRole("button", { name: /Queen of Pain/ }).click();

  await expect(page.locator(".resultName")).not.toHaveText("Viper", { timeout: 10_000 });
});

test("navegacion entre las pestanas principales usa rutas reales", async ({ page }) => {
  await gotoApp(page);
  await page.getByRole("button", { name: /Patch Coach/ }).click();
  await expect(page).toHaveURL(/\/patch$/);
  await expect(page.locator(".toolTitle")).toContainText(/parche/i);

  await page.getByRole("button", { name: /Vision Coach/ }).click();
  await expect(page).toHaveURL(/\/vision$/);
  await expect(page.locator(".toolTitle")).toContainText(/vision/i);

  await page.getByRole("button", { name: /Replay Analysis/ }).click();
  await expect(page).toHaveURL(/\/replay$/);
  await expect(page.locator(".toolTitle")).toContainText(/post-partida/i);
});

test("cada modo tiene ruta directa", async ({ page }) => {
  await page.goto("/draft");
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
  await expect(page.locator(".toolTitle")).toContainText(/draft/i);

  await page.goto("/patch");
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
  await expect(page.locator(".toolTitle")).toContainText(/parche/i);

  await page.goto("/vision");
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
  await expect(page.locator(".toolTitle")).toContainText(/vision/i);

  await page.goto("/replay");
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
  await expect(page.locator(".toolTitle")).toContainText(/post-partida/i);
});

test("vision coach permite seleccionar escenarios", async ({ page }) => {
  await gotoApp(page);
  await page.getByRole("button", { name: /Vision Coach/ }).click();
  await expect(page.locator(".toolTitle")).toContainText(/vision/i);
  await page.getByRole("button", { name: /Late/ }).click();
  await page.getByRole("button", { name: /Roshan late/ }).click();
  await expect(page.locator(".panelTitle").filter({ hasText: "Roshan late" })).toBeVisible();
});

test("replay: un match ID invalido muestra un error claro", async ({ page }) => {
  await page.goto("/replay");
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
  await page.locator("#matchIdInput").fill("123");
  await page.locator(".runActionBtn").click();
  await expect(page.locator(".displayPanelBody .emptyStateTitle")).toContainText(/no se pudo/i);
  await expect(page.locator(".displayPanelBody .emptyStateText")).toContainText(/inv/i);
});

test("la pagina de privacidad carga", async ({ page }) => {
  await page.goto("/privacidad");
  await expect(page.locator(".legalTitle")).toContainText("Privacidad");
  await page.getByRole("link", { name: /Volver al coach/ }).click();
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
  await expect(page.locator(".brandTitle")).toBeVisible();
});
