#!/bin/sh
# Renders card.html into the social share images. Needs Google Chrome.
set -e
cd "$(dirname "$0")"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
mkdir -p ../../assets/og
for v in en pt docs docs-pt; do
  "$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --virtual-time-budget=8000 --allow-file-access-from-files \
    --screenshot="$PWD/../../assets/og/$v.png" "file://$PWD/card.html#$v" 2>/dev/null
done
ls -l ../../assets/og
