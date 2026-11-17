#!/bin/sh
# Baut dist/new-dawn.html: das ganze Spiel in EINER Datei (config.js eingebettet).
# Diese Datei kannst du auf jedes Gerät kopieren und ohne Internet öffnen.
# Aufruf aus dem Repo-Ordner:  sh tools/build-single.sh
set -e
cd "$(dirname "$0")/.."
mkdir -p dist
awk '
  /<script src="config.js"><\/script>/ {
    print "<script>"
    while ((getline line < "config.js") > 0) print line
    print "</script>"
    next
  }
  { print }
' index.html > dist/new-dawn.html
echo "dist/new-dawn.html gebaut ($(wc -c < dist/new-dawn.html) Bytes)"
