import { NextResponse } from "next/server";
import {
  fetchHeroConstants,
  fetchMatch,
  normalizeMatch,
  OpenDotaError,
  pickPerspective,
} from "@/lib/opendota";
import { buildFacts } from "@/lib/report";
import { findRepeatedPatterns } from "@/lib/patterns";

type MatchRef = {
  matchId: string;
  heroName?: string | null;
  accountId?: number | string | null;
};

type PatternsRequest = {
  matches?: MatchRef[];
  role?: string;
};

const MAX_MATCHES = 10;

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");

  return NextResponse.json(data, {
    ...init,
    headers,
  });
}

export async function POST(request: Request) {
  let body: PatternsRequest;
  try {
    body = (await request.json()) as PatternsRequest;
  } catch {
    return json({ error: "Cuerpo JSON inválido." }, { status: 400 });
  }

  const matches = (body.matches ?? []).filter((m) => m?.matchId).slice(0, MAX_MATCHES);
  if (matches.length < 2) {
    return json(
      { error: "Envía al menos 2 partidas (matchId) para detectar patrones." },
      { status: 400 },
    );
  }

  try {
    const heroes = await fetchHeroConstants();
    const factsList = [];
    const failed: Array<{ matchId: string; error: string }> = [];

    for (const ref of matches) {
      try {
        const match = await fetchMatch(ref.matchId);
        const normalized = normalizeMatch(match, heroes);
        const accountId =
          ref.accountId != null && `${ref.accountId}`.trim() !== "" ? Number(ref.accountId) : null;
        const me = pickPerspective(normalized, accountId, ref.heroName ?? null);
        factsList.push(buildFacts(normalized, me, { role: body.role, question: "" }));
      } catch (e) {
        failed.push({
          matchId: ref.matchId,
          error: e instanceof OpenDotaError ? e.message : "Error consultando la partida.",
        });
      }
    }

    if (factsList.length < 2) {
      return json(
        { error: "No se pudieron analizar al menos 2 partidas.", failed },
        { status: 422 },
      );
    }

    const patterns = findRepeatedPatterns(factsList);
    return json({ ...patterns, failed });
  } catch (error) {
    if (error instanceof OpenDotaError) {
      return json({ error: error.message }, { status: error.status });
    }
    return json(
      { error: "Error inesperado detectando patrones." },
      { status: 500 },
    );
  }
}
