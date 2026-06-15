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

type ReportRequest = {
  matchId?: string;
  accountId?: number | string | null;
  heroName?: string | null;
  role?: string;
  question?: string;
  parse?: boolean;
};

export async function POST(request: Request) {
  let body: ReportRequest;
  try {
    body = (await request.json()) as ReportRequest;
  } catch {
    return NextResponse.json({ error: "Cuerpo JSON inválido." }, { status: 400 });
  }

  const matchId = body.matchId?.toString().trim();
  if (!matchId) {
    return NextResponse.json({ error: "Falta el match ID." }, { status: 400 });
  }

  const question = body.question?.trim() || "¿Qué decisión me costó más impacto?";
  const accountId =
    body.accountId != null && `${body.accountId}`.trim() !== ""
      ? Number(body.accountId)
      : null;

  try {
    // Si se pide parse, lo dispara y relee sin cache (el parseo puede seguir
    // en cola; en ese caso `parsed` saldrá false y se reintenta más tarde).
    if (body.parse) {
      await requestParse(matchId).catch(() => false);
    }
    const [match, heroes] = await Promise.all([
      fetchMatch(matchId, { noCache: body.parse === true }),
      fetchHeroConstants(),
    ]);
    const normalized = normalizeMatch(match, heroes);
    const me = pickPerspective(normalized, accountId, body.heroName ?? null);

    const facts = buildFacts(normalized, me, { role: body.role, question });
    const deterministic = buildDeterministicReport(facts, question);
    const { report, source } = await enrichReportWithAI(facts, deterministic);

    return NextResponse.json({
      report,
      source,
      perspective: {
        heroName: me.heroName,
        accountId: me.accountId,
        won: me.won,
      },
      parsed: normalized.parsed,
    });
  } catch (error) {
    if (error instanceof OpenDotaError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: "Error inesperado generando el reporte." },
      { status: 500 },
    );
  }
}
