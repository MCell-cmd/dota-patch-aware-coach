"use client";

import {
  Award,
  BarChart3,
  BookOpen,
  Crosshair,
  FileText,
  Gauge,
  Swords,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  BRACKET_LABELS,
  Bracket,
  HEROES,
  PATCH_STATE,
  ROLE_LABELS,
  Role,
  STYLE_LABELS,
  Style,
  MockReplayReport,
  getDefaultMockReport,
} from "@/data/dota";
import { DraftAnalysis } from "@/lib/draft";
import { APP_CONFIG } from "@/config/constants";
import {
  ModeButton,
  SegmentedField,
  SelectField,
  HeroPicker,
  DraftColumn,
  toggleValue,
} from "@/components/fields";
import { DraftResult } from "@/components/DraftResult";
import { OnboardingTour } from "@/components/OnboardingTour";
import { PatchCoachPanel } from "@/components/PatchCoachPanel";
import { ReplayPanel, type ReportPerspective } from "@/components/ReplayPanel";
import { CoachWorkspacePanel } from "@/components/CoachWorkspacePanel";

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
      "Selecciona tu rol, bracket, estilo de juego, tu pool y héroes visibles. El motor puntuará en tiempo real bajo las reglas del parche.",
  },
  patch: {
    title: "Coach de parche interactivo",
    subtitle:
      "Consulta cómo afectan las actualizaciones del parche activo a tus héroes favoritos y descubre las builds del meta.",
  },
  replay: {
    title: "Análisis post-partida por Match ID",
    subtitle:
      "Ingresa el identificador público de tu partida y tu duda. El sistema consultará OpenDota y generará un reporte con datos reales.",
  },
  coach: {
    title: "Workspace del Coach (B2B)",
    subtitle:
      "Gestiona tu lista de alumnos, edita los reportes generados por la IA con tus propios comentarios y personaliza la marca de exportación.",
  },
};

const ROLES = Object.keys(ROLE_LABELS) as Role[];
const BRACKETS = Object.keys(BRACKET_LABELS) as Bracket[];
const STYLES = Object.keys(STYLE_LABELS) as Style[];

function cloneReport(report: MockReplayReport | undefined): MockReplayReport | null {
  return report ? (JSON.parse(JSON.stringify(report)) as MockReplayReport) : null;
}

export function CoachApp() {
  const [mode, setMode] = useState<Mode>("draft");
  const [role, setRole] = useState<Role>("mid");
  const [bracket, setBracket] = useState<Bracket>("archon");
  const [style, setStyle] = useState<Style>("comfort");
  const [heroPool, setHeroPool] = useState<string[]>(["viper", "lina", "zeus", "invoker"]);
  const [allies, setAllies] = useState<string[]>(["axe", "crystal-maiden", "sniper"]);
  const [enemies, setEnemies] = useState<string[]>(["phantom-assassin", "lion", "tidehunter"]);

  // Draft analysis (server-side scoring)
  const [analysis, setAnalysis] = useState<DraftAnalysis | null>(null);
  const [isAnalyzingDraft, setIsAnalyzingDraft] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);

  // Replay states
  const [matchId, setMatchId] = useState(APP_CONFIG.DEFAULT_MATCH_ID);
  const [accountId, setAccountId] = useState(APP_CONFIG.DEFAULT_ACCOUNT_ID);
  const [question, setQuestion] = useState("¿Qué decisión me hizo perder más impacto?");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [reportSource, setReportSource] = useState<"ai" | "deterministic" | null>(null);
  const [reportParsed, setReportParsed] = useState<boolean | null>(null);
  const [reportPerspective, setReportPerspective] = useState<ReportPerspective>(null);
  const [replayReport, setReplayReport] = useState<MockReplayReport | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // Patch states
  const [selectedPatchHeroId, setSelectedPatchHeroId] = useState<string>("viper");

  // Draft details toggle
  const [showDraftDetails, setShowDraftDetails] = useState(false);

  // B2B Coach Workspace states
  const [students, setStudents] = useState([
    {
      id: APP_CONFIG.DEFAULT_STUDENT_ID,
      name: "Maikel 'Lobo' S.",
      MMR: "Archon",
      favoriteHero: "Viper",
      lastReport: getDefaultMockReport().matchId,
    },
    { id: "student-2", name: "Carlos 'Gank' M.", MMR: "Legend", favoriteHero: "Axe", lastReport: "Ninguno" },
    { id: "student-3", name: "Santi 'Support' F.", MMR: "Guardian", favoriteHero: "Crystal Maiden", lastReport: "Ninguno" },
  ]);
  const [activeStudentId, setActiveStudentId] = useState<string>(APP_CONFIG.DEFAULT_STUDENT_ID);
  const [academyName, setAcademyName] = useState(APP_CONFIG.DEFAULT_ACADEMY_NAME);
  const [brandingColor, setBrandingColor] = useState<string>(APP_CONFIG.DEFAULT_BRANDING_COLOR);
  const [coachReport, setCoachReport] = useState<MockReplayReport | null>(() =>
    cloneReport(getDefaultMockReport()),
  );

  // Add student form
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentMMR, setNewStudentMMR] = useState<Bracket>("archon");
  const [newStudentHero, setNewStudentHero] = useState("viper");

  // Server-side draft analysis with debounce to avoid flooding the endpoint.
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      setIsAnalyzingDraft(true);
      setDraftError(null);
      try {
        const response = await fetch("/api/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
    }, 300);

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
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newStudent = {
      id: `student-${Date.now()}`,
      name: newStudentName,
      MMR: BRACKET_LABELS[newStudentMMR],
      favoriteHero: HEROES.find((h) => h.id === newStudentHero)?.name || newStudentHero,
      lastReport: "Ninguno",
    };

    setStudents([...students, newStudent]);
    setActiveStudentId(newStudent.id);
    setCoachReport(null);
    setNewStudentName("");
  };

  const handleDeleteStudent = (id: string) => {
    if (students.length <= 1) return; // Keep at least one
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    if (activeStudentId === id) {
      setActiveStudentId(updated[0].id);
      setCoachReport(
        updated[0].id === APP_CONFIG.DEFAULT_STUDENT_ID ? cloneReport(getDefaultMockReport()) : null,
      );
    }
  };

  const handleSelectStudent = (id: string) => {
    setActiveStudentId(id);
    setCoachReport(id === APP_CONFIG.DEFAULT_STUDENT_ID ? cloneReport(getDefaultMockReport()) : null);
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
              <p className="brandMeta">Dashboard táctico & análisis inteligente</p>
            </div>
          </div>
          <div className="statusStrip" aria-label="Estado de datos">
            <OnboardingTour onStart={() => setMode("draft")} />
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

          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
          {mode === "draft" && (
            <div className="contentGrid">
              <section className="panel" aria-label="Entrada de draft">
                <div className="panelHeader">
                  <h3 className="panelTitle">Parámetros tácticos</h3>
                  <p className="panelNote">Entrada manual sin overlay. El control sigue estando 100% de tu lado.</p>
                </div>
                <div className="panelBody" data-tour="draft-inputs">
                  <SegmentedField
                    label="Mi Rol"
                    values={ROLES}
                    labels={ROLE_LABELS}
                    value={role}
                    onChange={setRole}
                    help="Tu posición en la partida. Cambia qué héroes se sugieren y cómo se puntúa cada uno."
                  />
                  <SelectField
                    label="Rango / Bracket"
                    value={bracket}
                    onChange={setBracket}
                    values={BRACKETS}
                    labels={BRACKET_LABELS}
                    help="Tu rango de MMR. Ajusta el meta esperado y la dificultad de ejecución que penaliza el motor."
                  />
                  <SegmentedField
                    label="Estilo de Juego"
                    values={STYLES}
                    labels={STYLE_LABELS}
                    value={style}
                    onChange={setStyle}
                    help="Cómo te gusta jugar. Reordena las recomendaciones hacia héroes que encajan con tu estilo."
                  />

                  <HeroPicker
                    title="Mi Pool de Héroes"
                    selected={heroPool}
                    onToggle={(id) => toggleValue(id, heroPool, setHeroPool)}
                    help="Marca los héroes que dominas. El motor solo recomienda picks de este pool."
                  />

                  <div className="draftColumns">
                    <DraftColumn
                      title="Aliados ya elegidos"
                      selected={allies}
                      onToggle={(id) => toggleValue(id, allies, setAllies)}
                      help="Héroes que ya eligió tu equipo. Suman a la sinergia del pick recomendado."
                    />
                    <DraftColumn
                      title="Enemigos ya elegidos"
                      selected={enemies}
                      onToggle={(id) => toggleValue(id, enemies, setEnemies)}
                      help="Héroes del equipo rival. El motor premia picks que los countean."
                    />
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
          </motion.div>
        </section>
      </div>
    </main>
  );
}
