# Auditoría Senior - Dota Patch-Aware Coach

> Fecha: 2026-06-15
> Autor: revisión técnica como ingeniero senior.
> Objetivo: separar lo que ya es producto de lo que todavía es teatro, y dejar un
> plan accionable para convertir la demo en un MVP real.

## Veredicto en una línea

Tenemos un prototipo de UI de calidad de producto pagado montado sobre un núcleo
que todavía es 100% mock. Todo lo que se ve impresiona; casi nada de lo que
importa para cobrar existe aún. El riesgo principal no es técnico: es confundir
la demo bonita con un producto validado.

## Lo que está bien

- **Visión de producto seria.** `AGENTS.md` y `producto/vision_y_escalado.md`
  separan hechos de hipótesis, fijan la regla "IA explica, no decide" y tienen
  líneas rojas claras (nada de cheats/boosting). Eso es ventaja real.
- **Motor de scoring honesto.** `src/lib/draft.ts` es determinista, explicable y
  con pesos razonables. La arquitectura `datos → reglas → IA` es la correcta.
- **Tipado decente.** `Hero`, `HeroTag`, los `Record<Bracket, …>`. Typecheck en
  verde.
- **Autoconsciencia del fake.** El `freshnessWarning` ya avisa que la base mock
  no sirve para cobrar sin patch pipeline.

## Problemas críticos (producto)

1. **Todo el valor prometido es mock. La parte difícil no está empezada.**
   - El "Replay Analysis" no tocaba OpenDota: era un `setTimeout` de 900ms × 5
     pasos con mensajes falsos y devolvía siempre el mismo reporte hardcodeado
     (`MOCK_REPLAY_REPORTS["8850507008"]`). Cualquier match ID mostraba el mismo
     análisis de Viper.
   - No había IA, ni backend, ni patch pipeline. Los 26 héroes están escritos a
     mano y se quedan obsoletos al primer parche.
2. **La pregunta de validación sigue sin responder.** La Fase 0 (vender 10
   reportes a USD 3, hablar con 3 coaches) no tiene una sola señal de demanda
   registrada. Se está construyendo Fase 1 sin haber cerrado Fase 0.
3. **El diferenciador (español + acción concreta + ciclo draft→replay) no se
   puede demostrar con datos falsos.** Un coach mete su match ID y ve un reporte
   que no es suyo: pierde credibilidad en segundos.

## Problemas técnicos concretos

| # | Dónde | Problema | Severidad |
|---|-------|----------|-----------|
| 1 | `CoachApp.tsx` (1410 líneas) | Mono-componente con ~25 `useState`. Re-render total en cada tecla, imposible de testear por partes. | Alta |
| 2 | `CoachApp.tsx` análisis | Animación de "análisis" con `setTimeout` encadenado que miente al usuario. | Alta |
| 3 | clonado de reportes | `JSON.parse(JSON.stringify(...))` como capa de estado: olor de que falta data layer. | Media |
| 4 | `src/data/dota.ts` | 26 héroes a mano, sin versionado de parche ni fuente. | Alta |
| 5 | Todo el repo | Cero tests. El motor determinista es el lugar más barato/valioso para tenerlos. | Alta |
| 6 | `prototipo/*.sh` | La única integración real con OpenDota vivía en bash, fuera de la app. | Media |
| 7 | `draft.ts` | Números mágicos de scoring sin documentar ni cubrir con tests. | Media |
| 8 | clipboard | `navigator.clipboard` sin fallback ni manejo de error. | Baja |

## Arquitectura para escalar (sin sobre-ingeniería)

El stack grande del doc (FastAPI + Postgres + workers + Redis) es correcto pero
**prematuro**. Lo mínimo que convierte demo en producto:

```
Hoy:    Next.js (todo cliente, datos mock)
        ↓
Mínimo: Next.js + Route Handlers
          /api/match/[id]  → fetch real a OpenDota + cache (revalidate)
          /api/report      → OpenDota + motor de reglas + 1 llamada a Claude
        Constantes de héroes → endpoint de OpenDota, no a mano
```

Sin servidor aparte, sin Postgres, sin colas. Eso llega cuando haya 50 usuarios
repitiendo, no antes.

## Plan priorizado (resumen)

1. Conectar UN match real (route handler sobre OpenDota).
2. Mapear hero_id ↔ héroe vía constantes de OpenDota.
3. Meter IA donde aporta: una llamada a Claude que redacta el reporte en español
   sobre datos estructurados (con fallback determinista si no hay API key).
4. Tests del motor de scoring (Vitest).
5. Partir `CoachApp.tsx` en vistas por dominio.
6. En paralelo (no-código): cerrar Fase 0 con 5 reportes reales frente a usuarios
   y coaches.

El detalle ejecutable está en `producto/checklist_implementacion.md`.

## La crítica que más importa

Construir es la zona de confort; validar no. El proyecto envuelve un núcleo de
teatro en una UI de producto pagado. La base (visión, motor, tipos) es sólida y
el siguiente paso es pequeño: una integración real con OpenDota + una llamada a
IA convierten la demo en MVP. No construir Postgres/workers/patch pipeline aún:
hacer que UN reporte sea real y ponerlo frente a UN coach.
</content>
</invoke>
