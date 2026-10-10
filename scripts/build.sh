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

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp index.html "$OUT_DIR/"

for f in slides/*.md; do
  name="$(basename "$f" .md)"
  echo "▸ Building $name..."
  npx slidev build "$f" --out "$OUT_DIR/$name" --base "$BASE/$name/"
done

echo ""
echo "✔ Build tamamlandı: $OUT_DIR"
echo "  Yerel önizleme: npx serve $OUT_DIR"
