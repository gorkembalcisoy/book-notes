#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE_PATH:-}"
if [ -n "$BASE" ] && [ "${BASE#/}" = "$BASE" ]; then
  BASE="/$BASE"
fi

for f in slides/*.md; do
  name="$(basename "$f" .md)"
  npx slidev build "$f" --out "$(pwd)/public/decks/$name" --base "${BASE%/}/decks/$name/"
done
