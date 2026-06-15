"use client";

import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Check,
  ClipboardList,
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
  Copy
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
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
import { analyzeDraft } from "@/lib/draft";

type Mode = "draft" | "timer" | "patch" | "replay";

const MODE_COPY: Record<Mode, { title: string; subtitle: string }> = {
  draft: {
    title: "Asistente de draft manual",
    subtitle:
      "Selecciona tu rol, bracket, estilo de juego, tu pool y héroes visibles. El motor puntuará en tiempo real bajo las reglas del parche.",
  },
  timer: {
    title: "Timer coach manual",
    subtitle:
      "Cronometro externo con eventos publicos de Dota: runas, Lotus, Wisdom, catapultas, Roshan y Tormentor.",
  },
  patch: {
    title: "Coach de parche interactivo",
    subtitle:
      "Consulta cómo afectan las actualizaciones del parche activo a tus héroes favoritos y descubre las builds del meta.",
  },
  replay: {
    title: "Análisis post-partida por Match ID",
    subtitle:
      "Ingresa el identificador público de tu partida y tu duda. El sistema simulará la ingestión y análisis táctico del juego.",
  },
};

const ROLES = Object.keys(ROLE_LABELS) as Role[];
const BRACKETS = Object.keys(BRACKET_LABELS) as Bracket[];
const STYLES = Object.keys(STYLE_LABELS) as Style[];

const TIMER_EVENTS = [
  {
    minute: 0,
    title: "Bounty runes iniciales",
    roles: "Todos",
    advice: "Define si tu equipo pelea runa o protege bloqueos. No pierdas media vida por una runa imposible.",
  },
  {
    minute: 2,
    title: "Water runes",
    roles: "Mid / supports",
    advice: "Mid prepara wave antes de 1:50. Supports cubren si el matchup decide la linea.",
  },
  {
    minute: 3,
    title: "Lotus pool",
    roles: "Supports / sidelanes",
    advice: "Si tu lane esta estable, pelea Lotus. Si vas perdiendo, no mueras por una Lotus sin wave.",
  },
  {
    minute: 4,
    title: "Water runes",
    roles: "Mid / supports",
    advice: "Repite control de wave. Si el mid enemigo falta, avisa rotacion antes de perseguir.",
  },
  {
    minute: 5,
    title: "Catapultas",
    roles: "Cores / supports",
    advice: "Convierte catapulta en dano a torre o defensa. No pelees lejos de la wave sin razon.",
  },
  {
    minute: 6,
    title: "Power rune",
    roles: "Mid / support 4",
    advice: "Empuja mid antes de 5:45. Con Haste, DD o Invis piensa rotacion; si no, presiona torre o stack.",
  },
  {
    minute: 7,
    title: "Wisdom rune",
    roles: "Supports",
    advice: "Muevete desde 6:30. Asegura la propia o invade con core fuerte; no regales muerte solo.",
  },
  {
    minute: 10,
    title: "Bounty + catapulta",
    roles: "Todos",
    advice: "Revisa si tu primer item permite torre, smoke o defensa. Cada kill debe convertirse en mapa.",
  },
  {
    minute: 14,
    title: "Wisdom rune",
    roles: "Supports",
    advice: "Segundo chequeo de XP. Si tu support va atras, prioriza asegurarla antes de una pelea random.",
  },
  {
    minute: 15,
    title: "Roshan empieza a importar",
    roles: "Cores / supports",
    advice: "Si tienes lineup de Roshan, pelea vision cerca del pit despues de ganar una fight.",
  },
  {
    minute: 20,
    title: "Tormentor",
    roles: "Equipo",
    advice: "No lo fuerces sin vida o vision. Hazlo despues de push, kill o cuando el enemigo muestre heroes lejos.",
  },
];

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
  const [question, setQuestion] = useState("Que decision me hizo perder mas impacto?");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [replayReport, setReplayReport] = useState<MockReplayReport | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // Patch States
  const [selectedPatchHeroId, setSelectedPatchHeroId] = useState<string>("viper");

  // Draft States
  const [showDraftDetails, setShowDraftDetails] = useState(false);

  const analysis = useMemo(
    () => analyzeDraft({ role, bracket, style, heroPool, allies, enemies }),
    [role, bracket, style, heroPool, allies, enemies],
  );

  const copy = MODE_COPY[mode];

  // Replay analysis simulation
  const startReplayAnalysis = () => {
    if (!matchId.trim()) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setReplayReport(null);
  };

  useEffect(() => {
    if (!isAnalyzing) return;

    const steps = [
      "Conectando con la API pública de OpenDota...",
      "Descargando metadatos del match y parseando timelines...",
      "Identificando timings de ítems core y GPM por rol...",
      "Analizando eventos de muertes en Roshan y peleas críticas...",
      "Generando diagnóstico táctico bajo el meta del parche 7.41d..."
    ];

    if (analysisStep < steps.length) {
      const timer = setTimeout(() => {
        setAnalysisStep(prev => prev + 1);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      const report = MOCK_REPLAY_REPORTS[matchId] || MOCK_REPLAY_REPORTS["8850507008"];
      // Adapt customizable question if different
      const finalReport = report ? { ...report, matchId, question } : null;
      setReplayReport(finalReport);
      setIsAnalyzing(false);
    }
  }, [isAnalyzing, analysisStep, matchId, question]);

  const copyMarkdownReport = () => {
    if (!replayReport) return;
    const md = `
# REPORTE DE COACHING - DOTA 2
**Match ID:** ${replayReport.matchId}
**Resultado:** ${replayReport.result} | **Duración:** ${replayReport.duration}
**Héroe:** ${replayReport.hero} | **Rol:** ${replayReport.role} | **Bracket:** ${replayReport.bracket}

## PREGUNTA DEL JUGADOR
> "${replayReport.question}"

## VEREDICTO CORTO
${replayReport.verdict}

## ANÁLISIS POR FASES
### Fase de Líneas
- **Logro:** ${replayReport.phases.lane.good}
- **Error:** ${replayReport.phases.lane.error}
- **Recomendación:** ${replayReport.phases.lane.change}

### Mid Game
- **Logro:** ${replayReport.phases.mid.good}
- **Error:** ${replayReport.phases.mid.error}
- **Recomendación:** ${replayReport.phases.mid.change}

### Late Game
- **Logro:** ${replayReport.phases.late.good}
- **Error:** ${replayReport.phases.late.error}
- **Recomendación:** ${replayReport.phases.late.change}

## ERRORES MÁS CAROS
${replayReport.errors.map((err, idx) => `
### ${idx + 1}. ${err.title}
- **Evidencia:** ${err.evidence}
- **Impacto:** ${err.impact}
- **Corrección:** ${err.fix}
- **Ejercicio:** ${err.practice}
`).join("\n")}

## PLAN DE ACCIÓN DE 7 DÍAS
${replayReport.plan.map(p => `- ${p}`).join("\n")}
    `;

    navigator.clipboard.writeText(md.trim()).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    });
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
          <ModeButton active={mode === "timer"} icon={<Clock size={18} />} onClick={() => setMode("timer")}>
            Timer Coach
          </ModeButton>
          <ModeButton active={mode === "patch"} icon={<BookOpen size={18} />} onClick={() => setMode("patch")}>
            Patch Coach
          </ModeButton>
          <ModeButton active={mode === "replay"} icon={<FileText size={18} />} onClick={() => setMode("replay")}>
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

          {mode === "timer" && <TimerCoachPanel role={role} />}

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
              question={question} 
              setMatchId={setMatchId} 
              setQuestion={setQuestion} 
              isAnalyzing={isAnalyzing}
              analysisStep={analysisStep}
              replayReport={replayReport}
              startAnalysis={startReplayAnalysis}
              copyReport={copyMarkdownReport}
              copyStatus={copyStatus}
            />
          )}
        </section>
      </div>
    </main>
  );
}

function TimerCoachPanel({ role }: { role: Role }) {
  const [gameMinute, setGameMinute] = useState(0);
  const nextEvent = TIMER_EVENTS.find((event) => event.minute >= gameMinute) ?? TIMER_EVENTS[TIMER_EVENTS.length - 1];
  const currentWindow = TIMER_EVENTS.filter((event) => event.minute >= Math.max(0, gameMinute - 2)).slice(0, 6);

  return (
    <div className="contentGrid">
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Reloj manual seguro</h3>
          <p className="panelNote">No lee la partida. Ajustas el minuto mirando el reloj del juego.</p>
        </div>
        <div className="panelBody">
          <label className="fieldGroup">
            <span className="fieldLabel">Minuto actual</span>
            <input
              className="rangeInput"
              max={25}
              min={0}
              onChange={(event) => setGameMinute(Number(event.target.value))}
              step={1}
              type="range"
              value={gameMinute}
            />
          </label>

          <div className="timerReadout">
            <Clock size={24} />
            <span>{String(gameMinute).padStart(2, "0")}:00</span>
          </div>

          <div className="resultHero">
            <div className="resultTopline">
              <div>
                <span className="metricLabel">Proximo evento</span>
                <h3 className="resultName">{nextEvent.title}</h3>
              </div>
              <span className="scoreBadge">{String(nextEvent.minute).padStart(2, "0")}:00</span>
            </div>
            <p className="eventAdvice">{nextEvent.advice}</p>
            <div className="tagRow">
              <span className="tag green">Rol actual: {ROLE_LABELS[role]}</span>
              <span className="tag amber">{nextEvent.roles}</span>
            </div>
          </div>

          <ListBlock title={`Checklist para ${ROLE_LABELS[role]}`} items={roleTimerChecklist(role)} type="good" />
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Linea de tiempo publica</h3>
          <p className="panelNote">Recordatorios basados en reglas conocidas, no en datos internos.</p>
        </div>
        <div className="panelBody timelineList">
          {currentWindow.map((event) => (
            <div className="timelineItem" key={`${event.minute}-${event.title}`}>
              <span className="timelineMinute">{String(event.minute).padStart(2, "0")}:00</span>
              <div>
                <strong>{event.title}</strong>
                <p>{event.advice}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
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
  showDetails,
  toggleDetails
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
          <p className="panelNote">Selecciona un héroe para auditar los cambios aplicados en la versión {PATCH_STATE.version}.</p>
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
                <p>Configura tu Hero Pool en la pestaña de Draft para ver tu listado aquí.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Detalles del Parche: {activeHero ? activeHero.name : "Selecciona Héroe"}</h3>
          <p className="panelNote">Evidencia de cambios extraídos del changelog y análisis táctico.</p>
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
                  <span className="metaLabel">Fuerza en Línea</span>
                  <span className="metaValue goldText">{"★".repeat(activeHero.laneStrength)}</span>
                </div>
              </div>

              <div className="notesBlock">
                <span className="notesTitle">Changelog Oficial {PATCH_STATE.version}</span>
                <ul className="notesList">
                  {(PATCH_NOTES_BY_HERO[activeHero.id] || [
                    "Sin cambios directos en los atributos de este héroe.",
                    "Afectado únicamente por ajustes globales de economía e ítems neutrales."
                  ]).map((note, idx) => (
                    <li key={idx}>
                      <span className="noteBullet">•</span>
                      <p>{note}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tacticalAudit">
                <span className="notesTitle">Recomendación del Parche</span>
                <p className="tacticalDesc">
                  {activeHero.patchValue > 0 
                    ? `Los buffs recibidos posicionan a ${activeHero.name} como un pick sólido en este parche. Maximiza su lane presence con items como ${activeHero.startingItems.slice(0,2).join(" y ")} y presiona timings rápidos.`
                    : activeHero.patchValue < 0 
                    ? `Ten cuidado. Los nerfs directos debilitaron su capacidad de juego en fase de líneas. Considera alternar a otros héroes si ves counters agresivos visibles en el draft.`
                    : `${activeHero.name} se mantiene balanceado y estable. Conserva su build estándar: ${activeHero.firstCore.join(" ➔ ")}.`}
                </p>
              </div>
            </div>
          ) : (
            <div className="emptyState">
              <BookOpen size={32} />
              <p>Selecciona un héroe para auditar los cambios.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ReplayPanel({
  matchId,
  question,
  setMatchId,
  setQuestion,
  isAnalyzing,
  analysisStep,
  replayReport,
  startAnalysis,
  copyReport,
  copyStatus
}: {
  matchId: string;
  question: string;
  setMatchId: (value: string) => void;
  setQuestion: (value: string) => void;
  isAnalyzing: boolean;
  analysisStep: number;
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
            <p className="panelNote">Ingresa un Match ID público de Dota 2 (ej: 8850507008) para generar el reporte de coaching.</p>
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
              <label htmlFor="questionInput" className="fieldLabel">Pregunta Táctica Principal</label>
              <textarea 
                id="questionInput"
                className="textInput" 
                onChange={(event) => setQuestion(event.target.value)} 
                rows={4} 
                value={question} 
                placeholder="Ej. ¿Qué decisión me costó la partida? ¿Cómo estuvo mi timing de items?"
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
            <p className="panelNote">El reporte se renderiza combinando métricas de OpenDota con heurísticas de rol.</p>
          </div>
          <div className="panelBody displayPanelBody">
            {isAnalyzing && (
              <div className="loadingState">
                <Cpu size={40} className="spinIcon textRed" />
                <span className="loadingTitle">Ingiriendo datos de la partida</span>
                <div className="loadingSteps">
                  <p className="activeStep">{[
                    "Conectando con la API pública de OpenDota...",
                    "Descargando metadatos del match y parseando timelines...",
                    "Identificando timings de ítems core y GPM por rol...",
                    "Analizando eventos de muertes en Roshan y peleas críticas...",
                    "Generando diagnóstico táctico bajo el meta del parche 7.41d..."
                  ][analysisStep] || "Finalizando reporte..."}</p>
                </div>
                <div className="progressBarOuter">
                  <div className="progressBarInner" style={{ width: `${(analysisStep / 5) * 100}%` }}></div>
                </div>
              </div>
            )}

            {!isAnalyzing && !replayReport && (
              <div className="emptyState">
                <Clock size={36} className="emptyStateIcon" />
                <h4 className="emptyStateTitle">Sin Reporte Activo</h4>
                <p className="emptyStateText">Ingresa los datos del formulario de la izquierda y haz clic en "Generar Reporte de Coach" para auditar la partida.</p>
              </div>
            )}

            {!isAnalyzing && replayReport && (
              <div className="reportWrapper">
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
                  <p className="verdictText">"{replayReport.verdict}"</p>
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

function roleTimerChecklist(role: Role) {
  const checklist: Record<Role, string[]> = {
    carry: [
      "No abandones wave por runa si pierdes mas de una oleada.",
      "Con catapulta, pide support para presionar o defender torre.",
      "Antes de minuto 20, decide si peleas Tormentor o farmeas item clave.",
    ],
    mid: [
      "Empuja wave antes de runas 2/4/6.",
      "Con power rune fuerte, rota a side lane con kill + objetivo.",
      "Sin rune fuerte, presiona torre mid o limpia stack cercano.",
    ],
    offlane: [
      "Usa catapulta para forzar T1 safe enemiga.",
      "Si ganas lane, invade triangulo con support 4.",
      "Prepara Tormentor solo si tienes vision y recursos.",
    ],
    support4: [
      "Ayuda power rune minuto 6 si tu mid puede ganar mapa.",
      "Disputa Wisdom enemiga si tu offlane tiene prioridad.",
      "Compra smoke despues de una runa fuerte o primer item de tu core.",
    ],
    support5: [
      "Protege pulls y Lotus sin abandonar al carry en wave peligrosa.",
      "Asegura Wisdom propia desde 6:30.",
      "Coloca vision antes de defender catapulta o Tormentor.",
    ],
  };

  return checklist[role];
}

function toggleValue(value: string, list: string[], setList: (next: string[]) => void) {
  setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
}
