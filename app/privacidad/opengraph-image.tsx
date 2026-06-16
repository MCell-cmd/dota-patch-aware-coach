import { ImageResponse } from "next/og";
import { OgCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Privacidad · Dota Patch-Aware Coach";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="DOCUMENTO · PRIVACIDAD"
        title="Tus datos, en corto"
        subtitle="Datos públicos de OpenDota, login con Steam OpenID y analítica sin cookies. Sin contraseñas guardadas."
        tags={["Sin cookies de tracking", "Steam OpenID", "OpenDota público"]}
        accent="teal"
      />
    ),
    { ...size },
  );
}
