# Checklist de implementación - de demo a MVP real

> Origen: `producto/auditoria_senior.md`.
> Regla: convertir el teatro en producto sin sobre-ingeniería. Cada bloque deja
> algo real funcionando.

## Bloque 1 - Integración real con OpenDota

- [x] `src/lib/opendota.ts`: tipos + `fetchMatch(id)` + `fetchHeroConstants()`
      con cache.
- [x] `normalizeMatch()`: convierte la respuesta cruda de OpenDota en un resumen
      estructurado por jugador (KDA, GPM/XPM, last hits, net worth, items, fase).
- [x] `app/api/match/[id]/route.ts`: route handler que valida el ID, llama a
      OpenDota, cachea con `revalidate` y devuelve el resumen normalizado.
- [x] Mapeo `hero_id ↔ héroe` vía constantes de OpenDota (sin hardcodear).
- [x] Manejo de errores: match no parseado, ID inválido, timeout, 404.

## Bloque 2 - Reporte real (motor + IA con fallback)

- [x] `src/lib/report.ts`: heurísticas deterministas que generan el reporte base
      a partir del resumen normalizado (sin inventar datos).
- [x] `app/api/report/route.ts`: POST con `{ matchId, accountId?, role, question }`.
- [x] Integración con Claude (`@anthropic-ai/sdk`) que redacta el reporte en
      español sobre datos estructurados.
- [x] Fallback determinista cuando no hay `ANTHROPIC_API_KEY` (la app funciona
      end-to-end igual).
- [x] El reporte conserva la forma que la UI ya consume (`MockReplayReport`).

## Bloque 3 - Conectar la UI al backend real

- [x] Reemplazar el `setTimeout` falso del panel de Replay por un `fetch` real a
      `/api/report` con estados de carga/error verdaderos.
- [x] Mostrar de dónde salieron los datos (match real) y la advertencia de
      frescura.
- [x] Manejo de error visible en la UI (match inválido / sin parsear).

## Bloque 4 - Tests del motor

- [x] Configurar Vitest + script `test`.
- [x] Tests de `analyzeDraft`: comfort pool, counters, sinergias, riesgo por
      bracket, casos borde (pool vacío, rol sin héroes).
- [x] Tests de `normalizeMatch` / `buildReport` con un fixture de OpenDota.

## Bloque 5 - Refactor de la UI

- [x] Extraer `DraftView`, `PatchView`, `ReplayView`, `CoachView` a archivos
      propios.
- [x] Extraer subcomponentes compartidos (`SelectField`, `SegmentedField`, etc.).
- [x] `CoachApp.tsx` queda como orquestador delgado.

## Bloque 6 - Higiene y DX

- [x] `.env.example` con `ANTHROPIC_API_KEY` y `OPENDOTA_API_KEY` opcional.
- [x] `README` actualizado con cómo correr API/tests y el estado real.
- [x] Fallback de `clipboard` con manejo de error.
- [x] `typecheck` + `lint` + `test` en verde.

## Fuera de alcance ahora (registrado a propósito)

- [ ] Postgres / workers / colas (llega con 50 usuarios repitiendo).
- [ ] Patch watcher / parser de patch notes (Fase 2).
- [ ] Login con Steam, perfil persistente (Fase 3).
- [ ] Pagos (solo tras señales de demanda).

## Validación (no-código, paralelo)

- [ ] Generar 5 reportes reales y mandarlos a 5 jugadores hispanos.
- [ ] Mostrar el ciclo draft→replay a 1-2 coaches y registrar feedback en
      `evidencia/`.
</content>
