import { useEffect, useState } from "react";
import { HEROES, type Bracket, type Role, type Style } from "@/data/dota";
import type { DraftAnalysis } from "@/lib/draft";

const DEFAULT_POOL_LIMIT = 6;

function defaultHeroPoolForRole(role: Role) {
  return HEROES.filter((hero) => hero.roles.includes(role))
    .slice(0, DEFAULT_POOL_LIMIT)
    .map((hero) => hero.id);
}

export function useDraftController() {
  const [role, setRole] = useState<Role>("mid");
  const [bracket, setBracket] = useState<Bracket>("archon");
  const [style, setStyle] = useState<Style>("comfort");
  const [heroPool, setHeroPool] = useState<string[]>(() => defaultHeroPoolForRole("mid"));
  const [allies, setAllies] = useState<string[]>(["axe", "crystal-maiden", "sniper"]);
  const [enemies, setEnemies] = useState<string[]>(["phantom-assassin", "lion", "tidehunter"]);
  const [analysis, setAnalysis] = useState<DraftAnalysis | null>(null);
  const [isAnalyzingDraft, setIsAnalyzingDraft] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [showDraftDetails, setShowDraftDetails] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      setIsAnalyzingDraft(true);
      setDraftError(null);
      try {
        const response = await fetch("/api/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role, bracket, style, heroPool, allies, enemies }),
        });

        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor al calcular el scoring.");
        }

        setAnalysis(await response.json());
      } catch (err) {
        console.error(err);
        setDraftError("No se pudo conectar con el motor de scoring en el servidor.");
      } finally {
        setIsAnalyzingDraft(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [role, bracket, style, heroPool, allies, enemies]);

  const setDraftRole = (nextRole: Role) => {
    setRole(nextRole);
    setHeroPool(defaultHeroPoolForRole(nextRole));
    setShowDraftDetails(false);
  };

  return {
    role,
    setRole: setDraftRole,
    bracket,
    setBracket,
    style,
    setStyle,
    heroPool,
    setHeroPool,
    allies,
    setAllies,
    enemies,
    setEnemies,
    analysis,
    isAnalyzingDraft,
    draftError,
    showDraftDetails,
    setShowDraftDetails,
  };
}
