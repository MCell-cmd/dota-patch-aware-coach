---
name: dota-patch-aware-coach
description: Build, research, validate, or extend the Dota 2 Patch-Aware Coach product. Use when working on the Dota 2 draft assistant, patch-aware recommendations, replay analysis by match ID, OpenDota/STRATZ/Valve data ingestion, hero/item knowledge base, coach/community mode, monetization, or product validation for this project.
---

# Dota Patch-Aware Coach

## Core Workflow

1. Read `producto/vision_y_escalado.md` first.
2. For architecture or AI behavior, read `producto/arquitectura_ia_patch_aware.md`.
3. For draft UI/scoring work, read `producto/asistente_draft.md`.
4. For replay-report work, read `producto/reporte_plantilla.md` and inspect
   `prototipo/opendota_match_summary.sh`.
5. Check `evidencia/` before treating a product assumption as validated.

## Product Rules

- Build a coach, not a cheat.
- Keep input manual for draft/pre-game recommendations in the MVP.
- Do not read game memory, automate input, scrape private data, store Steam
  credentials, or promise MMR gains.
- Always include patch version, freshness, confidence, and tradeoffs in advice.
- If patch data is stale or incomplete, say so and downgrade confidence.
- Prefer actionable Spanish output over long theory.

## Recommendation Stack

Use this order:

1. Current patch and source freshness.
2. Structured hero/item/objective knowledge.
3. Deterministic scoring for draft and role fit.
4. Public match data from OpenDota/STRATZ/Valve when available.
5. AI explanation constrained by the facts above.

The AI may explain, summarize, and adapt. It must not invent facts or act as the
source of truth.

## MVP Scope

Prioritize:

- Web app with usable first screen.
- Manual draft assistant.
- Patch coach for favorite heroes.
- Match ID replay summary via OpenDota.
- Markdown report generation.
- 20-30 popular heroes before full coverage.
- SQLite/cache before Postgres unless scale requires otherwise.

Defer:

- Steam login.
- Desktop overlay.
- Mobile native app.
- All heroes/items with perfect depth.
- Automated payments until demand is proven.

## Validation

Before marking work done:

- Run available tests/lint/build.
- For frontend, verify desktop and mobile layout with Playwright or screenshots.
- For API/data work, test at least one real public match ID.
- For recommendation changes, include a small example draft or replay case.
- Record product evidence or assumptions in `evidencia/` or `producto/`.
