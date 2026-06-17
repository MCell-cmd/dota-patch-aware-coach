import { Bracket, Hero, HERO_BY_ID, Role } from "@/data/dota";
import { getHeroMeta, type HeroMeta } from "@/lib/meta";

export type WeeklyClassification = "jugar-ahora" | "jugar-draft" | "pausar" | "aprender";

export type WeeklyHeroResult = {
  hero: Hero;
  classification: WeeklyClassification;
  reason: string;
  meta: HeroMeta;
};

// Brackets bajos donde un héroe difícil castiga más de lo que aporta.
const LOW_BRACKETS: Bracket[] = ["herald", "guardian", "crusader"];

export function classifyHeroPool(
  heroPool: string[],
  role: Role,
  bracket: Bracket,
): WeeklyHeroResult[] {
  return heroPool.map((heroId) => {
    const hero = HERO_BY_ID.get(heroId);
    const meta = getHeroMeta(heroId, bracket);

    if (!hero) {
      return {
        hero: { id: heroId, name: heroId } as Hero,
        classification: "pausar" as WeeklyClassification,
        reason: "Héroe no encontrado en la base.",
        meta,
      };
    }

    const isRoleMatch = hero.roles.includes(role);
    const hardForBracket = hero.difficulty > 3 && LOW_BRACKETS.includes(bracket);
    const wrText = meta.winratePct != null ? `${meta.winratePct}% WR en ${bracket}` : "sin datos";
    const patchText = meta.changedThisPatch
      ? ` Recibió ${meta.changeCount} cambio(s) en el parche: revisa sus notas.`
      : "";

    let classification: WeeklyClassification;
    let reason: string;

    if (!isRoleMatch) {
      classification = "aprender";
      reason = `Suele jugarse en otros roles. Practícalo en unranked si lo quieres como ${role}.`;
    } else if (!meta.hasData) {
      classification = "jugar-draft";
      reason = "Sin datos de meta suficientes; decide según el draft.";
    } else if (meta.verdict === "fuerte" && !hardForBracket) {
      classification = "jugar-ahora";
      reason = `Fuerte en el meta (${wrText}). Buen momento para spammearlo.${patchText}`;
    } else if (meta.verdict === "fuerte" && hardForBracket) {
      classification = "jugar-draft";
      reason = `Fuerte en el meta (${wrText}) pero exige ejecución alta para tu bracket. Úsalo si tu equipo da control.${patchText}`;
    } else if (meta.verdict === "debil") {
      classification = "pausar";
      reason = `Flojo en el meta actual (${wrText}). Hay opciones con mejor winrate esta semana.${patchText}`;
    } else if (meta.verdict === "solido") {
      classification = "jugar-draft";
      reason = `Sólido (${wrText}). Dependerá de counters directos en partida.${patchText}`;
    } else {
      classification = "jugar-draft";
      reason = `Promedio en el meta (${wrText}). Pick válido si encaja en el draft.${patchText}`;
    }

    return { hero, classification, reason, meta };
  });
}
