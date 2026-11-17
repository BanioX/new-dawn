# Änderungen

Alle nennenswerten Änderungen an New Dawn, die neueste zuerst.

## 0.3.0 – 2026-11-17

### Neu
- Dokumentation: `docs/ARCHITEKTUR.md` erklärt Licht, Generator, Löser, Speichern und Testen,
  `docs/LEVELS.md` zeigt alle 30 Level, dazu diese Änderungsliste.
- Der Spiel-Brief (`design/game-brief.md`) beschreibt jetzt das gebaute Spiel.

### Behoben
- Ein angehängtes 31. Level (oder mehr) führte zu einem Absturz, weil es kein viertes Kapitel gibt.
  Weitere Level gehören jetzt zum letzten Kapitel.

## 0.2.1 – 2026-11-17

### Behoben
- Das Spielfeld richtet sich nach dem Seitenbereich statt nach dem Fenster und rechnet Fingertipps
  über die Lage der Leinwand um. So passt es auch in Seiten mit Sicherheitsrändern fürs Handy.
- Das dunkle Farbschema ist für Browser-Bedienelemente erklärt.

## 0.2.0 – 2026-11-17

Vier unabhängige Prüfer (Logik, Rätselqualität, Layout auf acht Bildschirmgrößen, Spielgefühl)
haben das Spiel getestet; je ein Skeptiker hat jeden Befund nachgeprüft. 33 bestätigte Punkte
sind eingebaut.

### Rätsel
- Ein exakter Löser beweist für jedes Brett, dass **Par die kleinste mögliche Spiegelzahl** ist.
  Vorher ließen sich 14 von 30 Leveln mit weniger Spiegeln lösen.
- Goldene Spiegel nehmen einem Lichtweg nie seinen letzten Spieler-Spiegel weg; kein Strahl ist
  schon zu Beginn am Ziel.
- Goldene Köder liegen in einem Strahl und lenken ihn sichtbar ab.
- Level 5, 7 und 8 verlangen sich kreuzende Strahlen; in Level 21 zählt das Farbglas wirklich.
- Level 1 muss einmal gedreht werden, so lernt man den Dreh in der ersten Minute.
- Schwierigkeitskurve neu abgestimmt: Kapitel 3 ist im Schnitt wieder schwerer als Kapitel 2, und
  das Finale braucht 7 Spiegel, so viele wie die schwersten Level davor.
- Tagesrätsel: montags leicht, sonntags schwer, nie schwerer als der eigene Fortschritt.
- Endlos überspringt die Lehrlevel.
- Der Generator lockert seine Regeln stufenweise, statt gleich auf ein Anfängerbrett zu fallen.

### Spielgefühl und Aussehen
- Jede Grundfarbe hat zusätzlich eine Form (Rot Dreieck, Grün Quadrat, Blau Raute) für Farbenblinde.
- Größere Marker unter jedem Kristall; eine falsche Farbe erscheint durchgestrichen.
- Der Hinweis zeigt ein pulsierendes Feld mit Wellen; ist der Vorrat leer, markiert er auch einen
  Spiegel, der wegmuss.
- Beim Sieg wird das Brett heller und die Sonne scheint durch; beim Finale geht sie sichtbar auf.
- Eigene Klänge, wenn eine Teilfarbe ankommt oder eine falsche Farbe trifft.
- Menüknöpfe bleiben über der aufgehenden Sonne lesbar.
- Handy quer: Brett in voller Höhe, alle Knöpfe sichtbar, Tipp rechts daneben.
- Platz für den Tipp nur, wenn es einen gibt; lange Namen überdecken die Spiegelanzeige nicht mehr.
- Auf Touch-Geräten keine Tastatur-Hinweise mehr im Titel.

### Behoben
- Ein beschädigter Spielstand blockierte das Spiel; jetzt werden nur gültige Einträge übernommen.
- Hinweise kosteten Sterne für nichts (freier Hinweis in Level 1, leerer Vorrat).
- Nach einer Mausbewegung war der Tastaturfokus unsichtbar.
- Ein um Mitternacht gelöstes Tagesrätsel zählte für den nächsten Tag.
- Zwei Fingertipps im selben Moment konnten ein Level überspringen.
- Mehr als neun Spiegel im Vorrat wurden nicht alle angezeigt.
- Ein Fehler in einem Spielschritt konnte die Bildrate dauerhaft senken.
- Vibrieren vor dem ersten Antippen erzeugte eine Browser-Warnung.

## 0.1.0 – 2026-11-16

Erste Fassung nach dem `/prototype`-Ablauf von Claude Code Game Studios.

- Lichtsimulation mit Spiegeln, Mauern, festen Spiegeln, Farbglas und Kristallen.
- Farbmischung Rot, Grün, Blau zu Gelb, Magenta, Cyan und Weiß.
- 30 erzeugte Level in drei Kapiteln (Mitternacht, Blaue Stunde, Morgenrot).
- Spiegelvorrat, Par, Sterne, Hinweise, Rückgängig, Neustart.
- Tagesrätsel und Endlos-Modus.
- Himmel, Sterne, Hügel und Sonne; alle Figuren im Code gezeichnet.
- Klänge mit Web Audio; Spielstand im Browser.
- `tools/build-single.sh` baut die Einzeldatei `dist/new-dawn.html`.
