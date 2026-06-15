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
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  BRACKET_LABELS,
  Bracket,
  HEROES,
  PATCH_STATE,
  ROLE_LABELS,
  Role,
  STYLE_LABELS,
  Style,
} from "@/data/dota";
import { analyzeDraft } from "@/lib/draft";

type Mode = "draft" | "patch" | "replay";

const MODE_COPY: Record<Mode, { title: string; subtitle: string }> = {
  draft: {
    title: "Asistente de draft manual",
    subtitle:
      "Selecciona rol, bracket, estilo, hero pool y heroes visibles. El motor puntua sin leer el cliente ni automatizar decisiones.",
  },
  patch: {
    title: "Coach de parche",
    subtitle:
      "Vista de validacion para convertir cambios de parche en tareas practicas por rol y heroes favoritos.",
  },
  replay: {
    title: "Replay review por match ID",
    subtitle:
      "Formato de captura para generar reportes accionables con datos publicos de OpenDota y pregunta del jugador.",
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
  const [matchId, setMatchId] = useState("8850507008");
  const [question, setQuestion] = useState("Que decision me hizo perder mas impacto?");

  const analysis = useMemo(
    () => analyzeDraft({ role, bracket, style, heroPool, allies, enemies }),
    [role, bracket, style, heroPool, allies, enemies],
  );

  const copy = MODE_COPY[mode];

  return (
    <main className="appShell">
      <header className="topBar">
        <div className="topBarInner">
          <div className="brandBlock">
            <div className="brandMark" aria-hidden="true">
              <Swords size={21} />
            </div>
            <div className="brandText">
              <h1 className="brandTitle">Dota Patch-Aware Coach</h1>
              <p className="brandMeta">MVP de validacion: draft, parche y replay</p>
            </div>
          </div>
          <div className="statusStrip" aria-label="Estado de datos">
            <span className="statusPill">
              <Gauge size={14} /> Parche <strong>{PATCH_STATE.version}</strong>
            </span>
            <span className="statusPill">
              <BarChart3 size={14} /> Base <strong>{PATCH_STATE.updatedAt}</strong>
            </span>
            <span className="statusPill">
              <AlertTriangle size={14} /> Confianza <strong>validacion</strong>
            </span>
          </div>
        </div>
      </header>

      <div className="mainGrid">
        <nav className="sideNav" aria-label="Modos del coach">
          <ModeButton active={mode === "draft"} icon={<Crosshair size={17} />} onClick={() => setMode("draft")}>
            Draft
          </ModeButton>
          <ModeButton active={mode === "patch"} icon={<BookOpen size={17} />} onClick={() => setMode("patch")}>
            Patch Coach
          </ModeButton>
          <ModeButton active={mode === "replay"} icon={<FileText size={17} />} onClick={() => setMode("replay")}>
            Replay
          </ModeButton>
        </nav>

        <section className="workspace">
          <div className="toolHeader">
            <div>
              <h2 className="toolTitle">{copy.title}</h2>
              <p className="toolSubtitle">{copy.subtitle}</p>
            </div>
            <button className="primaryAction" type="button">
              <ClipboardList size={18} />
              Exportar reporte
            </button>
          </div>

          {mode === "draft" && (
            <div className="contentGrid">
              <section className="panel" aria-label="Entrada de draft">
                <div className="panelHeader">
                  <h3 className="panelTitle">Entrada manual</h3>
                  <p className="panelNote">El usuario controla la informacion. No hay overlay ni lectura automatica.</p>
                </div>
                <div className="panelBody">
                  <SegmentedField label="Rol" values={ROLES} labels={ROLE_LABELS} value={role} onChange={setRole} />
                  <SelectField label="Bracket" value={bracket} onChange={setBracket} values={BRACKETS} labels={BRACKET_LABELS} />
                  <SegmentedField label="Estilo" values={STYLES} labels={STYLE_LABELS} value={style} onChange={setStyle} />

                  <HeroPicker title="Hero pool" selected={heroPool} onToggle={(id) => toggleValue(id, heroPool, setHeroPool)} />

                  <div className="draftColumns">
                    <DraftColumn title="Aliados visibles" selected={allies} onToggle={(id) => toggleValue(id, allies, setAllies)} />
                    <DraftColumn title="Enemigos visibles" selected={enemies} onToggle={(id) => toggleValue(id, enemies, setEnemies)} />
                  </div>
                </div>
              </section>

              <DraftResult analysis={analysis} />
            </div>
          )}

          {mode === "patch" && <PatchCoachPanel heroPool={heroPool} />}
          {mode === "replay" && (
            <ReplayPanel matchId={matchId} question={question} setMatchId={setMatchId} setQuestion={setQuestion} />
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
        {HEROES.map((hero) => (
          <button
            aria-pressed={selected.includes(hero.id)}
            className="heroButton"
            key={hero.id}
            onClick={() => onToggle(hero.id)}
            type="button"
          >
            <span className="heroName">{hero.name}</span>
            <span className="heroRoles">{hero.roles.map((heroRole) => ROLE_LABELS[heroRole]).join(", ")}</span>
          </button>
        ))}
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
        {HEROES.slice(0, 12).map((hero) => (
          <button
            aria-pressed={selected.includes(hero.id)}
            className="slotButton"
            key={hero.id}
            onClick={() => onToggle(hero.id)}
            type="button"
          >
            {selected.includes(hero.id) && <Check size={14} />}
            {hero.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function DraftResult({ analysis }: { analysis: ReturnType<typeof analyzeDraft> }) {
  const best = analysis.best;

  return (
    <section className="panel" aria-label="Resultado del analisis">
      <div className="panelHeader">
        <h3 className="panelTitle">Resultado</h3>
        <p className="panelNote">{analysis.freshnessWarning}</p>
      </div>
      <div className="panelBody">
        {best ? (
          <div className="recommendationStack">
            <div className="resultHero">
              <div className="resultTopline">
                <div>
                  <span className="metricLabel">Mejor pick</span>
                  <h3 className="resultName">{best.hero.name}</h3>
                </div>
                <span className="scoreBadge">{best.total} pts</span>
              </div>
              <ul className="reasonList">
                {best.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
              <div className="tagRow">
                <span className="tag green">Confianza {best.confidence}</span>
                {best.risks.map((risk) => (
                  <span className="tag red" key={risk}>
                    {risk}
                  </span>
                ))}
              </div>
            </div>

            <div className="miniGrid">
              <Metric label="Items iniciales" value={best.startingItems.join(", ")} />
              <Metric label="Primer core" value={best.firstCore.join(", ")} />
              <Metric label="Necesidades del equipo" value={analysis.teamNeeds.slice(0, 3).join(" / ") || "Draft cubierto"} />
              <Metric label="Amenazas enemigas" value={analysis.enemyThreats.join(" / ") || "Sin amenaza clara"} />
            </div>

            <div className="planGrid">
              <Phase title="Min 0-5" text={best.plan.early} />
              <Phase title="Min 5-15" text={best.plan.mid} />
              <Phase title="Objetivo" text={best.plan.objective} />
            </div>

            <div className="miniGrid">
              <ListBlock title="Alternativas" items={analysis.alternatives.map((pick) => `${pick.hero.name}: ${pick.total} pts`)} />
              <ListBlock title="Evitar" items={analysis.avoid.map((pick) => `${pick.hero.name}: ${pick.risks[0] ?? "bajo encaje"}`)} />
            </div>
          </div>
        ) : (
          <div className="emptyState">
            <AlertTriangle size={32} />
            No hay heroes del pool para el rol seleccionado.
          </div>
        )}
      </div>
    </section>
  );
}

function PatchCoachPanel({ heroPool }: { heroPool: string[] }) {
  const heroes = HEROES.filter((hero) => heroPool.includes(hero.id));

  return (
    <div className="placeholderGrid">
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Heroes favoritos</h3>
          <p className="panelNote">Impacto provisional segun base mock {PATCH_STATE.version}.</p>
        </div>
        <div className="panelBody">
          {heroes.map((hero) => (
            <div className="metricBox" key={hero.id}>
              <span className="metricLabel">{hero.name}</span>
              <span className="metricValue">
                {hero.patchValue > 0 ? "Priorizar esta semana" : hero.patchValue < 0 ? "Usar con cautela" : "Mantener en pool"}
              </span>
              <div className="tagRow">
                <span className={hero.patchValue > 0 ? "tag green" : hero.patchValue < 0 ? "tag red" : "tag"}>
                  patch value {hero.patchValue}
                </span>
                <span className="tag amber">{hero.tempo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Siguiente ingestion</h3>
          <p className="panelNote">Antes de cobrar, esta pantalla debe enlazar cambios oficiales y fecha de consulta.</p>
        </div>
        <div className="panelBody">
          <ListBlock
            title="Pendiente"
            items={[
              "Parser de notas oficiales 7.41d",
              "Clasificar cambios: buff, nerf, build, matchup",
              "Guardar fuente y confianza por cambio",
              "Bajar confianza si no hay datos frescos",
            ]}
          />
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
}: {
  matchId: string;
  question: string;
  setMatchId: (value: string) => void;
  setQuestion: (value: string) => void;
}) {
  return (
    <div className="contentGrid">
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Datos del reporte</h3>
          <p className="panelNote">MVP semiautomatico: el usuario pega match ID publico y objetivo.</p>
        </div>
        <div className="panelBody">
          <label className="fieldGroup">
            <span className="fieldLabel">Match ID</span>
            <input className="textInput" onChange={(event) => setMatchId(event.target.value)} value={matchId} />
          </label>
          <label className="fieldGroup">
            <span className="fieldLabel">Pregunta principal</span>
            <textarea className="textInput" onChange={(event) => setQuestion(event.target.value)} rows={5} value={question} />
          </label>
          <button className="primaryAction" type="button">
            <FileText size={18} />
            Preparar reporte
          </button>
        </div>
      </section>
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Salida esperada</h3>
          <p className="panelNote">Plantilla lista para conectar con `prototipo/opendota_match_summary.sh`.</p>
        </div>
        <div className="panelBody">
          <Metric label="Fuente inicial" value={`OpenDota match ${matchId || "pendiente"}`} />
          <ListBlock
            title="Reporte"
            items={[
              "Veredicto corto",
              "Resumen por fase",
              "Tres errores mas caros",
              "Plan de entrenamiento de 7 dias",
              "Fuentes y confianza",
            ]}
          />
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metricBox">
      <span className="metricLabel">{label}</span>
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

function ListBlock({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="metricBox">
      <span className="metricLabel">{title}</span>
      <ul className="compactList">
        {items.length > 0 ? items.map((item) => <li key={item}>{item}</li>) : <li>Sin datos suficientes.</li>}
      </ul>
    </div>
  );
}

function toggleValue(value: string, list: string[], setList: (next: string[]) => void) {
  setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
}
