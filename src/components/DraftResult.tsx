"use client";

import { AlertTriangle, ChevronRight, TrendingUp, Cpu, Zap } from "lucide-react";
import { DraftAnalysis } from "@/lib/draft";
import { heroImageUrl } from "@/data/dota";
import { ListBlock, Metric, Phase, ScoreBar } from "@/components/fields";
import { RadialScore } from "@/components/RadialScore";
import { RadarChart } from "@/components/RadarChart";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export function DraftResult({
  analysis,
  isAnalyzingDraft,
  draftError,
  showDetails,
  toggleDetails,
}: {
  analysis: DraftAnalysis | null;
  isAnalyzingDraft: boolean;
  draftError: string | null;
  showDetails: boolean;
  toggleDetails: () => void;
}) {
  if (isAnalyzingDraft) {
    return (
      <section className="panel" aria-label="Analizando draft" data-tour="draft-result">
        <div className="panelHeader">
          <h3 className="panelTitle">Análisis del Draft</h3>
        </div>
        <div className="panelBody">
          <div className="loadingState" style={{ minHeight: "260px" }}>
            <Cpu size={36} className="spinIcon textRed" />
            <span className="loadingTitle">Calculando scoring en el servidor...</span>
          </div>
        </div>
      </section>
    );
  }

  if (draftError) {
    return (
      <section className="panel" aria-label="Error de análisis" data-tour="draft-result">
        <div className="panelHeader">
          <h3 className="panelTitle">Análisis del Draft</h3>
        </div>
        <div className="panelBody">
          <div className="emptyState" style={{ minHeight: "260px" }}>
            <AlertTriangle size={36} className="emptyStateIcon" />
            <h4 className="emptyStateTitle" style={{ color: "var(--red)" }}>Fallo de conexión</h4>
            <p className="emptyStateText">{draftError}</p>
          </div>
        </div>
      </section>
    );
  }

  const best = analysis?.best;

  return (
    <section className="panel" aria-label="Resultado del análisis" data-tour="draft-result">
      <div className="panelHeader resultHeader">
        <div>
          <h3 className="panelTitle">Análisis del Draft</h3>
          <p className="panelNote">{analysis?.freshnessWarning}</p>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="resultHeroImg" src={heroImageUrl(best.hero.id)} alt="" loading="lazy" decoding="async" aria-hidden="true" />
              <div className="resultTopline">
                <div>
                  <span className="metricLabel primaryLabel">PICK RECOMENDADO</span>
                  <h3 className="resultName">{best.hero.name}</h3>
                </div>
                <div className="scoreBlock">
                  <RadialScore value={best.total} />
                </div>
              </div>

              {showDetails && (
                <div className="scoreDetailsGrid">
                  <h4 className="detailSectionTitle">Desglose del Motor de Reglas</h4>
                  <div className="radarWrap">
                    <RadarChart
                      data={[
                        { label: "Comfort", value: clamp01(best.scores.comfort / 29) },
                        { label: "Línea", value: clamp01(best.scores.laneMatchup / 24) },
                        { label: "Sinergia", value: clamp01(best.scores.teamSynergy / 22) },
                        { label: "Counter", value: clamp01((best.scores.counterValue + 8) / 26) },
                        { label: "Parche", value: clamp01((best.scores.patchValue + 8) / 16) },
                        { label: "Seguridad", value: clamp01((15 - best.scores.executionRisk) / 15) },
                      ]}
                    />
                  </div>
                  <ScoreBar label="Comfort Pool" value={best.scores.comfort} max={29} color="#805AD5" help="Qué tan cómodo es el héroe en tu pool y rol. Premia lo que ya dominas." />
                  <ScoreBar label="Matchup en Línea" value={best.scores.laneMatchup} max={24} color="#38A169" help="Qué tan bien se planta en la fase de línea contra lo visible del rival." />
                  <ScoreBar label="Sinergia de Equipo" value={best.scores.teamSynergy} max={22} color="#3182CE" help="Cuánto combina con los aliados ya elegidos (combos, setups, protección)." />
                  <ScoreBar label="Fuerza del Counter" value={best.scores.counterValue} max={18} min={-8} color="#D69E2E" help="Cuánto castiga a los enemigos elegidos. Puede ser negativo si lo countean a él." />
                  <ScoreBar label="Modificador del Parche" value={best.scores.patchValue} max={8} min={-8} color="#E53E3E" help="Buff o nerf del parche activo. Positivo = favorecido este parche." />
                  <ScoreBar label="Riesgo de Ejecución" value={-best.scores.executionRisk} max={0} min={-15} color="#9B2C2C" help="Penalización por dificultad: cuanto más difícil de ejecutar para tu rango, más resta." />
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
            <h4 className="emptyStateTitle">Marca tu pool de héroes</h4>
            <p className="emptyStateText">
              Selecciona en <strong>&quot;Mi Pool de Héroes&quot;</strong> al menos un héroe que juegues en
              este rol. El motor solo recomienda picks que tú dominas.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
