import type { ReactElement } from "react";

// Shared Open Graph card for Next.js app/<route>/opengraph-image.tsx routes.
// Styles stay inline because Satori does not read external CSS.

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png" as const;

type AccentName = "red" | "teal" | "yellow";

const ACCENTS: Record<AccentName, { from: string; to: string; tintTop: string; tintBottom: string }> = {
  red: {
    from: "#e53e3e",
    to: "#b71c1c",
    tintTop: "rgba(229,62,62,0.22)",
    tintBottom: "rgba(45,212,191,0.16)",
  },
  teal: {
    from: "#2dd4bf",
    to: "#0f766e",
    tintTop: "rgba(45,212,191,0.22)",
    tintBottom: "rgba(229,62,62,0.14)",
  },
  yellow: {
    from: "#f0b429",
    to: "#a16207",
    tintTop: "rgba(240,180,41,0.24)",
    tintBottom: "rgba(45,212,191,0.14)",
  },
};

type OgCardProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  tags: string[];
  icon?: ReactElement;
  accent?: AccentName;
};

function DefaultIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l2.8 6.2L21 11l-6.2 2.8L12 20l-2.8-6.2L3 11l6.2-2.8L12 2Z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}

export function OgCard({
  eyebrow,
  title,
  subtitle,
  tags,
  icon = <DefaultIcon />,
  accent = "red",
}: OgCardProps): ReactElement {
  const a = ACCENTS[accent];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#07080a",
        backgroundImage: `radial-gradient(900px 500px at 18% 0%, ${a.tintTop}, transparent 60%), radial-gradient(900px 500px at 100% 100%, ${a.tintBottom}, transparent 60%)`,
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
            background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 1, color: "#8a99ad" }}>
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 78, fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>
          {title}
        </div>
        <div style={{ fontSize: 32, color: "#a0aec0", maxWidth: 880, lineHeight: 1.35 }}>
          {subtitle}
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {tags.map((tag) => (
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
  );
}
