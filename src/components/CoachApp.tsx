"use client";

import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Check,
  Crosshair,
  FileText,
  Gauge,
  Swords,
  ChevronRight,
  TrendingUp,
  Cpu,
  RefreshCw,
  Clock,
  ThumbsUp,
  User,
  Zap,
  Copy,
  Plus,
  Trash2,
  Award
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  BRACKET_LABELS,
  Bracket,
  HEROES,
  PATCH_STATE,
  ROLE_LABELS,
  Role,
  STYLE_LABELS,
  Style,
  PATCH_NOTES_BY_HERO,
  MOCK_REPLAY_REPORTS,
  MockReplayReport,
} from "@/data/dota";
import { DraftAnalysis } from "@/lib/draft";
import { APP_CONFIG } from "@/config/constants";

type Mode = "draft" | "patch" | "replay" | "coach";

type ReportApiResponse = {
  report?: MockReplayReport;
  source?: "ai" | "deterministic";
  parsed?: boolean;
  perspective?: {
    heroName: string;
    accountId: number | null;
    won: boolean;
  };
  error?: string;
};

const MODE_COPY: Record<Mode, { title: string; subtitle: string }> = {
  draft: {
    title: "Asistente de draft manual",
    subtitle:
      "Selecciona tu rol, bracket, estilo de juego, tu pool y h?roes visibles. El motor puntuar? en tiempo real bajo las reglas del parche.",
  },
  patch: {
    title: "Coach de parche interactivo",
    subtitle:
      "Consulta c?mo afectan las actualizaciones del parche activo a tus h?roes favoritos y descubre las builds del meta.",
  },
  replay: {
    title: "An?lisis post-partida por Match ID",
    subtitle:
      "Ingresa el identificador p?blico de tu partida y tu duda. El sistema consultara OpenDota y generara un reporte con datos reales.",
  },
  coach: {
    title: "Workspace del Coach (B2B)",
    subtitle:
      "Gestiona tu lista de alumnos, edita los reportes generados por la IA con tus propios comentarios y personaliza la marca de exportaci?n.",
  },
};

const ROLES = Object.keys(ROLE_LABELS) as Role[];
const BRACKETS = Object.keys(BRACKET_LABELS) as Bracket[];
const STYLES = Object.keys(STYLE_LABELS) as Style[];

function cloneReport(report: MockReplayReport | undefined): MockReplayReport | null {
  return report ? JSON.parse(JSON.stringify(report)) as MockReplayReport : null;
}

export function CoachApp() {
  const [mode, setMode] = useState<Mode>("draft");
  const [role, setRole] = useState<Role>("mid");
  const [bracket, setBracket] = useState<Bracket>("archon");
  const [style, setStyle] = useState<Style>("comfort");
  const [heroPool, setHeroPool] = useState<string[]>(["viper", "lina", "zeus", "invoker"]);
  const [allies, setAllies] = useState<string[]>(["axe", "crystal-maiden", "sniper"]);
  const [enemies, setEnemies] = useState<string[]>(["phantom-assassin", "lion", "tidehunter"]);
  
  // Asynchronous Server-Side Draft States (a11y & IP security)
  const [analysis, setAnalysis] = useState<DraftAnalysis | null>(null);
  const [isAnalyzingDraft, setIsAnalyzingDraft] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);

  // Replay States
  const [matchId, setMatchId] = useState(APP_CONFIG.DEFAULT_MATCH_ID);
  const [accountId, setAccountId] = useState(APP_CONFIG.DEFAULT_ACCOUNT_ID);
  const [question, setQuestion] = useState("Que decision me hizo perder mas impacto?");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [reportSource, setReportSource] = useState<"ai" | "deterministic" | null>(null);
  const [reportParsed, setReportParsed] = useState<boolean | null>(null);
  const [reportPerspective, setReportPerspective] = useState<ReportApiResponse["perspective"] | null>(null);
  const [replayReport, setReplayReport] = useState<MockReplayReport | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // Patch States
  const [selectedPatchHeroId, setSelectedPatchHeroId] = useState<string>("viper");

  // Draft States
  const [showDraftDetails, setShowDraftDetails] = useState(false);

  // B2B Coach Workspace States
  const [students, setStudents] = useState([
    { id: APP_CONFIG.DEFAULT_STUDENT_ID, name: "Maikel 'Lobo' S.", MMR: "Archon", favoriteHero: "Viper", lastReport: APP_CONFIG.DEFAULT_MATCH_ID },
    { id: "student-2", name: "Carlos 'Gank' M.", MMR: "Legend", favoriteHero: "Axe", lastReport: "Ninguno" },
    { id: "student-3", name: "Santi 'Support' F.", MMR: "Guardian", favoriteHero: "Crystal Maiden", lastReport: "Ninguno" },
  ]);
  const [activeStudentId, setActiveStudentId] = useState<string>(APP_CONFIG.DEFAULT_STUDENT_ID);
  const [academyName, setAcademyName] = useState(APP_CONFIG.DEFAULT_ACADEMY_NAME);
  const [brandingColor, setBrandingColor] = useState<string>(APP_CONFIG.DEFAULT_BRANDING_COLOR);
  const [coachReport, setCoachReport] = useState<MockReplayReport | null>(() =>
    cloneReport(MOCK_REPLAY_REPORTS[APP_CONFIG.DEFAULT_MATCH_ID]),
  );
  
  // Add student Form
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentMMR, setNewStudentMMR] = useState<Bracket>("archon");
  const [newStudentHero, setNewStudentHero] = useState("viper");

  // Fetching Server-Side Draft analysis with Debounce to prevent server flooding
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      setIsAnalyzingDraft(true);
      setDraftError(null);
      try {
        const response = await fetch("/api/draft", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role, bracket, style, heroPool, allies, enemies }),
        });

        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor al calcular el scoring.");
        }

        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        console.error(err);
        setDraftError("No se pudo conectar con el motor de scoring en el servidor.");
      } finally {
        setIsAnalyzingDraft(false);
      }
    }, 300); // 300ms Debounce

    return () => clearTimeout(debounceTimer);
  }, [role, bracket, style, heroPool, allies, enemies]);

  const copy = MODE_COPY[mode];

  const startReplayAnalysis = async () => {
    if (!matchId.trim()) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setReplayReport(null);
    setAnalysisError(null);
    setReportSource(null);
    setReportParsed(null);
    setReportPerspective(null);

    const progress = window.setInterval(() => {
      setAnalysisStep((prev) => Math.min(prev + 1, 4));
    }, APP_CONFIG.SIMULATION_STEP_DELAY);

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: matchId.trim(),
          accountId: accountId.trim() || null,
          question,
        }),
      });
      const payload = (await response.json()) as ReportApiResponse;
      if (!response.ok || !payload.report) {
        throw new Error(payload.error || "No se pudo generar el reporte real.");
      }
      setAnalysisStep(4);
      setReplayReport(payload.report);
      setReportSource(payload.source ?? "deterministic");
      setReportParsed(payload.parsed ?? null);
      setReportPerspective(payload.perspective ?? null);
    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : "Error inesperado generando el reporte.");
    } finally {
      window.clearInterval(progress);
      setIsAnalyzing(false);
    }
  };

  // Safe setInterval based simulation (no cascade useEffect timers)
  useEffect(() => {
    const replayHandledByApi = true;
    if (replayHandledByApi) return;
    if (!isAnalyzing) return;

    const steps = [
      "Conectando con la API p?blica de OpenDota...",
      "Descargando metadatos del match y parseando timelines...",
      "Identificando timings de ?tems core y GPM por rol...",
      "Analizando eventos de muertes en Roshan y peleas cr?ticas...",
      "Generando diagn?stico t?ctico bajo el meta del parche 7.41d..."
    ];

    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          const report = MOCK_REPLAY_REPORTS[matchId] || MOCK_REPLAY_REPORTS[APP_CONFIG.DEFAULT_MATCH_ID];
          const finalReport = report ? { ...report, matchId, question } : null;
          setReplayReport(finalReport);
          setIsAnalyzing(false);
          return prev;
        }
        return prev + 1;
      });
    }, APP_CONFIG.SIMULATION_STEP_DELAY);

    return () => clearInterval(interval);
  }, [isAnalyzing, matchId, question]);

  // Handle active student report loading
  useEffect(() => {
    const coachReportLoadedByHandlers = true;
    if (coachReportLoadedByHandlers) return;
    if (activeStudentId === APP_CONFIG.DEFAULT_STUDENT_ID) {
      setCoachReport(JSON.parse(JSON.stringify(MOCK_REPLAY_REPORTS[APP_CONFIG.DEFAULT_MATCH_ID])));
    } else {
      setCoachReport(null);
    }
  }, [activeStudentId]);

  const copyMarkdownReport = () => {
    if (!replayReport) return;
    const md = generateMarkdown(replayReport);
    navigator.clipboard.writeText(md).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  const copyCoachReport = () => {
    if (!coachReport) return;
    const md = generateMarkdown(coachReport, academyName);
    navigator.clipboard.writeText(md).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
  };

  const generateMarkdown = (report: MockReplayReport, academy?: string) => {
    return `
# REPORTE DE COACHING - DOTA 2
${academy ? `**Entregado por:** ${academy}\n` : ""}**Match ID:** ${report.matchId}
**Resultado:** ${report.result} | **Duraci?n:** ${report.duration}
**H?roe:** ${report.hero} | **Rol:** ${report.role} | **Bracket:** ${report.bracket}

## PREGUNTA DEL JUGADOR
> "${report.question}"

## VEREDICTO DEL COACH
${report.verdict}

## AN?LISIS POR FASES
### Fase de L?neas
- **Logro:** ${report.phases.lane.good}
- **Error:** ${report.phases.lane.error}
- **Recomendaci?n:** ${report.phases.lane.change}

### Mid Game
- **Logro:** ${report.phases.mid.good}
- **Error:** ${report.phases.mid.error}
- **Recomendaci?n:** ${report.phases.mid.change}

### Late Game
- **Logro:** ${report.phases.late.good}
- **Error:** ${report.phases.late.error}
- **Recomendaci?n:** ${report.phases.late.change}

## ERRORES M?S CAROS
${report.errors.map((err, idx) => `
### ${idx + 1}. ${err.title}
- **Evidencia:** ${err.evidence}
- **Impacto:** ${err.impact}
- **Correccion:** ${err.fix}
- **Ejercicio:** ${err.practice}
`).join("\n")}

## PLAN DE ACCION DE 7 DIAS
${report.plan.map(p => `- ${p}`).join("\n")}

## PROXIMA PARTIDA
- **Objetivo unico:** ${report.nextSteps.objective}
- **M?trica Clave:** ${report.nextSteps.metric}
- **Pregunta de Revisi?n:** ${report.nextSteps.question}
    `.trim();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    
    const newStudent = {
      id: `student-${Date.now()}`,
      name: newStudentName,
      MMR: BRACKET_LABELS[newStudentMMR],
      favoriteHero: HEROES.find(h => h.id === newStudentHero)?.name || newStudentHero,
      lastReport: "Ninguno"
    };

    setStudents([...students, newStudent]);
    setActiveStudentId(newStudent.id);
    setCoachReport(null);
    setNewStudentName("");
  };

  const handleDeleteStudent = (id: string) => {
    if (students.length <= 1) return; // Keep at least one
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    if (activeStudentId === id) {
      setActiveStudentId(updated[0].id);
      setCoachReport(
        updated[0].id === APP_CONFIG.DEFAULT_STUDENT_ID
          ? cloneReport(MOCK_REPLAY_REPORTS[APP_CONFIG.DEFAULT_MATCH_ID])
          : null,
      );
    }
  };

  const handleSelectStudent = (id: string) => {
    setActiveStudentId(id);
    setCoachReport(id === APP_CONFIG.DEFAULT_STUDENT_ID ? cloneReport(MOCK_REPLAY_REPORTS[APP_CONFIG.DEFAULT_MATCH_ID]) : null);
  };

  return (
    <main className="appShell">
      <div className="ambientGlow glowTopLeft"></div>
      <div className="ambientGlow glowTopRight"></div>

      <header className="topBar">
        <div className="topBarInner">
          <div className="brandBlock">
            <div className="brandMark" aria-hidden="true">
              <Swords size={22} className="animatedSwords" />
            </div>
            <div className="brandText">
              <h1 className="brandTitle">Dota Patch-Aware Coach</h1>
              <p className="brandMeta">Dashboard t?ctico & an?lisis inteligente</p>
            </div>
          </div>
          <div className="statusStrip" aria-label="Estado de datos">
            <span className="statusPill">
              <Gauge size={14} className="iconRed" /> Parche <strong>{PATCH_STATE.version}</strong>
            </span>
            <span className="statusPill">
              <BarChart3 size={14} className="iconAmber" /> Base <strong>{PATCH_STATE.updatedAt}</strong>
            </span>
            <span className="statusPill">
              <TrendingUp size={14} className="iconGreen" /> Meta <strong>Estable</strong>
            </span>
          </div>
        </div>
      </header>

      <div className="mainGrid">
        <nav className="sideNav" aria-label="Modos del coach">
          <ModeButton active={mode === "draft"} icon={<Crosshair size={18} />} onClick={() => setMode("draft")}>
            Asistente Draft
          </ModeButton>
          <ModeButton active={mode === "patch"} icon={<BookOpen size={18} />} onClick={() => setMode("patch")}>
            Patch Coach
          </ModeButton>
          <ModeButton active={mode === "replay"} icon={<FileText size={18} />} onClick={() => setMode("replay")}>
            Replay Analysis
          </ModeButton>
          <ModeButton active={mode === "coach"} icon={<Award size={18} />} onClick={() => setMode("coach")}>
            Workspace Coach
          </ModeButton>
        </nav>

        <section className="workspace">
          <div className="toolHeader">
            <div>
              <h2 className="toolTitle">{copy.title}</h2>
              <p className="toolSubtitle">{copy.subtitle}</p>
            </div>
          </div>

          {mode === "draft" && (
            <div className="contentGrid">
              <section className="panel" aria-label="Entrada de draft">
                <div className="panelHeader">
                  <h3 className="panelTitle">Par?metros t?cticos</h3>
                  <p className="panelNote">Entrada manual sin overlay. El control sigue estando 100% de tu lado.</p>
                </div>
                <div className="panelBody">
                  <SegmentedField label="Mi Rol" values={ROLES} labels={ROLE_LABELS} value={role} onChange={setRole} />
                  <SelectField label="Rango / Bracket" value={bracket} onChange={setBracket} values={BRACKETS} labels={BRACKET_LABELS} />
                  <SegmentedField label="Estilo de Juego" values={STYLES} labels={STYLE_LABELS} value={style} onChange={setStyle} />

                  <HeroPicker title="Mi Pool de H?roes" selected={heroPool} onToggle={(id) => toggleValue(id, heroPool, setHeroPool)} />

                  <div className="draftColumns">
                    <DraftColumn title="Aliados ya elegidos" selected={allies} onToggle={(id) => toggleValue(id, allies, setAllies)} />
                    <DraftColumn title="Enemigos ya elegidos" selected={enemies} onToggle={(id) => toggleValue(id, enemies, setEnemies)} />
                  </div>
                </div>
              </section>

              <DraftResult 
                analysis={analysis} 
                isAnalyzingDraft={isAnalyzingDraft}
                draftError={draftError}
                showDetails={showDraftDetails} 
                toggleDetails={() => setShowDraftDetails(!showDraftDetails)} 
              />
            </div>
          )}

          {mode === "patch" && (
            <PatchCoachPanel 
              heroPool={heroPool} 
              selectedHeroId={selectedPatchHeroId} 
              onSelectHero={setSelectedPatchHeroId} 
            />
          )}

          {mode === "replay" && (
            <ReplayPanel 
              matchId={matchId} 
              accountId={accountId}
              question={question} 
              setMatchId={setMatchId} 
              setAccountId={setAccountId}
              setQuestion={setQuestion} 
              isAnalyzing={isAnalyzing}
              analysisStep={analysisStep}
              analysisError={analysisError}
              reportSource={reportSource}
              reportParsed={reportParsed}
              reportPerspective={reportPerspective}
              replayReport={replayReport}
              startAnalysis={startReplayAnalysis}
              copyReport={copyMarkdownReport}
              copyStatus={copyStatus}
            />
          )}

          {mode === "coach" && (
            <CoachWorkspacePanel
              students={students}
              activeStudentId={activeStudentId}
              setActiveStudent={handleSelectStudent}
              newStudentName={newStudentName}
              setNewStudentName={setNewStudentName}
              newStudentMMR={newStudentMMR}
              setNewStudentMMR={setNewStudentMMR}
              newStudentHero={newStudentHero}
              setNewStudentHero={setNewStudentHero}
              handleAddStudent={handleAddStudent}
              handleDeleteStudent={handleDeleteStudent}
              academyName={academyName}
              setAcademyName={setAcademyName}
              brandingColor={brandingColor}
              setBrandingColor={setBrandingColor}
              coachReport={coachReport}
              setCoachReport={setCoachReport}
              copyReport={copyCoachReport}
              copyStatus={copyStatus}
            />
          )}
        </section>
      </div>
    </main>
  );
}

function ModeButton({
  active,
  children,
  icon,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button aria-pressed={active} className="navButton" onClick={onClick} type="button">
      {icon}
      {children}
    </button>
  );
}

function SegmentedField<T extends string>({
  label,
  labels,
  onChange,
  value,
  values,
}: {
  label: string;
  labels: Record<T, string>;
  onChange: (value: T) => void;
  value: T;
  values: T[];
}) {
  return (
    <div className="fieldGroup">
      <span className="fieldLabel">{label}</span>
      <div className="segmented">
        {values.map((item) => (
          <button
            aria-pressed={value === item}
            className="segButton"
            key={item}
            onClick={() => onChange(item)}
            type="button"
          >
            {labels[item]}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectField<T extends string>({
  label,
  labels,
  onChange,
  value,
  values,
}: {
  label: string;
  labels: Record<T, string>;
  onChange: (value: T) => void;
  value: T;
  values: T[];
}) {
  return (
    <label className="fieldGroup">
      <span className="fieldLabel">{label}</span>
      <select className="selectInput" onChange={(event) => onChange(event.target.value as T)} value={value}>
        {values.map((item) => (
          <option key={item} value={item}>
            {labels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}

function HeroPicker({
  onToggle,
  selected,
  title,
}: {
  onToggle: (id: string) => void;
  selected: string[];
  title: string;
}) {
  return (
    <div className="fieldGroup">
      <span className="fieldLabel">{title}</span>
      <div className="heroGrid">
        {HEROES.map((hero) => {
          const isSelected = selected.includes(hero.id);
          const hasBuff = hero.patchValue > 0;
          const hasNerf = hero.patchValue < 0;
          return (
            <button
              aria-pressed={isSelected}
              className={`heroButton ${isSelected ? "selected" : ""} ${hasBuff ? "buffed" : ""} ${hasNerf ? "nerfed" : ""}`}
              key={hero.id}
              onClick={() => onToggle(hero.id)}
              type="button"
            >
              <span className="heroName">{hero.name}</span>
              <span className="heroRoles">{hero.roles.map((heroRole) => ROLE_LABELS[heroRole]).join(", ")}</span>
              {(hasBuff || hasNerf) && (
                <span className={`patchBadge ${hasBuff ? "buff" : "nerf"}`}>
                  {hasBuff ? "▲" : "▼"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DraftColumn({
  onToggle,
  selected,
  title,
}: {
  onToggle: (id: string) => void;
  selected: string[];
  title: string;
}) {
  return (
    <div className="fieldGroup">
      <span className="fieldLabel">{title}</span>
      <div className="draftSlots">
        {HEROES.slice(0, 15).map((hero) => {
          const isSelected = selected.includes(hero.id);
          return (
            <button
              aria-pressed={isSelected}
              className={`slotButton ${isSelected ? "selected" : ""}`}
              key={hero.id}
              onClick={() => onToggle(hero.id)}
              type="button"
            >
              {isSelected && <Check size={12} className="checkIcon" />}
              {hero.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DraftResult({ 
  analysis,
  isAnalyzingDraft,
  draftError,
  showDetails,
  toggleDetails
}: { 
  analysis: DraftAnalysis | null;
  isAnalyzingDraft: boolean;
  draftError: string | null;
  showDetails: boolean;
  toggleDetails: () => void;
}) {
  if (isAnalyzingDraft) {
    return (
      <section className="panel" aria-label="Analizando draft">
        <div className="panelHeader">
          <h3 className="panelTitle">An?lisis del Draft</h3>
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
      <section className="panel" aria-label="Error de analisis">
        <div className="panelHeader">
          <h3 className="panelTitle">An?lisis del Draft</h3>
        </div>
        <div className="panelBody">
          <div className="emptyState" style={{ minHeight: "260px" }}>
            <AlertTriangle size={36} className="emptyStateIcon" />
            <h4 className="emptyStateTitle" style={{ color: "var(--red)" }}>Fallo de conexi?n</h4>
            <p className="emptyStateText">{draftError}</p>
          </div>
        </div>
      </section>
    );
  }

  const best = analysis?.best;

  return (
    <section className="panel" aria-label="Resultado del analisis">
      <div className="panelHeader resultHeader">
        <div>
          <h3 className="panelTitle">An?lisis del Draft</h3>
          <p className="panelNote">{analysis?.freshnessWarning}</p>
        </div>
        {best && (
          <button className="detailsToggleBtn" onClick={toggleDetails} type="button">
            {showDetails ? "Ocultar desglose" : "Ver desglose de puntuaci?n"}
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
                  <ScoreBar label="Matchup en L?nea" value={best.scores.laneMatchup} max={24} color="#38A169" />
                  <ScoreBar label="Sinergia de Equipo" value={best.scores.teamSynergy} max={22} color="#3182CE" />
                  <ScoreBar label="Fuerza del Counter" value={best.scores.counterValue} max={18} min={-8} color="#D69E2E" />
                  <ScoreBar label="Modificador del Parche" value={best.scores.patchValue} max={8} min={-8} color="#E53E3E" />
                  <ScoreBar label="Riesgo de Ejecuci?n" value={-best.scores.executionRisk} max={0} min={-15} color="#9B2C2C" />
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
              <Metric label="Primer Core timings" value={best.firstCore.join(" -> ")} icon={<TrendingUp size={14} className="iconGreen" />} />
              <Metric label="Carencias que debes cubrir" value={analysis.teamNeeds.slice(0, 3).join(" / ") || "Composici?n balanceada"} icon={<Cpu size={14} className="iconPurple" />} />
              <Metric label="Win-Conditions enemigas" value={analysis.enemyThreats.join(" / ") || "Sin amenazas de late cr?ticas"} icon={<AlertTriangle size={14} className="iconRed" />} />
            </div>

            <div className="planSection">
              <span className="blockLabel">Plan t?ctico por fases:</span>
              <div className="planGrid">
                <Phase title="L?nea (Min 0-5)" text={best.plan.early} />
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
            <p className="emptyStateText">Tu pool de h?roes est? vac?o para el rol seleccionado o no hay coincidencias configuradas.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ScoreBar({ 
  label, 
  value, 
  max, 
  min = 0,
  color 
}: { 
  label: string; 
  value: number; 
  max: number; 
  min?: number;
  color: string;
}) {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="scoreBarRow">
      <span className="scoreBarLabel">{label}</span>
      <div className="scoreBarContainer">
        <div className="scoreBarFill" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
      </div>
      <span className="scoreBarValue">{value > 0 ? `+${value}` : value}</span>
    </div>
  );
}

function PatchCoachPanel({ 
  heroPool,
  selectedHeroId,
  onSelectHero
}: { 
  heroPool: string[];
  selectedHeroId: string;
  onSelectHero: (id: string) => void;
}) {
  const heroes = HEROES.filter((hero) => heroPool.includes(hero.id));
  const activeHero = HEROES.find(h => h.id === selectedHeroId) || heroes[0];

  return (
    <div className="placeholderGrid patchPanelGrid">
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Mi Pool en este Parche</h3>
          <p className="panelNote">Selecciona un h?roe para auditar los cambios aplicados en la versi?n {PATCH_STATE.version}.</p>
        </div>
        <div className="panelBody">
          <div className="patchHeroList">
            {heroes.length > 0 ? (
              heroes.map((hero) => {
                const isActive = hero.id === selectedHeroId;
                const statusClass = hero.patchValue > 0 ? "buff" : hero.patchValue < 0 ? "nerf" : "neutral";
                const statusText = hero.patchValue > 0 ? "Priorizar" : hero.patchValue < 0 ? "Evitar" : "Estable";
                return (
                  <button 
                    key={hero.id} 
                    className={`patchHeroRow ${isActive ? "active" : ""}`}
                    onClick={() => onSelectHero(hero.id)}
                  >
                    <div className="patchHeroMeta">
                      <span className="patchHeroName">{hero.name}</span>
                      <span className="patchHeroRoles">{hero.roles.map(r => ROLE_LABELS[r]).join(", ")}</span>
                    </div>
                    <span className={`patchHeroStatus ${statusClass}`}>{statusText}</span>
                  </button>
                );
              })
            ) : (
              <div className="emptyState">
                <AlertTriangle size={24} />
                <p>Configura tu Hero Pool en la pesta?a de Draft para ver tu listado aqu?.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Detalles del Parche: {activeHero ? activeHero.name : "Selecciona H?roe"}</h3>
          <p className="panelNote">Evidencia de cambios extra?dos del changelog y an?lisis t?ctico.</p>
        </div>
        <div className="panelBody">
          {activeHero ? (
            <div className="patchNotesContent">
              <div className="heroMetaGrid">
                <div className="metaBox">
                  <span className="metaLabel">Patch Value</span>
                  <span className={`metaValue ${activeHero.patchValue > 0 ? "greenText" : activeHero.patchValue < 0 ? "redText" : ""}`}>
                    {activeHero.patchValue > 0 ? `+${activeHero.patchValue} (Buff)` : activeHero.patchValue < 0 ? `${activeHero.patchValue} (Nerf)` : "0 (Sin cambios)"}
                  </span>
                </div>
                <div className="metaBox">
                  <span className="metaLabel">Fuerza en L?nea</span>
                  <span className="metaValue goldText">{"★".repeat(activeHero.laneStrength)}</span>
                </div>
              </div>

              <div className="notesBlock">
                <span className="notesTitle">Changelog Oficial {PATCH_STATE.version}</span>
                <ul className="notesList">
                  {(PATCH_NOTES_BY_HERO[activeHero.id] || [
                    "Sin cambios directos en los atributos de este h?roe.",
                    "Afectado ?nicamente por ajustes globales de econom?a e ?tems neutrales."
                  ]).map((note, idx) => (
                    <li key={idx}>
                      <span className="noteBullet">-</span>
                      <p>{note}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tacticalAudit">
                <span className="notesTitle">Recomendaci?n del Parche</span>
                <p className="tacticalDesc">
                  {activeHero.patchValue > 0 
                    ? `Los buffs recibidos posicionan a ${activeHero.name} como un pick s?lido en este parche. Maximiza su lane presence con items como ${activeHero.startingItems.slice(0,2).join(" y ")} y presiona timings r?pidos.`
                    : activeHero.patchValue < 0 
                    ? `Ten cuidado. Los nerfs directos debilitaron su capacidad de juego en fase de l?neas. Considera alternar a otros h?roes si ves counters agresivos visibles en el draft.`
                    : `${activeHero.name} se mantiene balanceado y estable. Conserva su build estandar: ${activeHero.firstCore.join(" -> ")}.`}
                </p>
              </div>
            </div>
          ) : (
            <div className="emptyState">
              <BookOpen size={32} />
              <p>Selecciona un h?roe para auditar los cambios.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ReplayPanel({
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
  copyStatus
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
  reportSource: "ai" | "deterministic" | null;
  reportParsed: boolean | null;
  reportPerspective: ReportApiResponse["perspective"] | null;
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
            <p className="panelNote">Ingresa un Match ID p?blico de Dota 2 (ej: 8850507008) para generar el reporte de coaching.</p>
          </div>
          <div className="panelBody">
            <div className="fieldGroup">
              <label htmlFor="matchIdInput" className="fieldLabel">Match ID (P?blico)</label>
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
              <label htmlFor="accountIdInput" className="fieldLabel">Steam32 Account ID</label>
              <input
                id="accountIdInput"
                className="textInput fontMono"
                onChange={(event) => setAccountId(event.target.value)}
                value={accountId}
                placeholder="Ej. 218999530"
                disabled={isAnalyzing}
              />
              <p className="panelNote">Sin Account ID, el backend puede caer al jugador con mayor net worth.</p>
            </div>
            <div className="fieldGroup">
              <label htmlFor="questionInput" className="fieldLabel">Pregunta tactica principal</label>
              <textarea 
                id="questionInput"
                className="textInput" 
                onChange={(event) => setQuestion(event.target.value)} 
                rows={4} 
                value={question} 
                placeholder="Ej. ?Qu? decisi?n me cost? la partida? ?C?mo estuvo mi timing de items?"
                disabled={isAnalyzing}
              />
            </div>
            <button 
              className="primaryAction runActionBtn" 
              onClick={startAnalysis}
              disabled={isAnalyzing || !matchId || !accountId}
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
            <p className="panelNote">El reporte se renderiza combinando m?tricas de OpenDota con heur?sticas de rol.</p>
          </div>
          <div className="panelBody displayPanelBody">
            {isAnalyzing && (
              <div className="loadingState">
                <Cpu size={40} className="spinIcon textRed" />
                <span className="loadingTitle">Ingiriendo datos de la partida</span>
                <div className="loadingSteps">
                  <p className="activeStep">{[
                    "Conectando con la API p?blica de OpenDota...",
                    "Descargando metadatos del match y parseando timelines...",
                    "Identificando timings de ?tems core y GPM por rol...",
                    "Analizando eventos de muertes en Roshan y peleas cr?ticas...",
                    "Generando diagn?stico t?ctico bajo el meta del parche 7.41d..."
                  ][analysisStep] || "Finalizando reporte..."}</p>
                </div>
                <div className="progressBarOuter">
                  <div className="progressBarInner" style={{ width: `${((analysisStep + 1) / 5) * 100}%` }}></div>
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
                <p className="emptyStateText">Ingresa los datos del formulario de la izquierda y haz clic en "Generar Reporte de Coach" para auditar la partida.</p>
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
                    {reportSource === "ai" ? "Redaccion con IA" : "Reporte determinista"}
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
                      <span className="metaLabel">H?roe / Rol</span>
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
                  <p className="verdictText">"{replayReport.verdict}"</p>
                </div>

                <div className="fasesSection">
                  <span className="sectionTitle">An?lisis del Desempe?o por Fase</span>
                  <div className="faseCard">
                    <div className="faseCardHeader bgGreen">Fase de L?neas (Min 0-10)</div>
                    <div className="faseCardBody">
                      <p><strong>OK Acierto:</strong> {replayReport.phases.lane.good}</p>
                      <p className="redText"><strong>Error:</strong> {replayReport.phases.lane.error}</p>
                      <p className="blueText"><strong>Correccion:</strong> {replayReport.phases.lane.change}</p>
                    </div>
                  </div>

                  <div className="faseCard">
                    <div className="faseCardHeader bgAmber">Mid Game (Min 10-25)</div>
                    <div className="faseCardBody">
                      <p><strong>OK Acierto:</strong> {replayReport.phases.mid.good}</p>
                      <p className="redText"><strong>Error:</strong> {replayReport.phases.mid.error}</p>
                      <p className="blueText"><strong>Correccion:</strong> {replayReport.phases.mid.change}</p>
                    </div>
                  </div>

                  <div className="faseCard">
                    <div className="faseCardHeader bgPurple">Late Game (Min 25+)</div>
                    <div className="faseCardBody">
                      <p><strong>OK Acierto:</strong> {replayReport.phases.late.good}</p>
                      <p className="redText"><strong>Error:</strong> {replayReport.phases.late.error}</p>
                      <p className="blueText"><strong>Correccion:</strong> {replayReport.phases.late.change}</p>
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
                          <strong>Acci?n Correctiva:</strong>
                          <p>{err.fix}</p>
                        </div>
                        <div>
                          <strong>Drill / C?mo Practicarlo:</strong>
                          <p className="greenText">{err.practice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="trainingSection">
                  <span className="sectionTitle">Plan de Entrenamiento (7 D?as)</span>
                  <div className="trainingGrid">
                    {replayReport.plan.map((dayPlan, idx) => (
                      <div className="trainingDayCard" key={idx}>
                        <span className="dayLabel">D?A {idx + 1}</span>
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

function CoachWorkspacePanel({
  students,
  activeStudentId,
  setActiveStudent,
  newStudentName,
  setNewStudentName,
  newStudentMMR,
  setNewStudentMMR,
  newStudentHero,
  setNewStudentHero,
  handleAddStudent,
  handleDeleteStudent,
  academyName,
  setAcademyName,
  brandingColor,
  setBrandingColor,
  coachReport,
  setCoachReport,
  copyReport,
  copyStatus
}: {
  students: Array<{ id: string; name: string; MMR: string; favoriteHero: string; lastReport: string }>;
  activeStudentId: string;
  setActiveStudent: (id: string) => void;
  newStudentName: string;
  setNewStudentName: (val: string) => void;
  newStudentMMR: Bracket;
  setNewStudentMMR: (val: Bracket) => void;
  newStudentHero: string;
  setNewStudentHero: (val: string) => void;
  handleAddStudent: (e: React.FormEvent) => void;
  handleDeleteStudent: (id: string) => void;
  academyName: string;
  setAcademyName: (val: string) => void;
  brandingColor: string;
  setBrandingColor: (val: string) => void;
  coachReport: MockReplayReport | null;
  setCoachReport: (rep: MockReplayReport | null) => void;
  copyReport: () => void;
  copyStatus: boolean;
}) {
  const activeStudent = students.find(s => s.id === activeStudentId);

  // Quick edit handlers
  const updateVerdict = (text: string) => {
    if (!coachReport) return;
    setCoachReport({ ...coachReport, verdict: text });
  };

  const updateError = (index: number, key: 'title' | 'evidence' | 'impact' | 'fix' | 'practice', text: string) => {
    if (!coachReport) return;
    const updatedErrors = [...coachReport.errors];
    updatedErrors[index] = { ...updatedErrors[index], [key]: text };
    setCoachReport({ ...coachReport, errors: updatedErrors });
  };

  const updateDayPlan = (index: number, text: string) => {
    if (!coachReport) return;
    const updatedPlan = [...coachReport.plan];
    updatedPlan[index] = text;
    setCoachReport({ ...coachReport, plan: updatedPlan });
  };

  return (
    <div className="placeholderGrid patchPanelGrid coachWorkspaceGrid">
      <div className="leftCoachColumn">
        <section className="panel">
          <div className="panelHeader">
            <h3 className="panelTitle">Mis Alumnos</h3>
            <p className="panelNote">Gestiona los perfiles y selecciona al alumno activo para editar sus reportes.</p>
          </div>
          <div className="panelBody">
            <div className="patchHeroList studentsList">
              {students.map((student) => {
                const isActive = student.id === activeStudentId;
                return (
                  <div key={student.id} className={`studentRowWrapper ${isActive ? "active" : ""}`}>
                    <button 
                      className="studentSelectBtn"
                      onClick={() => setActiveStudent(student.id)}
                      type="button"
                      aria-label={`Seleccionar alumno ${student.name}`}
                    >
                      <User size={16} className="studentAvatarIcon" />
                      <div className="patchHeroMeta">
                        <span className="patchHeroName">{student.name}</span>
                        <span className="patchHeroRoles">{student.MMR} | Pool: {student.favoriteHero}</span>
                      </div>
                    </button>
                    {students.length > 1 && (
                      <button 
                        className="deleteStudentBtn" 
                        onClick={() => handleDeleteStudent(student.id)}
                        title={`Eliminar Alumno ${student.name}`}
                        aria-label={`Eliminar alumno ${student.name}`}
                        type="button"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleAddStudent} className="addStudentForm">
              <span className="formSubHeader">Registrar Alumno</span>
              <div className="fieldGroup">
                <input 
                  className="textInput" 
                  onChange={(e) => setNewStudentName(e.target.value)} 
                  value={newStudentName} 
                  placeholder="Nombre o Nickname..."
                  aria-label="Nombre del alumno a registrar"
                  required
                />
              </div>
              <div className="inlineFields">
                <SelectField 
                  label="Bracket" 
                  value={newStudentMMR} 
                  onChange={setNewStudentMMR} 
                  values={BRACKETS} 
                  labels={BRACKET_LABELS} 
                />
                <SelectField 
                  label="H?roe Favorito" 
                  value={newStudentHero} 
                  onChange={setNewStudentHero} 
                  values={HEROES.map(h => h.id)} 
                  labels={HEROES.reduce((acc, h) => ({ ...acc, [h.id]: h.name }), {})} 
                />
              </div>
              <button className="primaryAction addBtn" type="submit" aria-label="Agregar nuevo alumno">
                <Plus size={16} />
                A?adir Alumno
              </button>
            </form>
          </div>
        </section>

        <section className="panel brandingWidgetPanel">
          <div className="panelHeader">
            <h3 className="panelTitle">Branding del Reporte</h3>
            <p className="panelNote">Firma y personaliza los reportes con la marca de tu propia academia de Dota 2.</p>
          </div>
          <div className="panelBody">
            <div className="fieldGroup">
              <label htmlFor="academyInput" className="fieldLabel">Nombre de la Academia / Coach</label>
              <input 
                id="academyInput"
                className="textInput" 
                onChange={(e) => setAcademyName(e.target.value)} 
                value={academyName} 
                placeholder="Ej. Lobo Dota Academy..."
              />
            </div>
            <div className="fieldGroup">
              <span className="fieldLabel">Color de Firma</span>
              <div className="colorSelectorGrid" role="radiogroup" aria-label="Selector de color de firma del reporte">
                {[
                  { hex: "#e53e3e", name: "Rojo Dire" },
                  { hex: "#48bb78", name: "Verde Radiant" },
                  { hex: "#3182ce", name: "Azul M?stico" },
                  { hex: "#805ad5", name: "P?rpura Runa" }
                ].map(col => (
                  <button
                    key={col.hex}
                    className={`colorDotBtn ${brandingColor === col.hex ? "active" : ""}`}
                    style={{ backgroundColor: col.hex }}
                    onClick={() => setBrandingColor(col.hex)}
                    title={col.name}
                    aria-label={`Color de firma: ${col.name}`}
                    aria-checked={brandingColor === col.hex}
                    role="radio"
                    type="button"
                  >
                    {brandingColor === col.hex && <Check size={12} className="colorCheckIcon" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="rightCoachColumn">
        <section className="panel editorPanel">
          <div className="panelHeader editorHeader">
            <div>
              <h3 className="panelTitle">
                Editor de Reportes: {activeStudent ? activeStudent.name : "Sin Alumno"}
              </h3>
              <p className="panelNote">
                {coachReport 
                  ? `Editando Match ID ${coachReport.matchId}. Escribe tus notas y corrige la IA.` 
                  : "Este alumno no tiene partidas auditadas recientemente."}
              </p>
            </div>
            {coachReport && (
              <button 
                className="primaryAction copyBtn" 
                onClick={copyReport}
                style={{ border: `1px solid ${brandingColor}`, boxShadow: `0 0 10px ${brandingColor}1b` }}
                type="button"
                aria-label="Exportar reporte personalizado de coach"
              >
                {copyStatus ? (
                  <>
                    <Check size={16} />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Exportar con Marca
                  </>
                )}
              </button>
            )}
          </div>
          <div className="panelBody displayPanelBody editorBody">
            {coachReport ? (
              <div className="editorWrapper">
                <div className="editorBrandingPreview" style={{ borderLeft: `4px solid ${brandingColor}` }}>
                  <div className="academyPreviewTitle" style={{ color: brandingColor }}>
                    {academyName || "Academia del Coach"}
                  </div>
                  <span className="academyPreviewSubtitle">Reporte de Entrenamiento Personalizado</span>
                </div>

                <div className="fieldGroup">
                  <label htmlFor="verdictTextarea" className="fieldLabel">Veredicto del Coach</label>
                  <textarea
                    id="verdictTextarea"
                    className="textInput editorTextarea"
                    rows={3}
                    value={coachReport.verdict}
                    onChange={(e) => updateVerdict(e.target.value)}
                  />
                </div>

                <div className="errorsSection editorSection">
                  <span className="sectionTitle">Editor de los 3 Errores de Mayor Costo</span>
                  {coachReport.errors.map((err, idx) => (
                    <div className="errorReportCard editorCard" key={idx}>
                      <h4 className="errorCardTitle">
                        <span className="errorIndex" style={{ backgroundColor: brandingColor, boxShadow: `0 0 5px ${brandingColor}` }}>
                          {idx + 1}
                        </span>
                        <input
                          className="editorHeaderInput"
                          value={err.title}
                          onChange={(e) => updateError(idx, 'title', e.target.value)}
                          placeholder={`T?tulo del Error ${idx + 1}`}
                          aria-label={`T?tulo del error n?mero ${idx + 1}`}
                        />
                      </h4>
                      <div className="errorCardGrid editorCardGrid">
                        <div>
                          <strong>Evidencia en Replay:</strong>
                          <textarea
                            className="textInput editorCellTextarea"
                            rows={2}
                            value={err.evidence}
                            onChange={(e) => updateError(idx, 'evidence', e.target.value)}
                            aria-label={`Evidencia en replay del error ${idx + 1}`}
                          />
                        </div>
                        <div>
                          <strong>Impacto en Oro/Control:</strong>
                          <textarea
                            className="textInput editorCellTextarea redText"
                            rows={2}
                            value={err.impact}
                            onChange={(e) => updateError(idx, 'impact', e.target.value)}
                            aria-label={`Impacto en juego del error ${idx + 1}`}
                          />
                        </div>
                        <div>
                          <strong>Acci?n Correctiva:</strong>
                          <textarea
                            className="textInput editorCellTextarea"
                            rows={2}
                            value={err.fix}
                            onChange={(e) => updateError(idx, 'fix', e.target.value)}
                            aria-label={`Acci?n correctiva del error ${idx + 1}`}
                          />
                        </div>
                        <div>
                          <strong>Drill / C?mo Practicarlo:</strong>
                          <textarea
                            className="textInput editorCellTextarea greenText"
                            rows={2}
                            value={err.practice}
                            onChange={(e) => updateError(idx, 'practice', e.target.value)}
                            aria-label={`Metodolog?a de pr?ctica del error ${idx + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="trainingSection editorSection">
                  <span className="sectionTitle">Plan de 7 D?as (Edici?n r?pida)</span>
                  <div className="trainingGrid editorGrid">
                    {coachReport.plan.map((dayPlan, idx) => (
                      <div className="trainingDayCard editorDayCard" key={idx}>
                        <span className="dayLabel">D?A {idx + 1}</span>
                        <textarea
                          className="textInput editorDayTextarea"
                          rows={3}
                          value={dayPlan}
                          onChange={(e) => updateDayPlan(idx, e.target.value)}
                          aria-label={`Tarea recomendada para el d?a ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="emptyState">
                <Clock size={36} className="emptyStateIcon" />
                <h4 className="emptyStateTitle">No hay reporte activo</h4>
                <p className="emptyStateText">
                  {activeStudent 
                    ? `El alumno ${activeStudent.name} no registra partidas en el sistema. Solicita su Match ID o haz clic en "Asistente Draft" para iniciar.`
                    : "Selecciona un alumno del panel izquierdo para ver su workspace."}
                </p>
                {activeStudent && activeStudent.id !== APP_CONFIG.DEFAULT_STUDENT_ID && (
                  <button 
                    className="primaryAction runActionBtn" 
                    onClick={() => {
                      setCoachReport(JSON.parse(JSON.stringify(MOCK_REPLAY_REPORTS[APP_CONFIG.DEFAULT_MATCH_ID])));
                    }}
                    type="button"
                    aria-label="Cargar reporte ficticio de entrenamiento"
                  >
                    <Plus size={16} />
                    Cargar Reporte de Prueba
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="metricBox">
      <div className="metricTitleRow">
        {icon}
        <span className="metricLabel">{label}</span>
      </div>
      <span className="metricValue">{value}</span>
    </div>
  );
}

function Phase({ text, title }: { text: string; title: string }) {
  return (
    <div className="phaseBox">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function ListBlock({ items, title, type }: { items: string[]; title: string; type: "good" | "bad" }) {
  const isGood = type === "good";
  return (
    <div className={`metricBox listBlockCard ${isGood ? "listGood" : "listBad"}`}>
      <span className="metricLabel blockLabelHeader">{title}</span>
      <ul className="compactList">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item}>
              <span className={`listIndicator ${isGood ? "green" : "red"}`}></span>
              {item}
            </li>
          ))
        ) : (
          <li>Sin datos suficientes.</li>
        )}
      </ul>
    </div>
  );
}

function toggleValue(value: string, list: string[], setList: (next: string[]) => void) {
  setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
}


