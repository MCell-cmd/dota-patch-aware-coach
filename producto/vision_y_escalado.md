# Vision y escalado - Dota Patch-Aware Coach

## Resumen

Queremos construir una app para jugadores de Dota 2 que combine tres cosas:

1. **Asistente de draft y plan de partida**: el jugador mete manualmente su rol,
   hero pool, aliados y enemigos; la app recomienda picks, heroes a evitar,
   compras iniciales, runas, objetivos y plan por tiempos.
2. **Coach de parches**: la app entiende el parche actual y explica que cambio
   para tus heroes, items, counters, builds y timings.
3. **Analisis post-partida**: despues del juego, el usuario pega el match ID y
   recibe un reporte con errores concretos, impacto y ejercicios.

La propuesta cobrable no es "mas estadisticas". Es convertir datos y cambios de
Dota en decisiones simples:

- que pickear;
- por que ese pick tiene sentido;
- que comprar al inicio;
- donde jugar;
- que runas/objetivos priorizar;
- que error cometiste despues;
- que practicar para la proxima partida.

## Problema

Dota 2 tiene mucha informacion, pero el jugador promedio no sabe convertirla en
decisiones. El usuario puede ver Dotabuff, OpenDota, Dota Plus, videos y notas
de parche, pero aun queda una pregunta practica:

```text
Con mi rol, mi hero pool, este draft y este parche, que debo hacer ahora?
```

El dolor aumenta porque Dota cambia por parches. Un consejo bueno hace dos
semanas puede ser malo hoy si cambiaron heroes, items, mapa o objetivos.

## Usuario objetivo

### Usuario principal

Jugadores hispanos entre Herald y Divine que:

- juegan ranked o party varias veces por semana;
- quieren subir MMR o jugar mejor;
- no tienen tiempo para analizar replays completos;
- se pierden con cambios de parche;
- quieren consejos concretos antes y despues de jugar.

### Usuario secundario

Coaches pequenos, creadores y comunidades que:

- necesitan revisar partidas mas rapido;
- quieren reportes con formato profesional;
- quieren contenido por parche;
- pueden pagar por herramientas que ahorren tiempo.

## Producto que queremos

### 1. Asistente de draft

Entrada:

- rol del usuario;
- bracket/MMR aproximado;
- hero pool propio;
- aliados ya elegidos;
- enemigos ya elegidos;
- heroes baneados;
- estilo: comfort, counter, agresivo, seguro, late game.

Salida:

- mejor pick del hero pool;
- 2 alternativas;
- heroes a evitar;
- razonamiento;
- riesgo de ejecucion;
- plan de linea;
- compras iniciales;
- runas y objetivos;
- condicion de victoria;
- version de parche y nivel de confianza.

### 2. Coach de parches

Entrada:

- heroes favoritos del usuario;
- rol;
- bracket;
- parche actual.

Salida:

- que heroes del usuario fueron buffeados/nerfeados;
- que items cambiaron su build;
- que counters cambiaron;
- que nuevos timings importan;
- que practicar esta semana;
- que heroes conviene pausar hasta adaptarse.

### 3. Analisis post-partida

Entrada:

- match ID;
- rol;
- hero jugado;
- pregunta del jugador;
- plan recomendado antes de jugar si existia.

Salida:

- resumen de partida;
- diagnostico por fases: linea, mid game, late game;
- 3 errores mas caros;
- item timings;
- impacto por rol;
- decision clave que cambio la partida;
- ejercicios de 7 dias;
- comparacion contra el plan inicial.

### 4. Evaluacion de draft, equipos y jugadores

La app debe valorar todo el contexto, no solo el heroe del usuario.

Antes de la partida:

- evalua los 5 heroes aliados;
- evalua los 5 heroes enemigos si ya se conocen;
- detecta falta de stun, iniciacion, save, push, teamfight, wave clear, dano a
  torres, dano a Roshan, scaling y control de mapa;
- detecta si el draft aliado necesita jugar rapido o aguantar late;
- detecta que heroe enemigo es la condicion de victoria que hay que frenar;
- recomienda por donde jugar: presionar mid, atacar safe lane enemiga, proteger
  carry, jugar alrededor de offlane, invadir triangulo, jugar Roshan, etc.

Despues de la partida:

- evalua los 10 jugadores por rol usando datos publicos disponibles;
- separa "mi error" de "problema del draft/equipo";
- detecta si el usuario tuvo impacto alto, medio o bajo para su rol;
- identifica al jugador enemigo que mas condiciono la partida;
- identifica al aliado que necesitaba mas ayuda o proteccion;
- evita culpar sin evidencia: si los datos no alcanzan, marca baja confianza.

### 5. Perfil del jugador

No hace falta para el primer MVP, pero es clave para escalar.

Datos:

- hero pool;
- roles favoritos;
- heroes prohibidos o que no sabe jugar;
- objetivos personales;
- historial de reportes;
- errores repetidos;
- progreso por semana.

Valor:

- recomendaciones mas personalizadas;
- no recomendar counters imposibles para ese jugador;
- detectar patrones repetidos.

### 6. Modo coach/comunidad

Para monetizacion B2B.

Funciones:

- crear alumnos;
- subir match IDs;
- generar reporte base;
- editar comentarios;
- exportar PDF/Markdown;
- marca propia del coach;
- historial por alumno;
- resumen semanal.

## Vision larga: cubrir "todo Dota" por capas

La meta a largo plazo es que la app entienda todos los sistemas relevantes de
Dota 2. Pero se debe construir por capas para no terminar con consejos
superficiales.

Capas que debe cubrir con el tiempo:

- heroes, roles y dificultad de ejecucion;
- habilidades, talentos, facets/innates y power spikes;
- items iniciales, core, situacionales y counters;
- matchups de linea;
- composicion de equipo;
- draft y bans;
- runas: Bounty, Water, Power, Wisdom y Lotus;
- mapa: lanes, jungle, triangulo, high ground, portales, vision y zonas seguras;
- objetivos: torres, Roshan, Aegis, Cheese, Tormentor, barracas y high ground;
- economia: last hits, denies, stacks, pulls, GPM, XPM, net worth y comeback;
- vision: wards, sentries, deward, smoke y control de zonas;
- peleas: iniciacion, saves, target priority, buyback y cooldowns;
- timings: catapultas, ultimates, BKB, Blink, Manta, Diffusal, etc.;
- meta por parche, bracket y region;
- historial del jugador y errores repetidos.

Orden recomendado:

1. Draft + composicion + compras iniciales.
2. Runas y plan minuto 0-10.
3. Match ID + reporte post-partida.
4. Patch coach por heroes favoritos.
5. Perfil del jugador.
6. Vision/objetivos/mapa.
7. Teamfight y target priority.
8. Coaches/comunidades.

## Lo que no queremos

- Cheats.
- Boosting.
- Account sharing.
- Apuestas/gambling.
- Automatizacion del mercado de Steam.
- Macros o automatizacion de input.
- Leer memoria del juego.
- Overlay dentro del cliente en el primer producto.
- Prometer subida de MMR.
- Recomendar con seguridad si el parche/datos estan desactualizados.

## Como debe usar IA

La IA no debe inventar Dota. La IA debe explicar y adaptar.

Arquitectura correcta:

```text
fuentes actuales -> datos estructurados -> motor de reglas -> IA -> consejo claro
```

La fuente de verdad:

- parche actual;
- cambios oficiales;
- heroes/items versionados;
- stats por bracket/rol;
- datos del match ID;
- reglas de composicion y draft.

La IA recibe esos datos y produce:

- explicacion en espanol;
- plan por tiempos;
- tradeoffs;
- ejercicios;
- resumen simple para el jugador.

Regla dura:

```text
Si no sabemos el parche o la fuente esta vieja, la app debe decirlo.
```

## Datos necesarios

### Publicos

- notas oficiales de parche;
- Steam news;
- OpenDota API;
- STRATZ API si terminos y limites lo permiten;
- constantes de heroes/items;
- match IDs publicos;
- tendencias agregadas por bracket/rol.

### Del usuario

- rol;
- hero pool;
- bracket aproximado;
- heroes favoritos;
- heroes que no quiere jugar;
- match IDs;
- feedback sobre si el consejo ayudo.

### Sensibles que evitamos al inicio

- password de Steam;
- cookies;
- tokens;
- datos privados no solicitados;
- lectura automatica del cliente.

## Motor de recomendacion

El motor no debe ser solo IA. Debe puntuar cada pick o plan.

Factores iniciales:

| Factor | Peso | Razon |
| --- | ---: | --- |
| Comfort del usuario | 25 | Un counter que no sabe jugar vale poco |
| Matchup de linea | 20 | Perder linea destruye muchas partidas de bajo/medio MMR |
| Sinergia de equipo | 20 | Stuns, iniciacion, saves, push, dano y teamfight |
| Counter a enemigos | 15 | Castigar la win condition enemiga |
| Valor por parche | 10 | Buffs, nerfs y builds vigentes |
| Riesgo de ejecucion | -10 | Penaliza heroes dificiles o drafts que exigen coordinacion |

Salida del motor:

```json
{
  "best_pick": "Viper",
  "confidence": "medium_high",
  "patch": "7.41d",
  "scores": {
    "comfort": 20,
    "lane_matchup": 17,
    "team_synergy": 15,
    "counter_value": 12,
    "patch_value": 6,
    "execution_risk": -3
  },
  "reasons": [
    "Gana presion temprana",
    "Ayuda a cerrar antes del late enemigo",
    "Tu equipo necesita dano sostenido"
  ]
}
```

## Pantallas iniciales

### Home/app principal

No landing de marketing. La primera pantalla debe ser usable:

- selector de modo: Draft, Patch Coach, Replay Review;
- version de parche activa;
- estado de frescura de datos;
- entrada rapida.

### Draft

- rol;
- bracket;
- hero pool;
- aliados;
- enemigos;
- analizar.

Resultado compacto:

- mejor pick;
- alternativas;
- evitar;
- compra inicial;
- runas;
- plan 0-5, 5-10, 10-20;
- condicion de victoria.

### Patch Coach

- seleccion de heroes favoritos;
- "que cambio para mi";
- recomendaciones por rol;
- builds afectadas;
- counters afectados.

### Replay Review

- match ID;
- hero/rol;
- pregunta;
- generar reporte.

## MVP realista

No construir "todo Dota" desde el dia 1. El MVP debe probar si el usuario paga
por consejo accionable.

Alcance del MVP:

- web simple;
- entrada manual de draft;
- 20-30 heroes populares;
- 5 roles;
- base de datos del parche actual;
- items iniciales y primeros items core;
- counters/sinergias basicas;
- match ID por OpenDota;
- reportes en Markdown;
- IA para explicar, no para decidir sola.

No incluir en MVP:

- login con Steam;
- app desktop;
- overlay;
- mobile nativo;
- todos los heroes al 100%;
- todas las interacciones posibles;
- pagos automatizados si todavia no hay demanda.

## Escalado por fases

### Fase 0 - Validacion manual

Duracion: 7-14 dias.

Objetivo: probar si el problema duele y si la gente entiende la promesa.

Acciones:

- conseguir 20 match IDs;
- hacer 20 simulaciones de draft;
- entregar 10 reportes gratis;
- intentar vender 10 reportes a USD 3;
- hablar con 3 coaches;
- registrar feedback.

Exito:

- 5 usuarios piden otro reporte;
- 3 pagan o aceptan precio;
- 1 coach quiere probar herramienta;
- el usuario dice que recibio una accion concreta que no habia visto.

### Fase 1 - MVP web

Duracion: 2-4 semanas.

Objetivo: que un usuario pueda usar la app sin Maikel operando todo manual.

Construir:

- frontend web usable;
- backend simple;
- base de heroes/items/parche;
- motor de scoring inicial;
- integracion OpenDota;
- generacion de reporte;
- historial local simple;
- prompt IA con fuentes y constraints.

Stack sugerido:

- backend Python/FastAPI o Node si el repo termina en JS;
- SQLite al inicio, Postgres cuando haya usuarios;
- cola simple para jobs de reportes;
- cache de respuestas OpenDota;
- export Markdown/PDF.

Exito:

- 50 usuarios prueban draft/replay;
- 10 usuarios repiten;
- tiempo de reporte menor a 2 minutos;
- menos de 10% de recomendaciones marcadas como "no tiene sentido".

### Fase 2 - Patch pipeline

Duracion: 4-6 semanas.

Objetivo: que la app sobreviva a cambios de parche.

Construir:

- watcher de fuentes oficiales;
- parser de patch notes;
- base versionada de cambios;
- panel interno de revision;
- estado de frescura;
- rollback de parche;
- tests de recomendaciones despues de cada cambio.

Exito:

- parche nuevo detectado el mismo dia;
- cambios importantes revisados antes de publicar consejos fuertes;
- cada recomendacion muestra version de parche y confianza.

### Fase 3 - Personalizacion

Duracion: 1-2 meses.

Objetivo: que la app deje de recomendar "lo mejor en general" y recomiende "lo
mejor para este jugador".

Construir:

- perfil de hero pool;
- historial de match IDs;
- errores repetidos;
- objetivos semanales;
- recomendaciones segun bracket;
- seguimiento de progreso.

Exito:

- usuarios guardan hero pool;
- usuarios vuelven cada semana;
- reportes detectan patrones repetidos;
- mejora la satisfaccion frente a consejos genericos.

### Fase 4 - Coaches y comunidades

Duracion: 1-2 meses.

Objetivo: monetizacion mas estable.

Construir:

- workspace para coach;
- alumnos;
- reportes editables;
- marca propia;
- export PDF;
- bot Discord para pedir reportes;
- ranking/retos semanales en comunidades.

Exito:

- 3 coaches activos;
- 1 comunidad usando bot;
- 10 reportes/semana por coach;
- pago mensual validado.

### Fase 5 - Escala de producto

Objetivo: convertirlo en herramienta seria.

Construir:

- Postgres;
- workers separados;
- cache robusto;
- observabilidad;
- pagos;
- cuentas;
- multi-idioma;
- recomendaciones por regiones;
- API interna;
- dataset propio de feedback.

Exito:

- retencion mensual;
- conversion free -> pago;
- bajo costo por reporte;
- contenido por parche trae usuarios nuevos.

## Escalado tecnico

### Inicio

Monolito simple:

```text
frontend -> backend -> SQLite/cache -> OpenDota -> IA
```

Ventajas:

- rapido;
- barato;
- facil de cambiar;
- suficiente para validar.

### Cuando haya usuarios

Separar:

```text
frontend
backend API
worker de reportes
worker de patch watcher
Postgres
Redis/cache
vector index opcional para patch notes/docs
```

### Datos

Tablas principales:

- patches;
- patch_changes;
- heroes;
- items;
- hero_roles;
- counters;
- synergies;
- draft_sessions;
- replay_reports;
- users;
- user_hero_pool;
- feedback;

### IA/RAG

Se puede usar vector search para recuperar notas de parche y docs, pero las
decisiones deben citar registros estructurados.

Correcto:

```text
La IA recibe 8 cambios relevantes ya filtrados y los explica.
```

Incorrecto:

```text
La IA busca en su memoria y responde sin fuente ni version.
```

## Monetizacion

### Validacion

- USD 3 por reporte.
- 3 reportes por USD 8.
- Draft review manual gratis limitado para traer usuarios.

### B2C

- Free: 3 analisis de draft/semana, 1 reporte basico.
- Pro: USD 5-9/mes, drafts ilimitados razonables, patch coach, 4 reportes/mes.
- Premium: USD 12-15/mes, mas reportes, seguimiento y export.

### B2B coaches

- Starter: USD 19/mes.
- Pro: USD 29-49/mes.
- Por reporte adicional si hay costo IA alto.

### Comunidades

- Bot Discord basico gratis.
- Comunidad Pro: USD 20-50/mes segun miembros/reportes.

## Canales de crecimiento

- Discord Dota LATAM/Espanol.
- r/learndota2 y comunidades de aprendizaje, respetando reglas.
- coaches pequenos.
- videos cortos: "que cambio para tu hero en este parche".
- reportes anonimizados compartibles.
- retos semanales por rol: "esta semana mejora tus primeros 10 minutos".

## Metricas

### Producto

- drafts analizados;
- match IDs analizados;
- usuarios que repiten;
- reportes compartidos;
- feedback positivo/negativo;
- tasa de "esto no me sirvio";
- tiempo para generar reporte.

### Negocio

- usuarios gratis;
- usuarios pagos;
- conversion;
- churn;
- ingreso por usuario;
- costo IA por reporte;
- coaches activos.

### Calidad

- porcentaje de recomendaciones con parche actualizado;
- recomendaciones marcadas como malas;
- errores de API;
- matches no parseados;
- tiempo desde parche nuevo hasta base actualizada.

## Riesgos y mitigaciones

| Riesgo | Mitigacion |
| --- | --- |
| La IA inventa datos | Forzar contexto estructurado, version de parche y fuentes |
| Parche nuevo rompe consejos | Estado de frescura, modo conservador y revision manual |
| Usuario quiere cheats/ventaja en vivo | Producto externo/manual, reglas claras |
| Datos no disponibles | Fallback: pedir link, esperar parseo o hacer reporte limitado |
| Competencia fuerte | Diferenciar en espanol, accion concreta y ciclo draft -> replay |
| Consejos genericos | Perfil, hero pool, bracket y feedback |
| Costos IA altos | Cache, plantillas, modelos pequenos para tareas simples |
| Fuente no permite uso comercial | Verificar terminos antes de depender de ella |

## Orden correcto de construccion

1. Base de datos minima: heroes, roles, items, parche.
2. Motor de scoring simple.
3. Pantalla Draft manual.
4. Integracion OpenDota por match ID.
5. Plantilla de reporte.
6. IA para explicacion con contexto fijo.
7. Patch watcher basico.
8. Feedback del usuario.
9. Historial/perfil.
10. Pagos solo despues de senales de demanda.

## Decision clave

No vamos a construir una herramienta que juegue por el usuario. Vamos a construir
un coach que explica el parche, ayuda a planear y revisa despues si el jugador
ejecuto bien.

Esa diferencia mantiene bajo el riesgo y hace que el producto pueda cobrarse de
forma honesta.
