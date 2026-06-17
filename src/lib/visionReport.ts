// Convierte las estadísticas REALES de visión de una partida (OpenDota) en una
// lectura accionable por rol. No inventa cifras: todo sale del jugador elegido.
// Las expectativas por rol son heurísticas de coaching (no verdad absoluta) y se
// presentan como guía.

import type { NormalizedPlayer } from "@/lib/opendota";
import type { Role } from "@/data/dota";

export type VisionRead = { kind: "good" | "warn" | "info"; text: string };

export type VisionReport = {
  heroName: string;
  parsed: boolean;
  durationLabel: string;
  stats: {
    obsPlaced: number | null;
    senPlaced: number | null;
    dewards: number;
    obsBought: number | null;
    senBought: number | null;
    obsPerMin: number | null;
    firstWardLabel: string | null;
  };
  reads: VisionRead[];
  verdict: string;
};

const SUPPORT_ROLES: Role[] = ["support4", "support5"];

function fmtTime(seconds: number): string {
  const sign = seconds < 0 ? "-" : "";
  const s = Math.abs(Math.round(seconds));
  return `${sign}${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

export function buildVisionReport(
  player: NormalizedPlayer,
  role: Role,
  durationSeconds: number,
  parsed: boolean,
): VisionReport {
  const v = player.vision;
  const minutes = Math.max(1, durationSeconds / 60);
  const isSupport = SUPPORT_ROLES.includes(role);
  const dewards = v.observerKills + v.sentryKills;
  const obsPerMin = v.obsPlaced != null ? Math.round((v.obsPlaced / minutes) * 100) / 100 : null;
  const firstWardLabel = v.firstWardSeconds != null ? fmtTime(v.firstWardSeconds) : null;

  const reads: VisionRead[] = [];

  // Observers plantados (solo con datos parseados).
  if (v.obsPlaced != null) {
    if (isSupport) {
      // Referencia laxa: un buen support planta ~0.35 obs/min.
      if (obsPerMin! >= 0.35) {
        reads.push({ kind: "good", text: `Plantaste ${v.obsPlaced} observers (${obsPerMin}/min): buen ritmo de visión para tu rol.` });
      } else if (obsPerMin! >= 0.2) {
        reads.push({ kind: "warn", text: `Plantaste ${v.obsPlaced} observers (${obsPerMin}/min): por debajo de lo esperado para un support. Repón el observer apenas reaparece.` });
      } else {
        reads.push({ kind: "warn", text: `Solo ${v.obsPlaced} observers (${obsPerMin}/min): muy poca visión para un support. El observer cuesta 0 de oro de tu farm; úsalo siempre.` });
      }
    } else {
      reads.push({ kind: "info", text: `Plantaste ${v.obsPlaced} observers. Como core no es tu trabajo principal, pero plantar de paso ayuda al equipo.` });
    }
  }

  // Sentries / dewards.
  if (v.senPlaced != null) {
    reads.push({
      kind: isSupport && v.senPlaced < Math.round(minutes * 0.2) ? "warn" : "info",
      text: `Plantaste ${v.senPlaced} sentries y conseguiste ${dewards} deward(s) (${v.observerKills} obs, ${v.sentryKills} sen).`,
    });
  } else {
    reads.push({
      kind: "info",
      text: `Dewards: ${dewards} (${v.observerKills} observers, ${v.sentryKills} sentries destruidos).`,
    });
  }
  if (isSupport && dewards === 0) {
    reads.push({ kind: "warn", text: "0 dewards: niegas economía al rival destruyendo su visión. Lleva sentries y limpia las wards más obvias." });
  }

  // Primer ward (timing de pre-partida).
  if (firstWardLabel != null) {
    const late = v.firstWardSeconds! > 30;
    reads.push({
      kind: isSupport && late ? "warn" : "info",
      text: `Primer observer a ${firstWardLabel}.` + (isSupport && late ? " Idealmente baja la primera ward antes del minuto 0 (pre-partida) para asegurar la línea." : ""),
    });
  }

  // Compras vs plantadas (wards desperdiciadas en el inventario).
  if (v.obsBought != null && v.obsPlaced != null && v.obsBought - v.obsPlaced >= 2) {
    reads.push({ kind: "warn", text: `Compraste ${v.obsBought} observers pero plantaste ${v.obsPlaced}: se te quedaron wards sin usar. Una ward en la mochila no da visión.` });
  }

  if (!parsed) {
    reads.push({ kind: "info", text: "Partida sin parsear: faltan wards plantadas y timings. Pulsa “Pedir parseo” y reintenta en 1-2 min para el detalle completo." });
  }

  // Veredicto corto.
  let verdict: string;
  if (!parsed && v.obsPlaced == null) {
    verdict = `Datos básicos de ${player.heroName}: ${dewards} deward(s). Parsea la partida para ver wards y timings.`;
  } else if (isSupport) {
    const warns = reads.filter((r) => r.kind === "warn").length;
    verdict = warns === 0
      ? `Visión sólida con ${player.heroName} para tu rol de support.`
      : `Tu visión con ${player.heroName} tiene ${warns} punto(s) a corregir como support.`;
  } else {
    verdict = `Como ${player.heroName} (core), tu prioridad es farm/impacto; la visión aquí es complementaria.`;
  }

  return {
    heroName: player.heroName,
    parsed,
    durationLabel: "",
    stats: {
      obsPlaced: v.obsPlaced,
      senPlaced: v.senPlaced,
      dewards,
      obsBought: v.obsBought,
      senBought: v.senBought,
      obsPerMin,
      firstWardLabel,
    },
    reads,
    verdict,
  };
}
