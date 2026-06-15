# MVP

Estado: seleccionado para validacion inicial.

## MVP: Dota Patch-Aware Coach

- Usuario objetivo: jugadores de Dota 2 de habla hispana entre Herald y Divine,
  especialmente quienes sienten que "juegan bien" pero no convierten ventaja en
  victoria.
- Cliente secundario: coaches pequenos que quieren entregar feedback mas rapido
  y con formato profesional.
- Problema exacto: el jugador tiene estadisticas y replays, pero no sabe
  convertirlos en decisiones concretas adaptadas al parche actual.
- Promesa: "Antes de jugar te ayudo a elegir heroe, plan, compras y objetivos
  segun draft y parche; despues de jugar reviso tu match ID y te digo que
  fallaste".

## Flujo minimo

1. La app mantiene una base versionada del parche actual: heroes, items,
   habilidades, cambios recientes, runas, objetivos y reglas relevantes.
2. Antes de la partida, el usuario introduce manualmente rol, hero pool, aliados
   y enemigos que van saliendo en el draft.
3. El asistente recomienda picks, heroes a evitar, plan de linea, compras
   iniciales, runas/objetivos y condicion de victoria.
4. Despues de la partida, el usuario envia match ID, hero, rol, MMR aproximado y
   pregunta principal.
5. El sistema consulta datos publicos disponibles en OpenDota/STRATZ/Valve o
   pide link publico si falta parsing.
6. Se genera un reporte en Markdown/PDF con:
   - resumen de partida;
   - diagnostico por fase: linea, mid game, late game;
   - 3 errores priorizados por impacto;
   - comparacion simple contra patron de mayor nivel;
   - cambios de parche que afectaron decisiones de heroe/items;
   - 3 tareas concretas para la proxima semana;
   - una pregunta para revisar en la siguiente partida.
7. Se entrega por Discord, Telegram o web simple.

## Lo que no incluye

- No overlay en vivo.
- No macros, automatizacion de input ni asistencia durante ranked.
- No login con Steam en la primera version.
- No almacenamiento de credenciales, cookies ni tokens.
- No promesas de subir MMR ni boosting.
- No recomendaciones categoricas si el parche o los datos estan desactualizados.

## Datos necesarios

- Match ID publico.
- Hero y rol jugado.
- MMR aproximado o bracket.
- Objetivo del jugador.
- Datos publicos de partida disponibles por API o paginas publicas.
- Version de parche activa.
- Hero pool del usuario.
- Draft manual: heroes aliados y enemigos.
- Base de conocimiento de heroes, items, habilidades, runas y objetivos.

## Uso de IA

La IA se usa para explicar, resumir y adaptar recomendaciones, no para inventar
datos. La decision final combina:

- motor de reglas: counters, dano, disables, push, teamfight, scaling, sustain,
  wave clear, Roshan, timings y composicion;
- datos: win rates por bracket/rol, tendencias de pros, historico del jugador y
  cambios de parche;
- IA: convierte esa evidencia en consejo claro, priorizado y en espanol.

Ejemplo de uso correcto:

```text
Tu rival ya mostro Phantom Assassin y Lion. Para mid, de tu pool actual Viper
tiene mejor encaje que Zeus porque castiga la linea, reduce el timing de PA y
tu equipo necesita dano sostenido temprano. Riesgo: si no presionas torres antes
del minuto 18, tu draft pierde valor.
```

## Precio tentativo

- Prueba manual: USD 3 por reporte o 3 reportes por USD 8.
- Suscripcion jugador: USD 9-12/mes por 4 reportes.
- Plan coach: USD 19-29/mes por plantillas, historial de alumnos y reportes con
  marca propia.
- Asistente jugador: USD 5-9/mes para draft manual + recomendaciones por parche
  + reportes limitados.

Estos precios son hipotesis. Se validan antes de construir.

## Prueba de demanda

1. Publicar en 2 comunidades hispanas/LATAM y 1 comunidad general de aprendizaje.
2. Ofrecer 10 reportes gratis a cambio de feedback y permiso para usar el caso
   anonimizado.
3. Despues ofrecer 10 reportes pagos a USD 3.
4. Contactar 3 coaches pequenos y preguntar si pagarian por generar reportes en
   10 minutos en vez de revisar manualmente desde cero.

## Criterio de exito

- 20 match IDs recibidos en 7 dias.
- 20 drafts manuales simulados por usuarios reales.
- 5 usuarios dispuestos a pagar por un segundo reporte.
- 1 coach dispuesto a probar plan mensual.
- Feedback promedio: el usuario identifica al menos una accion concreta que no
  habia visto antes.

## Riesgos

- APIs o replays no disponibles para todos los matches.
- Consejos demasiado genericos si no se combina dato con criterio de Dota.
- Usuarios de bajo MMR pueden querer resultados rapidos y no entrenamiento.
- Dotabuff/Dota Plus ya cubren analytics; la diferenciacion debe ser claridad
  accionable en espanol.
- Recomendaciones malas si la base de parche no se actualiza a tiempo.
- "Todo Dota" es demasiado amplio; el MVP debe empezar por heroes/roles mas
  usados y ampliar por evidencia.

## Siguiente paso

Crear un prototipo sin plataforma:

- plantilla de reporte;
- script minimo para consultar match ID;
- base inicial de parche/heroes/items;
- asistente manual de draft;
- 10 reportes manuales;
- landing o mensaje de Discord con oferta clara.
