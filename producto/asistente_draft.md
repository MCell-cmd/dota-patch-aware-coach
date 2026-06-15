# Asistente de draft y plan de partida

## Entrada del usuario

- Rol: carry, mid, offlane, support 4, support 5.
- Bracket/MMR aproximado.
- Hero pool propio.
- Heroes aliados ya elegidos.
- Heroes enemigos ya elegidos.
- Heroes baneados si el usuario los tiene.
- Estilo preferido: seguro, agresivo, comfort, counter, late game.

## Salida esperada

```md
## Recomendacion

- Mejor pick:
- Confianza:
- Por que:
- Riesgo:
- Alternativas:
- Evitar:

## Plan de linea

- Compra inicial:
- Primera wave:
- Runas:
- Pull/stack/creep aggro:
- Timing de primer item:

## Plan de partida

- Min 0-5:
- Min 5-10:
- Min 10-20:
- Primer objetivo:
- Condicion de victoria:
- Que no hacer:

## Cambios del parche que importan

- Hero propio:
- Enemigos:
- Items:
- Mapa/objetivos:
```

## Scoring inicial

| Factor | Peso | Descripcion |
| --- | ---: | --- |
| Comfort del usuario | 25 | Mejor un heroe que sabe jugar que un counter perfecto que no domina |
| Matchup de linea | 20 | Probabilidad de no perder la fase inicial |
| Sinergia de equipo | 20 | Stuns, iniciacion, dano, push, saves, teamfight |
| Counter a enemigos | 15 | Castiga win condition enemiga |
| Valor por parche | 10 | Buffs/nerfs y builds vigentes |
| Riesgo de ejecucion | -10 | Penaliza heroes dificiles o drafts que exigen coordinacion |

## Ejemplo de respuesta

```text
Parche: 7.41d
Rol: mid
Aliados: Axe, Crystal Maiden, Sniper
Enemigos: Phantom Assassin, Lion, Tidehunter
Hero pool: Viper, Lina, Zeus, Invoker

Mejor pick: Viper
Confianza: media-alta

Por que:
- Tu equipo ya tiene daño fisico con Sniper, pero necesita ganar temprano.
- Viper puede presionar mid y rotar con Axe antes del timing fuerte de PA.
- Contra Tide/Lion, Viper no debe jugar solo: necesita vision y posicionamiento.

Evitar:
- Zeus: aporta daño, pero no soluciona control ni presion de torre.
- Invoker: puede servir, pero exige ejecucion alta y el draft necesita impacto
  mas simple.

Compra inicial:
- tango, 2 branches, circlet/slippers segun build, faerie fire si esperas trade.

Plan:
- Min 0-2: asegurar equilibrio de linea y negar rango si puedes.
- Min 2/4: controlar water rune.
- Min 6: si tienes rune fuerte, rotar con Axe; si no, presionar torre mid.
- Min 10-15: jugar alrededor de catapultas y smoke con CM.
```

## Limites

- No debe leer automaticamente el draft desde el cliente.
- No debe hacer picks ni compras por el usuario.
- No debe recomendar heroes fuera del pool si el usuario busca subir MMR rapido.
- No debe dar consejo sin version de parche.
