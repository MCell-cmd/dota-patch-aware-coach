// Estado del parche vigente, respaldado por datos REALES del datafeed oficial de
// Valve (generados en patchNotes.generated.ts por scripts/sync-patch-notes.mjs).
// Antes esto eran listas de héroes tecleadas a mano; ahora "qué héroes cambiaron,
// cuántos cambios y cuándo salió el parche" viene directo de Valve.

import {
  HERO_PATCH_CHANGES_BY_ID,
  PATCH_NOTES_META,
  type HeroPatchChange,
} from "@/data/patchNotes.generated";

export type PatchSource = {
  label: string;
  url: string;
};

export type PatchRecord = {
  version: string;
  releasedAt: string;
  source: PatchSource;
  heroesChanged: number;
  itemsChanged: number;
  neutralItemsChanged: number;
};

export const PATCH_SOURCE: PatchSource = {
  label: `Valve · Notas oficiales ${PATCH_NOTES_META.version}`,
  url: PATCH_NOTES_META.sourceUrl,
};

export function getActivePatch(): PatchRecord {
  return {
    version: PATCH_NOTES_META.version,
    releasedAt: PATCH_NOTES_META.releasedAt,
    source: PATCH_SOURCE,
    heroesChanged: PATCH_NOTES_META.heroesChanged,
    itemsChanged: PATCH_NOTES_META.itemsChanged,
    neutralItemsChanged: PATCH_NOTES_META.neutralItemsChanged,
  };
}

/** Cambios reales (conteo + iconos) del héroe en el parche vigente, o undefined. */
export function getHeroPatchChange(heroId: string): HeroPatchChange | undefined {
  return HERO_PATCH_CHANGES_BY_ID[heroId];
}

export function heroChangedThisPatch(heroId: string): boolean {
  return Boolean(HERO_PATCH_CHANGES_BY_ID[heroId]);
}
