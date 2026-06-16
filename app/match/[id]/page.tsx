import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { loadMatchSummary } from "@/lib/matchSummary";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dota-patch-aware-coach.vercel.app";

type RouteParams = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { id } = await params;
  const summary = await loadMatchSummary(id);

  if (!summary) {
    const fallbackTitle = `Match ${id} · Dota Patch-Aware Coach`;
    const fallbackDescription = "OpenDota no tiene datos para este match ID.";
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: { canonical: `${SITE_URL}/match/${id}` },
      robots: { index: false, follow: true },
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        url: `${SITE_URL}/match/${id}`,
      },
      twitter: { title: fallbackTitle, description: fallbackDescription },
    };
  }

  const { match, perspective: p } = summary;
  const result = p.won ? "Victoria" : "Derrota";
  const shareTitle = `${p.heroName} · ${p.kills}/${p.deaths}/${p.assists} · ${result} en ${match.durationLabel}`;
  const description = `Match ${match.matchId} de Dota 2: ${p.heroName} cerró ${p.kills}/${p.deaths}/${p.assists} con ${p.gpm} GPM y ${p.xpm} XPM en una ${result.toLowerCase()} de ${match.durationLabel}.`;
  const fullTitle = `${shareTitle} · Dota Coach`;
  const url = `${SITE_URL}/match/${match.matchId}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
    },
    twitter: {
      title: shareTitle,
      description,
    },
  };
}

export default async function MatchPage({ params }: RouteParams) {
  const { id } = await params;
  const summary = await loadMatchSummary(id);

  if (!summary) {
    return (
      <main className="legalPage">
        <article className="legalInner">
          <Link href="/" className="legalBack">
            <ArrowLeft size={15} />
            Volver al coach
          </Link>
          <h1 className="legalTitle">Match no encontrado</h1>
          <p className="legalLead">
            OpenDota no devolvió datos para el ID <code>{id}</code>. Verifica que sea una partida
            pública y que el ID esté bien.
          </p>
        </article>
      </main>
    );
  }

  const { match, perspective: p } = summary;
  const result = p.won ? "Victoria" : "Derrota";
  const accentColor = p.won ? "#2dd4bf" : "#f56565";
  const kda = `${p.kills}/${p.deaths}/${p.assists}`;

  const stats: Array<{ label: string; value: string }> = [
    { label: "Resultado", value: `${result} en ${match.durationLabel}` },
    { label: "KDA", value: kda },
    { label: "GPM", value: String(p.gpm) },
    { label: "XPM", value: String(p.xpm) },
    { label: "Last hits", value: `${p.lastHits} / ${p.denies}D` },
    { label: "Net worth", value: p.netWorth.toLocaleString() },
    { label: "Daño a héroes", value: p.heroDamage.toLocaleString() },
    { label: "Daño a torres", value: p.towerDamage.toLocaleString() },
  ];

  return (
    <main className="legalPage">
      <article className="legalInner">
        <Link href="/" className="legalBack">
          <ArrowLeft size={15} />
          Volver al coach
        </Link>

        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.5,
            color: accentColor,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Match {match.matchId}
        </div>
        <h1 className="legalTitle">
          {p.heroName} · {kda}
        </h1>
        <p className="legalLead">
          {result} en {match.durationLabel} con {p.gpm} GPM y {p.xpm} XPM.{" "}
          {match.parsed ? "Partida parseada por OpenDota." : "Sin parseo: faltan series por minuto."}
        </p>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            margin: "24px 0",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "12px 14px",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ fontSize: 11, color: "#8a99ad", textTransform: "uppercase", letterSpacing: 0.6 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 4 }}>
                {s.value}
              </div>
            </div>
          ))}
        </section>

        <Link
          href={`/?match=${match.matchId}&mode=replay`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 18px",
            borderRadius: 10,
            background: accentColor,
            color: "#0a0b0f",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Abrir en el coach
          <ChevronRight size={16} />
        </Link>

        <p className="legalFootnote" style={{ marginTop: 24 }}>
          Datos públicos de OpenDota. Proyecto independiente, no afiliado a Valve.
        </p>
      </article>
    </main>
  );
}
