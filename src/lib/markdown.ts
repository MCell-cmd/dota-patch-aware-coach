import type { ReplayReport } from "@/data/dota";

export function generateMarkdown(report: ReplayReport) {
  return `
# REPORTE DE COACHING - DOTA 2
**Match ID:** ${report.matchId}
**Resultado:** ${report.result} | **Duración:** ${report.duration}
**Héroe:** ${report.hero} | **Rol:** ${report.role} | **Bracket:** ${report.bracket}

## PREGUNTA DEL JUGADOR
> "${report.question}"

## VEREDICTO DEL COACH
${report.verdict}

## ANÁLISIS POR FASES
### Fase de Líneas
- **Logro:** ${report.phases.lane.good}
- **Error:** ${report.phases.lane.error}
- **Recomendación:** ${report.phases.lane.change}

### Mid Game
- **Logro:** ${report.phases.mid.good}
- **Error:** ${report.phases.mid.error}
- **Recomendación:** ${report.phases.mid.change}

### Late Game
- **Logro:** ${report.phases.late.good}
- **Error:** ${report.phases.late.error}
- **Recomendación:** ${report.phases.late.change}

## ERRORES MÁS CAROS
${report.errors
  .map(
    (err, idx) => `
### ${idx + 1}. ${err.title}
- **Evidencia:** ${err.evidence}
- **Impacto:** ${err.impact}
- **Corrección:** ${err.fix}
- **Ejercicio:** ${err.practice}
`,
  )
  .join("\n")}

## PLAN DE ACCIÓN DE 7 DÍAS
${report.plan.map((p) => `- ${p}`).join("\n")}

## PRÓXIMA PARTIDA
- **Objetivo único:** ${report.nextSteps.objective}
- **Métrica Clave:** ${report.nextSteps.metric}
- **Pregunta de Revisión:** ${report.nextSteps.question}
    `.trim();
}
