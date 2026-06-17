export type Role = "carry" | "mid" | "offlane" | "support4" | "support5";
export type Bracket = "herald" | "guardian" | "crusader" | "archon" | "legend" | "ancient" | "divine";
export type Style = "comfort" | "counter" | "safe" | "aggressive" | "late";
export type DamageType = "physical" | "magical" | "mixed";

export type HeroTag =
  | "stun"
  | "initiation"
  | "save"
  | "push"
  | "waveClear"
  | "roshan"
  | "sustain"
  | "teamfight"
  | "towerDamage"
  | "disable"
  | "burst"
  | "scaling"
  | "lanePressure"
  | "vision";

export type Hero = {
  id: string;
  name: string;
  roles: Role[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  damage: DamageType;
  tempo: "early" | "mid" | "late";
  laneStrength: 1 | 2 | 3 | 4 | 5;
  patchValue: -2 | -1 | 0 | 1 | 2;
  tags: HeroTag[];
  counters: string[];
  weakAgainst: string[];
  synergies: string[];
  startingItems: string[];
  firstCore: string[];
  lanePlan: string;
};

import { PATCH_NOTES_META } from "./patchNotes.generated";

export const PATCH_STATE = {
  version: PATCH_NOTES_META.version,
  updatedAt: PATCH_NOTES_META.releasedAt,
  freshness: `Parche ${PATCH_NOTES_META.version} (salió ${PATCH_NOTES_META.releasedAt}): ${PATCH_NOTES_META.heroesChanged} héroes cambiados, según el datafeed oficial de Valve. Winrates por bracket desde OpenDota.`,
};

export const ROLE_LABELS: Record<Role, string> = {
  carry: "Carry",
  mid: "Mid",
  offlane: "Offlane",
  support4: "Support 4",
  support5: "Support 5",
};

export const BRACKET_LABELS: Record<Bracket, string> = {
  herald: "Herald",
  guardian: "Guardian",
  crusader: "Crusader",
  archon: "Archon",
  legend: "Legend",
  ancient: "Ancient",
  divine: "Divine",
};

export const STYLE_LABELS: Record<Style, string> = {
  comfort: "Comfort",
  counter: "Counter",
  safe: "Seguro",
  aggressive: "Agresivo",
  late: "Late game",
};

export const HEROES: Hero[] = [
  {
    id: "axe",
    name: "Axe",
    roles: ["offlane"],
    difficulty: 2,
    damage: "physical",
    tempo: "mid",
    laneStrength: 4,
    patchValue: 0,
    tags: ["initiation", "disable", "teamfight", "lanePressure"],
    counters: ["phantom-assassin", "drow-ranger", "slark"],
    weakAgainst: ["viper", "oracle"],
    synergies: ["crystal-maiden", "skywrath-mage", "witch-doctor"],
    startingItems: ["Tango", "Quelling Blade", "Gauntlets", "2 Branches"],
    firstCore: ["Vanguard", "Blink Dagger", "Blade Mail"],
    lanePlan: "Corta la wave si la línea es mala; busca Blink + call con primer power spike.",
  },
  {
    id: "crystal-maiden",
    name: "Crystal Maiden",
    roles: ["support5", "support4"],
    difficulty: 2,
    damage: "magical",
    tempo: "early",
    laneStrength: 3,
    patchValue: 1,
    tags: ["disable", "teamfight", "lanePressure", "vision"],
    counters: ["slark", "phantom-assassin"],
    weakAgainst: ["pudge", "queen-of-pain"],
    synergies: ["axe", "juggernaut", "mars"],
    startingItems: ["Tango", "Blood Grenade", "Observer Ward", "Sentry", "2 Branches"],
    firstCore: ["Tranquil Boots", "Glimmer Cape", "Force Staff"],
    lanePlan: "Gana trades cortos con slow/root y asegura pulls sin regalar visión.",
  },
  {
    id: "sniper",
    name: "Sniper",
    roles: ["mid", "carry"],
    difficulty: 2,
    damage: "physical",
    tempo: "late",
    laneStrength: 3,
    patchValue: 0,
    tags: ["towerDamage", "scaling", "lanePressure"],
    counters: ["viper", "drow-ranger"],
    weakAgainst: ["axe", "pudge", "slark", "faceless-void"],
    synergies: ["crystal-maiden", "tidehunter", "mars"],
    startingItems: ["Tango", "Wraith Band components", "2 Branches", "Faerie Fire"],
    firstCore: ["Dragon Lance", "Maelstrom", "Black King Bar"],
    lanePlan: "Mantente en rango máximo, presiona torre con catapulta y evita jugar sin visión.",
  },
  {
    id: "phantom-assassin",
    name: "Phantom Assassin",
    roles: ["carry"],
    difficulty: 2,
    damage: "physical",
    tempo: "late",
    laneStrength: 2,
    patchValue: 0,
    tags: ["burst", "scaling", "roshan"],
    counters: ["sniper", "drow-ranger", "lion"],
    weakAgainst: ["axe", "viper", "oracle"],
    synergies: ["oracle", "crystal-maiden", "witch-doctor"],
    startingItems: ["Tango", "Quelling Blade", "Slippers", "2 Branches"],
    firstCore: ["Battle Fury", "Desolator", "Black King Bar"],
    lanePlan: "Prioriza sobrevivir y farmear; pelea con Desolator/BKB, no antes si la línea fue mala.",
  },
  {
    id: "lion",
    name: "Lion",
    roles: ["support4", "support5"],
    difficulty: 2,
    damage: "magical",
    tempo: "early",
    laneStrength: 3,
    patchValue: 0,
    tags: ["stun", "disable", "burst", "lanePressure"],
    counters: ["puck", "queen-of-pain", "slark"],
    weakAgainst: ["phantom-assassin", "juggernaut"],
    synergies: ["axe", "viper", "sniper"],
    startingItems: ["Tango", "Blood Grenade", "Observer Ward", "Sentry", "Wind Lace"],
    firstCore: ["Tranquil Boots", "Blink Dagger", "Force Staff"],
    lanePlan: "Juega por disables en cadena; guarda Hex para movilidad enemiga.",
  },
  {
    id: "tidehunter",
    name: "Tidehunter",
    roles: ["offlane"],
    difficulty: 2,
    damage: "mixed",
    tempo: "mid",
    laneStrength: 4,
    patchValue: 0,
    tags: ["initiation", "teamfight", "sustain", "roshan"],
    counters: ["phantom-assassin", "juggernaut"],
    weakAgainst: ["viper", "slark"],
    synergies: ["sniper", "drow-ranger", "queen-of-pain"],
    startingItems: ["Tango", "Quelling Blade", "Ring of Protection", "Branches"],
    firstCore: ["Arcane Boots", "Blink Dagger", "Pipe of Insight"],
    lanePlan: "Absorbe presión y juega Ravage alrededor de objetivos, no por kills sueltas.",
  },
  {
    id: "viper",
    name: "Viper",
    roles: ["mid", "offlane"],
    difficulty: 2,
    damage: "magical",
    tempo: "early",
    laneStrength: 5,
    patchValue: 1,
    tags: ["lanePressure", "towerDamage", "sustain"],
    counters: ["phantom-assassin", "tidehunter", "axe", "dragon-knight"],
    weakAgainst: ["pudge", "queen-of-pain"],
    synergies: ["lion", "crystal-maiden", "mars"],
    startingItems: ["Tango", "Circlet", "Slippers", "2 Branches", "Faerie Fire"],
    firstCore: ["Power Treads", "Dragon Lance", "Black King Bar"],
    lanePlan: "Gana la línea y transforma ventaja en torre; si no presionas temprano pierdes valor.",
  },
  {
    id: "lina",
    name: "Lina",
    roles: ["mid", "support4"],
    difficulty: 3,
    damage: "mixed",
    tempo: "mid",
    laneStrength: 4,
    patchValue: 0,
    tags: ["stun", "burst", "waveClear", "towerDamage"],
    counters: ["drow-ranger", "crystal-maiden", "oracle"],
    weakAgainst: ["puck", "faceless-void", "pudge"],
    synergies: ["axe", "mars", "lion"],
    startingItems: ["Tango", "Null components", "2 Branches", "Faerie Fire"],
    firstCore: ["Bottle", "Boots of Travel", "Black King Bar"],
    lanePlan: "Empuja waves para controlar runas; juega alrededor de stun setup aliado.",
  },
  {
    id: "zeus",
    name: "Zeus",
    roles: ["mid"],
    difficulty: 2,
    damage: "magical",
    tempo: "mid",
    laneStrength: 3,
    patchValue: 0,
    tags: ["burst", "waveClear", "vision"],
    counters: ["drow-ranger", "crystal-maiden", "oracle"],
    weakAgainst: ["puck", "queen-of-pain", "slark"],
    synergies: ["axe", "faceless-void", "tidehunter"],
    startingItems: ["Tango", "Null components", "2 Branches", "Faerie Fire"],
    firstCore: ["Bottle", "Aether Lens", "Kaya"],
    lanePlan: "Controla runas con shove; no muestres posición antes de que inicie tu frontliner.",
  },
  {
    id: "invoker",
    name: "Invoker",
    roles: ["mid"],
    difficulty: 5,
    damage: "mixed",
    tempo: "mid",
    laneStrength: 3,
    patchValue: 0,
    tags: ["disable", "waveClear", "teamfight", "scaling"],
    counters: ["tidehunter", "sniper"],
    weakAgainst: ["queen-of-pain", "puck", "lion"],
    synergies: ["faceless-void", "axe", "mars"],
    startingItems: ["Tango", "Circlet", "Mantle", "2 Branches"],
    firstCore: ["Hand of Midas", "Witch Blade", "Black King Bar"],
    lanePlan: "Juega por rune control y cooldowns largos; evita drafts que exijan impacto simple inmediato.",
  },
  {
    id: "juggernaut",
    name: "Juggernaut",
    roles: ["carry"],
    difficulty: 2,
    damage: "physical",
    tempo: "mid",
    laneStrength: 4,
    patchValue: 0,
    tags: ["push", "towerDamage", "sustain", "roshan"],
    counters: ["lion", "crystal-maiden", "pudge"],
    weakAgainst: ["axe", "tidehunter", "bane"],
    synergies: ["crystal-maiden", "witch-doctor", "oracle"],
    startingItems: ["Tango", "Quelling Blade", "Slippers", "2 Branches"],
    firstCore: ["Phase Boots", "Maelstrom", "Manta Style"],
    lanePlan: "Usa kill threat con support; convierte Healing Ward en objetivo, no en pelea sin torre.",
  },
  {
    id: "shadow-fiend",
    name: "Shadow Fiend",
    roles: ["mid", "carry"],
    difficulty: 3,
    damage: "mixed",
    tempo: "mid",
    laneStrength: 4,
    patchValue: 1,
    tags: ["towerDamage", "waveClear", "roshan", "burst"],
    counters: ["sniper", "drow-ranger"],
    weakAgainst: ["pudge", "queen-of-pain", "lion"],
    synergies: ["tidehunter", "mars", "bane"],
    startingItems: ["Tango", "Wraith Band components", "2 Branches", "Faerie Fire"],
    firstCore: ["Power Treads", "Dragon Lance", "Black King Bar"],
    lanePlan: "Acelera almas y stacks; pelea cuando BKB proteja tu primer gran timing.",
  },
  {
    id: "pudge",
    name: "Pudge",
    roles: ["support4", "offlane"],
    difficulty: 3,
    damage: "magical",
    tempo: "early",
    laneStrength: 2,
    patchValue: -1,
    tags: ["disable", "initiation", "sustain"],
    counters: ["sniper", "zeus", "drow-ranger"],
    weakAgainst: ["juggernaut", "viper", "oracle"],
    synergies: ["lion", "crystal-maiden", "lina"],
    startingItems: ["Tango", "Wind Lace", "Blood Grenade", "Observer Ward"],
    firstCore: ["Tranquil Boots", "Aether Lens", "Blink Dagger"],
    lanePlan: "Si no conectas hooks, juega visión y runas; no abandones la lane sin objetivo claro.",
  },
  {
    id: "drow-ranger",
    name: "Drow Ranger",
    roles: ["carry"],
    difficulty: 2,
    damage: "physical",
    tempo: "late",
    laneStrength: 3,
    patchValue: 0,
    tags: ["towerDamage", "scaling", "push"],
    counters: ["tidehunter", "viper"],
    weakAgainst: ["axe", "pudge", "phantom-assassin", "lina"],
    synergies: ["tidehunter", "mars", "oracle"],
    startingItems: ["Tango", "Slippers", "Circlet", "2 Branches"],
    firstCore: ["Power Treads", "Dragon Lance", "Manta Style"],
    lanePlan: "Manten distancia y juega con frontliners; evita pelear en niebla sin Gust disponible.",
  },
  {
    id: "witch-doctor",
    name: "Witch Doctor",
    roles: ["support5", "support4"],
    difficulty: 2,
    damage: "magical",
    tempo: "early",
    laneStrength: 4,
    patchValue: 1,
    tags: ["stun", "sustain", "teamfight", "lanePressure"],
    counters: ["phantom-assassin", "slark"],
    weakAgainst: ["puck", "queen-of-pain"],
    synergies: ["juggernaut", "axe", "mars"],
    startingItems: ["Tango", "Blood Grenade", "Observer Ward", "Sentry", "2 Branches"],
    firstCore: ["Arcane Boots", "Glimmer Cape", "Aghanim Shard"],
    lanePlan: "Busca trades de Maledict con disable aliado; protege tu posición antes de Death Ward.",
  },
  {
    id: "earthshaker",
    name: "Earthshaker",
    roles: ["support4", "offlane"],
    difficulty: 3,
    damage: "magical",
    tempo: "mid",
    laneStrength: 2,
    patchValue: 0,
    tags: ["stun", "initiation", "teamfight", "disable"],
    counters: ["phantom-assassin", "drow-ranger"],
    weakAgainst: ["viper", "queen-of-pain"],
    synergies: ["faceless-void", "sniper", "zeus"],
    startingItems: ["Tango", "Blood Grenade", "Wind Lace", "Observer Ward"],
    firstCore: ["Arcane Boots", "Blink Dagger", "Force Staff"],
    lanePlan: "No sacrifiques XP por fisuras sin kill; tu primer gran valor es Blink + Echo.",
  },
  {
    id: "mars",
    name: "Mars",
    roles: ["offlane"],
    difficulty: 3,
    damage: "physical",
    tempo: "mid",
    laneStrength: 4,
    patchValue: 0,
    tags: ["stun", "initiation", "teamfight", "lanePressure"],
    counters: ["sniper", "drow-ranger", "lion"],
    weakAgainst: ["viper", "slark"],
    synergies: ["lina", "crystal-maiden", "witch-doctor"],
    startingItems: ["Tango", "Quelling Blade", "Gauntlets", "Branches"],
    firstCore: ["Phase Boots", "Blink Dagger", "Black King Bar"],
    lanePlan: "Presiona con Spear threat y usa Arena para tomar torres, no solo para kills.",
  },
  {
    id: "slark",
    name: "Slark",
    roles: ["carry"],
    difficulty: 3,
    damage: "physical",
    tempo: "mid",
    laneStrength: 2,
    patchValue: 0,
    tags: ["scaling", "vision", "roshan"],
    counters: ["sniper", "zeus", "tidehunter"],
    weakAgainst: ["axe", "lion", "witch-doctor"],
    synergies: ["oracle", "crystal-maiden", "lion"],
    startingItems: ["Tango", "Quelling Blade", "Slippers", "2 Branches"],
    firstCore: ["Power Treads", "Diffusal Blade", "Aghanim Scepter"],
    lanePlan: "No fuerces línea mala; juega por visión, pickoffs y peleas largas.",
  },
  {
    id: "faceless-void",
    name: "Faceless Void",
    roles: ["carry"],
    difficulty: 3,
    damage: "physical",
    tempo: "late",
    laneStrength: 2,
    patchValue: 0,
    tags: ["initiation", "teamfight", "scaling"],
    counters: ["sniper", "drow-ranger", "zeus"],
    weakAgainst: ["lion", "bane", "oracle"],
    synergies: ["invoker", "zeus", "earthshaker"],
    startingItems: ["Tango", "Quelling Blade", "Slippers", "2 Branches"],
    firstCore: ["Power Treads", "Maelstrom", "Black King Bar"],
    lanePlan: "Juega por Chronosphere con daño aliado; si no hay follow-up, farmea hasta BKB.",
  },
  {
    id: "oracle",
    name: "Oracle",
    roles: ["support5"],
    difficulty: 4,
    damage: "magical",
    tempo: "early",
    laneStrength: 3,
    patchValue: 0,
    tags: ["save", "sustain", "disable"],
    counters: ["axe", "lion", "phantom-assassin"],
    weakAgainst: ["lina", "zeus"],
    synergies: ["phantom-assassin", "slark", "juggernaut"],
    startingItems: ["Tango", "Observer Ward", "Sentry", "Blood Grenade", "Branches"],
    firstCore: ["Arcane Boots", "Glimmer Cape", "Aether Lens"],
    lanePlan: "Juega detrás del core; tu valor es negar el burst enemigo, no iniciar.",
  },
  {
    id: "bane",
    name: "Bane",
    roles: ["support5", "support4"],
    difficulty: 3,
    damage: "magical",
    tempo: "early",
    laneStrength: 4,
    patchValue: 0,
    tags: ["disable", "lanePressure", "save"],
    counters: ["faceless-void", "juggernaut", "phantom-assassin"],
    weakAgainst: ["lina", "zeus"],
    synergies: ["shadow-fiend", "sniper", "drow-ranger"],
    startingItems: ["Tango", "Blood Grenade", "Observer Ward", "Sentry"],
    firstCore: ["Tranquil Boots", "Glimmer Cape", "Aether Lens"],
    lanePlan: "Domina trades de 1v1 y guarda Fiend's Grip para el core que decide peleas.",
  },
  {
    id: "puck",
    name: "Puck",
    roles: ["mid"],
    difficulty: 4,
    damage: "magical",
    tempo: "mid",
    laneStrength: 3,
    patchValue: 0,
    tags: ["initiation", "disable", "waveClear", "teamfight"],
    counters: ["sniper", "lina", "zeus"],
    weakAgainst: ["lion", "bane"],
    synergies: ["witch-doctor", "earthshaker", "mars"],
    startingItems: ["Tango", "Null components", "2 Branches", "Faerie Fire"],
    firstCore: ["Bottle", "Witch Blade", "Blink Dagger"],
    lanePlan: "Empuja, asegura runas y fuerza rotaciones; no gastes Coil sin objetivo de mapa.",
  },
  {
    id: "queen-of-pain",
    name: "Queen of Pain",
    roles: ["mid"],
    difficulty: 3,
    damage: "magical",
    tempo: "mid",
    laneStrength: 4,
    patchValue: 0,
    tags: ["burst", "waveClear", "lanePressure"],
    counters: ["sniper", "zeus", "lina"],
    weakAgainst: ["lion", "bane", "puck"],
    synergies: ["tidehunter", "mars", "axe"],
    startingItems: ["Tango", "Null components", "2 Branches", "Faerie Fire"],
    firstCore: ["Bottle", "Kaya", "Black King Bar"],
    lanePlan: "Castiga runas y supports lentos; evita blink ofensivo si no sabes donde están disables.",
  },
  {
    id: "dragon-knight",
    name: "Dragon Knight",
    roles: ["mid", "offlane"],
    difficulty: 2,
    damage: "physical",
    tempo: "mid",
    laneStrength: 4,
    patchValue: 0,
    tags: ["stun", "towerDamage", "sustain", "push"],
    counters: ["sniper", "drow-ranger"],
    weakAgainst: ["viper", "slark"],
    synergies: ["crystal-maiden", "lion", "witch-doctor"],
    startingItems: ["Tango", "Gauntlets", "Circlet", "2 Branches"],
    firstCore: ["Power Treads", "Blink Dagger", "Black King Bar"],
    lanePlan: "Usa Dragon Form con catapulta para torres; no gastes forma sin objetivo.",
  },
];

import { HERO_ROSTER } from "./heroRoster.generated";
import { HERO_DATA_BY_ID } from "./heroData.generated";

export const HERO_BY_ID = new Map<string, Hero>();

const OPENDOTA_ROLE_TO_ROLE: Record<string, Role> = {
  Carry: "carry",
  Initiator: "offlane",
  Disabler: "support4",
  Support: "support5",
  Durable: "offlane",
  Escape: "carry",
  Nuker: "mid",
  Pusher: "offlane",
  Jungler: "carry",
};

const OPENDOTA_ROLE_TO_TAGS: Record<string, HeroTag[]> = {
  Disabler: ["stun", "disable"],
  Initiator: ["initiation", "teamfight"],
  Pusher: ["push", "towerDamage", "waveClear"],
  Nuker: ["burst", "waveClear"],
  Durable: ["sustain"],
  Carry: ["scaling"],
  Support: ["save", "vision"],
};

HERO_ROSTER.forEach((rosterHero) => {
  const curated = HEROES.find(h => h.id === rosterHero.id);
  const liveData = HERO_DATA_BY_ID ? HERO_DATA_BY_ID[rosterHero.id] : undefined;

  if (curated) {
    HERO_BY_ID.set(rosterHero.id, {
      ...curated,
      // Usamos datos vivos si existen (Counters, Weak, e Ítems)
      counters: liveData && liveData.counters.length > 0 ? liveData.counters.slice(0, 5) : curated.counters,
      weakAgainst: liveData && liveData.weakAgainst.length > 0 ? liveData.weakAgainst.slice(0, 5) : curated.weakAgainst,
      startingItems: liveData && liveData.startItems.length > 0 ? liveData.startItems : curated.startingItems,
      firstCore: liveData && liveData.coreItems.length > 0 ? liveData.coreItems : curated.firstCore,
      patchValue: liveData ? (liveData.overallWin >= 0.52 ? 2 : liveData.overallWin <= 0.48 ? -2 : curated.patchValue) : curated.patchValue,
    });
  } else {
    // Generar héroe en tiempo de ejecución para los no curados
    const mappedRoles = rosterHero.roles
      .map((r: string) => OPENDOTA_ROLE_TO_ROLE[r])
      .filter((r): r is Role => Boolean(r));

    // Mapear roles crudos de OpenDota a Parámetros Tácticos (Tags)
    const generatedTags = new Set<HeroTag>();
    rosterHero.roles.forEach((r: string) => {
      const mappedTags = OPENDOTA_ROLE_TO_TAGS[r];
      if (mappedTags) mappedTags.forEach(t => generatedTags.add(t));
    });

    HERO_BY_ID.set(rosterHero.id, {
      id: rosterHero.id,
      name: rosterHero.name,
      roles: mappedRoles.length > 0 ? Array.from(new Set(mappedRoles)) : ["carry"],
      difficulty: 3,
      damage: "mixed",
      tempo: "mid",
      laneStrength: 3,
      patchValue: liveData ? (liveData.overallWin >= 0.52 ? 2 : liveData.overallWin <= 0.48 ? -2 : 0) : 0,
      tags: Array.from(generatedTags),
      counters: liveData ? liveData.counters.slice(0, 5) : [],
      weakAgainst: liveData ? liveData.weakAgainst.slice(0, 5) : [],
      synergies: [],
      startingItems: liveData && liveData.startItems.length > 0 ? liveData.startItems : ["Tango", "Branches", "Circlet"],
      firstCore: liveData && liveData.coreItems.length > 0 ? liveData.coreItems : ["Power Treads", "Black King Bar"],
      lanePlan: "Juega de acuerdo a los tiempos y objetivos de tu rol.",
    });
  }
});

// Barra de percentil de OpenDota: pct va de 0 a 1 (0.27 = mejor que el 27% de
// los jugadores de ese héroe en esa métrica). valueLabel es el valor crudo ya
// formateado para mostrar (p. ej. "458 GPM").
export type BenchmarkBar = { label: string; pct: number; valueLabel: string };

export type ReplayReport = {
  matchId: string;
  duration: string;
  result: "Victoria" | "Derrota";
  hero: string;
  role: string;
  bracket: string;
  question: string;
  verdict: string;
  phases: {
    lane: { good: string; error: string; change: string };
    mid: { good: string; error: string; change: string };
    late: { good: string; error: string; change: string };
  };
  errors: Array<{ title: string; evidence: string; impact: string; fix: string; practice: string }>;
  plan: string[];
  nextSteps: { objective: string; metric: string; question: string };
  // Percentiles reales de OpenDota relativos al héroe. Opcional: solo en
  // reportes reales (los mocks no lo traen). Dato duro: la IA no lo altera.
  benchmarks?: BenchmarkBar[];
};

// Algunos héroes usan un nombre interno distinto al id legible en la CDN de Valve.
const HERO_IMAGE_OVERRIDES: Record<string, string> = {
  "shadow-fiend": "nevermore",
  "queen-of-pain": "queenofpain",
  zeus: "zuus",
};

// Retrato oficial (256x144) del héroe desde la CDN pública de Steam. Sin auth.
// Prefiere shortName del roster real de OpenDota cuando exista; cae al override
// curado y por último al id slugificado para no romper en héroes legacy.
import { HERO_ROSTER_BY_ID } from "@/data/heroRoster.generated";
export function heroImageUrl(id: string): string {
  const fromRoster = HERO_ROSTER_BY_ID[id]?.shortName;
  const name = fromRoster ?? HERO_IMAGE_OVERRIDES[id] ?? id.replace(/-/g, "_");
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name}.png`;
}
