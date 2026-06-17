import { describe, it, expect } from "vitest";
import { buildVisionReport } from "@/lib/visionReport";
import type { NormalizedPlayer } from "@/lib/opendota";

function player(vision: Partial<NormalizedPlayer["vision"]>, heroName = "Hero"): NormalizedPlayer {
  return {
    accountId: 1,
    slot: 0,
    isRadiant: true,
    heroId: 1,
    heroName,
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: 0,
    gpm: 0,
    xpm: 0,
    lastHits: 0,
    denies: 0,
    heroDamage: 0,
    towerDamage: 0,
    heroHealing: 0,
    netWorth: 0,
    laneRole: null,
    won: true,
    lastHitsAt10: null,
    goldAt10: null,
    benchmarks: [],
    vision: {
      obsPlaced: null,
      senPlaced: null,
      observerKills: 0,
      sentryKills: 0,
      obsBought: null,
      senBought: null,
      firstWardSeconds: null,
      ...vision,
    },
  };
}

describe("buildVisionReport", () => {
  it("marca visión baja de un support con pocos observers", () => {
    const me = player({ obsPlaced: 2, senPlaced: 1, observerKills: 0 });
    const r = buildVisionReport(me, "support5", 30 * 60, true);
    expect(r.stats.obsPlaced).toBe(2);
    expect(r.reads.some((read) => read.kind === "warn")).toBe(true);
    expect(r.verdict).toMatch(/corregir/i);
  });

  it("aprueba a un support con buen ritmo de wards y dewards", () => {
    const me = player({ obsPlaced: 14, senPlaced: 10, observerKills: 3, sentryKills: 2, firstWardSeconds: -10 });
    const r = buildVisionReport(me, "support5", 30 * 60, true);
    expect(r.stats.dewards).toBe(5);
    expect(r.reads.some((read) => read.kind === "good")).toBe(true);
  });

  it("no exige visión a un core y lo dice", () => {
    const me = player({ obsPlaced: 1, senPlaced: 0 }, "Anti-Mage");
    const r = buildVisionReport(me, "carry", 35 * 60, true);
    expect(r.verdict).toMatch(/core/i);
  });

  it("avisa cuando la partida no está parseada", () => {
    const me = player({ observerKills: 1 });
    const r = buildVisionReport(me, "support4", 25 * 60, false);
    expect(r.stats.obsPlaced).toBeNull();
    expect(r.reads.some((read) => /parsea/i.test(read.text))).toBe(true);
  });
});
