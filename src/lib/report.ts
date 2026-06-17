// Construye el reporte post-partida sobre datos REALES de OpenDota.
// Principio (AGENTS.md): la IA explica, no inventa. Todas las cifras salen del
// match normalizado; las heurísticas marcan banderas y la IA (opcional) redacta.

import type { BenchmarkBar, ReplayReport } from "@/data/dota";
import type { NormalizedMatch, NormalizedPlayer } from "@/lib/opendota";

export type ReportInput = {
  role?: string;
  question: string;
  bracket?: string;
};

export type RoleGroup = "carry" | "mid" | "offlane" | "support4" | "support5" | "core" | "support";

export type ReportFacts = {
  matchId: string;
  durationLabel: string;
  parsed: boolean;
  result: "Victoria" | "Derrota";
  hero: string;
  role: string;
  roleGroup: RoleGroup;
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
  benchmarks: BenchmarkBar[]; // percentiles vs otros jugadores del mismo héroe
  flags: string[];
};

const LANE_ROLE_LABELS: Record<number, string> = {
  1: "Safe lane",
  2: "Mid",
  3: "Offlane",
  4: "Jungla/roam",
};

const ROLE_LABELS: Record<RoleGroup, string> = {
  carry: "Carry",
  mid: "Mid",
  offlane: "Offlane",
  support4: "Support 4",
  support5: "Support 5",
  core: "Core",
  support: "Support",
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
  const roleGroup = inferRoleGroup(input.role, me.laneRole, myTeam.length >= 5 && myRank >= 4);
  const isSupport = roleGroup === "support" || roleGroup === "support4" || roleGroup === "support5";
  const isCore = !isSupport;

  const role =
    ROLE_LABELS[roleGroup] ||
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
  if ((roleGroup === "mid" || roleGroup === "offlane") && isCore && me.towerDamage < 1500) {
    flags.push("objetivos-bajos-rol");
  }
  if ((roleGroup === "support4" || roleGroup === "support5") && me.deaths >= 7 && me.kda < 2.5) {
    flags.push("soporte-muere-sin-tempo");
  }
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
    roleGroup,
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
    benchmarks: me.benchmarks ?? [],
    flags,
  };
}

function inferRoleGroup(
  rawRole: string | undefined,
  laneRole: number | null,
  bottomEconomy: boolean,
): RoleGroup {
  const role = rawRole?.toLowerCase().replace(/\s+/g, "");
  if (role === "carry" || role === "pos1" || role === "position1") return "carry";
  if (role === "mid" || role === "midlaner" || role === "pos2" || role === "position2") return "mid";
  if (role === "offlane" || role === "offlaner" || role === "pos3" || role === "position3") return "offlane";
  if (role === "support4" || role === "pos4" || role === "position4" || role === "softsupport") {
    return "support4";
  }
  if (role === "support5" || role === "pos5" || role === "position5" || role === "hardsupport") {
    return "support5";
  }
  if (role?.includes("support") || role?.includes("soporte")) return "support";
  if (role?.includes("carry")) return "carry";
  if (role?.includes("mid")) return "mid";
  if (role?.includes("off")) return "offlane";
  if (laneRole === 1) return "carry";
  if (laneRole === 2) return "mid";
  if (laneRole === 3) return "offlane";
  return bottomEconomy ? "support" : "core";
}

/** Reporte determinista basado solo en hechos. Sin IA. */
export function buildDeterministicReport(
  facts: ReportFacts,
  question: string,
): ReplayReport {
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
    benchmarks: facts.benchmarks,
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
  if (facts.flags.includes("soporte-muere-sin-tempo")) return "morir como support sin convertirlo en vision, runas o saves";
  if (facts.flags.includes("objetivos-bajos-rol")) return "no convertir tu timing de rol en torre, smoke o Roshan";
  if (facts.flags.includes("net-worth-bajo-vs-carry")) return "perder la carrera de oro en el mid game";
  if (facts.flags.includes("dano-torres-bajo")) return "no traducir peleas en objetivos";
  if (facts.flags.includes("last-hits-bajos")) return "un farm de línea por debajo de lo esperado";
  return "errores de macro repartidos en la partida";
}

function buildErrors(facts: ReportFacts): ReplayReport["errors"] {
  const errors: ReplayReport["errors"] = [];

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
  if (facts.flags.includes("objetivos-bajos-rol")) {
    errors.push(roleObjectiveError(facts));
  }
  if (facts.flags.includes("soporte-muere-sin-tempo")) {
    errors.push({
      title: "Muertes de support sin tempo claro",
      evidence: `Cerraste con ${facts.deaths} muertes y KDA ${facts.kda}.`,
      impact: "Cada muerte sin visión, runa o save previo dejó al equipo jugando sin información.",
      fix: "Antes de cruzar río, confirma wave empujada, core cercano y objetivo: ward, smoke, runa o deward.",
      practice: "Durante 3 partidas, cada muerte debe responder: ¿qué objetivo habilité antes de morir?",
    });
  }

  // Garantiza siempre 3 entradas para que la UI y el coach tengan material.
  const fallbacks = roleFallbackErrors(facts);

  for (const f of fallbacks) {
    if (errors.length >= 3) break;
    errors.push(f);
  }
  return errors.slice(0, 3);
}

function roleObjectiveError(facts: ReportFacts): ReplayReport["errors"][number] {
  if (facts.roleGroup === "mid") {
    return {
      title: "Poco impacto de mid en objetivos",
      evidence: `Solo ${facts.towerDamage.toLocaleString()} de daño a torres desde rol ${facts.role}.`,
      impact: "Ganar o empatar mid no basta si no cae T1, runa o rotación con kill.",
      fix: "Empuja wave antes de runa y transforma nivel 6/primer item en torre o rotación lateral.",
      practice: "En 3 partidas, anota minuto de primera rotación útil y daño a T1 mid.",
    };
  }
  return {
    title: "Timing de offlane sin conversión de mapa",
    evidence: `Daño a torres ${facts.towerDamage.toLocaleString()} y posición ${facts.teamNetWorthRank} en oro del equipo.`,
    impact: "El offlane debe abrir mapa; si no cae torre ni fuerza rotaciones, el carry rival farmea cómodo.",
    fix: "Al cerrar Vanguard/Blink/aura, llama smoke o presiona T1 con support 4.",
    practice: "Juega 3 partidas midiendo si tu primer item produjo torre, smoke o kill de core.",
  };
}

function roleFallbackErrors(facts: ReportFacts): ReplayReport["errors"] {
  if (facts.roleGroup === "carry") {
    return [
      {
        title: "Ruta de farm tras la línea",
        evidence: `Terminaste con ${facts.gpm} GPM y ${facts.lastHits} last hits.`,
        impact: "Una ruta ineficiente retrasa BKB/Manta/primer item de pelea.",
        fix: "Empuja wave segura antes de jungla y evita campamentos lentos si hay wave libre.",
        practice: "Revisa del minuto 8 al 15: cada minuto debe tener wave o campamento eficiente.",
      },
      {
        title: "Conversión a Roshan o torres",
        evidence: `Daño a torres: ${facts.towerDamage.toLocaleString()}.`,
        impact: "El carry no gana solo por farm; necesita convertir primer timing en mapa.",
        fix: "Con primer item fuerte, juega cerca del objetivo que tu héroe puede tomar.",
        practice: "Después de cada pelea ganada, marca torre o Roshan antes de volver a farmear.",
      },
      lateGameFallback(facts),
    ];
  }
  if (facts.roleGroup === "mid") {
    return [
      {
        title: "Control de runas de poder",
        evidence: "OpenDota no expone todas las decisiones de runas en este resumen.",
        impact: "Perder runas reduce rotaciones y deja al otro mid dictando tempo.",
        fix: "Empuja wave 15s antes de minuto par y pide visión/ayuda del pos 4.",
        practice: "Durante 5 partidas, registra quién tomó runa 4/6/8 y qué pasó después.",
      },
      roleObjectiveError(facts),
      lateGameFallback(facts),
    ];
  }
  if (facts.roleGroup === "offlane") {
    return [
      roleObjectiveError(facts),
      {
        title: "Crear espacio sin regalar muertes",
        evidence: `KDA ${facts.kda} con ${facts.deaths} muertes.`,
        impact: "Morir lejos del objetivo no crea espacio; solo regala mapa.",
        fix: "Presiona donde tu equipo pueda conectar o donde obligues TP del core rival.",
        practice: "Revisa tus 3 primeras muertes: ¿qué torre, wave o cooldown forzaron?",
      },
      lateGameFallback(facts),
    ];
  }
  if (facts.roleGroup === "support4" || facts.roleGroup === "support5" || facts.roleGroup === "support") {
    return [
      {
        title: "Visión y runas como prioridad de support",
        evidence: "El resumen público no siempre incluye wards; el patrón debe revisarse en replay.",
        impact: "Sin visión previa, tus cores entran tarde a runas, smoke y objetivos.",
        fix: "Planifica visión 30s antes de wisdom, power rune, smoke o Roshan.",
        practice: "En 3 partidas, anota si tu ward tuvo objetivo: runa, torre, Roshan o defensa.",
      },
      {
        title: "Deward con core cercano",
        evidence: `Terminaste con ${facts.deaths} muertes.`,
        impact: "Dewardear solo cuando vas perdiendo suele convertir sentries en muertes.",
        fix: "Deward con wave empujada, smoke defensivo o un core cerca.",
        practice: "No cruces río para deward si no ves al menos 3 héroes enemigos.",
      },
      lateGameFallback(facts),
    ];
  }
  return [
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
    lateGameFallback(facts),
  ];
}

function lateGameFallback(facts: ReportFacts): ReplayReport["errors"][number] {
  return {
    title: "Decisión en late game",
    evidence: `Resultado: ${facts.result} en ${facts.durationLabel}.`,
    impact: "Las peleas de high ground o Roshan sin buyback definen partidas igualadas.",
    fix: "No cruces a Roshan ni high ground sin buyback disponible o información de iniciadores.",
    practice: "Revisa tu oro de buyback a partir del minuto 22 en cada partida.",
  };
}

function buildPlan(facts: ReportFacts): string[] {
  if (facts.roleGroup === "support4" || facts.roleGroup === "support5" || facts.roleGroup === "support") {
    return [
      "Día 1-2: revisa tus primeras 3 wards y anota qué objetivo habilitaron.",
      "Día 3-4: juega alrededor de runas de sabiduría/poder 30s antes del spawn.",
      "Día 5-6: practica deward solo con wave empujada o core cercano.",
      "Día 7: compara muertes evitables y visión útil contra esta partida.",
    ];
  }
  if (facts.roleGroup === "mid") {
    return [
      "Día 1-2: revisa equilibrio de wave y control de runas 4/6/8.",
      "Día 3-4: practica una rotación con nivel 6 o primer item, no antes.",
      "Día 5-6: convierte wave empujada en T1, rune fight o smoke.",
      "Día 7: compara timing de primera rotación útil contra esta partida.",
    ];
  }
  if (facts.roleGroup === "offlane") {
    return [
      "Día 1-2: revisa si tu primer item produjo torre, smoke o kill de core.",
      "Día 3-4: practica presionar T1 sin morir detrás de torre enemiga.",
      "Día 5-6: coordina con pos 4 cada vez que tengas cooldown fuerte.",
      "Día 7: mide espacio creado: torres, TPs forzados y muertes evitables.",
    ];
  }
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
