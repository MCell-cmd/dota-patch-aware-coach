import { describe, it, expect } from "vitest";
import { findRepeatedPatterns } from "@/lib/patterns";
import type { ReportFacts } from "@/lib/report";

function facts(flags: string[]): ReportFacts {
  return {
    matchId: "1",
    durationLabel: "40:00",
    parsed: false,
    result: "Derrota",
    hero: "Bloodseeker",
    role: "Carry",
    bracket: "No disponible",
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: 0,
    gpm: 500,
    xpm: 500,
    lastHits: 200,
    denies: 0,
    heroDamage: 0,
    towerDamage: 0,
    netWorth: 0,
    teamNetWorthRank: "1/5",
    enemyCarryHero: "Riki",
    enemyCarryNetWorth: 0,
    netWorthDelta: 0,
    lastHitsAt10: null,
    flags,
  };
}

describe("findRepeatedPatterns", () => {
  it("detecta una bandera que se repite en >= 2 partidas", () => {
    const r = findRepeatedPatterns([
      facts(["dano-torres-bajo", "muertes-altas"]),
      facts(["dano-torres-bajo", "kda-bajo"]),
    ]);
    expect(r.matchesAnalyzed).toBe(2);
    expect(r.repeated.map((p) => p.flag)).toContain("dano-torres-bajo");
    expect(r.repeated.find((p) => p.flag === "dano-torres-bajo")!.count).toBe(2);
    expect(r.summary).toContain("daño a torres");
  });

  it("ignora banderas no accionables como match-sin-parsear", () => {
    const r = findRepeatedPatterns([
      facts(["match-sin-parsear"]),
      facts(["match-sin-parsear"]),
    ]);
    expect(r.repeated).toHaveLength(0);
  });

  it("no marca patrones si un error aparece una sola vez", () => {
    const r = findRepeatedPatterns([
      facts(["muertes-altas"]),
      facts(["dano-torres-bajo"]),
    ]);
    expect(r.repeated).toHaveLength(0);
    expect(r.summary).toContain("No se detectan");
  });

  it("pide al menos 2 partidas", () => {
    const r = findRepeatedPatterns([facts(["dano-torres-bajo"])]);
    expect(r.summary).toContain("al menos 2");
  });
});
