# Dota Patch-Aware Coach

Your personal Dota 2 coach in the browser: draft preparation, patch study,
vision practice, and post-match reports — all from public match data.

This is an independent educational tool for the player. It does not read game
memory, automate inputs, provide prohibited real-time advantage, support
boosting, or store player credentials. It is not affiliated with Valve
Corporation.

## What Works

- Draft assistant with deterministic, explainable scoring.
- Patch coach with versioned source/confidence metadata.
- Vision coach with practical warding and map-control scenarios.
- Post-match reports from public OpenDota data, with shareable
  `/match/[id]` landings and dynamic Open Graph previews.
- Optional AI prose enrichment via OpenRouter with deterministic fallback.
- Role-aware coaching logic for carry, mid, offlane, soft support, and hard
  support.
- Product research notes in `investigacion/`, `evidencia/`, and `producto/`.

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The app runs without paid API keys. If no AI provider key is configured, reports
use the deterministic coach.

## Scripts

```bash
npm run dev         # Next.js dev server
npm run build       # Production build
npm run start       # Serve production build
npm run lint        # ESLint
npm run typecheck   # TypeScript without emit
npm run test        # Vitest unit tests
npm run test:e2e    # Playwright E2E tests
```

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | No | Enables AI-written report prose via OpenRouter. |
| `OPENROUTER_MODEL` | No | OpenRouter model slug. Default: `deepseek/deepseek-v4-flash`. |
| `OPENDOTA_API_KEY` | No | Raises OpenDota rate limits. |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL for metadata. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Cookie-free analytics domain. |
| `AUTH_SECRET` | Production | Signs the Steam session cookie. |
| `STEAM_API_KEY` | No | Shows public Steam name/avatar after login. |

Keep real values in `.env.local`, Vercel environment variables, or GitHub
secrets. Never commit credentials.

## API

- `GET /api/match/:id` returns a normalized OpenDota match summary.
- `POST /api/report` accepts `{ matchId, accountId?, role?, question }` and
  returns a coaching report.
- `POST /api/draft` evaluates manual ally/enemy draft context.
- `POST /api/patterns` summarizes repeated player patterns.

## Repository Structure

- `app/`: Next.js routes, API handlers, metadata, and legal pages.
- `src/components/`: Coach UI by product area.
- `src/hooks/`: UI state controllers.
- `src/lib/`: Draft scoring, reports, OpenDota integration, AI, and utilities.
- `src/data/`: Hero, patch, and vision knowledge bases.
- `e2e/`: Playwright coverage for core flows.
- `investigacion/`, `evidencia/`, `producto/`: product validation and roadmap.

## AI Strategy

AI is used for explanation and prioritization, not as the source of truth. Facts
must come from patch data, public APIs, user input, or deterministic code.

See `docs/ai-model-strategy.md` for the current model routing recommendation.

## Compliance Boundary

Allowed:

- manual draft preparation;
- patch-aware study;
- public replay analysis;
- warding education;
- coach reports and training plans.

Not allowed:

- cheats, memory reading, scripts, macros, or input automation;
- prohibited real-time overlays;
- boosting, smurfing, account sharing, gambling, or market automation;
- storing Steam passwords, cookies, personal tokens, or user API keys.

## License

MIT. See `LICENSE`.
