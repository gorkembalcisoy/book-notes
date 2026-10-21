#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-dist}"
BASE="${BASE_PATH:-}"

if [ "${OUT_DIR#/}" = "$OUT_DIR" ]; then
  OUT_DIR="$(pwd)/$OUT_DIR"
fi

if [ -n "$BASE" ] && [ "${BASE#/}" = "$BASE" ]; then
  BASE="/$BASE"
fi

bash scripts/build-slides.sh
npx vite build --outDir "$OUT_DIR" --base "${BASE%/}/"

echo ""
echo "✔ Build tamamlandı: $OUT_DIR"
echo "  Yerel önizleme: npx serve $OUT_DIR"
