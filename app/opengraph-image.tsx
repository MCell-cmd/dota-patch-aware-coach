import { ImageResponse } from "next/og";
import { PATCH_STATE } from "@/data/dota";
import { OgCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Dota Patch-Aware Coach · draft, parche y replay";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="DASHBOARD TÁCTICO · DOTA 2"
        title="Dota Patch-Aware Coach"
        subtitle="Draft asistido, coach de parches y análisis post-partida con datos reales de OpenDota."
        tags={[`Parche ${PATCH_STATE.version}`, "Benchmarks reales", "Login con Steam"]}
      />
    ),
    { ...size },
  );
}
