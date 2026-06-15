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
import { useEffect, useMemo, useState } from "react";
import {
  BRACKET_LABELS,
  Bracket,
  HEROES,
  PATCH_STATE,
  ROLE_LABELS,
  Role,
  STYLE_LABELS,
  Style,
  MOCK_REPLAY_REPORTS,
  MockReplayReport,
} from "@/data/dota";
import { analyzeDraft } from "@/lib/draft";
import {
  DraftColumn,
  HeroPicker,
  ModeButton,
  SegmentedField,
  SelectField,
  toggleValue,
} from "@/components/fields";
import { DraftResult } from "@/components/DraftResult";
import { PatchCoachPanel } from "@/components/PatchCoachPanel";
import { ReplayPanel } from "@/components/ReplayPanel";
import { CoachWorkspacePanel } from "@/components/CoachWorkspacePanel";

type Mode = "draft" | "patch" | "replay" | "coach";

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
      "Ingresa el identificador público de tu partida y tu duda. El sistema ingiere datos reales de OpenDota y genera el diagnóstico táctico.",
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

export function CoachApp() {
  const [mode, setMode] = useState<Mode>("draft");
  const [role, setRole] = useState<Role>("mid");
  const [bracket, setBracket] = useState<Bracket>("archon");
  const [style, setStyle] = useState<Style>("comfort");
  const [heroPool, setHeroPool] = useState<string[]>(["viper", "lina", "zeus", "invoker"]);
  const [allies, setAllies] = useState<string[]>(["axe", "crystal-maiden", "sniper"]);
  const [enemies, setEnemies] = useState<string[]>(["phantom-assassin", "lion", "tidehunter"]);

  // Replay States
  const [matchId, setMatchId] = useState("8850507008");
  const [accountId, setAccountId] = useState("");
  const [question, setQuestion] = useState("Que decision me hizo perder mas impacto?");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [reportSource, setReportSource] = useState<string | null>(null);
  const [replayReport, setReplayReport] = useState<MockReplayReport | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // Patch States
  const [selectedPatchHeroId, setSelectedPatchHeroId] = useState<string>("viper");

  // Draft States
  const [showDraftDetails, setShowDraftDetails] = useState(false);

  // B2B Coach Workspace States
  const [students, setStudents] = useState([
    { id: "student-1", name: "Maikel 'Lobo' S.", MMR: "Archon", favoriteHero: "Viper", lastReport: "8850507008" },
    { id: "student-2", name: "Carlos 'Gank' M.", MMR: "Legend", favoriteHero: "Axe", lastReport: "Ninguno" },
    { id: "student-3", name: "Santi 'Support' F.", MMR: "Guardian", favoriteHero: "Crystal Maiden", lastReport: "Ninguno" },
  ]);
  const [activeStudentId, setActiveStudentId] = useState<string>("student-1");
  const [academyName, setAcademyName] = useState("Lobo Dota Academy");
  const [brandingColor, setBrandingColor] = useState<string>("#e53e3e");
  const [coachReport, setCoachReport] = useState<MockReplayReport | null>(() =>
    loadStudentReport("student-1"),
  );

  // Add student Form
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentMMR, setNewStudentMMR] = useState<Bracket>("archon");
  const [newStudentHero, setNewStudentHero] = useState("viper");

  const analysis = useMemo(
    () => analyzeDraft({ role, bracket, style, heroPool, allies, enemies }),
    [role, bracket, style, heroPool, allies, enemies],
  );

  const copy = MODE_COPY[mode];

  // Replay analysis: llamada real a /api/report (OpenDota + motor + IA).
  const startReplayAnalysis = async () => {
    if (!matchId.trim()) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setReplayReport(null);
    setAnalysisError(null);
    setReportSource(null);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: matchId.trim(),
          question,
          accountId: accountId.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAnalysisError(data?.error || "No se pudo generar el reporte.");
        return;
      }
      setReplayReport({ ...data.report, matchId: matchId.trim(), question });
      setReportSource(data.source);
    } catch {
      setAnalysisError("Error de red al contactar el servidor. Revisa tu conexión.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Animación de progreso mientras la petición real está en vuelo.
  useEffect(() => {
    if (!isAnalyzing) return;
    const timer = setInterval(() => {
      setAnalysisStep((prev) => (prev + 1) % 5);
    }, 900);
    return () => clearInterval(timer);
  }, [isAnalyzing]);

  // Selección de alumno: carga su reporte editable sin efectos colaterales.
  const selectStudent = (id: string) => {
    setActiveStudentId(id);
    setCoachReport(loadStudentReport(id));
  };

  const flashCopied = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const copyMarkdownReport = () => {
    if (!replayReport) return;
    copyToClipboard(generateMarkdown(replayReport), flashCopied);
  };

  const copyCoachReport = () => {
    if (!coachReport) return;
    copyToClipboard(generateMarkdown(coachReport, academyName), flashCopied);
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
    selectStudent(newStudent.id);
    setNewStudentName("");
  };

  const handleDeleteStudent = (id: string) => {
    if (students.length <= 1) return; // Keep at least one
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    if (activeStudentId === id) {
      selectStudent(updated[0].id);
    }
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
                  <h3 className="panelTitle">Parámetros tácticos</h3>
                  <p className="panelNote">Entrada manual sin overlay. El control sigue estando 100% de tu lado.</p>
                </div>
                <div className="panelBody">
                  <SegmentedField label="Mi Rol" values={ROLES} labels={ROLE_LABELS} value={role} onChange={setRole} />
                  <SelectField label="Rango / Bracket" value={bracket} onChange={setBracket} values={BRACKETS} labels={BRACKET_LABELS} />
                  <SegmentedField label="Estilo de Juego" values={STYLES} labels={STYLE_LABELS} value={style} onChange={setStyle} />

                  <HeroPicker title="Mi Pool de Héroes" selected={heroPool} onToggle={(id) => toggleValue(id, heroPool, setHeroPool)} />

                  <div className="draftColumns">
                    <DraftColumn title="Aliados ya elegidos" selected={allies} onToggle={(id) => toggleValue(id, allies, setAllies)} />
                    <DraftColumn title="Enemigos ya elegidos" selected={enemies} onToggle={(id) => toggleValue(id, enemies, setEnemies)} />
                  </div>
                </div>
              </section>

              <DraftResult
                analysis={analysis}
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
              setActiveStudent={selectStudent}
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

// Carga el reporte base de un alumno (clon profundo para edición independiente).
function loadStudentReport(id: string): MockReplayReport | null {
  if (id === "student-1") {
    return JSON.parse(JSON.stringify(MOCK_REPLAY_REPORTS["8850507008"]));
  }
  return null;
}

function generateMarkdown(report: MockReplayReport, academy?: string) {
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
${report.errors.map((err, idx) => `
### ${idx + 1}. ${err.title}
- **Evidencia:** ${err.evidence}
- **Impacto:** ${err.impact}
- **Corrección:** ${err.fix}
- **Ejercicio:** ${err.practice}
`).join("\n")}

## PLAN DE ACCIÓN DE 7 DÍAS
${report.plan.map((p) => `- ${p}`).join("\n")}

## PRÓXIMA PARTIDA
- **Objetivo Único:** ${report.nextSteps.objective}
- **Métrica Clave:** ${report.nextSteps.metric}
- **Pregunta de Revisión:** ${report.nextSteps.question}
  `.trim();
}

// Copia robusta: usa la API moderna y cae a un textarea oculto si el navegador
// la bloquea (contextos no seguros o permisos denegados).
function copyToClipboard(text: string, onDone: () => void) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(onDone).catch(() => {
      legacyCopy(text);
      onDone();
    });
    return;
  }
  legacyCopy(text);
  onDone();
}

function legacyCopy(text: string) {
  if (typeof document === "undefined") return;
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  } catch {
    // Sin portapapeles disponible; el usuario puede copiar manualmente.
  }
}
