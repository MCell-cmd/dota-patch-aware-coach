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

export const PATCH_STATE = {
  version: "7.41d",
  updatedAt: "2026-06-15",
  freshness: "Base inicial mock; requiere ingestion de patch notes antes de produccion.",
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
    lanePlan: "Corta la wave si la linea es mala; busca Blink + call con primer power spike.",
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
    lanePlan: "Gana trades cortos con slow/root y asegura pulls sin regalar vision.",
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
    lanePlan: "Mantente en rango maximo, presiona torre con catapulta y evita jugar sin vision.",
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
    lanePlan: "Prioriza sobrevivir y farmear; pelea con Desolator/BKB, no antes si la linea fue mala.",
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
    lanePlan: "Absorbe presion y juega Ravage alrededor de objetivos, no por kills sueltas.",
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
    lanePlan: "Gana la linea y transforma ventaja en torre; si no presionas temprano pierdes valor.",
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
    lanePlan: "Controla runas con shove; no muestres posicion antes de que inicie tu frontliner.",
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
    lanePlan: "Si no conectas hooks, juega vision y runas; no abandones la lane sin objetivo claro.",
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
    lanePlan: "Busca trades de Maledict con disable aliado; protege tu posicion antes de Death Ward.",
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
    lanePlan: "No fuerces linea mala; juega por vision, pickoffs y peleas largas.",
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
    lanePlan: "Juega por Chronosphere con dano aliado; si no hay follow-up, farmea hasta BKB.",
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
    lanePlan: "Juega detras del core; tu valor es negar el burst enemigo, no iniciar.",
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
    lanePlan: "Castiga runas y supports lentos; evita blink ofensivo si no sabes donde estan disables.",
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

export const HERO_BY_ID = new Map(HEROES.map((hero) => [hero.id, hero]));

export const PATCH_NOTES_BY_HERO: Record<string, string[]> = {
  axe: [
    "+2 Armadura inicial para resistir mejor los ataques físicos en línea.",
    "El radio de Berserker's Call aumentó de 300 a 315.",
    "Multiplicador de daño de Counter Helix contra creeps reducido de 1.0 a 0.9."
  ],
  "crystal-maiden": [
    "Velocidad de movimiento base aumentada de 280 a 285.",
    "Costo de maná de Frostbite reducido de 115/125/135/145 a 100/110/120/130.",
    "Regeneración de maná propia otorgada por Arcane Aura aumentada en 0.25."
  ],
  sniper: [
    "Daño base de ataque reducido en 3.",
    "Costo de maná de Shrapnel aumentado de 50 a 65.",
    "El rango de ataque de Take Aim ahora da 25 unidades menos en el nivel 1."
  ],
  "phantom-assassin": [
    "La ganancia de Agilidad por nivel aumentó de 3.2 a 3.4.",
    "Costo de maná de Stifling Dagger reducido a 30 en todos los niveles.",
    "La probabilidad de crítico de Coupe de Grace aumentó de 17% a 18%."
  ],
  lion: [
    "Costo de maná de Earth Spike aumentado en 10 en los primeros niveles.",
    "El rango de casteo de Hex se redujo de 600 a 575.",
    "Daño base de Finger of Death aumentado en 50 en nivel 1."
  ],
  viper: [
    "Costo de maná de Poison Attack reducido de 18/20/22/24 a 16/18/20/22.",
    "Nethertoxin ahora inflige un 5% más de daño máximo.",
    "Resistencia mágica base aumentada a 30%."
  ],
  pudge: [
    "Rango de Meat Hook reducido en 50 en nivel 1.",
    "Daño base de Rot reducido en 5 en todos los niveles.",
    "Armadura inicial reducida en 1."
  ],
  juggernaut: [
    "El daño de Blade Fury aumentó en 10 en todos los niveles.",
    "El maná base de Juggernaut se incrementó a 300.",
    "El enfriamiento de Healing Ward se redujo de 60s a 55s."
  ],
  mars: [
    "Daño base de God's Rebuke aumentado de 150% a 165%.",
    "La duración de la Arena of Blood aumentó de 5/6/7s a 6/7/8s."
  ]
};

export type MockReplayReport = {
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
};

export const MOCK_REPLAY_REPORTS: Record<string, MockReplayReport> = {
  "8850507008": {
    matchId: "8850507008",
    duration: "34:12",
    result: "Derrota",
    hero: "Viper",
    role: "Midlaner",
    bracket: "Archon",
    question: "Que decision me hizo perder mas impacto?",
    verdict: "Ganaste la línea con holgura pero jugaste de forma pasiva en tu jungla en lugar de presionar las torres y anular el espacio de farm de la Phantom Assassin enemiga.",
    phases: {
      lane: {
        good: "Denegaste 14 creeps a Lina y le sacaste una ventaja de 1.2k de net worth al minuto 8.",
        error: "Ignoraste las runas de agua del minuto 4 y permitiste que Lina se reabasteciera gratis.",
        change: "Mantener el creep equilibrium cerca de tu río y forzar a Lina bajo torre usando Poison Attack."
      },
      mid: {
        good: "Buen posicionamiento defensivo en la pelea del minuto 15 cerca de tu torre Tier 1 de Mid.",
        error: "Farmear jungla propia en lugar de liderar invasiones con Axe en el triángulo enemigo.",
        change: "Hacer call de smoke con CM y Axe para cazar a la PA enemiga que estaba farmeando sola en bot."
      },
      late: {
        good: "Excelente uso de Viper Strike sobre Tidehunter anulando su combo de Ravage a tiempo.",
        error: "Pelear sin oro de Buyback en el pit de Roshan al minuto 28, lo que entregó el juego.",
        change: "Evitar el pit por completo si el carry aliado no tiene Aegis y tú no tienes Buyback."
      }
    },
    errors: [
      {
        title: "Pelear en Roshan sin oro para Buyback en el minuto 28",
        evidence: "Tu oro disponible era de 420. Moriste por el foco de la PA enemiga y no pudiste regresar a defender.",
        impact: "El enemigo tomó Roshan, Aegis y empujó directamente por el carril central destruyendo dos sets de barracas.",
        fix: "Monitorear el indicador de Buyback por encima de tu oro a partir del minuto 20. Si no está en verde, juega pasivo.",
        practice: "Coloca un recordatorio visual: no cruces el río si Roshan está vivo y no tienes Buyback."
      },
      {
        title: "Falta de invasión y presión activa tras ganar la línea de Mid",
        evidence: "Entre el minuto 10 y 16 gastaste el 60% de tu tiempo en campos de jungla neutrales propios.",
        impact: "PA enemiga recuperó su línea de farm en la jungla de bot sin ninguna presión, logrando su Battle Fury al minuto 15.",
        fix: "Como Viper, tu rol es ocupar la jungla enemiga y forzar al equipo rival a defender sus torres de Tier 1 y Tier 2.",
        practice: "Tira la T1 de Mid e inmediatamente viaja a la safe lane enemiga con un support para tomar control de su jungla."
      },
      {
        title: "Pérdida de control de Runas de Sabiduría al minuto 7 y 14",
        evidence: "Las runas de sabiduría aliadas fueron robadas por el Lion enemigo en ambas ocasiones.",
        impact: "Los supports enemigos alcanzaron el nivel 6 un 20% más rápido que los tuyos, ganando peleas en bot.",
        fix: "Escribe en el chat o pintea a los 6:30 y 13:30 para que tu support pos 4 controle la runa con un TP listo.",
        practice: "Acostúmbrate a mirar el reloj del juego y planificar movimientos 30 segundos antes de los múltiplos de 7."
      }
    ],
    plan: [
      "Día 1-2: Enfócate en creep aggro y denegar creeps en el río de Mid.",
      "Día 3-4: Practica la transición ofensiva tras tirar la torre T1 (mínimo 3 oleadas en jungla enemiga).",
      "Día 5-6: Juega partidas ranked manteniendo siempre el Buyback activo a partir del minuto 22.",
      "Día 7: Revisa el replay de tu propia partida en velocidad 4x enfocándote únicamente en el posicionamiento en peleas."
    ],
    nextSteps: {
      objective: "Mantener el buyback disponible y no farmear en jungla propia tras ganar la línea.",
      metric: "Minutos de presión ofensiva en el mapa y net worth de buyback reservado.",
      question: "¿Logré iniciar la presión en el triángulo enemigo al minuto 12?"
    }
  }
};
