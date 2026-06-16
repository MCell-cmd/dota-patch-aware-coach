# Checklist de mejoras - 2026-06-16

Objetivo: aplicar paso a paso las mejoras detectadas para convertir el MVP en
un coach mas util, actual y validable sin cruzar reglas de Valve ni depender de
datos inventados por IA.

## Reglas de ejecucion

- Mantener el producto como coach externo/manual, no overlay ni automatizacion.
- Cada recomendacion sensible debe mostrar parche, fuente, frescura y confianza.
- Separar hechos, inferencias e hipotesis.
- No construir pagos/cuentas/escala hasta validar demanda con usuarios reales.
- Despues de cada bloque tecnico, correr `npm run test`, `npm run typecheck` y
  `npm run lint`.

## Bloque 0 - Higiene y base

- [x] Crear evidencia actual de necesidades de comunidad.
- [x] Crear documento de mejoras priorizadas.
- [x] Verificar si hay mojibake real en archivos visibles.
- [x] Mantener este checklist actualizado a medida que se implementa.

## Bloque 1 - Patch Coach real

- [x] Crear tipos/datos versionados para `patches` y `patch_changes`.
- [x] Registrar patch 7.41d con fuente oficial y fecha.
- [x] Reemplazar `PATCH_NOTES_BY_HERO` mock por cambios versionados.
- [x] Clasificar cada cambio como `hecho`, `inferencia` o `estadistica`.
- [x] Mostrar impacto, fuente y confianza en la UI del Patch Coach.
- [x] Agregar tests para recuperar cambios por heroe/pool.

## Bloque 2 - Vision Coach

- [x] Crear modelo de datos para escenarios de vision/wards.
- [x] Agregar 12 escenarios iniciales:
  - [x] mid runes;
  - [x] proteger carry en safe lane;
  - [x] jugar agresivo en triangulo enemigo;
  - [x] defender triangulo propio;
  - [x] Roshan antes de minuto 20;
  - [x] Roshan late;
  - [x] jugar contra Slark/Riki/Bounty;
  - [x] high ground push;
  - [x] deward cuando vas perdiendo;
  - [x] smoke desde base;
  - [x] wisdom rune;
  - [x] lotus/rune control.
- [x] Crear panel UI para filtrar por rol, fase y objetivo.
- [x] Incluir riesgo, sentry recomendada y como no regalar el ward.
- [x] Dejar claro que es guia manual/off-client.

## Bloque 3 - Mi hero pool semanal

- [ ] Clasificar el pool del usuario en:
  - [ ] jugar ahora;
  - [ ] jugar si el draft acompana;
  - [ ] pausar esta semana;
  - [ ] aprender como backup.
- [ ] Cruzar comfort, rol, dificultad, patch value y bracket.
- [ ] Agregar atribucion de fuente cuando se use meta externo.
- [ ] Mostrar 3 acciones concretas para la semana.

## Bloque 4 - Reporte post-partida por rol v2

- [x] Crear reglas por rol:
  - [x] carry;
  - [x] mid;
  - [x] offlane;
  - [x] support 4;
  - [x] support 5.
- [x] Evitar errores falsos por rol, por ejemplo supports evaluados como cores.
- [x] Agregar flags de vision/runes/objectives cuando los datos lo permitan.
- [x] Actualizar prompts de IA para respetar diagnostico por rol.
- [x] Agregar tests de reportes por rol.

## Bloque 5 - Validacion comercial

- [ ] Preparar formulario simple de feedback.
- [ ] Generar 5 reportes reales gratis y registrar respuestas.
- [ ] Intentar vender 5 reportes a USD 3.
- [ ] Mostrar workspace a 2 coaches hispanos.
- [ ] Probar reporte compartible con 1 comunidad Discord.
- [ ] Registrar aprendizajes en `evidencia/`.

## Bloque 6 - Auditoria web y uso del espacio

- [x] Investigar proyectos open source para auditar web y generar recomendaciones.
- [x] Guardar evidencia en `evidencia/2026-06-16-auditoria-web-github.md`.
- [x] Agregar `npm run audit:web` con Lighthouse, Playwright y axe.
- [x] Generar reporte local en `reports/web-audit/latest/`.
- [x] Detectar problema real de layout: paneles demasiado altos y resultado debajo del formulario en mobile.
- [x] Ajustar CSS para:
  - [x] evitar que las dos columnas del draft se estiren artificialmente;
  - [x] compactar pickers largos;
  - [x] recuperar ancho de navegacion lateral;
  - [x] mostrar el resultado antes que el formulario en mobile;
  - [x] compactar status pills en mobile.
- [ ] Medir `audit:web` contra build de produccion (`npm run build && npm run start`) antes de fijar thresholds de performance.
- [ ] Probar una variante v2 de draft con hero pool y aliados/enemigos en tabs o drawer.
- [ ] Convertir auditoria web en artifact no bloqueante de GitHub Actions si se mantiene util.

## Fuera de alcance hasta validar demanda

- [ ] Pagos automatizados.
- [ ] Login obligatorio.
- [ ] Postgres/workers/colas.
- [ ] Overlay en vivo.
- [ ] Desktop app.
- [ ] Scraping fragil sin revisar terminos.
