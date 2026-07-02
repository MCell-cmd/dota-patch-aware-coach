// Auto-generado por scripts/sync-patch-notes.mjs desde el datafeed público de Valve.
// NO editar a mano. Re-sincroniza con: node scripts/sync-patch-notes.mjs
// Última sync: 2026-07-02
// Fuente: https://www.dota2.com/datafeed/patchnotes (cambios reales del parche).

export type HeroPatchChange = {
  /** slug del héroe (coincide con HERO_DATA y HEROES). */
  id: string;
  name: string;
  numericId: number;
  /** Número real de líneas de cambio (héroe + habilidades + talentos) en este parche. */
  changeCount: number;
  /** Cuántas habilidades distintas recibieron ajustes. */
  abilitiesChanged: number;
  /** Iconos que Valve adjunta a las notas (p. ej. "damage", "agility"): pista del tipo de cambio. */
  icons: string[];
};

export const PATCH_NOTES_META = {
  version: "7.41d",
  releasedAt: "2026-06-04",
  sourceUrl: "https://www.dota2.com/patches/7.41d",
  heroesChanged: 81,
  itemsChanged: 3,
  neutralItemsChanged: 15,
} as const;

export const HERO_PATCH_CHANGES: readonly HeroPatchChange[] = [
  {
    "id": "morphling",
    "name": "Morphling",
    "numericId": 10,
    "changeCount": 7,
    "abilitiesChanged": 2,
    "icons": [
      "strength",
      "agility",
      "damage"
    ]
  },
  {
    "id": "tiny",
    "name": "Tiny",
    "numericId": 19,
    "changeCount": 7,
    "abilitiesChanged": 6,
    "icons": []
  },
  {
    "id": "spectre",
    "name": "Spectre",
    "numericId": 67,
    "changeCount": 7,
    "abilitiesChanged": 3,
    "icons": [
      "strength",
      "agility"
    ]
  },
  {
    "id": "wraith-king",
    "name": "Wraith King",
    "numericId": 42,
    "changeCount": 5,
    "abilitiesChanged": 2,
    "icons": [
      "damage"
    ]
  },
  {
    "id": "gyrocopter",
    "name": "Gyrocopter",
    "numericId": 72,
    "changeCount": 5,
    "abilitiesChanged": 3,
    "icons": []
  },
  {
    "id": "timbersaw",
    "name": "Timbersaw",
    "numericId": 98,
    "changeCount": 5,
    "abilitiesChanged": 2,
    "icons": [
      "attack_speed"
    ]
  },
  {
    "id": "kez",
    "name": "Kez",
    "numericId": 145,
    "changeCount": 5,
    "abilitiesChanged": 3,
    "icons": []
  },
  {
    "id": "clockwerk",
    "name": "Clockwerk",
    "numericId": 51,
    "changeCount": 4,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "jakiro",
    "name": "Jakiro",
    "numericId": 64,
    "changeCount": 4,
    "abilitiesChanged": 0,
    "icons": [
      "intelligence",
      "damage"
    ]
  },
  {
    "id": "brewmaster",
    "name": "Brewmaster",
    "numericId": 78,
    "changeCount": 4,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "anti-mage",
    "name": "Anti-Mage",
    "numericId": 1,
    "changeCount": 3,
    "abilitiesChanged": 1,
    "icons": [
      "agility",
      "damage"
    ]
  },
  {
    "id": "riki",
    "name": "Riki",
    "numericId": 32,
    "changeCount": 3,
    "abilitiesChanged": 3,
    "icons": []
  },
  {
    "id": "templar-assassin",
    "name": "Templar Assassin",
    "numericId": 46,
    "changeCount": 3,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "ancient-apparition",
    "name": "Ancient Apparition",
    "numericId": 68,
    "changeCount": 3,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "invoker",
    "name": "Invoker",
    "numericId": 74,
    "changeCount": 3,
    "abilitiesChanged": 3,
    "icons": []
  },
  {
    "id": "outworld-devourer",
    "name": "Outworld Devourer",
    "numericId": 76,
    "changeCount": 3,
    "abilitiesChanged": 0,
    "icons": [
      "damage"
    ]
  },
  {
    "id": "dark-willow",
    "name": "Dark Willow",
    "numericId": 119,
    "changeCount": 3,
    "abilitiesChanged": 1,
    "icons": [
      "intelligence",
      "damage"
    ]
  },
  {
    "id": "pangolier",
    "name": "Pangolier",
    "numericId": 120,
    "changeCount": 3,
    "abilitiesChanged": 0,
    "icons": [
      "agility",
      "damage",
      "armor"
    ]
  },
  {
    "id": "snapfire",
    "name": "Snapfire",
    "numericId": 128,
    "changeCount": 3,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "mars",
    "name": "Mars",
    "numericId": 129,
    "changeCount": 3,
    "abilitiesChanged": 3,
    "icons": []
  },
  {
    "id": "axe",
    "name": "Axe",
    "numericId": 2,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": [
      "health_regen"
    ]
  },
  {
    "id": "bloodseeker",
    "name": "Bloodseeker",
    "numericId": 4,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "mirana",
    "name": "Mirana",
    "numericId": 9,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "puck",
    "name": "Puck",
    "numericId": 13,
    "changeCount": 2,
    "abilitiesChanged": 0,
    "icons": [
      "agility"
    ]
  },
  {
    "id": "sand-king",
    "name": "Sand King",
    "numericId": 16,
    "changeCount": 2,
    "abilitiesChanged": 0,
    "icons": [
      "strength",
      "damage"
    ]
  },
  {
    "id": "storm-spirit",
    "name": "Storm Spirit",
    "numericId": 17,
    "changeCount": 2,
    "abilitiesChanged": 0,
    "icons": [
      "attack_speed"
    ]
  },
  {
    "id": "sven",
    "name": "Sven",
    "numericId": 18,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "vengeful-spirit",
    "name": "Vengeful Spirit",
    "numericId": 20,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": [
      "health_regen"
    ]
  },
  {
    "id": "lion",
    "name": "Lion",
    "numericId": 26,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "shadow-shaman",
    "name": "Shadow Shaman",
    "numericId": 27,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "warlock",
    "name": "Warlock",
    "numericId": 37,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "venomancer",
    "name": "Venomancer",
    "numericId": 40,
    "changeCount": 2,
    "abilitiesChanged": 0,
    "icons": [
      "intelligence",
      "damage"
    ]
  },
  {
    "id": "faceless-void",
    "name": "Faceless Void",
    "numericId": 41,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "pugna",
    "name": "Pugna",
    "numericId": 45,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": [
      "mana_regen"
    ]
  },
  {
    "id": "dragon-knight",
    "name": "Dragon Knight",
    "numericId": 49,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "leshrac",
    "name": "Leshrac",
    "numericId": 52,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "nature-s-prophet",
    "name": "Nature's Prophet",
    "numericId": 53,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "doom",
    "name": "Doom",
    "numericId": 69,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": [
      "intelligence"
    ]
  },
  {
    "id": "spirit-breaker",
    "name": "Spirit Breaker",
    "numericId": 71,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "shadow-demon",
    "name": "Shadow Demon",
    "numericId": 79,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "ogre-magi",
    "name": "Ogre Magi",
    "numericId": 84,
    "changeCount": 2,
    "abilitiesChanged": 0,
    "icons": [
      "strength",
      "damage"
    ]
  },
  {
    "id": "rubick",
    "name": "Rubick",
    "numericId": 86,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "disruptor",
    "name": "Disruptor",
    "numericId": 87,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": [
      "movement"
    ]
  },
  {
    "id": "abaddon",
    "name": "Abaddon",
    "numericId": 102,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": [
      "attack_speed"
    ]
  },
  {
    "id": "elder-titan",
    "name": "Elder Titan",
    "numericId": 103,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "techies",
    "name": "Techies",
    "numericId": 105,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "phoenix",
    "name": "Phoenix",
    "numericId": 110,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "winter-wyvern",
    "name": "Winter Wyvern",
    "numericId": 112,
    "changeCount": 2,
    "abilitiesChanged": 0,
    "icons": []
  },
  {
    "id": "arc-warden",
    "name": "Arc Warden",
    "numericId": 113,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "grimstroke",
    "name": "Grimstroke",
    "numericId": 121,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "hoodwink",
    "name": "Hoodwink",
    "numericId": 123,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "ring-master",
    "name": "Ring Master",
    "numericId": 131,
    "changeCount": 2,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "marci",
    "name": "Marci",
    "numericId": 136,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "largo",
    "name": "Largo",
    "numericId": 155,
    "changeCount": 2,
    "abilitiesChanged": 2,
    "icons": []
  },
  {
    "id": "earthshaker",
    "name": "Earthshaker",
    "numericId": 7,
    "changeCount": 1,
    "abilitiesChanged": 0,
    "icons": [
      "mana_regen"
    ]
  },
  {
    "id": "juggernaut",
    "name": "Juggernaut",
    "numericId": 8,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "pudge",
    "name": "Pudge",
    "numericId": 14,
    "changeCount": 1,
    "abilitiesChanged": 0,
    "icons": [
      "agility"
    ]
  },
  {
    "id": "razor",
    "name": "Razor",
    "numericId": 15,
    "changeCount": 1,
    "abilitiesChanged": 0,
    "icons": [
      "attack_speed"
    ]
  },
  {
    "id": "lina",
    "name": "Lina",
    "numericId": 25,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "slardar",
    "name": "Slardar",
    "numericId": 28,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "enigma",
    "name": "Enigma",
    "numericId": 33,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "sniper",
    "name": "Sniper",
    "numericId": 35,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "dazzle",
    "name": "Dazzle",
    "numericId": 50,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "dark-seer",
    "name": "Dark Seer",
    "numericId": 55,
    "changeCount": 1,
    "abilitiesChanged": 0,
    "icons": [
      "health_regen"
    ]
  },
  {
    "id": "clinkz",
    "name": "Clinkz",
    "numericId": 56,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "omniknight",
    "name": "Omniknight",
    "numericId": 57,
    "changeCount": 1,
    "abilitiesChanged": 0,
    "icons": [
      "intelligence"
    ]
  },
  {
    "id": "huskar",
    "name": "Huskar",
    "numericId": 59,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "night-stalker",
    "name": "Night Stalker",
    "numericId": 60,
    "changeCount": 1,
    "abilitiesChanged": 0,
    "icons": []
  },
  {
    "id": "broodmother",
    "name": "Broodmother",
    "numericId": 61,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "bounty-hunter",
    "name": "Bounty Hunter",
    "numericId": 62,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "weaver",
    "name": "Weaver",
    "numericId": 63,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "chaos-knight",
    "name": "Chaos Knight",
    "numericId": 81,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "undying",
    "name": "Undying",
    "numericId": 85,
    "changeCount": 1,
    "abilitiesChanged": 0,
    "icons": [
      "mana_regen"
    ]
  },
  {
    "id": "visage",
    "name": "Visage",
    "numericId": 92,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "slark",
    "name": "Slark",
    "numericId": 93,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "troll-warlord",
    "name": "Troll Warlord",
    "numericId": 95,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "skywrath-mage",
    "name": "Skywrath Mage",
    "numericId": 101,
    "changeCount": 1,
    "abilitiesChanged": 0,
    "icons": [
      "strength"
    ]
  },
  {
    "id": "legion-commander",
    "name": "Legion Commander",
    "numericId": 104,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "ember-spirit",
    "name": "Ember Spirit",
    "numericId": 106,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "earth-spirit",
    "name": "Earth Spirit",
    "numericId": 107,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  },
  {
    "id": "dawnbreaker",
    "name": "Dawnbreaker",
    "numericId": 135,
    "changeCount": 1,
    "abilitiesChanged": 1,
    "icons": []
  }
];

export const HERO_PATCH_CHANGES_BY_ID: Record<string, HeroPatchChange> = Object.fromEntries(
  HERO_PATCH_CHANGES.map((h) => [h.id, h]),
);
