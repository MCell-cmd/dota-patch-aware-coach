"use client";

import { Calendar, Crosshair, Eye, FileText, Gauge, Swords, TrendingUp, BarChart3, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast, Toaster } from "sonner";
import {
  BRACKET_LABELS,
  Bracket,
  PATCH_STATE,
  ROLE_LABELS,
  Role,
  STYLE_LABELS,
  Style,
} from "@/data/dota";
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
import { SteamAuth } from "@/components/SteamAuth";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { track } from "@/lib/analytics";
import { PatchCoachPanel } from "@/components/PatchCoachPanel";
import { ReplayPanel } from "@/components/ReplayPanel";
import { VisionCoachPanel } from "@/components/VisionCoachPanel";
import { VisionPhase } from "@/data/vision";
import { WeeklyPoolPanel } from "@/components/WeeklyPoolPanel";
import { useDraftController } from "@/hooks/useDraftController";
import { useReplayController } from "@/hooks/useReplayController";
import { generateMarkdown } from "@/lib/markdown";

export type CoachMode = "draft" | "patch" | "weekly" | "vision" | "replay";

const MODE_ROUTES: Record<CoachMode, string> = {
  draft: "/draft",
  patch: "/patch",
  weekly: "/weekly",
  vision: "/vision",
  replay: "/replay",
};

const MODE_COPY: Record<CoachMode, { title: string; subtitle: string }> = {
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
  weekly: {
    title: "Mi Hero Pool Semanal",
    subtitle:
      "Clasifica tus héroes activos según su estado en el parche, tu rol y bracket, devolviendo decisiones concretas.",
  },
  vision: {
    title: "Vision Coach manual",
    subtitle:
      "Planes de wards por rol, fase y objetivo. Guía externa sin overlay, sin leer memoria y sin automatizar acciones.",
  },
  replay: {
    title: "Análisis post-partida por Match ID",
    subtitle:
      "Ingresa el identificador público de tu partida y tu duda. El sistema consultará OpenDota y generará un reporte con datos reales.",
  },
};

const ROLES = Object.keys(ROLE_LABELS) as Role[];
const BRACKETS = Object.keys(BRACKET_LABELS) as Bracket[];
const STYLES = Object.keys(STYLE_LABELS) as Style[];

export function CoachApp({ initialMode = "draft" }: { initialMode?: CoachMode }) {
  const router = useRouter();
  const [mode, setMode] = useState<CoachMode>(initialMode);
  const appShellRef = useRef<HTMLElement>(null);
  const draft = useDraftController();
  const replay = useReplayController(draft.role);
  const [copyStatus, setCopyStatus] = useState(false);
  const [draftTab, setDraftTab] = useState<"config" | "pool" | "draft">("config");

  // Patch states
  const [selectedPatchHeroId, setSelectedPatchHeroId] = useState<string>("viper");
  const [visionPhase, setVisionPhase] = useState<VisionPhase | "all">("all");

  useEffect(() => {
    appShellRef.current?.setAttribute("data-app-ready", "true");
  }, []);

  // Feedback del login con Steam: el callback nos devuelve con ?auth=ok|error.
  // Mostramos el toast y limpiamos el query para que no reaparezca al recargar.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("auth");
    if (!auth) return;
    if (auth === "ok") toast.success("Sesión de Steam iniciada. Tu Account ID quedó cargado.");
    if (auth === "error") toast.error("No se pudo iniciar sesión con Steam. Intenta de nuevo.");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  // Permite que /match/[id] enlace a "/?match=<id>&mode=replay" y caigamos en
  // el panel de Replay con el ID precargado. Se consume una sola vez al
  // montar y se limpia el query para no reabrirlo al recargar.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const matchParam = params.get("match");
    const modeParam = params.get("mode");
    if (!matchParam && !modeParam) return;
    if (matchParam && /^\d{6,}$/.test(matchParam)) {
      replay.setMatchId(matchParam);
    }
    if (
      modeParam === "replay" ||
      modeParam === "draft" ||
      modeParam === "patch" ||
      modeParam === "vision"
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot URL param consumption on mount
      setMode(modeParam);
    }
    window.history.replaceState({}, "", window.location.pathname);
  }, [replay]);

  const copy = MODE_COPY[mode];

  const changeDraftRole = (nextRole: Role) => {
    draft.setRole(nextRole);
    toast.message(`Pool actualizado para ${ROLE_LABELS[nextRole]}.`);
  };

  const resetDraftPool = () => {
    draft.resetHeroPool();
    toast.success(`Pool sugerido de ${ROLE_LABELS[draft.role]} restaurado.`);
  };

  const openMode = (nextMode: CoachMode) => {
    setMode(nextMode);
    router.push(MODE_ROUTES[nextMode], { scroll: false });
  };

  const copyMarkdownReport = () => {
    if (!replay.replayReport) return;
    const md = generateMarkdown(replay.replayReport);
    navigator.clipboard.writeText(md).then(
      () => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
        toast.success("Reporte copiado al portapapeles en Markdown.");
        track("Reporte copiado");
      },
      () => toast.error("No se pudo copiar. Revisa los permisos del portapapeles."),
    );
  };

  return (
    <main className="appShell" data-app-ready="false" ref={appShellRef}>
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
              <p className="brandMeta">Tu coach personal de Dota 2 · draft, parche y replay</p>
            </div>
          </div>
          <div className="statusStrip" aria-label="Estado de datos">
            <SteamAuth
              onUser={(u) => {
                if (u) replay.setAccountId(String(u.accountId));
              }}
            />
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
          <ModeButton active={mode === "draft"} icon={<Crosshair size={18} />} onClick={() => openMode("draft")}>
            Asistente Draft
          </ModeButton>
          <ModeButton active={mode === "patch"} icon={<BookOpen size={18} />} onClick={() => openMode("patch")}>
            Patch Coach
          </ModeButton>
          <ModeButton active={mode === "weekly"} icon={<Crosshair size={18} />} onClick={() => openMode("weekly")}>
            Pool Semanal
          </ModeButton>
          <ModeButton active={mode === "vision"} icon={<Eye size={18} />} onClick={() => openMode("vision")}>
            Vision Coach
          </ModeButton>
          <ModeButton active={mode === "replay"} icon={<FileText size={18} />} onClick={() => openMode("replay")}>
            Replay Analysis
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
                  <h3 className="panelTitle">Asistente de Draft (100% Legal)</h3>
                  <p className="panelNote">Sin overlays ni riesgo de ban (VAC). Cruza el meta actual con <strong>tu pool de héroes</strong> para recomendarte el mejor pick posible.</p>
                </div>
                <div className="panelBody" data-tour="draft-inputs">
                  <div className="tabNav" style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <button 
                      type="button" 
                      onClick={() => setDraftTab("config")}
                      style={{ padding: '8px 16px', background: draftTab === "config" ? 'var(--bg-elevated)' : 'transparent', borderRadius: '4px', border: '1px solid transparent', borderColor: draftTab === "config" ? 'var(--border-color)' : 'transparent', color: draftTab === "config" ? 'var(--text-bright)' : 'var(--text-dim)', fontWeight: draftTab === "config" ? 600 : 400 }}
                    >
                      Configuración
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setDraftTab("pool")}
                      style={{ padding: '8px 16px', background: draftTab === "pool" ? 'var(--bg-elevated)' : 'transparent', borderRadius: '4px', border: '1px solid transparent', borderColor: draftTab === "pool" ? 'var(--border-color)' : 'transparent', color: draftTab === "pool" ? 'var(--text-bright)' : 'var(--text-dim)', fontWeight: draftTab === "pool" ? 600 : 400 }}
                    >
                      Mi Pool
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setDraftTab("draft")}
                      style={{ padding: '8px 16px', background: draftTab === "draft" ? 'var(--bg-elevated)' : 'transparent', borderRadius: '4px', border: '1px solid transparent', borderColor: draftTab === "draft" ? 'var(--border-color)' : 'transparent', color: draftTab === "draft" ? 'var(--text-bright)' : 'var(--text-dim)', fontWeight: draftTab === "draft" ? 600 : 400 }}
                    >
                      Picks
                    </button>
                  </div>

                  {draftTab === "config" && (
                    <div className="animate-fade-in">
                      <SegmentedField
                        label="Mi Rol"
                        values={ROLES}
                        labels={ROLE_LABELS}
                        value={draft.role}
                        onChange={changeDraftRole}
                        help="Tu posición en la partida. Cambia qué héroes se sugieren y cómo se puntúa cada uno."
                      />
                      <SelectField
                        label="Rango / Bracket"
                        value={draft.bracket}
                        onChange={draft.setBracket}
                        values={BRACKETS}
                        labels={BRACKET_LABELS}
                        help="Tu rango de MMR. Ajusta el meta esperado y la dificultad de ejecución que penaliza el motor."
                      />
                      <SegmentedField
                        label="Estilo de Juego"
                        values={STYLES}
                        labels={STYLE_LABELS}
                        value={draft.style}
                        onChange={draft.setStyle}
                        help="Cómo te gusta jugar. Reordena las recomendaciones hacia héroes que encajan con tu estilo."
                      />
                    </div>
                  )}

                  {draftTab === "pool" && (
                    <div className="animate-fade-in">
                      <HeroPicker
                        onReset={resetDraftPool}
                        role={draft.role}
                        title="Mi Pool de Héroes"
                        selected={draft.heroPool}
                        onToggle={(id) => toggleValue(id, draft.heroPool, draft.setHeroPool)}
                        help="Marca los héroes que dominas. El motor solo recomienda picks de este pool."
                      />
                    </div>
                  )}

                  {draftTab === "draft" && (
                    <div className="draftColumns animate-fade-in">
                      <DraftColumn
                        title="Aliados ya elegidos"
                        selected={draft.allies}
                        onToggle={(id) => toggleValue(id, draft.allies, draft.setAllies)}
                        help="Héroes que ya eligió tu equipo. Suman a la sinergia del pick recomendado."
                      />
                      <DraftColumn
                        title="Enemigos ya elegidos"
                        selected={draft.enemies}
                        onToggle={(id) => toggleValue(id, draft.enemies, draft.setEnemies)}
                        help="Héroes del equipo rival. El motor premia picks que los countean."
                      />
                    </div>
                  )}
                </div>
              </section>

              <DraftResult
                analysis={draft.analysis}
                isAnalyzingDraft={draft.isAnalyzingDraft}
                draftError={draft.draftError}
                onResetPool={resetDraftPool}
                showDetails={draft.showDraftDetails}
                toggleDetails={() => draft.setShowDraftDetails(!draft.showDraftDetails)}
              />
            </div>
          )}

          {mode === "patch" && (
            <PatchCoachPanel
              heroPool={draft.heroPool}
              selectedHeroId={selectedPatchHeroId}
              onSelectHero={setSelectedPatchHeroId}
            />
          )}

          {mode === "weekly" && (
            <WeeklyPoolPanel
              heroPool={draft.heroPool}
              role={draft.role}
              bracket={draft.bracket}
            />
          )}

          {mode === "vision" && (
            <VisionCoachPanel
              role={draft.role}
              phase={visionPhase}
              onPhaseChange={setVisionPhase}
            />
          )}

          {mode === "replay" && (
            <ReplayPanel
              matchId={replay.matchId}
              accountId={replay.accountId}
              question={replay.question}
              setMatchId={replay.setMatchId}
              setAccountId={replay.setAccountId}
              setQuestion={replay.setQuestion}
              isAnalyzing={replay.isAnalyzing}
              analysisStep={replay.analysisStep}
              analysisError={replay.analysisError}
              reportSource={replay.reportSource}
              reportParsed={replay.reportParsed}
              reportPerspective={replay.reportPerspective}
              replayReport={replay.replayReport}
              startAnalysis={replay.startReplayAnalysis}
              copyReport={copyMarkdownReport}
              copyStatus={copyStatus}
            />
          )}
          </motion.div>
        </section>
      </div>

      <Footer />

      <Analytics />
      <Toaster
        theme="dark"
        position="bottom-right"
        richColors
        toastOptions={{ style: { fontFamily: "var(--font-body)" } }}
      />
    </main>
  );
}
