/* global console, process, fetch, setTimeout */

// Sincroniza datos reales de OpenDota (uso público, sin credenciales) y genera
// src/data/heroData.generated.ts con, por cada uno de los 127 héroes:
//   - winrate y pickrate por bracket (Herald..Divine) -> señal de meta real
//   - counters / weakAgainst calculados de matchups reales (no inventados)
//   - startItems / coreItems reales de itemPopularity
//
// Endpoints:
//   /api/heroStats                  -> 1 llamada (todos los héroes + brackets)
//   /api/constants/items            -> 1 llamada (id de item -> nombre)
//   /api/heroes/{id}/matchups       -> 1 por héroe
//   /api/heroes/{id}/itemPopularity -> 1 por héroe
//
// Rate limit gratis ~60/min: lanzamos en lotes con pausa. Si existe
// OPENDOTA_API_KEY se adjunta para subir el límite (opcional).
//
// Uso:  node scripts/sync-dota-data.mjs

import fs from "node:fs/promises";
import path from "node:path";

const BASE = "https://api.opendota.com/api";
const OUT = path.join("src", "data", "heroData.generated.ts");

// OpenDota tiers 1..7 = Herald..Divine (8 = Immortal, casi siempre 0 en pub).
const BRACKETS = ["herald", "guardian", "crusader", "archon", "legend", "ancient", "divine"];

// Umbrales para clasificar matchups como counter/weak (sobre winrate del héroe
// observado vs el oponente). Pedimos un mínimo de partidas para evitar ruido.
const MIN_GAMES = 50;
const COUNTER_WR = 0.52; // el héroe le gana al oponente -> lo "counterea"
const WEAK_WR = 0.48; // el héroe pierde -> es weakAgainst
const MAX_LIST = 6; // cuántos counters/weak guardamos (los más fuertes)
const MAX_START = 6;
const MAX_CORE = 5;
const BATCH = 8; // llamadas concurrentes por lote
const PAUSE_MS = 1100; // pausa entre lotes (respeta ~60/min)

function withKey(url) {
  const key = process.env.OPENDOTA_API_KEY;
  if (!key) return url;
  return `${url}${url.includes("?") ? "&" : "?"}api_key=${key}`;
}

async function getJson(url, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(withKey(url));
      if (res.status === 429) {
        await sleep(3000 * attempt);
        continue;
      }
      if (!res.ok) throw new Error(`${res.status} en ${url}`);
      return await res.json();
    } catch (err) {
      if (attempt === tries) throw err;
      await sleep(1500 * attempt);
    }
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slugify(localizedName) {
  return localizedName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function shortNameFromNpc(npc) {
  return npc.replace(/^npc_dota_hero_/, "");
}

function topItems(map, itemNames, limit) {
  if (!map) return [];
  return Object.entries(map)
    .map(([id, count]) => ({ name: itemNames.get(Number(id)), count: Number(count) }))
    .filter((x) => x.name && !/recipe/i.test(x.name))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((x) => x.name);
}

async function main() {
  console.log("1/4  heroStats…");
  const heroStats = await getJson(`${BASE}/heroStats`);

  console.log("2/4  constants/items…");
  const itemsConst = await getJson(`${BASE}/constants/items`);
  const itemNames = new Map();
  for (const item of Object.values(itemsConst)) {
    if (item && typeof item.id === "number" && item.dname) {
      itemNames.set(item.id, item.dname);
    }
  }

  // id numérico -> slug, para traducir matchups (vienen por hero_id numérico).
  const idToSlug = new Map();
  const idToName = new Map();
  for (const h of heroStats) {
    idToSlug.set(h.id, slugify(h.localized_name));
    idToName.set(h.id, h.localized_name);
  }

  console.log(`3/4  matchups + itemPopularity (${heroStats.length} héroes, en lotes)…`);
  const perHero = new Map();
  for (let i = 0; i < heroStats.length; i += BATCH) {
    const batch = heroStats.slice(i, i + BATCH);
    await Promise.all(
      batch.map(async (h) => {
        const [matchups, items] = await Promise.all([
          getJson(`${BASE}/heroes/${h.id}/matchups`),
          getJson(`${BASE}/heroes/${h.id}/itemPopularity`),
        ]);
        perHero.set(h.id, { matchups, items });
      }),
    );
    process.stdout.write(`   ${Math.min(i + BATCH, heroStats.length)}/${heroStats.length}\r`);
    if (i + BATCH < heroStats.length) await sleep(PAUSE_MS);
  }
  console.log("");

  console.log("4/4  generando archivo…");
  const heroes = heroStats
    .map((h) => {
      const slug = slugify(h.localized_name);
      const data = perHero.get(h.id) ?? {};

      const winByBracket = {};
      const pickByBracket = {};
      let totalPick = 0;
      let totalWin = 0;
      BRACKETS.forEach((b, idx) => {
        const tier = idx + 1;
        const pick = h[`${tier}_pick`] ?? 0;
        const win = h[`${tier}_win`] ?? 0;
        winByBracket[b] = pick > 0 ? Math.round((win / pick) * 1000) / 1000 : 0;
        pickByBracket[b] = pick;
        totalPick += pick;
        totalWin += win;
      });
      const overallWin = totalPick > 0 ? Math.round((totalWin / totalPick) * 1000) / 1000 : 0;

      // Matchups: winrate del héroe observado vs cada oponente.
      const counters = [];
      const weakAgainst = [];
      for (const m of data.matchups ?? []) {
        if (m.games_played < MIN_GAMES) continue;
        const wr = m.wins / m.games_played;
        const oppSlug = idToSlug.get(m.hero_id);
        if (!oppSlug) continue;
        if (wr >= COUNTER_WR) counters.push({ slug: oppSlug, edge: wr });
        else if (wr <= WEAK_WR) weakAgainst.push({ slug: oppSlug, edge: 1 - wr });
      }
      counters.sort((a, b) => b.edge - a.edge);
      weakAgainst.sort((a, b) => b.edge - a.edge);

      return {
        id: slug,
        numericId: h.id,
        name: h.localized_name,
        shortName: shortNameFromNpc(h.name),
        primaryAttr: h.primary_attr,
        attackType: h.attack_type,
        roles: h.roles ?? [],
        overallWin,
        winByBracket,
        pickByBracket,
        counters: counters.slice(0, MAX_LIST).map((x) => x.slug),
        weakAgainst: weakAgainst.slice(0, MAX_LIST).map((x) => x.slug),
        startItems: topItems(data.items?.start_game_items, itemNames, MAX_START),
        coreItems: topItems(data.items?.mid_game_items, itemNames, MAX_CORE),
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  const banner = `// Auto-generado por scripts/sync-dota-data.mjs desde la API pública de OpenDota.
// NO editar a mano. Re-sincroniza con: node scripts/sync-dota-data.mjs
// Última sync: ${new Date().toISOString().slice(0, 10)}
// Fuente: https://api.opendota.com (heroStats, matchups, itemPopularity).
`;

  const body = `${banner}
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
  /** Héroes a los que este héroe le gana (winrate real >= ${COUNTER_WR}). */
  counters: string[];
  /** Héroes que le ganan a este héroe (winrate real <= ${WEAK_WR}). */
  weakAgainst: string[];
  /** Objetos de inicio reales más comprados. */
  startItems: string[];
  /** Objetos de mid game reales más comprados (primer core). */
  coreItems: string[];
};

export const HERO_DATA: readonly HeroData[] = ${JSON.stringify(heroes, null, 2)};

export const HERO_DATA_BY_ID: Record<string, HeroData> = Object.fromEntries(
  HERO_DATA.map((h) => [h.id, h]),
);
`;

  await fs.writeFile(OUT, body, "utf8");
  console.log(`Listo: ${OUT} (${heroes.length} héroes).`);
}

main().catch((err) => {
  console.error("Fallo en sync:", err);
  process.exit(1);
});
