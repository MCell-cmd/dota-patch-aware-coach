import { describe, expect, it } from "vitest";
import { getActivePatch, getHeroPatchChange, heroChangedThisPatch } from "@/data/patches";

describe("patch data (real, datafeed de Valve)", () => {
  it("expone el patch activo con fuente oficial y conteos reales", () => {
    const patch = getActivePatch();
    expect(patch.version).toMatch(/^\d+\.\d+/);
    expect(patch.source.url).toContain("dota2.com/patches/");
    expect(patch.heroesChanged).toBeGreaterThan(0);
    expect(patch.releasedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("devuelve cambios reales por héroe cuando los hay", () => {
    const change = getHeroPatchChange("morphling");
    expect(change).toBeDefined();
    expect(change?.changeCount).toBeGreaterThan(0);
    expect(heroChangedThisPatch("morphling")).toBe(true);
  });

  it("no inventa cambios para héroes sin ajustes", () => {
    const change = getHeroPatchChange("__heroe-inexistente__");
    expect(change).toBeUndefined();
    expect(heroChangedThisPatch("__heroe-inexistente__")).toBe(false);
  });
});
