import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TITLE = "Privacidad · Dota Patch-Aware Coach";
const DESCRIPTION = "Qué datos usa y guarda Dota Patch-Aware Coach.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dota-patch-aware-coach.vercel.app";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/privacidad` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/privacidad`,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PrivacyPage() {
  return (
    <main className="legalPage">
      <article className="legalInner">
        <Link href="/" className="legalBack">
          <ArrowLeft size={15} />
          Volver al coach
        </Link>

        <h1 className="legalTitle">Privacidad</h1>
        <p className="legalLead">
          Versión corta: usamos datos públicos de Dota 2 para darte análisis y no vendemos datos de
          usuarios. Esto es lo que ocurre en detalle.
        </p>

        <section className="legalSection">
          <h2>Datos de partidas</h2>
          <p>
            El análisis de draft y de replays usa datos <strong>públicos</strong> de OpenDota. Solo
            consultamos la información de la partida o cuenta que tú introduces; el MVP no necesita
            almacenar tus partidas en servidores propios.
          </p>
        </section>

        <section className="legalSection">
          <h2>Login con Steam</h2>
          <p>
            Si entras con Steam, recibimos tu identificador público mediante OpenID. Lo usamos para
            cargar tu Account ID y, opcionalmente, mostrar tu nombre y avatar públicos. Guardamos
            una <strong>cookie de sesión firmada</strong> en tu navegador para mantenerte
            identificado; no contiene contraseñas.
          </p>
        </section>

        <section className="legalSection">
          <h2>Analítica</h2>
          <p>
            Si la analítica está activa, usamos un servicio sin cookies para medir eventos agregados
            y anónimos, por ejemplo cuántos reportes se generan. No creamos perfiles ni te
            rastreamos entre sitios.
          </p>
        </section>

        <section className="legalSection">
          <h2>IA opcional</h2>
          <p>
            Cuando la redacción con IA está habilitada, enviamos únicamente cifras y contexto de la
            partida necesarios para mejorar el texto del reporte. La IA no debe recibir contraseñas,
            cookies ni credenciales.
          </p>
        </section>

        <section className="legalSection">
          <h2>Credenciales</h2>
          <p>
            No pedimos ni almacenamos contraseñas de Steam, cookies, tokens personales ni claves de
            API de usuarios. Las claves de despliegue y proveedores deben vivir en variables de
            entorno privadas, nunca en Git.
          </p>
        </section>

        <p className="legalFootnote">
          Proyecto independiente, no afiliado a Valve Corporation. Dota 2 es una marca registrada de
          Valve.
        </p>
      </article>
    </main>
  );
}
