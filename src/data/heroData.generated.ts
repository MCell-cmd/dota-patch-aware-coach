// Auto-generado por scripts/sync-dota-data.mjs desde la API pública de OpenDota.
// NO editar a mano. Re-sincroniza con: node scripts/sync-dota-data.mjs
// Última sync: 2026-06-18
// Fuente: https://api.opendota.com (heroStats, matchups, itemPopularity).

export type Bracket =
  | "herald" | "guardian" | "crusader" | "archon" | "legend" | "ancient" | "divine";

export type HeroData = {
  id: string;
  numericId: number;
  name: string;
  shortName: string;
  primaryAttr: "str" | "agi" | "int" | "all";
  attackType: "Melee" | "Ranged";
  roles: string[];
  /** Winrate global 0-1 (todos los brackets pub). */
  overallWin: number;
  /** Winrate 0-1 por bracket. */
  winByBracket: Record<Bracket, number>;
  /** Partidas (picks) por bracket: señal de popularidad/meta. */
  pickByBracket: Record<Bracket, number>;
  /** Héroes a los que este héroe le gana (winrate real >= 0.52). */
  counters: string[];
  /** Héroes que le ganan a este héroe (winrate real <= 0.48). */
  weakAgainst: string[];
  /** Objetos de inicio reales más comprados. */
  startItems: string[];
  /** Objetos de mid game reales más comprados (primer core). */
  coreItems: string[];
};

export const HERO_DATA: readonly HeroData[] = [
  {
    "id": "abaddon",
    "numericId": 102,
    "name": "Abaddon",
    "shortName": "abaddon",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Support",
      "Carry",
      "Durable"
    ],
    "overallWin": 0.516,
    "winByBracket": {
      "herald": 0.512,
      "guardian": 0.517,
      "crusader": 0.512,
      "archon": 0.517,
      "legend": 0.52,
      "ancient": 0.522,
      "divine": 0.515
    },
    "pickByBracket": {
      "herald": 9433,
      "guardian": 17774,
      "crusader": 19663,
      "archon": 18676,
      "legend": 14253,
      "ancient": 9030,
      "divine": 8641
    },
    "counters": [
      "troll-warlord",
      "legion-commander",
      "sand-king",
      "axe",
      "terrorblade",
      "lion"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "clinkz",
      "underlord",
      "marci",
      "naga-siren",
      "lycan"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Magic Stick",
      "Quelling Blade",
      "Circlet",
      "Magic Wand"
    ],
    "coreItems": [
      "Talisman of Evasion",
      "Sacred Relic",
      "Radiance",
      "Diadem",
      "Blade of Alacrity"
    ]
  },
  {
    "id": "alchemist",
    "numericId": 73,
    "name": "Alchemist",
    "shortName": "alchemist",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Support",
      "Durable",
      "Disabler",
      "Initiator",
      "Nuker"
    ],
    "overallWin": 0.474,
    "winByBracket": {
      "herald": 0.482,
      "guardian": 0.476,
      "crusader": 0.476,
      "archon": 0.477,
      "legend": 0.475,
      "ancient": 0.472,
      "divine": 0.452
    },
    "pickByBracket": {
      "herald": 11572,
      "guardian": 24755,
      "crusader": 28740,
      "archon": 26997,
      "legend": 20157,
      "ancient": 12598,
      "divine": 12043
    },
    "counters": [
      "ring-master",
      "ursa",
      "lifestealer",
      "void-spirit",
      "gyrocopter",
      "sand-king"
    ],
    "weakAgainst": [
      "monkey-king",
      "luna",
      "warlock",
      "storm-spirit",
      "phoenix",
      "puck"
    ],
    "startItems": [
      "Gauntlets of Strength",
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Faerie Fire"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blade of Alacrity",
      "Staff of Wizardry",
      "Point Booster",
      "Aghanim's Scepter"
    ]
  },
  {
    "id": "ancient-apparition",
    "numericId": 68,
    "name": "Ancient Apparition",
    "shortName": "ancient_apparition",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.509,
    "winByBracket": {
      "herald": 0.513,
      "guardian": 0.514,
      "crusader": 0.513,
      "archon": 0.51,
      "legend": 0.508,
      "ancient": 0.502,
      "divine": 0.486
    },
    "pickByBracket": {
      "herald": 18390,
      "guardian": 34576,
      "crusader": 37272,
      "archon": 33449,
      "legend": 24696,
      "ancient": 15443,
      "divine": 14234
    },
    "counters": [
      "kunkka",
      "mars",
      "marci",
      "disruptor",
      "sven",
      "hoodwink"
    ],
    "weakAgainst": [
      "underlord",
      "spirit-breaker",
      "clinkz",
      "largo",
      "tusk",
      "viper"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Sentry Ward",
      "Faerie Fire",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Arcane Boots",
      "Staff of Wizardry",
      "Vitality Booster",
      "Rod of Atos",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "anti-mage",
    "numericId": 1,
    "name": "Anti-Mage",
    "shortName": "antimage",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Nuker"
    ],
    "overallWin": 0.498,
    "winByBracket": {
      "herald": 0.497,
      "guardian": 0.498,
      "crusader": 0.499,
      "archon": 0.501,
      "legend": 0.496,
      "ancient": 0.493,
      "divine": 0.492
    },
    "pickByBracket": {
      "herald": 40723,
      "guardian": 78631,
      "crusader": 78689,
      "archon": 64079,
      "legend": 43574,
      "ancient": 26078,
      "divine": 23916
    },
    "counters": [
      "sven",
      "lich",
      "silencer",
      "dragon-knight",
      "dark-willow",
      "mars"
    ],
    "weakAgainst": [
      "timbersaw",
      "ember-spirit",
      "templar-assassin",
      "shadow-fiend",
      "abaddon",
      "ogre-magi"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Circlet",
      "Magic Stick",
      "Faerie Fire"
    ],
    "coreItems": [
      "Broadsword",
      "Blade of Alacrity",
      "Battle Fury",
      "Yasha",
      "Diadem"
    ]
  },
  {
    "id": "arc-warden",
    "numericId": 113,
    "name": "Arc Warden",
    "shortName": "arc_warden",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Escape",
      "Nuker"
    ],
    "overallWin": 0.506,
    "winByBracket": {
      "herald": 0.479,
      "guardian": 0.504,
      "crusader": 0.508,
      "archon": 0.507,
      "legend": 0.514,
      "ancient": 0.521,
      "divine": 0.521
    },
    "pickByBracket": {
      "herald": 10937,
      "guardian": 20808,
      "crusader": 20176,
      "archon": 15048,
      "legend": 10461,
      "ancient": 6912,
      "divine": 7471
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [
      "Iron Branch",
      "Observer Ward",
      "Circlet",
      "Faerie Fire",
      "Tango",
      "Gloves of Haste"
    ],
    "coreItems": [
      "Maelstrom",
      "Hyperstone",
      "Mjollnir",
      "Mithril Hammer",
      "Blade of Alacrity"
    ]
  },
  {
    "id": "axe",
    "numericId": 2,
    "name": "Axe",
    "shortName": "axe",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Durable",
      "Disabler",
      "Carry"
    ],
    "overallWin": 0.521,
    "winByBracket": {
      "herald": 0.535,
      "guardian": 0.529,
      "crusader": 0.524,
      "archon": 0.52,
      "legend": 0.513,
      "ancient": 0.509,
      "divine": 0.508
    },
    "pickByBracket": {
      "herald": 50781,
      "guardian": 104589,
      "crusader": 115020,
      "archon": 104300,
      "legend": 78530,
      "ancient": 51491,
      "divine": 53672
    },
    "counters": [
      "winter-wyvern",
      "faceless-void",
      "techies",
      "drow-ranger",
      "death-prophet",
      "troll-warlord"
    ],
    "weakAgainst": [
      "bane",
      "naga-siren",
      "lycan",
      "treant-protector",
      "chen",
      "abaddon"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Ring of Protection",
      "Circlet",
      "Quelling Blade"
    ],
    "coreItems": [
      "Blink Dagger",
      "Blade Mail",
      "Broadsword",
      "Ogre Axe",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "bane",
    "numericId": 3,
    "name": "Bane",
    "shortName": "bane",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Disabler",
      "Nuker",
      "Durable"
    ],
    "overallWin": 0.507,
    "winByBracket": {
      "herald": 0.471,
      "guardian": 0.501,
      "crusader": 0.501,
      "archon": 0.512,
      "legend": 0.514,
      "ancient": 0.511,
      "divine": 0.528
    },
    "pickByBracket": {
      "herald": 8179,
      "guardian": 15442,
      "crusader": 17072,
      "archon": 15692,
      "legend": 12329,
      "ancient": 8911,
      "divine": 12226
    },
    "counters": [
      "axe",
      "hoodwink",
      "tiny",
      "sven",
      "bristleback",
      "ember-spirit"
    ],
    "weakAgainst": [
      "monkey-king",
      "dark-willow",
      "skywrath-mage",
      "primal-beast",
      "mars"
    ],
    "startItems": [
      "Iron Branch",
      "Observer and Sentry Wards",
      "Tango",
      "Blood Grenade",
      "Faerie Fire",
      "Smoke of Deceit"
    ],
    "coreItems": [
      "Aether Lens",
      "Arcane Boots",
      "Ogre Axe",
      "Staff of Wizardry",
      "Point Booster"
    ]
  },
  {
    "id": "batrider",
    "numericId": 65,
    "name": "Batrider",
    "shortName": "batrider",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Initiator",
      "Disabler",
      "Escape"
    ],
    "overallWin": 0.438,
    "winByBracket": {
      "herald": 0.446,
      "guardian": 0.432,
      "crusader": 0.424,
      "archon": 0.436,
      "legend": 0.449,
      "ancient": 0.451,
      "divine": 0.44
    },
    "pickByBracket": {
      "herald": 3176,
      "guardian": 6676,
      "crusader": 7513,
      "archon": 6905,
      "legend": 5493,
      "ancient": 4215,
      "divine": 5047
    },
    "counters": [
      "death-prophet",
      "magnus",
      "bristleback",
      "vengeful-spirit",
      "weaver",
      "hoodwink"
    ],
    "weakAgainst": [
      "oracle",
      "naga-siren",
      "templar-assassin",
      "bane",
      "marci",
      "luna"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Circlet",
      "Faerie Fire",
      "Blood Grenade",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Blink Dagger",
      "Ring of Tarrasque",
      "Boots of Bearing",
      "Ogre Axe",
      "Drum of Endurance"
    ]
  },
  {
    "id": "beastmaster",
    "numericId": 38,
    "name": "Beastmaster",
    "shortName": "beastmaster",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Disabler",
      "Durable",
      "Nuker"
    ],
    "overallWin": 0.448,
    "winByBracket": {
      "herald": 0.448,
      "guardian": 0.44,
      "crusader": 0.451,
      "archon": 0.439,
      "legend": 0.445,
      "ancient": 0.457,
      "divine": 0.466
    },
    "pickByBracket": {
      "herald": 9132,
      "guardian": 17614,
      "crusader": 18425,
      "archon": 15258,
      "legend": 10914,
      "ancient": 7341,
      "divine": 8727
    },
    "counters": [
      "chaos-knight",
      "vengeful-spirit",
      "zeus",
      "shadow-shaman",
      "techies",
      "undying"
    ],
    "weakAgainst": [
      "slark",
      "bounty-hunter",
      "batrider",
      "dazzle",
      "pugna",
      "clinkz"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Magic Stick",
      "Sage's Mask",
      "Quelling Blade",
      "Circlet"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blink Dagger",
      "Ultimate Orb",
      "Helm of the Overlord",
      "Blade of Alacrity"
    ]
  },
  {
    "id": "bloodseeker",
    "numericId": 4,
    "name": "Bloodseeker",
    "shortName": "bloodseeker",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Disabler",
      "Nuker",
      "Initiator"
    ],
    "overallWin": 0.52,
    "winByBracket": {
      "herald": 0.52,
      "guardian": 0.521,
      "crusader": 0.52,
      "archon": 0.515,
      "legend": 0.519,
      "ancient": 0.527,
      "divine": 0.515
    },
    "pickByBracket": {
      "herald": 21791,
      "guardian": 28287,
      "crusader": 21631,
      "archon": 15619,
      "legend": 10552,
      "ancient": 6204,
      "divine": 5262
    },
    "counters": [],
    "weakAgainst": [
      "pangolier"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Circlet",
      "Faerie Fire"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Ogre Axe",
      "Maelstrom",
      "Hyperstone",
      "Mjollnir"
    ]
  },
  {
    "id": "bounty-hunter",
    "numericId": 62,
    "name": "Bounty Hunter",
    "shortName": "bounty_hunter",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Escape",
      "Nuker"
    ],
    "overallWin": 0.517,
    "winByBracket": {
      "herald": 0.494,
      "guardian": 0.502,
      "crusader": 0.513,
      "archon": 0.521,
      "legend": 0.523,
      "ancient": 0.532,
      "divine": 0.553
    },
    "pickByBracket": {
      "herald": 16333,
      "guardian": 28076,
      "crusader": 27994,
      "archon": 23926,
      "legend": 18594,
      "ancient": 12307,
      "divine": 15697
    },
    "counters": [
      "dragon-knight",
      "ursa",
      "snapfire",
      "queen-of-pain",
      "timbersaw",
      "beastmaster"
    ],
    "weakAgainst": [
      "storm-spirit",
      "tusk",
      "hoodwink",
      "chen"
    ],
    "startItems": [
      "Observer and Sentry Wards",
      "Iron Branch",
      "Blood Grenade",
      "Tango",
      "Sentry Ward",
      "Boots of Speed"
    ],
    "coreItems": [
      "Drum of Endurance",
      "Ring of Tarrasque",
      "Staff of Wizardry",
      "Diadem",
      "Boots of Bearing"
    ]
  },
  {
    "id": "brewmaster",
    "numericId": 78,
    "name": "Brewmaster",
    "shortName": "brewmaster",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Initiator",
      "Durable",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.514,
    "winByBracket": {
      "herald": 0.505,
      "guardian": 0.504,
      "crusader": 0.507,
      "archon": 0.52,
      "legend": 0.521,
      "ancient": 0.503,
      "divine": 0.529
    },
    "pickByBracket": {
      "herald": 3116,
      "guardian": 5851,
      "crusader": 6667,
      "archon": 6581,
      "legend": 5586,
      "ancient": 4168,
      "divine": 5859
    },
    "counters": [
      "sven",
      "centaur-warrunner",
      "dark-willow",
      "void-spirit",
      "warlock",
      "terrorblade"
    ],
    "weakAgainst": [
      "bristleback",
      "largo",
      "beastmaster",
      "rubick",
      "dawnbreaker",
      "puck"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Tango",
      "Gauntlets of Strength",
      "Magic Stick",
      "Faerie Fire"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blade of Alacrity",
      "Staff of Wizardry",
      "Point Booster",
      "Aghanim's Scepter"
    ]
  },
  {
    "id": "bristleback",
    "numericId": 99,
    "name": "Bristleback",
    "shortName": "bristleback",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Durable",
      "Initiator",
      "Nuker"
    ],
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.534,
      "guardian": 0.506,
      "crusader": 0.485,
      "archon": 0.471,
      "legend": 0.466,
      "ancient": 0.462,
      "divine": 0.45
    },
    "pickByBracket": {
      "herald": 40128,
      "guardian": 59840,
      "crusader": 50433,
      "archon": 37206,
      "legend": 24242,
      "ancient": 14436,
      "divine": 13149
    },
    "counters": [
      "brewmaster",
      "templar-assassin",
      "sand-king",
      "techies",
      "razor",
      "pugna"
    ],
    "weakAgainst": [
      "nyx-assassin",
      "chen",
      "bane",
      "viper",
      "terrorblade",
      "keeper-of-the-light"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Circlet",
      "Magic Stick",
      "Enchanted Mango"
    ],
    "coreItems": [
      "Aghanim's Shard",
      "Ogre Axe",
      "Blade of Alacrity",
      "Sange",
      "Consecrated Wraps"
    ]
  },
  {
    "id": "broodmother",
    "numericId": 61,
    "name": "Broodmother",
    "shortName": "broodmother",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Pusher",
      "Escape",
      "Nuker"
    ],
    "overallWin": 0.495,
    "winByBracket": {
      "herald": 0.489,
      "guardian": 0.493,
      "crusader": 0.496,
      "archon": 0.501,
      "legend": 0.501,
      "ancient": 0.502,
      "divine": 0.487
    },
    "pickByBracket": {
      "herald": 12372,
      "guardian": 18661,
      "crusader": 15548,
      "archon": 10627,
      "legend": 6622,
      "ancient": 3967,
      "divine": 4624
    },
    "counters": [
      "disruptor",
      "tusk",
      "hoodwink",
      "snapfire",
      "rubick"
    ],
    "weakAgainst": [
      "jakiro"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Tango",
      "Quelling Blade",
      "Slippers of Agility",
      "Faerie Fire"
    ],
    "coreItems": [
      "Diadem",
      "Manta Style",
      "Yasha",
      "Blade of Alacrity",
      "Oblivion Staff"
    ]
  },
  {
    "id": "centaur-warrunner",
    "numericId": 96,
    "name": "Centaur Warrunner",
    "shortName": "centaur",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Durable",
      "Initiator",
      "Disabler",
      "Nuker",
      "Escape"
    ],
    "overallWin": 0.507,
    "winByBracket": {
      "herald": 0.514,
      "guardian": 0.513,
      "crusader": 0.513,
      "archon": 0.506,
      "legend": 0.497,
      "ancient": 0.502,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 12177,
      "guardian": 26263,
      "crusader": 30649,
      "archon": 29214,
      "legend": 22098,
      "ancient": 14091,
      "divine": 13691
    },
    "counters": [
      "weaver",
      "medusa",
      "silencer",
      "lich",
      "vengeful-spirit",
      "witch-doctor"
    ],
    "weakAgainst": [
      "treant-protector",
      "brewmaster",
      "bounty-hunter",
      "timbersaw",
      "marci",
      "grimstroke"
    ],
    "startItems": [
      "Gauntlets of Strength",
      "Iron Branch",
      "Ring of Protection",
      "Tango",
      "Circlet",
      "Quelling Blade"
    ],
    "coreItems": [
      "Blink Dagger",
      "Blade Mail",
      "Broadsword",
      "Ring of Tarrasque",
      "Crimson Guard"
    ]
  },
  {
    "id": "chaos-knight",
    "numericId": 81,
    "name": "Chaos Knight",
    "shortName": "chaos_knight",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Disabler",
      "Durable",
      "Pusher",
      "Initiator"
    ],
    "overallWin": 0.509,
    "winByBracket": {
      "herald": 0.52,
      "guardian": 0.521,
      "crusader": 0.495,
      "archon": 0.497,
      "legend": 0.504,
      "ancient": 0.51,
      "divine": 0.523
    },
    "pickByBracket": {
      "herald": 17394,
      "guardian": 26350,
      "crusader": 22450,
      "archon": 16590,
      "legend": 10893,
      "ancient": 6341,
      "divine": 5576
    },
    "counters": [
      "lich",
      "earthshaker",
      "centaur-warrunner",
      "templar-assassin",
      "ursa"
    ],
    "weakAgainst": [
      "beastmaster",
      "jakiro",
      "mars",
      "windranger",
      "invoker",
      "queen-of-pain"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Magic Stick",
      "Gauntlets of Strength",
      "Circlet"
    ],
    "coreItems": [
      "Blitz Knuckles",
      "Armlet of Mordiggian",
      "Oblivion Staff",
      "Claymore",
      "Ogre Axe"
    ]
  },
  {
    "id": "chen",
    "numericId": 66,
    "name": "Chen",
    "shortName": "chen",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Pusher"
    ],
    "overallWin": 0.452,
    "winByBracket": {
      "herald": 0.418,
      "guardian": 0.458,
      "crusader": 0.416,
      "archon": 0.464,
      "legend": 0.467,
      "ancient": 0.465,
      "divine": 0.491
    },
    "pickByBracket": {
      "herald": 1706,
      "guardian": 2609,
      "crusader": 2469,
      "archon": 2254,
      "legend": 1457,
      "ancient": 1163,
      "divine": 1679
    },
    "counters": [
      "dawnbreaker",
      "bristleback",
      "storm-spirit",
      "monkey-king",
      "ring-master",
      "terrorblade"
    ],
    "weakAgainst": [
      "nature-s-prophet"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Sentry Ward",
      "Smoke of Deceit",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Arcane Boots",
      "Mekansm",
      "Drum of Endurance",
      "Guardian Greaves",
      "Pavise"
    ]
  },
  {
    "id": "clinkz",
    "numericId": 56,
    "name": "Clinkz",
    "shortName": "clinkz",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Escape",
      "Pusher"
    ],
    "overallWin": 0.499,
    "winByBracket": {
      "herald": 0.49,
      "guardian": 0.491,
      "crusader": 0.494,
      "archon": 0.502,
      "legend": 0.503,
      "ancient": 0.521,
      "divine": 0.526
    },
    "pickByBracket": {
      "herald": 22892,
      "guardian": 30346,
      "crusader": 25718,
      "archon": 19953,
      "legend": 13601,
      "ancient": 8881,
      "divine": 9785
    },
    "counters": [
      "ancient-apparition",
      "clockwerk",
      "tidehunter",
      "skywrath-mage",
      "abaddon",
      "snapfire"
    ],
    "weakAgainst": [
      "spirit-breaker",
      "pudge",
      "hoodwink",
      "templar-assassin",
      "slardar",
      "razor"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Tango",
      "Magic Wand",
      "Magic Stick",
      "Blades of Attack"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Desolator",
      "Blade of Alacrity",
      "Aghanim's Shard",
      "Dragon Lance"
    ]
  },
  {
    "id": "clockwerk",
    "numericId": 51,
    "name": "Clockwerk",
    "shortName": "rattletrap",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Disabler",
      "Durable",
      "Nuker"
    ],
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.484,
      "guardian": 0.483,
      "crusader": 0.484,
      "archon": 0.483,
      "legend": 0.49,
      "ancient": 0.503,
      "divine": 0.507
    },
    "pickByBracket": {
      "herald": 6946,
      "guardian": 16107,
      "crusader": 20450,
      "archon": 21734,
      "legend": 19630,
      "ancient": 15277,
      "divine": 20225
    },
    "counters": [
      "dark-seer",
      "luna",
      "tidehunter",
      "death-prophet",
      "silencer",
      "witch-doctor"
    ],
    "weakAgainst": [
      "venomancer",
      "clinkz",
      "monkey-king",
      "beastmaster",
      "enchantress",
      "abaddon"
    ],
    "startItems": [
      "Observer and Sentry Wards",
      "Iron Branch",
      "Blood Grenade",
      "Tango",
      "Sentry Ward",
      "Boots of Speed"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Essence Distiller",
      "Blink Dagger",
      "Eul's Scepter of Divinity",
      "Force Staff"
    ]
  },
  {
    "id": "crystal-maiden",
    "numericId": 5,
    "name": "Crystal Maiden",
    "shortName": "crystal_maiden",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.514,
    "winByBracket": {
      "herald": 0.535,
      "guardian": 0.523,
      "crusader": 0.513,
      "archon": 0.506,
      "legend": 0.508,
      "ancient": 0.5,
      "divine": 0.494
    },
    "pickByBracket": {
      "herald": 41836,
      "guardian": 72061,
      "crusader": 70869,
      "archon": 60133,
      "legend": 43490,
      "ancient": 27566,
      "divine": 26350
    },
    "counters": [
      "drow-ranger",
      "sniper",
      "pugna",
      "storm-spirit",
      "chaos-knight",
      "anti-mage"
    ],
    "weakAgainst": [
      "razor",
      "mirana",
      "batrider",
      "puck",
      "keeper-of-the-light",
      "weaver"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer and Sentry Wards",
      "Blood Grenade",
      "Enchanted Mango",
      "Magic Stick"
    ],
    "coreItems": [
      "Aghanim's Shard",
      "Blink Dagger",
      "Glimmer Cape",
      "Staff of Wizardry",
      "Drum of Endurance"
    ]
  },
  {
    "id": "dark-seer",
    "numericId": 55,
    "name": "Dark Seer",
    "shortName": "dark_seer",
    "primaryAttr": "int",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Escape",
      "Disabler"
    ],
    "overallWin": 0.496,
    "winByBracket": {
      "herald": 0.483,
      "guardian": 0.492,
      "crusader": 0.484,
      "archon": 0.494,
      "legend": 0.506,
      "ancient": 0.496,
      "divine": 0.514
    },
    "pickByBracket": {
      "herald": 5740,
      "guardian": 10981,
      "crusader": 11462,
      "archon": 10443,
      "legend": 8877,
      "ancient": 6434,
      "divine": 8654
    },
    "counters": [
      "queen-of-pain",
      "puck",
      "tusk",
      "undying",
      "silencer",
      "pangolier"
    ],
    "weakAgainst": [
      "phoenix",
      "clockwerk",
      "templar-assassin",
      "ember-spirit",
      "marci",
      "snapfire"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Circlet",
      "Magic Stick",
      "Gauntlets of Strength",
      "Clarity"
    ],
    "coreItems": [
      "Guardian Greaves",
      "Mekansm",
      "Blink Dagger",
      "Platemail",
      "Vitality Booster"
    ]
  },
  {
    "id": "dark-willow",
    "numericId": 119,
    "name": "Dark Willow",
    "shortName": "dark_willow",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Disabler",
      "Escape"
    ],
    "overallWin": 0.483,
    "winByBracket": {
      "herald": 0.471,
      "guardian": 0.479,
      "crusader": 0.477,
      "archon": 0.481,
      "legend": 0.49,
      "ancient": 0.491,
      "divine": 0.499
    },
    "pickByBracket": {
      "herald": 12460,
      "guardian": 21247,
      "crusader": 21680,
      "archon": 19677,
      "legend": 16042,
      "ancient": 11246,
      "divine": 13095
    },
    "counters": [
      "weaver",
      "witch-doctor",
      "luna",
      "bane",
      "jakiro",
      "storm-spirit"
    ],
    "weakAgainst": [
      "treant-protector",
      "brewmaster",
      "ring-master",
      "terrorblade",
      "phantom-lancer",
      "night-stalker"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Sentry Ward",
      "Faerie Fire"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Eul's Scepter of Divinity",
      "Blink Dagger",
      "Arcane Boots",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "dawnbreaker",
    "numericId": 135,
    "name": "Dawnbreaker",
    "shortName": "dawnbreaker",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Durable"
    ],
    "overallWin": 0.517,
    "winByBracket": {
      "herald": 0.507,
      "guardian": 0.514,
      "crusader": 0.517,
      "archon": 0.518,
      "legend": 0.521,
      "ancient": 0.517,
      "divine": 0.515
    },
    "pickByBracket": {
      "herald": 15322,
      "guardian": 35414,
      "crusader": 46455,
      "archon": 48546,
      "legend": 42463,
      "ancient": 31084,
      "divine": 36979
    },
    "counters": [
      "tinker",
      "outworld-devourer",
      "phantom-lancer",
      "vengeful-spirit",
      "medusa",
      "death-prophet"
    ],
    "weakAgainst": [
      "chen",
      "treant-protector",
      "kez",
      "bane",
      "venomancer",
      "alchemist"
    ],
    "startItems": [
      "Gauntlets of Strength",
      "Iron Branch",
      "Tango",
      "Circlet",
      "Quelling Blade",
      "Magic Stick"
    ],
    "coreItems": [
      "Ogre Axe",
      "Broadsword",
      "Echo Sabre",
      "Aghanim's Shard",
      "Mithril Hammer"
    ]
  },
  {
    "id": "dazzle",
    "numericId": 50,
    "name": "Dazzle",
    "shortName": "dazzle",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.508,
    "winByBracket": {
      "herald": 0.488,
      "guardian": 0.501,
      "crusader": 0.505,
      "archon": 0.511,
      "legend": 0.515,
      "ancient": 0.526,
      "divine": 0.524
    },
    "pickByBracket": {
      "herald": 12239,
      "guardian": 24676,
      "crusader": 26379,
      "archon": 22035,
      "legend": 14933,
      "ancient": 9136,
      "divine": 8918
    },
    "counters": [
      "magnus",
      "skywrath-mage",
      "morphling",
      "warlock",
      "underlord",
      "beastmaster"
    ],
    "weakAgainst": [
      "pugna",
      "slardar",
      "void-spirit",
      "doom",
      "monkey-king",
      "shadow-demon"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Magic Stick",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Holy Locket",
      "Mekansm",
      "Glimmer Cape",
      "Staff of Wizardry"
    ]
  },
  {
    "id": "death-prophet",
    "numericId": 43,
    "name": "Death Prophet",
    "shortName": "death_prophet",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Pusher",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.474,
    "winByBracket": {
      "herald": 0.473,
      "guardian": 0.47,
      "crusader": 0.471,
      "archon": 0.479,
      "legend": 0.47,
      "ancient": 0.474,
      "divine": 0.483
    },
    "pickByBracket": {
      "herald": 15625,
      "guardian": 22823,
      "crusader": 22602,
      "archon": 20205,
      "legend": 15668,
      "ancient": 10483,
      "divine": 12055
    },
    "counters": [
      "viper",
      "shadow-demon",
      "slardar",
      "shadow-shaman",
      "zeus",
      "lifestealer"
    ],
    "weakAgainst": [
      "terrorblade",
      "batrider",
      "monkey-king",
      "clockwerk",
      "tiny",
      "marci"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Circlet",
      "Observer Ward",
      "Magic Stick"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Ogre Axe",
      "Vitality Booster",
      "Blade of Alacrity",
      "Kaya"
    ]
  },
  {
    "id": "disruptor",
    "numericId": 87,
    "name": "Disruptor",
    "shortName": "disruptor",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Disabler",
      "Nuker",
      "Initiator"
    ],
    "overallWin": 0.5,
    "winByBracket": {
      "herald": 0.489,
      "guardian": 0.49,
      "crusader": 0.5,
      "archon": 0.5,
      "legend": 0.503,
      "ancient": 0.507,
      "divine": 0.508
    },
    "pickByBracket": {
      "herald": 11989,
      "guardian": 29347,
      "crusader": 37635,
      "archon": 38550,
      "legend": 32219,
      "ancient": 22884,
      "divine": 26195
    },
    "counters": [
      "outworld-devourer",
      "phantom-assassin",
      "chaos-knight",
      "phantom-lancer",
      "muerta",
      "sven"
    ],
    "weakAgainst": [
      "broodmother",
      "kez",
      "chen",
      "drow-ranger",
      "io",
      "enchantress"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Sentry Ward",
      "Observer and Sentry Wards",
      "Magic Stick"
    ],
    "coreItems": [
      "Arcane Boots",
      "Blink Dagger",
      "Staff of Wizardry",
      "Point Booster",
      "Glimmer Cape"
    ]
  },
  {
    "id": "doom",
    "numericId": 69,
    "name": "Doom",
    "shortName": "doom_bringer",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Disabler",
      "Initiator",
      "Durable",
      "Nuker"
    ],
    "overallWin": 0.473,
    "winByBracket": {
      "herald": 0.462,
      "guardian": 0.456,
      "crusader": 0.463,
      "archon": 0.469,
      "legend": 0.477,
      "ancient": 0.488,
      "divine": 0.498
    },
    "pickByBracket": {
      "herald": 10807,
      "guardian": 23042,
      "crusader": 28472,
      "archon": 28689,
      "legend": 24205,
      "ancient": 17878,
      "divine": 23398
    },
    "counters": [
      "sven",
      "morphling",
      "lifestealer",
      "weaver",
      "chaos-knight",
      "sand-king"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "nature-s-prophet",
      "bane",
      "magnus",
      "undying",
      "leshrac"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Circlet",
      "Tango",
      "Magic Stick",
      "Quelling Blade"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blink Dagger",
      "Mithril Hammer",
      "Sacred Relic",
      "Radiance"
    ]
  },
  {
    "id": "dragon-knight",
    "numericId": 49,
    "name": "Dragon Knight",
    "shortName": "dragon_knight",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Pusher",
      "Durable",
      "Disabler",
      "Initiator",
      "Nuker"
    ],
    "overallWin": 0.49,
    "winByBracket": {
      "herald": 0.497,
      "guardian": 0.493,
      "crusader": 0.488,
      "archon": 0.492,
      "legend": 0.491,
      "ancient": 0.478,
      "divine": 0.47
    },
    "pickByBracket": {
      "herald": 15736,
      "guardian": 26324,
      "crusader": 25145,
      "archon": 19682,
      "legend": 12946,
      "ancient": 7096,
      "divine": 5641
    },
    "counters": [
      "drow-ranger",
      "phantom-lancer",
      "morphling",
      "troll-warlord",
      "legion-commander",
      "pangolier"
    ],
    "weakAgainst": [
      "bounty-hunter",
      "venomancer",
      "treant-protector",
      "clinkz",
      "largo",
      "keeper-of-the-light"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Gauntlets of Strength",
      "Tango",
      "Circlet",
      "Magic Stick"
    ],
    "coreItems": [
      "Claymore",
      "Blink Dagger",
      "Mithril Hammer",
      "Mask of Madness",
      "Crystalys"
    ]
  },
  {
    "id": "drow-ranger",
    "numericId": 6,
    "name": "Drow Ranger",
    "shortName": "drow_ranger",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Disabler",
      "Pusher"
    ],
    "overallWin": 0.509,
    "winByBracket": {
      "herald": 0.501,
      "guardian": 0.505,
      "crusader": 0.508,
      "archon": 0.509,
      "legend": 0.512,
      "ancient": 0.517,
      "divine": 0.513
    },
    "pickByBracket": {
      "herald": 49105,
      "guardian": 88875,
      "crusader": 94532,
      "archon": 85371,
      "legend": 66215,
      "ancient": 44635,
      "divine": 48416
    },
    "counters": [
      "kez",
      "disruptor",
      "underlord",
      "tidehunter",
      "necrophos",
      "lich"
    ],
    "weakAgainst": [
      "crystal-maiden",
      "dragon-knight",
      "warlock",
      "treant-protector",
      "mars",
      "beastmaster"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Magic Wand",
      "Tango",
      "Circlet",
      "Slippers of Agility"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Staff of Wizardry",
      "Yasha",
      "Dragon Lance",
      "Diadem"
    ]
  },
  {
    "id": "earth-spirit",
    "numericId": 107,
    "name": "Earth Spirit",
    "shortName": "earth_spirit",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Nuker",
      "Escape",
      "Disabler",
      "Initiator",
      "Durable"
    ],
    "overallWin": 0.51,
    "winByBracket": {
      "herald": 0.48,
      "guardian": 0.487,
      "crusader": 0.498,
      "archon": 0.513,
      "legend": 0.516,
      "ancient": 0.524,
      "divine": 0.527
    },
    "pickByBracket": {
      "herald": 5508,
      "guardian": 13633,
      "crusader": 17970,
      "archon": 18894,
      "legend": 17499,
      "ancient": 13458,
      "divine": 18326
    },
    "counters": [
      "slardar",
      "pudge",
      "lion",
      "queen-of-pain",
      "rubick",
      "jakiro"
    ],
    "weakAgainst": [
      "ember-spirit",
      "ring-master",
      "gyrocopter",
      "pangolier",
      "snapfire",
      "storm-spirit"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Faerie Fire",
      "Blood Grenade",
      "Circlet"
    ],
    "coreItems": [
      "Spirit Vessel",
      "Ogre Axe",
      "Diadem",
      "Staff of Wizardry",
      "Mithril Hammer"
    ]
  },
  {
    "id": "earthshaker",
    "numericId": 7,
    "name": "Earthshaker",
    "shortName": "earthshaker",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Support",
      "Initiator",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.502,
    "winByBracket": {
      "herald": 0.5,
      "guardian": 0.496,
      "crusader": 0.499,
      "archon": 0.504,
      "legend": 0.503,
      "ancient": 0.509,
      "divine": 0.515
    },
    "pickByBracket": {
      "herald": 36090,
      "guardian": 67041,
      "crusader": 72767,
      "archon": 64783,
      "legend": 49304,
      "ancient": 32115,
      "divine": 32244
    },
    "counters": [
      "wraith-king",
      "primal-beast",
      "sven",
      "sniper",
      "undying",
      "axe"
    ],
    "weakAgainst": [
      "monkey-king",
      "huskar",
      "chaos-knight",
      "bane",
      "spirit-breaker",
      "void-spirit"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Gauntlets of Strength",
      "Circlet",
      "Observer and Sentry Wards",
      "Observer Ward"
    ],
    "coreItems": [
      "Blink Dagger",
      "Staff of Wizardry",
      "Blade of Alacrity",
      "Aghanim's Shard",
      "Ogre Axe"
    ]
  },
  {
    "id": "elder-titan",
    "numericId": 103,
    "name": "Elder Titan",
    "shortName": "elder_titan",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Disabler",
      "Nuker",
      "Durable"
    ],
    "overallWin": 0.506,
    "winByBracket": {
      "herald": 0.478,
      "guardian": 0.489,
      "crusader": 0.507,
      "archon": 0.511,
      "legend": 0.523,
      "ancient": 0.518,
      "divine": 0.53
    },
    "pickByBracket": {
      "herald": 3018,
      "guardian": 5072,
      "crusader": 5198,
      "archon": 4270,
      "legend": 3085,
      "ancient": 2180,
      "divine": 3025
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Wind Lace",
      "Smoke of Deceit"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Ogre Axe",
      "Drum of Endurance",
      "Point Booster",
      "Pavise"
    ]
  },
  {
    "id": "ember-spirit",
    "numericId": 106,
    "name": "Ember Spirit",
    "shortName": "ember_spirit",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Nuker",
      "Disabler",
      "Initiator"
    ],
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.459,
      "guardian": 0.475,
      "crusader": 0.483,
      "archon": 0.488,
      "legend": 0.498,
      "ancient": 0.507,
      "divine": 0.509
    },
    "pickByBracket": {
      "herald": 10726,
      "guardian": 23793,
      "crusader": 30701,
      "archon": 32003,
      "legend": 28162,
      "ancient": 21422,
      "divine": 26947
    },
    "counters": [
      "witch-doctor",
      "venomancer",
      "sniper",
      "anti-mage",
      "earth-spirit",
      "dark-seer"
    ],
    "weakAgainst": [
      "bane",
      "io",
      "treant-protector",
      "clinkz",
      "puck",
      "lycan"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Faerie Fire",
      "Quelling Blade",
      "Circlet"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Mage Slayer",
      "Ogre Axe",
      "Perseverance",
      "Spirit Vessel"
    ]
  },
  {
    "id": "enchantress",
    "numericId": 58,
    "name": "Enchantress",
    "shortName": "enchantress",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Pusher",
      "Durable",
      "Disabler"
    ],
    "overallWin": 0.481,
    "winByBracket": {
      "herald": 0.482,
      "guardian": 0.483,
      "crusader": 0.48,
      "archon": 0.478,
      "legend": 0.484,
      "ancient": 0.473,
      "divine": 0.487
    },
    "pickByBracket": {
      "herald": 11941,
      "guardian": 15042,
      "crusader": 12657,
      "archon": 10043,
      "legend": 7271,
      "ancient": 4753,
      "divine": 6190
    },
    "counters": [
      "disruptor",
      "ursa",
      "earthshaker",
      "terrorblade",
      "underlord",
      "dark-willow"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "marci",
      "slardar",
      "juggernaut",
      "bane",
      "doom"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Tango",
      "Observer and Sentry Wards",
      "Blood Grenade",
      "Smoke of Deceit"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Drum of Endurance",
      "Blade of Alacrity",
      "Power Treads",
      "Ogre Axe"
    ]
  },
  {
    "id": "enigma",
    "numericId": 33,
    "name": "Enigma",
    "shortName": "enigma",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Disabler",
      "Initiator",
      "Pusher"
    ],
    "overallWin": 0.502,
    "winByBracket": {
      "herald": 0.473,
      "guardian": 0.495,
      "crusader": 0.495,
      "archon": 0.5,
      "legend": 0.508,
      "ancient": 0.527,
      "divine": 0.545
    },
    "pickByBracket": {
      "herald": 10832,
      "guardian": 19996,
      "crusader": 19973,
      "archon": 16282,
      "legend": 11103,
      "ancient": 7188,
      "divine": 8185
    },
    "counters": [
      "ursa",
      "windranger",
      "tiny",
      "shadow-fiend",
      "disruptor",
      "jakiro"
    ],
    "weakAgainst": [
      "pudge",
      "queen-of-pain",
      "centaur-warrunner",
      "rubick",
      "snapfire",
      "tusk"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Magic Stick",
      "Circlet",
      "Magic Wand"
    ],
    "coreItems": [
      "Blink Dagger",
      "Ogre Axe",
      "Mithril Hammer",
      "Aghanim's Shard",
      "Ring of Tarrasque"
    ]
  },
  {
    "id": "faceless-void",
    "numericId": 41,
    "name": "Faceless Void",
    "shortName": "faceless_void",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Initiator",
      "Disabler",
      "Escape",
      "Durable"
    ],
    "overallWin": 0.496,
    "winByBracket": {
      "herald": 0.497,
      "guardian": 0.489,
      "crusader": 0.491,
      "archon": 0.496,
      "legend": 0.5,
      "ancient": 0.51,
      "divine": 0.504
    },
    "pickByBracket": {
      "herald": 33445,
      "guardian": 66729,
      "crusader": 73065,
      "archon": 66531,
      "legend": 51423,
      "ancient": 34021,
      "divine": 36664
    },
    "counters": [
      "templar-assassin",
      "dragon-knight",
      "dawnbreaker",
      "abaddon",
      "storm-spirit",
      "silencer"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "muerta",
      "sniper",
      "tidehunter",
      "juggernaut",
      "axe"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Circlet",
      "Faerie Fire"
    ],
    "coreItems": [
      "Broadsword",
      "Blade of Alacrity",
      "Battle Fury",
      "Yasha",
      "Diadem"
    ]
  },
  {
    "id": "grimstroke",
    "numericId": 121,
    "name": "Grimstroke",
    "shortName": "grimstroke",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Disabler",
      "Escape"
    ],
    "overallWin": 0.521,
    "winByBracket": {
      "herald": 0.512,
      "guardian": 0.511,
      "crusader": 0.517,
      "archon": 0.529,
      "legend": 0.525,
      "ancient": 0.526,
      "divine": 0.521
    },
    "pickByBracket": {
      "herald": 12310,
      "guardian": 26349,
      "crusader": 32228,
      "archon": 31499,
      "legend": 25112,
      "ancient": 17874,
      "divine": 20909
    },
    "counters": [
      "muerta",
      "leshrac",
      "templar-assassin",
      "necrophos",
      "ring-master",
      "tidehunter"
    ],
    "weakAgainst": [
      "sniper",
      "monkey-king",
      "techies",
      "snapfire",
      "lifestealer",
      "batrider"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer and Sentry Wards",
      "Blood Grenade",
      "Magic Stick",
      "Faerie Fire"
    ],
    "coreItems": [
      "Arcane Boots",
      "Blink Dagger",
      "Glimmer Cape",
      "Staff of Wizardry",
      "Aether Lens"
    ]
  },
  {
    "id": "gyrocopter",
    "numericId": 72,
    "name": "Gyrocopter",
    "shortName": "gyrocopter",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.425,
    "winByBracket": {
      "herald": 0.426,
      "guardian": 0.421,
      "crusader": 0.422,
      "archon": 0.423,
      "legend": 0.436,
      "ancient": 0.423,
      "divine": 0.424
    },
    "pickByBracket": {
      "herald": 7021,
      "guardian": 12719,
      "crusader": 14878,
      "archon": 14355,
      "legend": 10929,
      "ancient": 6693,
      "divine": 6102
    },
    "counters": [
      "templar-assassin",
      "techies",
      "lion",
      "earth-spirit",
      "troll-warlord",
      "sven"
    ],
    "weakAgainst": [
      "treant-protector",
      "nyx-assassin",
      "witch-doctor",
      "alchemist",
      "naga-siren",
      "bane"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Tango",
      "Magic Wand",
      "Magic Stick",
      "Quelling Blade"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blade of Alacrity",
      "Claymore",
      "Staff of Wizardry",
      "Point Booster"
    ]
  },
  {
    "id": "hoodwink",
    "numericId": 123,
    "name": "Hoodwink",
    "shortName": "hoodwink",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Escape",
      "Disabler"
    ],
    "overallWin": 0.482,
    "winByBracket": {
      "herald": 0.473,
      "guardian": 0.48,
      "crusader": 0.481,
      "archon": 0.486,
      "legend": 0.485,
      "ancient": 0.478,
      "divine": 0.485
    },
    "pickByBracket": {
      "herald": 27810,
      "guardian": 52738,
      "crusader": 58415,
      "archon": 53786,
      "legend": 42288,
      "ancient": 29582,
      "divine": 33620
    },
    "counters": [
      "phantom-lancer",
      "death-prophet",
      "underlord",
      "huskar",
      "clinkz",
      "silencer"
    ],
    "weakAgainst": [
      "naga-siren",
      "bane",
      "keeper-of-the-light",
      "lone-druid",
      "kunkka",
      "broodmother"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Faerie Fire",
      "Sentry Ward",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Arcane Boots",
      "Staff of Wizardry",
      "Essence Distiller",
      "Aghanim's Shard",
      "Vitality Booster"
    ]
  },
  {
    "id": "huskar",
    "numericId": 59,
    "name": "Huskar",
    "shortName": "huskar",
    "primaryAttr": "str",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Durable",
      "Initiator"
    ],
    "overallWin": 0.45,
    "winByBracket": {
      "herald": 0.445,
      "guardian": 0.444,
      "crusader": 0.444,
      "archon": 0.452,
      "legend": 0.461,
      "ancient": 0.457,
      "divine": 0.462
    },
    "pickByBracket": {
      "herald": 21037,
      "guardian": 28873,
      "crusader": 26712,
      "archon": 22285,
      "legend": 15938,
      "ancient": 10514,
      "divine": 12170
    },
    "counters": [
      "silencer",
      "earthshaker",
      "storm-spirit",
      "spirit-breaker",
      "templar-assassin",
      "tidehunter"
    ],
    "weakAgainst": [
      "nature-s-prophet",
      "hoodwink",
      "shadow-shaman",
      "beastmaster",
      "marci",
      "rubick"
    ],
    "startItems": [
      "Gauntlets of Strength",
      "Faerie Fire",
      "Iron Branch",
      "Observer Ward",
      "Tango",
      "Magic Stick"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blade of Alacrity",
      "Blink Dagger",
      "Mithril Hammer",
      "Sange"
    ]
  },
  {
    "id": "invoker",
    "numericId": 74,
    "name": "Invoker",
    "shortName": "invoker",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker",
      "Disabler",
      "Escape",
      "Pusher"
    ],
    "overallWin": 0.505,
    "winByBracket": {
      "herald": 0.494,
      "guardian": 0.497,
      "crusader": 0.504,
      "archon": 0.503,
      "legend": 0.509,
      "ancient": 0.514,
      "divine": 0.519
    },
    "pickByBracket": {
      "herald": 38742,
      "guardian": 88895,
      "crusader": 106425,
      "archon": 101007,
      "legend": 79215,
      "ancient": 54063,
      "divine": 59538
    },
    "counters": [
      "lina",
      "weaver",
      "troll-warlord",
      "lich",
      "chaos-knight",
      "magnus"
    ],
    "weakAgainst": [
      "treant-protector",
      "nyx-assassin",
      "tinker",
      "oracle",
      "naga-siren",
      "lycan"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Observer Ward",
      "Faerie Fire",
      "Mantle of Intelligence",
      "Tango"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Boots of Travel",
      "Point Booster",
      "Ogre Axe",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "io",
    "numericId": 91,
    "name": "Io",
    "shortName": "wisp",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Escape",
      "Nuker"
    ],
    "overallWin": 0.499,
    "winByBracket": {
      "herald": 0.49,
      "guardian": 0.498,
      "crusader": 0.499,
      "archon": 0.495,
      "legend": 0.501,
      "ancient": 0.511,
      "divine": 0.509
    },
    "pickByBracket": {
      "herald": 9850,
      "guardian": 18901,
      "crusader": 19160,
      "archon": 15625,
      "legend": 11882,
      "ancient": 8220,
      "divine": 10345
    },
    "counters": [
      "ember-spirit",
      "disruptor",
      "snapfire",
      "jakiro",
      "shadow-fiend",
      "hoodwink"
    ],
    "weakAgainst": [
      "pudge",
      "rubick",
      "lion",
      "axe"
    ],
    "startItems": [
      "Tango",
      "Iron Branch",
      "Ring of Regen",
      "Blood Grenade",
      "Headdress",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Mekansm",
      "Holy Locket",
      "Ogre Axe",
      "Point Booster",
      "Aghanim's Scepter"
    ]
  },
  {
    "id": "jakiro",
    "numericId": 64,
    "name": "Jakiro",
    "shortName": "jakiro",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Pusher",
      "Disabler"
    ],
    "overallWin": 0.473,
    "winByBracket": {
      "herald": 0.491,
      "guardian": 0.48,
      "crusader": 0.474,
      "archon": 0.469,
      "legend": 0.468,
      "ancient": 0.465,
      "divine": 0.463
    },
    "pickByBracket": {
      "herald": 19384,
      "guardian": 41030,
      "crusader": 47950,
      "archon": 43965,
      "legend": 31516,
      "ancient": 19628,
      "divine": 16449
    },
    "counters": [
      "chaos-knight",
      "omniknight",
      "tinker",
      "broodmother",
      "weaver",
      "anti-mage"
    ],
    "weakAgainst": [
      "treant-protector",
      "io",
      "lone-druid",
      "clinkz",
      "naga-siren",
      "bounty-hunter"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer and Sentry Wards",
      "Blood Grenade",
      "Magic Stick",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Staff of Wizardry",
      "Glimmer Cape",
      "Eul's Scepter of Divinity",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "juggernaut",
    "numericId": 8,
    "name": "Juggernaut",
    "shortName": "juggernaut",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Pusher",
      "Escape"
    ],
    "overallWin": 0.518,
    "winByBracket": {
      "herald": 0.51,
      "guardian": 0.515,
      "crusader": 0.52,
      "archon": 0.519,
      "legend": 0.522,
      "ancient": 0.522,
      "divine": 0.515
    },
    "pickByBracket": {
      "herald": 45296,
      "guardian": 85915,
      "crusader": 92428,
      "archon": 80969,
      "legend": 60515,
      "ancient": 37738,
      "divine": 35984
    },
    "counters": [
      "zeus",
      "pangolier",
      "techies",
      "phoenix",
      "faceless-void",
      "magnus"
    ],
    "weakAgainst": [
      "abaddon",
      "nyx-assassin",
      "venomancer",
      "sniper",
      "kez",
      "snapfire"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Faerie Fire",
      "Circlet"
    ],
    "coreItems": [
      "Broadsword",
      "Blade of Alacrity",
      "Yasha",
      "Battle Fury",
      "Diadem"
    ]
  },
  {
    "id": "keeper-of-the-light",
    "numericId": 90,
    "name": "Keeper of the Light",
    "shortName": "keeper_of_the_light",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.512,
    "winByBracket": {
      "herald": 0.486,
      "guardian": 0.502,
      "crusader": 0.508,
      "archon": 0.514,
      "legend": 0.52,
      "ancient": 0.524,
      "divine": 0.536
    },
    "pickByBracket": {
      "herald": 15013,
      "guardian": 28218,
      "crusader": 29934,
      "archon": 25708,
      "legend": 19745,
      "ancient": 13997,
      "divine": 19772
    },
    "counters": [
      "warlock",
      "enchantress",
      "spirit-breaker",
      "hoodwink",
      "bristleback",
      "queen-of-pain"
    ],
    "weakAgainst": [
      "treant-protector",
      "batrider",
      "viper",
      "monkey-king",
      "slardar",
      "primal-beast"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Circlet",
      "Blood Grenade",
      "Observer Ward"
    ],
    "coreItems": [
      "Holy Locket",
      "Point Booster",
      "Staff of Wizardry",
      "Boots of Travel",
      "Vitality Booster"
    ]
  },
  {
    "id": "kez",
    "numericId": 145,
    "name": "Kez",
    "shortName": "kez",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Disabler"
    ],
    "overallWin": 0.445,
    "winByBracket": {
      "herald": 0.448,
      "guardian": 0.455,
      "crusader": 0.447,
      "archon": 0.447,
      "legend": 0.442,
      "ancient": 0.435,
      "divine": 0.437
    },
    "pickByBracket": {
      "herald": 11763,
      "guardian": 21907,
      "crusader": 25845,
      "archon": 25565,
      "legend": 22056,
      "ancient": 16310,
      "divine": 20311
    },
    "counters": [
      "lifestealer",
      "disruptor",
      "dawnbreaker",
      "lich",
      "silencer",
      "tiny"
    ],
    "weakAgainst": [
      "drow-ranger",
      "treant-protector",
      "largo",
      "windranger",
      "batrider",
      "razor"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Magic Wand",
      "Tango",
      "Circlet",
      "Quelling Blade"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Blade of Alacrity",
      "Mage Slayer",
      "Desolator",
      "Ogre Axe"
    ]
  },
  {
    "id": "kunkka",
    "numericId": 23,
    "name": "Kunkka",
    "shortName": "kunkka",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Support",
      "Disabler",
      "Initiator",
      "Durable",
      "Nuker"
    ],
    "overallWin": 0.493,
    "winByBracket": {
      "herald": 0.493,
      "guardian": 0.486,
      "crusader": 0.489,
      "archon": 0.495,
      "legend": 0.5,
      "ancient": 0.499,
      "divine": 0.493
    },
    "pickByBracket": {
      "herald": 13102,
      "guardian": 24496,
      "crusader": 27159,
      "archon": 24889,
      "legend": 19844,
      "ancient": 13174,
      "divine": 13567
    },
    "counters": [
      "sven",
      "weaver",
      "bristleback",
      "hoodwink",
      "morphling",
      "skywrath-mage"
    ],
    "weakAgainst": [
      "ancient-apparition",
      "terrorblade",
      "monkey-king",
      "templar-assassin",
      "phoenix",
      "shadow-demon"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Circlet",
      "Quelling Blade",
      "Observer Ward"
    ],
    "coreItems": [
      "Ogre Axe",
      "Point Booster",
      "Blade of Alacrity",
      "Claymore",
      "Staff of Wizardry"
    ]
  },
  {
    "id": "largo",
    "numericId": 155,
    "name": "Largo",
    "shortName": "largo",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Durable",
      "Disabler",
      "Support"
    ],
    "overallWin": 0.482,
    "winByBracket": {
      "herald": 0.453,
      "guardian": 0.481,
      "crusader": 0.47,
      "archon": 0.482,
      "legend": 0.487,
      "ancient": 0.488,
      "divine": 0.506
    },
    "pickByBracket": {
      "herald": 3682,
      "guardian": 7289,
      "crusader": 8671,
      "archon": 8793,
      "legend": 7454,
      "ancient": 5297,
      "divine": 6716
    },
    "counters": [
      "queen-of-pain",
      "primal-beast",
      "pangolier",
      "pudge",
      "timbersaw",
      "ancient-apparition"
    ],
    "weakAgainst": [
      "sniper",
      "axe",
      "beastmaster",
      "treant-protector",
      "shadow-demon",
      "batrider"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Magic Stick",
      "Faerie Fire",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Ogre Axe",
      "Staff of Wizardry",
      "Kaya",
      "Sange",
      "Kaya and Sange"
    ]
  },
  {
    "id": "legion-commander",
    "numericId": 104,
    "name": "Legion Commander",
    "shortName": "legion_commander",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Disabler",
      "Initiator",
      "Durable",
      "Nuker"
    ],
    "overallWin": 0.526,
    "winByBracket": {
      "herald": 0.525,
      "guardian": 0.529,
      "crusader": 0.528,
      "archon": 0.527,
      "legend": 0.526,
      "ancient": 0.517,
      "divine": 0.518
    },
    "pickByBracket": {
      "herald": 41837,
      "guardian": 87343,
      "crusader": 92506,
      "archon": 79245,
      "legend": 56454,
      "ancient": 34075,
      "divine": 31333
    },
    "counters": [
      "venomancer",
      "luna",
      "medusa",
      "bristleback",
      "shadow-shaman",
      "doom"
    ],
    "weakAgainst": [
      "storm-spirit",
      "tusk",
      "abaddon",
      "slardar",
      "juggernaut",
      "phoenix"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Quelling Blade",
      "Circlet",
      "Magic Stick"
    ],
    "coreItems": [
      "Blink Dagger",
      "Blade Mail",
      "Broadsword",
      "Ogre Axe",
      "Mithril Hammer"
    ]
  },
  {
    "id": "leshrac",
    "numericId": 52,
    "name": "Leshrac",
    "shortName": "leshrac",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Support",
      "Nuker",
      "Pusher",
      "Disabler"
    ],
    "overallWin": 0.501,
    "winByBracket": {
      "herald": 0.495,
      "guardian": 0.493,
      "crusader": 0.498,
      "archon": 0.498,
      "legend": 0.505,
      "ancient": 0.502,
      "divine": 0.518
    },
    "pickByBracket": {
      "herald": 5545,
      "guardian": 9953,
      "crusader": 10190,
      "archon": 9006,
      "legend": 7072,
      "ancient": 5206,
      "divine": 6427
    },
    "counters": [
      "muerta",
      "silencer",
      "slark",
      "lina",
      "lycan",
      "doom"
    ],
    "weakAgainst": [
      "grimstroke",
      "bane",
      "naga-siren",
      "chen",
      "dawnbreaker",
      "abaddon"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Observer Ward",
      "Circlet",
      "Mantle of Intelligence"
    ],
    "coreItems": [
      "Kaya",
      "Staff of Wizardry",
      "Blink Dagger",
      "Ogre Axe",
      "Veil of Discord"
    ]
  },
  {
    "id": "lich",
    "numericId": 31,
    "name": "Lich",
    "shortName": "lich",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker"
    ],
    "overallWin": 0.519,
    "winByBracket": {
      "herald": 0.522,
      "guardian": 0.521,
      "crusader": 0.524,
      "archon": 0.522,
      "legend": 0.515,
      "ancient": 0.515,
      "divine": 0.509
    },
    "pickByBracket": {
      "herald": 26436,
      "guardian": 51747,
      "crusader": 61080,
      "archon": 58879,
      "legend": 48011,
      "ancient": 33274,
      "divine": 34943
    },
    "counters": [
      "sven",
      "ursa",
      "ring-master",
      "wraith-king",
      "tidehunter",
      "abaddon"
    ],
    "weakAgainst": [
      "nyx-assassin",
      "treant-protector",
      "chaos-knight",
      "muerta",
      "kez",
      "sniper"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Sentry Ward",
      "Enchanted Mango",
      "Faerie Fire"
    ],
    "coreItems": [
      "Glimmer Cape",
      "Aghanim's Shard",
      "Blink Dagger",
      "Staff of Wizardry",
      "Pavise"
    ]
  },
  {
    "id": "lifestealer",
    "numericId": 54,
    "name": "Lifestealer",
    "shortName": "life_stealer",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Durable",
      "Escape",
      "Disabler"
    ],
    "overallWin": 0.521,
    "winByBracket": {
      "herald": 0.501,
      "guardian": 0.513,
      "crusader": 0.522,
      "archon": 0.528,
      "legend": 0.526,
      "ancient": 0.526,
      "divine": 0.522
    },
    "pickByBracket": {
      "herald": 20972,
      "guardian": 46369,
      "crusader": 54195,
      "archon": 51093,
      "legend": 40467,
      "ancient": 27332,
      "divine": 27772
    },
    "counters": [
      "weaver",
      "night-stalker",
      "witch-doctor",
      "phantom-assassin",
      "bristleback",
      "grimstroke"
    ],
    "weakAgainst": [
      "kez",
      "alchemist",
      "phoenix",
      "morphling",
      "slardar",
      "doom"
    ],
    "startItems": [
      "Gauntlets of Strength",
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Faerie Fire"
    ],
    "coreItems": [
      "Sacred Relic",
      "Radiance",
      "Talisman of Evasion",
      "Blade of Alacrity",
      "Yasha"
    ]
  },
  {
    "id": "lina",
    "numericId": 25,
    "name": "Lina",
    "shortName": "lina",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Carry",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.494,
    "winByBracket": {
      "herald": 0.473,
      "guardian": 0.484,
      "crusader": 0.492,
      "archon": 0.499,
      "legend": 0.502,
      "ancient": 0.507,
      "divine": 0.506
    },
    "pickByBracket": {
      "herald": 42042,
      "guardian": 71611,
      "crusader": 75798,
      "archon": 67562,
      "legend": 50815,
      "ancient": 33304,
      "divine": 34529
    },
    "counters": [
      "underlord",
      "abaddon",
      "warlock",
      "axe",
      "phoenix",
      "bristleback"
    ],
    "weakAgainst": [
      "invoker",
      "pangolier",
      "monkey-king",
      "slardar",
      "timbersaw",
      "leshrac"
    ],
    "startItems": [
      "Iron Branch",
      "Observer Ward",
      "Tango",
      "Circlet",
      "Mantle of Intelligence",
      "Faerie Fire"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Staff of Wizardry",
      "Ogre Axe",
      "Boots of Travel",
      "Point Booster"
    ]
  },
  {
    "id": "lion",
    "numericId": 26,
    "name": "Lion",
    "shortName": "lion",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Disabler",
      "Nuker",
      "Initiator"
    ],
    "overallWin": 0.488,
    "winByBracket": {
      "herald": 0.491,
      "guardian": 0.492,
      "crusader": 0.489,
      "archon": 0.488,
      "legend": 0.487,
      "ancient": 0.485,
      "divine": 0.483
    },
    "pickByBracket": {
      "herald": 70026,
      "guardian": 146051,
      "crusader": 162389,
      "archon": 147044,
      "legend": 111041,
      "ancient": 72971,
      "divine": 74422
    },
    "counters": [
      "troll-warlord",
      "tinker",
      "dark-willow",
      "grimstroke",
      "sven",
      "death-prophet"
    ],
    "weakAgainst": [
      "lycan",
      "treant-protector",
      "monkey-king",
      "undying",
      "abaddon",
      "kunkka"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Sentry Ward",
      "Magic Stick"
    ],
    "coreItems": [
      "Blink Dagger",
      "Staff of Wizardry",
      "Ghost Scepter",
      "Blitz Knuckles",
      "Claymore"
    ]
  },
  {
    "id": "lone-druid",
    "numericId": 80,
    "name": "Lone Druid",
    "shortName": "lone_druid",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Pusher",
      "Durable"
    ],
    "overallWin": 0.49,
    "winByBracket": {
      "herald": 0.49,
      "guardian": 0.496,
      "crusader": 0.494,
      "archon": 0.485,
      "legend": 0.479,
      "ancient": 0.48,
      "divine": 0.5
    },
    "pickByBracket": {
      "herald": 6848,
      "guardian": 14465,
      "crusader": 16210,
      "archon": 13995,
      "legend": 11087,
      "ancient": 7705,
      "divine": 9501
    },
    "counters": [
      "shadow-fiend",
      "hoodwink",
      "windranger",
      "tiny",
      "jakiro",
      "rubick"
    ],
    "weakAgainst": [],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Quelling Blade",
      "Orb of Blight",
      "Tango",
      "Circlet"
    ],
    "coreItems": [
      "Hyperstone",
      "Maelstrom",
      "Mjollnir",
      "Blade of Alacrity",
      "Ogre Axe"
    ]
  },
  {
    "id": "luna",
    "numericId": 48,
    "name": "Luna",
    "shortName": "luna",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker",
      "Pusher"
    ],
    "overallWin": 0.495,
    "winByBracket": {
      "herald": 0.502,
      "guardian": 0.496,
      "crusader": 0.496,
      "archon": 0.496,
      "legend": 0.488,
      "ancient": 0.487,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 20590,
      "guardian": 36066,
      "crusader": 38311,
      "archon": 35600,
      "legend": 28787,
      "ancient": 20154,
      "divine": 23933
    },
    "counters": [
      "morphling",
      "sand-king",
      "phantom-assassin",
      "sniper",
      "dragon-knight",
      "alchemist"
    ],
    "weakAgainst": [
      "clockwerk",
      "monkey-king",
      "legion-commander",
      "techies",
      "keeper-of-the-light",
      "muerta"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Magic Wand",
      "Magic Stick",
      "Tango",
      "Circlet"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Yasha",
      "Diadem",
      "Manta Style",
      "Mask of Madness"
    ]
  },
  {
    "id": "lycan",
    "numericId": 77,
    "name": "Lycan",
    "shortName": "lycan",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Pusher",
      "Durable",
      "Escape"
    ],
    "overallWin": 0.489,
    "winByBracket": {
      "herald": 0.463,
      "guardian": 0.457,
      "crusader": 0.485,
      "archon": 0.496,
      "legend": 0.499,
      "ancient": 0.502,
      "divine": 0.535
    },
    "pickByBracket": {
      "herald": 3833,
      "guardian": 6787,
      "crusader": 7184,
      "archon": 6197,
      "legend": 4899,
      "ancient": 3374,
      "divine": 4810
    },
    "counters": [
      "skywrath-mage",
      "sven",
      "lion",
      "axe",
      "ursa",
      "pudge"
    ],
    "weakAgainst": [
      "leshrac",
      "beastmaster",
      "terrorblade",
      "bane",
      "ogre-magi",
      "tusk"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Sage's Mask",
      "Magic Stick",
      "Magic Wand"
    ],
    "coreItems": [
      "Ultimate Orb",
      "Helm of the Overlord",
      "Aghanim's Shard",
      "Hyperstone",
      "Platemail"
    ]
  },
  {
    "id": "magnus",
    "numericId": 97,
    "name": "Magnus",
    "shortName": "magnataur",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Disabler",
      "Nuker",
      "Escape"
    ],
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.471,
      "guardian": 0.478,
      "crusader": 0.488,
      "archon": 0.494,
      "legend": 0.496,
      "ancient": 0.5,
      "divine": 0.499
    },
    "pickByBracket": {
      "herald": 13289,
      "guardian": 38601,
      "crusader": 54762,
      "archon": 57959,
      "legend": 48607,
      "ancient": 33881,
      "divine": 34907
    },
    "counters": [
      "void-spirit",
      "bristleback",
      "phoenix",
      "doom",
      "warlock",
      "hoodwink"
    ],
    "weakAgainst": [
      "dazzle",
      "batrider",
      "terrorblade",
      "juggernaut",
      "tusk",
      "invoker"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Tango",
      "Quelling Blade",
      "Faerie Fire",
      "Gauntlets of Strength"
    ],
    "coreItems": [
      "Blink Dagger",
      "Ogre Axe",
      "Diadem",
      "Broadsword",
      "Echo Sabre"
    ]
  },
  {
    "id": "marci",
    "numericId": 136,
    "name": "Marci",
    "shortName": "marci",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Support",
      "Carry",
      "Initiator",
      "Disabler",
      "Escape"
    ],
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.475,
      "guardian": 0.486,
      "crusader": 0.492,
      "archon": 0.492,
      "legend": 0.492,
      "ancient": 0.501,
      "divine": 0.507
    },
    "pickByBracket": {
      "herald": 11180,
      "guardian": 18440,
      "crusader": 19358,
      "archon": 17434,
      "legend": 13059,
      "ancient": 9076,
      "divine": 10371
    },
    "counters": [
      "death-prophet",
      "witch-doctor",
      "void-spirit",
      "ursa",
      "storm-spirit",
      "dark-seer"
    ],
    "weakAgainst": [
      "dazzle",
      "ancient-apparition",
      "phoenix",
      "lycan",
      "puck",
      "rubick"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Sentry Ward",
      "Magic Stick",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Phase Boots",
      "Ogre Axe",
      "Mithril Hammer",
      "Pavise",
      "Solar Crest"
    ]
  },
  {
    "id": "mars",
    "numericId": 129,
    "name": "Mars",
    "shortName": "mars",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Initiator",
      "Disabler",
      "Durable"
    ],
    "overallWin": 0.464,
    "winByBracket": {
      "herald": 0.461,
      "guardian": 0.463,
      "crusader": 0.46,
      "archon": 0.463,
      "legend": 0.466,
      "ancient": 0.462,
      "divine": 0.469
    },
    "pickByBracket": {
      "herald": 9491,
      "guardian": 21719,
      "crusader": 29214,
      "archon": 31061,
      "legend": 27880,
      "ancient": 20803,
      "divine": 23990
    },
    "counters": [
      "chaos-knight",
      "outworld-devourer",
      "drow-ranger",
      "medusa",
      "weaver",
      "spectre"
    ],
    "weakAgainst": [
      "treant-protector",
      "monkey-king",
      "ancient-apparition",
      "phoenix",
      "shadow-demon",
      "huskar"
    ],
    "startItems": [
      "Gauntlets of Strength",
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Circlet",
      "Magic Stick"
    ],
    "coreItems": [
      "Blink Dagger",
      "Mithril Hammer",
      "Aghanim's Shard",
      "Staff of Wizardry",
      "Ogre Axe"
    ]
  },
  {
    "id": "medusa",
    "numericId": 94,
    "name": "Medusa",
    "shortName": "medusa",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Disabler",
      "Durable"
    ],
    "overallWin": 0.498,
    "winByBracket": {
      "herald": 0.502,
      "guardian": 0.504,
      "crusader": 0.501,
      "archon": 0.496,
      "legend": 0.488,
      "ancient": 0.494,
      "divine": 0.492
    },
    "pickByBracket": {
      "herald": 11920,
      "guardian": 22033,
      "crusader": 22519,
      "archon": 19688,
      "legend": 13811,
      "ancient": 8373,
      "divine": 7594
    },
    "counters": [
      "weaver",
      "dark-willow",
      "warlock",
      "sand-king",
      "undying",
      "slardar"
    ],
    "weakAgainst": [
      "shadow-demon",
      "shadow-shaman",
      "ogre-magi",
      "necrophos",
      "centaur-warrunner",
      "dawnbreaker"
    ],
    "startItems": [
      "Iron Branch",
      "Magic Stick",
      "Circlet",
      "Enchanted Mango",
      "Magic Wand",
      "Quelling Blade"
    ],
    "coreItems": [
      "Manta Style",
      "Diadem",
      "Claymore",
      "Yasha",
      "Eaglesong"
    ]
  },
  {
    "id": "meepo",
    "numericId": 82,
    "name": "Meepo",
    "shortName": "meepo",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Nuker",
      "Disabler",
      "Initiator",
      "Pusher"
    ],
    "overallWin": 0.509,
    "winByBracket": {
      "herald": 0.502,
      "guardian": 0.505,
      "crusader": 0.504,
      "archon": 0.512,
      "legend": 0.512,
      "ancient": 0.521,
      "divine": 0.534
    },
    "pickByBracket": {
      "herald": 7249,
      "guardian": 11048,
      "crusader": 10080,
      "archon": 7430,
      "legend": 4946,
      "ancient": 3036,
      "divine": 3621
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Slippers of Agility",
      "Observer Ward",
      "Tango",
      "Quelling Blade"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blade of Alacrity",
      "Sange and Yasha",
      "Sange",
      "Staff of Wizardry"
    ]
  },
  {
    "id": "mirana",
    "numericId": 9,
    "name": "Mirana",
    "shortName": "mirana",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Support",
      "Escape",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.511,
    "winByBracket": {
      "herald": 0.512,
      "guardian": 0.512,
      "crusader": 0.512,
      "archon": 0.509,
      "legend": 0.513,
      "ancient": 0.509,
      "divine": 0.506
    },
    "pickByBracket": {
      "herald": 17881,
      "guardian": 35167,
      "crusader": 39136,
      "archon": 33781,
      "legend": 25342,
      "ancient": 15982,
      "divine": 15986
    },
    "counters": [
      "ursa",
      "storm-spirit",
      "crystal-maiden",
      "shadow-shaman",
      "ogre-magi",
      "queen-of-pain"
    ],
    "weakAgainst": [
      "zeus",
      "tidehunter",
      "tusk",
      "mars",
      "jakiro",
      "luna"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Faerie Fire",
      "Circlet",
      "Sentry Ward"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Arcane Boots",
      "Blade of Alacrity",
      "Eul's Scepter of Divinity",
      "Point Booster"
    ]
  },
  {
    "id": "monkey-king",
    "numericId": 114,
    "name": "Monkey King",
    "shortName": "monkey_king",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Disabler",
      "Initiator"
    ],
    "overallWin": 0.444,
    "winByBracket": {
      "herald": 0.435,
      "guardian": 0.433,
      "crusader": 0.435,
      "archon": 0.448,
      "legend": 0.45,
      "ancient": 0.455,
      "divine": 0.463
    },
    "pickByBracket": {
      "herald": 18287,
      "guardian": 31235,
      "crusader": 32654,
      "archon": 30486,
      "legend": 23723,
      "ancient": 15619,
      "divine": 18179
    },
    "counters": [
      "undying",
      "earthshaker",
      "death-prophet",
      "weaver",
      "skywrath-mage",
      "clockwerk"
    ],
    "weakAgainst": [
      "treant-protector",
      "chen",
      "crystal-maiden",
      "zeus",
      "timbersaw",
      "dawnbreaker"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Circlet",
      "Quelling Blade",
      "Slippers of Agility",
      "Faerie Fire"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Ogre Axe",
      "Broadsword",
      "Echo Sabre",
      "Desolator"
    ]
  },
  {
    "id": "morphling",
    "numericId": 10,
    "name": "Morphling",
    "shortName": "morphling",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Escape",
      "Durable",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.486,
    "winByBracket": {
      "herald": 0.484,
      "guardian": 0.484,
      "crusader": 0.488,
      "archon": 0.484,
      "legend": 0.488,
      "ancient": 0.497,
      "divine": 0.483
    },
    "pickByBracket": {
      "herald": 12085,
      "guardian": 24032,
      "crusader": 25087,
      "archon": 21236,
      "legend": 15936,
      "ancient": 11425,
      "divine": 13484
    },
    "counters": [
      "weaver",
      "lifestealer",
      "terrorblade",
      "dawnbreaker",
      "void-spirit",
      "anti-mage"
    ],
    "weakAgainst": [
      "luna",
      "doom",
      "dazzle",
      "pudge",
      "viper",
      "timbersaw"
    ],
    "startItems": [
      "Iron Branch",
      "Magic Wand",
      "Circlet",
      "Tango",
      "Slippers of Agility",
      "Faerie Fire"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Diadem",
      "Yasha",
      "Manta Style",
      "Vladmir's Offering"
    ]
  },
  {
    "id": "muerta",
    "numericId": 138,
    "name": "Muerta",
    "shortName": "muerta",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.472,
    "winByBracket": {
      "herald": 0.484,
      "guardian": 0.479,
      "crusader": 0.47,
      "archon": 0.47,
      "legend": 0.469,
      "ancient": 0.467,
      "divine": 0.466
    },
    "pickByBracket": {
      "herald": 12823,
      "guardian": 20955,
      "crusader": 23152,
      "archon": 22063,
      "legend": 17796,
      "ancient": 12556,
      "divine": 13906
    },
    "counters": [
      "techies",
      "lich",
      "faceless-void",
      "bristleback",
      "luna",
      "necrophos"
    ],
    "weakAgainst": [
      "slark",
      "grimstroke",
      "leshrac",
      "huskar",
      "primal-beast",
      "sand-king"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Magic Wand",
      "Tango",
      "Magic Stick",
      "Circlet"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Maelstrom",
      "Blade of Alacrity",
      "Dragon Lance",
      "Hyperstone"
    ]
  },
  {
    "id": "naga-siren",
    "numericId": 89,
    "name": "Naga Siren",
    "shortName": "naga_siren",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Support",
      "Pusher",
      "Disabler",
      "Initiator",
      "Escape"
    ],
    "overallWin": 0.497,
    "winByBracket": {
      "herald": 0.507,
      "guardian": 0.495,
      "crusader": 0.491,
      "archon": 0.482,
      "legend": 0.499,
      "ancient": 0.508,
      "divine": 0.507
    },
    "pickByBracket": {
      "herald": 9373,
      "guardian": 12414,
      "crusader": 9308,
      "archon": 6560,
      "legend": 4245,
      "ancient": 2628,
      "divine": 3071
    },
    "counters": [
      "void-spirit",
      "hoodwink",
      "windranger",
      "puck",
      "pangolier",
      "axe"
    ],
    "weakAgainst": [
      "storm-spirit",
      "sand-king",
      "dragon-knight",
      "queen-of-pain"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Slippers of Agility",
      "Tango",
      "Quelling Blade",
      "Magic Stick"
    ],
    "coreItems": [
      "Claymore",
      "Blitz Knuckles",
      "Oblivion Staff",
      "Diadem",
      "Manta Style"
    ]
  },
  {
    "id": "nature-s-prophet",
    "numericId": 53,
    "name": "Nature's Prophet",
    "shortName": "furion",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Pusher",
      "Escape",
      "Nuker"
    ],
    "overallWin": 0.433,
    "winByBracket": {
      "herald": 0.443,
      "guardian": 0.435,
      "crusader": 0.428,
      "archon": 0.428,
      "legend": 0.432,
      "ancient": 0.435,
      "divine": 0.435
    },
    "pickByBracket": {
      "herald": 29815,
      "guardian": 53568,
      "crusader": 54970,
      "archon": 47449,
      "legend": 35083,
      "ancient": 22918,
      "divine": 24915
    },
    "counters": [
      "razor",
      "phantom-lancer",
      "pangolier",
      "huskar",
      "sniper",
      "doom"
    ],
    "weakAgainst": [
      "kez",
      "morphling",
      "nyx-assassin",
      "bane",
      "luna",
      "tidehunter"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Circlet",
      "Tango",
      "Magic Wand",
      "Observer Ward"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Mithril Hammer",
      "Hyperstone",
      "Maelstrom",
      "Dragon Lance"
    ]
  },
  {
    "id": "necrophos",
    "numericId": 36,
    "name": "Necrophos",
    "shortName": "necrolyte",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker",
      "Durable",
      "Disabler"
    ],
    "overallWin": 0.524,
    "winByBracket": {
      "herald": 0.547,
      "guardian": 0.534,
      "crusader": 0.526,
      "archon": 0.521,
      "legend": 0.52,
      "ancient": 0.511,
      "divine": 0.503
    },
    "pickByBracket": {
      "herald": 47861,
      "guardian": 95192,
      "crusader": 103516,
      "archon": 93884,
      "legend": 71955,
      "ancient": 47412,
      "divine": 49846
    },
    "counters": [
      "underlord",
      "sven",
      "witch-doctor",
      "medusa",
      "bristleback",
      "void-spirit"
    ],
    "weakAgainst": [
      "grimstroke",
      "drow-ranger",
      "beastmaster",
      "ring-master",
      "muerta",
      "invoker"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Faerie Fire",
      "Tango",
      "Magic Wand",
      "Magic Stick"
    ],
    "coreItems": [
      "Radiance",
      "Aghanim's Shard",
      "Talisman of Evasion",
      "Boots of Travel",
      "Sacred Relic"
    ]
  },
  {
    "id": "night-stalker",
    "numericId": 60,
    "name": "Night Stalker",
    "shortName": "night_stalker",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Initiator",
      "Durable",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.526,
    "winByBracket": {
      "herald": 0.481,
      "guardian": 0.506,
      "crusader": 0.521,
      "archon": 0.528,
      "legend": 0.538,
      "ancient": 0.536,
      "divine": 0.545
    },
    "pickByBracket": {
      "herald": 12269,
      "guardian": 28467,
      "crusader": 37028,
      "archon": 37780,
      "legend": 32026,
      "ancient": 22919,
      "divine": 28676
    },
    "counters": [
      "dark-willow",
      "ancient-apparition",
      "zeus",
      "storm-spirit",
      "tidehunter",
      "troll-warlord"
    ],
    "weakAgainst": [
      "lifestealer",
      "pugna",
      "undying",
      "beastmaster",
      "crystal-maiden",
      "shadow-fiend"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Circlet",
      "Quelling Blade",
      "Magic Stick"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blink Dagger",
      "Mithril Hammer",
      "Echo Sabre",
      "Broadsword"
    ]
  },
  {
    "id": "nyx-assassin",
    "numericId": 88,
    "name": "Nyx Assassin",
    "shortName": "nyx_assassin",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Disabler",
      "Nuker",
      "Initiator",
      "Escape"
    ],
    "overallWin": 0.522,
    "winByBracket": {
      "herald": 0.515,
      "guardian": 0.519,
      "crusader": 0.521,
      "archon": 0.52,
      "legend": 0.524,
      "ancient": 0.521,
      "divine": 0.531
    },
    "pickByBracket": {
      "herald": 17975,
      "guardian": 37055,
      "crusader": 41599,
      "archon": 40133,
      "legend": 32477,
      "ancient": 21861,
      "divine": 24033
    },
    "counters": [
      "lich",
      "bristleback",
      "gyrocopter",
      "void-spirit",
      "sven",
      "invoker"
    ],
    "weakAgainst": [
      "pangolier",
      "pudge",
      "phoenix",
      "terrorblade",
      "abaddon",
      "rubick"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Boots of Speed",
      "Sentry Ward",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Eul's Scepter of Divinity",
      "Arcane Boots",
      "Point Booster",
      "Blink Dagger"
    ]
  },
  {
    "id": "ogre-magi",
    "numericId": 84,
    "name": "Ogre Magi",
    "shortName": "ogre_magi",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Support",
      "Nuker",
      "Disabler",
      "Durable",
      "Initiator"
    ],
    "overallWin": 0.505,
    "winByBracket": {
      "herald": 0.519,
      "guardian": 0.51,
      "crusader": 0.504,
      "archon": 0.503,
      "legend": 0.499,
      "ancient": 0.497,
      "divine": 0.49
    },
    "pickByBracket": {
      "herald": 53870,
      "guardian": 101455,
      "crusader": 101103,
      "archon": 83050,
      "legend": 56665,
      "ancient": 33025,
      "divine": 26944
    },
    "counters": [
      "medusa",
      "winter-wyvern",
      "ancient-apparition",
      "bristleback",
      "anti-mage",
      "phantom-lancer"
    ],
    "weakAgainst": [
      "phoenix",
      "mirana",
      "naga-siren",
      "pugna",
      "bounty-hunter",
      "treant-protector"
    ],
    "startItems": [
      "Tango",
      "Observer and Sentry Wards",
      "Iron Branch",
      "Gauntlets of Strength",
      "Blood Grenade",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Hand of Midas",
      "Aether Lens",
      "Staff of Wizardry",
      "Ogre Axe"
    ]
  },
  {
    "id": "omniknight",
    "numericId": 57,
    "name": "Omniknight",
    "shortName": "omniknight",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Support",
      "Durable",
      "Nuker"
    ],
    "overallWin": 0.5,
    "winByBracket": {
      "herald": 0.48,
      "guardian": 0.495,
      "crusader": 0.491,
      "archon": 0.507,
      "legend": 0.508,
      "ancient": 0.518,
      "divine": 0.507
    },
    "pickByBracket": {
      "herald": 7054,
      "guardian": 13051,
      "crusader": 13430,
      "archon": 12251,
      "legend": 9004,
      "ancient": 6094,
      "divine": 6725
    },
    "counters": [
      "tiny",
      "shadow-fiend",
      "skywrath-mage",
      "mars"
    ],
    "weakAgainst": [
      "jakiro",
      "windranger",
      "pudge",
      "rubick"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Magic Stick",
      "Faerie Fire",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Ogre Axe",
      "Echo Sabre",
      "Broadsword",
      "Diadem",
      "Harpoon"
    ]
  },
  {
    "id": "oracle",
    "numericId": 111,
    "name": "Oracle",
    "shortName": "oracle",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Disabler",
      "Escape"
    ],
    "overallWin": 0.504,
    "winByBracket": {
      "herald": 0.466,
      "guardian": 0.484,
      "crusader": 0.499,
      "archon": 0.511,
      "legend": 0.516,
      "ancient": 0.515,
      "divine": 0.52
    },
    "pickByBracket": {
      "herald": 6111,
      "guardian": 13559,
      "crusader": 17275,
      "archon": 17210,
      "legend": 14242,
      "ancient": 10156,
      "divine": 12181
    },
    "counters": [
      "shadow-shaman",
      "tiny",
      "batrider",
      "invoker",
      "puck",
      "night-stalker"
    ],
    "weakAgainst": [
      "windranger",
      "jakiro",
      "queen-of-pain",
      "ember-spirit",
      "ogre-magi",
      "templar-assassin"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Magic Stick",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Blink Dagger",
      "Ghost Scepter",
      "Mekansm",
      "Glimmer Cape"
    ]
  },
  {
    "id": "outworld-devourer",
    "numericId": 76,
    "name": "Outworld Devourer",
    "shortName": "obsidian_destroyer",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.499,
    "winByBracket": {
      "herald": 0.465,
      "guardian": 0.496,
      "crusader": 0.501,
      "archon": 0.501,
      "legend": 0.508,
      "ancient": 0.5,
      "divine": 0.511
    },
    "pickByBracket": {
      "herald": 10473,
      "guardian": 20856,
      "crusader": 24383,
      "archon": 22336,
      "legend": 17221,
      "ancient": 10865,
      "divine": 10771
    },
    "counters": [
      "jakiro",
      "lion"
    ],
    "weakAgainst": [
      "shadow-demon",
      "dawnbreaker",
      "mars",
      "disruptor",
      "timbersaw",
      "queen-of-pain"
    ],
    "startItems": [
      "Iron Branch",
      "Mantle of Intelligence",
      "Tango",
      "Observer Ward",
      "Circlet",
      "Faerie Fire"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Staff of Wizardry",
      "Witch Blade",
      "Dragon Lance",
      "Oblivion Staff"
    ]
  },
  {
    "id": "pangolier",
    "numericId": 120,
    "name": "Pangolier",
    "shortName": "pangolier",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Nuker",
      "Disabler",
      "Durable",
      "Escape",
      "Initiator"
    ],
    "overallWin": 0.456,
    "winByBracket": {
      "herald": 0.438,
      "guardian": 0.453,
      "crusader": 0.454,
      "archon": 0.462,
      "legend": 0.46,
      "ancient": 0.454,
      "divine": 0.459
    },
    "pickByBracket": {
      "herald": 5935,
      "guardian": 13254,
      "crusader": 18238,
      "archon": 20379,
      "legend": 18744,
      "ancient": 14902,
      "divine": 19930
    },
    "counters": [
      "lina",
      "sven",
      "jakiro",
      "lion",
      "beastmaster",
      "earth-spirit"
    ],
    "weakAgainst": [
      "largo",
      "naga-siren",
      "treant-protector",
      "nature-s-prophet",
      "juggernaut",
      "kunkka"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Circlet",
      "Faerie Fire",
      "Quelling Blade"
    ],
    "coreItems": [
      "Blink Dagger",
      "Blade of Alacrity",
      "Diffusal Blade",
      "Point Booster",
      "Staff of Wizardry"
    ]
  },
  {
    "id": "phantom-assassin",
    "numericId": 44,
    "name": "Phantom Assassin",
    "shortName": "phantom_assassin",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape"
    ],
    "overallWin": 0.507,
    "winByBracket": {
      "herald": 0.517,
      "guardian": 0.514,
      "crusader": 0.506,
      "archon": 0.506,
      "legend": 0.498,
      "ancient": 0.492,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 55155,
      "guardian": 90063,
      "crusader": 83276,
      "archon": 65309,
      "legend": 43347,
      "ancient": 24908,
      "divine": 21401
    },
    "counters": [
      "ogre-magi",
      "dragon-knight",
      "lion"
    ],
    "weakAgainst": [
      "rubick",
      "pudge",
      "lifestealer",
      "queen-of-pain",
      "shadow-shaman",
      "ursa"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Faerie Fire",
      "Circlet"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Broadsword",
      "Battle Fury",
      "Desolator",
      "Perseverance"
    ]
  },
  {
    "id": "phantom-lancer",
    "numericId": 12,
    "name": "Phantom Lancer",
    "shortName": "phantom_lancer",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Pusher",
      "Nuker"
    ],
    "overallWin": 0.527,
    "winByBracket": {
      "herald": 0.523,
      "guardian": 0.527,
      "crusader": 0.529,
      "archon": 0.522,
      "legend": 0.529,
      "ancient": 0.528,
      "divine": 0.531
    },
    "pickByBracket": {
      "herald": 35144,
      "guardian": 63270,
      "crusader": 60729,
      "archon": 47731,
      "legend": 33826,
      "ancient": 22323,
      "divine": 25833
    },
    "counters": [
      "dark-willow",
      "shadow-shaman",
      "slardar",
      "jakiro",
      "templar-assassin",
      "invoker"
    ],
    "weakAgainst": [
      "shadow-demon",
      "queen-of-pain",
      "hoodwink",
      "terrorblade",
      "nature-s-prophet",
      "windranger"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Circlet",
      "Faerie Fire"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Diadem",
      "Manta Style",
      "Staff of Wizardry",
      "Ogre Axe"
    ]
  },
  {
    "id": "phoenix",
    "numericId": 110,
    "name": "Phoenix",
    "shortName": "phoenix",
    "primaryAttr": "str",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Initiator",
      "Escape",
      "Disabler"
    ],
    "overallWin": 0.504,
    "winByBracket": {
      "herald": 0.493,
      "guardian": 0.506,
      "crusader": 0.506,
      "archon": 0.503,
      "legend": 0.506,
      "ancient": 0.498,
      "divine": 0.505
    },
    "pickByBracket": {
      "herald": 9728,
      "guardian": 24485,
      "crusader": 31252,
      "archon": 31915,
      "legend": 26976,
      "ancient": 20059,
      "divine": 24889
    },
    "counters": [
      "dark-seer",
      "sand-king",
      "underlord",
      "techies",
      "void-spirit",
      "razor"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "magnus",
      "juggernaut",
      "dazzle",
      "night-stalker",
      "drow-ranger"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Sentry Ward"
    ],
    "coreItems": [
      "Diadem",
      "Aghanim's Shard",
      "Spirit Vessel",
      "Platemail",
      "Staff of Wizardry"
    ]
  },
  {
    "id": "primal-beast",
    "numericId": 137,
    "name": "Primal Beast",
    "shortName": "primal_beast",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Durable",
      "Disabler"
    ],
    "overallWin": 0.489,
    "winByBracket": {
      "herald": 0.487,
      "guardian": 0.483,
      "crusader": 0.485,
      "archon": 0.483,
      "legend": 0.495,
      "ancient": 0.496,
      "divine": 0.504
    },
    "pickByBracket": {
      "herald": 9731,
      "guardian": 19362,
      "crusader": 20365,
      "archon": 18243,
      "legend": 13983,
      "ancient": 9948,
      "divine": 11766
    },
    "counters": [
      "muerta",
      "gyrocopter",
      "terrorblade",
      "viper",
      "puck",
      "dark-willow"
    ],
    "weakAgainst": [
      "earthshaker",
      "largo",
      "shadow-demon",
      "razor",
      "invoker",
      "slardar"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Observer Ward",
      "Magic Stick",
      "Quelling Blade"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blink Dagger",
      "Mithril Hammer",
      "Black King Bar",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "puck",
    "numericId": 13,
    "name": "Puck",
    "shortName": "puck",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Initiator",
      "Disabler",
      "Escape",
      "Nuker"
    ],
    "overallWin": 0.472,
    "winByBracket": {
      "herald": 0.445,
      "guardian": 0.447,
      "crusader": 0.466,
      "archon": 0.465,
      "legend": 0.479,
      "ancient": 0.49,
      "divine": 0.502
    },
    "pickByBracket": {
      "herald": 8149,
      "guardian": 16930,
      "crusader": 21223,
      "archon": 21892,
      "legend": 18384,
      "ancient": 13548,
      "divine": 17580
    },
    "counters": [
      "weaver",
      "sven",
      "dark-willow",
      "crystal-maiden",
      "underlord",
      "invoker"
    ],
    "weakAgainst": [
      "naga-siren",
      "dark-seer",
      "clinkz",
      "bounty-hunter",
      "nyx-assassin",
      "dazzle"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Faerie Fire",
      "Circlet",
      "Sentry Ward"
    ],
    "coreItems": [
      "Witch Blade",
      "Blink Dagger",
      "Oblivion Staff",
      "Blitz Knuckles",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "pudge",
    "numericId": 14,
    "name": "Pudge",
    "shortName": "pudge",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Disabler",
      "Initiator",
      "Durable",
      "Nuker"
    ],
    "overallWin": 0.511,
    "winByBracket": {
      "herald": 0.512,
      "guardian": 0.512,
      "crusader": 0.512,
      "archon": 0.512,
      "legend": 0.51,
      "ancient": 0.508,
      "divine": 0.506
    },
    "pickByBracket": {
      "herald": 70545,
      "guardian": 151637,
      "crusader": 160398,
      "archon": 135187,
      "legend": 99550,
      "ancient": 66193,
      "divine": 75393
    },
    "counters": [
      "io",
      "clinkz",
      "wraith-king",
      "morphling",
      "phantom-assassin",
      "warlock"
    ],
    "weakAgainst": [
      "largo",
      "lycan",
      "earth-spirit",
      "naga-siren",
      "kez",
      "bane"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Gauntlets of Strength",
      "Observer Ward",
      "Boots of Speed",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Blink Dagger",
      "Aether Lens",
      "Staff of Wizardry",
      "Blade of Alacrity",
      "Point Booster"
    ]
  },
  {
    "id": "pugna",
    "numericId": 45,
    "name": "Pugna",
    "shortName": "pugna",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Nuker",
      "Pusher"
    ],
    "overallWin": 0.499,
    "winByBracket": {
      "herald": 0.475,
      "guardian": 0.489,
      "crusader": 0.5,
      "archon": 0.507,
      "legend": 0.508,
      "ancient": 0.508,
      "divine": 0.512
    },
    "pickByBracket": {
      "herald": 13335,
      "guardian": 23385,
      "crusader": 23697,
      "archon": 20242,
      "legend": 15470,
      "ancient": 9820,
      "divine": 9512
    },
    "counters": [
      "night-stalker",
      "dark-willow",
      "beastmaster",
      "dazzle",
      "muerta",
      "tusk"
    ],
    "weakAgainst": [
      "chen",
      "naga-siren",
      "crystal-maiden",
      "terrorblade",
      "shadow-fiend",
      "centaur-warrunner"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer and Sentry Wards",
      "Blood Grenade",
      "Magic Stick",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Glimmer Cape",
      "Aether Lens",
      "Staff of Wizardry",
      "Kaya"
    ]
  },
  {
    "id": "queen-of-pain",
    "numericId": 39,
    "name": "Queen of Pain",
    "shortName": "queenofpain",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker",
      "Escape"
    ],
    "overallWin": 0.463,
    "winByBracket": {
      "herald": 0.462,
      "guardian": 0.46,
      "crusader": 0.464,
      "archon": 0.463,
      "legend": 0.463,
      "ancient": 0.461,
      "divine": 0.461
    },
    "pickByBracket": {
      "herald": 24833,
      "guardian": 55288,
      "crusader": 67881,
      "archon": 64618,
      "legend": 50693,
      "ancient": 33317,
      "divine": 34824
    },
    "counters": [
      "phantom-lancer",
      "phantom-assassin",
      "tinker",
      "sand-king",
      "drow-ranger",
      "chaos-knight"
    ],
    "weakAgainst": [
      "largo",
      "keeper-of-the-light",
      "chen",
      "treant-protector",
      "dark-seer",
      "bounty-hunter"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Faerie Fire",
      "Circlet",
      "Mantle of Intelligence"
    ],
    "coreItems": [
      "Ogre Axe",
      "Staff of Wizardry",
      "Point Booster",
      "Kaya",
      "Blade of Alacrity"
    ]
  },
  {
    "id": "razor",
    "numericId": 15,
    "name": "Razor",
    "shortName": "razor",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Durable",
      "Nuker",
      "Pusher"
    ],
    "overallWin": 0.505,
    "winByBracket": {
      "herald": 0.51,
      "guardian": 0.505,
      "crusader": 0.506,
      "archon": 0.504,
      "legend": 0.505,
      "ancient": 0.509,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 20429,
      "guardian": 30655,
      "crusader": 30723,
      "archon": 25915,
      "legend": 19503,
      "ancient": 12362,
      "divine": 11927
    },
    "counters": [
      "silencer",
      "crystal-maiden",
      "primal-beast",
      "tidehunter",
      "gyrocopter",
      "skywrath-mage"
    ],
    "weakAgainst": [
      "treant-protector",
      "nature-s-prophet",
      "terrorblade",
      "phoenix",
      "huskar",
      "kunkka"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Circlet",
      "Magic Stick",
      "Slippers of Agility",
      "Faerie Fire"
    ],
    "coreItems": [
      "Yasha",
      "Ogre Axe",
      "Blade of Alacrity",
      "Mithril Hammer",
      "Diadem"
    ]
  },
  {
    "id": "riki",
    "numericId": 32,
    "name": "Riki",
    "shortName": "riki",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Disabler"
    ],
    "overallWin": 0.524,
    "winByBracket": {
      "herald": 0.524,
      "guardian": 0.523,
      "crusader": 0.528,
      "archon": 0.524,
      "legend": 0.521,
      "ancient": 0.524,
      "divine": 0.513
    },
    "pickByBracket": {
      "herald": 24033,
      "guardian": 39197,
      "crusader": 34941,
      "archon": 27391,
      "legend": 19102,
      "ancient": 11602,
      "divine": 10494
    },
    "counters": [
      "puck"
    ],
    "weakAgainst": [],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Circlet",
      "Observer Ward",
      "Magic Stick"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Diffusal Blade",
      "Yasha",
      "Diadem",
      "Manta Style"
    ]
  },
  {
    "id": "ring-master",
    "numericId": 131,
    "name": "Ring Master",
    "shortName": "ringmaster",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Escape",
      "Disabler"
    ],
    "overallWin": 0.478,
    "winByBracket": {
      "herald": 0.468,
      "guardian": 0.472,
      "crusader": 0.472,
      "archon": 0.48,
      "legend": 0.481,
      "ancient": 0.484,
      "divine": 0.483
    },
    "pickByBracket": {
      "herald": 7223,
      "guardian": 15692,
      "crusader": 18906,
      "archon": 19264,
      "legend": 16701,
      "ancient": 12488,
      "divine": 15657
    },
    "counters": [
      "troll-warlord",
      "dark-willow",
      "skywrath-mage",
      "vengeful-spirit",
      "earth-spirit",
      "necrophos"
    ],
    "weakAgainst": [
      "alchemist",
      "chen",
      "grimstroke",
      "bane",
      "lich",
      "dazzle"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Faerie Fire",
      "Observer and Sentry Wards",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Staff of Wizardry",
      "Vitality Booster",
      "Rod of Atos",
      "Blink Dagger"
    ]
  },
  {
    "id": "rubick",
    "numericId": 86,
    "name": "Rubick",
    "shortName": "rubick",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.48,
      "guardian": 0.481,
      "crusader": 0.488,
      "archon": 0.494,
      "legend": 0.495,
      "ancient": 0.499,
      "divine": 0.497
    },
    "pickByBracket": {
      "herald": 32606,
      "guardian": 82294,
      "crusader": 108833,
      "archon": 114150,
      "legend": 95866,
      "ancient": 67770,
      "divine": 75040
    },
    "counters": [
      "phantom-assassin",
      "phantom-lancer",
      "sven",
      "weaver",
      "brewmaster",
      "magnus"
    ],
    "weakAgainst": [
      "lone-druid",
      "broodmother",
      "lycan",
      "leshrac",
      "visage",
      "bane"
    ],
    "startItems": [
      "Iron Branch",
      "Blood Grenade",
      "Tango",
      "Sentry Ward",
      "Observer and Sentry Wards",
      "Faerie Fire"
    ],
    "coreItems": [
      "Blink Dagger",
      "Staff of Wizardry",
      "Essence Distiller",
      "Arcane Boots",
      "Point Booster"
    ]
  },
  {
    "id": "sand-king",
    "numericId": 16,
    "name": "Sand King",
    "shortName": "sand_king",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Disabler",
      "Support",
      "Nuker",
      "Escape"
    ],
    "overallWin": 0.484,
    "winByBracket": {
      "herald": 0.506,
      "guardian": 0.496,
      "crusader": 0.484,
      "archon": 0.479,
      "legend": 0.47,
      "ancient": 0.472,
      "divine": 0.467
    },
    "pickByBracket": {
      "herald": 13816,
      "guardian": 23750,
      "crusader": 23556,
      "archon": 19926,
      "legend": 14469,
      "ancient": 9302,
      "divine": 8426
    },
    "counters": [
      "muerta",
      "underlord",
      "ursa",
      "void-spirit",
      "lion",
      "templar-assassin"
    ],
    "weakAgainst": [
      "warlock",
      "phoenix",
      "luna",
      "abaddon",
      "alchemist",
      "pudge"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Circlet",
      "Quelling Blade",
      "Faerie Fire"
    ],
    "coreItems": [
      "Ogre Axe",
      "Staff of Wizardry",
      "Blink Dagger",
      "Point Booster",
      "Blade of Alacrity"
    ]
  },
  {
    "id": "shadow-demon",
    "numericId": 79,
    "name": "Shadow Demon",
    "shortName": "shadow_demon",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Disabler",
      "Initiator",
      "Nuker"
    ],
    "overallWin": 0.452,
    "winByBracket": {
      "herald": 0.431,
      "guardian": 0.434,
      "crusader": 0.447,
      "archon": 0.456,
      "legend": 0.463,
      "ancient": 0.462,
      "divine": 0.467
    },
    "pickByBracket": {
      "herald": 4600,
      "guardian": 9108,
      "crusader": 10970,
      "archon": 10948,
      "legend": 9243,
      "ancient": 6707,
      "divine": 8164
    },
    "counters": [
      "medusa",
      "phantom-lancer",
      "outworld-devourer",
      "weaver",
      "primal-beast",
      "warlock"
    ],
    "weakAgainst": [
      "naga-siren",
      "alchemist",
      "chen",
      "grimstroke",
      "zeus",
      "techies"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Faerie Fire",
      "Observer and Sentry Wards",
      "Sentry Ward"
    ],
    "coreItems": [
      "Blink Dagger",
      "Arcane Boots",
      "Aghanim's Shard",
      "Aether Lens",
      "Staff of Wizardry"
    ]
  },
  {
    "id": "shadow-fiend",
    "numericId": 11,
    "name": "Shadow Fiend",
    "shortName": "nevermore",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker"
    ],
    "overallWin": 0.488,
    "winByBracket": {
      "herald": 0.485,
      "guardian": 0.492,
      "crusader": 0.487,
      "archon": 0.487,
      "legend": 0.487,
      "ancient": 0.485,
      "divine": 0.488
    },
    "pickByBracket": {
      "herald": 38016,
      "guardian": 74297,
      "crusader": 81155,
      "archon": 73246,
      "legend": 56251,
      "ancient": 38395,
      "divine": 45223
    },
    "counters": [
      "winter-wyvern",
      "anti-mage",
      "pugna",
      "morphling",
      "night-stalker",
      "legion-commander"
    ],
    "weakAgainst": [
      "lone-druid",
      "enigma",
      "alchemist",
      "phoenix",
      "io",
      "omniknight"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Magic Wand",
      "Tango",
      "Observer Ward",
      "Magic Stick"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Claymore",
      "Yasha",
      "Dragon Lance",
      "Staff of Wizardry"
    ]
  },
  {
    "id": "shadow-shaman",
    "numericId": 27,
    "name": "Shadow Shaman",
    "shortName": "shadow_shaman",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Pusher",
      "Disabler",
      "Nuker",
      "Initiator"
    ],
    "overallWin": 0.52,
    "winByBracket": {
      "herald": 0.521,
      "guardian": 0.518,
      "crusader": 0.521,
      "archon": 0.521,
      "legend": 0.52,
      "ancient": 0.525,
      "divine": 0.515
    },
    "pickByBracket": {
      "herald": 47923,
      "guardian": 86610,
      "crusader": 88302,
      "archon": 74203,
      "legend": 53169,
      "ancient": 33121,
      "divine": 32658
    },
    "counters": [
      "medusa",
      "huskar",
      "tinker",
      "phantom-assassin",
      "morphling",
      "bristleback"
    ],
    "weakAgainst": [
      "oracle",
      "beastmaster",
      "bane",
      "naga-siren",
      "treant-protector",
      "phantom-lancer"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Magic Stick",
      "Observer and Sentry Wards",
      "Sentry Ward"
    ],
    "coreItems": [
      "Blink Dagger",
      "Arcane Boots",
      "Aether Lens",
      "Glimmer Cape",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "silencer",
    "numericId": 75,
    "name": "Silencer",
    "shortName": "silencer",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Support",
      "Disabler",
      "Initiator",
      "Nuker"
    ],
    "overallWin": 0.509,
    "winByBracket": {
      "herald": 0.524,
      "guardian": 0.514,
      "crusader": 0.511,
      "archon": 0.508,
      "legend": 0.504,
      "ancient": 0.501,
      "divine": 0.501
    },
    "pickByBracket": {
      "herald": 31403,
      "guardian": 66514,
      "crusader": 71824,
      "archon": 63897,
      "legend": 47428,
      "ancient": 30211,
      "divine": 30272
    },
    "counters": [
      "death-prophet",
      "vengeful-spirit",
      "timbersaw",
      "lina",
      "chaos-knight",
      "ursa"
    ],
    "weakAgainst": [
      "huskar",
      "razor",
      "viper",
      "leshrac",
      "clockwerk",
      "keeper-of-the-light"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Faerie Fire",
      "Sentry Ward"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Arcane Boots",
      "Force Staff",
      "Glimmer Cape",
      "Drum of Endurance"
    ]
  },
  {
    "id": "skywrath-mage",
    "numericId": 101,
    "name": "Skywrath Mage",
    "shortName": "skywrath_mage",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.5,
    "winByBracket": {
      "herald": 0.506,
      "guardian": 0.504,
      "crusader": 0.504,
      "archon": 0.496,
      "legend": 0.497,
      "ancient": 0.499,
      "divine": 0.489
    },
    "pickByBracket": {
      "herald": 36711,
      "guardian": 68334,
      "crusader": 71803,
      "archon": 61490,
      "legend": 46131,
      "ancient": 29982,
      "divine": 30373
    },
    "counters": [
      "death-prophet",
      "ancient-apparition",
      "witch-doctor",
      "dragon-knight",
      "bane",
      "faceless-void"
    ],
    "weakAgainst": [
      "treant-protector",
      "lycan",
      "dazzle",
      "monkey-king",
      "clinkz",
      "ring-master"
    ],
    "startItems": [
      "Tango",
      "Circlet",
      "Blood Grenade",
      "Mantle of Intelligence",
      "Iron Branch",
      "Sentry Ward"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Arcane Boots",
      "Vitality Booster",
      "Aghanim's Shard",
      "Rod of Atos"
    ]
  },
  {
    "id": "slardar",
    "numericId": 28,
    "name": "Slardar",
    "shortName": "slardar",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Durable",
      "Initiator",
      "Disabler",
      "Escape"
    ],
    "overallWin": 0.495,
    "winByBracket": {
      "herald": 0.499,
      "guardian": 0.494,
      "crusader": 0.497,
      "archon": 0.493,
      "legend": 0.494,
      "ancient": 0.494,
      "divine": 0.489
    },
    "pickByBracket": {
      "herald": 22706,
      "guardian": 42836,
      "crusader": 45662,
      "archon": 41333,
      "legend": 31832,
      "ancient": 21142,
      "divine": 22945
    },
    "counters": [
      "lina",
      "weaver",
      "lifestealer",
      "sand-king",
      "viper",
      "enchantress"
    ],
    "weakAgainst": [
      "earth-spirit",
      "vengeful-spirit",
      "marci",
      "winter-wyvern",
      "zeus",
      "crystal-maiden"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Circlet",
      "Quelling Blade",
      "Observer Ward"
    ],
    "coreItems": [
      "Blink Dagger",
      "Ogre Axe",
      "Aghanim's Shard",
      "Mithril Hammer",
      "Black King Bar"
    ]
  },
  {
    "id": "slark",
    "numericId": 93,
    "name": "Slark",
    "shortName": "slark",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.498,
    "winByBracket": {
      "herald": 0.509,
      "guardian": 0.498,
      "crusader": 0.492,
      "archon": 0.495,
      "legend": 0.498,
      "ancient": 0.494,
      "divine": 0.508
    },
    "pickByBracket": {
      "herald": 27462,
      "guardian": 58768,
      "crusader": 67111,
      "archon": 61205,
      "legend": 46183,
      "ancient": 28960,
      "divine": 29558
    },
    "counters": [
      "muerta",
      "warlock",
      "beastmaster",
      "pudge",
      "storm-spirit",
      "tidehunter"
    ],
    "weakAgainst": [
      "leshrac",
      "spirit-breaker",
      "treant-protector",
      "lion",
      "snapfire",
      "dawnbreaker"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Magic Stick",
      "Faerie Fire",
      "Circlet"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Ogre Axe",
      "Diffusal Blade",
      "Staff of Wizardry",
      "Point Booster"
    ]
  },
  {
    "id": "snapfire",
    "numericId": 128,
    "name": "Snapfire",
    "shortName": "snapfire",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Disabler",
      "Escape"
    ],
    "overallWin": 0.525,
    "winByBracket": {
      "herald": 0.511,
      "guardian": 0.522,
      "crusader": 0.527,
      "archon": 0.529,
      "legend": 0.526,
      "ancient": 0.526,
      "divine": 0.522
    },
    "pickByBracket": {
      "herald": 33112,
      "guardian": 81937,
      "crusader": 108154,
      "archon": 113480,
      "legend": 95456,
      "ancient": 67930,
      "divine": 76935
    },
    "counters": [
      "tinker",
      "winter-wyvern",
      "death-prophet",
      "witch-doctor",
      "phantom-lancer",
      "grimstroke"
    ],
    "weakAgainst": [
      "bounty-hunter",
      "io",
      "clinkz",
      "broodmother",
      "treant-protector",
      "chen"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Blood Grenade",
      "Gauntlets of Strength",
      "Observer Ward"
    ],
    "coreItems": [
      "Aghanim's Shard",
      "Staff of Wizardry",
      "Blink Dagger",
      "Kaya",
      "Blade of Alacrity"
    ]
  },
  {
    "id": "sniper",
    "numericId": 35,
    "name": "Sniper",
    "shortName": "sniper",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker"
    ],
    "overallWin": 0.501,
    "winByBracket": {
      "herald": 0.513,
      "guardian": 0.508,
      "crusader": 0.504,
      "archon": 0.499,
      "legend": 0.49,
      "ancient": 0.488,
      "divine": 0.485
    },
    "pickByBracket": {
      "herald": 69719,
      "guardian": 128668,
      "crusader": 131351,
      "archon": 108775,
      "legend": 73220,
      "ancient": 42319,
      "divine": 35145
    },
    "counters": [
      "weaver",
      "grimstroke",
      "witch-doctor",
      "faceless-void",
      "death-prophet",
      "lich"
    ],
    "weakAgainst": [
      "ember-spirit",
      "nature-s-prophet",
      "earthshaker",
      "crystal-maiden",
      "drow-ranger",
      "terrorblade"
    ],
    "startItems": [
      "Iron Branch",
      "Slippers of Agility",
      "Circlet",
      "Observer Ward",
      "Tango",
      "Faerie Fire"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Dragon Lance",
      "Mithril Hammer",
      "Staff of Wizardry",
      "Maelstrom"
    ]
  },
  {
    "id": "spectre",
    "numericId": 67,
    "name": "Spectre",
    "shortName": "spectre",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Durable",
      "Escape"
    ],
    "overallWin": 0.547,
    "winByBracket": {
      "herald": 0.561,
      "guardian": 0.552,
      "crusader": 0.55,
      "archon": 0.544,
      "legend": 0.543,
      "ancient": 0.538,
      "divine": 0.534
    },
    "pickByBracket": {
      "herald": 33721,
      "guardian": 66285,
      "crusader": 68552,
      "archon": 59019,
      "legend": 42453,
      "ancient": 27368,
      "divine": 27457
    },
    "counters": [],
    "weakAgainst": [
      "mars"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Circlet",
      "Faerie Fire"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Sacred Relic",
      "Talisman of Evasion",
      "Yasha",
      "Radiance"
    ]
  },
  {
    "id": "spirit-breaker",
    "numericId": 71,
    "name": "Spirit Breaker",
    "shortName": "spirit_breaker",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Initiator",
      "Disabler",
      "Durable",
      "Escape"
    ],
    "overallWin": 0.517,
    "winByBracket": {
      "herald": 0.518,
      "guardian": 0.519,
      "crusader": 0.519,
      "archon": 0.517,
      "legend": 0.512,
      "ancient": 0.518,
      "divine": 0.513
    },
    "pickByBracket": {
      "herald": 44318,
      "guardian": 81273,
      "crusader": 85311,
      "archon": 75875,
      "legend": 56415,
      "ancient": 36336,
      "divine": 37370
    },
    "counters": [
      "clinkz",
      "ancient-apparition",
      "death-prophet",
      "phantom-lancer",
      "silencer",
      "earthshaker"
    ],
    "weakAgainst": [
      "treant-protector",
      "keeper-of-the-light",
      "huskar",
      "monkey-king",
      "viper",
      "marci"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Boots of Speed",
      "Blood Grenade",
      "Sentry Ward",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Claymore",
      "Blitz Knuckles",
      "Drum of Endurance",
      "Phase Boots",
      "Shadow Blade"
    ]
  },
  {
    "id": "storm-spirit",
    "numericId": 17,
    "name": "Storm Spirit",
    "shortName": "storm_spirit",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Escape",
      "Nuker",
      "Initiator",
      "Disabler"
    ],
    "overallWin": 0.471,
    "winByBracket": {
      "herald": 0.466,
      "guardian": 0.463,
      "crusader": 0.469,
      "archon": 0.472,
      "legend": 0.475,
      "ancient": 0.474,
      "divine": 0.485
    },
    "pickByBracket": {
      "herald": 20405,
      "guardian": 40136,
      "crusader": 44410,
      "archon": 40849,
      "legend": 32397,
      "ancient": 22554,
      "divine": 26088
    },
    "counters": [
      "legion-commander",
      "bounty-hunter",
      "techies",
      "sven",
      "naga-siren",
      "void-spirit"
    ],
    "weakAgainst": [
      "mirana",
      "chen",
      "treant-protector",
      "huskar",
      "lycan",
      "marci"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Faerie Fire",
      "Magic Wand",
      "Circlet"
    ],
    "coreItems": [
      "Ogre Axe",
      "Kaya",
      "Staff of Wizardry",
      "Sange",
      "Kaya and Sange"
    ]
  },
  {
    "id": "sven",
    "numericId": 18,
    "name": "Sven",
    "shortName": "sven",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Disabler",
      "Initiator",
      "Durable",
      "Nuker"
    ],
    "overallWin": 0.503,
    "winByBracket": {
      "herald": 0.495,
      "guardian": 0.497,
      "crusader": 0.501,
      "archon": 0.503,
      "legend": 0.513,
      "ancient": 0.509,
      "divine": 0.514
    },
    "pickByBracket": {
      "herald": 17675,
      "guardian": 28616,
      "crusader": 26945,
      "archon": 21206,
      "legend": 15233,
      "ancient": 9429,
      "divine": 9109
    },
    "counters": [
      "morphling",
      "phantom-lancer",
      "skywrath-mage",
      "chaos-knight",
      "legion-commander",
      "axe"
    ],
    "weakAgainst": [
      "kunkka",
      "brewmaster",
      "lycan",
      "earthshaker",
      "bane",
      "necrophos"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Magic Stick",
      "Gauntlets of Strength",
      "Circlet"
    ],
    "coreItems": [
      "Broadsword",
      "Ogre Axe",
      "Echo Sabre",
      "Blink Dagger",
      "Claymore"
    ]
  },
  {
    "id": "techies",
    "numericId": 105,
    "name": "Techies",
    "shortName": "techies",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.509,
    "winByBracket": {
      "herald": 0.51,
      "guardian": 0.513,
      "crusader": 0.511,
      "archon": 0.507,
      "legend": 0.506,
      "ancient": 0.502,
      "divine": 0.504
    },
    "pickByBracket": {
      "herald": 32332,
      "guardian": 58754,
      "crusader": 59890,
      "archon": 51627,
      "legend": 38394,
      "ancient": 25734,
      "divine": 27338
    },
    "counters": [
      "vengeful-spirit",
      "grimstroke",
      "luna",
      "dragon-knight",
      "disruptor",
      "shadow-demon"
    ],
    "weakAgainst": [
      "phoenix",
      "muerta",
      "storm-spirit",
      "juggernaut",
      "beastmaster",
      "clockwerk"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Faerie Fire",
      "Sentry Ward",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Arcane Boots",
      "Aether Lens",
      "Glimmer Cape",
      "Pavise"
    ]
  },
  {
    "id": "templar-assassin",
    "numericId": 46,
    "name": "Templar Assassin",
    "shortName": "templar_assassin",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Escape"
    ],
    "overallWin": 0.461,
    "winByBracket": {
      "herald": 0.45,
      "guardian": 0.451,
      "crusader": 0.457,
      "archon": 0.466,
      "legend": 0.47,
      "ancient": 0.476,
      "divine": 0.465
    },
    "pickByBracket": {
      "herald": 12852,
      "guardian": 24045,
      "crusader": 24559,
      "archon": 21435,
      "legend": 16248,
      "ancient": 11062,
      "divine": 12899
    },
    "counters": [
      "weaver",
      "dark-seer",
      "kunkka",
      "anti-mage",
      "phantom-assassin",
      "batrider"
    ],
    "weakAgainst": [
      "grimstroke",
      "treant-protector",
      "naga-siren",
      "huskar",
      "bane",
      "bristleback"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Tango",
      "Magic Wand",
      "Circlet",
      "Magic Stick"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Desolator",
      "Blink Dagger",
      "Dragon Lance",
      "Blade of Alacrity"
    ]
  },
  {
    "id": "terrorblade",
    "numericId": 109,
    "name": "Terrorblade",
    "shortName": "terrorblade",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Pusher",
      "Nuker"
    ],
    "overallWin": 0.476,
    "winByBracket": {
      "herald": 0.485,
      "guardian": 0.46,
      "crusader": 0.471,
      "archon": 0.482,
      "legend": 0.478,
      "ancient": 0.477,
      "divine": 0.493
    },
    "pickByBracket": {
      "herald": 12111,
      "guardian": 20288,
      "crusader": 19187,
      "archon": 15929,
      "legend": 11927,
      "ancient": 8181,
      "divine": 11779
    },
    "counters": [
      "death-prophet",
      "kunkka",
      "bristleback",
      "phantom-lancer",
      "razor",
      "magnus"
    ],
    "weakAgainst": [
      "chen",
      "phoenix",
      "morphling",
      "abaddon",
      "primal-beast",
      "spirit-breaker"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Magic Stick",
      "Faerie Fire",
      "Circlet"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Yasha",
      "Diadem",
      "Manta Style",
      "Dragon Lance"
    ]
  },
  {
    "id": "tidehunter",
    "numericId": 29,
    "name": "Tidehunter",
    "shortName": "tidehunter",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Durable",
      "Disabler",
      "Nuker",
      "Carry"
    ],
    "overallWin": 0.5,
    "winByBracket": {
      "herald": 0.502,
      "guardian": 0.503,
      "crusader": 0.502,
      "archon": 0.502,
      "legend": 0.496,
      "ancient": 0.497,
      "divine": 0.494
    },
    "pickByBracket": {
      "herald": 20808,
      "guardian": 43339,
      "crusader": 49874,
      "archon": 46374,
      "legend": 36256,
      "ancient": 24763,
      "divine": 27360
    },
    "counters": [
      "faceless-void",
      "mirana",
      "dark-willow",
      "spirit-breaker",
      "necrophos",
      "sven"
    ],
    "weakAgainst": [
      "treant-protector",
      "clockwerk",
      "clinkz",
      "huskar",
      "grimstroke",
      "bane"
    ],
    "startItems": [
      "Gauntlets of Strength",
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Circlet",
      "Magic Stick"
    ],
    "coreItems": [
      "Blink Dagger",
      "Ogre Axe",
      "Staff of Wizardry",
      "Point Booster",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "timbersaw",
    "numericId": 98,
    "name": "Timbersaw",
    "shortName": "shredder",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Nuker",
      "Durable",
      "Escape"
    ],
    "overallWin": 0.447,
    "winByBracket": {
      "herald": 0.452,
      "guardian": 0.442,
      "crusader": 0.453,
      "archon": 0.44,
      "legend": 0.447,
      "ancient": 0.445,
      "divine": 0.449
    },
    "pickByBracket": {
      "herald": 9948,
      "guardian": 20228,
      "crusader": 23241,
      "archon": 22734,
      "legend": 18615,
      "ancient": 13440,
      "divine": 16154
    },
    "counters": [
      "morphling",
      "anti-mage",
      "lina",
      "witch-doctor",
      "centaur-warrunner",
      "troll-warlord"
    ],
    "weakAgainst": [
      "largo",
      "nyx-assassin",
      "bounty-hunter",
      "bane",
      "treant-protector",
      "alchemist"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Magic Stick",
      "Circlet",
      "Quelling Blade"
    ],
    "coreItems": [
      "Ogre Axe",
      "Staff of Wizardry",
      "Kaya",
      "Sange",
      "Kaya and Sange"
    ]
  },
  {
    "id": "tinker",
    "numericId": 34,
    "name": "Tinker",
    "shortName": "tinker",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Nuker",
      "Pusher"
    ],
    "overallWin": 0.472,
    "winByBracket": {
      "herald": 0.445,
      "guardian": 0.458,
      "crusader": 0.468,
      "archon": 0.48,
      "legend": 0.476,
      "ancient": 0.488,
      "divine": 0.5
    },
    "pickByBracket": {
      "herald": 14165,
      "guardian": 26229,
      "crusader": 26109,
      "archon": 21953,
      "legend": 16760,
      "ancient": 11336,
      "divine": 13186
    },
    "counters": [
      "invoker",
      "beastmaster",
      "dragon-knight",
      "axe"
    ],
    "weakAgainst": [
      "dawnbreaker",
      "snapfire",
      "queen-of-pain",
      "shadow-shaman",
      "tusk",
      "jakiro"
    ],
    "startItems": [
      "Iron Branch",
      "Observer Ward",
      "Tango",
      "Faerie Fire",
      "Circlet",
      "Mantle of Intelligence"
    ],
    "coreItems": [
      "Ogre Axe",
      "Point Booster",
      "Staff of Wizardry",
      "Blade of Alacrity",
      "Blink Dagger"
    ]
  },
  {
    "id": "tiny",
    "numericId": 19,
    "name": "Tiny",
    "shortName": "tiny",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Nuker",
      "Pusher",
      "Initiator",
      "Durable",
      "Disabler"
    ],
    "overallWin": 0.449,
    "winByBracket": {
      "herald": 0.453,
      "guardian": 0.447,
      "crusader": 0.447,
      "archon": 0.443,
      "legend": 0.449,
      "ancient": 0.444,
      "divine": 0.461
    },
    "pickByBracket": {
      "herald": 15541,
      "guardian": 27633,
      "crusader": 30151,
      "archon": 29429,
      "legend": 23912,
      "ancient": 17650,
      "divine": 21684
    },
    "counters": [
      "death-prophet",
      "weaver",
      "tinker",
      "bristleback",
      "void-spirit",
      "dark-seer"
    ],
    "weakAgainst": [
      "bane",
      "naga-siren",
      "lycan",
      "enigma",
      "oracle",
      "largo"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Quelling Blade",
      "Magic Stick",
      "Circlet",
      "Gauntlets of Strength"
    ],
    "coreItems": [
      "Claymore",
      "Blitz Knuckles",
      "Echo Sabre",
      "Shadow Blade",
      "Ogre Axe"
    ]
  },
  {
    "id": "treant-protector",
    "numericId": 83,
    "name": "Treant Protector",
    "shortName": "treant",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Support",
      "Initiator",
      "Durable",
      "Disabler",
      "Escape"
    ],
    "overallWin": 0.503,
    "winByBracket": {
      "herald": 0.489,
      "guardian": 0.486,
      "crusader": 0.492,
      "archon": 0.506,
      "legend": 0.503,
      "ancient": 0.507,
      "divine": 0.534
    },
    "pickByBracket": {
      "herald": 9189,
      "guardian": 17793,
      "crusader": 19953,
      "archon": 19156,
      "legend": 15551,
      "ancient": 11901,
      "divine": 18529
    },
    "counters": [
      "monkey-king",
      "invoker",
      "razor",
      "spirit-breaker",
      "gyrocopter",
      "windranger"
    ],
    "weakAgainst": [],
    "startItems": [
      "Observer and Sentry Wards",
      "Blood Grenade",
      "Boots of Speed",
      "Iron Branch",
      "Smoke of Deceit",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Blink Dagger",
      "Pavise",
      "Essence Distiller",
      "Solar Crest"
    ]
  },
  {
    "id": "troll-warlord",
    "numericId": 95,
    "name": "Troll Warlord",
    "shortName": "troll_warlord",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Pusher",
      "Disabler",
      "Durable"
    ],
    "overallWin": 0.512,
    "winByBracket": {
      "herald": 0.523,
      "guardian": 0.517,
      "crusader": 0.522,
      "archon": 0.498,
      "legend": 0.501,
      "ancient": 0.495,
      "divine": 0.495
    },
    "pickByBracket": {
      "herald": 14829,
      "guardian": 18584,
      "crusader": 15260,
      "archon": 11478,
      "legend": 7755,
      "ancient": 4792,
      "divine": 4295
    },
    "counters": [
      "silencer",
      "dark-willow",
      "medusa",
      "lifestealer",
      "tidehunter",
      "bristleback"
    ],
    "weakAgainst": [
      "ring-master",
      "abaddon",
      "invoker",
      "pudge",
      "timbersaw",
      "lion"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Magic Stick",
      "Tango",
      "Circlet",
      "Magic Wand"
    ],
    "coreItems": [
      "Ogre Axe",
      "Broadsword",
      "Blade of Alacrity",
      "Battle Fury",
      "Yasha"
    ]
  },
  {
    "id": "tusk",
    "numericId": 100,
    "name": "Tusk",
    "shortName": "tusk",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Initiator",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.481,
    "winByBracket": {
      "herald": 0.453,
      "guardian": 0.456,
      "crusader": 0.471,
      "archon": 0.482,
      "legend": 0.486,
      "ancient": 0.495,
      "divine": 0.501
    },
    "pickByBracket": {
      "herald": 8176,
      "guardian": 18129,
      "crusader": 24748,
      "archon": 26777,
      "legend": 24378,
      "ancient": 19150,
      "divine": 24970
    },
    "counters": [
      "legion-commander",
      "wraith-king",
      "ancient-apparition",
      "magnus",
      "tinker",
      "lifestealer"
    ],
    "weakAgainst": [
      "treant-protector",
      "broodmother",
      "dark-seer",
      "venomancer",
      "pugna",
      "muerta"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Sentry Ward",
      "Magic Stick"
    ],
    "coreItems": [
      "Blink Dagger",
      "Staff of Wizardry",
      "Phase Boots",
      "Ogre Axe",
      "Force Staff"
    ]
  },
  {
    "id": "underlord",
    "numericId": 108,
    "name": "Underlord",
    "shortName": "abyssal_underlord",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Support",
      "Nuker",
      "Disabler",
      "Durable",
      "Escape"
    ],
    "overallWin": 0.498,
    "winByBracket": {
      "herald": 0.514,
      "guardian": 0.517,
      "crusader": 0.505,
      "archon": 0.498,
      "legend": 0.492,
      "ancient": 0.487,
      "divine": 0.471
    },
    "pickByBracket": {
      "herald": 13595,
      "guardian": 30366,
      "crusader": 36935,
      "archon": 37098,
      "legend": 30518,
      "ancient": 21637,
      "divine": 23098
    },
    "counters": [
      "ancient-apparition",
      "abaddon",
      "gyrocopter",
      "zeus",
      "mars",
      "primal-beast"
    ],
    "weakAgainst": [
      "treant-protector",
      "necrophos",
      "ursa",
      "phoenix",
      "monkey-king",
      "lina"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Circlet",
      "Magic Stick",
      "Quelling Blade"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Vitality Booster",
      "Rod of Atos",
      "Ogre Axe",
      "Point Booster"
    ]
  },
  {
    "id": "undying",
    "numericId": 85,
    "name": "Undying",
    "shortName": "undying",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Support",
      "Durable",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.522,
    "winByBracket": {
      "herald": 0.519,
      "guardian": 0.519,
      "crusader": 0.523,
      "archon": 0.519,
      "legend": 0.527,
      "ancient": 0.53,
      "divine": 0.52
    },
    "pickByBracket": {
      "herald": 29047,
      "guardian": 57241,
      "crusader": 61454,
      "archon": 53214,
      "legend": 38676,
      "ancient": 25875,
      "divine": 28804
    },
    "counters": [
      "death-prophet",
      "weaver",
      "phantom-lancer",
      "night-stalker",
      "underlord",
      "lion"
    ],
    "weakAgainst": [
      "monkey-king",
      "naga-siren",
      "beastmaster",
      "dark-seer",
      "earthshaker",
      "marci"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Enchanted Mango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Magic Stick"
    ],
    "coreItems": [
      "Arcane Boots",
      "Mekansm",
      "Staff of Wizardry",
      "Ogre Axe",
      "Guardian Greaves"
    ]
  },
  {
    "id": "ursa",
    "numericId": 70,
    "name": "Ursa",
    "shortName": "ursa",
    "primaryAttr": "agi",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Durable",
      "Disabler"
    ],
    "overallWin": 0.468,
    "winByBracket": {
      "herald": 0.444,
      "guardian": 0.464,
      "crusader": 0.467,
      "archon": 0.471,
      "legend": 0.471,
      "ancient": 0.476,
      "divine": 0.481
    },
    "pickByBracket": {
      "herald": 18182,
      "guardian": 34445,
      "crusader": 38276,
      "archon": 34790,
      "legend": 26997,
      "ancient": 17467,
      "divine": 18003
    },
    "counters": [
      "underlord",
      "muerta",
      "phantom-assassin",
      "timbersaw",
      "morphling",
      "grimstroke"
    ],
    "weakAgainst": [
      "mirana",
      "enigma",
      "treant-protector",
      "alchemist",
      "lycan",
      "bounty-hunter"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Faerie Fire",
      "Circlet"
    ],
    "coreItems": [
      "Broadsword",
      "Mithril Hammer",
      "Blink Dagger",
      "Battle Fury",
      "Skull Basher"
    ]
  },
  {
    "id": "vengeful-spirit",
    "numericId": 20,
    "name": "Vengeful Spirit",
    "shortName": "vengefulspirit",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Initiator",
      "Disabler",
      "Nuker",
      "Escape"
    ],
    "overallWin": 0.533,
    "winByBracket": {
      "herald": 0.536,
      "guardian": 0.538,
      "crusader": 0.535,
      "archon": 0.535,
      "legend": 0.533,
      "ancient": 0.53,
      "divine": 0.516
    },
    "pickByBracket": {
      "herald": 23552,
      "guardian": 49323,
      "crusader": 58787,
      "archon": 57960,
      "legend": 46345,
      "ancient": 31461,
      "divine": 31768
    },
    "counters": [
      "void-spirit",
      "slardar",
      "lich",
      "timbersaw",
      "morphling",
      "warlock"
    ],
    "weakAgainst": [
      "techies",
      "beastmaster",
      "phoenix",
      "batrider",
      "ring-master",
      "dawnbreaker"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Magic Stick",
      "Blood Grenade",
      "Circlet",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Staff of Wizardry",
      "Ogre Axe",
      "Broadsword",
      "Specialist's Array"
    ]
  },
  {
    "id": "venomancer",
    "numericId": 40,
    "name": "Venomancer",
    "shortName": "venomancer",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Initiator",
      "Pusher",
      "Disabler"
    ],
    "overallWin": 0.467,
    "winByBracket": {
      "herald": 0.467,
      "guardian": 0.467,
      "crusader": 0.465,
      "archon": 0.471,
      "legend": 0.468,
      "ancient": 0.469,
      "divine": 0.462
    },
    "pickByBracket": {
      "herald": 27131,
      "guardian": 50805,
      "crusader": 54485,
      "archon": 47428,
      "legend": 34391,
      "ancient": 21315,
      "divine": 19687
    },
    "counters": [
      "dragon-knight",
      "weaver",
      "clockwerk",
      "warlock",
      "zeus",
      "storm-spirit"
    ],
    "weakAgainst": [
      "ember-spirit",
      "legion-commander",
      "batrider",
      "invoker",
      "pudge",
      "slardar"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Faerie Fire",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Staff of Wizardry",
      "Spirit Vessel",
      "Diadem",
      "Mekansm"
    ]
  },
  {
    "id": "viper",
    "numericId": 47,
    "name": "Viper",
    "shortName": "viper",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Durable",
      "Initiator",
      "Disabler"
    ],
    "overallWin": 0.484,
    "winByBracket": {
      "herald": 0.482,
      "guardian": 0.478,
      "crusader": 0.487,
      "archon": 0.486,
      "legend": 0.483,
      "ancient": 0.486,
      "divine": 0.491
    },
    "pickByBracket": {
      "herald": 36065,
      "guardian": 50223,
      "crusader": 46468,
      "archon": 37760,
      "legend": 26350,
      "ancient": 16280,
      "divine": 17363
    },
    "counters": [
      "bristleback",
      "silencer",
      "morphling",
      "ancient-apparition",
      "tidehunter",
      "dragon-knight"
    ],
    "weakAgainst": [
      "death-prophet",
      "slardar",
      "dazzle",
      "primal-beast",
      "nyx-assassin",
      "windranger"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Tango",
      "Faerie Fire",
      "Observer Ward",
      "Slippers of Agility"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Staff of Wizardry",
      "Dragon Lance",
      "Force Staff",
      "Hurricane Pike"
    ]
  },
  {
    "id": "visage",
    "numericId": 92,
    "name": "Visage",
    "shortName": "visage",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Durable",
      "Disabler",
      "Pusher"
    ],
    "overallWin": 0.524,
    "winByBracket": {
      "herald": 0.501,
      "guardian": 0.514,
      "crusader": 0.521,
      "archon": 0.527,
      "legend": 0.537,
      "ancient": 0.53,
      "divine": 0.547
    },
    "pickByBracket": {
      "herald": 4542,
      "guardian": 7981,
      "crusader": 8147,
      "archon": 6864,
      "legend": 5190,
      "ancient": 3603,
      "divine": 4986
    },
    "counters": [
      "rubick"
    ],
    "weakAgainst": [
      "shadow-fiend"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Enchanted Mango",
      "Tango",
      "Faerie Fire",
      "Magic Stick"
    ],
    "coreItems": [
      "Drum of Endurance",
      "Ring of Tarrasque",
      "Vladmir's Offering",
      "Boots of Bearing",
      "Aghanim's Shard"
    ]
  },
  {
    "id": "void-spirit",
    "numericId": 126,
    "name": "Void Spirit",
    "shortName": "void_spirit",
    "primaryAttr": "all",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Escape",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.495,
    "winByBracket": {
      "herald": 0.481,
      "guardian": 0.488,
      "crusader": 0.492,
      "archon": 0.499,
      "legend": 0.502,
      "ancient": 0.501,
      "divine": 0.493
    },
    "pickByBracket": {
      "herald": 8829,
      "guardian": 17647,
      "crusader": 22178,
      "archon": 23512,
      "legend": 21230,
      "ancient": 15931,
      "divine": 21055
    },
    "counters": [
      "zeus",
      "weaver",
      "sven",
      "earthshaker",
      "dazzle",
      "muerta"
    ],
    "weakAgainst": [
      "naga-siren",
      "nyx-assassin",
      "phoenix",
      "magnus",
      "treant-protector",
      "alchemist"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Faerie Fire",
      "Quelling Blade",
      "Circlet"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Blade of Alacrity",
      "Aghanim's Shard",
      "Diadem",
      "Spirit Vessel"
    ]
  },
  {
    "id": "warlock",
    "numericId": 37,
    "name": "Warlock",
    "shortName": "warlock",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Initiator",
      "Disabler"
    ],
    "overallWin": 0.499,
    "winByBracket": {
      "herald": 0.51,
      "guardian": 0.512,
      "crusader": 0.502,
      "archon": 0.497,
      "legend": 0.491,
      "ancient": 0.492,
      "divine": 0.473
    },
    "pickByBracket": {
      "herald": 19561,
      "guardian": 37832,
      "crusader": 40470,
      "archon": 34786,
      "legend": 24721,
      "ancient": 15348,
      "divine": 14875
    },
    "counters": [
      "sand-king",
      "drow-ranger",
      "ancient-apparition",
      "alchemist",
      "axe",
      "pangolier"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "slark",
      "treant-protector",
      "dazzle",
      "venomancer",
      "pudge"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Magic Stick",
      "Sentry Ward",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Glimmer Cape",
      "Arcane Boots",
      "Aghanim's Shard",
      "Staff of Wizardry",
      "Point Booster"
    ]
  },
  {
    "id": "weaver",
    "numericId": 63,
    "name": "Weaver",
    "shortName": "weaver",
    "primaryAttr": "agi",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Escape"
    ],
    "overallWin": 0.471,
    "winByBracket": {
      "herald": 0.478,
      "guardian": 0.467,
      "crusader": 0.472,
      "archon": 0.47,
      "legend": 0.47,
      "ancient": 0.468,
      "divine": 0.47
    },
    "pickByBracket": {
      "herald": 23915,
      "guardian": 38495,
      "crusader": 38177,
      "archon": 31996,
      "legend": 23384,
      "ancient": 14226,
      "divine": 14810
    },
    "counters": [
      "crystal-maiden",
      "sven",
      "gyrocopter",
      "brewmaster",
      "lich",
      "queen-of-pain"
    ],
    "weakAgainst": [
      "morphling",
      "monkey-king",
      "puck",
      "templar-assassin",
      "venomancer",
      "centaur-warrunner"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Tango",
      "Circlet",
      "Magic Wand",
      "Magic Stick"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Blade of Alacrity",
      "Aghanim's Shard",
      "Dragon Lance",
      "Desolator"
    ]
  },
  {
    "id": "windranger",
    "numericId": 21,
    "name": "Windranger",
    "shortName": "windrunner",
    "primaryAttr": "all",
    "attackType": "Ranged",
    "roles": [
      "Carry",
      "Support",
      "Disabler",
      "Escape",
      "Nuker"
    ],
    "overallWin": 0.479,
    "winByBracket": {
      "herald": 0.476,
      "guardian": 0.474,
      "crusader": 0.475,
      "archon": 0.481,
      "legend": 0.479,
      "ancient": 0.487,
      "divine": 0.489
    },
    "pickByBracket": {
      "herald": 38690,
      "guardian": 68303,
      "crusader": 74498,
      "archon": 69024,
      "legend": 53187,
      "ancient": 36900,
      "divine": 41154
    },
    "counters": [
      "oracle",
      "chaos-knight",
      "phantom-lancer",
      "morphling",
      "lina",
      "sand-king"
    ],
    "weakAgainst": [
      "treant-protector",
      "naga-siren",
      "enigma",
      "lone-druid",
      "bane",
      "clockwerk"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Tango",
      "Faerie Fire",
      "Blood Grenade",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Blade of Alacrity",
      "Maelstrom",
      "Ogre Axe",
      "Hyperstone"
    ]
  },
  {
    "id": "winter-wyvern",
    "numericId": 112,
    "name": "Winter Wyvern",
    "shortName": "winter_wyvern",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Disabler",
      "Nuker"
    ],
    "overallWin": 0.492,
    "winByBracket": {
      "herald": 0.484,
      "guardian": 0.478,
      "crusader": 0.482,
      "archon": 0.49,
      "legend": 0.499,
      "ancient": 0.508,
      "divine": 0.513
    },
    "pickByBracket": {
      "herald": 11368,
      "guardian": 21292,
      "crusader": 22595,
      "archon": 20415,
      "legend": 16952,
      "ancient": 11836,
      "divine": 16069
    },
    "counters": [
      "slardar",
      "shadow-shaman"
    ],
    "weakAgainst": [
      "snapfire",
      "axe",
      "ogre-magi",
      "shadow-fiend",
      "beastmaster",
      "windranger"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Faerie Fire",
      "Observer and Sentry Wards",
      "Sentry Ward"
    ],
    "coreItems": [
      "Blink Dagger",
      "Arcane Boots",
      "Glimmer Cape",
      "Staff of Wizardry",
      "Holy Locket"
    ]
  },
  {
    "id": "witch-doctor",
    "numericId": 30,
    "name": "Witch Doctor",
    "shortName": "witch_doctor",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Support",
      "Nuker",
      "Disabler"
    ],
    "overallWin": 0.514,
    "winByBracket": {
      "herald": 0.53,
      "guardian": 0.523,
      "crusader": 0.518,
      "archon": 0.509,
      "legend": 0.502,
      "ancient": 0.502,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 47720,
      "guardian": 95945,
      "crusader": 100978,
      "archon": 85601,
      "legend": 59469,
      "ancient": 35254,
      "divine": 30401
    },
    "counters": [
      "gyrocopter",
      "vengeful-spirit",
      "tidehunter",
      "ursa",
      "lion",
      "lich"
    ],
    "weakAgainst": [
      "ember-spirit",
      "necrophos",
      "lifestealer",
      "snapfire",
      "clockwerk",
      "sniper"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Magic Stick",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Glimmer Cape",
      "Aghanim's Shard",
      "Staff of Wizardry",
      "Pavise"
    ]
  },
  {
    "id": "wraith-king",
    "numericId": 42,
    "name": "Wraith King",
    "shortName": "skeleton_king",
    "primaryAttr": "str",
    "attackType": "Melee",
    "roles": [
      "Carry",
      "Support",
      "Durable",
      "Disabler",
      "Initiator"
    ],
    "overallWin": 0.548,
    "winByBracket": {
      "herald": 0.561,
      "guardian": 0.556,
      "crusader": 0.551,
      "archon": 0.546,
      "legend": 0.543,
      "ancient": 0.532,
      "divine": 0.526
    },
    "pickByBracket": {
      "herald": 34706,
      "guardian": 69926,
      "crusader": 73181,
      "archon": 62210,
      "legend": 43396,
      "ancient": 25329,
      "divine": 20148
    },
    "counters": [
      "zeus",
      "tiny",
      "silencer",
      "abaddon",
      "shadow-shaman",
      "undying"
    ],
    "weakAgainst": [
      "earthshaker",
      "tusk",
      "pudge",
      "necrophos",
      "lich",
      "snapfire"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Magic Stick",
      "Gauntlets of Strength",
      "Circlet"
    ],
    "coreItems": [
      "Talisman of Evasion",
      "Radiance",
      "Sacred Relic",
      "Mithril Hammer",
      "Blink Dagger"
    ]
  },
  {
    "id": "zeus",
    "numericId": 22,
    "name": "Zeus",
    "shortName": "zuus",
    "primaryAttr": "int",
    "attackType": "Ranged",
    "roles": [
      "Nuker",
      "Carry"
    ],
    "overallWin": 0.515,
    "winByBracket": {
      "herald": 0.516,
      "guardian": 0.519,
      "crusader": 0.517,
      "archon": 0.515,
      "legend": 0.515,
      "ancient": 0.512,
      "divine": 0.51
    },
    "pickByBracket": {
      "herald": 49927,
      "guardian": 100370,
      "crusader": 114143,
      "archon": 108349,
      "legend": 85035,
      "ancient": 57710,
      "divine": 64451
    },
    "counters": [
      "mirana",
      "slardar",
      "shadow-demon",
      "medusa",
      "primal-beast",
      "viper"
    ],
    "weakAgainst": [
      "juggernaut",
      "void-spirit",
      "wraith-king",
      "keeper-of-the-light",
      "beastmaster",
      "nyx-assassin"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Null Talisman",
      "Circlet",
      "Mantle of Intelligence"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Ogre Axe",
      "Point Booster",
      "Arcane Boots",
      "Kaya"
    ]
  }
];

export const HERO_DATA_BY_ID: Record<string, HeroData> = Object.fromEntries(
  HERO_DATA.map((h) => [h.id, h]),
);
