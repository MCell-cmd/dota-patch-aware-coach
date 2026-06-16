import { ImageResponse } from "next/og";
import { OgCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Términos de uso · Dota Patch-Aware Coach";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="DOCUMENTO · LEGAL"
        title="Términos de uso"
        subtitle="Qué puedes hacer con el coach, los límites del producto y el respeto a las reglas de Valve."
        tags={["Educativo", "No afiliado a Valve", "MIT"]}
        accent="yellow"
      />
    ),
    { ...size },
  );
}
