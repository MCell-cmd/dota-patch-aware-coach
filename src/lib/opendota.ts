// Integración real con la API pública de OpenDota.
// Fuente: https://docs.opendota.com/  (uso público, sin credenciales).
// Si existe OPENDOTA_API_KEY se adjunta para subir el rate limit, pero no es
// obligatoria para el MVP.

import type { BenchmarkBar } from "@/data/dota";

const OPENDOTA_BASE = "https://api.opendota.com/api";

export type OpenDotaPlayer = {
  account_id: number | null;
  player_slot: number;
  hero_id: number;
  lane_role: number | null;
  kills: number;
  deaths: number;
  assists: number;
  gold_per_min: number;
  xp_per_min: number;
  last_hits: number;
  denies: number;
  hero_damage: number | null;
  tower_damage: number | null;
  hero_healing: number | null;
  net_worth: number | null;
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  // Solo presentes en partidas parseadas (series por minuto).
  lh_t?: number[] | null;
  gold_t?: number[] | null;
  xp_t?: number[] | null;
  // Visión. obs_placed/sen_placed/obs_log requieren partida parseada; los kills y
  // las compras suelen venir incluso sin parsear.
  obs_placed?: number | null;
  sen_placed?: number | null;
  observer_kills?: number | null;
  sentry_kills?: number | null;
  purchase_ward_observer?: number | null;
  purchase_ward_sentry?: number | null;
  obs_log?: Array<{ time: number }> | null;
  // Percentiles relativos al héroe que calcula OpenDota (pct entre 0 y 1).
  benchmarks?: Record<string, { raw: number; pct: number }> | null;
};

// Métricas de benchmark que mostramos, en orden de relevancia, con su etiqueta y
// formato del valor crudo. Se omite hero_healing porque con raw=0 OpenDota
// devuelve un percentil engañosamente alto.
const BENCHMARK_METRICS: ReadonlyArray<{
  key: string;
  label: string;
  format: (raw: number) => string;
}> = [
  { key: "gold_per_min", label: "Oro por minuto (GPM)", format: (r) => `${Math.round(r)} GPM` },
  { key: "xp_per_min", label: "Experiencia por minuto (XPM)", format: (r) => `${Math.round(r)} XPM` },
  { key: "last_hits_per_min", label: "Last hits por minuto", format: (r) => `${r.toFixed(1)} LH/min` },
  { key: "hero_damage_per_min", label: "Daño a héroes por minuto", format: (r) => `${Math.round(r).toLocaleString()} /min` },
  { key: "kills_per_min", label: "Kills por minuto", format: (r) => r.toFixed(2) },
  { key: "tower_damage", label: "Daño a torres", format: (r) => Math.round(r).toLocaleString() },
];

function normalizeBenchmarks(
  raw: OpenDotaPlayer["benchmarks"],
): BenchmarkBar[] {
  if (!raw) return [];
  const bars: BenchmarkBar[] = [];
  for (const metric of BENCHMARK_METRICS) {
    const entry = raw[metric.key];
    if (entry && typeof entry.pct === "number" && typeof entry.raw === "number") {
      bars.push({
        label: metric.label,
        pct: Math.max(0, Math.min(1, entry.pct)),
        valueLabel: metric.format(entry.raw),
      });
    }
  }
  return bars;
}

export type OpenDotaMatch = {
  match_id: number;
  duration: number;
  radiant_win: boolean;
  start_time: number;
  game_mode: number;
  version: number | null; // si no es null, la partida fue parseada
  patch?: number | null;
  players: OpenDotaPlayer[];
};

export type NormalizedPlayer = {
  accountId: number | null;
  slot: number;
  isRadiant: boolean;
  heroId: number;
  heroName: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  gpm: number;
  xpm: number;
  lastHits: number;
  denies: number;
  heroDamage: number;
  towerDamage: number;
  heroHealing: number;
  netWorth: number;
  laneRole: number | null;
  won: boolean;
  // Derivados de la serie por minuto (null si la partida no está parseada).
  lastHitsAt10: number | null;
  goldAt10: number | null;
  // Percentiles vs otros jugadores del mismo héroe (vacío si OpenDota no los trae).
  benchmarks: BenchmarkBar[];
  // Visión real de la partida. obsPlaced/senPlaced/firstWardTime son null si la
  // partida no está parseada; los dewards y compras suelen estar igual.
  vision: {
    obsPlaced: number | null;
    senPlaced: number | null;
    observerKills: number;
    sentryKills: number;
    obsBought: number | null;
    senBought: number | null;
    firstWardSeconds: number | null;
  };
};

export type NormalizedMatch = {
  matchId: number;
  durationSeconds: number;
  durationLabel: string;
  radiantWin: boolean;
  parsed: boolean;
  startTime: number;
  players: NormalizedPlayer[];
};

export class OpenDotaError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "OpenDotaError";
  }
}

function withKey(url: string): string {
  const key = process.env.OPENDOTA_API_KEY;
  if (!key) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}api_key=${key}`;
}

/** Mapa hero_id (numérico de OpenDota) -> nombre legible. Cacheado 24h. */
export async function fetchHeroConstants(): Promise<Map<number, string>> {
  const res = await fetch(withKey(`${OPENDOTA_BASE}/constants/heroes`), {
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new OpenDotaError("No se pudieron cargar las constantes de héroes.", res.status);
  }
  const data = (await res.json()) as Record<
    string,
    { id: number; localized_name: string }
  >;
  const map = new Map<number, string>();
  for (const hero of Object.values(data)) {
    if (hero && typeof hero.id === "number") {
      map.set(hero.id, hero.localized_name);
    }
  }
  return map;
}

export async function fetchMatch(
  matchId: string | number,
  options: { noCache?: boolean } = {},
): Promise<OpenDotaMatch> {
  const id = String(matchId).trim();
  if (!/^\d{6,}$/.test(id)) {
    throw new OpenDotaError("Match ID inválido: debe ser numérico y público.", 400);
  }

  const res = await fetch(
    withKey(`${OPENDOTA_BASE}/matches/${id}`),
    options.noCache ? { cache: "no-store" } : { next: { revalidate: 600 } },
  );

  if (res.status === 404) {
    throw new OpenDotaError("Partida no encontrada en OpenDota.", 404);
  }
  if (res.status === 429) {
    throw new OpenDotaError("Límite de OpenDota alcanzado, intenta en un minuto.", 429);
  }
  if (!res.ok) {
    throw new OpenDotaError(`OpenDota respondió ${res.status}.`, res.status);
  }

  const match = (await res.json()) as OpenDotaMatch;
  if (!match || !Array.isArray(match.players)) {
    throw new OpenDotaError("Respuesta de OpenDota sin datos de jugadores.", 502);
  }
  return match;
}

/**
 * Pide a OpenDota que parsee una partida (genera la serie por minuto, lanes,
 * objetivos, etc.). El parseo es asíncrono en sus workers; devuelve true si la
 * solicitud se aceptó. Reconsulta la partida pasados unos minutos para ver
 * `parsed: true`.
 */
export async function requestParse(matchId: string | number): Promise<boolean> {
  const id = String(matchId).trim();
  if (!/^\d{6,}$/.test(id)) {
    throw new OpenDotaError("Match ID inválido: debe ser numérico y público.", 400);
  }
  const res = await fetch(withKey(`${OPENDOTA_BASE}/request/${id}`), {
    method: "POST",
    cache: "no-store",
  });
  if (res.status === 429) {
    throw new OpenDotaError("Límite de OpenDota alcanzado, intenta en un minuto.", 429);
  }
  return res.ok;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function normalizeMatch(
  match: OpenDotaMatch,
  heroes: Map<number, string>,
): NormalizedMatch {
  const players: NormalizedPlayer[] = match.players.map((p) => {
    const isRadiant = p.player_slot < 128;
    const deaths = p.deaths || 0;
    const kills = p.kills || 0;
    const assists = p.assists || 0;
    return {
      accountId: p.account_id ?? null,
      slot: p.player_slot,
      isRadiant,
      heroId: p.hero_id,
      heroName: heroes.get(p.hero_id) ?? `Héroe #${p.hero_id}`,
      kills,
      deaths,
      assists,
      kda: Math.round(((kills + assists) / Math.max(1, deaths)) * 10) / 10,
      gpm: p.gold_per_min || 0,
      xpm: p.xp_per_min || 0,
      lastHits: p.last_hits || 0,
      denies: p.denies || 0,
      heroDamage: p.hero_damage || 0,
      towerDamage: p.tower_damage || 0,
      heroHealing: p.hero_healing || 0,
      netWorth: p.net_worth || 0,
      laneRole: p.lane_role ?? null,
      won: isRadiant === match.radiant_win,
      lastHitsAt10: Array.isArray(p.lh_t) ? p.lh_t[10] ?? null : null,
      goldAt10: Array.isArray(p.gold_t) ? p.gold_t[10] ?? null : null,
      benchmarks: normalizeBenchmarks(p.benchmarks),
      vision: {
        obsPlaced: p.obs_placed ?? null,
        senPlaced: p.sen_placed ?? null,
        observerKills: p.observer_kills ?? 0,
        sentryKills: p.sentry_kills ?? 0,
        obsBought: p.purchase_ward_observer ?? null,
        senBought: p.purchase_ward_sentry ?? null,
        firstWardSeconds:
          Array.isArray(p.obs_log) && p.obs_log.length > 0 ? p.obs_log[0].time ?? null : null,
      },
    };
  });

  return {
    matchId: match.match_id,
    durationSeconds: match.duration,
    durationLabel: formatDuration(match.duration),
    radiantWin: match.radiant_win,
    parsed: match.version != null,
    startTime: match.start_time,
    players,
  };
}

/**
 * Elige el jugador "perspectiva" del reporte.
 * Prioridad: accountId explícito -> nombre de héroe (útil en partidas con cuentas
 * anónimas) -> mayor net worth (carry probable) -> primero.
 */
export function pickPerspective(
  match: NormalizedMatch,
  accountId?: number | null,
  heroName?: string | null,
): NormalizedPlayer {
  if (accountId != null) {
    const byAccount = match.players.find((p) => p.accountId === accountId);
    if (byAccount) return byAccount;
  }
  if (heroName) {
    const target = heroName.trim().toLowerCase();
    const byHero = match.players.find((p) => p.heroName.toLowerCase() === target);
    if (byHero) return byHero;
  }
  return [...match.players].sort((a, b) => b.netWorth - a.netWorth)[0];
}
