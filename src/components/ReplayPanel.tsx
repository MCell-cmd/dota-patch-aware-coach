"use client";

import {
  AlertTriangle,
  BarChart3,
  Check,
  Clock,
  Copy,
  Cpu,
  Gauge,
  RefreshCw,
  ThumbsUp,
} from "lucide-react";
import { MockReplayReport } from "@/data/dota";

export type ReportPerspective = {
  heroName: string;
  accountId: number | null;
  won: boolean;
} | null;

const LOADING_STEPS = [
  "Conectando con la API pública de OpenDota...",
  "Descargando metadatos del match y resumen por jugador...",
  "Identificando GPM/XPM, net worth y daño por rol...",
  "Comparando tu desempeño contra el carry enemigo...",
  "Redactando el diagnóstico táctico en español...",
];

export function ReplayPanel({
  matchId,
  accountId,
  question,
  setMatchId,
  setAccountId,
  setQuestion,
  isAnalyzing,
  analysisStep,
  analysisError,
  reportSource,
  reportParsed,
  reportPerspective,
  replayReport,
  startAnalysis,
  copyReport,
  copyStatus,
}: {
  matchId: string;
  accountId: string;
  question: string;
  setMatchId: (value: string) => void;
  setAccountId: (value: string) => void;
  setQuestion: (value: string) => void;
  isAnalyzing: boolean;
  analysisStep: number;
  analysisError: string | null;
  reportSource: string | null;
  reportParsed: boolean | null;
  reportPerspective: ReportPerspective;
  replayReport: MockReplayReport | null;
  startAnalysis: () => void;
  copyReport: () => void;
  copyStatus: boolean;
}) {
  return (
    <div className="replayContainer">
      <div className="contentGrid replayGrid">
        <section className="panel">
          <div className="panelHeader">
            <h3 className="panelTitle">Consulta de Partida</h3>
            <p className="panelNote">Ingresa un Match ID público de Dota 2 (ej: 8850507008) para generar el reporte de coaching con datos reales de OpenDota.</p>
          </div>
          <div className="panelBody">
            <div className="fieldGroup">
              <label htmlFor="matchIdInput" className="fieldLabel">Match ID (Público)</label>
              <input
                id="matchIdInput"
                className="textInput fontMono"
                onChange={(event) => setMatchId(event.target.value)}
                value={matchId}
                placeholder="Ingresa ID de partida..."
                disabled={isAnalyzing}
              />
            </div>
            <div className="fieldGroup">
              <label htmlFor="accountIdInput" className="fieldLabel">Steam32 Account ID (opcional)</label>
              <input
                id="accountIdInput"
                className="textInput fontMono"
                onChange={(event) => setAccountId(event.target.value)}
                value={accountId}
                placeholder="Para analizar a un jugador específico..."
                disabled={isAnalyzing}
              />
            </div>
            <div className="fieldGroup">
              <label htmlFor="questionInput" className="fieldLabel">Pregunta Táctica Principal</label>
              <textarea
                id="questionInput"
                className="textInput"
                onChange={(event) => setQuestion(event.target.value)}
                rows={4}
                value={question}
                placeholder="Ej. ¿Qué decisión me costó la partida? ¿Cómo estuvo mi timing de ítems?"
                disabled={isAnalyzing}
              />
            </div>
            <button
              className="primaryAction runActionBtn"
              onClick={startAnalysis}
              disabled={isAnalyzing || !matchId}
              type="button"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={18} className="spinIcon" />
                  Analizando partida...
                </>
              ) : (
                <>
                  <Cpu size={18} />
                  Generar Reporte de Coach
                </>
              )}
            </button>
          </div>
        </section>

        <section className="panel">
          <div className="panelHeader">
            <h3 className="panelTitle">Visualizador de Reportes</h3>
            <p className="panelNote">El reporte combina métricas reales de OpenDota con heurísticas de rol y redacción en español.</p>
          </div>
          <div className="panelBody displayPanelBody">
            {isAnalyzing && (
              <div className="loadingState">
                <Cpu size={40} className="spinIcon textRed" />
                <span className="loadingTitle">Ingiriendo datos de la partida</span>
                <div className="loadingSteps">
                  <p className="activeStep">{LOADING_STEPS[analysisStep] || "Finalizando reporte..."}</p>
                </div>
                <div className="progressBarOuter">
                  <div className="progressBarInner" style={{ width: `${((analysisStep + 1) / LOADING_STEPS.length) * 100}%` }}></div>
                </div>
              </div>
            )}

            {!isAnalyzing && !replayReport && analysisError && (
              <div className="emptyState">
                <AlertTriangle size={36} className="emptyStateIcon iconRed" />
                <h4 className="emptyStateTitle">No se pudo generar el reporte</h4>
                <p className="emptyStateText">{analysisError}</p>
              </div>
            )}

            {!isAnalyzing && !replayReport && !analysisError && (
              <div className="emptyState">
                <Clock size={36} className="emptyStateIcon" />
                <h4 className="emptyStateTitle">Sin Reporte Activo</h4>
                <p className="emptyStateText">Ingresa los datos del formulario de la izquierda y haz clic en "Generar Reporte de Coach" para auditar la partida con datos reales de OpenDota.</p>
              </div>
            )}

            {!isAnalyzing && replayReport && (
              <div className="reportWrapper">
                <div className="sourceStrip">
                  <span className="statusPill">
                    <BarChart3 size={14} className="iconGreen" /> Datos reales de OpenDota
                  </span>
                  <span className="statusPill">
                    <Cpu size={14} className={reportSource === "ai" ? "iconPurple" : "iconAmber"} />
                    {reportSource === "ai" ? "Redacción con IA (Claude)" : "Reporte determinista (sin API key de IA)"}
                  </span>
                  <span className="statusPill">
                    <Gauge size={14} className={reportParsed ? "iconGreen" : "iconAmber"} />
                    {reportParsed ? "Match parseado" : "Timeline limitado"}
                  </span>
                  {reportPerspective && (
                    <span className="statusPill">
                      Perspectiva: <strong>{reportPerspective.heroName}</strong>
                    </span>
                  )}
                </div>
                <div className="reportMetadata">
                  <div className="metaRow">
                    <div>
                      <span className="metaLabel">Match ID</span>
                      <strong className="metaValue fontMono">{replayReport.matchId}</strong>
                    </div>
                    <div>
                      <span className="metaLabel">Héroe / Rol</span>
                      <strong className="metaValue">{replayReport.hero} ({replayReport.role})</strong>
                    </div>
                  </div>
                  <div className="metaRow">
                    <div>
                      <span className="metaLabel">Resultado</span>
                      <strong className={`metaValue ${replayReport.result === "Victoria" ? "greenText" : "redText"}`}>
                        {replayReport.result} ({replayReport.duration})
                      </strong>
                    </div>
                    <div>
                      <span className="metaLabel">Rango Promedio</span>
                      <strong className="metaValue fontCapitalize">{replayReport.bracket}</strong>
                    </div>
                  </div>
                </div>

                <div className="verdictBox">
                  <div className="verdictTitle">
                    <ThumbsUp size={16} />
                    <span>Veredicto del Coach</span>
                  </div>
                  <p className="verdictText">&quot;{replayReport.verdict}&quot;</p>
                </div>

                <div className="fasesSection">
                  <span className="sectionTitle">Análisis del Desempeño por Fase</span>
                  <div className="faseCard">
                    <div className="faseCardHeader bgGreen">Fase de Líneas (Min 0-10)</div>
                    <div className="faseCardBody">
                      <p><strong>✓ Acierto:</strong> {replayReport.phases.lane.good}</p>
                      <p className="redText"><strong>✗ Error:</strong> {replayReport.phases.lane.error}</p>
                      <p className="blueText"><strong>➔ Corrección:</strong> {replayReport.phases.lane.change}</p>
                    </div>
                  </div>

                  <div className="faseCard">
                    <div className="faseCardHeader bgAmber">Mid Game (Min 10-25)</div>
                    <div className="faseCardBody">
                      <p><strong>✓ Acierto:</strong> {replayReport.phases.mid.good}</p>
                      <p className="redText"><strong>✗ Error:</strong> {replayReport.phases.mid.error}</p>
                      <p className="blueText"><strong>➔ Corrección:</strong> {replayReport.phases.mid.change}</p>
                    </div>
                  </div>

                  <div className="faseCard">
                    <div className="faseCardHeader bgPurple">Late Game (Min 25+)</div>
                    <div className="faseCardBody">
                      <p><strong>✓ Acierto:</strong> {replayReport.phases.late.good}</p>
                      <p className="redText"><strong>✗ Error:</strong> {replayReport.phases.late.error}</p>
                      <p className="blueText"><strong>➔ Corrección:</strong> {replayReport.phases.late.change}</p>
                    </div>
                  </div>
                </div>

                <div className="errorsSection">
                  <span className="sectionTitle">Los 3 Errores de Mayor Costo</span>
                  {replayReport.errors.map((err, idx) => (
                    <div className="errorReportCard" key={idx}>
                      <h4 className="errorCardTitle">
                        <span className="errorIndex">{idx + 1}</span>
                        {err.title}
                      </h4>
                      <div className="errorCardGrid">
                        <div>
                          <strong>Evidencia en Replay:</strong>
                          <p>{err.evidence}</p>
                        </div>
                        <div>
                          <strong>Impacto en Oro/Control:</strong>
                          <p className="redText">{err.impact}</p>
                        </div>
                        <div>
                          <strong>Acción Correctiva:</strong>
                          <p>{err.fix}</p>
                        </div>
                        <div>
                          <strong>Drill / Cómo Practicarlo:</strong>
                          <p className="greenText">{err.practice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="trainingSection">
                  <span className="sectionTitle">Plan de Entrenamiento (7 Días)</span>
                  <div className="trainingGrid">
                    {replayReport.plan.map((dayPlan, idx) => (
                      <div className="trainingDayCard" key={idx}>
                        <span className="dayLabel">DÍA {idx + 1}</span>
                        <p className="dayDesc">{dayPlan}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="actionsRow">
                  <button className="primaryAction copyBtn" onClick={copyReport} type="button">
                    {copyStatus ? (
                      <>
                        <Check size={18} />
                        Copiado al portapapeles!
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copiar reporte en Markdown
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
