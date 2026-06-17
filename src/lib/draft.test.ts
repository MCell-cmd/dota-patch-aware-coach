import { describe, it, expect } from "vitest";
import { analyzeDraft, type DraftInput } from "@/lib/draft";
import { HERO_BY_ID } from "@/data/dota";

// Counters/weakAgainst de Viper son datos REALES de OpenDota (cambian en cada
// sync). Los leemos en runtime para que el test valide el mecanismo de scoring
// sin asumir matchups fijos que un re-sync invalidaría.
const viper = HERO_BY_ID.get("viper")!;
const viperCounters = viper.counters[0]; // enemigo al que Viper le gana
const viperWeakAgainst = viper.weakAgainst[0]; // enemigo que le gana a Viper

const base: DraftInput = {
  role: "mid",
  bracket: "legend",
  style: "comfort",
  heroPool: ["viper"],
  allies: [],
  enemies: [],
};

describe("analyzeDraft", () => {
  it("devuelve un best pick del pool filtrado por rol", () => {
    const a = analyzeDraft({ ...base, heroPool: ["viper", "zeus"] });
    expect(a.best).not.toBeNull();
    expect(["viper", "zeus"]).toContain(a.best!.hero.id);
  });

  it("aplica el multiplicador de comfort (base 25 x2 sin sinergia)", () => {
    const a = analyzeDraft({ ...base, style: "comfort" });
    // comfortBase 25 * multiplicador comfort 2.0 = 50 (sin aliados => sin +2 sinergia).
    expect(a.best!.scores.comfort).toBe(50);
  });

  it("premia los counters contra enemigos visibles", () => {
    const withCounter = analyzeDraft({ ...base, enemies: [viperCounters] });
    const without = analyzeDraft({ ...base, enemies: [] });
    expect(withCounter.best!.scores.counterValue).toBeGreaterThan(
      without.best!.scores.counterValue,
    );
  });

  it("el matchup visible mueve el score del pick (favorable > desfavorable)", () => {
    const favorable = analyzeDraft({ ...base, style: "counter", enemies: [viperCounters] });
    const unfavorable = analyzeDraft({ ...base, style: "counter", enemies: [viperWeakAgainst] });

    expect(favorable.best?.hero.id).toBe("viper");
    expect(unfavorable.best?.hero.id).toBe("viper");
    expect(favorable.best!.total).toBeGreaterThan(unfavorable.best!.total);
  });

  it("no recomienda heroes ya elegidos por aliados o enemigos", () => {
    const a = analyzeDraft({
      ...base,
      heroPool: ["viper", "lina", "zeus"],
      enemies: ["viper"],
    });
    expect(a.best?.hero.id).not.toBe("viper");
  });

  it("premia la sinergia con aliados ya elegidos", () => {
    const withSynergy = analyzeDraft({ ...base, allies: ["lion"] });
    const without = analyzeDraft({ ...base, allies: [] });
    expect(withSynergy.best!.scores.teamSynergy).toBeGreaterThanOrEqual(
      without.best!.scores.teamSynergy,
    );
  });

  it("devuelve best null cuando ningún héroe del pool juega ese rol", () => {
    const a = analyzeDraft({ ...base, role: "carry", heroPool: ["crystal-maiden"] });
    expect(a.best).toBeNull();
  });

  it("escala el riesgo de ejecución con el bracket", () => {
    const herald = analyzeDraft({ ...base, bracket: "herald", heroPool: ["invoker"] });
    const divine = analyzeDraft({ ...base, bracket: "divine", heroPool: ["invoker"] });
    expect(herald.best!.scores.executionRisk).toBeGreaterThan(
      divine.best!.scores.executionRisk,
    );
  });

  it("detecta carencias del equipo aliado", () => {
    const a = analyzeDraft({ ...base, allies: [] });
    expect(a.teamNeeds.length).toBeGreaterThan(0);
  });

  it("no recomienda heroes de otro rol aunque esten en el pool", () => {
    const a = analyzeDraft({
      ...base,
      role: "support5",
      heroPool: ["viper", "zeus", "crystal-maiden", "oracle"],
    });

    expect(a.best).not.toBeNull();
    expect(a.best!.hero.roles).toContain("support5");
    expect(["crystal-maiden", "oracle"]).toContain(a.best!.hero.id);
  });
});
