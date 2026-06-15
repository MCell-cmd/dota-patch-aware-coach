# Validacion tecnica y fuentes actuales del MVP

- Fecha de consulta: 2026-06-15
- Objetivo: confirmar fuentes actuales para el MVP patch-aware y registrar el
  avance tecnico de la primera pantalla web.

## Hallazgo: el parche vigente necesita fuente oficial visible

- Fecha: 2026-06-15
- Fuente: Dota 2 News and Updates.
- URL: https://www.dota2.com/news/updates
- Usuario afectado: jugadores que reciben consejos de draft, patch coach y
  replay.
- Problema: una recomendacion puede quedar desactualizada si el parche cambia.
- Evidencia: la pagina oficial muestra Patch 7.41d como actualizacion reciente
  publicada el 2026-06-04.
- Inferencia: cada recomendacion del MVP debe mostrar version de parche, fecha
  de base y advertencia de frescura.
- Oportunidad: diferenciar el producto como "patch-aware" si el consejo baja
  confianza cuando la base no esta revisada.
- Riesgos: una base mock no debe usarse para cobrar reportes reales.
- Siguiente prueba: crear ingestion minima de patch notes oficiales y guardar
  cambios por heroe/item con fuente.

## Hallazgo: OpenDota sirve para prototipo sin login, pero requiere limites claros

- Fecha: 2026-06-15
- Fuente: OpenDota API.
- URL: https://docs.opendota.com/
- Usuario afectado: jugadores que pegan match ID publico.
- Problema: el reporte necesita datos de partida sin pedir Steam login.
- Evidencia: OpenDota documenta una API publica de datos de Dota 2 y permite uso
  sin key, con mayor rate limit al registrar una key.
- Inferencia: el MVP puede empezar con match ID publico y cache local, pero debe
  manejar rate limits, errores, partidas sin parsear y privacidad.
- Oportunidad: reporte semiautomatico de bajo riesgo antes de construir cuentas.
- Riesgos: no basar todo el negocio en una sola fuente gratuita sin fallback.
- Siguiente prueba: probar 10 match IDs recientes y registrar campos faltantes.

## Hallazgo: STRATZ puede ser fuente secundaria, pero hay que validar terminos

- Fecha: 2026-06-15
- Fuente: STRATZ API y Knowledge Base.
- URLs:
  - https://stratz.com/api
  - https://stratz.com/knowledge-base/API/Is%20the%20STRATZ%20API%20free%3F
- Usuario afectado: producto tecnico y futuro B2B para coaches.
- Problema: OpenDota puede no cubrir todas las metricas que un reporte serio
  necesita.
- Evidencia: STRATZ presenta una API GraphQL gratuita y documenta limites por
  token.
- Inferencia: STRATZ puede complementar tendencias, parses y stats, pero no debe
  bloquear el MVP inicial.
- Oportunidad: usar STRATZ como fuente secundaria cuando se valide licencia,
  limites y atribucion.
- Riesgos: dependencia de token, limites, cambios de API y terminos comerciales.
- Siguiente prueba: revisar terminos completos antes de usar STRATZ en un plan
  pago.

## Hallazgo: primera pantalla web ya valida el flujo manual seguro

- Fecha: 2026-06-15
- Fuente: prototipo local Next.js.
- Usuario afectado: Maikel, usuarios de prueba y futuros coaches.
- Problema: el MVP necesitaba una primera pantalla usable, no solo documentos.
- Evidencia: se implemento una UI con modos Draft, Patch Coach y Replay; el modo
  Draft usa entrada manual, motor de scoring local, version de parche,
  confianza, riesgos, items y plan por tiempos.
- Inferencia: el producto ya puede usarse para simular 20 drafts manuales y
  detectar si la salida se entiende.
- Oportunidad: validar promesa con usuarios antes de crear login, pagos o
  ingestion compleja.
- Riesgos: la base de heroes/parche es mock; no debe presentarse como verdad
  actual completa.
- Siguiente prueba: conectar OpenDota a Replay y producir el primer reporte
  Markdown real desde match ID.
