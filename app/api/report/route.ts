import { NextResponse } from "next/server";
import {
  fetchHeroConstants,
  fetchMatch,
  normalizeMatch,
  OpenDotaError,
  pickPerspective,
  requestParse,
} from "@/lib/opendota";
import { buildDeterministicReport, buildFacts } from "@/lib/report";
import { enrichReportWithAI } from "@/lib/ai";
import { cacheGet, cacheSet, clientIp, rateLimit } from "@/lib/rateLimit";

type ReportRequest = {
  matchId?: string;
  accountId?: number | string | null;
  heroName?: string | null;
  role?: string;
  question?: string;
  parse?: boolean;
};

// Protege la key de Anthropic: cada reporte con IA es una llamada cara. Sin
// limite, el endpoint publico puede vaciar la cuenta.
const RATE_LIMIT = 10; // peticiones
const RATE_WINDOW_MS = 60_000; // por minuto y por IP
const CACHE_TTL_MS = 10 * 60_000; // el reporte de un match es estable 10 min

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");

  return NextResponse.json(data, {
    ...init,
    headers,
  });
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = rateLimit(`report:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    return json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en un minuto." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  let body: ReportRequest;
  try {
    body = (await request.json()) as ReportRequest;
  } catch {
    return json({ error: "Cuerpo JSON inválido." }, { status: 400 });
  }

  const matchId = body.matchId?.toString().trim();
  if (!matchId) {
    return json({ error: "Falta el match ID." }, { status: 400 });
  }

  const question = body.question?.trim() || "¿Qué decisión me costó más impacto?";
  const accountId =
    body.accountId != null && `${body.accountId}`.trim() !== ""
      ? Number(body.accountId)
      : null;
  if (accountId != null && !Number.isFinite(accountId)) {
    return json({ error: "Account ID inválido: debe ser numérico." }, { status: 400 });
  }

  // El reporte es determinista para las mismas entradas: cacheamos la respuesta
  // completa y evitamos re-llamar a OpenDota y a Claude. No cacheamos cuando se
  // pide `parse` porque queremos datos frescos tras solicitar el parseo.
  const cacheKey = `report:${JSON.stringify({
    matchId,
    question,
    role: body.role ?? null,
    accountId,
    heroName: body.heroName ?? null,
  })}`;
  if (!body.parse) {
    const cached = cacheGet<Record<string, unknown>>(cacheKey);
    if (cached) return json(cached);
  }

  try {
    // Si se pide parse, lo dispara y relee sin cache. El parseo puede seguir
    // en cola; en ese caso `parsed` saldrá false y se reintenta más tarde.
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
        { error: "Ese Account ID no aparece en la partida. Verifica Steam32 Account ID o usa otro match." },
        { status: 404 },
      );
    }

    const facts = buildFacts(normalized, me, { role: body.role, question });
    const deterministic = buildDeterministicReport(facts, question);
    const { report, source } = await enrichReportWithAI(facts, deterministic);

    const payload = {
      report,
      source,
      perspective: {
        heroName: me.heroName,
        accountId: me.accountId,
        won: me.won,
      },
      parsed: normalized.parsed,
    };
    if (!body.parse) cacheSet(cacheKey, payload, CACHE_TTL_MS);
    return json(payload);
  } catch (error) {
    if (error instanceof OpenDotaError) {
      return json({ error: error.message }, { status: error.status });
    }
    return json(
      { error: "Error inesperado generando el reporte." },
      { status: 500 },
    );
  }
}
