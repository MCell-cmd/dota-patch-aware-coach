# Dota 2 — Patch-Aware Coach

Proyecto de producto para la comunidad de Dota 2: asistente de draft, coach de
parche y análisis post-partida. La investigación de producto vive en
`investigacion/`, `evidencia/` y `producto/`; la app web vive en `app/` y `src/`.

Punto de entrada para investigar/construir producto: lee `AGENTS.md`.

## Estado real (lo que ya funciona)

- **Asistente de draft**: motor de scoring determinista y explicable
  (`src/lib/draft.ts`), con tests.
- **Coach de parche**: base de héroes versionada (mock 7.41d) en `src/data/dota.ts`.
- **Análisis post-partida**: integración **real** con OpenDota
  (`/api/report` → KDA, GPM/XPM, net worth, daño) + redacción del reporte con
  Claude cuando hay `ANTHROPIC_API_KEY`, con **fallback determinista** si no la
  hay. La app funciona end-to-end en ambos casos.
- **Workspace de coach (B2B)**: gestión de alumnos y edición de reportes.

Diagnóstico técnico completo y siguientes pasos:
`producto/auditoria_senior.md` y `producto/checklist_implementacion.md`.

## Arranque

```bash
npm install
cp .env.example .env.local   # opcional: añade ANTHROPIC_API_KEY para IA
npm run dev                   # http://localhost:3000
```

La app corre sin ninguna API key: el análisis usa datos reales de OpenDota y el
reporte determinista. Con `ANTHROPIC_API_KEY`, el reporte se redacta con Claude.

## Scripts

```bash
npm run dev         # servidor de desarrollo
npm run build       # build de producción
npm run start       # servir el build
npm run lint        # ESLint (flat config)
npm run typecheck   # tsc --noEmit
npm run test        # tests del motor (Vitest)
npm run test:watch  # tests en modo watch
```

## API

- `GET /api/match/:id` — resumen normalizado de una partida pública de OpenDota.
- `POST /api/report` — body `{ matchId, accountId?, role?, question }`; devuelve el
  reporte de coaching sobre datos reales (con IA o determinista).

## Variables de entorno

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | No | Activa la redacción del reporte con Claude. |
| `CLAUDE_MODEL` | No | Modelo de Claude (por defecto `claude-opus-4-8`). |
| `OPENDOTA_API_KEY` | No | Sube el rate limit de OpenDota. |

## Estructura

- `AGENTS.md`: instrucciones del agente investigador de producto.
- `investigacion/`, `evidencia/`, `producto/`: investigación, demanda y roadmap.
- `app/`: rutas y route handlers de Next.js.
- `src/lib/`: motor de scoring, integración OpenDota, reporte e IA.
- `src/components/`: UI por dominio (draft, parche, replay, workspace).
- `src/data/`: base de héroes, parche y plantillas.
