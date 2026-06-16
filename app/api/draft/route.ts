import { NextRequest, NextResponse } from "next/server";
import { analyzeDraft, type DraftInput } from "@/lib/draft";

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");

  return NextResponse.json(data, {
    ...init,
    headers,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: DraftInput = await request.json();

    // Validacion basica de inputs.
    if (!body || !body.role || !body.bracket || !body.style) {
      return json(
        { error: "Faltan parámetros requeridos en el cuerpo de la petición." },
        { status: 400 },
      );
    }

    const analysis = analyzeDraft(body);
    return json(analysis);
  } catch (error) {
    console.error("Error en la API de análisis de draft:", error);
    return json(
      { error: "Error interno del servidor al procesar el análisis del draft." },
      { status: 500 },
    );
  }
}
