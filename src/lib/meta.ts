// Señal de meta REAL por héroe, derivada de datos públicos de OpenDota
// (winrate y volumen de picks por bracket) cruzada con los cambios reales del
// parche vigente (datafeed de Valve). Es la única fuente de verdad para decir
// si un héroe está fuerte/flojo y si cambió en el parche: no hay valores
// "patchValue" tecleados a mano.

import type { Bracket } from "@/data/dota";
import { HERO_DATA_BY_ID } from "@/data/heroData.generated";
import { HERO_PATCH_CHANGES_BY_ID } from "@/data/patchNotes.generated";

export type MetaVerdict = "fuerte" | "solido" | "promedio" | "debil";
export type PickTier = "alto" | "medio" | "bajo";

export const META_VERDICT_LABEL: Record<MetaVerdict, string> = {
  fuerte: "Fuerte en el meta",
  solido: "Sólido",
  promedio: "Promedio",
  debil: "Flojo en el meta",
};

const BRACKETS: Bracket[] = [
  "herald", "guardian", "crusader", "archon", "legend", "ancient", "divine",
];

// Tier de popularidad calculado por RANGO dentro de cada bracket (auto-calibrado:
// no usa umbrales mágicos de pickrate). Top 20% = alto, siguiente 40% = medio.
const pickTierByBracket = new Map<Bracket, Map<string, PickTier>>();
{
  const all = Object.values(HERO_DATA_BY_ID);
  for (const bracket of BRACKETS) {
    const sorted = [...all].sort(
      (a, b) => (b.pickByBracket[bracket] ?? 0) - (a.pickByBracket[bracket] ?? 0),
    );
    const tiers = new Map<string, PickTier>();
    sorted.forEach((hero, i) => {
      const tier: PickTier = i < sorted.length * 0.2 ? "alto" : i < sorted.length * 0.6 ? "medio" : "bajo";
      tiers.set(hero.id, tier);
    });
    pickTierByBracket.set(bracket, tiers);
  }
}

export type HeroMeta = {
  id: string;
  /** false si OpenDota no tiene datos de este héroe (recién añadido, etc.). */
  hasData: boolean;
  winrate: number | null; // 0-1 en el bracket consultado
  winratePct: number | null; // p. ej. 52.4
  picks: number | null; // partidas en el bracket
  pickTier: PickTier | null;
  verdict: MetaVerdict | null;
  changedThisPatch: boolean;
  changeCount: number; // nº real de líneas de cambio en el parche vigente
};

function verdictFromWinrate(wr: number): MetaVerdict {
  if (wr >= 0.52) return "fuerte";
  if (wr >= 0.5) return "solido";
  if (wr >= 0.48) return "promedio";
  return "debil";
}

export function getHeroMeta(heroId: string, bracket: Bracket): HeroMeta {
  const data = HERO_DATA_BY_ID[heroId];
  const patch = HERO_PATCH_CHANGES_BY_ID[heroId];
  const changedThisPatch = Boolean(patch);
  const changeCount = patch?.changeCount ?? 0;

  if (!data) {
    return {
      id: heroId,
      hasData: false,
      winrate: null,
      winratePct: null,
      picks: null,
      pickTier: null,
      verdict: null,
      changedThisPatch,
      changeCount,
    };
  }

  const wr = data.winByBracket[bracket] ?? data.overallWin;
  return {
    id: heroId,
    hasData: true,
    winrate: wr,
    winratePct: Math.round(wr * 1000) / 10,
    picks: data.pickByBracket[bracket] ?? 0,
    pickTier: pickTierByBracket.get(bracket)?.get(heroId) ?? null,
    verdict: verdictFromWinrate(wr),
    changedThisPatch,
    changeCount,
  };
}

/** Winrate real por bracket (0-1) para mini-tablas. Vacío si no hay datos. */
export function getWinrateByBracket(heroId: string): Array<{ bracket: Bracket; pct: number }> {
  const data = HERO_DATA_BY_ID[heroId];
  if (!data) return [];
  return BRACKETS.map((bracket) => ({
    bracket,
    pct: Math.round((data.winByBracket[bracket] ?? 0) * 1000) / 10,
  }));
}
