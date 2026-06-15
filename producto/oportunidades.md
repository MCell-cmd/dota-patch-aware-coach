# Oportunidades

Estado: primera priorizacion con evidencia publica consultada el 2026-06-15.
No es una conclusion final; falta validar con usuarios reales.

Escala: 1 bajo, 5 alto. En `Riesgo`, 5 significa alto riesgo.

| Rank | Idea | Usuario | Dolor | Pago | Frecuencia | Acceso | Diferenciacion | Riesgo | MVP | Evidencia |
| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | Reporte post-partida por rol | Jugador 1k-5k MMR | 5 | 4 | 4 | 4 | 4 | 2 | 5 | `../evidencia/2026-06-15-primera-pasada.md` |
| 2 | Generador de reportes para coaches | Coach / creador | 4 | 5 | 4 | 4 | 4 | 2 | 4 | `../evidencia/2026-06-15-primera-pasada.md` |
| 3 | Bot Discord Dota LATAM para scrims/inhouse | Comunidades / equipos | 4 | 3 | 4 | 3 | 3 | 2 | 3 | `../evidencia/2026-06-15-primera-pasada.md` |
| 4 | Guia dinamica en espanol por parche | Jugador nuevo/intermedio | 3 | 2 | 3 | 5 | 3 | 1 | 4 | `../evidencia/2026-06-15-primera-pasada.md` |
| 5 | Dashboard de progreso para alumnos | Coaches / academias chicas | 3 | 4 | 3 | 4 | 3 | 2 | 3 | `../evidencia/2026-06-15-primera-pasada.md` |
| 6 | Drills fuera del cliente para nuevos jugadores | Jugador nuevo | 4 | 2 | 3 | 5 | 3 | 1 | 3 | `../evidencia/2026-06-15-primera-pasada.md` |
| 7 | Entrenamiento con bots custom | Jugador nuevo/intermedio | 4 | 2 | 3 | 2 | 3 | 3 | 2 | `../evidencia/2026-06-15-primera-pasada.md` |
| 8 | Overlay/asistente en vivo | Jugador ranked | 4 | 3 | 5 | 2 | 2 | 5 | 1 | Rechazado por riesgo ToS/unfair advantage |
| 9 | Boosting/account services | Jugador que quiere MMR rapido | 5 | 4 | 2 | 1 | 1 | 5 | 0 | Rechazado por reglas duras |
| 10 | Automatizacion del mercado Steam/items | Traders | 3 | 3 | 3 | 1 | 2 | 5 | 0 | Rechazado por riesgo y credenciales |

## Lectura comercial

La mejor oportunidad inicial no es hacer "otra pagina de stats". Dotabuff,
Dota Plus, STRATZ y OpenDota ya cubren gran parte de datos y tendencias. El
espacio interesante esta en interpretacion accionable:

- Que error concreto me hizo perder impacto?
- Que decision debo cambiar en mi proxima partida?
- Que ejercicio practico hago esta semana?
- Como puede un coach entregar feedback mas rapido sin revisar todo desde cero?

## Idea ganadora para validar primero

**Reporte post-partida por rol en espanol**, con opcion B2B para coaches.

Razon:

- Dolor claro en `r/learndota2`: jugadores piden review por match ID, lane,
  itemizacion, posicionamiento y cierre de partida.
- Pago validado indirectamente: Dotabuff Plus cobra por analytics, Dota Plus
  existe como suscripcion oficial, y Fiverr/Metafy muestran mercado de coaching.
- Riesgo controlable: se entrega despues de la partida, sin overlay, sin
  automatizar input y sin credenciales.
- MVP rapido: reportes manuales/semiautomaticos con 10 match IDs antes de hacer
  plataforma.

## No construir todavia

- Overlay en vivo: puede percibirse como ventaja competitiva y choca con el
  criterio de bajo riesgo.
- Bots custom: hay demanda de entrenamiento, pero instalar/usar scripts por
  Workshop y Local Host agrega friccion; monetizacion incierta.
- Torneos Discord genericos: el dolor existe, pero ya hay competidores; solo
  vale si se especializa fuerte en Dota 2 LATAM.
