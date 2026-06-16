"use client";

import { Check } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { HERO_BY_ID, ROLE_LABELS, heroImageUrl } from "@/data/dota";
import { HERO_ROSTER } from "@/data/heroRoster.generated";
import type { Role } from "@/data/dota";
import { HelpTip } from "@/components/HelpTip";

// Mapeo grosso modo de las etiquetas de OpenDota a nuestros roles para que los
// héroes que no están en el curado igual aparezcan con un rol legible.
const OPENDOTA_ROLE_TO_ROLE: Record<string, Role> = {
  Carry: "carry",
  Initiator: "offlane",
  Disabler: "support4",
  Support: "support5",
  Durable: "offlane",
  Escape: "carry",
  Nuker: "mid",
  Pusher: "offlane",
  Jungler: "carry",
};

type DisplayHero = {
  id: string;
  name: string;
  roles: Role[];
  patchValue: number;
  curated: boolean;
};

function rosterRolesToRoles(roles: readonly string[]): Role[] {
  const mapped: Role[] = [];
  for (const r of roles) {
    const m = OPENDOTA_ROLE_TO_ROLE[r];
    if (m && !mapped.includes(m)) mapped.push(m);
  }
  return mapped.length > 0 ? mapped : ["carry"];
}

const ALL_HEROES: DisplayHero[] = HERO_ROSTER.map((r) => {
  const curated = HERO_BY_ID.get(r.id);
  if (curated) {
    return {
      id: curated.id,
      name: curated.name,
      roles: curated.roles,
      patchValue: curated.patchValue,
      curated: true,
    };
  }
  return {
    id: r.id,
    name: r.name,
    roles: rosterRolesToRoles(r.roles),
    patchValue: 0,
    curated: false,
  };
});

export function ModeButton({
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
  // El nombre accesible viene del span visible; sin aria-label ni title para
  // no triplicar la lectura del screen reader.
  return (
    <button
      aria-pressed={active}
      className="navButton"
      onClick={onClick}
      type="button"
    >
      <span className="navButtonIcon" aria-hidden="true">
        {icon}
      </span>
      <span className="navButtonLabel">{children}</span>
    </button>
  );
}

export function SegmentedField<T extends string>({
  label,
  labels,
  onChange,
  value,
  values,
  help,
}: {
  label: string;
  labels: Record<T, string>;
  onChange: (value: T) => void;
  value: T;
  values: T[];
  help?: string;
}) {
  const labelId = useId();
  return (
    <div className="fieldGroup">
      <span className="fieldLabel" id={labelId}>
        {label}
        {help && <HelpTip text={help} label={`Ayuda: ${label}`} />}
      </span>
      <div className="segmented" role="radiogroup" aria-labelledby={labelId}>
        {values.map((item) => (
          <button
            role="radio"
            aria-checked={value === item}
            tabIndex={value === item ? 0 : -1}
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

export function SelectField<T extends string>({
  label,
  labels,
  onChange,
  value,
  values,
  help,
}: {
  label: string;
  labels: Record<T, string>;
  onChange: (value: T) => void;
  value: T;
  values: T[];
  help?: string;
}) {
  return (
    <label className="fieldGroup">
      <span className="fieldLabel">
        {label}
        {help && <HelpTip text={help} label={`Ayuda: ${label}`} />}
      </span>
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

export function HeroPicker({
  onToggle,
  role,
  selected,
  title,
  help,
}: {
  onToggle: (id: string) => void;
  role?: Role;
  selected: string[];
  title: string;
  help?: string;
}) {
  const [query, setQuery] = useState("");
  const roleHeroes = useMemo(() => filterHeroes("", role), [role]);
  const visibleHeroes = useMemo(() => filterHeroes(query, role), [query, role]);
  const titleId = useId();
  const countId = useId();

  return (
    <div className="fieldGroup">
      <span className="fieldLabel" id={titleId}>
        {title}
        {help && <HelpTip text={help} label={`Ayuda: ${title}`} />}
      </span>
      <div className="pickerToolbar">
        <input
          aria-label={`Buscar en ${title}`}
          className="textInput pickerSearch"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar héroe..."
          value={query}
        />
        <span className="pickerCount" aria-hidden="true">
          {selected.length}/{roleHeroes.length}
        </span>
      </div>
      <span id={countId} className="srOnly">
        {visibleHeroes.length} héroes disponibles, {selected.length} marcados.
      </span>
      <div
        className="heroGrid"
        role="group"
        aria-labelledby={`${titleId} ${countId}`}
      >
        {visibleHeroes.map((hero) => {
          const isSelected = selected.includes(hero.id);
          const hasBuff = hero.patchValue > 0;
          const hasNerf = hero.patchValue < 0;
          const nonCurated = !hero.curated;
          return (
            <button
              aria-pressed={isSelected}
              className={`heroButton ${isSelected ? "selected" : ""} ${hasBuff ? "buffed" : ""} ${hasNerf ? "nerfed" : ""} ${nonCurated ? "nonCurated" : ""}`}
              key={hero.id}
              onClick={() => onToggle(hero.id)}
              type="button"
              title={nonCurated ? `${hero.name} (sin scoring en el motor todavía)` : hero.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="heroButtonImg" src={heroImageUrl(hero.id)} alt="" loading="lazy" decoding="async" aria-hidden="true" />
              <span className="heroButtonOverlay" />
              <span className="heroButtonText">
                <span className="heroName">{hero.name}</span>
                <span className="heroRoles">{hero.roles.map((heroRole) => ROLE_LABELS[heroRole]).join(", ")}</span>
              </span>
              {(hasBuff || hasNerf) && (
                <span className={`patchBadge ${hasBuff ? "buff" : "nerf"}`}>
                  {hasBuff ? "▲" : "▼"}
                  <span className="srOnly">{hasBuff ? "Buffed" : "Nerfed"} en este parche</span>
                </span>
              )}
              {nonCurated && <span className="nonCuratedDot" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DraftColumn({
  onToggle,
  selected,
  title,
  help,
}: {
  onToggle: (id: string) => void;
  selected: string[];
  title: string;
  help?: string;
}) {
  const [query, setQuery] = useState("");
  const visibleHeroes = useMemo(() => filterHeroes(query), [query]);
  const titleId = useId();
  const countId = useId();

  return (
    <div className="fieldGroup">
      <span className="fieldLabel" id={titleId}>
        {title}
        {help && <HelpTip text={help} label={`Ayuda: ${title}`} />}
      </span>
      <div className="pickerToolbar">
        <input
          aria-label={`Buscar en ${title}`}
          className="textInput pickerSearch"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar héroe..."
          value={query}
        />
        <span className="pickerCount" aria-hidden="true">
          {selected.length}/{ALL_HEROES.length}
        </span>
      </div>
      <span id={countId} className="srOnly">
        {visibleHeroes.length} héroes disponibles, {selected.length} marcados.
      </span>
      <div
        className="draftSlots"
        role="group"
        aria-labelledby={`${titleId} ${countId}`}
      >
        {visibleHeroes.map((hero) => {
          const isSelected = selected.includes(hero.id);
          const nonCurated = !hero.curated;
          return (
            <button
              aria-pressed={isSelected}
              className={`slotButton ${isSelected ? "selected" : ""} ${nonCurated ? "nonCurated" : ""}`}
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

// Curados primero: el motor solo recomienda sobre el set curado, así que al
// abrir el picker los héroes con scoring quedan arriba y los demás siguen en
// orden alfabético (ya vienen ordenados desde el generated).
const ALL_HEROES_SORTED: DisplayHero[] = [
  ...ALL_HEROES.filter((h) => h.curated),
  ...ALL_HEROES.filter((h) => !h.curated),
];

function filterHeroes(query: string, role?: Role) {
  const normalized = query.trim().toLowerCase();
  const heroes = role
    ? ALL_HEROES_SORTED.filter((hero) => hero.curated && hero.roles.includes(role))
    : ALL_HEROES_SORTED;
  if (!normalized) return heroes;
  return heroes.filter((hero) => {
    const haystack = `${hero.name} ${hero.roles.map((role) => ROLE_LABELS[role]).join(" ")}`.toLowerCase();
    return haystack.includes(normalized);
  });
}


export function ScoreBar({
  label,
  value,
  max,
  min = 0,
  color,
  help,
}: {
  label: string;
  value: number;
  max: number;
  min?: number;
  color: string;
  help?: string;
}) {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="scoreBarRow">
      <span className="scoreBarLabel">
        {label}
        {help && <HelpTip text={help} label={`Ayuda: ${label}`} />}
      </span>
      <div className="scoreBarContainer">
        <div className="scoreBarFill" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
      </div>
      <span className="scoreBarValue">{value > 0 ? `+${value}` : value}</span>
    </div>
  );
}

export function Metric({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
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

export function Phase({ text, title }: { text: string; title: string }) {
  return (
    <div className="phaseBox">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

export function ListBlock({ items, title, type }: { items: string[]; title: string; type: "good" | "bad" }) {
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

export function toggleValue(value: string, list: string[], setList: (next: string[]) => void) {
  setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
}
