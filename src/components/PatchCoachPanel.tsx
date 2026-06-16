"use client";

import { useId } from "react";
import { AlertTriangle, BookOpen } from "lucide-react";
import { HEROES, PATCH_STATE, ROLE_LABELS, heroImageUrl } from "@/data/dota";
import {
  getActivePatch,
  getGlobalPatchChanges,
  getPatchChangesForHero,
  getPatchConfidenceForHero,
  getPatchRecommendationLabel,
} from "@/data/patches";

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
  const activePatch = getActivePatch();
  const activeChanges = activeHero ? getPatchChangesForHero(activeHero.id) : [];
  const globalChanges = getGlobalPatchChanges();
  const confidence = activeHero ? getPatchConfidenceForHero(activeHero.id) : "baja";
  const poolTitleId = useId();

  return (
    <div className="placeholderGrid patchPanelGrid">
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle" id={poolTitleId}>Mi Pool en este Parche</h3>
          <p className="panelNote">Selecciona un héroe para auditar los cambios aplicados en la versión {PATCH_STATE.version}.</p>
        </div>
        <div className="panelBody">
          <div className="patchHeroList" role="group" aria-labelledby={poolTitleId}>
            {heroes.length > 0 ? (
              heroes.map((hero) => {
                const isActive = hero.id === selectedHeroId;
                const statusText = getPatchRecommendationLabel(hero.id);
                const statusClass = statusText === "Priorizar" ? "buff" : statusText === "Revisar" ? "neutral" : "neutral";
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
            Detalles del Parche:{" "}
            <span className="patchHeroTitleAccent">
              {activeHero ? activeHero.name : "Selecciona Héroe"}
            </span>
          </h3>
          <p className="panelNote">
            Fuente activa: {activePatch.source.label}. Estado: revisión manual, confianza por héroe {confidence}.
          </p>
        </div>
        <div className="panelBody">
          {activeHero ? (
            <div className="patchNotesContent">
              <div className="heroMetaGrid">
                <div className="metaBox">
                  <span className="metaLabel">Patch Value</span>
                  <span className={`metaValue ${activeHero.patchValue > 0 ? "greenText" : activeHero.patchValue < 0 ? "redText" : ""}`}>
                    {activeHero.patchValue > 0
                      ? `+${activeHero.patchValue} local`
                      : activeHero.patchValue < 0
                        ? `${activeHero.patchValue} local`
                        : "Sin ajuste local"}
                  </span>
                </div>
                <div className="metaBox">
                  <span className="metaLabel">Confianza</span>
                  <span className="metaValue goldText">{confidence}</span>
                </div>
              </div>

              <div className="notesBlock">
                <span className="notesTitle">Datos versionados {PATCH_STATE.version}</span>
                <ul className="notesList">
                  {[
                    ...globalChanges,
                    ...(activeChanges.length > 0
                      ? activeChanges
                      : [
                          {
                            id: `no-direct-${activeHero.id}`,
                            summary: `Sin cambio directo registrado para ${activeHero.name} en la base local revisada.`,
                            kind: "inferencia" as const,
                            confidence: "baja" as const,
                            source: activePatch.source,
                            coachTakeaway:
                              "Usar plan estándar y evitar conclusiones fuertes hasta revisar el changelog completo del héroe.",
                          },
                        ]),
                  ].map((change) => (
                    <li key={change.id}>
                      <span className="noteBullet">•</span>
                      <p>
                        <strong>{change.kind}</strong> · {change.summary}
                        <br />
                        <small>
                          Confianza {change.confidence} · Fuente:{" "}
                          <a href={change.source.url} target="_blank" rel="noreferrer">
                            {change.source.label}
                          </a>
                        </small>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tacticalAudit">
                <span className="notesTitle">Recomendación del Parche</span>
                <p className="tacticalDesc">
                  {activeChanges.length > 0
                    ? activeChanges[0].coachTakeaway
                    : `${activeHero.name} no tiene un cambio directo revisado en esta base. Conserva el plan estándar (${activeHero.firstCore.join(" -> ")}) y usa el draft para decidir si conviene jugarlo.`}
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
