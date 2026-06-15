# Arquitectura IA patch-aware

## Tesis

Si usamos IA, la app no debe "saber Dota" solo por el modelo. Dota cambia por
parches, meta, items, mapa y comportamiento de jugadores. La arquitectura
correcta es:

```text
fuentes actuales -> datos estructurados -> motor de reglas -> IA explicativa -> consejo verificable
```

La IA debe explicar y adaptar. La fuente de verdad debe ser una base versionada
del parche y datos comprobables.

## Modulos

### 1. Patch watcher

Responsable de detectar cambios nuevos.

Fuentes iniciales:

- Dota 2 News/Updates oficial.
- Steam news de Dota 2.
- OpenDota constants para heroes/items cuando aplique.
- STRATZ/OpenDota para estadisticas y tendencias.
- Dota2ProTracker o fuentes similares para builds de alto nivel, verificando
  terminos antes de uso comercial.

Salida esperada:

```json
{
  "patch": "7.41d",
  "date": "2026-06-04",
  "changes": [
    {
      "type": "hero",
      "target": "Earthshaker",
      "field": "ability/item/talent/facet",
      "summary": "Cambio resumido",
      "impact": "buff|nerf|neutral|unknown",
      "confidence": "high|medium|low",
      "source_url": "https://www.dota2.com/news/updates"
    }
  ]
}
```

### 2. Knowledge base de Dota

Debe guardar datos versionados, no texto suelto:

- heroes;
- roles viables;
- habilidades;
- items;
- talentos;
- facets/innates si aplican en el parche;
- tipos de dano;
- disables;
- counters;
- sinergias;
- timings;
- runas;
- objetivos: torres, Roshan, Tormentor, Wisdom, Lotus, Bounty/Power runes;
- reglas de mapa vigentes.

Cada dato debe tener:

- version de parche;
- fuente;
- fecha de actualizacion;
- confianza;
- si es hecho, inferencia o estadistica.

### 3. Motor de reglas

No todo debe hacerlo la IA. Las recomendaciones importantes deben salir de
scoring reproducible:

- falta iniciacion;
- falta stun;
- exceso de daño fisico/magico;
- mala defensa de torres;
- mala forma de matar Roshan;
- linea favorable/desfavorable;
- power spike propio vs enemigo;
- si el draft necesita cerrar temprano o escalar;
- si el usuario tiene comfort pick suficiente;
- si el heroe recomendado fue nerfeado/buffeado en el parche actual.

Ejemplo de score:

```text
score_pick = comfort + lane_matchup + team_synergy + counter_value + patch_value - execution_risk
```

### 4. Capa IA

La IA recibe:

- version de parche;
- resumen estructurado de cambios relevantes;
- draft actual;
- hero pool del usuario;
- rol;
- bracket;
- resultado del motor de reglas;
- datos de partidas anteriores si existen.

La IA devuelve:

- recomendacion principal;
- 2 alternativas;
- heroes a evitar;
- compras iniciales;
- plan minuto 0-5;
- plan minuto 5-10;
- plan minuto 10-20;
- runas/objetivos prioritarios;
- condicion de victoria;
- nivel de confianza;
- razones concretas.

Regla obligatoria: si no hay datos frescos del parche, la IA debe decirlo.

### 5. Analisis post-partida

Despues del juego:

1. Usuario pega match ID.
2. Se consulta OpenDota/STRATZ/Valve si hay datos publicos.
3. La app compara:
   - plan recomendado vs lo ocurrido;
   - item timings;
   - farm/XP;
   - muertes;
   - participacion;
   - objetivos;
   - impacto por rol.
4. La IA redacta el reporte en espanol.

## Asistente de draft seguro

Para evitar riesgo con Valve:

- entrada manual de heroes;
- web/app externa;
- sin overlay dentro del cliente;
- sin leer memoria/procesos;
- sin automatizar picks, compras ni acciones;
- sin prometer ventaja garantizada.

## Pantallas del MVP

### Draft

- Selector de rol.
- Hero pool del usuario.
- Aliados elegidos.
- Enemigos elegidos.
- Bracket/MMR aproximado.
- Boton "Analizar draft".

Salida:

- mejor pick de tu pool;
- 2 picks alternativos;
- heroes a evitar;
- por que;
- compras iniciales;
- runas/objetivos clave;
- plan por tiempos.

### Patch Coach

- "Que cambio en este parche para mis heroes?"
- Lista de heroes favoritos.
- Impacto: buff/nerf/cambio de build/cambio de counter.
- Recomendacion practica.

### Replay Review

- Match ID.
- Rol.
- Pregunta del jugador.
- Reporte accionable.

## MVP realista

No empezar con "todo Dota". Empezar con:

- 20 heroes populares por bracket;
- 5 roles;
- items iniciales y primeros items core;
- runas y objetivos principales;
- counters/sinergias simples;
- reportes post-partida por OpenDota.

Despues ampliar por uso real.

## Riesgos

- Parches cambian mas rapido que nuestra base.
- Las estadisticas por bracket pueden inducir errores si se usan sin contexto.
- Un consejo correcto para Divine puede ser malo para Herald.
- La IA puede sonar convincente aunque falten datos.
- Scraping comercial de ciertas fuentes puede no estar permitido.

## Reglas de calidad

- Mostrar version de parche en cada recomendacion.
- Citar fuente o fecha de datos.
- Dar nivel de confianza.
- Explicar tradeoff, no solo decir "elige X".
- Si el usuario no sabe jugar un heroe, penalizarlo aunque sea buen counter.
- Preferir consejo ejecutable a teoria larga.
