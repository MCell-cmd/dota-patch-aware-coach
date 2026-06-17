import { NextResponse } from "next/server";
import {
  fetchHeroConstants,
  fetchMatch,
  normalizeMatch,
  OpenDotaError,
  pickPerspective,
  requestParse,
} from "@/lib/opendota";
import { buildVisionReport } from "@/lib/visionReport";
import type { Role } from "@/data/dota";
import { clientIp, rateLimit } from "@/lib/rateLimit";

type VisionRequest = {
  matchId?: string;
  accountId?: number | string | null;
  heroName?: string | null;
  role?: string;
  parse?: boolean;
};

const RATE_LIMIT = 15; // peticiones por minuto y por IP
const RATE_WINDOW_MS = 60_000;
const ROLES: Role[] = ["carry", "mid", "offlane", "support4", "support5"];

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return NextResponse.json(data, { ...init, headers });
}

export async function POST(request: Request) {
  const rl = rateLimit(`vision:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    return json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  let body: VisionRequest;
  try {
    body = (await request.json()) as VisionRequest;
  } catch {
    return json({ error: "Cuerpo JSON inválido." }, { status: 400 });
  }

  const matchId = body.matchId?.toString().trim();
  if (!matchId) return json({ error: "Falta el match ID." }, { status: 400 });

  const accountId =
    body.accountId != null && `${body.accountId}`.trim() !== "" ? Number(body.accountId) : null;
  if (accountId != null && !Number.isFinite(accountId)) {
    return json({ error: "Account ID inválido: debe ser numérico." }, { status: 400 });
  }
  const role: Role = ROLES.includes(body.role as Role) ? (body.role as Role) : "support5";

  try {
    if (body.parse) {
      await requestParse(matchId).catch(() => false);
    }
    const [match, heroes] = await Promise.all([
      fetchMatch(matchId, { noCache: body.parse === true }),
      fetchHeroConstants(),
    ]);
    const normalized = normalizeMatch(match, heroes);
    const me =
      accountId != null
        ? normalized.players.find((player) => player.accountId === accountId)
        : pickPerspective(normalized, null, body.heroName ?? null);
    if (!me) {
      return json(
        { error: "Ese Account ID no aparece en la partida. Verifica el Steam32 Account ID." },
        { status: 404 },
      );
    }

    const report = buildVisionReport(me, role, normalized.durationSeconds, normalized.parsed);
    report.durationLabel = normalized.durationLabel;

    return json({
      report,
      parsed: normalized.parsed,
      perspective: { heroName: me.heroName, accountId: me.accountId, won: me.won },
    });
  } catch (error) {
    if (error instanceof OpenDotaError) {
      return json({ error: error.message }, { status: error.status });
    }
    return json({ error: "Error inesperado generando el reporte de visión." }, { status: 500 });
  }
}
