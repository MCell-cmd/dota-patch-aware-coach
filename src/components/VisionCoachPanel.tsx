"use client";

import { AlertTriangle, Ban, Clock, Eye, Footprints, ShieldCheck, Target, Users, BarChart3, Crosshair } from "lucide-react";
import { useMemo, useState } from "react";
import { ROLE_LABELS, type Role } from "@/data/dota";
import { VISION_SCENARIOS, type VisionObjective, type VisionPhase } from "@/data/vision";
import type { VisionReport } from "@/lib/visionReport";

const READ_COLOR: Record<"good" | "warn" | "info", string> = {
  good: "greenText",
  warn: "goldText",
  info: "",
};

const PHASE_LABELS: Record<VisionPhase | "all", string> = {
  all: "Todas",
  lane: "Línea",
  mid: "Mid game",
  late: "Late",
};

const OBJECTIVE_LABELS: Record<VisionObjective, string> = {
  runes: "Runas de poder",
  "protect-carry": "Proteger carry",
  "aggressive-map": "Mapa agresivo",
  "defensive-map": "Mapa defensivo",
  roshan: "Roshan",
  "anti-invis": "Anti-invis / deward",
  "high-ground": "High ground",
  smoke: "Smoke",
  wisdom: "Runa de sabiduría",
  lotus: "Lotus",
};

const CONFIDENCE_SCORE: Record<"alta" | "media" | "baja", number> = {
  alta: 3,
  media: 2,
  baja: 1,
};

export function VisionCoachPanel({
  role,
  phase,
  onPhaseChange,
  defaultMatchId = "",
  defaultAccountId = "",
}: {
  role: Role;
  phase: VisionPhase | "all";
  onPhaseChange: (phase: VisionPhase | "all") => void;
  defaultMatchId?: string;
  defaultAccountId?: string;
}) {
  const [matchId, setMatchId] = useState(defaultMatchId);
  const [accountId, setAccountId] = useState(defaultAccountId);
  const [loading, setLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [report, setReport] = useState<VisionReport | null>(null);
  const [perspective, setPerspective] = useState<{ heroName: string } | null>(null);

  async function analyzeVision(withParse = false) {
    if (!matchId.trim()) return;
    setLoading(true);
    setReportError(null);
    try {
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: matchId.trim(),
          accountId: accountId.trim() || null,
          role,
          parse: withParse,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.report) throw new Error(data.error || "No se pudo generar el reporte de visión.");
      setReport(data.report);
      setPerspective(data.perspective ?? null);
    } catch (e) {
      setReport(null);
      setReportError(e instanceof Error ? e.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  const scenarios = useMemo(
    () =>
      VISION_SCENARIOS.filter(
        (scenario) => scenario.roles.includes(role) && (phase === "all" || scenario.phase === phase),
      ),
    [phase, role],
  );
  const fallbackScenario = VISION_SCENARIOS.find((scenario) => scenario.roles.includes(role));
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const active = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0] ?? fallbackScenario;

  const confidenceScore = active ? CONFIDENCE_SCORE[active.confidence] : 0;

  return (
    <>
      <section className="panel" style={{ marginBottom: "16px" }}>
        <div className="panelHeader">
          <h3 className="panelTitle">Reporte de visión real</h3>
          <p className="panelNote">
            Analiza tu warding real de una partida (OpenDota): wards plantadas, dewards y timings, con lectura para {ROLE_LABELS[role]}.
          </p>
        </div>
        <div className="panelBody">
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "flex-end" }}>
            <label className="fieldGroup" style={{ flex: "1 1 160px" }}>
              <span className="fieldLabel">Match ID</span>
              <input
                className="textInput"
                value={matchId}
                onChange={(e) => setMatchId(e.target.value)}
                placeholder="Ej. 8853647494"
                disabled={loading}
              />
            </label>
            <label className="fieldGroup" style={{ flex: "1 1 140px" }}>
              <span className="fieldLabel">Account ID (opcional)</span>
              <input
                className="textInput"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="Steam32 (opcional)"
                disabled={loading}
              />
            </label>
            <button
              className="primaryAction"
              type="button"
              onClick={() => analyzeVision(false)}
              disabled={loading || !matchId.trim()}
            >
              {loading ? "Analizando…" : "Analizar visión"}
            </button>
          </div>

          {reportError && (
            <div className="emptyState" style={{ marginTop: "12px" }}>
              <AlertTriangle size={24} />
              <p>{reportError}</p>
            </div>
          )}

          {report && !reportError && (
            <div className="patchNotesContent" style={{ marginTop: "14px" }}>
              <p className="tacticalDesc">
                <strong>{report.verdict}</strong>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "10px 0" }}>
                <span className="statusPill"><Eye size={13} /> Obs: <strong>{report.stats.obsPlaced ?? "—"}</strong></span>
                <span className="statusPill"><ShieldCheck size={13} /> Sen: <strong>{report.stats.senPlaced ?? "—"}</strong></span>
                <span className="statusPill"><Crosshair size={13} /> Dewards: <strong>{report.stats.dewards}</strong></span>
                {report.stats.obsPerMin != null && (
                  <span className="statusPill"><BarChart3 size={13} /> {report.stats.obsPerMin} obs/min</span>
                )}
                {report.stats.firstWardLabel && (
                  <span className="statusPill"><Clock size={13} /> 1ª ward {report.stats.firstWardLabel}</span>
                )}
                <span className="statusPill">{report.parsed ? "Parseada" : "Sin parsear"}</span>
                {perspective && <span className="statusPill">{perspective.heroName}</span>}
              </div>
              <ul className="notesList">
                {report.reads.map((r, i) => (
                  <li key={i}>
                    <span className="noteBullet">•</span>
                    <p className={READ_COLOR[r.kind]}>{r.text}</p>
                  </li>
                ))}
              </ul>
              {!report.parsed && (
                <button className="pickerResetBtn" type="button" onClick={() => analyzeVision(true)} disabled={loading}>
                  Pedir parseo y reintentar
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="placeholderGrid visionGrid">
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Guías de visión</h3>
          <p className="panelNote">
            Guía manual/off-client para {ROLE_LABELS[role]}. No lee la partida ni automatiza acciones.
          </p>
        </div>
        <div className="panelBody">
          <div className="segmentedControl">
            {(Object.keys(PHASE_LABELS) as Array<VisionPhase | "all">).map((value) => (
              <button
                key={value}
                className={`segmentButton ${phase === value ? "active" : ""}`}
                onClick={() => onPhaseChange(value)}
                type="button"
              >
                {PHASE_LABELS[value]}
              </button>
            ))}
          </div>

          <div className="patchHeroList">
            {scenarios.map((scenario) => (
              <button
                aria-pressed={active?.id === scenario.id}
                className={`patchHeroRow ${active?.id === scenario.id ? "active" : ""}`}
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                type="button"
              >
                <div className="patchHeroMeta">
                  <span className="patchHeroName">{scenario.title}</span>
                  <span className="patchHeroRoles">{scenario.timing}</span>
                </div>
                <span className="patchHeroStatus neutral">{scenario.confidence}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">{active?.title ?? "Sin escenario"}</h3>
          <p className="panelNote">
            Plan de visión por objetivo. Úsalo antes de moverte, no como asistencia en vivo.
          </p>
        </div>
        <div className="panelBody">
          {active ? (
            <div className="patchNotesContent">
              <span className="notesTitle">Plan accionable</span>
              <div className="planCardGrid">
                <article className="planCard">
                  <div className="planCardHead">
                    <Eye size={16} />
                    <span>Observer</span>
                  </div>
                  <p>{active.observerPlan}</p>
                </article>
                <article className="planCard">
                  <div className="planCardHead">
                    <ShieldCheck size={16} />
                    <span>Sentry</span>
                  </div>
                  <p>{active.sentryPlan}</p>
                </article>
                <article className="planCard">
                  <div className="planCardHead">
                    <Footprints size={16} />
                    <span>Movimiento</span>
                  </div>
                  <p>{active.movementRule}</p>
                </article>
                <article className="planCard risk">
                  <div className="planCardHead">
                    <AlertTriangle size={16} />
                    <span>Riesgo</span>
                  </div>
                  <p>{active.risk}</p>
                </article>
              </div>

              <article className="planCard danger planCardWide">
                <div className="planCardHead">
                  <Ban size={16} />
                  <span>No hacer</span>
                </div>
                <p>{active.doNot}</p>
              </article>

              <div className="tacticalAudit">
                <span className="notesTitle">Fuente</span>
                <p className="tacticalDesc">
                  {active.source.label} · Consulta {active.source.consultedAt}.{" "}
                  <a href={active.source.url} target="_blank" rel="noreferrer">
                    Abrir fuente
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="emptyState">
              <Eye size={32} />
              <p>No hay escenarios para este filtro.</p>
            </div>
          )}
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Resumen táctico</h3>
          <p className="panelNote">Lectura rápida antes de plantar visión.</p>
        </div>
        <div className="panelBody">
          {active ? (
            <div className="visionSummary">
              <div className="summaryRow">
                <span className="summaryLabel">Confianza</span>
                <span className="confidenceStars" aria-label={`Confianza ${active.confidence}`}>
                  {[1, 2, 3].map((step) => (
                    <span key={step} className={`star ${step <= confidenceScore ? "on" : ""}`}>
                      ★
                    </span>
                  ))}
                </span>
              </div>

              <div className="summaryChips">
                <span className="summaryChip">
                  <Target size={13} />
                  {OBJECTIVE_LABELS[active.objective]}
                </span>
                <span className="summaryChip">
                  <Clock size={13} />
                  {PHASE_LABELS[active.phase]}
                </span>
              </div>

              <div className="summaryBlock">
                <span className="summaryBlockLabel">
                  <Clock size={14} />
                  Ventana de tiempo
                </span>
                <p>{active.timing}</p>
              </div>

              <div className="summaryBlock">
                <span className="summaryBlockLabel">
                  <Users size={14} />
                  Roles que aplican
                </span>
                <div className="summaryRoleChips">
                  {active.roles.map((scenarioRole) => (
                    <span
                      key={scenarioRole}
                      className={`summaryRoleChip ${scenarioRole === role ? "current" : ""}`}
                    >
                      {ROLE_LABELS[scenarioRole]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="emptyState">
              <Target size={32} />
              <p>Selecciona un escenario.</p>
            </div>
          )}
        </div>
      </section>
      </div>
    </>
  );
}
