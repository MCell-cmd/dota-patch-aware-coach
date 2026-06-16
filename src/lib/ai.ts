// Capa de IA: redacta el reporte en español sobre datos estructurados.
// Si no hay ANTHROPIC_API_KEY, la app sigue funcionando con el reporte
// determinista (la IA explica, no es la fuente de verdad).

import Anthropic from "@anthropic-ai/sdk";
import type { MockReplayReport } from "@/data/dota";
import type { ReportFacts } from "@/lib/report";

const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-6";

export function aiEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const phaseSchema = {
  type: "object" as const,
  properties: {
    good: { type: "string" as const },
    error: { type: "string" as const },
    change: { type: "string" as const },
  },
  required: ["good", "error", "change"],
};

// La IA SOLO emite prosa. Las cifras e identificadores (matchId, hero, result…)
// nunca entran en este esquema: se toman tal cual del reporte determinista al
// fusionar. Así es imposible que la IA altere un dato duro.
const REPORT_TOOL: Anthropic.Tool = {
  name: "emit_coaching_report",
  description:
    "Entrega el reporte de coaching final con la redacción mejorada en español. Usa solo las cifras de FACTS.",
  input_schema: {
    type: "object",
    properties: {
      verdict: { type: "string" },
      phases: {
        type: "object",
        properties: { lane: phaseSchema, mid: phaseSchema, late: phaseSchema },
        required: ["lane", "mid", "late"],
      },
      errors: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            evidence: { type: "string" },
            impact: { type: "string" },
            fix: { type: "string" },
            practice: { type: "string" },
          },
          required: ["title", "evidence", "impact", "fix", "practice"],
        },
      },
      plan: { type: "array", items: { type: "string" } },
      nextSteps: {
        type: "object",
        properties: {
          objective: { type: "string" },
          metric: { type: "string" },
          question: { type: "string" },
        },
        required: ["objective", "metric", "question"],
      },
    },
    required: ["verdict", "phases", "errors", "plan", "nextSteps"],
  },
};

/**
 * Toma los hechos verificados + el reporte determinista como andamiaje y pide a
 * Claude que mejore la redacción en español de coach. Usa tool use con esquema
 * forzado: el modelo está obligado a devolver la estructura exacta, así no hay
 * que parsear JSON "a pelo" ni arriesgarse a truncados silenciosos. Si algo
 * falla, devuelve el reporte determinista intacto (y lo registra).
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
    "Entrega el resultado llamando a la herramienta emit_coaching_report, mejorando la redacción de los campos de texto respecto al SCAFFOLD sin alterar ninguna cifra.",
  ].join("\n");

  const user = [
    "FACTS (fuente de verdad, datos reales de OpenDota):",
    JSON.stringify(facts, null, 2),
    "",
    "SCAFFOLD (reporte base determinista; mejora la prosa pero conserva las cifras):",
    JSON.stringify(deterministic, null, 2),
    "",
    "Llama a emit_coaching_report con el reporte final.",
  ].join("\n");

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system,
      tools: [REPORT_TOOL],
      tool_choice: { type: "tool", name: REPORT_TOOL.name },
      messages: [{ role: "user", content: user }],
    });

    const toolUse = response.content.find(
      (block): block is Anthropic.ToolUseBlock =>
        block.type === "tool_use" && block.name === REPORT_TOOL.name,
    );
    if (!toolUse) {
      console.warn("[ai] La respuesta no incluyó tool_use; uso el reporte determinista.");
      return { report: deterministic, source: "deterministic" };
    }

    const prose = toolUse.input as Partial<MockReplayReport>;

    // Blindaje: identificadores y estructura vienen del motor; de la IA solo la
    // prosa, y cada campo cae al determinista si no llega bien formado.
    const merged: MockReplayReport = {
      ...deterministic,
      verdict: typeof prose.verdict === "string" ? prose.verdict : deterministic.verdict,
      phases: isValidPhases(prose.phases) ? prose.phases : deterministic.phases,
      errors: isValidErrors(prose.errors) ? prose.errors : deterministic.errors,
      plan: isStringArray(prose.plan) ? prose.plan : deterministic.plan,
      nextSteps: isValidNextSteps(prose.nextSteps) ? prose.nextSteps : deterministic.nextSteps,
    };
    return { report: merged, source: "ai" };
  } catch (error) {
    console.error("[ai] enrichReportWithAI falló; uso el reporte determinista:", error);
    return { report: deterministic, source: "deterministic" };
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every((v) => typeof v === "string");
}

function isPhase(value: unknown): value is { good: string; error: string; change: string } {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return typeof p.good === "string" && typeof p.error === "string" && typeof p.change === "string";
}

function isValidPhases(value: unknown): value is MockReplayReport["phases"] {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return isPhase(p.lane) && isPhase(p.mid) && isPhase(p.late);
}

function isValidErrors(value: unknown): value is MockReplayReport["errors"] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((e) => {
      if (!e || typeof e !== "object") return false;
      const x = e as Record<string, unknown>;
      return (
        typeof x.title === "string" &&
        typeof x.evidence === "string" &&
        typeof x.impact === "string" &&
        typeof x.fix === "string" &&
        typeof x.practice === "string"
      );
    })
  );
}

function isValidNextSteps(value: unknown): value is MockReplayReport["nextSteps"] {
  if (!value || typeof value !== "object") return false;
  const n = value as Record<string, unknown>;
  return (
    typeof n.objective === "string" &&
    typeof n.metric === "string" &&
    typeof n.question === "string"
  );
}
