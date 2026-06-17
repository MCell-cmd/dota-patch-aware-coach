// Capa de IA: redacta el reporte en español sobre datos estructurados.
// Si no hay OPENROUTER_API_KEY, la app sigue funcionando con el reporte
// determinista (la IA explica, no es la fuente de verdad).

import type { ReplayReport } from "@/data/dota";
import type { ReportFacts } from "@/lib/report";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "deepseek/deepseek-v4-flash";
const MODEL = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

export function aiEnabled(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

const phaseSchema = {
  type: "object" as const,
  properties: {
    good: { type: "string" as const },
    error: { type: "string" as const },
    change: { type: "string" as const },
  },
  required: ["good", "error", "change"],
  additionalProperties: false,
};

// La IA SOLO emite prosa. Las cifras e identificadores (matchId, hero, result…)
// nunca entran en este esquema: se toman tal cual del reporte determinista al
// fusionar. Así es imposible que la IA altere un dato duro.
const REPORT_TOOL = {
  type: "function" as const,
  function: {
    name: "emit_coaching_report",
    description:
      "Entrega el reporte de coaching final con la redacción mejorada en español. Usa solo las cifras de FACTS.",
    parameters: {
      type: "object",
      properties: {
        verdict: { type: "string" },
        phases: {
          type: "object",
          properties: { lane: phaseSchema, mid: phaseSchema, late: phaseSchema },
          required: ["lane", "mid", "late"],
          additionalProperties: false,
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
            additionalProperties: false,
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
          additionalProperties: false,
        },
      },
      required: ["verdict", "phases", "errors", "plan", "nextSteps"],
      additionalProperties: false,
    },
  },
};

type OpenRouterToolCall = {
  id?: string;
  type?: string;
  function?: { name?: string; arguments?: string };
};
type OpenRouterChoice = {
  message?: { content?: string | null; tool_calls?: OpenRouterToolCall[] };
  finish_reason?: string;
};
type OpenRouterResponse = { choices?: OpenRouterChoice[]; error?: { message?: string } };

/**
 * Toma los hechos verificados + el reporte determinista como andamiaje y pide a
 * OpenRouter (DeepSeek por defecto) que mejore la redacción en español de coach.
 * Usa tool calling con esquema forzado: el modelo está obligado a devolver la
 * estructura exacta, así no hay que parsear JSON "a pelo" ni arriesgarse a
 * truncados silenciosos. Si algo falla, devuelve el reporte determinista
 * intacto (y lo registra).
 */
export async function enrichReportWithAI(
  facts: ReportFacts,
  deterministic: ReplayReport,
): Promise<{ report: ReplayReport; source: "ai" | "deterministic" }> {
  if (!aiEnabled()) {
    return { report: deterministic, source: "deterministic" };
  }

  const system = [
    "Eres un coach profesional de Dota 2 que escribe en español claro y directo.",
    "Reglas duras:",
    "- Solo puedes usar las cifras y hechos que se te entregan en FACTS. No inventes timings, ítems ni eventos que no estén en los datos.",
    "- Si un dato no está disponible, no lo afirmes; habla en términos de los hechos dados.",
    "- Respeta facts.roleGroup: no evalúes supports como cores, ni carries como supports. El diagnóstico debe priorizar métricas y decisiones propias del rol.",
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

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  };
  // Atribución opcional para el ranking de apps de OpenRouter.
  if (process.env.NEXT_PUBLIC_SITE_URL) headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_SITE_URL;
  headers["X-Title"] = "Dota Patch-Aware Coach";

  try {
    const res = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4000,
        temperature: 0.3,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        tools: [REPORT_TOOL],
        tool_choice: { type: "function", function: { name: REPORT_TOOL.function.name } },
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[ai] OpenRouter HTTP ${res.status}: ${detail.slice(0, 300)}`);
      return { report: deterministic, source: "deterministic" };
    }

    const payload = (await res.json()) as OpenRouterResponse;
    if (payload.error) {
      console.error(`[ai] OpenRouter error: ${payload.error.message ?? "desconocido"}`);
      return { report: deterministic, source: "deterministic" };
    }

    const toolCall = payload.choices?.[0]?.message?.tool_calls?.find(
      (call) => call.function?.name === REPORT_TOOL.function.name,
    );
    if (!toolCall?.function?.arguments) {
      console.warn("[ai] La respuesta no incluyó tool_calls; uso el reporte determinista.");
      return { report: deterministic, source: "deterministic" };
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch (parseError) {
      console.error("[ai] Argumentos del tool no son JSON válido:", parseError);
      return { report: deterministic, source: "deterministic" };
    }
    const prose = parsed as Partial<ReplayReport>;

    // Blindaje: identificadores y estructura vienen del motor; de la IA solo la
    // prosa, y cada campo cae al determinista si no llega bien formado.
    const merged: ReplayReport = {
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

function isValidPhases(value: unknown): value is ReplayReport["phases"] {
  if (!value || typeof value !== "object") return false;
  const p = value as Record<string, unknown>;
  return isPhase(p.lane) && isPhase(p.mid) && isPhase(p.late);
}

function isValidErrors(value: unknown): value is ReplayReport["errors"] {
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

function isValidNextSteps(value: unknown): value is ReplayReport["nextSteps"] {
  if (!value || typeof value !== "object") return false;
  const n = value as Record<string, unknown>;
  return (
    typeof n.objective === "string" &&
    typeof n.metric === "string" &&
    typeof n.question === "string"
  );
}
