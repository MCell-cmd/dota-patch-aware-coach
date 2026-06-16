# Hallazgos: auditoría web open source para recomendaciones de UI

Fecha de consulta: 2026-06-16.

## Hallazgo: Lighthouse es la base más sólida para auditoría automatizada

- Fecha: 2026-06-16
- Fuente: https://github.com/GoogleChrome/lighthouse
- Usuario afectado: Maikel/desarrollador del MVP
- Problema: revisar performance, accesibilidad, SEO y buenas prácticas a mano no escala.
- Evidencia: el repositorio oficial de Lighthouse se presenta como una herramienta automatizada para auditar performance, métricas y buenas prácticas web. Su README lista herramientas del ecosistema como `site-audit-seo`, `cypress-audit` y viewers de reportes.
- Inferencia: conviene usar Lighthouse como fuente técnica para medir el sitio y generar reportes repetibles, no como reemplazo de criterio de diseño.
- Oportunidad: agregar `npm run audit:web` para producir `lighthouse.html`, `lighthouse.json` y un resumen accionable.
- Riesgos: el score de performance varía por entorno; no debe usarse como única verdad.
- Siguiente prueba: correr auditoría local y comparar contra los problemas visibles de layout.

## Hallazgo: Playwright + Lighthouse permite auditar flujos reales

- Fecha: 2026-06-16
- Fuente: https://github.com/abhinaba-ghosh/playwright-lighthouse
- Usuario afectado: desarrollador del proyecto
- Problema: Lighthouse aislado no siempre llega al estado real de una app interactiva.
- Evidencia: `playwright-lighthouse` documenta generación de reportes JSON, HTML y CSV desde pruebas Playwright y soporta rutas autenticadas con setup previo.
- Inferencia: para este proyecto es mejor usar Playwright para preparar estado de la app y luego ejecutar auditoría, porque ya existe suite E2E.
- Oportunidad: crear script propio con Playwright + Lighthouse en vez de acoplar toda la suite a un wrapper.
- Riesgos: requiere navegador compatible y puede aumentar tiempo de CI si se ejecuta en cada push.
- Siguiente prueba: dejarlo como comando manual primero y luego convertirlo en workflow si aporta valor.

## Hallazgo: axe cubre accesibilidad automática, pero no sustituye revisión manual

- Fecha: 2026-06-16
- Fuente: https://playwright.dev/docs/accessibility-testing
- Usuario afectado: usuarios con baja visión, teclado o lectores de pantalla
- Problema: una UI densa puede tener contrastes, labels o estados interactivos incorrectos.
- Evidencia: la documentación de Playwright recomienda `@axe-core/playwright` para detectar problemas comunes como contraste, labels ausentes e IDs duplicados, y aclara que muchas cuestiones requieren revisión manual.
- Inferencia: axe debe integrarse como guardrail automático, pero las decisiones de densidad/jerarquía visual siguen siendo diseño.
- Oportunidad: combinar axe con checks propios de layout: scroll, altura de header, paneles demasiado altos.
- Riesgos: falsos negativos si el problema es de experiencia y no de WCAG detectable.
- Siguiente prueba: guardar `axe.json` junto al resumen del auditor.

## Hallazgo: Lighthouse MCP puede servir para auditoría asistida por agentes

- Fecha: 2026-06-16
- Fuente: https://github.com/danielsogl/lighthouse-mcp-server
- Usuario afectado: Maikel usando Codex/IA para revisar el sitio
- Problema: pasar de métricas técnicas a recomendaciones accionables requiere interpretación.
- Evidencia: el proyecto ofrece un MCP server con herramientas para performance, accesibilidad, SEO, seguridad, recursos, mobile vs desktop, Core Web Vitals y presupuestos.
- Inferencia: si se quiere que un agente revise la web de forma recurrente, Lighthouse MCP es una opción razonable para conectar métricas con recomendaciones.
- Oportunidad: por ahora basta con un script local; más adelante se puede instalar MCP para auditorías conversacionales.
- Riesgos: otra dependencia operativa; no conviene antes de estabilizar el flujo local.
- Siguiente prueba: evaluar MCP cuando el script local ya produzca señales útiles.

## Hallazgo: Unlighthouse/Lighthouse CI muestra cómo convertir auditoría en CI

- Fecha: 2026-06-16
- Fuente: https://unlighthouse.dev/learn-lighthouse/playwright/ci-cd
- Usuario afectado: mantenedor del repo
- Problema: sin automatización, los problemas de performance/layout vuelven en cada cambio visual.
- Evidencia: la guía muestra un workflow de GitHub Actions que instala dependencias, instala Chromium, ejecuta auditoría y sube reportes como artifacts.
- Inferencia: el siguiente paso profesional es subir reportes de auditoría como artifact en PRs, pero solo después de fijar thresholds realistas.
- Oportunidad: convertir `npm run audit:web` en job opcional de CI.
- Riesgos: bloquear PRs por variabilidad de Lighthouse puede frenar desarrollo; empezar con artifact no bloqueante.
- Siguiente prueba: correrlo localmente durante 1-2 iteraciones de UI.
