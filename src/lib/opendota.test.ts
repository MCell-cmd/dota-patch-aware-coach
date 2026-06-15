import { describe, it, expect } from "vitest";
import {
  formatDuration,
  normalizeMatch,
  pickPerspective,
  type OpenDotaMatch,
  type OpenDotaPlayer,
} from "@/lib/opendota";

function odPlayer(overrides: Partial<OpenDotaPlayer>): OpenDotaPlayer {
  return {
    account_id: null,
    player_slot: 0,
    hero_id: 1,
    lane_role: 2,
    kills: 5,
    deaths: 2,
    assists: 7,
    gold_per_min: 500,
    xp_per_min: 520,
    last_hits: 200,
    denies: 12,
    hero_damage: 20000,
    tower_damage: 4000,
    hero_healing: 0,
    net_worth: 14000,
    item_0: 0,
    item_1: 0,
    item_2: 0,
    item_3: 0,
    item_4: 0,
    item_5: 0,
    ...overrides,
  };
}

const heroes = new Map<number, string>([
  [47, "Viper"],
  [1, "Anti-Mage"],
]);

const rawMatch: OpenDotaMatch = {
  match_id: 8850507008,
  duration: 2052,
  radiant_win: true,
  start_time: 0,
  game_mode: 1,
  version: 21,
  players: [
    odPlayer({ player_slot: 0, account_id: 5, hero_id: 47, net_worth: 20000 }),
    odPlayer({ player_slot: 128, hero_id: 1, net_worth: 18000, deaths: 4 }),
  ],
};

describe("opendota helpers", () => {
  it("formatea la duración en m:ss", () => {
    expect(formatDuration(2052)).toBe("34:12");
    expect(formatDuration(65)).toBe("1:05");
  });

  it("normaliza radiant/dire y el resultado por bando", () => {
    const n = normalizeMatch(rawMatch, heroes);
    expect(n.parsed).toBe(true);
    expect(n.players[0].isRadiant).toBe(true);
    expect(n.players[0].won).toBe(true);
    expect(n.players[0].heroName).toBe("Viper");
    expect(n.players[1].isRadiant).toBe(false);
    expect(n.players[1].won).toBe(false);
  });

  it("calcula KDA con guard de división por cero", () => {
    const n = normalizeMatch(
      { ...rawMatch, players: [odPlayer({ kills: 4, deaths: 0, assists: 6 })] },
      heroes,
    );
    expect(n.players[0].kda).toBe(10);
  });

  it("marca parsed=false cuando version es null", () => {
    const n = normalizeMatch({ ...rawMatch, version: null }, heroes);
    expect(n.parsed).toBe(false);
  });

  it("pickPerspective usa accountId cuando se entrega", () => {
    const n = normalizeMatch(rawMatch, heroes);
    const me = pickPerspective(n, 5);
    expect(me.accountId).toBe(5);
  });

  it("pickPerspective cae al mayor net worth sin accountId", () => {
    const n = normalizeMatch(rawMatch, heroes);
    const me = pickPerspective(n, null);
    expect(me.netWorth).toBe(20000);
  });
});
