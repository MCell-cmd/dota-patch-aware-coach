#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Uso: $0 <match_id>" >&2
  exit 2
fi

match_id="$1"

curl -sS --fail --max-time 25 "https://api.opendota.com/api/matches/${match_id}" \
  | jq '{
      match_id,
      duration,
      game_mode,
      radiant_win,
      start_time,
      parsed: has("version"),
      players: [
        .players[] | {
          account_id,
          hero_id,
          player_slot,
          lane_role,
          is_roaming,
          kills,
          deaths,
          assists,
          gold_per_min,
          xp_per_min,
          last_hits,
          denies,
          hero_damage,
          tower_damage,
          hero_healing,
          net_worth,
          item_0,
          item_1,
          item_2,
          item_3,
          item_4,
          item_5
        }
      ]
    }'
