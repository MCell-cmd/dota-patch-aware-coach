import { NextResponse } from "next/server";
import {
  fetchHeroConstants,
  fetchMatch,
  normalizeMatch,
  OpenDotaError,
} from "@/lib/opendota";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const [match, heroes] = await Promise.all([
      fetchMatch(id),
      fetchHeroConstants(),
    ]);
    const normalized = normalizeMatch(match, heroes);
    return NextResponse.json(normalized);
  } catch (error) {
    if (error instanceof OpenDotaError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: "Error inesperado consultando OpenDota." },
      { status: 500 },
    );
  }
}
