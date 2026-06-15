import { describe, it, expect } from "vitest";
import { buildFacts, buildDeterministicReport } from "@/lib/report";
import type { NormalizedMatch, NormalizedPlayer } from "@/lib/opendota";

function player(overrides: Partial<NormalizedPlayer>): NormalizedPlayer {
  return {
    accountId: null,
    slot: 0,
    isRadiant: true,
    heroId: 1,
    heroName: "Hero",
    kills: 5,
    deaths: 3,
    assists: 8,
    kda: 4.3,
    gpm: 500,
    xpm: 500,
    lastHits: 200,
    denies: 10,
    heroDamage: 25000,
    towerDamage: 5000,
    heroHealing: 0,
    netWorth: 15000,
    laneRole: 2,
    won: true,
    lastHitsAt10: null,
    goldAt10: null,
    ...overrides,
  };
}

function match(me: NormalizedPlayer, enemyCarryNetWorth: number): NormalizedMatch {
  const radiant = [me, player({ slot: 1 }), player({ slot: 2 })];
  const dire = [
    player({ slot: 128, isRadiant: false, won: false, heroName: "Carry Enemigo", netWorth: enemyCarryNetWorth }),
    player({ slot: 129, isRadiant: false, won: false, netWorth: 8000 }),
  ];
  return {
    matchId: 8850507008,
    durationSeconds: 2052,
    durationLabel: "34:12",
    radiantWin: me.won,
    parsed: true,
    startTime: 0,
    players: [...radiant, ...dire],
  };
}

describe("buildFacts + buildDeterministicReport", () => {
  it("refleja el resultado real de la partida", () => {
    const me = player({ won: false, isRadiant: true });
    const m = { ...match(me, 16000), radiantWin: false };
    const facts = buildFacts(m, me, { question: "q" });
    expect(facts.result).toBe("Derrota");
  });

  it("marca muertes-altas cuando hay 9 o más muertes", () => {
    const me = player({ deaths: 11, kda: 1.2 });
    const facts = buildFacts(match(me, 14000), me, { question: "q" });
    expect(facts.flags).toContain("muertes-altas");
  });

  it("calcula el delta de net worth contra el carry enemigo", () => {
    const me = player({ netWorth: 12000 });
    const facts = buildFacts(match(me, 18000), me, { question: "q" });
    expect(facts.netWorthDelta).toBe(-6000);
    expect(facts.enemyCarryHero).toBe("Carry Enemigo");
  });

  it("el reporte determinista siempre entrega 3 errores y un plan de 4 días", () => {
    const me = player({ deaths: 12, towerDamage: 500, netWorth: 8000 });
    const facts = buildFacts(match(me, 20000), me, { question: "q" });
    const report = buildDeterministicReport(facts, "q");
    expect(report.errors).toHaveLength(3);
    expect(report.plan).toHaveLength(4);
    expect(report.matchId).toBe("8850507008");
  });

  it("usa el CS al minuto 10 cuando la partida está parseada", () => {
    const me = player({ lastHitsAt10: 22 });
    const facts = buildFacts(match(me, 14000), me, { question: "q", role: "Carry" });
    expect(facts.lastHitsAt10).toBe(22);
    expect(facts.flags).toContain("farm-lento-min10");
    const report = buildDeterministicReport(facts, "q");
    expect(report.phases.lane.good).toContain("minuto 10");
    expect(report.phases.lane.error).toContain("22 CS");
  });

  it("no marca farm-lento-min10 sin datos parseados", () => {
    const me = player({ lastHitsAt10: null });
    const facts = buildFacts(match(me, 14000), me, { question: "q", role: "Carry" });
    expect(facts.flags).not.toContain("farm-lento-min10");
  });

  it("conserva la pregunta del jugador en el reporte", () => {
    const me = player({});
    const facts = buildFacts(match(me, 14000), me, { question: "¿perdí la línea?" });
    const report = buildDeterministicReport(facts, "¿perdí la línea?");
    expect(report.question).toBe("¿perdí la línea?");
  });
});
