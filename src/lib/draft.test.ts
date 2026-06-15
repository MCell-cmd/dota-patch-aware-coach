import { describe, it, expect } from "vitest";
import { analyzeDraft, type DraftInput } from "@/lib/draft";

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

  it("aplica el bonus completo de comfort (25 + 4)", () => {
    const a = analyzeDraft({ ...base, style: "comfort" });
    expect(a.best!.scores.comfort).toBe(29);
  });

  it("premia los counters contra enemigos visibles", () => {
    const withCounter = analyzeDraft({ ...base, enemies: ["phantom-assassin"] });
    const without = analyzeDraft({ ...base, enemies: [] });
    expect(withCounter.best!.scores.counterValue).toBeGreaterThan(
      without.best!.scores.counterValue,
    );
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
});
