// Construye el reporte post-partida sobre datos REALES de OpenDota.
// Principio (AGENTS.md): la IA explica, no inventa. Todas las cifras salen del
// match normalizado; las heurísticas marcan banderas y la IA (opcional) redacta.

import type { MockReplayReport } from "@/data/dota";
import type { NormalizedMatch, NormalizedPlayer } from "@/lib/opendota";

export type ReportInput = {
  role?: string;
  question: string;
  bracket?: string;
};

export type ReportFacts = {
  matchId: string;
  durationLabel: string;
  parsed: boolean;
  result: "Victoria" | "Derrota";
  hero: string;
  role: string;
  bracket: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  gpm: number;
  xpm: number;
  lastHits: number;
  denies: number;
  heroDamage: number;
  towerDamage: number;
  netWorth: number;
  teamNetWorthRank: string; // "2/5"
  enemyCarryHero: string;
  enemyCarryNetWorth: number;
  netWorthDelta: number; // perspectiva - carry enemigo
  lastHitsAt10: number | null; // solo si la partida está parseada
  flags: string[];
};

const LANE_ROLE_LABELS: Record<number, string> = {
  1: "Safe lane",
  2: "Mid",
  3: "Offlane",
  4: "Jungla/roam",
};

export function buildFacts(
  match: NormalizedMatch,
  me: NormalizedPlayer,
  input: ReportInput,
): ReportFacts {
  const myTeam = match.players.filter((p) => p.isRadiant === me.isRadiant);
  const enemyTeam = match.players.filter((p) => p.isRadiant !== me.isRadiant);
  const enemyCarry = [...enemyTeam].sort((a, b) => b.netWorth - a.netWorth)[0];

  const teamByNetWorth = [...myTeam].sort((a, b) => b.netWorth - a.netWorth);
  const myRank = teamByNetWorth.findIndex((p) => p.slot === me.slot) + 1;

  // Detección de rol económico: un support es el bottom-2 en net worth de un
  // equipo completo de 5 (o viene marcado explícitamente). Sin esto, un support
  // siempre dispararía "net worth bajo vs carry" y "poco daño a torres", que no
  // son errores en su rol y arruinan la credibilidad del reporte.
  const explicitSupport = /support|soporte/i.test(input.role ?? "");
  const isSupport = explicitSupport || (myTeam.length >= 5 && myRank >= 4);
  const isCore = !isSupport;

  const role =
    input.role ||
    (isSupport ? "Support" : me.laneRole != null ? LANE_ROLE_LABELS[me.laneRole] : undefined) ||
    "Core";

  const flags: string[] = [];
  if (me.deaths >= 9) flags.push("muertes-altas");
  // Las comparaciones de economía y daño a estructuras solo aplican a cores:
  // un support no compite en net worth con el carry rival ni empuja torres.
  if (isCore && me.netWorth < enemyCarry.netWorth * 0.8) flags.push("net-worth-bajo-vs-carry");
  if (isCore && me.towerDamage < 2000) flags.push("dano-torres-bajo");
  if (isCore && me.lastHits < me.gpm * 0.3) flags.push("last-hits-bajos");
  if (me.kda < 2) flags.push("kda-bajo");
  // Solo evaluable con datos parseados: CS al minuto 10 bajo para un core.
  if (me.lastHitsAt10 != null && isCore && me.lastHitsAt10 < 40) {
    flags.push("farm-lento-min10");
  }
  if (!match.parsed) flags.push("match-sin-parsear");

  return {
    matchId: String(match.matchId),
    durationLabel: match.durationLabel,
    parsed: match.parsed,
    result: me.won ? "Victoria" : "Derrota",
    hero: me.heroName,
    role,
    bracket: input.bracket || "No disponible",
    kills: me.kills,
    deaths: me.deaths,
    assists: me.assists,
    kda: me.kda,
    gpm: me.gpm,
    xpm: me.xpm,
    lastHits: me.lastHits,
    denies: me.denies,
    heroDamage: me.heroDamage,
    towerDamage: me.towerDamage,
    netWorth: me.netWorth,
    teamNetWorthRank: `${myRank}/${myTeam.length}`,
    enemyCarryHero: enemyCarry.heroName,
    enemyCarryNetWorth: enemyCarry.netWorth,
    netWorthDelta: me.netWorth - enemyCarry.netWorth,
    lastHitsAt10: me.lastHitsAt10,
    flags,
  };
}

/** Reporte determinista basado solo en hechos. Sin IA. */
export function buildDeterministicReport(
  facts: ReportFacts,
  question: string,
): MockReplayReport {
  const deltaLabel =
    facts.netWorthDelta >= 0
      ? `+${facts.netWorthDelta} de net worth sobre el carry enemigo (${facts.enemyCarryHero})`
      : `${facts.netWorthDelta} de net worth respecto al carry enemigo (${facts.enemyCarryHero})`;

  const verdict =
    facts.result === "Victoria"
      ? `Ganaste con ${facts.kills}/${facts.deaths}/${facts.assists} y ${deltaLabel}. El reto ahora es repetir el resultado bajando muertes y subiendo presión de objetivos.`
      : `Perdiste con ${facts.kills}/${facts.deaths}/${facts.assists} y ${deltaLabel}. La derrota se explica más por ${primaryWeakness(facts)} que por el draft.`;

  const parseNote = facts.parsed
    ? ""
    : " (match sin parsear en OpenDota: el detalle por minuto es limitado, pide el parseo para mayor precisión)";

  return {
    matchId: facts.matchId,
    duration: facts.durationLabel,
    result: facts.result,
    hero: facts.hero,
    role: facts.role,
    bracket: facts.bracket,
    question,
    verdict: verdict + parseNote,
    phases: {
      lane: {
        good:
          facts.lastHitsAt10 != null
            ? `Al minuto 10 llevabas ${facts.lastHitsAt10} last hits (cerraste con ${facts.lastHits}).`
            : `Cerraste con ${facts.lastHits} last hits y ${facts.denies} denies.`,
        error: facts.flags.includes("farm-lento-min10")
          ? `Farm lento en la fase de línea: ${facts.lastHitsAt10} CS al minuto 10 es bajo para un core (apunta a 40+).`
          : facts.flags.includes("last-hits-bajos")
            ? "Tu farm de línea quedó por debajo de lo esperado para tu GPM."
            : "Sin errores graves de farm detectables con los datos disponibles.",
        change: "Asegura el creep equilibrium y convierte ventaja de línea en presión de torre.",
      },
      mid: {
        good: `GPM ${facts.gpm} / XPM ${facts.xpm}, posición ${facts.teamNetWorthRank} en net worth de tu equipo.`,
        error: facts.flags.includes("net-worth-bajo-vs-carry")
          ? "Te quedaste atrás del carry enemigo en oro durante el mid game."
          : "Mantuviste el ritmo de oro frente al carry rival.",
        change: "Agrupa con el equipo en timings de objetivo en lugar de farmear aislado.",
      },
      late: {
        good: `Daño a héroes ${facts.heroDamage.toLocaleString()} y a torres ${facts.towerDamage.toLocaleString()}.`,
        error: facts.flags.includes("dano-torres-bajo")
          ? "Poco daño a estructuras: las peleas ganadas no se tradujeron en mapa."
          : "Convertiste daño en objetivos de forma aceptable.",
        change: "Tras cada pelea ganada, empuja la torre más cercana antes de volver a farmear.",
      },
    },
    errors: buildErrors(facts),
    plan: buildPlan(facts),
    nextSteps: {
      objective: facts.flags.includes("muertes-altas")
        ? "Bajar las muertes evitables por debajo de 6."
        : "Convertir ventaja de oro en torres y Roshan.",
      metric: "Muertes evitables y daño a torres por partida.",
      question: "¿Mis peleas ganadas se tradujeron en objetivos del mapa?",
    },
  };
}

function primaryWeakness(facts: ReportFacts): string {
  if (facts.flags.includes("muertes-altas")) return "un exceso de muertes evitables";
  if (facts.flags.includes("net-worth-bajo-vs-carry")) return "perder la carrera de oro en el mid game";
  if (facts.flags.includes("dano-torres-bajo")) return "no traducir peleas en objetivos";
  if (facts.flags.includes("last-hits-bajos")) return "un farm de línea por debajo de lo esperado";
  return "errores de macro repartidos en la partida";
}

function buildErrors(facts: ReportFacts): MockReplayReport["errors"] {
  const errors: MockReplayReport["errors"] = [];

  if (facts.flags.includes("muertes-altas")) {
    errors.push({
      title: `${facts.deaths} muertes: demasiada exposición`,
      evidence: `Cerraste con KDA ${facts.kda} (${facts.kills}/${facts.deaths}/${facts.assists}).`,
      impact: "Cada muerte regaló oro y tiempo de mapa al rival.",
      fix: "Antes de cruzar el río revisa cooldowns enemigos y visión; no pelees sin escape.",
      practice: "Una partida con objetivo único: terminar con 5 muertes o menos.",
    });
  }
  if (facts.flags.includes("net-worth-bajo-vs-carry")) {
    errors.push({
      title: `Net worth por debajo del carry enemigo (${facts.enemyCarryHero})`,
      evidence: `Terminaste con ${facts.netWorth.toLocaleString()} vs ${facts.enemyCarryNetWorth.toLocaleString()}.`,
      impact: "El carry rival escaló más rápido y dictó el late game.",
      fix: "Prioriza campamentos eficientes entre peleas y no dejes oleadas sin recoger.",
      practice: "Apunta a +50 GPM respecto a esta partida en las próximas 3.",
    });
  }
  if (facts.flags.includes("dano-torres-bajo")) {
    errors.push({
      title: "Poco daño a estructuras",
      evidence: `Solo ${facts.towerDamage.toLocaleString()} de daño a torres en ${facts.durationLabel}.`,
      impact: "Las ventajas no se convirtieron en mapa ni en oro de equipo.",
      fix: "Tras ganar una pelea, empuja la torre más cercana antes de farmear.",
      practice: "En cada pelea ganada, pregúntate: ¿qué torre puedo tirar ahora?",
    });
  }

  // Garantiza siempre 3 entradas para que la UI y el coach tengan material.
  const fallbacks: MockReplayReport["errors"] = [
    {
      title: "Control de runas y visión",
      evidence: "Sin timeline parseado no se ve el detalle, pero es la palanca de macro más barata.",
      impact: "Perder runas de poder/sabiduría cede tempo a los supports rivales.",
      fix: "Planifica el movimiento 30s antes de los múltiplos de 7 (runas de sabiduría).",
      practice: "Mira el reloj y avisa la runa a tu support cada 2 minutos.",
    },
    {
      title: "Agrupación en objetivos",
      evidence: `Posición ${facts.teamNetWorthRank} en oro de tu equipo.`,
      impact: "Farmear aislado retrasa los timings de pelea coordinada.",
      fix: "Cuando tu item core esté listo, busca a tu equipo y un objetivo cercano.",
      practice: "Define un objetivo por cada pico de poder (BKB, Blink, etc.).",
    },
    {
      title: "Decisión en late game",
      evidence: `Resultado: ${facts.result} en ${facts.durationLabel}.`,
      impact: "Las peleas de high ground sin buyback definen partidas igualadas.",
      fix: "No cruces a Roshan ni high ground sin buyback disponible.",
      practice: "Revisa tu oro de buyback a partir del minuto 22 en cada partida.",
    },
  ];

  for (const f of fallbacks) {
    if (errors.length >= 3) break;
    errors.push(f);
  }
  return errors.slice(0, 3);
}

function buildPlan(facts: ReportFacts): string[] {
  const focus = facts.flags.includes("muertes-altas")
    ? "posicionamiento y supervivencia"
    : facts.flags.includes("net-worth-bajo-vs-carry")
      ? "eficiencia de farm entre peleas"
      : "conversión de peleas en objetivos";
  return [
    `Día 1-2: enfócate en ${focus} revisando el replay de esta partida a 2x.`,
    "Día 3-4: 3 partidas aplicando una sola corrección a la vez.",
    "Día 5-6: ranked manteniendo buyback disponible desde el minuto 22.",
    "Día 7: revisa tu progreso comparando KDA, GPM y daño a torres contra esta partida.",
  ];
}
