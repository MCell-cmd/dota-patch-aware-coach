import { ImageResponse } from "next/og";
import { PATCH_STATE } from "@/data/dota";

// Tarjeta de preview (Open Graph / Twitter) generada dinámicamente. Next la
// expone como /opengraph-image y añade los meta tags automáticamente.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Dota Patch-Aware Coach";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080a",
          backgroundImage:
            "radial-gradient(900px 500px at 18% 0%, rgba(229,62,62,0.22), transparent 60%), radial-gradient(900px 500px at 100% 100%, rgba(45,212,191,0.16), transparent 60%)",
          padding: 72,
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "linear-gradient(135deg, #e53e3e, #b71c1c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            ⚔
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 1, color: "#8a99ad" }}>
            DASHBOARD TÁCTICO · DOTA 2
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 78, fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>
            Dota Patch-Aware Coach
          </div>
          <div style={{ fontSize: 32, color: "#a0aec0", maxWidth: 880, lineHeight: 1.35 }}>
            Draft asistido, coach de parches y análisis post-partida con datos reales de OpenDota.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {[`Parche ${PATCH_STATE.version}`, "Benchmarks reales", "Login con Steam"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 24,
                color: "#cbd5e0",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
