import { Bracket, Hero, HeroTag, HEROES, HERO_BY_ID, Role, Style } from "@/data/dota";

export type DraftInput = {
  role: Role;
  bracket: Bracket;
  style: Style;
  heroPool: string[];
  allies: string[];
  enemies: string[];
};

export type PickScore = {
  hero: Hero;
  total: number;
  confidence: "baja" | "media" | "media-alta" | "alta";
  scores: {
    comfort: number;
    laneMatchup: number;
    teamSynergy: number;
    counterValue: number;
    patchValue: number;
    executionRisk: number;
  };
  reasons: string[];
  risks: string[];
  startingItems: string[];
  firstCore: string[];
  plan: {
    early: string;
    mid: string;
    objective: string;
  };
};

export type DraftAnalysis = {
  best: PickScore | null;
  alternatives: PickScore[];
  avoid: PickScore[];
  teamNeeds: string[];
  enemyThreats: string[];
  mapPlan: string[];
  freshnessWarning: string;
};

const REQUIRED_TAGS: Array<{ tag: HeroTag; label: string }> = [
  { tag: "stun", label: "stun fiable" },
  { tag: "initiation", label: "iniciacion" },
  { tag: "waveClear", label: "limpieza de waves" },
  { tag: "towerDamage", label: "dano a torres" },
  { tag: "teamfight", label: "teamfight" },
];

const BRACKET_RISK_MULTIPLIER: Record<Bracket, number> = {
  herald: 1.45,
  guardian: 1.35,
  crusader: 1.25,
  archon: 1.1,
  legend: 1,
  ancient: 0.85,
  divine: 0.75,
};

const STYLE_BONUS: Record<Style, (hero: Hero) => number> = {
  comfort: () => 4,
  counter: (hero) => (hero.counters.length >= 3 ? 4 : 1),
  safe: (hero) => (hero.difficulty <= 2 && hero.laneStrength >= 3 ? 4 : 0),
  aggressive: (hero) => (hero.tempo !== "late" && hero.tags.includes("lanePressure") ? 4 : 0),
  late: (hero) => (hero.tempo === "late" || hero.tags.includes("scaling") ? 4 : 0),
};

export function analyzeDraft(input: DraftInput): DraftAnalysis {
  const pool = input.heroPool.length > 0 ? input.heroPool : HEROES.map((hero) => hero.id);
  const candidates = pool
    .map((id) => HERO_BY_ID.get(id))
    .filter((hero): hero is Hero => Boolean(hero))
    .filter((hero) => hero.roles.includes(input.role));

  const scored = candidates
    .map((hero) => scoreHero(hero, input))
    .sort((a, b) => b.total - a.total);

  const avoid = scored
    .filter((score) => score.total < 42 || score.risks.length >= 3)
    .sort((a, b) => a.total - b.total)
    .slice(0, 3);

  return {
    best: scored[0] ?? null,
    alternatives: scored.slice(1, 3),
    avoid,
    teamNeeds: findTeamNeeds(input),
    enemyThreats: findEnemyThreats(input),
    mapPlan: buildMapPlan(input, scored[0]?.hero),
    freshnessWarning: "Base mock 7.41d: util para validar UX/scoring, no para cobrar sin patch pipeline.",
  };
}

function scoreHero(hero: Hero, input: DraftInput): PickScore {
  const allies = input.allies.map((id) => HERO_BY_ID.get(id)).filter((h): h is Hero => Boolean(h));
  const enemies = input.enemies.map((id) => HERO_BY_ID.get(id)).filter((h): h is Hero => Boolean(h));
  const alliedTags = new Set(allies.flatMap((ally) => ally.tags));
  const enemyIds = new Set(enemies.map((enemy) => enemy.id));
  const allyIds = new Set(allies.map((ally) => ally.id));

  const comfort = 25 + STYLE_BONUS[input.style](hero);
  const counterHits = hero.counters.filter((id) => enemyIds.has(id)).length;
  const weakHits = hero.weakAgainst.filter((id) => enemyIds.has(id)).length;
  const synergyHits = hero.synergies.filter((id) => allyIds.has(id)).length;
  const missingTagCoverage = REQUIRED_TAGS.filter(
    (need) => !alliedTags.has(need.tag) && hero.tags.includes(need.tag),
  ).length;

  const laneMatchup = clamp(8 + hero.laneStrength * 3 + counterHits * 3 - weakHits * 5, 0, 24);
  const teamSynergy = clamp(8 + synergyHits * 4 + missingTagCoverage * 3, 0, 22);
  const counterValue = clamp(counterHits * 6 - weakHits * 4, -8, 18);
  const patchValue = hero.patchValue * 4;
  const executionRisk = Math.round((hero.difficulty - 1) * 3 * BRACKET_RISK_MULTIPLIER[input.bracket]);
  const total = Math.round(
    comfort + laneMatchup + teamSynergy + counterValue + patchValue - executionRisk,
  );

  const reasons = buildReasons(hero, counterHits, synergyHits, missingTagCoverage, input.style);
  const risks = buildRisks(hero, weakHits, input.bracket, enemies);

  return {
    hero,
    total,
    confidence: confidenceFromScore(total, risks.length),
    scores: {
      comfort,
      laneMatchup,
      teamSynergy,
      counterValue,
      patchValue,
      executionRisk,
    },
    reasons,
    risks,
    startingItems: hero.startingItems,
    firstCore: hero.firstCore,
    plan: {
      early: hero.lanePlan,
      mid: buildMidPlan(hero),
      objective: buildObjectivePlan(hero, input),
    },
  };
}

function buildReasons(
  hero: Hero,
  counterHits: number,
  synergyHits: number,
  missingTagCoverage: number,
  style: Style,
) {
  const reasons: string[] = [];

  if (counterHits > 0) reasons.push(`Castiga ${counterHits} condicion(es) enemiga(s) del draft.`);
  if (synergyHits > 0) reasons.push(`Tiene sinergia directa con ${synergyHits} aliado(s).`);
  if (missingTagCoverage > 0) reasons.push("Cubre carencias actuales de tu composicion.");
  if (hero.patchValue > 0) reasons.push("Tiene valor positivo en la base de parche actual.");
  if (style === "comfort") reasons.push("Respeta comfort pool antes que counter perfecto.");
  if (hero.tags.includes("towerDamage")) reasons.push("Puede convertir ventaja en torres.");
  if (hero.tags.includes("initiation")) reasons.push("Da forma clara de iniciar peleas.");
  if (reasons.length === 0) reasons.push(`Es una opcion estable para rol ${hero.roles.join("/")}.`);

  return reasons.slice(0, 4);
}

function buildRisks(hero: Hero, weakHits: number, bracket: Bracket, enemies: Hero[]) {
  const risks: string[] = [];

  if (weakHits > 0) risks.push(`Tiene ${weakHits} matchup(s) peligroso(s) ya visibles.`);
  if (hero.difficulty >= 4 && ["herald", "guardian", "crusader", "archon"].includes(bracket)) {
    risks.push("Riesgo de ejecucion alto para este bracket.");
  }
  if (hero.tempo === "late" && enemies.some((enemy) => enemy.tempo === "early")) {
    risks.push("Puede sufrir si el enemigo fuerza torres temprano.");
  }
  if (!hero.tags.includes("stun") && !hero.tags.includes("disable")) {
    risks.push("No agrega control fiable al draft.");
  }

  return risks;
}

function findTeamNeeds(input: DraftInput) {
  const allies = input.allies.map((id) => HERO_BY_ID.get(id)).filter((h): h is Hero => Boolean(h));
  const tags = new Set(allies.flatMap((ally) => ally.tags));

  return REQUIRED_TAGS.filter((need) => !tags.has(need.tag)).map((need) => `Falta ${need.label}`);
}

function findEnemyThreats(input: DraftInput) {
  const enemies = input.enemies.map((id) => HERO_BY_ID.get(id)).filter((h): h is Hero => Boolean(h));
  const threats: string[] = [];

  if (enemies.some((hero) => hero.tags.includes("scaling"))) threats.push("El enemigo tiene late game.");
  if (enemies.some((hero) => hero.tags.includes("initiation"))) threats.push("Cuidado con iniciacion enemiga.");
  if (enemies.some((hero) => hero.tags.includes("burst"))) threats.push("Necesitas saves, BKB o posicion.");
  if (enemies.some((hero) => hero.tags.includes("towerDamage"))) threats.push("Defiende catapultas y T1.");

  return [...new Set(threats)];
}

function buildMapPlan(input: DraftInput, best?: Hero) {
  const plan: string[] = [];
  const enemies = input.enemies.map((id) => HERO_BY_ID.get(id)).filter((h): h is Hero => Boolean(h));

  if (best?.tags.includes("towerDamage")) plan.push("Jugar alrededor de catapultas y primera torre.");
  if (best?.tags.includes("roshan")) plan.push("Convertir primer item core en amenaza de Roshan.");
  if (best?.tags.includes("initiation")) plan.push("Comprar humo con supports y pelear con cooldowns listos.");
  if (enemies.some((enemy) => enemy.tempo === "late")) plan.push("Evitar farm trade largo contra cores de late.");
  if (plan.length === 0) plan.push("Priorizar runas, vision y defensa de torres antes de pelear sin objetivo.");

  return plan.slice(0, 4);
}

function buildMidPlan(hero: Hero) {
  if (hero.tempo === "early") return "Usa ventaja de linea para rotar o tomar torre antes del minuto 10.";
  if (hero.tempo === "late") return "Protege tu segundo timing; evita peleas sin item core o vision.";
  return "Juega alrededor del primer core item y fuerza pelea con objetivo cercano.";
}

function buildObjectivePlan(hero: Hero, input: DraftInput) {
  if (hero.tags.includes("roshan")) return "Si ganas pelea cerca de minuto 15-20, convierte en Roshan.";
  if (hero.tags.includes("towerDamage")) return "Cada kill debe transformarse en torre o wave profunda.";
  if (input.role.includes("support")) return "Asegura vision antes de runas y protege el objetivo que toque.";
  return "No persigas kills largas: empuja wave y toma vision despues de cada ventaja.";
}

function confidenceFromScore(total: number, riskCount: number): PickScore["confidence"] {
  if (total >= 74 && riskCount <= 1) return "alta";
  if (total >= 62) return "media-alta";
  if (total >= 48) return "media";
  return "baja";
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
