// Detecta errores REPETIDOS entre varias partidas del mismo jugador.
// Es la base de la fase "perfil del jugador / errores repetidos": un fallo que
// aparece en una sola partida puede ser ruido; el que se repite es un hábito.

import type { ReportFacts } from "@/lib/report";

// Banderas que representan errores corregibles del jugador (no estado de datos).
const FLAG_LABELS: Record<string, string> = {
  "muertes-altas": "muchas muertes evitables",
  "net-worth-bajo-vs-carry": "te quedas detrás del carry enemigo en oro",
  "dano-torres-bajo": "poco daño a torres: no conviertes peleas en objetivos",
  "last-hits-bajos": "farm de línea por debajo de lo esperado",
  "kda-bajo": "KDA bajo para tu rol",
  "farm-lento-min10": "farm lento en la fase de línea (CS al minuto 10 bajo)",
};

export type RepeatedPattern = {
  flag: string;
  label: string;
  count: number; // en cuántas partidas aparece
};

export type PatternReport = {
  matchesAnalyzed: number;
  repeated: RepeatedPattern[];
  summary: string;
};

export function findRepeatedPatterns(factsList: ReportFacts[]): PatternReport {
  const counts = new Map<string, number>();
  for (const facts of factsList) {
    for (const flag of facts.flags) {
      if (!(flag in FLAG_LABELS)) continue; // ignora banderas no-accionables (p.ej. match-sin-parsear)
      counts.set(flag, (counts.get(flag) ?? 0) + 1);
    }
  }

  const repeated: RepeatedPattern[] = [...counts.entries()]
    .filter(([, count]) => count >= 2)
    .map(([flag, count]) => ({ flag, label: FLAG_LABELS[flag], count }))
    .sort((a, b) => b.count - a.count);

  const total = factsList.length;
  let summary: string;
  if (total < 2) {
    summary = "Hacen falta al menos 2 partidas para detectar patrones repetidos.";
  } else if (repeated.length === 0) {
    summary = `No se detectan errores repetidos en estas ${total} partidas. Buena señal.`;
  } else {
    const top = repeated[0];
    summary = `Patrón repetido en ${top.count} de ${total} partidas: ${top.label}. Es tu hábito a corregir primero.`;
  }

  return { matchesAnalyzed: total, repeated, summary };
}
