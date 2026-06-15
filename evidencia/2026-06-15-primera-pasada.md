# Primera pasada de evidencia - Dota 2

- Fecha de consulta: 2026-06-15
- Objetivo: detectar dolores repetidos y oportunidades monetizables sin tocar
  cheats, boosting, gambling ni ventajas prohibidas.

## Hallazgo: Dota 2 sigue teniendo mercado grande y activo

- Fuente: SteamCharts, Dota 2.
- URL: https://steamcharts.com/app/570
- Usuario afectado: producto general.
- Problema: antes de construir hay que confirmar que la base de usuarios sigue
  siendo suficiente.
- Evidencia: SteamCharts muestra en la consulta cientos de miles de jugadores
  concurrentes, con promedio de 433,893 jugadores en los ultimos 30 dias y pico
  de 697,720.
- Inferencia: el mercado es grande; el problema no es tamano de audiencia sino
  elegir un dolor suficientemente especifico y monetizable.
- Oportunidad: herramientas B2C de bajo precio o B2B para coaches/comunidades.
- Riesgos: SteamCharts mide concurrencia en Steam, no intencion de pago.
- Siguiente prueba: validar comunidades concretas donde distribuir el MVP.

## Hallazgo: el meta cambia y obliga a actualizar recomendaciones

- Fuente: Dota 2 News and Updates.
- URL: https://www.dota2.com/news/updates
- Usuario afectado: jugadores que aprenden, coaches, creadores.
- Problema: guias y builds envejecen rapido con cada parche.
- Evidencia: la pagina oficial de Dota 2 muestra actualizaciones recientes,
  incluyendo Patch 7.41d publicado el 2026-06-04.
- Inferencia: hay necesidad recurrente de explicaciones actualizadas por parche,
  pero una guia generica compite con mucho contenido gratis.
- Oportunidad: convertir cambios de parche en tareas practicas por rol y en
  reportes post-partida.
- Riesgos: mantener guias puras exige seguimiento constante y puede monetizar
  peor que analisis personalizado.
- Siguiente prueba: medir si jugadores pagan por reporte personalizado o solo
  consumen guias gratis.

## Hallazgo: el analisis de partidas ya tiene validacion de pago

- Fuente: Dotabuff Plus.
- URL: https://www.dotabuff.com/plus
- Usuario afectado: jugadores que quieren mejorar.
- Problema: los jugadores quieren saber que hicieron mal y como rankear con sus
  heroes.
- Evidencia: Dotabuff Plus vende analisis avanzado, TrueSight, dashboard
  personal, rankings de heroes y herramientas de mejora por USD 6/mes o USD
  56/ano.
- Inferencia: existe disposicion de pago por datos y mejora personal, aunque
  Dotabuff ya cubre estadisticas profundas.
- Oportunidad: diferenciarse no por mas graficas, sino por diagnostico accionable
  en espanol: 3 errores, prioridad, ejercicios y decision clave de la partida.
- Riesgos: competir frontalmente con Dotabuff en datos seria mala idea.
- Siguiente prueba: generar reportes interpretativos usando datos publicos y
  feedback de jugadores.

## Hallazgo: Valve ya ofrece sugerencias y analytics, pero dentro del juego

- Fuente: Dota Plus.
- URL: https://www.dota2.com/plus
- Usuario afectado: jugadores nuevos e intermedios.
- Problema: itemizacion, habilidades, picks, muertes y rendimiento son dolores
  reconocidos por Valve.
- Evidencia: Dota Plus incluye sugerencias de items, habilidades, heroes, resumen
  de muerte, estrategia de lineas y analiticas post-partida.
- Inferencia: el valor existe, pero conviene evitar cualquier producto que parezca
  ventaja en vivo o overlay competitivo.
- Oportunidad: producto post-game/off-client, sin input automation y sin overlay.
- Riesgos: un asistente en tiempo real puede chocar con reglas, percepcion de
  unfair advantage o cambios de Valve.
- Siguiente prueba: definir el MVP como reporte despues de la partida.

## Hallazgo: la comunidad pide revision concreta de partidas

- Fuente: r/learndota2.
- URL: https://www.reddit.com/r/learndota2/
- Usuario afectado: jugadores nuevos e intermedios.
- Problema: los jugadores no saben distinguir si el error fue draft, linea,
  posicionamiento, items, objetivos o ejecucion.
- Evidencia: la portada de r/learndota2 muestra pedidos con match IDs, preguntas
  de lane matchups, posicionamiento, cierre de partidas y feedback de coaches.
- Inferencia: hay demanda de diagnostico contextual, no solo datos.
- Oportunidad: reporte por rol que responda "que hice mal y que hago distinto en
  la proxima partida".
- Riesgos: el reporte debe ser suficientemente concreto; consejos genericos no
  se pagan.
- Siguiente prueba: pedir 10 match IDs y entregar reportes manuales para medir
  si el formato ayuda.

## Hallazgo: replay analysis manual es una tarea reconocida pero lenta

- Fuente: hilo "How do you analyze your replays?" en r/learndota2.
- URL: https://www.reddit.com/r/learndota2/comments/1k67u5z/how_do_you_analyze_your_replays/
- Usuario afectado: jugadores que quieren mejorar solos.
- Problema: revisar replays requiere comparar contra jugadores de mayor MMR,
  detectar rotaciones, wards, items, posicionamiento y errores de decision.
- Evidencia: respuestas recomiendan comparar partidas con jugadores de mayor MMR
  para encontrar diferencias de warding, itemizacion, rotaciones y posicion.
- Inferencia: el trabajo que hace un buen coach puede paquetizarse parcialmente.
- Oportunidad: automatizar el primer 60% del analisis y dejar al coach o jugador
  la revision fina.
- Riesgos: datos de replay no siempre estan disponibles o parseados.
- Siguiente prueba: usar match IDs publicos y probar OpenDota/STRATZ.

## Hallazgo: el coaching tiene mercado, pero es intensivo en tiempo

- Fuente: Fiverr, Metafy.
- URLs:
  - https://www.fiverr.com/categories/lifestyle/buy/gaming/game-coaching/dota
  - https://metafy.gg/dota-2
- Usuario afectado: jugadores que pagan por mejorar; coaches.
- Problema: el coaching 1:1 escala mal y exige preparar/revisar partidas.
- Evidencia: Fiverr lista decenas de servicios de coaching Dota 2; Metafy lista
  coaches, sesiones, comunidades y contenido educativo. Hay ofertas desde precios
  bajos y tambien cursos pagados.
- Inferencia: hay disposicion de pago, pero competir como otro coach no crea
  ventaja tecnica. Ayudar a coaches a producir reportes mas rapido puede ser
  mejor B2B.
- Oportunidad: dashboard/report generator para coaches, con plantillas,
  resumenes y seguimiento por alumno.
- Riesgos: coaches buenos pueden preferir su metodo; hay que vender ahorro de
  tiempo, no reemplazo.
- Siguiente prueba: entrevistar 3 coaches pequenos o creadores hispanos.

## Hallazgo: comunidad hispana/LATAM existe y se organiza en Discord

- Fuentes: Discord Discovery, DISBOARD.
- URLs:
  - https://discord.com/servers/gaming?query=lat_
  - https://disboard.org/server/1064697761733296148
- Usuario afectado: jugadores hispanos, comunidades, organizadores.
- Problema: encontrar party, team, torneos y mejora en idioma propio.
- Evidencia: Discord Discovery muestra un servidor DOTA 2 LATAM con alrededor de
  30k miembros y miles online; DISBOARD muestra comunidades Dota en espanol con
  foco en jugar en grupo, aprender y compartir.
- Inferencia: el idioma y comunidad pueden ser canal de distribucion y
  diferenciacion.
- Oportunidad: MVP en espanol con reportes compartibles por Discord y posible
  bot para comunidades.
- Riesgos: comunidades grandes pueden ser dificiles de monetizar si solo ofrecen
  social/party.
- Siguiente prueba: validar con admins si pagarian por reportes, rankings,
  torneos o gestion de alumnos.

## Hallazgo: bots de entrenamiento existen, pero tienen friccion

- Fuente: PhalanxBot en Steam Workshop.
- URL: https://steamcommunity.com/sharedfiles/filedetails/?id=2873408973
- Usuario afectado: jugadores nuevos o que quieren practicar.
- Problema: los bots por defecto no satisfacen a todos y los scripts avanzados
  tienen pasos/friccion.
- Evidencia: PhalanxBot se presenta como bot agresivo sobre bots por defecto y
  exige crear lobby con servidor "Local Host".
- Inferencia: hay dolor de entrenamiento, pero construir bots tiene friccion de
  instalacion, dependencia de Workshop y menor claridad de monetizacion.
- Oportunidad: drills fuera del cliente o guias practicas podrian complementar,
  pero no es la primera apuesta.
- Riesgos: mantenimiento por parches, instalacion local y bajo pago.
- Siguiente prueba: dejarlo como oportunidad secundaria.

## Hallazgo: gestion de torneos en Discord ya tiene competidores genericos

- Fuente: Tourney Bot.
- URL: https://tourneybot.gg/
- Usuario afectado: comunidades y organizadores.
- Problema: administrar torneos y brackets dentro de Discord.
- Evidencia: Tourney Bot ofrece brackets, registro, resultados y leaderboards
  dentro de Discord.
- Inferencia: el dolor existe, pero una solucion generica ya cubre gran parte.
- Oportunidad: especializar en Dota 2/LATAM solo si agrega match IDs, roles,
  stats, MMR estimado, scrims, sanciones y reportes post-match.
- Riesgos: bot generico gratuito/freemium puede capturar el mercado.
- Siguiente prueba: no construir hasta validar admins de comunidades.

## Hallazgo: las APIs publicas tienen restricciones importantes

- Fuente: Steam Web API Terms of Use.
- URL: https://steamcommunity.com/dev/apiterms
- Usuario afectado: cualquier producto que use datos de Steam/Dota.
- Problema: dependencia de Valve y limites de uso.
- Evidencia: Valve puede cambiar o terminar acceso a la API, limita llamadas,
  exige privacidad para datos no publicos, prohibe almacenar password y prohibe
  tecnologia que de ventaja competitiva injusta.
- Inferencia: el producto debe ser post-partida, transparente, con cache, sin
  credenciales y sin prometer afiliacion con Valve.
- Oportunidad: usar match IDs publicos, OpenDota/STRATZ y datos agregados con
  privacy policy simple.
- Riesgos: cambios de API o datos privados ocultos por usuarios.
- Siguiente prueba: probar disponibilidad de datos con 10 match IDs reales.

## Prueba tecnica: OpenDota devuelve datos parseados de match IDs publicos

- Fuente: OpenDota API.
- URL: https://api.opendota.com/api/matches/8850507008
- Fecha de prueba: 2026-06-15
- Match IDs probados:
  - `8850507008`
  - `8850714054`
- Resultado: ambos devolvieron 10 jugadores, duracion, modo, ganador y campos
  por jugador como hero_id, kills, deaths, assists, GPM, XPM y lane_role.
- Inferencia: el MVP puede empezar con match ID publico sin login, usando
  OpenDota como primera fuente.
- Limite: esto no garantiza cobertura para todos los matches; hay que manejar
  errores, rate limits, partidas no parseadas y perfiles privados.
