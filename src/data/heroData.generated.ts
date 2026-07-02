// Auto-generado por scripts/sync-dota-data.mjs desde la API pública de OpenDota.
// NO editar a mano. Re-sincroniza con: node scripts/sync-dota-data.mjs
// Última sync: 2026-07-02
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
    "overallWin": 0.511,
    "winByBracket": {
      "herald": 0.515,
      "guardian": 0.512,
      "crusader": 0.512,
      "archon": 0.515,
      "legend": 0.508,
      "ancient": 0.51,
      "divine": 0.504
    },
    "pickByBracket": {
      "herald": 16400,
      "guardian": 39955,
      "crusader": 48170,
      "archon": 45374,
      "legend": 33756,
      "ancient": 20858,
      "divine": 16514
    },
    "counters": [
      "legion-commander",
      "troll-warlord",
      "sand-king",
      "axe",
      "lion",
      "terrorblade"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "underlord",
      "clinkz",
      "faceless-void",
      "marci",
      "wraith-king"
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
    "overallWin": 0.47,
    "winByBracket": {
      "herald": 0.483,
      "guardian": 0.474,
      "crusader": 0.474,
      "archon": 0.47,
      "legend": 0.468,
      "ancient": 0.463,
      "divine": 0.458
    },
    "pickByBracket": {
      "herald": 11319,
      "guardian": 31547,
      "crusader": 39474,
      "archon": 38892,
      "legend": 29753,
      "ancient": 18789,
      "divine": 15517
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
      "storm-spirit",
      "warlock",
      "puck",
      "skywrath-mage"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.512,
    "winByBracket": {
      "herald": 0.515,
      "guardian": 0.52,
      "crusader": 0.518,
      "archon": 0.513,
      "legend": 0.511,
      "ancient": 0.498,
      "divine": 0.492
    },
    "pickByBracket": {
      "herald": 15567,
      "guardian": 40376,
      "crusader": 49629,
      "archon": 47827,
      "legend": 36710,
      "ancient": 22676,
      "divine": 19691
    },
    "counters": [
      "mars",
      "marci",
      "disruptor",
      "earthshaker",
      "hoodwink",
      "clockwerk"
    ],
    "weakAgainst": [
      "spirit-breaker",
      "underlord",
      "clinkz",
      "largo",
      "viper",
      "tusk"
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
      "Glimmer Cape",
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
    "overallWin": 0.503,
    "winByBracket": {
      "herald": 0.504,
      "guardian": 0.504,
      "crusader": 0.505,
      "archon": 0.501,
      "legend": 0.502,
      "ancient": 0.497,
      "divine": 0.501
    },
    "pickByBracket": {
      "herald": 29901,
      "guardian": 76531,
      "crusader": 87779,
      "archon": 76622,
      "legend": 53807,
      "ancient": 32280,
      "divine": 27400
    },
    "counters": [
      "sven",
      "lich",
      "silencer",
      "dragon-knight",
      "mars",
      "dark-willow"
    ],
    "weakAgainst": [
      "timbersaw",
      "ember-spirit",
      "abaddon",
      "templar-assassin",
      "morphling",
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
      "Yasha",
      "Diadem",
      "Battle Fury"
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
    "overallWin": 0.5,
    "winByBracket": {
      "herald": 0.47,
      "guardian": 0.483,
      "crusader": 0.5,
      "archon": 0.501,
      "legend": 0.517,
      "ancient": 0.516,
      "divine": 0.521
    },
    "pickByBracket": {
      "herald": 8766,
      "guardian": 22078,
      "crusader": 24879,
      "archon": 20529,
      "legend": 14157,
      "ancient": 8979,
      "divine": 9029
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Observer Ward",
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
    "overallWin": 0.526,
    "winByBracket": {
      "herald": 0.539,
      "guardian": 0.538,
      "crusader": 0.53,
      "archon": 0.528,
      "legend": 0.52,
      "ancient": 0.515,
      "divine": 0.511
    },
    "pickByBracket": {
      "herald": 37664,
      "guardian": 99386,
      "crusader": 122688,
      "archon": 117547,
      "legend": 91723,
      "ancient": 59656,
      "divine": 57938
    },
    "counters": [
      "morphling",
      "winter-wyvern",
      "death-prophet",
      "faceless-void",
      "drow-ranger",
      "techies"
    ],
    "weakAgainst": [
      "bane",
      "naga-siren",
      "lycan",
      "chen",
      "treant-protector",
      "abaddon"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Ring of Protection",
      "Tango",
      "Magic Stick",
      "Quelling Blade"
    ],
    "coreItems": [
      "Blink Dagger",
      "Blade Mail",
      "Ogre Axe",
      "Broadsword",
      "Mithril Hammer"
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
    "overallWin": 0.497,
    "winByBracket": {
      "herald": 0.472,
      "guardian": 0.479,
      "crusader": 0.489,
      "archon": 0.5,
      "legend": 0.502,
      "ancient": 0.513,
      "divine": 0.519
    },
    "pickByBracket": {
      "herald": 8849,
      "guardian": 23940,
      "crusader": 29335,
      "archon": 28882,
      "legend": 23084,
      "ancient": 15728,
      "divine": 17779
    },
    "counters": [
      "axe",
      "sven",
      "tiny",
      "bristleback",
      "void-spirit",
      "templar-assassin"
    ],
    "weakAgainst": [
      "monkey-king",
      "mars",
      "skywrath-mage",
      "dark-willow",
      "primal-beast",
      "beastmaster"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Faerie Fire",
      "Smoke of Deceit"
    ],
    "coreItems": [
      "Aether Lens",
      "Arcane Boots",
      "Blink Dagger",
      "Ghost Scepter",
      "Staff of Wizardry"
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
    "overallWin": 0.418,
    "winByBracket": {
      "herald": 0.421,
      "guardian": 0.41,
      "crusader": 0.411,
      "archon": 0.415,
      "legend": 0.413,
      "ancient": 0.422,
      "divine": 0.449
    },
    "pickByBracket": {
      "herald": 4248,
      "guardian": 11558,
      "crusader": 14084,
      "archon": 13288,
      "legend": 10538,
      "ancient": 6986,
      "divine": 7002
    },
    "counters": [
      "death-prophet",
      "bristleback",
      "crystal-maiden",
      "vengeful-spirit",
      "magnus",
      "hoodwink"
    ],
    "weakAgainst": [
      "oracle",
      "naga-siren",
      "templar-assassin",
      "marci",
      "sniper",
      "chen"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Circlet",
      "Faerie Fire",
      "Blood Grenade",
      "Magic Stick"
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
    "overallWin": 0.429,
    "winByBracket": {
      "herald": 0.438,
      "guardian": 0.432,
      "crusader": 0.429,
      "archon": 0.421,
      "legend": 0.426,
      "ancient": 0.431,
      "divine": 0.441
    },
    "pickByBracket": {
      "herald": 8886,
      "guardian": 23195,
      "crusader": 26861,
      "archon": 24308,
      "legend": 18033,
      "ancient": 11512,
      "divine": 11641
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.522,
    "winByBracket": {
      "herald": 0.522,
      "guardian": 0.524,
      "crusader": 0.526,
      "archon": 0.525,
      "legend": 0.521,
      "ancient": 0.511,
      "divine": 0.508
    },
    "pickByBracket": {
      "herald": 20076,
      "guardian": 37433,
      "crusader": 34460,
      "archon": 27690,
      "legend": 18330,
      "ancient": 10683,
      "divine": 7955
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
    "overallWin": 0.51,
    "winByBracket": {
      "herald": 0.488,
      "guardian": 0.493,
      "crusader": 0.5,
      "archon": 0.513,
      "legend": 0.524,
      "ancient": 0.523,
      "divine": 0.544
    },
    "pickByBracket": {
      "herald": 13901,
      "guardian": 30861,
      "crusader": 33362,
      "archon": 30526,
      "legend": 23628,
      "ancient": 15385,
      "divine": 17443
    },
    "counters": [
      "dragon-knight",
      "snapfire",
      "ursa",
      "queen-of-pain",
      "timbersaw",
      "beastmaster"
    ],
    "weakAgainst": [
      "ember-spirit",
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
    "overallWin": 0.489,
    "winByBracket": {
      "herald": 0.483,
      "guardian": 0.479,
      "crusader": 0.484,
      "archon": 0.486,
      "legend": 0.489,
      "ancient": 0.494,
      "divine": 0.512
    },
    "pickByBracket": {
      "herald": 3163,
      "guardian": 7793,
      "crusader": 9697,
      "archon": 9683,
      "legend": 8142,
      "ancient": 6067,
      "divine": 7154
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.496,
    "winByBracket": {
      "herald": 0.54,
      "guardian": 0.52,
      "crusader": 0.496,
      "archon": 0.483,
      "legend": 0.471,
      "ancient": 0.467,
      "divine": 0.458
    },
    "pickByBracket": {
      "herald": 32160,
      "guardian": 66814,
      "crusader": 66023,
      "archon": 53440,
      "legend": 35261,
      "ancient": 20562,
      "divine": 17517
    },
    "counters": [
      "brewmaster",
      "templar-assassin",
      "sand-king",
      "techies",
      "pugna",
      "razor"
    ],
    "weakAgainst": [
      "nyx-assassin",
      "chen",
      "viper",
      "bane",
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
      "Platemail"
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
    "overallWin": 0.498,
    "winByBracket": {
      "herald": 0.485,
      "guardian": 0.491,
      "crusader": 0.5,
      "archon": 0.501,
      "legend": 0.512,
      "ancient": 0.501,
      "divine": 0.509
    },
    "pickByBracket": {
      "herald": 8686,
      "guardian": 16688,
      "crusader": 15749,
      "archon": 11902,
      "legend": 7616,
      "ancient": 4421,
      "divine": 4641
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
      "Claymore"
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
    "overallWin": 0.505,
    "winByBracket": {
      "herald": 0.518,
      "guardian": 0.503,
      "crusader": 0.506,
      "archon": 0.505,
      "legend": 0.503,
      "ancient": 0.504,
      "divine": 0.501
    },
    "pickByBracket": {
      "herald": 9864,
      "guardian": 26849,
      "crusader": 36021,
      "archon": 37435,
      "legend": 30409,
      "ancient": 19510,
      "divine": 19689
    },
    "counters": [
      "weaver",
      "medusa",
      "silencer",
      "lich",
      "witch-doctor",
      "morphling"
    ],
    "weakAgainst": [
      "treant-protector",
      "brewmaster",
      "timbersaw",
      "marci",
      "grimstroke",
      "nyx-assassin"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Ring of Protection",
      "Tango",
      "Circlet",
      "Quelling Blade"
    ],
    "coreItems": [
      "Blink Dagger",
      "Ring of Tarrasque",
      "Reaver",
      "Heart of Tarrasque",
      "Platemail"
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
    "overallWin": 0.507,
    "winByBracket": {
      "herald": 0.525,
      "guardian": 0.514,
      "crusader": 0.508,
      "archon": 0.509,
      "legend": 0.492,
      "ancient": 0.493,
      "divine": 0.49
    },
    "pickByBracket": {
      "herald": 19187,
      "guardian": 41349,
      "crusader": 41290,
      "archon": 33877,
      "legend": 23154,
      "ancient": 13127,
      "divine": 9738
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.446,
    "winByBracket": {
      "herald": 0.455,
      "guardian": 0.428,
      "crusader": 0.442,
      "archon": 0.454,
      "legend": 0.427,
      "ancient": 0.438,
      "divine": 0.497
    },
    "pickByBracket": {
      "herald": 1265,
      "guardian": 2796,
      "crusader": 3161,
      "archon": 2831,
      "legend": 2043,
      "ancient": 1388,
      "divine": 1670
    },
    "counters": [
      "dawnbreaker",
      "storm-spirit",
      "bristleback",
      "ring-master",
      "disruptor",
      "ursa"
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
    "overallWin": 0.494,
    "winByBracket": {
      "herald": 0.482,
      "guardian": 0.49,
      "crusader": 0.492,
      "archon": 0.493,
      "legend": 0.499,
      "ancient": 0.51,
      "divine": 0.508
    },
    "pickByBracket": {
      "herald": 19245,
      "guardian": 35699,
      "crusader": 33587,
      "archon": 27526,
      "legend": 19499,
      "ancient": 12631,
      "divine": 12105
    },
    "counters": [
      "ancient-apparition",
      "clockwerk",
      "skywrath-mage",
      "snapfire",
      "dragon-knight",
      "tidehunter"
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
      "Magic Wand",
      "Tango",
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
    "overallWin": 0.484,
    "winByBracket": {
      "herald": 0.479,
      "guardian": 0.481,
      "crusader": 0.468,
      "archon": 0.48,
      "legend": 0.482,
      "ancient": 0.488,
      "divine": 0.51
    },
    "pickByBracket": {
      "herald": 6947,
      "guardian": 19887,
      "crusader": 26262,
      "archon": 28448,
      "legend": 24710,
      "ancient": 18107,
      "divine": 21221
    },
    "counters": [
      "death-prophet",
      "luna",
      "tidehunter",
      "dark-seer",
      "witch-doctor",
      "silencer"
    ],
    "weakAgainst": [
      "venomancer",
      "clinkz",
      "monkey-king",
      "beastmaster",
      "leshrac",
      "viper"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Sentry Ward",
      "Smoke of Deceit"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Pavise",
      "Blink Dagger",
      "Essence Distiller",
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
    "overallWin": 0.518,
    "winByBracket": {
      "herald": 0.54,
      "guardian": 0.529,
      "crusader": 0.521,
      "archon": 0.516,
      "legend": 0.512,
      "ancient": 0.504,
      "divine": 0.497
    },
    "pickByBracket": {
      "herald": 32302,
      "guardian": 74426,
      "crusader": 81874,
      "archon": 74300,
      "legend": 55122,
      "ancient": 34594,
      "divine": 30688
    },
    "counters": [
      "drow-ranger",
      "pugna",
      "sniper",
      "chaos-knight",
      "slardar",
      "luna"
    ],
    "weakAgainst": [
      "razor",
      "mirana",
      "batrider",
      "keeper-of-the-light",
      "puck",
      "kez"
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
    "overallWin": 0.487,
    "winByBracket": {
      "herald": 0.5,
      "guardian": 0.482,
      "crusader": 0.483,
      "archon": 0.479,
      "legend": 0.486,
      "ancient": 0.496,
      "divine": 0.503
    },
    "pickByBracket": {
      "herald": 6089,
      "guardian": 15426,
      "crusader": 18860,
      "archon": 19037,
      "legend": 15974,
      "ancient": 11053,
      "divine": 12280
    },
    "counters": [
      "queen-of-pain",
      "tusk",
      "puck",
      "terrorblade",
      "shadow-shaman",
      "ogre-magi"
    ],
    "weakAgainst": [
      "phoenix",
      "clockwerk",
      "templar-assassin",
      "marci",
      "ember-spirit",
      "snapfire"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Circlet",
      "Clarity",
      "Magic Stick",
      "Gauntlets of Strength"
    ],
    "coreItems": [
      "Guardian Greaves",
      "Platemail",
      "Mekansm",
      "Blink Dagger",
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
    "overallWin": 0.471,
    "winByBracket": {
      "herald": 0.462,
      "guardian": 0.465,
      "crusader": 0.463,
      "archon": 0.471,
      "legend": 0.474,
      "ancient": 0.483,
      "divine": 0.486
    },
    "pickByBracket": {
      "herald": 13504,
      "guardian": 31746,
      "crusader": 38650,
      "archon": 36973,
      "legend": 29791,
      "ancient": 20122,
      "divine": 21239
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.519,
    "winByBracket": {
      "herald": 0.509,
      "guardian": 0.516,
      "crusader": 0.518,
      "archon": 0.52,
      "legend": 0.519,
      "ancient": 0.52,
      "divine": 0.524
    },
    "pickByBracket": {
      "herald": 13605,
      "guardian": 39172,
      "crusader": 53714,
      "archon": 58185,
      "legend": 50825,
      "ancient": 36858,
      "divine": 40953
    },
    "counters": [
      "death-prophet",
      "vengeful-spirit",
      "phantom-lancer",
      "lina",
      "medusa",
      "tinker"
    ],
    "weakAgainst": [
      "treant-protector",
      "chen",
      "bane",
      "kez",
      "morphling",
      "venomancer"
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
      "Broadsword",
      "Echo Sabre",
      "Mithril Hammer",
      "Aghanim's Shard"
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
    "overallWin": 0.497,
    "winByBracket": {
      "herald": 0.483,
      "guardian": 0.493,
      "crusader": 0.496,
      "archon": 0.5,
      "legend": 0.5,
      "ancient": 0.502,
      "divine": 0.503
    },
    "pickByBracket": {
      "herald": 12315,
      "guardian": 33412,
      "crusader": 39404,
      "archon": 34954,
      "legend": 24545,
      "ancient": 14847,
      "divine": 12936
    },
    "counters": [
      "magnus",
      "skywrath-mage",
      "morphling",
      "underlord",
      "warlock",
      "marci"
    ],
    "weakAgainst": [
      "pugna",
      "doom",
      "slardar",
      "void-spirit",
      "shadow-demon",
      "monkey-king"
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
    "overallWin": 0.472,
    "winByBracket": {
      "herald": 0.47,
      "guardian": 0.473,
      "crusader": 0.475,
      "archon": 0.463,
      "legend": 0.482,
      "ancient": 0.474,
      "divine": 0.47
    },
    "pickByBracket": {
      "herald": 15250,
      "guardian": 29109,
      "crusader": 32311,
      "archon": 29337,
      "legend": 23184,
      "ancient": 15289,
      "divine": 15267
    },
    "counters": [
      "viper",
      "shadow-shaman",
      "timbersaw",
      "ogre-magi",
      "zeus",
      "slardar"
    ],
    "weakAgainst": [
      "clockwerk",
      "batrider",
      "sniper",
      "undying",
      "marci",
      "spirit-breaker"
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
      "Mithril Hammer"
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
    "overallWin": 0.493,
    "winByBracket": {
      "herald": 0.489,
      "guardian": 0.487,
      "crusader": 0.489,
      "archon": 0.495,
      "legend": 0.494,
      "ancient": 0.493,
      "divine": 0.502
    },
    "pickByBracket": {
      "herald": 11613,
      "guardian": 36439,
      "crusader": 51970,
      "archon": 55888,
      "legend": 46258,
      "ancient": 31387,
      "divine": 31493
    },
    "counters": [
      "outworld-devourer",
      "chaos-knight",
      "phantom-assassin",
      "death-prophet",
      "muerta",
      "phantom-lancer"
    ],
    "weakAgainst": [
      "broodmother",
      "kez",
      "chen",
      "drow-ranger",
      "enchantress",
      "treant-protector"
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
      "Arcane Boots",
      "Blink Dagger",
      "Staff of Wizardry",
      "Point Booster",
      "Ogre Axe"
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
    "overallWin": 0.458,
    "winByBracket": {
      "herald": 0.442,
      "guardian": 0.444,
      "crusader": 0.446,
      "archon": 0.452,
      "legend": 0.462,
      "ancient": 0.479,
      "divine": 0.489
    },
    "pickByBracket": {
      "herald": 15075,
      "guardian": 38071,
      "crusader": 46915,
      "archon": 46629,
      "legend": 38095,
      "ancient": 26183,
      "divine": 28274
    },
    "counters": [
      "sven",
      "morphling",
      "lifestealer",
      "dazzle",
      "weaver",
      "chaos-knight"
    ],
    "weakAgainst": [
      "nature-s-prophet",
      "bane",
      "keeper-of-the-light",
      "legion-commander",
      "leshrac",
      "magnus"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.493,
    "winByBracket": {
      "herald": 0.513,
      "guardian": 0.499,
      "crusader": 0.492,
      "archon": 0.49,
      "legend": 0.488,
      "ancient": 0.487,
      "divine": 0.476
    },
    "pickByBracket": {
      "herald": 13382,
      "guardian": 30775,
      "crusader": 33960,
      "archon": 28914,
      "legend": 19763,
      "ancient": 11167,
      "divine": 8152
    },
    "counters": [
      "drow-ranger",
      "phantom-lancer",
      "morphling",
      "troll-warlord",
      "legion-commander",
      "oracle"
    ],
    "weakAgainst": [
      "bounty-hunter",
      "venomancer",
      "treant-protector",
      "keeper-of-the-light",
      "clinkz",
      "largo"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Quelling Blade",
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
    "overallWin": 0.518,
    "winByBracket": {
      "herald": 0.504,
      "guardian": 0.514,
      "crusader": 0.517,
      "archon": 0.521,
      "legend": 0.524,
      "ancient": 0.522,
      "divine": 0.521
    },
    "pickByBracket": {
      "herald": 38783,
      "guardian": 89538,
      "crusader": 103417,
      "archon": 98012,
      "legend": 77005,
      "ancient": 50620,
      "divine": 50847
    },
    "counters": [
      "underlord",
      "disruptor",
      "bristleback",
      "kez",
      "spirit-breaker",
      "necrophos"
    ],
    "weakAgainst": [
      "crystal-maiden",
      "warlock",
      "dragon-knight",
      "treant-protector",
      "clockwerk",
      "queen-of-pain"
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
      "Dragon Lance",
      "Yasha",
      "Force Staff"
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
    "overallWin": 0.507,
    "winByBracket": {
      "herald": 0.467,
      "guardian": 0.491,
      "crusader": 0.49,
      "archon": 0.502,
      "legend": 0.512,
      "ancient": 0.521,
      "divine": 0.532
    },
    "pickByBracket": {
      "herald": 4174,
      "guardian": 12782,
      "crusader": 18098,
      "archon": 21380,
      "legend": 20074,
      "ancient": 15747,
      "divine": 20376
    },
    "counters": [
      "lion",
      "pudge",
      "rubick",
      "slardar",
      "queen-of-pain",
      "jakiro"
    ],
    "weakAgainst": [
      "ring-master",
      "puck",
      "snapfire",
      "gyrocopter",
      "ember-spirit",
      "pangolier"
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
      "Ogre Axe",
      "Spirit Vessel",
      "Mithril Hammer",
      "Staff of Wizardry",
      "Kaya"
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
    "overallWin": 0.507,
    "winByBracket": {
      "herald": 0.501,
      "guardian": 0.504,
      "crusader": 0.506,
      "archon": 0.508,
      "legend": 0.511,
      "ancient": 0.513,
      "divine": 0.51
    },
    "pickByBracket": {
      "herald": 27493,
      "guardian": 68184,
      "crusader": 81374,
      "archon": 79858,
      "legend": 62588,
      "ancient": 40656,
      "divine": 37887
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
      "bane",
      "chaos-knight",
      "void-spirit",
      "necrophos"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Gauntlets of Strength",
      "Circlet",
      "Observer Ward",
      "Observer and Sentry Wards"
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
    "overallWin": 0.513,
    "winByBracket": {
      "herald": 0.496,
      "guardian": 0.497,
      "crusader": 0.505,
      "archon": 0.518,
      "legend": 0.526,
      "ancient": 0.509,
      "divine": 0.549
    },
    "pickByBracket": {
      "herald": 2523,
      "guardian": 5959,
      "crusader": 6646,
      "archon": 5962,
      "legend": 4673,
      "ancient": 3102,
      "divine": 3609
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
    "overallWin": 0.489,
    "winByBracket": {
      "herald": 0.452,
      "guardian": 0.463,
      "crusader": 0.475,
      "archon": 0.491,
      "legend": 0.498,
      "ancient": 0.507,
      "divine": 0.511
    },
    "pickByBracket": {
      "herald": 9235,
      "guardian": 24872,
      "crusader": 34887,
      "archon": 40064,
      "legend": 35750,
      "ancient": 27100,
      "divine": 31257
    },
    "counters": [
      "witch-doctor",
      "sniper",
      "venomancer",
      "void-spirit",
      "anti-mage",
      "morphling"
    ],
    "weakAgainst": [
      "bane",
      "io",
      "treant-protector",
      "puck",
      "clinkz",
      "lycan"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Faerie Fire",
      "Quelling Blade",
      "Sentry Ward"
    ],
    "coreItems": [
      "Spirit Vessel",
      "Ogre Axe",
      "Perseverance",
      "Mage Slayer",
      "Staff of Wizardry"
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
    "overallWin": 0.478,
    "winByBracket": {
      "herald": 0.485,
      "guardian": 0.483,
      "crusader": 0.475,
      "archon": 0.472,
      "legend": 0.472,
      "ancient": 0.476,
      "divine": 0.487
    },
    "pickByBracket": {
      "herald": 11161,
      "guardian": 20059,
      "crusader": 18423,
      "archon": 14390,
      "legend": 9973,
      "ancient": 6353,
      "divine": 6845
    },
    "counters": [
      "disruptor",
      "ursa",
      "earthshaker",
      "techies",
      "terrorblade",
      "void-spirit"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "slardar",
      "marci",
      "juggernaut",
      "bane",
      "shadow-fiend"
    ],
    "startItems": [
      "Iron Branch",
      "Observer and Sentry Wards",
      "Faerie Fire",
      "Tango",
      "Blood Grenade",
      "Smoke of Deceit"
    ],
    "coreItems": [
      "Drum of Endurance",
      "Staff of Wizardry",
      "Power Treads",
      "Blade of Alacrity",
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
    "overallWin": 0.497,
    "winByBracket": {
      "herald": 0.47,
      "guardian": 0.485,
      "crusader": 0.489,
      "archon": 0.499,
      "legend": 0.509,
      "ancient": 0.511,
      "divine": 0.542
    },
    "pickByBracket": {
      "herald": 11158,
      "guardian": 27358,
      "crusader": 30161,
      "archon": 25386,
      "legend": 17854,
      "ancient": 10677,
      "divine": 10184
    },
    "counters": [
      "ursa",
      "windranger",
      "tiny",
      "shadow-fiend",
      "jakiro",
      "disruptor"
    ],
    "weakAgainst": [
      "pudge",
      "queen-of-pain",
      "gyrocopter",
      "centaur-warrunner",
      "hoodwink",
      "rubick"
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
      "Black King Bar"
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
    "overallWin": 0.499,
    "winByBracket": {
      "herald": 0.495,
      "guardian": 0.495,
      "crusader": 0.497,
      "archon": 0.498,
      "legend": 0.5,
      "ancient": 0.507,
      "divine": 0.506
    },
    "pickByBracket": {
      "herald": 23328,
      "guardian": 60749,
      "crusader": 72633,
      "archon": 69588,
      "legend": 53473,
      "ancient": 35428,
      "divine": 34808
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.513,
    "winByBracket": {
      "herald": 0.506,
      "guardian": 0.512,
      "crusader": 0.515,
      "archon": 0.512,
      "legend": 0.515,
      "ancient": 0.513,
      "divine": 0.514
    },
    "pickByBracket": {
      "herald": 10929,
      "guardian": 30712,
      "crusader": 40622,
      "archon": 41475,
      "legend": 33682,
      "ancient": 22860,
      "divine": 23790
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.423,
    "winByBracket": {
      "herald": 0.429,
      "guardian": 0.423,
      "crusader": 0.424,
      "archon": 0.419,
      "legend": 0.425,
      "ancient": 0.423,
      "divine": 0.422
    },
    "pickByBracket": {
      "herald": 7929,
      "guardian": 20385,
      "crusader": 27433,
      "archon": 28757,
      "legend": 22926,
      "ancient": 14343,
      "divine": 11596
    },
    "counters": [
      "templar-assassin",
      "lion",
      "techies",
      "sven",
      "troll-warlord",
      "earth-spirit"
    ],
    "weakAgainst": [
      "treant-protector",
      "nyx-assassin",
      "razor",
      "witch-doctor",
      "alchemist",
      "naga-siren"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Tango",
      "Magic Stick",
      "Magic Wand",
      "Quelling Blade"
    ],
    "coreItems": [
      "Ogre Axe",
      "Blade of Alacrity",
      "Claymore",
      "Staff of Wizardry",
      "Crystalys"
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
    "overallWin": 0.48,
    "winByBracket": {
      "herald": 0.473,
      "guardian": 0.479,
      "crusader": 0.479,
      "archon": 0.478,
      "legend": 0.483,
      "ancient": 0.484,
      "divine": 0.484
    },
    "pickByBracket": {
      "herald": 20950,
      "guardian": 52001,
      "crusader": 61984,
      "archon": 60569,
      "legend": 47640,
      "ancient": 31834,
      "divine": 34061
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.449,
    "winByBracket": {
      "herald": 0.442,
      "guardian": 0.444,
      "crusader": 0.444,
      "archon": 0.446,
      "legend": 0.462,
      "ancient": 0.456,
      "divine": 0.467
    },
    "pickByBracket": {
      "herald": 17622,
      "guardian": 30714,
      "crusader": 30033,
      "archon": 25166,
      "legend": 18409,
      "ancient": 11140,
      "divine": 10863
    },
    "counters": [
      "silencer",
      "earthshaker",
      "storm-spirit",
      "tidehunter",
      "spirit-breaker",
      "razor"
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
    "overallWin": 0.513,
    "winByBracket": {
      "herald": 0.5,
      "guardian": 0.501,
      "crusader": 0.507,
      "archon": 0.513,
      "legend": 0.517,
      "ancient": 0.522,
      "divine": 0.529
    },
    "pickByBracket": {
      "herald": 23366,
      "guardian": 69372,
      "crusader": 94298,
      "archon": 96287,
      "legend": 78366,
      "ancient": 54285,
      "divine": 57555
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.488,
    "winByBracket": {
      "herald": 0.484,
      "guardian": 0.482,
      "crusader": 0.489,
      "archon": 0.486,
      "legend": 0.494,
      "ancient": 0.491,
      "divine": 0.499
    },
    "pickByBracket": {
      "herald": 10503,
      "guardian": 25457,
      "crusader": 28987,
      "archon": 25641,
      "legend": 19267,
      "ancient": 12459,
      "divine": 12980
    },
    "counters": [
      "ember-spirit",
      "jakiro",
      "disruptor",
      "snapfire",
      "hoodwink",
      "slardar"
    ],
    "weakAgainst": [
      "pudge",
      "rubick",
      "lion"
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
    "overallWin": 0.474,
    "winByBracket": {
      "herald": 0.493,
      "guardian": 0.484,
      "crusader": 0.48,
      "archon": 0.472,
      "legend": 0.467,
      "ancient": 0.458,
      "divine": 0.454
    },
    "pickByBracket": {
      "herald": 28408,
      "guardian": 75357,
      "crusader": 92745,
      "archon": 88565,
      "legend": 66944,
      "ancient": 41137,
      "divine": 33590
    },
    "counters": [
      "chaos-knight",
      "oracle",
      "weaver",
      "broodmother",
      "anti-mage",
      "tinker"
    ],
    "weakAgainst": [
      "treant-protector",
      "lone-druid",
      "io",
      "clinkz",
      "enigma",
      "venomancer"
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
    "overallWin": 0.521,
    "winByBracket": {
      "herald": 0.513,
      "guardian": 0.517,
      "crusader": 0.521,
      "archon": 0.522,
      "legend": 0.526,
      "ancient": 0.524,
      "divine": 0.52
    },
    "pickByBracket": {
      "herald": 34030,
      "guardian": 83139,
      "crusader": 97327,
      "archon": 92882,
      "legend": 70189,
      "ancient": 43694,
      "divine": 38254
    },
    "counters": [
      "zeus",
      "magnus",
      "pangolier",
      "legion-commander",
      "techies",
      "phoenix"
    ],
    "weakAgainst": [
      "venomancer",
      "abaddon",
      "sniper",
      "kez",
      "snapfire",
      "primal-beast"
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
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.458,
      "guardian": 0.474,
      "crusader": 0.483,
      "archon": 0.493,
      "legend": 0.504,
      "ancient": 0.509,
      "divine": 0.53
    },
    "pickByBracket": {
      "herald": 17377,
      "guardian": 40762,
      "crusader": 45287,
      "archon": 40521,
      "legend": 30464,
      "ancient": 20139,
      "divine": 21401
    },
    "counters": [
      "warlock",
      "phoenix",
      "abaddon",
      "hoodwink",
      "bristleback",
      "zeus"
    ],
    "weakAgainst": [
      "treant-protector",
      "batrider",
      "pudge",
      "monkey-king",
      "viper",
      "bane"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Observer and Sentry Wards",
      "Blood Grenade",
      "Circlet"
    ],
    "coreItems": [
      "Holy Locket",
      "Staff of Wizardry",
      "Force Staff",
      "Point Booster",
      "Boots of Travel"
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
    "overallWin": 0.456,
    "winByBracket": {
      "herald": 0.46,
      "guardian": 0.455,
      "crusader": 0.455,
      "archon": 0.46,
      "legend": 0.451,
      "ancient": 0.462,
      "divine": 0.452
    },
    "pickByBracket": {
      "herald": 7683,
      "guardian": 17719,
      "crusader": 21444,
      "archon": 21820,
      "legend": 19437,
      "ancient": 14215,
      "divine": 16971
    },
    "counters": [
      "disruptor",
      "lifestealer",
      "lich",
      "dawnbreaker",
      "tiny",
      "underlord"
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
      "Tango",
      "Magic Wand",
      "Circlet",
      "Quelling Blade"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Mage Slayer",
      "Blade of Alacrity",
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
    "overallWin": 0.497,
    "winByBracket": {
      "herald": 0.49,
      "guardian": 0.484,
      "crusader": 0.492,
      "archon": 0.496,
      "legend": 0.508,
      "ancient": 0.506,
      "divine": 0.506
    },
    "pickByBracket": {
      "herald": 11534,
      "guardian": 26747,
      "crusader": 32561,
      "archon": 32334,
      "legend": 26641,
      "ancient": 17227,
      "divine": 16774
    },
    "counters": [
      "sven",
      "bristleback",
      "lion",
      "weaver",
      "hoodwink",
      "morphling"
    ],
    "weakAgainst": [
      "templar-assassin",
      "terrorblade",
      "shadow-shaman",
      "monkey-king",
      "shadow-demon",
      "necrophos"
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
      "Claymore",
      "Point Booster",
      "Blade of Alacrity",
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
    "overallWin": 0.471,
    "winByBracket": {
      "herald": 0.45,
      "guardian": 0.457,
      "crusader": 0.473,
      "archon": 0.465,
      "legend": 0.479,
      "ancient": 0.477,
      "divine": 0.491
    },
    "pickByBracket": {
      "herald": 3594,
      "guardian": 9253,
      "crusader": 12028,
      "archon": 12382,
      "legend": 10627,
      "ancient": 7412,
      "divine": 8348
    },
    "counters": [
      "queen-of-pain",
      "pudge",
      "pangolier",
      "primal-beast",
      "timbersaw",
      "ancient-apparition"
    ],
    "weakAgainst": [
      "axe",
      "sniper",
      "beastmaster",
      "treant-protector",
      "muerta",
      "shadow-demon"
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
    "overallWin": 0.529,
    "winByBracket": {
      "herald": 0.534,
      "guardian": 0.533,
      "crusader": 0.535,
      "archon": 0.529,
      "legend": 0.525,
      "ancient": 0.525,
      "divine": 0.513
    },
    "pickByBracket": {
      "herald": 31007,
      "guardian": 82874,
      "crusader": 98184,
      "archon": 90106,
      "legend": 66159,
      "ancient": 40494,
      "divine": 34987
    },
    "counters": [
      "luna",
      "doom",
      "bristleback",
      "shadow-shaman",
      "lina",
      "timbersaw"
    ],
    "weakAgainst": [
      "storm-spirit",
      "tusk",
      "abaddon",
      "juggernaut",
      "slardar",
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
    "overallWin": 0.487,
    "winByBracket": {
      "herald": 0.475,
      "guardian": 0.483,
      "crusader": 0.484,
      "archon": 0.488,
      "legend": 0.483,
      "ancient": 0.498,
      "divine": 0.504
    },
    "pickByBracket": {
      "herald": 5185,
      "guardian": 11744,
      "crusader": 13396,
      "archon": 12853,
      "legend": 9904,
      "ancient": 6660,
      "divine": 7522
    },
    "counters": [
      "silencer",
      "muerta",
      "lina",
      "slark",
      "lycan",
      "axe"
    ],
    "weakAgainst": [
      "grimstroke",
      "bane",
      "dawnbreaker",
      "naga-siren",
      "abaddon",
      "zeus"
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
    "overallWin": 0.524,
    "winByBracket": {
      "herald": 0.524,
      "guardian": 0.531,
      "crusader": 0.526,
      "archon": 0.524,
      "legend": 0.524,
      "ancient": 0.519,
      "divine": 0.513
    },
    "pickByBracket": {
      "herald": 20440,
      "guardian": 52063,
      "crusader": 65933,
      "archon": 66787,
      "legend": 54813,
      "ancient": 37343,
      "divine": 36138
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.523,
    "winByBracket": {
      "herald": 0.505,
      "guardian": 0.516,
      "crusader": 0.523,
      "archon": 0.527,
      "legend": 0.529,
      "ancient": 0.529,
      "divine": 0.52
    },
    "pickByBracket": {
      "herald": 17093,
      "guardian": 47501,
      "crusader": 61490,
      "archon": 61785,
      "legend": 49443,
      "ancient": 32448,
      "divine": 30635
    },
    "counters": [
      "witch-doctor",
      "night-stalker",
      "phantom-assassin",
      "weaver",
      "grimstroke",
      "muerta"
    ],
    "weakAgainst": [
      "kez",
      "alchemist",
      "morphling",
      "slardar",
      "phoenix",
      "doom"
    ],
    "startItems": [
      "Gauntlets of Strength",
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Faerie Fire",
      "Magic Stick"
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
    "overallWin": 0.499,
    "winByBracket": {
      "herald": 0.471,
      "guardian": 0.488,
      "crusader": 0.495,
      "archon": 0.502,
      "legend": 0.51,
      "ancient": 0.514,
      "divine": 0.512
    },
    "pickByBracket": {
      "herald": 34234,
      "guardian": 74029,
      "crusader": 84786,
      "archon": 80725,
      "legend": 62628,
      "ancient": 40466,
      "divine": 39849
    },
    "counters": [
      "underlord",
      "phoenix",
      "warlock",
      "axe",
      "dark-willow",
      "storm-spirit"
    ],
    "weakAgainst": [
      "invoker",
      "pangolier",
      "monkey-king",
      "leshrac",
      "slardar",
      "timbersaw"
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
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.494,
      "guardian": 0.493,
      "crusader": 0.491,
      "archon": 0.493,
      "legend": 0.488,
      "ancient": 0.489,
      "divine": 0.486
    },
    "pickByBracket": {
      "herald": 49222,
      "guardian": 130644,
      "crusader": 161530,
      "archon": 156557,
      "legend": 121172,
      "ancient": 78465,
      "divine": 74093
    },
    "counters": [
      "troll-warlord",
      "sven",
      "tinker",
      "death-prophet",
      "grimstroke",
      "dark-willow"
    ],
    "weakAgainst": [
      "lycan",
      "treant-protector",
      "earth-spirit",
      "monkey-king",
      "kunkka",
      "abaddon"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.486,
    "winByBracket": {
      "herald": 0.47,
      "guardian": 0.473,
      "crusader": 0.489,
      "archon": 0.493,
      "legend": 0.488,
      "ancient": 0.49,
      "divine": 0.493
    },
    "pickByBracket": {
      "herald": 4350,
      "guardian": 11509,
      "crusader": 13076,
      "archon": 12353,
      "legend": 10096,
      "ancient": 6705,
      "divine": 7427
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.501,
    "winByBracket": {
      "herald": 0.505,
      "guardian": 0.504,
      "crusader": 0.499,
      "archon": 0.504,
      "legend": 0.498,
      "ancient": 0.497,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 21601,
      "guardian": 51144,
      "crusader": 60474,
      "archon": 59384,
      "legend": 47294,
      "ancient": 32089,
      "divine": 33261
    },
    "counters": [
      "morphling",
      "sand-king",
      "sniper",
      "phantom-assassin",
      "alchemist",
      "dragon-knight"
    ],
    "weakAgainst": [
      "clockwerk",
      "legion-commander",
      "techies",
      "monkey-king",
      "keeper-of-the-light",
      "bane"
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
      "Blade of Alacrity",
      "Diadem",
      "Yasha",
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
    "overallWin": 0.488,
    "winByBracket": {
      "herald": 0.458,
      "guardian": 0.468,
      "crusader": 0.475,
      "archon": 0.48,
      "legend": 0.505,
      "ancient": 0.512,
      "divine": 0.523
    },
    "pickByBracket": {
      "herald": 2988,
      "guardian": 7305,
      "crusader": 8116,
      "archon": 7380,
      "legend": 5916,
      "ancient": 4264,
      "divine": 5699
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.492,
    "winByBracket": {
      "herald": 0.482,
      "guardian": 0.477,
      "crusader": 0.488,
      "archon": 0.491,
      "legend": 0.499,
      "ancient": 0.498,
      "divine": 0.5
    },
    "pickByBracket": {
      "herald": 9770,
      "guardian": 34626,
      "crusader": 54627,
      "archon": 62174,
      "legend": 53953,
      "ancient": 37217,
      "divine": 37253
    },
    "counters": [
      "void-spirit",
      "phoenix",
      "bristleback",
      "doom",
      "pudge",
      "timbersaw"
    ],
    "weakAgainst": [
      "dazzle",
      "terrorblade",
      "juggernaut",
      "batrider",
      "invoker",
      "tusk"
    ],
    "startItems": [
      "Iron Branch",
      "Circlet",
      "Tango",
      "Quelling Blade",
      "Faerie Fire",
      "Observer Ward"
    ],
    "coreItems": [
      "Blink Dagger",
      "Ogre Axe",
      "Broadsword",
      "Echo Sabre",
      "Diadem"
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
    "overallWin": 0.488,
    "winByBracket": {
      "herald": 0.48,
      "guardian": 0.482,
      "crusader": 0.485,
      "archon": 0.488,
      "legend": 0.491,
      "ancient": 0.489,
      "divine": 0.498
    },
    "pickByBracket": {
      "herald": 10524,
      "guardian": 23216,
      "crusader": 26889,
      "archon": 25326,
      "legend": 19689,
      "ancient": 13411,
      "divine": 14112
    },
    "counters": [
      "death-prophet",
      "winter-wyvern",
      "void-spirit",
      "ursa",
      "lina",
      "dark-seer"
    ],
    "weakAgainst": [
      "dazzle",
      "ancient-apparition",
      "phoenix",
      "puck",
      "lycan",
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
    "overallWin": 0.469,
    "winByBracket": {
      "herald": 0.467,
      "guardian": 0.465,
      "crusader": 0.467,
      "archon": 0.468,
      "legend": 0.473,
      "ancient": 0.475,
      "divine": 0.467
    },
    "pickByBracket": {
      "herald": 7168,
      "guardian": 19430,
      "crusader": 27874,
      "archon": 31232,
      "legend": 28997,
      "ancient": 21844,
      "divine": 24165
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.5,
    "winByBracket": {
      "herald": 0.5,
      "guardian": 0.5,
      "crusader": 0.5,
      "archon": 0.506,
      "legend": 0.494,
      "ancient": 0.495,
      "divine": 0.494
    },
    "pickByBracket": {
      "herald": 9689,
      "guardian": 23710,
      "crusader": 27196,
      "archon": 25180,
      "legend": 18337,
      "ancient": 11008,
      "divine": 9459
    },
    "counters": [
      "weaver",
      "undying",
      "warlock",
      "dark-willow",
      "sand-king",
      "templar-assassin"
    ],
    "weakAgainst": [
      "shadow-demon",
      "ogre-magi",
      "shadow-shaman",
      "sniper",
      "centaur-warrunner",
      "troll-warlord"
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
    "overallWin": 0.52,
    "winByBracket": {
      "herald": 0.5,
      "guardian": 0.518,
      "crusader": 0.515,
      "archon": 0.522,
      "legend": 0.517,
      "ancient": 0.531,
      "divine": 0.552
    },
    "pickByBracket": {
      "herald": 5255,
      "guardian": 10733,
      "crusader": 10993,
      "archon": 8846,
      "legend": 6106,
      "ancient": 3684,
      "divine": 3788
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
    "overallWin": 0.507,
    "winByBracket": {
      "herald": 0.507,
      "guardian": 0.51,
      "crusader": 0.508,
      "archon": 0.506,
      "legend": 0.507,
      "ancient": 0.506,
      "divine": 0.498
    },
    "pickByBracket": {
      "herald": 16078,
      "guardian": 43272,
      "crusader": 52959,
      "archon": 52618,
      "legend": 40263,
      "ancient": 26158,
      "divine": 25080
    },
    "counters": [
      "ursa",
      "storm-spirit",
      "crystal-maiden",
      "ogre-magi",
      "queen-of-pain",
      "axe"
    ],
    "weakAgainst": [
      "zeus",
      "tidehunter",
      "tusk",
      "jakiro",
      "sniper",
      "mars"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Blood Grenade",
      "Circlet",
      "Faerie Fire",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Arcane Boots",
      "Blade of Alacrity",
      "Eul's Scepter of Divinity",
      "Ogre Axe"
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
    "overallWin": 0.441,
    "winByBracket": {
      "herald": 0.44,
      "guardian": 0.433,
      "crusader": 0.435,
      "archon": 0.438,
      "legend": 0.443,
      "ancient": 0.452,
      "divine": 0.463
    },
    "pickByBracket": {
      "herald": 16347,
      "guardian": 36356,
      "crusader": 41223,
      "archon": 39062,
      "legend": 30867,
      "ancient": 20734,
      "divine": 20908
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.479,
    "winByBracket": {
      "herald": 0.485,
      "guardian": 0.479,
      "crusader": 0.473,
      "archon": 0.48,
      "legend": 0.484,
      "ancient": 0.477,
      "divine": 0.478
    },
    "pickByBracket": {
      "herald": 9241,
      "guardian": 23740,
      "crusader": 28867,
      "archon": 26839,
      "legend": 20267,
      "ancient": 13967,
      "divine": 15240
    },
    "counters": [
      "weaver",
      "terrorblade",
      "lifestealer",
      "dawnbreaker",
      "void-spirit",
      "puck"
    ],
    "weakAgainst": [
      "sven",
      "luna",
      "timbersaw",
      "doom",
      "dazzle",
      "pudge"
    ],
    "startItems": [
      "Iron Branch",
      "Magic Wand",
      "Circlet",
      "Tango",
      "Faerie Fire",
      "Slippers of Agility"
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
    "overallWin": 0.464,
    "winByBracket": {
      "herald": 0.479,
      "guardian": 0.472,
      "crusader": 0.465,
      "archon": 0.459,
      "legend": 0.462,
      "ancient": 0.456,
      "divine": 0.454
    },
    "pickByBracket": {
      "herald": 15321,
      "guardian": 32419,
      "crusader": 36236,
      "archon": 34888,
      "legend": 27395,
      "ancient": 18135,
      "divine": 17506
    },
    "counters": [
      "techies",
      "lich",
      "bristleback",
      "faceless-void",
      "tusk",
      "luna"
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
      "Circlet",
      "Magic Stick"
    ],
    "coreItems": [
      "Mithril Hammer",
      "Maelstrom",
      "Blade of Alacrity",
      "Dragon Lance",
      "Broadsword"
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
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.519,
      "guardian": 0.495,
      "crusader": 0.481,
      "archon": 0.477,
      "legend": 0.48,
      "ancient": 0.493,
      "divine": 0.508
    },
    "pickByBracket": {
      "herald": 8086,
      "guardian": 15372,
      "crusader": 12789,
      "archon": 9341,
      "legend": 5973,
      "ancient": 3612,
      "divine": 3265
    },
    "counters": [
      "void-spirit",
      "hoodwink",
      "windranger",
      "puck",
      "axe",
      "templar-assassin"
    ],
    "weakAgainst": [
      "storm-spirit",
      "sand-king",
      "dragon-knight",
      "ember-spirit",
      "shadow-fiend"
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
    "overallWin": 0.428,
    "winByBracket": {
      "herald": 0.452,
      "guardian": 0.432,
      "crusader": 0.424,
      "archon": 0.42,
      "legend": 0.423,
      "ancient": 0.433,
      "divine": 0.433
    },
    "pickByBracket": {
      "herald": 25359,
      "guardian": 62013,
      "crusader": 70661,
      "archon": 64294,
      "legend": 48407,
      "ancient": 31003,
      "divine": 29027
    },
    "counters": [
      "razor",
      "doom",
      "huskar",
      "sniper",
      "phantom-lancer",
      "pangolier"
    ],
    "weakAgainst": [
      "kez",
      "bane",
      "naga-siren",
      "nyx-assassin",
      "morphling",
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
      "Mithril Hammer",
      "Blade of Alacrity",
      "Hyperstone",
      "Mjollnir",
      "Maelstrom"
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
    "overallWin": 0.53,
    "winByBracket": {
      "herald": 0.553,
      "guardian": 0.538,
      "crusader": 0.535,
      "archon": 0.529,
      "legend": 0.528,
      "ancient": 0.52,
      "divine": 0.51
    },
    "pickByBracket": {
      "herald": 35193,
      "guardian": 91211,
      "crusader": 109393,
      "archon": 106710,
      "legend": 83443,
      "ancient": 53698,
      "divine": 52343
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
      "herald": 0.49,
      "guardian": 0.497,
      "crusader": 0.518,
      "archon": 0.533,
      "legend": 0.539,
      "ancient": 0.537,
      "divine": 0.538
    },
    "pickByBracket": {
      "herald": 9122,
      "guardian": 26522,
      "crusader": 36508,
      "archon": 40306,
      "legend": 35429,
      "ancient": 25583,
      "divine": 29468
    },
    "counters": [
      "ancient-apparition",
      "dark-willow",
      "timbersaw",
      "storm-spirit",
      "tiny",
      "zeus"
    ],
    "weakAgainst": [
      "lifestealer",
      "pugna",
      "undying",
      "beastmaster",
      "terrorblade",
      "invoker"
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
    "overallWin": 0.523,
    "winByBracket": {
      "herald": 0.517,
      "guardian": 0.516,
      "crusader": 0.523,
      "archon": 0.523,
      "legend": 0.523,
      "ancient": 0.527,
      "divine": 0.528
    },
    "pickByBracket": {
      "herald": 13273,
      "guardian": 36123,
      "crusader": 45876,
      "archon": 45609,
      "legend": 37486,
      "ancient": 25445,
      "divine": 25383
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
      "largo",
      "pangolier",
      "pudge",
      "phoenix",
      "terrorblade",
      "abaddon"
    ],
    "startItems": [
      "Iron Branch",
      "Blood Grenade",
      "Tango",
      "Boots of Speed",
      "Sentry Ward",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Eul's Scepter of Divinity",
      "Point Booster",
      "Blink Dagger",
      "Arcane Boots"
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
    "overallWin": 0.513,
    "winByBracket": {
      "herald": 0.527,
      "guardian": 0.521,
      "crusader": 0.515,
      "archon": 0.51,
      "legend": 0.506,
      "ancient": 0.504,
      "divine": 0.501
    },
    "pickByBracket": {
      "herald": 40782,
      "guardian": 104924,
      "crusader": 121011,
      "archon": 110836,
      "legend": 80417,
      "ancient": 48255,
      "divine": 38643
    },
    "counters": [
      "medusa",
      "winter-wyvern",
      "bristleback",
      "anti-mage",
      "ancient-apparition",
      "primal-beast"
    ],
    "weakAgainst": [
      "phoenix",
      "pugna",
      "phantom-assassin",
      "treant-protector",
      "mirana",
      "bounty-hunter"
    ],
    "startItems": [
      "Tango",
      "Iron Branch",
      "Sentry Ward",
      "Gauntlets of Strength",
      "Observer and Sentry Wards",
      "Blood Grenade"
    ],
    "coreItems": [
      "Arcane Boots",
      "Hand of Midas",
      "Aether Lens",
      "Pavise",
      "Staff of Wizardry"
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
    "overallWin": 0.494,
    "winByBracket": {
      "herald": 0.487,
      "guardian": 0.485,
      "crusader": 0.489,
      "archon": 0.493,
      "legend": 0.502,
      "ancient": 0.505,
      "divine": 0.511
    },
    "pickByBracket": {
      "herald": 8688,
      "guardian": 22391,
      "crusader": 26830,
      "archon": 25360,
      "legend": 19235,
      "ancient": 12434,
      "divine": 11386
    },
    "counters": [
      "shadow-fiend",
      "tiny"
    ],
    "weakAgainst": [
      "pudge",
      "windranger",
      "rubick",
      "ember-spirit"
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
    "overallWin": 0.47,
    "winByBracket": {
      "herald": 0.434,
      "guardian": 0.449,
      "crusader": 0.458,
      "archon": 0.473,
      "legend": 0.479,
      "ancient": 0.487,
      "divine": 0.507
    },
    "pickByBracket": {
      "herald": 11287,
      "guardian": 29585,
      "crusader": 38518,
      "archon": 37547,
      "legend": 30054,
      "ancient": 20000,
      "divine": 19828
    },
    "counters": [
      "shadow-shaman",
      "batrider",
      "tiny",
      "puck",
      "invoker",
      "night-stalker"
    ],
    "weakAgainst": [
      "windranger",
      "jakiro",
      "queen-of-pain",
      "tusk",
      "pudge",
      "dragon-knight"
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
    "overallWin": 0.495,
    "winByBracket": {
      "herald": 0.466,
      "guardian": 0.48,
      "crusader": 0.494,
      "archon": 0.502,
      "legend": 0.504,
      "ancient": 0.505,
      "divine": 0.509
    },
    "pickByBracket": {
      "herald": 10155,
      "guardian": 25090,
      "crusader": 30948,
      "archon": 30074,
      "legend": 23645,
      "ancient": 14613,
      "divine": 13280
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.454,
    "winByBracket": {
      "herald": 0.439,
      "guardian": 0.436,
      "crusader": 0.449,
      "archon": 0.454,
      "legend": 0.457,
      "ancient": 0.463,
      "divine": 0.462
    },
    "pickByBracket": {
      "herald": 5763,
      "guardian": 15535,
      "crusader": 21257,
      "archon": 23978,
      "legend": 22648,
      "ancient": 17892,
      "divine": 21388
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.511,
    "winByBracket": {
      "herald": 0.526,
      "guardian": 0.519,
      "crusader": 0.514,
      "archon": 0.508,
      "legend": 0.499,
      "ancient": 0.499,
      "divine": 0.494
    },
    "pickByBracket": {
      "herald": 42622,
      "guardian": 93759,
      "crusader": 97067,
      "archon": 82453,
      "legend": 56442,
      "ancient": 33146,
      "divine": 26796
    },
    "counters": [
      "ogre-magi",
      "dragon-knight"
    ],
    "weakAgainst": [
      "beastmaster",
      "rubick",
      "pudge",
      "lifestealer",
      "queen-of-pain",
      "shadow-shaman"
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
    "overallWin": 0.525,
    "winByBracket": {
      "herald": 0.522,
      "guardian": 0.522,
      "crusader": 0.526,
      "archon": 0.526,
      "legend": 0.528,
      "ancient": 0.529,
      "divine": 0.524
    },
    "pickByBracket": {
      "herald": 26108,
      "guardian": 61456,
      "crusader": 65878,
      "archon": 55936,
      "legend": 40127,
      "ancient": 25028,
      "divine": 25744
    },
    "counters": [
      "dark-willow",
      "shadow-shaman",
      "slardar",
      "jakiro",
      "templar-assassin",
      "mars"
    ],
    "weakAgainst": [
      "shadow-demon",
      "queen-of-pain",
      "hoodwink",
      "spirit-breaker",
      "nature-s-prophet",
      "terrorblade"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Quelling Blade",
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
    "overallWin": 0.503,
    "winByBracket": {
      "herald": 0.498,
      "guardian": 0.503,
      "crusader": 0.501,
      "archon": 0.506,
      "legend": 0.504,
      "ancient": 0.507,
      "divine": 0.501
    },
    "pickByBracket": {
      "herald": 8063,
      "guardian": 24905,
      "crusader": 35152,
      "archon": 37410,
      "legend": 32603,
      "ancient": 23153,
      "divine": 27151
    },
    "counters": [
      "dark-seer",
      "sand-king",
      "underlord",
      "techies",
      "void-spirit",
      "bristleback"
    ],
    "weakAgainst": [
      "keeper-of-the-light",
      "magnus",
      "juggernaut",
      "bane",
      "dazzle",
      "doom"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.484,
    "winByBracket": {
      "herald": 0.476,
      "guardian": 0.479,
      "crusader": 0.485,
      "archon": 0.479,
      "legend": 0.487,
      "ancient": 0.487,
      "divine": 0.499
    },
    "pickByBracket": {
      "herald": 7350,
      "guardian": 17344,
      "crusader": 20254,
      "archon": 19077,
      "legend": 15528,
      "ancient": 10693,
      "divine": 12217
    },
    "counters": [
      "muerta",
      "gyrocopter",
      "viper",
      "puck",
      "terrorblade",
      "dark-willow"
    ],
    "weakAgainst": [
      "earthshaker",
      "largo",
      "shadow-demon",
      "clockwerk",
      "razor",
      "faceless-void"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Tango",
      "Observer Ward",
      "Quelling Blade",
      "Magic Stick"
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
    "overallWin": 0.468,
    "winByBracket": {
      "herald": 0.451,
      "guardian": 0.442,
      "crusader": 0.456,
      "archon": 0.465,
      "legend": 0.477,
      "ancient": 0.485,
      "divine": 0.492
    },
    "pickByBracket": {
      "herald": 6304,
      "guardian": 16803,
      "crusader": 22638,
      "archon": 24027,
      "legend": 21122,
      "ancient": 15599,
      "divine": 18244
    },
    "counters": [
      "weaver",
      "earth-spirit",
      "sven",
      "dark-willow",
      "crystal-maiden",
      "ember-spirit"
    ],
    "weakAgainst": [
      "naga-siren",
      "bounty-hunter",
      "huskar",
      "oracle",
      "dark-seer",
      "nyx-assassin"
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
    "overallWin": 0.518,
    "winByBracket": {
      "herald": 0.515,
      "guardian": 0.518,
      "crusader": 0.521,
      "archon": 0.517,
      "legend": 0.519,
      "ancient": 0.516,
      "divine": 0.514
    },
    "pickByBracket": {
      "herald": 51384,
      "guardian": 145752,
      "crusader": 185758,
      "archon": 179864,
      "legend": 137838,
      "ancient": 89497,
      "divine": 88996
    },
    "counters": [
      "io",
      "clinkz",
      "wraith-king",
      "morphling",
      "warlock",
      "phantom-assassin"
    ],
    "weakAgainst": [
      "largo",
      "lycan",
      "earth-spirit",
      "naga-siren",
      "bane",
      "slark"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Gauntlets of Strength",
      "Observer Ward",
      "Boots of Speed",
      "Blood Grenade"
    ],
    "coreItems": [
      "Blink Dagger",
      "Aether Lens",
      "Staff of Wizardry",
      "Ogre Axe",
      "Blade of Alacrity"
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
    "overallWin": 0.496,
    "winByBracket": {
      "herald": 0.48,
      "guardian": 0.497,
      "crusader": 0.492,
      "archon": 0.497,
      "legend": 0.499,
      "ancient": 0.5,
      "divine": 0.502
    },
    "pickByBracket": {
      "herald": 10670,
      "guardian": 24586,
      "crusader": 27254,
      "archon": 25064,
      "legend": 19096,
      "ancient": 12393,
      "divine": 11220
    },
    "counters": [
      "dark-willow",
      "dazzle",
      "night-stalker",
      "beastmaster",
      "ogre-magi",
      "pangolier"
    ],
    "weakAgainst": [
      "naga-siren",
      "chen",
      "crystal-maiden",
      "terrorblade",
      "bristleback",
      "shadow-fiend"
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
    "overallWin": 0.465,
    "winByBracket": {
      "herald": 0.461,
      "guardian": 0.467,
      "crusader": 0.462,
      "archon": 0.466,
      "legend": 0.464,
      "ancient": 0.468,
      "divine": 0.463
    },
    "pickByBracket": {
      "herald": 21604,
      "guardian": 58054,
      "crusader": 76008,
      "archon": 78163,
      "legend": 62724,
      "ancient": 41065,
      "divine": 39097
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.506,
    "winByBracket": {
      "herald": 0.502,
      "guardian": 0.508,
      "crusader": 0.509,
      "archon": 0.507,
      "legend": 0.504,
      "ancient": 0.505,
      "divine": 0.5
    },
    "pickByBracket": {
      "herald": 19263,
      "guardian": 37679,
      "crusader": 39420,
      "archon": 35322,
      "legend": 26302,
      "ancient": 16620,
      "divine": 14426
    },
    "counters": [
      "crystal-maiden",
      "silencer",
      "gyrocopter",
      "primal-beast",
      "warlock",
      "tidehunter"
    ],
    "weakAgainst": [
      "treant-protector",
      "nature-s-prophet",
      "phoenix",
      "terrorblade",
      "huskar",
      "pudge"
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
      "Blade of Alacrity",
      "Ogre Axe",
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
      "herald": 0.516,
      "guardian": 0.527,
      "crusader": 0.53,
      "archon": 0.522,
      "legend": 0.524,
      "ancient": 0.517,
      "divine": 0.523
    },
    "pickByBracket": {
      "herald": 19345,
      "guardian": 39791,
      "crusader": 40658,
      "archon": 34219,
      "legend": 24314,
      "ancient": 14791,
      "divine": 13021
    },
    "counters": [],
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
    "overallWin": 0.48,
    "winByBracket": {
      "herald": 0.466,
      "guardian": 0.471,
      "crusader": 0.476,
      "archon": 0.48,
      "legend": 0.484,
      "ancient": 0.486,
      "divine": 0.488
    },
    "pickByBracket": {
      "herald": 7347,
      "guardian": 19294,
      "crusader": 25543,
      "archon": 26852,
      "legend": 23546,
      "ancient": 17638,
      "divine": 21004
    },
    "counters": [
      "dark-willow",
      "witch-doctor",
      "vengeful-spirit",
      "skywrath-mage",
      "earth-spirit",
      "terrorblade"
    ],
    "weakAgainst": [
      "alchemist",
      "chen",
      "grimstroke",
      "lich",
      "dazzle",
      "bane"
    ],
    "startItems": [
      "Iron Branch",
      "Faerie Fire",
      "Tango",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Staff of Wizardry",
      "Blink Dagger",
      "Vitality Booster",
      "Rod of Atos"
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
    "overallWin": 0.495,
    "winByBracket": {
      "herald": 0.478,
      "guardian": 0.485,
      "crusader": 0.49,
      "archon": 0.495,
      "legend": 0.5,
      "ancient": 0.504,
      "divine": 0.506
    },
    "pickByBracket": {
      "herald": 23670,
      "guardian": 70988,
      "crusader": 100282,
      "archon": 110577,
      "legend": 95431,
      "ancient": 67898,
      "divine": 71448
    },
    "counters": [
      "phantom-assassin",
      "phantom-lancer",
      "weaver",
      "sven",
      "magnus",
      "chaos-knight"
    ],
    "weakAgainst": [
      "lone-druid",
      "earth-spirit",
      "lycan",
      "bane",
      "broodmother",
      "leshrac"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer and Sentry Wards",
      "Faerie Fire",
      "Blood Grenade",
      "Sentry Ward"
    ],
    "coreItems": [
      "Arcane Boots",
      "Essence Distiller",
      "Blink Dagger",
      "Staff of Wizardry",
      "Aghanim's Shard"
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
    "overallWin": 0.488,
    "winByBracket": {
      "herald": 0.514,
      "guardian": 0.507,
      "crusader": 0.493,
      "archon": 0.483,
      "legend": 0.471,
      "ancient": 0.47,
      "divine": 0.466
    },
    "pickByBracket": {
      "herald": 12855,
      "guardian": 29860,
      "crusader": 33555,
      "archon": 30639,
      "legend": 22646,
      "ancient": 14657,
      "divine": 11733
    },
    "counters": [
      "underlord",
      "muerta",
      "ursa",
      "void-spirit",
      "lion",
      "templar-assassin"
    ],
    "weakAgainst": [
      "warlock",
      "phoenix",
      "abaddon",
      "luna",
      "alchemist",
      "terrorblade"
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
    "overallWin": 0.445,
    "winByBracket": {
      "herald": 0.422,
      "guardian": 0.426,
      "crusader": 0.44,
      "archon": 0.449,
      "legend": 0.454,
      "ancient": 0.457,
      "divine": 0.455
    },
    "pickByBracket": {
      "herald": 4825,
      "guardian": 12555,
      "crusader": 16164,
      "archon": 16378,
      "legend": 13670,
      "ancient": 9623,
      "divine": 10444
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.493,
    "winByBracket": {
      "herald": 0.488,
      "guardian": 0.496,
      "crusader": 0.494,
      "archon": 0.493,
      "legend": 0.494,
      "ancient": 0.49,
      "divine": 0.493
    },
    "pickByBracket": {
      "herald": 30136,
      "guardian": 76491,
      "crusader": 93847,
      "archon": 91020,
      "legend": 71693,
      "ancient": 49080,
      "divine": 53288
    },
    "counters": [
      "winter-wyvern",
      "morphling",
      "legion-commander",
      "anti-mage",
      "medusa",
      "pugna"
    ],
    "weakAgainst": [
      "lone-druid",
      "enigma",
      "alchemist",
      "phoenix",
      "omniknight",
      "io"
    ],
    "startItems": [
      "Faerie Fire",
      "Iron Branch",
      "Magic Wand",
      "Tango",
      "Circlet",
      "Magic Stick"
    ],
    "coreItems": [
      "Blade of Alacrity",
      "Dragon Lance",
      "Yasha",
      "Staff of Wizardry",
      "Mask of Madness"
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
    "overallWin": 0.522,
    "winByBracket": {
      "herald": 0.523,
      "guardian": 0.522,
      "crusader": 0.521,
      "archon": 0.522,
      "legend": 0.521,
      "ancient": 0.522,
      "divine": 0.518
    },
    "pickByBracket": {
      "herald": 37954,
      "guardian": 92432,
      "crusader": 106892,
      "archon": 97902,
      "legend": 72565,
      "ancient": 45276,
      "divine": 40209
    },
    "counters": [
      "medusa",
      "morphling",
      "phantom-assassin",
      "kunkka",
      "huskar",
      "tinker"
    ],
    "weakAgainst": [
      "naga-siren",
      "oracle",
      "beastmaster",
      "treant-protector",
      "phantom-lancer",
      "wraith-king"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.511,
    "winByBracket": {
      "herald": 0.525,
      "guardian": 0.52,
      "crusader": 0.514,
      "archon": 0.512,
      "legend": 0.505,
      "ancient": 0.506,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 25188,
      "guardian": 69611,
      "crusader": 85123,
      "archon": 81283,
      "legend": 62709,
      "ancient": 39856,
      "divine": 37207
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.497,
    "winByBracket": {
      "herald": 0.507,
      "guardian": 0.503,
      "crusader": 0.5,
      "archon": 0.495,
      "legend": 0.49,
      "ancient": 0.494,
      "divine": 0.483
    },
    "pickByBracket": {
      "herald": 30166,
      "guardian": 73216,
      "crusader": 86792,
      "archon": 80975,
      "legend": 61637,
      "ancient": 39750,
      "divine": 37501
    },
    "counters": [
      "death-prophet",
      "witch-doctor",
      "ancient-apparition",
      "dragon-knight",
      "faceless-void",
      "bane"
    ],
    "weakAgainst": [
      "treant-protector",
      "lycan",
      "dazzle",
      "monkey-king",
      "clinkz",
      "phoenix"
    ],
    "startItems": [
      "Tango",
      "Iron Branch",
      "Circlet",
      "Blood Grenade",
      "Mantle of Intelligence",
      "Observer and Sentry Wards"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Arcane Boots",
      "Vitality Booster",
      "Rod of Atos",
      "Aghanim's Shard"
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
    "overallWin": 0.498,
    "winByBracket": {
      "herald": 0.509,
      "guardian": 0.498,
      "crusader": 0.501,
      "archon": 0.496,
      "legend": 0.5,
      "ancient": 0.493,
      "divine": 0.486
    },
    "pickByBracket": {
      "herald": 18385,
      "guardian": 46050,
      "crusader": 55196,
      "archon": 52585,
      "legend": 41406,
      "ancient": 26980,
      "divine": 25813
    },
    "counters": [
      "lifestealer",
      "lina",
      "weaver",
      "sand-king",
      "viper",
      "enchantress"
    ],
    "weakAgainst": [
      "vengeful-spirit",
      "marci",
      "earth-spirit",
      "winter-wyvern",
      "zeus",
      "faceless-void"
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
      "Aghanim's Shard",
      "Ogre Axe",
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
    "overallWin": 0.499,
    "winByBracket": {
      "herald": 0.515,
      "guardian": 0.498,
      "crusader": 0.492,
      "archon": 0.498,
      "legend": 0.496,
      "ancient": 0.503,
      "divine": 0.507
    },
    "pickByBracket": {
      "herald": 19359,
      "guardian": 53878,
      "crusader": 67247,
      "archon": 65559,
      "legend": 51367,
      "ancient": 33435,
      "divine": 31561
    },
    "counters": [
      "muerta",
      "warlock",
      "beastmaster",
      "pudge",
      "tidehunter",
      "storm-spirit"
    ],
    "weakAgainst": [
      "leshrac",
      "spirit-breaker",
      "treant-protector",
      "snapfire",
      "jakiro",
      "windranger"
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
    "overallWin": 0.528,
    "winByBracket": {
      "herald": 0.502,
      "guardian": 0.513,
      "crusader": 0.53,
      "archon": 0.532,
      "legend": 0.533,
      "ancient": 0.534,
      "divine": 0.533
    },
    "pickByBracket": {
      "herald": 24945,
      "guardian": 73797,
      "crusader": 105839,
      "archon": 117032,
      "legend": 102118,
      "ancient": 72635,
      "divine": 78628
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.511,
    "winByBracket": {
      "herald": 0.522,
      "guardian": 0.52,
      "crusader": 0.517,
      "archon": 0.51,
      "legend": 0.504,
      "ancient": 0.494,
      "divine": 0.482
    },
    "pickByBracket": {
      "herald": 55885,
      "guardian": 130136,
      "crusader": 146533,
      "archon": 131525,
      "legend": 93794,
      "ancient": 55059,
      "divine": 43044
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.546,
    "winByBracket": {
      "herald": 0.561,
      "guardian": 0.556,
      "crusader": 0.546,
      "archon": 0.546,
      "legend": 0.542,
      "ancient": 0.538,
      "divine": 0.535
    },
    "pickByBracket": {
      "herald": 23169,
      "guardian": 62132,
      "crusader": 71812,
      "archon": 66680,
      "legend": 50684,
      "ancient": 32557,
      "divine": 32820
    },
    "counters": [],
    "weakAgainst": [
      "mars"
    ],
    "startItems": [],
    "coreItems": []
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
      "herald": 0.517,
      "guardian": 0.524,
      "crusader": 0.516,
      "archon": 0.516,
      "legend": 0.516,
      "ancient": 0.509,
      "divine": 0.519
    },
    "pickByBracket": {
      "herald": 35259,
      "guardian": 83938,
      "crusader": 97727,
      "archon": 91981,
      "legend": 70789,
      "ancient": 45615,
      "divine": 42951
    },
    "counters": [
      "clinkz",
      "ancient-apparition",
      "death-prophet",
      "phantom-lancer",
      "silencer",
      "slark"
    ],
    "weakAgainst": [
      "treant-protector",
      "huskar",
      "keeper-of-the-light",
      "drow-ranger",
      "marci",
      "monkey-king"
    ],
    "startItems": [
      "Tango",
      "Boots of Speed",
      "Iron Branch",
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Sentry Ward"
    ],
    "coreItems": [
      "Blitz Knuckles",
      "Claymore",
      "Phase Boots",
      "Drum of Endurance",
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
      "herald": 0.472,
      "guardian": 0.462,
      "crusader": 0.464,
      "archon": 0.469,
      "legend": 0.474,
      "ancient": 0.472,
      "divine": 0.489
    },
    "pickByBracket": {
      "herald": 14404,
      "guardian": 36629,
      "crusader": 45548,
      "archon": 46279,
      "legend": 38019,
      "ancient": 26270,
      "divine": 28306
    },
    "counters": [
      "legion-commander",
      "naga-siren",
      "sven",
      "void-spirit",
      "techies",
      "death-prophet"
    ],
    "weakAgainst": [
      "mirana",
      "treant-protector",
      "chen",
      "huskar",
      "lycan",
      "marci"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Observer Ward",
      "Mantle of Intelligence",
      "Gauntlets of Strength"
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
    "overallWin": 0.502,
    "winByBracket": {
      "herald": 0.499,
      "guardian": 0.503,
      "crusader": 0.499,
      "archon": 0.503,
      "legend": 0.501,
      "ancient": 0.502,
      "divine": 0.506
    },
    "pickByBracket": {
      "herald": 22528,
      "guardian": 49060,
      "crusader": 52645,
      "archon": 45187,
      "legend": 32355,
      "ancient": 19463,
      "divine": 16616
    },
    "counters": [
      "morphling",
      "phantom-lancer",
      "skywrath-mage",
      "legion-commander",
      "axe",
      "dark-seer"
    ],
    "weakAgainst": [
      "lycan",
      "kunkka",
      "bane",
      "earthshaker",
      "nyx-assassin",
      "doom"
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
    "overallWin": 0.51,
    "winByBracket": {
      "herald": 0.516,
      "guardian": 0.516,
      "crusader": 0.51,
      "archon": 0.506,
      "legend": 0.507,
      "ancient": 0.506,
      "divine": 0.503
    },
    "pickByBracket": {
      "herald": 22974,
      "guardian": 53224,
      "crusader": 58795,
      "archon": 52767,
      "legend": 39806,
      "ancient": 26115,
      "divine": 25973
    },
    "counters": [
      "vengeful-spirit",
      "grimstroke",
      "luna",
      "dark-willow",
      "dragon-knight",
      "disruptor"
    ],
    "weakAgainst": [
      "muerta",
      "phoenix",
      "juggernaut",
      "beastmaster",
      "keeper-of-the-light",
      "gyrocopter"
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
      "Aether Lens",
      "Glimmer Cape",
      "Essence Distiller"
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
    "overallWin": 0.452,
    "winByBracket": {
      "herald": 0.448,
      "guardian": 0.449,
      "crusader": 0.449,
      "archon": 0.45,
      "legend": 0.455,
      "ancient": 0.456,
      "divine": 0.466
    },
    "pickByBracket": {
      "herald": 12126,
      "guardian": 29112,
      "crusader": 33123,
      "archon": 29793,
      "legend": 22584,
      "ancient": 14726,
      "divine": 14643
    },
    "counters": [
      "dark-seer",
      "kunkka",
      "weaver",
      "phantom-assassin",
      "anti-mage",
      "sven"
    ],
    "weakAgainst": [
      "grimstroke",
      "treant-protector",
      "naga-siren",
      "bristleback",
      "bane",
      "monkey-king"
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
      "guardian": 0.468,
      "crusader": 0.473,
      "archon": 0.471,
      "legend": 0.474,
      "ancient": 0.479,
      "divine": 0.491
    },
    "pickByBracket": {
      "herald": 9573,
      "guardian": 21416,
      "crusader": 23509,
      "archon": 20059,
      "legend": 15004,
      "ancient": 10227,
      "divine": 13025
    },
    "counters": [
      "bristleback",
      "magnus",
      "phantom-lancer",
      "razor",
      "kunkka",
      "sand-king"
    ],
    "weakAgainst": [
      "morphling",
      "phoenix",
      "abaddon",
      "drow-ranger",
      "dark-seer",
      "primal-beast"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.502,
    "winByBracket": {
      "herald": 0.509,
      "guardian": 0.507,
      "crusader": 0.507,
      "archon": 0.502,
      "legend": 0.496,
      "ancient": 0.493,
      "divine": 0.497
    },
    "pickByBracket": {
      "herald": 16411,
      "guardian": 43611,
      "crusader": 55077,
      "archon": 54936,
      "legend": 44129,
      "ancient": 29854,
      "divine": 30025
    },
    "counters": [
      "faceless-void",
      "mirana",
      "spirit-breaker",
      "necrophos",
      "dark-willow",
      "nature-s-prophet"
    ],
    "weakAgainst": [
      "treant-protector",
      "clockwerk",
      "huskar",
      "grimstroke",
      "clinkz",
      "ember-spirit"
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
    "overallWin": 0.439,
    "winByBracket": {
      "herald": 0.453,
      "guardian": 0.448,
      "crusader": 0.439,
      "archon": 0.437,
      "legend": 0.434,
      "ancient": 0.437,
      "divine": 0.435
    },
    "pickByBracket": {
      "herald": 8375,
      "guardian": 21808,
      "crusader": 27481,
      "archon": 28070,
      "legend": 22952,
      "ancient": 16139,
      "divine": 17420
    },
    "counters": [
      "morphling",
      "anti-mage",
      "lina",
      "witch-doctor",
      "centaur-warrunner",
      "outworld-devourer"
    ],
    "weakAgainst": [
      "largo",
      "nyx-assassin",
      "bounty-hunter",
      "bane",
      "night-stalker",
      "treant-protector"
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
      "Ogre Axe",
      "Kaya",
      "Staff of Wizardry",
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
    "overallWin": 0.475,
    "winByBracket": {
      "herald": 0.452,
      "guardian": 0.458,
      "crusader": 0.467,
      "archon": 0.477,
      "legend": 0.489,
      "ancient": 0.488,
      "divine": 0.503
    },
    "pickByBracket": {
      "herald": 9575,
      "guardian": 24159,
      "crusader": 28287,
      "archon": 25102,
      "legend": 19501,
      "ancient": 12999,
      "divine": 14409
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.442,
    "winByBracket": {
      "herald": 0.453,
      "guardian": 0.443,
      "crusader": 0.439,
      "archon": 0.436,
      "legend": 0.441,
      "ancient": 0.444,
      "divine": 0.451
    },
    "pickByBracket": {
      "herald": 17999,
      "guardian": 43153,
      "crusader": 51261,
      "archon": 50916,
      "legend": 42096,
      "ancient": 29298,
      "divine": 29810
    },
    "counters": [
      "death-prophet",
      "weaver",
      "bristleback",
      "tinker",
      "sand-king",
      "sven"
    ],
    "weakAgainst": [
      "bane",
      "naga-siren",
      "enigma",
      "lone-druid",
      "oracle",
      "kez"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Faerie Fire",
      "Magic Stick",
      "Quelling Blade",
      "Gauntlets of Strength"
    ],
    "coreItems": [
      "Ogre Axe",
      "Echo Sabre",
      "Blink Dagger",
      "Claymore",
      "Shadow Blade"
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
    "overallWin": 0.501,
    "winByBracket": {
      "herald": 0.489,
      "guardian": 0.488,
      "crusader": 0.491,
      "archon": 0.497,
      "legend": 0.504,
      "ancient": 0.513,
      "divine": 0.524
    },
    "pickByBracket": {
      "herald": 7307,
      "guardian": 18050,
      "crusader": 22832,
      "archon": 22246,
      "legend": 18019,
      "ancient": 13242,
      "divine": 18639
    },
    "counters": [
      "monkey-king",
      "invoker",
      "spirit-breaker",
      "razor",
      "gyrocopter",
      "skywrath-mage"
    ],
    "weakAgainst": [
      "enchantress"
    ],
    "startItems": [
      "Blood Grenade",
      "Observer and Sentry Wards",
      "Boots of Speed",
      "Smoke of Deceit",
      "Sentry Ward",
      "Iron Branch"
    ],
    "coreItems": [
      "Arcane Boots",
      "Blink Dagger",
      "Essence Distiller",
      "Pavise",
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
    "overallWin": 0.507,
    "winByBracket": {
      "herald": 0.517,
      "guardian": 0.515,
      "crusader": 0.508,
      "archon": 0.5,
      "legend": 0.508,
      "ancient": 0.499,
      "divine": 0.484
    },
    "pickByBracket": {
      "herald": 13242,
      "guardian": 22457,
      "crusader": 20339,
      "archon": 15976,
      "legend": 11084,
      "ancient": 6682,
      "divine": 5461
    },
    "counters": [
      "medusa",
      "dark-willow",
      "silencer",
      "lifestealer",
      "tidehunter",
      "bristleback"
    ],
    "weakAgainst": [
      "abaddon",
      "invoker",
      "pudge",
      "sniper",
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
    "overallWin": 0.47,
    "winByBracket": {
      "herald": 0.443,
      "guardian": 0.449,
      "crusader": 0.458,
      "archon": 0.467,
      "legend": 0.476,
      "ancient": 0.489,
      "divine": 0.49
    },
    "pickByBracket": {
      "herald": 8659,
      "guardian": 23957,
      "crusader": 32456,
      "archon": 35914,
      "legend": 32495,
      "ancient": 24597,
      "divine": 28609
    },
    "counters": [
      "legion-commander",
      "ancient-apparition",
      "lifestealer",
      "magnus",
      "void-spirit",
      "tinker"
    ],
    "weakAgainst": [
      "treant-protector",
      "broodmother",
      "dark-seer",
      "venomancer",
      "muerta",
      "pugna"
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
      "Blink Dagger",
      "Phase Boots",
      "Staff of Wizardry",
      "Ogre Axe",
      "Pavise"
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
    "overallWin": 0.506,
    "winByBracket": {
      "herald": 0.517,
      "guardian": 0.519,
      "crusader": 0.514,
      "archon": 0.512,
      "legend": 0.498,
      "ancient": 0.496,
      "divine": 0.481
    },
    "pickByBracket": {
      "herald": 10672,
      "guardian": 30536,
      "crusader": 41477,
      "archon": 45374,
      "legend": 37399,
      "ancient": 25970,
      "divine": 26002
    },
    "counters": [
      "ancient-apparition",
      "abaddon",
      "gyrocopter",
      "primal-beast",
      "mars",
      "void-spirit"
    ],
    "weakAgainst": [
      "treant-protector",
      "necrophos",
      "ursa",
      "drow-ranger",
      "monkey-king",
      "phoenix"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.524,
    "winByBracket": {
      "herald": 0.507,
      "guardian": 0.522,
      "crusader": 0.524,
      "archon": 0.53,
      "legend": 0.528,
      "ancient": 0.528,
      "divine": 0.52
    },
    "pickByBracket": {
      "herald": 24032,
      "guardian": 61966,
      "crusader": 73500,
      "archon": 68304,
      "legend": 50953,
      "ancient": 33671,
      "divine": 33736
    },
    "counters": [
      "death-prophet",
      "underlord",
      "void-spirit",
      "weaver",
      "lion",
      "night-stalker"
    ],
    "weakAgainst": [
      "monkey-king",
      "treant-protector",
      "naga-siren",
      "beastmaster",
      "witch-doctor",
      "marci"
    ],
    "startItems": [
      "Iron Branch",
      "Gauntlets of Strength",
      "Enchanted Mango",
      "Tango",
      "Blood Grenade",
      "Magic Stick"
    ],
    "coreItems": [
      "Arcane Boots",
      "Blink Dagger",
      "Ogre Axe",
      "Platemail",
      "Lotus Orb"
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
    "overallWin": 0.466,
    "winByBracket": {
      "herald": 0.449,
      "guardian": 0.456,
      "crusader": 0.467,
      "archon": 0.467,
      "legend": 0.469,
      "ancient": 0.472,
      "divine": 0.479
    },
    "pickByBracket": {
      "herald": 19173,
      "guardian": 45383,
      "crusader": 53669,
      "archon": 50566,
      "legend": 39055,
      "ancient": 24675,
      "divine": 23077
    },
    "counters": [
      "underlord",
      "muerta",
      "phantom-assassin",
      "timbersaw",
      "grimstroke",
      "morphling"
    ],
    "weakAgainst": [
      "mirana",
      "enigma",
      "treant-protector",
      "alchemist",
      "lycan",
      "bounty-hunter"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.54,
    "winByBracket": {
      "herald": 0.543,
      "guardian": 0.544,
      "crusader": 0.546,
      "archon": 0.544,
      "legend": 0.537,
      "ancient": 0.532,
      "divine": 0.526
    },
    "pickByBracket": {
      "herald": 23080,
      "guardian": 63263,
      "crusader": 85498,
      "archon": 91332,
      "legend": 75272,
      "ancient": 51064,
      "divine": 49453
    },
    "counters": [
      "void-spirit",
      "slardar",
      "lich",
      "morphling",
      "lina",
      "warlock"
    ],
    "weakAgainst": [
      "techies",
      "beastmaster",
      "dawnbreaker",
      "ring-master",
      "batrider",
      "phoenix"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Circlet",
      "Magic Stick",
      "Faerie Fire",
      "Blood Grenade"
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
    "overallWin": 0.473,
    "winByBracket": {
      "herald": 0.475,
      "guardian": 0.476,
      "crusader": 0.475,
      "archon": 0.471,
      "legend": 0.472,
      "ancient": 0.478,
      "divine": 0.461
    },
    "pickByBracket": {
      "herald": 21013,
      "guardian": 50913,
      "crusader": 59967,
      "archon": 55613,
      "legend": 41683,
      "ancient": 25865,
      "divine": 21858
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.491,
    "winByBracket": {
      "herald": 0.487,
      "guardian": 0.49,
      "crusader": 0.492,
      "archon": 0.492,
      "legend": 0.491,
      "ancient": 0.491,
      "divine": 0.494
    },
    "pickByBracket": {
      "herald": 31993,
      "guardian": 60057,
      "crusader": 60452,
      "archon": 52578,
      "legend": 36704,
      "ancient": 22260,
      "divine": 20524
    },
    "counters": [
      "bristleback",
      "morphling",
      "silencer",
      "ancient-apparition",
      "dragon-knight",
      "tidehunter"
    ],
    "weakAgainst": [
      "death-prophet",
      "slardar",
      "bane",
      "primal-beast",
      "zeus",
      "dazzle"
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
    "overallWin": 0.509,
    "winByBracket": {
      "herald": 0.483,
      "guardian": 0.487,
      "crusader": 0.498,
      "archon": 0.521,
      "legend": 0.508,
      "ancient": 0.533,
      "divine": 0.547
    },
    "pickByBracket": {
      "herald": 3973,
      "guardian": 8922,
      "crusader": 9720,
      "archon": 8557,
      "legend": 6378,
      "ancient": 4560,
      "divine": 5734
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
    "overallWin": 0.49,
    "winByBracket": {
      "herald": 0.473,
      "guardian": 0.48,
      "crusader": 0.488,
      "archon": 0.493,
      "legend": 0.495,
      "ancient": 0.495,
      "divine": 0.49
    },
    "pickByBracket": {
      "herald": 8606,
      "guardian": 21349,
      "crusader": 28298,
      "archon": 31289,
      "legend": 28238,
      "ancient": 21612,
      "divine": 24608
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.495,
    "winByBracket": {
      "herald": 0.511,
      "guardian": 0.506,
      "crusader": 0.499,
      "archon": 0.496,
      "legend": 0.489,
      "ancient": 0.483,
      "divine": 0.471
    },
    "pickByBracket": {
      "herald": 16675,
      "guardian": 43648,
      "crusader": 52670,
      "archon": 49388,
      "legend": 36222,
      "ancient": 22287,
      "divine": 19894
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.469,
    "winByBracket": {
      "herald": 0.477,
      "guardian": 0.468,
      "crusader": 0.472,
      "archon": 0.464,
      "legend": 0.469,
      "ancient": 0.468,
      "divine": 0.472
    },
    "pickByBracket": {
      "herald": 21952,
      "guardian": 47387,
      "crusader": 51520,
      "archon": 46141,
      "legend": 34578,
      "ancient": 20829,
      "divine": 19358
    },
    "counters": [
      "crystal-maiden",
      "sven",
      "ancient-apparition",
      "brewmaster",
      "lina",
      "gyrocopter"
    ],
    "weakAgainst": [
      "morphling",
      "monkey-king",
      "venomancer",
      "sniper",
      "centaur-warrunner",
      "invoker"
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
    "overallWin": 0.483,
    "winByBracket": {
      "herald": 0.487,
      "guardian": 0.477,
      "crusader": 0.478,
      "archon": 0.48,
      "legend": 0.484,
      "ancient": 0.491,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 34117,
      "guardian": 80776,
      "crusader": 95835,
      "archon": 93494,
      "legend": 73862,
      "ancient": 49059,
      "divine": 50381
    },
    "counters": [
      "oracle",
      "chaos-knight",
      "phantom-lancer",
      "morphling",
      "lina",
      "winter-wyvern"
    ],
    "weakAgainst": [
      "treant-protector",
      "naga-siren",
      "enigma",
      "lone-druid",
      "bane",
      "alchemist"
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
      "Maelstrom",
      "Blade of Alacrity",
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
    "overallWin": 0.485,
    "winByBracket": {
      "herald": 0.475,
      "guardian": 0.477,
      "crusader": 0.479,
      "archon": 0.483,
      "legend": 0.485,
      "ancient": 0.492,
      "divine": 0.51
    },
    "pickByBracket": {
      "herald": 11380,
      "guardian": 28758,
      "crusader": 32786,
      "archon": 29989,
      "legend": 23159,
      "ancient": 15639,
      "divine": 17718
    },
    "counters": [
      "slardar",
      "void-spirit",
      "shadow-shaman",
      "pangolier",
      "hoodwink"
    ],
    "weakAgainst": [
      "marci",
      "snapfire",
      "ogre-magi",
      "axe",
      "ember-spirit",
      "windranger"
    ],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.519,
    "winByBracket": {
      "herald": 0.531,
      "guardian": 0.527,
      "crusader": 0.525,
      "archon": 0.52,
      "legend": 0.513,
      "ancient": 0.51,
      "divine": 0.496
    },
    "pickByBracket": {
      "herald": 34734,
      "guardian": 88824,
      "crusader": 105025,
      "archon": 96304,
      "legend": 69426,
      "ancient": 41557,
      "divine": 34401
    },
    "counters": [],
    "weakAgainst": [],
    "startItems": [],
    "coreItems": []
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
    "overallWin": 0.552,
    "winByBracket": {
      "herald": 0.566,
      "guardian": 0.561,
      "crusader": 0.556,
      "archon": 0.552,
      "legend": 0.546,
      "ancient": 0.536,
      "divine": 0.532
    },
    "pickByBracket": {
      "herald": 31388,
      "guardian": 77416,
      "crusader": 90175,
      "archon": 83939,
      "legend": 59921,
      "ancient": 35321,
      "divine": 27019
    },
    "counters": [
      "zeus",
      "tiny",
      "silencer",
      "shadow-shaman",
      "abaddon",
      "tidehunter"
    ],
    "weakAgainst": [
      "earthshaker",
      "pudge",
      "lich",
      "necrophos",
      "snapfire",
      "dragon-knight"
    ],
    "startItems": [
      "Iron Branch",
      "Quelling Blade",
      "Tango",
      "Gauntlets of Strength",
      "Magic Stick",
      "Circlet"
    ],
    "coreItems": [
      "Talisman of Evasion",
      "Sacred Relic",
      "Radiance",
      "Blink Dagger",
      "Mithril Hammer"
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
    "overallWin": 0.516,
    "winByBracket": {
      "herald": 0.511,
      "guardian": 0.519,
      "crusader": 0.521,
      "archon": 0.518,
      "legend": 0.514,
      "ancient": 0.515,
      "divine": 0.505
    },
    "pickByBracket": {
      "herald": 37523,
      "guardian": 94548,
      "crusader": 117129,
      "archon": 116623,
      "legend": 94008,
      "ancient": 63141,
      "divine": 64511
    },
    "counters": [
      "mirana",
      "viper",
      "medusa",
      "slardar",
      "shadow-demon",
      "dawnbreaker"
    ],
    "weakAgainst": [
      "juggernaut",
      "void-spirit",
      "wraith-king",
      "keeper-of-the-light",
      "beastmaster",
      "windranger"
    ],
    "startItems": [
      "Iron Branch",
      "Tango",
      "Observer Ward",
      "Enchanted Mango",
      "Faerie Fire",
      "Blood Grenade"
    ],
    "coreItems": [
      "Staff of Wizardry",
      "Ogre Axe",
      "Point Booster",
      "Blade of Alacrity",
      "Kaya"
    ]
  }
];

export const HERO_DATA_BY_ID: Record<string, HeroData> = Object.fromEntries(
  HERO_DATA.map((h) => [h.id, h]),
);
