import { NextRequest, NextResponse } from "next/server";
import { analyzeDraft, type DraftInput } from "@/lib/draft";
import { clientIp, rateLimit } from "@/lib/rateLimit";

// El cliente llama a este endpoint con debounce en cada cambio del draft, así
// que el límite es generoso: protege contra flooding sin estorbar el uso normal.
const RATE_LIMIT = 60; // peticiones
const RATE_WINDOW_MS = 60_000; // por minuto y por IP

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");

  return NextResponse.json(data, {
    ...init,
    headers,
  });
}

export async function POST(request: NextRequest) {
  const rl = rateLimit(`draft:${clientIp(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rl.ok) {
    return json(
      { error: "Demasiadas solicitudes. Intenta de nuevo en un momento." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

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
