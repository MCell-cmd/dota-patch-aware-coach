"use client";

import { Check } from "lucide-react";
import { HEROES, ROLE_LABELS } from "@/data/dota";

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
  return (
    <button aria-pressed={active} className="navButton" onClick={onClick} type="button">
      {icon}
      {children}
    </button>
  );
}

export function SegmentedField<T extends string>({
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

export function SelectField<T extends string>({
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

export function HeroPicker({
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

export function DraftColumn({
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

export function ScoreBar({
  label,
  value,
  max,
  min = 0,
  color,
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
