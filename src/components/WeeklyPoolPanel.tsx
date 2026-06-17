"use client";

import { AlertTriangle, Calendar, Star } from "lucide-react";
import { Bracket, BRACKET_LABELS, Role, heroImageUrl } from "@/data/dota";
import { classifyHeroPool, WeeklyClassification } from "@/lib/weekly";
import { getActivePatch } from "@/data/patches";

const CLASS_LABELS: Record<WeeklyClassification, { label: string; colorClass: string }> = {
  "jugar-ahora": { label: "Jugar Ahora", colorClass: "greenText" },
  "jugar-draft": { label: "Jugar si el draft acompaña", colorClass: "goldText" },
  "pausar": { label: "Pausar esta semana", colorClass: "redText" },
  "aprender": { label: "Aprender como backup", colorClass: "blueText" },
};

const PICK_TIER_LABEL: Record<string, string> = {
  alto: "Pick alto",
  medio: "Pick medio",
  bajo: "Pick bajo",
};

export function WeeklyPoolPanel({
  heroPool,
  role,
  bracket,
}: {
  heroPool: string[];
  role: Role;
  bracket: Bracket;
}) {
  const activePatch = getActivePatch();
  const classified = classifyHeroPool(heroPool, role, bracket);

  const topActions = classified
    .filter((r) => r.classification === "jugar-ahora" || r.classification === "jugar-draft")
    .sort((a, b) => (b.meta.winrate ?? 0) - (a.meta.winrate ?? 0))
    .slice(0, 3);

  return (
    <div className="placeholderGrid">
      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Mi Hero Pool Semanal</h3>
          <p className="panelNote">
            Cruza tu comfort, rol y bracket ({BRACKET_LABELS[bracket]}) con el winrate real de OpenDota y los cambios de{" "}
            <a href={activePatch.source.url} target="_blank" rel="noreferrer">
              {activePatch.version}
            </a>
            .
          </p>
        </div>
        <div className="panelBody">
          {heroPool.length === 0 ? (
            <div className="emptyState">
              <AlertTriangle size={32} />
              <p>No tienes héroes en tu pool. Configúralo en la pestaña de Draft.</p>
            </div>
          ) : (
            <div className="weeklyGrid">
              {classified.map((result) => {
                const badgeInfo = CLASS_LABELS[result.classification];
                const { meta } = result;
                return (
                  <div key={result.hero.id} className="faseCard">
                    <div className="faseCardHeader" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={heroImageUrl(result.hero.id)}
                        alt={result.hero.name}
                        width={32}
                        height={18}
                        style={{ borderRadius: "4px" }}
                      />
                      <span>{result.hero.name}</span>
                    </div>
                    <div className="faseCardBody">
                      <p className={badgeInfo.colorClass}>
                        <strong>{badgeInfo.label}</strong>
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          margin: "8px 0",
                          fontSize: "0.8rem",
                          color: "var(--text-dim)",
                        }}
                      >
                        {meta.winratePct != null && (
                          <span className="statusPill">{meta.winratePct}% WR</span>
                        )}
                        {meta.pickTier && (
                          <span className="statusPill">{PICK_TIER_LABEL[meta.pickTier]}</span>
                        )}
                        {meta.changedThisPatch && (
                          <span className="statusPill" title={`${meta.changeCount} líneas de cambio`}>
                            Cambió en {activePatch.version}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-dim)" }}>{result.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="panel">
        <div className="panelHeader">
          <h3 className="panelTitle">Acciones para esta semana</h3>
          <p className="panelNote">Tus 3 mejores opciones por winrate real en {BRACKET_LABELS[bracket]}.</p>
        </div>
        <div className="panelBody">
          {topActions.length === 0 ? (
            <div className="emptyState">
              <Calendar size={32} />
              <p>Tu pool necesita ajustarse. Considera agregar héroes con mejor winrate en tu bracket.</p>
            </div>
          ) : (
            <div className="errorsSection">
              {topActions.map((action) => (
                <div className="errorReportCard" key={action.hero.id}>
                  <h4 className="errorCardTitle">
                    <Star size={16} className="iconGreen" />
                    Spamear {action.hero.name}
                    {action.meta.winratePct != null && (
                      <span className="goldText"> · {action.meta.winratePct}% WR</span>
                    )}
                  </h4>
                  <div className="errorCardGrid">
                    <div>
                      <strong>Razón:</strong>
                      <p>{action.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
