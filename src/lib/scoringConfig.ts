// Pesos y umbrales del motor de scoring de draft, externalizados para poder
// recalibrar el balance sin tocar la lógica. Mantén los valores; cambiarlos
// reajusta el comportamiento del motor (cubierto por los tests de draft.ts).
import type { Bracket } from "@/data/dota";

export const SCORING = {
  comfortBase: 25,
  styleBonusFull: 4,
  styleBonusPartial: 1,

  lane: { base: 8, perLaneStrength: 3, perCounter: 3, perWeak: 5, min: 0, max: 24 },
  synergy: { base: 8, perSynergy: 4, perMissingTag: 3, min: 0, max: 22 },
  counter: { perCounter: 6, perWeak: 4, min: -8, max: 18 },

  patchMultiplier: 4,
  executionRiskPerDifficulty: 3,

  avoid: { totalBelow: 42, riskCountAtLeast: 3 },
  confidence: { alta: 74, mediaAlta: 62, media: 48, altaMaxRisks: 1 },

  bracketRiskMultiplier: {
    herald: 1.45,
    guardian: 1.35,
    crusader: 1.25,
    archon: 1.1,
    legend: 1,
    ancient: 0.85,
    divine: 0.75,
  } as Record<Bracket, number>,
};
