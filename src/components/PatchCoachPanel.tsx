"use client";

import { AlertTriangle, BookOpen } from "lucide-react";
import { HEROES, PATCH_NOTES_BY_HERO, PATCH_STATE, ROLE_LABELS } from "@/data/dota";

export function PatchCoachPanel({
  heroPool,
  selectedHeroId,
  onSelectHero,
}: {
  heroPool: string[];
  selectedHeroId: string;
  onSelectHero: (id: string) => void;
}) {
  const heroes = HEROES.filter((hero) => heroPool.includes(hero.id));
  const activeHero = HEROES.find((h) => h.id === selectedHeroId) || heroes[0];

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
                      <span className="patchHeroRoles">{hero.roles.map((r) => ROLE_LABELS[r]).join(", ")}</span>
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
                    "Afectado únicamente por ajustes globales de economía e ítems neutrales.",
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
                    ? `Los buffs recibidos posiciónan a ${activeHero.name} como un pick sólido en este parche. Maximiza su lane presence con ítems como ${activeHero.startingItems.slice(0, 2).join(" y ")} y presióna timings rápidos.`
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
