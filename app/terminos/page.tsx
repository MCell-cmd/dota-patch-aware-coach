import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TITLE = "Términos · Dota Patch-Aware Coach";
const DESCRIPTION = "Condiciones de uso de Dota Patch-Aware Coach.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dota-patch-aware-coach.vercel.app";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/terminos` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/terminos`,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TermsPage() {
  return (
    <main className="legalPage">
      <article className="legalInner">
        <Link href="/" className="legalBack">
          <ArrowLeft size={15} />
          Volver al coach
        </Link>

        <h1 className="legalTitle">Términos de uso</h1>
        <p className="legalLead">
          Dota Patch-Aware Coach es una herramienta educativa para preparar drafts, revisar partidas
          públicas y convertir datos verificables en recomendaciones prácticas.
        </p>

        <section className="legalSection">
          <h2>Uso permitido</h2>
          <p>
            Puedes usar el producto para aprender, analizar partidas públicas, preparar hero pools,
            estudiar warding, revisar errores por rol y crear reportes de coaching. Las
            recomendaciones son apoyo educativo, no una garantía de MMR ni de resultado competitivo.
          </p>
        </section>

        <section className="legalSection">
          <h2>Límites del producto</h2>
          <p>
            No está permitido usar este proyecto para cheats, lectura de memoria del juego,
            automatización de inputs, overlays prohibidos, bots de matchmaking, boosting, smurfing,
            account sharing, apuestas, manipulación del mercado de Steam o cualquier actividad que
            viole reglas de Valve, Steam o torneos.
          </p>
        </section>

        <section className="legalSection">
          <h2>Datos y fuentes</h2>
          <p>
            El coach usa datos públicos, fuentes comunitarias y lógica propia. Si el parche, la API
            o las estadísticas están desactualizadas, el producto debe indicarlo y evitar
            recomendaciones categóricas.
          </p>
        </section>

        <section className="legalSection">
          <h2>IA</h2>
          <p>
            La IA redacta y prioriza sobre datos estructurados; no es la fuente de verdad. Las
            cifras, héroes, roles y resultados deben venir de datos verificables o de entradas
            explícitas del usuario.
          </p>
        </section>

        <section className="legalSection">
          <h2>Independencia</h2>
          <p>
            Este es un proyecto independiente. No está afiliado, patrocinado ni aprobado por Valve
            Corporation. Dota 2 y Steam son marcas o servicios de Valve.
          </p>
        </section>

        <p className="legalFootnote">Última actualización: 16 de junio de 2026.</p>
      </article>
    </main>
  );
}
