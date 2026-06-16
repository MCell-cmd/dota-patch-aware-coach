import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacidad · Dota Patch-Aware Coach",
  description: "Qué datos usa y guarda Dota Patch-Aware Coach.",
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
          Versión corta: usamos los datos públicos de tu Dota 2 para darte el análisis, y no
          vendemos nada. Esto es lo que ocurre en detalle.
        </p>

        <section className="legalSection">
          <h2>Datos de partidas</h2>
          <p>
            El análisis de draft y de replays usa datos <strong>públicos</strong> de la API de
            OpenDota. Solo consultamos la información de la partida o cuenta que tú introduces; no
            almacenamos tus partidas en ningún servidor nuestro.
          </p>
        </section>

        <section className="legalSection">
          <h2>Login con Steam</h2>
          <p>
            Si entras con Steam, recibimos tu identificador público (SteamID) mediante OpenID. Lo
            usamos para cargar tu Account ID y, opcionalmente, mostrar tu nombre y avatar públicos.
            Guardamos una <strong>cookie de sesión firmada</strong> en tu navegador para mantenerte
            identificado; no contiene contraseñas. Puedes cerrar sesión cuando quieras y la cookie
            se elimina.
          </p>
        </section>

        <section className="legalSection">
          <h2>Analítica</h2>
          <p>
            Si la analítica está activa, usamos un servicio <strong>sin cookies</strong> (Plausible)
            que mide eventos agregados y anónimos (por ejemplo, cuántos reportes se generan). No
            creamos perfiles ni te rastreamos entre sitios.
          </p>
        </section>

        <section className="legalSection">
          <h2>IA (opcional)</h2>
          <p>
            Cuando la redacción con IA está habilitada, enviamos a Claude únicamente las cifras ya
            anonimizadas de la partida para mejorar el texto del reporte. La IA no recibe tu
            identidad.
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
