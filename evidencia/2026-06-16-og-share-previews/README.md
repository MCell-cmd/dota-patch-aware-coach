# Open Graph share previews

- Fecha de consulta: 2026-06-16
- URLs: https://dota-patch-aware-coach.vercel.app/{,terminos,privacidad,match/<id>}
- Tipo de fuente: capturas locales (Playwright + Chrome) que renderizan la card grande de X/Twitter con los `twitter:*` y `og:*` reales del HTML servido por producción, y los PNG dinámicos de `next/og` que sirve cada ruta.
- Resumen: las cinco rutas con OG image dinámica devuelven `twitter:card=summary_large_image`, título y descripción específicos por ruta, e imagen 1200×630. Para las rutas `/match/[id]` la imagen, el título y la descripción reflejan datos reales de OpenDota.

## Archivos

| Archivo | Ruta | Datos |
| --- | --- | --- |
| `home.png` | `/` | "Dota Patch-Aware Coach · tu coach personal de Dota 2" |
| `terminos.png` | `/terminos` | "Términos · Dota Patch-Aware Coach" |
| `privacidad.png` | `/privacidad` | "Privacidad · Dota Patch-Aware Coach" |
| `match-win-pangolier-8854031550.png` | `/match/8854031550` | Pangolier 13/3/19 · Victoria en 38:02 · GPM 661 · XPM 909. Acento teal, estrella maciza. |
| `match-loss-tiny-8854153066.png` | `/match/8854153066` | Tiny 19/5/6 · Derrota en 76:34 · GPM 879 · XPM 972. Acento rojo, estrella en contorno. |
| `all-cards-strip.png` | (todas) | Tira vertical con las cinco previews una debajo de otra. |

## Citas cortas relevantes

- `twitter:card = summary_large_image` confirmado por ruta con `User-Agent: Twitterbot/1.0`.
- Título de `/match/8854031550`: `Pangolier · 13/3/19 · Victoria en 38:02 · Dota Coach`.
- Descripción de `/match/8854153066`: `Match 8854153066 de Dota 2: Tiny cerró 19/5/6 con 879 GPM y 972 XPM en una derrota de 76:34.`
- OG PNG `/match/8854031550/opengraph-image` → HTTP 200, image/png, ~71 KB, dimensiones 1200×630.

## Qué problema confirma

- El bug de social previews "todas las rutas mostraban el copy de la home" quedó cerrado: cada ruta sobrescribe `og:title`, `og:description`, `og:url` y `twitter:*` con sus propios valores y conserva `twitter:card=summary_large_image`.
- Las cards de match reflejan métricas reales (KDA, GPM, XPM, net worth, duración) y el accent/estrella distinguen victoria de derrota visualmente.

## Qué no confirma

- No confirma el render dentro del cliente nativo de X/Twitter porque el validador oficial (`cards-dev.twitter.com/validator`) exige login. Estas capturas son el render local que replica las reglas de X partiendo del HTML que efectivamente sirve producción.

## Riesgos o límites

- Cambios futuros que añadan `metadata.twitter` en otras rutas deben recordar setear `card: "summary_large_image"`. Next.js reemplaza el bloque entero del layout cuando un hijo lo declara.
- Los iconos decorativos en las OG images deben dibujarse como SVG inline; cualquier glyph fuera del subset de Inter que embebe Satori se rasteriza como tofu.
