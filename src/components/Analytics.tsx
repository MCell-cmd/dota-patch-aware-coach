"use client";

import Script from "next/script";

/**
 * Analítica sin cookies (Plausible). Solo se monta si defines
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN; si no, no renderiza nada. El stub permite que
 * track() encole eventos aunque el script aún no haya cargado.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <>
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.tagged-events.js"
        strategy="afterInteractive"
      />
    </>
  );
}
