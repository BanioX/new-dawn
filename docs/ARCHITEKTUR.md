# Wie New Dawn funktioniert

Diese Seite erklärt den Code für alle, die das Spiel verändern oder erweitern wollen.
Es gibt keine Bibliotheken, keinen Build-Schritt und keinen Server: zwei Dateien reichen.

| Datei | Inhalt |
|---|---|
| `index.html` | das ganze Spiel: Regeln, Generator, Löser, Grafik, Klang, Menüs |
| `config.js` | alle Stellschrauben (`window.CONFIG`), jeweils mit Wert, Minimum, Maximum, Schritt |
| `dist/new-dawn.html` | beides in einer Datei, gebaut von `tools/build-single.sh` |
| `design/game-brief.md` | der Spiel-Brief: Idee, erste Minute, Herausforderung, Features |
| `docs/LEVELS.md` | alle 30 Level im Überblick |

## Aufbau von `index.html`

Das Skript ist in Abschnitte geteilt, jeder beginnt mit einer Zeile `// ---- …`.
Suche nach `// ----`, um von Abschnitt zu Abschnitt zu springen.

| Abschnitt | Was drin steht |
|---|---|
| Built to be checked | Grundgerüst: `tune` (liest `config.js`), fester Zeitschritt, Zufall `rng()` und `makeRng()` |
| Screen | `fit()`: Leinwandgröße, Textausgabe `text()`, Zeilenumbruch `wrap()` |
| Input | Tastatur und Zeiger; Antippen wird gesammelt und im nächsten Schritt verarbeitet |
| Audio | Web-Audio-Synthesizer `note()` und alle Klänge in `SFX` |
| Save | Spielstand im Browser, `cleanSave()`, `persist()` |
| The game: light and colour | Farben, Richtungen, Spiegeltabelle, Kapitel, Tipps, die Level-Tabelle `LEVELS` |
| The light | `simulate()`: verfolgt jeden Strahl |
| The solver | `solvable()`: beweist, dass es keine kürzere Lösung gibt |
| The generator | `tryGen()`, `flipX()`, `generate()`: baut lösbare Bretter |
| Scenes and state | `startPuzzle()`, Spielzüge, Hinweise, Sieg, Speichern des Ergebnisses |
| Particles | Funken und Ringe |
| Drawing | Himmel, Sonne, Brett, Strahlen, alle Spielfiguren |
| Icons and buttons | gezeichnete Symbole und Knöpfe |
| The scenes | Bildschirme: `title`, `levels`, `play`, `results`, `figures` |
| Loop | Spielschleife mit festem Zeitschritt |
| What a check can read | Test-Schnittstelle `window.game` |

## Das Brett im Speicher

Ein Level ist ein Objekt `lv = { w, h, tile, sol, par, spec }`:

- `tile` ist ein Array mit `w × h` Feldern (Index `i = y * w + x`). Ein Feld ist `null` (leer) oder:
  - `{ t: 'emit', c, d }`: Linse mit Farbe `c` und Richtung `d`
  - `{ t: 'crys', need }`: Kristall, der genau die Farbe `need` braucht
  - `{ t: 'wall' }`: Mauer
  - `{ t: 'fixed', m }`: goldener Spiegel (`decoy: true`, wenn er nicht zur Lösung gehört)
  - `{ t: 'filter', c }`: Farbglas, lässt nur die Farbe `c` durch
- `sol` ist die Lösung des Generators als Liste `{ i, m }`, `par` ihre Länge.
- Die Spiegel des Spielers stehen getrennt in `state.placed` (`Int8Array`): `0` leer, `1` = `/`, `2` = `\`.

**Farben sind Bitmasken:** Rot `1`, Grün `2`, Blau `4`. Gemischt wird mit ODER:
Gelb `3` = Rot + Grün, Magenta `5` = Rot + Blau, Cyan `6` = Grün + Blau, Weiß `7` = alle drei.

**Richtungen:** `0` rechts, `1` unten, `2` links, `3` oben (`DIRS`).
Die Tabelle `REF[spiegel][richtung]` gibt die neue Richtung nach einem Spiegel an.

## Das Licht: `simulate(lv, placed)`

Für jede Linse läuft der Strahl Feld für Feld:

1. Ein Spiegel (eigener oder goldener) lenkt ihn um 90° um. Spiegel sind beidseitig.
2. Ein Kristall nimmt ihn auf und sammelt seine Farbe (`recv |= farbe`).
3. Farbglas der eigenen Farbe lässt ihn durch.
4. Mauer, Linse oder fremdes Glas stoppen ihn; am Brettrand endet er.

Jeder Kristall hat danach einen Zustand: `off` (nichts), `part` (ein Teil der Farben),
`lit` (genau seine Farbe) oder `wrong` (eine Farbe, die er nicht will).
Gelöst ist das Brett, wenn alle Kristalle `lit` sind. Die Funktion liefert außerdem die
Strahlenpunkte für die Grafik.

## Der Generator: `tryGen()` und `generate()`

Ein Brett wird **rückwärts vom Kristall aus** gebaut:

1. Ein Kristall kommt auf ein freies Feld.
2. Für jede Grundfarbe, die er braucht, läuft ein Weg in eine andere Richtung los:
   gerade Stücke von höchstens `maxSegment` Feldern, an jedem Knick ein Lösungsspiegel,
   am Ende eine Linse, die zurück zum Kristall zeigt.
3. Regeln dabei: Kein anderer Strahl kreuzt ein Spiegelfeld. Strahlen dürfen sich
   rechtwinklig kreuzen, aber nie auf derselben Linie überlappen.
4. Bis zu `fixed` Lösungsspiegel werden golden und fest. Dabei bleibt jedem Weg mindestens ein
   Spiegel für den Spieler.
5. Mauern kommen auf freie Felder, goldene Köder auf freie Felder, durch die schon zu Beginn ein
   Strahl läuft. Farbglas kommt auf Felder, durch die genau ein Lösungsstrahl läuft, in dessen Farbe.

Ein Brett wird nur angenommen, wenn alle Prüfungen bestehen:

- Die Lösung bringt alle Kristalle zum Leuchten.
- Vor dem ersten Zug bekommt kein Kristall eine seiner Farben.
- Bei `cross: n` kreuzen sich die Lösungsstrahlen mindestens `n`-mal.
- **Es gibt keine Lösung mit weniger Spiegeln als Par** (`solvable(lv, par - 1)` ist `false`).
- Bei `needFilter` gäbe es ohne das Farbglas eine kürzere Lösung, das Glas zählt also wirklich.

`generate(spec, seed)` probiert bis zu `genAttempts` Bretter. Klappt keins, lockert es die Regeln
stufenweise: zuerst ohne `cross` und `needFilter` und mit einem Spiegel weniger, dann ein einfaches
Brett. `lv.relaxed` sagt, welche Stufe nötig war; bei allen 30 Leveln ist es keine.
Hat ein Level `firstTurn`, wird das Brett bei Bedarf gespiegelt (`flipX`), damit der erste Spiegel
erst gedreht werden muss.

**Startwerte für den Zufall:**

| Modus | Startwert |
|---|---|
| Kampagne, Level `i` (ab 0) | `CONFIG.seed * 100003 + i * 7919 + 11` |
| Tagesrätsel | das Datum als Zahl, z. B. `20261117` |
| Endlos, Rätsel `n` (ab 0) | `50000 + n * 7717 + CONFIG.seed` |

Ein anderer `seed` in `config.js` ergibt also 30 neue Level.

## Der Löser: `solvable(lv, budget)`

Der Löser prüft, ob **höchstens `budget` Spiegel** alle Kristalle zum Leuchten bringen.
Er verfolgt die Linsen nacheinander. Jedes leere Feld, das ein Strahl erreicht, wird genau einmal
entschieden: frei lassen, `/` oder `\`. Spiegel kosten je eins.

Das bleibt schnell, weil der Generator für jede benötigte Grundfarbe genau eine Linse baut.
Darum muss jede Linse in einem Kristall enden, der ihre Farbe braucht. Jeder andere Weg
(Mauer, Rand, falscher Kristall) wird sofort verworfen.

Vollständig ist die Suche, weil in einer kürzesten Lösung jeder Spiegel von einem Strahl getroffen
wird. Spiegel abseits aller Strahlen braucht man nie. Nach `200000` Schritten gibt der Löser auf
(`null`); der Generator verwirft so ein Brett.

## Spielablauf

- `startPuzzle(modus, nummer)` erzeugt das Brett und den Zustand `state`.
  Die Modi heißen `campaign`, `daily` und `endless`.
- Ein Tipp auf ein Feld ruft `cycleCell()` auf: leer → `/` → `\` → leer.
  Danach berechnet `afterMove()` das Licht neu, spielt Klänge, zeigt Funken und erkennt den Sieg.
- **Spiegelvorrat:** `par + spareMirrors`.
- **Sterne:** 3, minus `overParStarCost` bei mehr Spiegeln als Par, minus `hintStarCost` je Hinweis, mindestens 1.
- **Hinweise** (`useHint`): zeigen den nächsten Lösungsspiegel. Ist der Vorrat leer, markieren sie
  zusätzlich einen Spiegel, der wegmuss. Ein noch sichtbarer Hinweis kostet nichts.
- **Tagesrätsel:** Montag bis Sonntag nutzen die Regeln der Level 7, 9, 15, 17, 19, 24 und 28
  (`DAILY_WEEK`), aber nie schwerere als die des zuletzt gelösten Levels
  (mindestens die Regeln von Level 4).
- **Endlos:** Rätsel `n` nutzt die Regeln von Level `endlessStart + n * endlessRamp` (ab 0 gezählt,
  höchstens das letzte Level) und überspringt dabei die Lehrlevel mit Tipp.

Bildschirme (`scenes`): `title`, `levels`, `play`, `results` und `figures` (alle Spielfiguren mit Namen).

## Darstellung

- Alles wird mit Canvas 2D gezeichnet, ohne Bilder und ohne Emoji.
- `fit()` legt die logische Größe so fest, dass die kürzere Bildschirmseite 440 bis 760 Einheiten
  hat. So bleiben Texte auf Handy und Monitor lesbar.
- `playLayout()` kennt drei Anordnungen: Hochformat (Knöpfe unten), Querformat (Knöpfe links) und
  flaches Querformat fürs Handy (Brett in voller Höhe, Tipp rechts).
- Reihenfolge: Himmel (Verlauf, Sterne, Sonne, Hügel) → Brett → Strahlen (mehrere additive
  Schichten plus wandernde Funken) → Figuren → Funken → Anzeige und Knöpfe.
- Spielfiguren: `drawEmitter`, `drawCrystal`, `drawMirror`, `drawWall`, `drawFilter`, `hintPlate`.
  Jede Grundfarbe hat eine Form (`glyphPath`): Rot Dreieck, Grün Quadrat, Blau Raute.

## Klang

Alle Klänge entstehen zur Laufzeit mit Web Audio, es gibt keine Audiodateien.
Ton startet erst nach der ersten Eingabe (Browser-Regel). `M` oder der Ton-Knopf schalten stumm.

## Speichern

Der Spielstand liegt im Browser unter dem Schlüssel `newdawn.save.v1`:

```json
{ "stars": { "0": 3, "1": 2 }, "daily": { "2026-11-17": 3 }, "endless": 4, "muted": false }
```

`stars` zählt Level ab 0. `cleanSave()` übernimmt nur gültige Einträge, ein beschädigter Spielstand
kann das Spiel also nicht blockieren. Mit `?fresh=1` startet das Spiel leer und speichert nichts.

## Testen

Adress-Parameter:

| Parameter | Wirkung |
|---|---|
| `?level=12` | startet direkt Level 12 |
| `?fresh=1` | ohne gespeicherten Fortschritt, schreibt nichts |
| `?scene=figures` | zeigt alle Spielfiguren mit Namen |
| `?seed=5` | ändert nur den Zufall der Effekte, nicht die Level |
| `?render=cheap` | zeichnet mit Pixeldichte 1 (für automatische Screenshots) |
| `?manual=1` | hält die Spielschleife an (für Tests mit `game.step`) |

Im Browser steht `window.game` bereit: `scene`, `state`, `press(code)`, `tap(x, y)`, `step(n)`,
`solve()` (setzt die Lösung des Generators), `simulate`, `generate`, `solvable` und `LEVELS`.

Beispiel mit Playwright (Node):

```js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(), p = await b.newPage();
  await p.goto('file://' + process.cwd() + '/index.html?fresh=1&level=5');
  await p.evaluate(() => game.solve());
  await p.waitForTimeout(2000);
  console.log(await p.evaluate(() => ({ scene: game.scene, stars: game.state.stars })));
  await b.close();
})();
```

## Stellschrauben in `config.js`

| Wert | Standard | Bedeutung |
|---|---|---|
| `seed` | 1 | formt alle 30 Level und die Endlos-Rätsel |
| `volume` | 0.5 | Lautstärke |
| `spareMirrors` | 1 | Spiegel im Vorrat über Par hinaus |
| `hintStarCost` | 1 | Sterne Abzug je Hinweis |
| `maxHints` | 3 | Hinweise pro Rätsel |
| `overParStarCost` | 1 | Sterne Abzug bei mehr Spiegeln als Par |
| `genAttempts` | 900 | Versuche pro Brett, bevor Regeln gelockert werden |
| `maxSegment` | 4 | längstes gerades Stück eines Lichtwegs, in Feldern |
| `endlessStart` | 6 | Kampagnen-Level (ab 0), mit dem Endlos beginnt |
| `endlessRamp` | 2 | Level Schwierigkeit mehr pro gelöstem Endlos-Rätsel |
| `beamGlow` | 1 | Helligkeit des Leuchtens um die Strahlen |
| `flowSpeed` | 2.2 | Tempo der Lichtfunken, Felder pro Sekunde |
| `flowSpacing` | 0.9 | Abstand der Lichtfunken, in Feldern |
| `sparkBurst` | 26 | Funken, wenn ein Kristall aufleuchtet |
| `winDelay` | 1.2 | Sekunden vom letzten Kristall bis zum Ergebnis |
| `skyBlend` | 1.2 | wie schnell der Himmel zwischen Kapiteln die Farbe wechselt |

Nach jeder Änderung an `index.html` oder `config.js` die Einzeldatei neu bauen:

```bash
sh tools/build-single.sh
```
