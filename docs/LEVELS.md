# Die 30 Level

Alle Level entstehen aus einer Zeile der Tabelle `LEVELS` in `index.html` und dem `seed` aus
`config.js` (Standard `1`). Der Generator baut jedes Brett und beweist mit einem Löser, dass es
lösbar ist und dass **Par die kleinste mögliche Zahl an Spiegeln** ist.

Die Übersicht gilt für `seed: 1`. Sie wurde aus dem Spiel selbst erzeugt.

| Level | Kapitel | Brett | Kristalle | Linsen | Par | Mauern | Gold (Lösung) | Gold (Köder) | Glas | Neu in diesem Level |
|---:|---:|---|---|---:|---:|---:|---:|---:|---:|---|
| 1 | 1 | 5×5 | Rot | 1 | 1 | 0 | 0 | 0 | 0 | Spiegel setzen und drehen; erster Spiegel muss gedreht werden |
| 2 | 1 | 5×5 | Rot | 1 | 2 | 1 | 0 | 0 | 0 | zwei Knicke, Spiegel entfernen |
| 3 | 1 | 6×6 | Rot | 1 | 3 | 2 | 0 | 0 | 0 | Par und Sterne |
| 4 | 1 | 6×6 | Rot, Blau | 2 | 2 | 2 | 0 | 0 | 0 | jede Farbe ihr Kristall |
| 5 | 1 | 6×6 | Grün, Blau | 2 | 3 | 2 | 0 | 0 | 0 | beidseitige Spiegel, Strahlen kreuzen; Kreuzung Pflicht |
| 6 | 1 | 6×7 | Rot, Grün | 2 | 3 | 3 | 1 | 0 | 0 | feste goldene Spiegel |
| 7 | 1 | 7×7 | Rot, Grün, Blau | 3 | 5 | 3 | 0 | 0 | 0 | Kreuzung Pflicht |
| 8 | 1 | 7×7 | Blau, Rot | 2 | 5 | 4 | 0 | 1 | 0 | Kreuzung Pflicht |
| 9 | 1 | 7×7 | Rot, Grün, Blau | 3 | 5 | 4 | 0 | 1 | 0 | – |
| 10 | 1 | 7×8 | Rot, Grün, Blau | 3 | 5 | 5 | 1 | 1 | 0 | – |
| 11 | 2 | 6×6 | Gelb | 2 | 2 | 1 | 0 | 0 | 0 | Mischen: Gelb |
| 12 | 2 | 6×6 | Magenta | 2 | 3 | 2 | 0 | 0 | 0 | Mischen: Magenta |
| 13 | 2 | 7×7 | Cyan, Rot | 3 | 3 | 3 | 0 | 0 | 0 | Mischen: Cyan |
| 14 | 2 | 7×7 | Gelb, Blau | 3 | 4 | 3 | 0 | 0 | 0 | falsche Farbe |
| 15 | 2 | 7×7 | Magenta, Grün | 3 | 5 | 4 | 1 | 0 | 0 | – |
| 16 | 2 | 7×8 | Gelb, Cyan | 4 | 6 | 4 | 0 | 1 | 0 | – |
| 17 | 2 | 7×8 | Magenta, Gelb | 4 | 7 | 5 | 1 | 0 | 0 | – |
| 18 | 2 | 8×8 | Cyan, Magenta | 4 | 6 | 5 | 2 | 1 | 0 | – |
| 19 | 2 | 8×8 | Gelb, Cyan, Blau | 5 | 7 | 6 | 1 | 1 | 0 | – |
| 20 | 2 | 8×8 | Gelb, Magenta, Cyan | 6 | 6 | 6 | 1 | 2 | 0 | – |
| 21 | 3 | 7×7 | Rot, Blau | 2 | 4 | 3 | 0 | 0 | 2 | Farbglas; Glas nötig |
| 22 | 3 | 7×7 | Weiß | 3 | 3 | 3 | 0 | 0 | 0 | Weiß aus drei Farben |
| 23 | 3 | 7×8 | Weiß | 3 | 5 | 4 | 0 | 0 | 1 | – |
| 24 | 3 | 8×8 | Gelb, Grün | 3 | 5 | 5 | 0 | 1 | 2 | – |
| 25 | 3 | 8×8 | Weiß, Rot | 4 | 5 | 5 | 1 | 1 | 0 | – |
| 26 | 3 | 8×8 | Magenta, Cyan | 4 | 6 | 6 | 2 | 0 | 2 | – |
| 27 | 3 | 8×9 | Weiß, Blau | 4 | 6 | 6 | 1 | 2 | 1 | – |
| 28 | 3 | 8×9 | Gelb, Magenta, Cyan | 6 | 6 | 7 | 1 | 2 | 2 | – |
| 29 | 3 | 9×9 | Weiß, Gelb | 5 | 6 | 7 | 2 | 2 | 2 | – |
| 30 | 3 | 9×9 | Weiß, Magenta, Grün | 6 | 7 | 8 | 3 | 3 | 3 | Finale |

Kapitel: 1 Mitternacht, 2 Blaue Stunde, 3 Morgenrot.
„Gold (Lösung)“ sind feste Spiegel, die zur Lösung gehören; „Gold (Köder)“ liegen in einem Strahl,
gehören aber nicht zur Lösung.

## Eine Level-Zeile

```js
{ w: 7, h: 7, crys: [YEL, BLU], turns: [1, 2], walls: 3, minPar: 4, tip: 'wrong' }
```

| Feld | Bedeutung |
|---|---|
| `w`, `h` | Breite und Höhe des Bretts |
| `crys` | Kristalle nach Farbe: `RED`, `GRN`, `BLU`, `YEL`, `MAG`, `CYA`, `WHT` |
| `turns` | Knicke (Spiegel) pro Lichtweg, als `[min, max]` |
| `walls` | Anzahl Mauern |
| `fixed` | bis zu so viele Lösungsspiegel werden golden und fest |
| `decoy` | goldene Köderspiegel, die zu Beginn in einem Strahl liegen |
| `filters` | Farbglas-Felder |
| `minPar` | so viele Spiegel braucht die Lösung mindestens |
| `cross` | so oft müssen sich die Lösungsstrahlen mindestens kreuzen |
| `needFilter` | ohne das Glas gäbe es eine kürzere Lösung, das Glas zählt also |
| `firstTurn` | der erste Lösungsspiegel steht so (`2` = `\`), damit er gedreht werden muss |
| `tip` | Schlüssel des Tipps aus `TIPS`, der über dem Brett steht |

Jede Linse hat genau eine Grundfarbe. Ein Gelb-Kristall braucht also zwei Linsen (Rot und Grün),
ein Weiß-Kristall drei.

## Ein Level hinzufügen oder ändern

1. In `index.html` die Tabelle `LEVELS` suchen.
2. Eine Zeile ändern oder anhängen.
3. Die Seite neu laden. Mit `index.html?level=31&fresh=1` startest du ein neues 31. Level direkt.

Die Level-Auswahl zeigt drei Kapitel à zehn Level. Ein 31. Level und weitere gehören zum letzten
Kapitel; du erreichst sie über „Weiter“ nach Level 30 oder direkt mit `?level=`.
Das jeweils letzte Level der Tabelle ist das Finale mit dem Sonnenaufgang.

Wird ein Brett zu schwer für den Generator (zu klein für so viele Kristalle, Knicke und Regeln),
lockert er die Regeln stufenweise. Ob das passiert ist, zeigt `game.state.lv.relaxed` in der
Browser-Konsole: `undefined` heißt alles wie verlangt.
