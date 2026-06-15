"use client";

import { AlertTriangle, ChevronRight, TrendingUp, Cpu, Zap } from "lucide-react";
import { analyzeDraft } from "@/lib/draft";
import { ListBlock, Metric, Phase, ScoreBar } from "@/components/fields";

export function DraftResult({
  analysis,
  showDetails,
  toggleDetails,
}: {
  analysis: ReturnType<typeof analyzeDraft>;
  showDetails: boolean;
  toggleDetails: () => void;
}) {
  const best = analysis.best;

  return (
    <section className="panel" aria-label="Resultado del analisis">
      <div className="panelHeader resultHeader">
        <div>
          <h3 className="panelTitle">Análisis del Draft</h3>
          <p className="panelNote">{analysis.freshnessWarning}</p>
        </div>
        {best && (
          <button className="detailsToggleBtn" onClick={toggleDetails}>
            {showDetails ? "Ocultar desglose" : "Ver desglose de puntuación"}
          </button>
        )}
      </div>
      <div className="panelBody">
        {best ? (
          <div className="recommendationStack">
            <div className="resultHero">
              <div className="resultTopline">
                <div>
                  <span className="metricLabel primaryLabel">PICK RECOMENDADO</span>
                  <h3 className="resultName">{best.hero.name}</h3>
                </div>
                <div className="scoreBlock">
                  <span className="scoreBadge">{best.total}</span>
                  <span className="scoreLabel">puntos totales</span>
                </div>
              </div>

              {showDetails && (
                <div className="scoreDetailsGrid">
                  <h4 className="detailSectionTitle">Desglose del Motor de Reglas</h4>
                  <ScoreBar label="Comfort Pool" value={best.scores.comfort} max={29} color="#805AD5" />
                  <ScoreBar label="Matchup en Línea" value={best.scores.laneMatchup} max={24} color="#38A169" />
                  <ScoreBar label="Sinergia de Equipo" value={best.scores.teamSynergy} max={22} color="#3182CE" />
                  <ScoreBar label="Fuerza del Counter" value={best.scores.counterValue} max={18} min={-8} color="#D69E2E" />
                  <ScoreBar label="Modificador del Parche" value={best.scores.patchValue} max={8} min={-8} color="#E53E3E" />
                  <ScoreBar label="Riesgo de Ejecución" value={-best.scores.executionRisk} max={0} min={-15} color="#9B2C2C" />
                </div>
              )}

              <div className="reasonBlock">
                <span className="blockLabel">Factores Decisivos:</span>
                <ul className="reasonList">
                  {best.reasons.map((reason) => (
                    <li key={reason}>
                      <ChevronRight size={14} className="listChevron" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tagRow">
                <span className="tag green">Confianza {best.confidence}</span>
                {best.risks.map((risk) => (
                  <span className="tag red" key={risk}>
                    <AlertTriangle size={12} className="alertIcon" />
                    {risk}
                  </span>
                ))}
              </div>
            </div>

            <div className="miniGrid">
              <Metric label="Compras iniciales recomendadas" value={best.startingItems.join(", ")} icon={<Zap size={14} className="iconAmber" />} />
              <Metric label="Primer Core timings" value={best.firstCore.join(" ➔ ")} icon={<TrendingUp size={14} className="iconGreen" />} />
              <Metric label="Carencias que debes cubrir" value={analysis.teamNeeds.slice(0, 3).join(" / ") || "Composición balanceada"} icon={<Cpu size={14} className="iconPurple" />} />
              <Metric label="Win-Conditions enemigas" value={analysis.enemyThreats.join(" / ") || "Sin amenazas de late críticas"} icon={<AlertTriangle size={14} className="iconRed" />} />
            </div>

            <div className="planSection">
              <span className="blockLabel">Plan táctico por fases:</span>
              <div className="planGrid">
                <Phase title="Línea (Min 0-5)" text={best.plan.early} />
                <Phase title="Timings (Min 5-15)" text={best.plan.mid} />
                <Phase title="Objetivo Clave" text={best.plan.objective} />
              </div>
            </div>

            <div className="miniGrid">
              <ListBlock
                title="Otras alternativas viables"
                items={analysis.alternatives.map((pick) => `${pick.hero.name} (${pick.total} pts)`)}
                type="good"
              />
              <ListBlock
                title="Picks con alto riesgo (Evitar)"
                items={analysis.avoid.map((pick) => `${pick.hero.name}: ${pick.risks[0] ?? "Sin stuns / no encaja"}`)}
                type="bad"
              />
            </div>
          </div>
        ) : (
          <div className="emptyState">
            <AlertTriangle size={36} className="emptyStateIcon" />
            <p className="emptyStateText">Tu pool de héroes está vacío para el rol seleccionado o no hay coincidencias configuradas.</p>
          </div>
        )}
      </div>
    </section>
  );
}
