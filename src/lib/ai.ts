// Capa de IA: redacta el reporte en español sobre datos estructurados.
// Si no hay ANTHROPIC_API_KEY, la app sigue funcionando con el reporte
// determinista (la IA explica, no es la fuente de verdad).

import Anthropic from "@anthropic-ai/sdk";
import type { MockReplayReport } from "@/data/dota";
import type { ReportFacts } from "@/lib/report";

const MODEL = process.env.CLAUDE_MODEL || "claude-opus-4-8";

export function aiEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/**
 * Toma los hechos verificados + el reporte determinista como andamiaje y pide a
 * Claude que mejore la redacción en español de coach. Nunca inventa cifras: el
 * prompt fija las métricas como fuente de verdad. Si algo falla, devuelve el
 * reporte determinista intacto.
 */
export async function enrichReportWithAI(
  facts: ReportFacts,
  deterministic: MockReplayReport,
): Promise<{ report: MockReplayReport; source: "ai" | "deterministic" }> {
  if (!aiEnabled()) {
    return { report: deterministic, source: "deterministic" };
  }

  const client = new Anthropic();

  const system = [
    "Eres un coach profesional de Dota 2 que escribe en español claro y directo.",
    "Reglas duras:",
    "- Solo puedes usar las cifras y hechos que se te entregan en FACTS. No inventes timings, ítems ni eventos que no estén en los datos.",
    "- Si un dato no está disponible, no lo afirmes; habla en términos de los hechos dados.",
    "- Mantén el tono accionable: cada error debe tener evidencia, impacto y una corrección concreta.",
    "Devuelve EXCLUSIVAMENTE un objeto JSON con la misma forma que SCAFFOLD, mejorando la redacción de los campos de texto. No cambies matchId, duration, result, hero, role ni bracket.",
  ].join("\n");

  const user = [
    "FACTS (fuente de verdad, datos reales de OpenDota):",
    JSON.stringify(facts, null, 2),
    "",
    "SCAFFOLD (reporte base determinista; mejora la prosa pero conserva la estructura y las cifras):",
    JSON.stringify(deterministic, null, 2),
    "",
    "Responde solo con el JSON del reporte final.",
  ].join("\n");

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      thinking: { type: "adaptive" },
      system,
      messages: [{ role: "user", content: user }],
    });

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    const parsed = parseReport(text);
    if (!parsed) return { report: deterministic, source: "deterministic" };

    // Blindaje: las cifras/identificadores duros vienen del motor, no de la IA.
    const merged: MockReplayReport = {
      ...parsed,
      matchId: deterministic.matchId,
      duration: deterministic.duration,
      result: deterministic.result,
      hero: deterministic.hero,
      role: deterministic.role,
      bracket: deterministic.bracket,
      question: deterministic.question,
    };
    return { report: merged, source: "ai" };
  } catch {
    return { report: deterministic, source: "deterministic" };
  }
}

function parseReport(text: string): MockReplayReport | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const obj = JSON.parse(text.slice(start, end + 1));
    if (
      obj &&
      typeof obj.verdict === "string" &&
      obj.phases &&
      Array.isArray(obj.errors) &&
      Array.isArray(obj.plan)
    ) {
      return obj as MockReplayReport;
    }
    return null;
  } catch {
    return null;
  }
}
