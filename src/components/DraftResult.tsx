"use client";

import {
  AlertTriangle,
  ChevronRight,
  Clock3,
  Cpu,
  ShieldAlert,
  TrendingUp,
  Zap,
} from "lucide-react";
import { DraftAnalysis } from "@/lib/draft";
import { heroImageUrl } from "@/data/dota";
import { HERO_ROSTER_BY_ID } from "@/data/heroRoster.generated";
import { ListBlock, Metric, ScoreBar } from "@/components/fields";
import { RadialScore } from "@/components/RadialScore";
import { RadarChart } from "@/components/RadarChart";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export function DraftResult({
  analysis,
  isAnalyzingDraft,
  draftError,
  onResetPool,
  showDetails,
  toggleDetails,
}: {
  analysis: DraftAnalysis | null;
  isAnalyzingDraft: boolean;
  draftError: string | null;
  onResetPool?: () => void;
  showDetails: boolean;
  toggleDetails: () => void;
}) {
  if (isAnalyzingDraft) {
    return (
      <section className="panel" aria-label="Analizando draft" data-tour="draft-result">
        <div className="panelHeader">
          <h3 className="panelTitle">Analisis del Draft</h3>
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
      <section className="panel" aria-label="Error de analisis" data-tour="draft-result">
        <div className="panelHeader">
          <h3 className="panelTitle">Analisis del Draft</h3>
        </div>
        <div className="panelBody">
          <div className="emptyState" style={{ minHeight: "260px" }}>
            <AlertTriangle size={36} className="emptyStateIcon" />
            <h4 className="emptyStateTitle" style={{ color: "var(--red)" }}>Fallo de conexion</h4>
            <p className="emptyStateText">{draftError}</p>
          </div>
        </div>
      </section>
    );
  }

  const best = analysis?.best;
  const unsupported = analysis?.unsupportedPool ?? [];
  const unsupportedNames = unsupported
    .map((id) => HERO_ROSTER_BY_ID[id]?.name ?? id)
    .slice(0, 4);

  return (
    <section className="panel" aria-label="Resultado del analisis" data-tour="draft-result">
      <div className="panelHeader resultHeader">
        <div>
          <h3 className="panelTitle">Analisis del Draft</h3>
          <p className="panelNote">{analysis?.freshnessWarning}</p>
        </div>
        {best && (
          <button className="detailsToggleBtn" onClick={toggleDetails} type="button">
            {showDetails ? "Ocultar desglose" : "Ver desglose de puntuacion"}
          </button>
        )}
      </div>
      <div className="panelBody">
        {unsupported.length > 0 && (
          <div className="engineCoverageNotice" role="status">
            <AlertTriangle size={14} className="iconAmber" />
            <span>
              {unsupported.length === 1 ? "1 héroe sin scoring" : `${unsupported.length} héroes sin scoring`}
              {" "}en tu pool ({unsupportedNames.join(", ")}
              {unsupported.length > unsupportedNames.length ? "…" : ""}). El motor lo ignora hasta que se cure su metadata.
            </span>
          </div>
        )}
        {best ? (
          <div className="recommendationStack">
            <div className="resultHero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="resultHeroImg"
                src={heroImageUrl(best.hero.id)}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <div className="resultTopline">
                <div>
                  <span className="metricLabel primaryLabel">PICK RECOMENDADO</span>
                  <h3 className="resultName">{best.hero.name}</h3>
                  <div className="draftSummaryPills">
                    <span className="tag green">Confianza {best.confidence}</span>
                    <span className="tag">Score {best.total}</span>
                  </div>
                </div>
                <div className="scoreBlock">
                  <RadialScore value={best.total} />
                </div>
              </div>

              <div className="reasonBlock">
                <span className="blockLabel">Por que este pick</span>
                <ul className="reasonList">
                  {best.reasons.slice(0, 3).map((reason) => (
                    <li key={reason}>
                      <ChevronRight size={14} className="listChevron" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="draftRiskStrip">
                <ShieldAlert size={16} className={best.risks.length > 0 ? "iconRed" : "iconGreen"} />
                <div>
                  <span className="blockLabel">Riesgo principal</span>
                  <p>{best.risks[0] ?? "No hay riesgo critico visible con el draft actual."}</p>
                </div>
              </div>
            </div>

            <div className="quickPlanGrid">
              <div className="quickPlanCard primary">
                <span className="blockLabel">
                  <Clock3 size={14} /> Min 0-5
                </span>
                <p>{best.plan.early}</p>
              </div>
              <div className="quickPlanCard">
                <span className="blockLabel">Min 5-15</span>
                <p>{best.plan.mid}</p>
              </div>
              <div className="quickPlanCard">
                <span className="blockLabel">Primer objetivo</span>
                <p>{best.plan.objective}</p>
              </div>
            </div>

            <div className="miniGrid">
              <Metric
                label="Compras iniciales"
                value={best.startingItems.join(", ")}
                icon={<Zap size={14} className="iconAmber" />}
              />
              <Metric
                label="Primer core"
                value={best.firstCore.join(" -> ")}
                icon={<TrendingUp size={14} className="iconGreen" />}
              />
              <Metric
                label="Carencias a cubrir"
                value={analysis.teamNeeds.slice(0, 3).join(" / ") || "Composicion balanceada"}
                icon={<Cpu size={14} className="iconPurple" />}
              />
              <Metric
                label="Win conditions enemigas"
                value={analysis.enemyThreats.join(" / ") || "Sin amenazas de late criticas"}
                icon={<AlertTriangle size={14} className="iconRed" />}
              />
            </div>

            <div className="miniGrid">
              <ListBlock
                title="Alternativas viables"
                items={analysis.alternatives.map((pick) => `${pick.hero.name} (${pick.total} pts)`)}
                type="good"
              />
              <ListBlock
                title="Picks con alto riesgo"
                items={analysis.avoid.map((pick) => `${pick.hero.name}: ${pick.risks[0] ?? "Sin stuns / no encaja"}`)}
                type="bad"
              />
            </div>

            {showDetails && (
              <div className="scoreDetailsGrid">
                <h4 className="detailSectionTitle">Desglose del Motor de Reglas</h4>
                <div className="radarWrap">
                  <RadarChart
                    data={[
                      { label: "Comfort", value: clamp01(best.scores.comfort / 29) },
                      { label: "Linea", value: clamp01(best.scores.laneMatchup / 24) },
                      { label: "Sinergia", value: clamp01(best.scores.teamSynergy / 22) },
                      { label: "Counter", value: clamp01((best.scores.counterValue + 8) / 26) },
                      { label: "Parche", value: clamp01((best.scores.patchValue + 8) / 16) },
                      { label: "Seguridad", value: clamp01((15 - best.scores.executionRisk) / 15) },
                    ]}
                  />
                </div>
                <ScoreBar label="Comfort Pool" value={best.scores.comfort} max={29} color="#805AD5" />
                <ScoreBar label="Matchup en Linea" value={best.scores.laneMatchup} max={24} color="#38A169" />
                <ScoreBar label="Sinergia de Equipo" value={best.scores.teamSynergy} max={22} color="#3182CE" />
                <ScoreBar label="Fuerza del Counter" value={best.scores.counterValue} max={18} min={-8} color="#D69E2E" />
                <ScoreBar label="Modificador del Parche" value={best.scores.patchValue} max={8} min={-8} color="#E53E3E" />
                <ScoreBar label="Riesgo de Ejecucion" value={-best.scores.executionRisk} max={0} min={-15} color="#9B2C2C" />
              </div>
            )}
          </div>
        ) : (
          <div className="emptyState">
            <AlertTriangle size={36} className="emptyStateIcon" />
            <h4 className="emptyStateTitle">Falta tu Pool de Héroes</h4>
            <p className="emptyStateText">
              Selecciona en <strong>&quot;Mi Pool de Héroes&quot;</strong> los héroes que dominas. 
              El motor no te recomendará un counter estadístico perfecto si no sabes usarlo; en su lugar, buscará la mejor opción táctica dentro de <strong>tu propio repertorio</strong>.
            </p>
            {onResetPool && (
              <button className="primaryAction emptyStateAction" onClick={onResetPool} type="button">
                Usar pool sugerido del rol
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
