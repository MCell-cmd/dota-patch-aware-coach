/* global console, process, fetch, setTimeout */

// Sincroniza datos REALES del parche vigente desde el datafeed público de Valve
// y genera src/data/patchNotes.generated.ts.
//
// Por cada héroe que recibió cambios en el último parche guarda:
//   - changeCount: número real de notas (héroe + habilidades + talentos)
//   - hasItemRelevantChange / icons: pistas de qué tipo de cambio recibió
//
// El TEXTO en prosa de cada cambio NO lo expone Valve en este feed (solo claves
// de localización), así que esa parte se enlaza a las notas oficiales. Lo que sí
// es real y refrescable: QUÉ héroes cambiaron, CUÁNTOS cambios y CUÁNDO salió.
//
// Endpoints (públicos, sin credenciales):
//   https://www.dota2.com/datafeed/patchnoteslist   -> versiones + timestamp
//   https://www.dota2.com/datafeed/patchnotes?version=X -> cambios estructurados
//   https://api.opendota.com/api/constants/heroes    -> hero_id numérico -> slug
//
// Uso:  node scripts/sync-patch-notes.mjs

import fs from "node:fs/promises";
import path from "node:path";

const VALVE = "https://www.dota2.com/datafeed";
const OPENDOTA = "https://api.opendota.com/api";
const OUT = path.join("src", "data", "patchNotes.generated.ts");

async function getJson(url, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" } });
      if (!res.ok) throw new Error(`${res.status} en ${url}`);
      return await res.json();
    } catch (err) {
      if (attempt === tries) throw err;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
}

function slugify(localizedName) {
  return localizedName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countNotes(hero) {
  let n = (hero.hero_notes?.length ?? 0) + (hero.talent_notes?.length ?? 0);
  for (const ab of hero.abilities ?? []) {
    n += ab.ability_notes?.length ?? 0;
  }
  return n;
}

async function main() {
  console.log("1/3  lista de parches…");
  const list = await getJson(`${VALVE}/patchnoteslist`);
  const patches = list.patches ?? list;
  const latest = [...patches].sort((a, b) => (b.patch_timestamp ?? 0) - (a.patch_timestamp ?? 0))[0];
  const version = latest.patch_name ?? latest.patch_number ?? latest.name;
  console.log(`     último parche: ${version} (${new Date(latest.patch_timestamp * 1000).toISOString().slice(0, 10)})`);

  console.log("2/3  notas estructuradas…");
  const notes = await getJson(`${VALVE}/patchnotes?version=${encodeURIComponent(version)}`);

  console.log("3/3  constantes de héroes (OpenDota)…");
  const heroConst = await getJson(`${OPENDOTA}/constants/heroes`);
  const idToSlug = new Map();
  const idToName = new Map();
  for (const h of Object.values(heroConst)) {
    if (h && typeof h.id === "number") {
      idToSlug.set(h.id, slugify(h.localized_name));
      idToName.set(h.id, h.localized_name);
    }
  }

  const heroes = (notes.heroes ?? [])
    .map((h) => {
      const slug = idToSlug.get(h.hero_id);
      if (!slug) return null;
      const icons = new Set();
      for (const note of h.hero_notes ?? []) if (note.icon) icons.add(note.icon);
      return {
        id: slug,
        name: idToName.get(h.hero_id) ?? slug,
        numericId: h.hero_id,
        changeCount: countNotes(h),
        abilitiesChanged: (h.abilities ?? []).length,
        icons: [...icons],
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.changeCount - a.changeCount);

  const releasedAt = new Date(notes.patch_timestamp * 1000).toISOString().slice(0, 10);
  const banner = `// Auto-generado por scripts/sync-patch-notes.mjs desde el datafeed público de Valve.
// NO editar a mano. Re-sincroniza con: node scripts/sync-patch-notes.mjs
// Última sync: ${new Date().toISOString().slice(0, 10)}
// Fuente: https://www.dota2.com/datafeed/patchnotes (cambios reales del parche).
`;

  const body = `${banner}
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
  version: ${JSON.stringify(version)},
  releasedAt: ${JSON.stringify(releasedAt)},
  sourceUrl: ${JSON.stringify(`https://www.dota2.com/patches/${version}`)},
  heroesChanged: ${heroes.length},
  itemsChanged: ${(notes.items ?? []).length},
  neutralItemsChanged: ${(notes.neutral_items ?? []).length},
} as const;

export const HERO_PATCH_CHANGES: readonly HeroPatchChange[] = ${JSON.stringify(heroes, null, 2)};

export const HERO_PATCH_CHANGES_BY_ID: Record<string, HeroPatchChange> = Object.fromEntries(
  HERO_PATCH_CHANGES.map((h) => [h.id, h]),
);
`;

  await fs.writeFile(OUT, body, "utf8");
  console.log(`Listo: ${OUT} (${heroes.length} héroes con cambios en ${version}).`);
}

main().catch((err) => {
  console.error("Fallo en sync de parche:", err);
  process.exit(1);
});
