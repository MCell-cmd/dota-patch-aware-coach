// Integración real con la API pública de OpenDota.
// Fuente: https://docs.opendota.com/  (uso público, sin credenciales).
// Si existe OPENDOTA_API_KEY se adjunta para subir el rate limit, pero no es
// obligatoria para el MVP.

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
};

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

export async function fetchMatch(matchId: string | number): Promise<OpenDotaMatch> {
  const id = String(matchId).trim();
  if (!/^\d{6,}$/.test(id)) {
    throw new OpenDotaError("Match ID inválido: debe ser numérico y público.", 400);
  }

  const res = await fetch(withKey(`${OPENDOTA_BASE}/matches/${id}`), {
    next: { revalidate: 600 },
  });

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
 * Prioridad: accountId explícito -> mayor net worth (carry probable) -> primero.
 */
export function pickPerspective(
  match: NormalizedMatch,
  accountId?: number | null,
): NormalizedPlayer {
  if (accountId != null) {
    const byAccount = match.players.find((p) => p.accountId === accountId);
    if (byAccount) return byAccount;
  }
  return [...match.players].sort((a, b) => b.netWorth - a.netWorth)[0];
}
