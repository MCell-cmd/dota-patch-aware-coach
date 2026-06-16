import { NextRequest, NextResponse } from "next/server";
import { analyzeDraft } from "@/lib/draft";
import { DraftInput } from "@/lib/draft";

export async function POST(request: NextRequest) {
  try {
    const body: DraftInput = await request.json();
    
    // Validación básica de inputs
    if (!body || !body.role || !body.bracket || !body.style) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos en el cuerpo de la petición." },
        { status: 400 }
      );
    }

    const analysis = analyzeDraft(body);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error en la API de análisis de draft:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar el análisis del draft." },
      { status: 500 }
    );
  }
}
