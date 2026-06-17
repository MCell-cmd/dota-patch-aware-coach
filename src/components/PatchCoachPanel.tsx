"use client";

import { useId } from "react";
import { AlertTriangle, BookOpen, ExternalLink } from "lucide-react";
import { Bracket, BRACKET_LABELS, HEROES, ROLE_LABELS, heroImageUrl } from "@/data/dota";
import { getActivePatch, getHeroPatchChange } from "@/data/patches";
import { getHeroMeta, getWinrateByBracket, META_VERDICT_LABEL } from "@/lib/meta";

export function PatchCoachPanel({
  heroPool,
  selectedHeroId,
  onSelectHero,
  bracket,
}: {
  heroPool: string[];
  selectedHeroId: string;
  onSelectHero: (id: string) => void;
  bracket: Bracket;
}) {
  const heroes = HEROES.filter((hero) => heroPool.includes(hero.id));
  const activeHero = HEROES.find((h) => h.id === selectedHeroId) || heroes[0];
  const activePatch = getActivePatch();
  const poolTitleId = useId();

  const activeMeta = activeHero ? getHeroMeta(activeHero.id, bracket) : null;
  const activeChange = activeHero ? getHeroPatchChange(activeHero.id) : undefined;
  const winrates = activeHero ? getWinrateByBracket(activeHero.id) : [];

  return (
    <div className="placeholderGrid patchPanelGrid">
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle" id={poolTitleId}>Mi Pool en {activePatch.version}</h3>
          <p className="panelNote">
            {activePatch.heroesChanged} héroes cambiaron en {activePatch.version} (salió {activePatch.releasedAt}).
            Selecciona uno para ver sus datos reales.
          </p>
        </div>
        <div className="panelBody">
          <div className="patchHeroList" role="group" aria-labelledby={poolTitleId}>
            {heroes.length > 0 ? (
              heroes.map((hero) => {
                const isActive = hero.id === selectedHeroId;
                const meta = getHeroMeta(hero.id, bracket);
                const statusText = meta.changedThisPatch
                  ? `Cambió (${meta.changeCount})`
                  : meta.verdict
                    ? META_VERDICT_LABEL[meta.verdict]
                    : "Sin datos";
                const statusClass = meta.verdict === "fuerte" ? "buff" : meta.verdict === "debil" ? "nerf" : "neutral";
                return (
                  <button
                    key={hero.id}
                    type="button"
                    className={`patchHeroRow ${isActive ? "active" : ""}`}
                    onClick={() => onSelectHero(hero.id)}
                    aria-pressed={isActive}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="patchHeroPortrait"
                      src={heroImageUrl(hero.id)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                    <div className="patchHeroMeta">
                      <span className="patchHeroName">{hero.name}</span>
                      <span className="patchHeroRoles">{hero.roles.map((r) => ROLE_LABELS[r]).join(", ")}</span>
                    </div>
                    <span className={`patchHeroStatus ${statusClass}`}>
                      <span className="srOnly">Estado: </span>
                      {statusText}
                    </span>
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
          <h3 className="panelTitle" aria-live="polite">
            {activeHero ? activeHero.name : "Selecciona Héroe"} en{" "}
            <span className="patchHeroTitleAccent">{activePatch.version}</span>
          </h3>
          <p className="panelNote">
            Datos reales de OpenDota ({BRACKET_LABELS[bracket]}) y cambios del datafeed oficial de Valve.
          </p>
        </div>
        <div className="panelBody">
          {activeHero && activeMeta ? (
            <div className="patchNotesContent">
              <div className="heroMetaGrid">
                <div className="metaBox">
                  <span className="metaLabel">Winrate ({BRACKET_LABELS[bracket]})</span>
                  <span
                    className={`metaValue ${
                      activeMeta.verdict === "fuerte" ? "greenText" : activeMeta.verdict === "debil" ? "redText" : ""
                    }`}
                  >
                    {activeMeta.winratePct != null ? `${activeMeta.winratePct}%` : "—"}
                  </span>
                </div>
                <div className="metaBox">
                  <span className="metaLabel">Estado de meta</span>
                  <span className="metaValue goldText">
                    {activeMeta.verdict ? META_VERDICT_LABEL[activeMeta.verdict] : "Sin datos"}
                  </span>
                </div>
                <div className="metaBox">
                  <span className="metaLabel">Cambios en {activePatch.version}</span>
                  <span className={`metaValue ${activeChange ? "goldText" : ""}`}>
                    {activeChange ? `${activeChange.changeCount} líneas` : "Sin cambios directos"}
                  </span>
                </div>
              </div>

              {winrates.length > 0 && (
                <div className="notesBlock">
                  <span className="notesTitle">Winrate real por bracket</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                    {winrates.map((w) => (
                      <span
                        key={w.bracket}
                        className="statusPill"
                        style={{ opacity: w.bracket === bracket ? 1 : 0.65 }}
                      >
                        {BRACKET_LABELS[w.bracket]}: <strong>{w.pct}%</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="tacticalAudit">
                <span className="notesTitle">Lectura del parche</span>
                <p className="tacticalDesc">
                  {activeChange
                    ? `${activeHero.name} recibió ${activeChange.changeCount} ajuste(s) en ${activePatch.version}` +
                      (activeChange.abilitiesChanged > 0
                        ? ` sobre ${activeChange.abilitiesChanged} habilidad(es)`
                        : "") +
                      `. Cruza el cambio con su winrate (${activeMeta.winratePct ?? "—"}%) antes de subir o bajar su prioridad.`
                    : `${activeHero.name} no tiene cambios directos en ${activePatch.version}. Conserva el plan estándar (${activeHero.firstCore.join(" -> ")}) y decide por su winrate y el draft.`}
                </p>
                <p style={{ marginTop: "10px" }}>
                  <a href={activePatch.source.url} target="_blank" rel="noreferrer" className="goldText">
                    Ver notas oficiales de {activePatch.version} <ExternalLink size={13} style={{ verticalAlign: "middle" }} />
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="emptyState">
              <BookOpen size={32} />
              <p>Selecciona un héroe para ver sus datos reales del parche.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
