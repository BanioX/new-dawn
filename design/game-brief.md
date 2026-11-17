# Game Brief: New Dawn

## In your words
Erstelle mir ein smartes spiel das offline spielbar ist einfach codebar ist super spass macht und schön anzusehen ist.

(Repo: new-dawn)

After play: Kann ich es auch in Englisch haben bitte

**Pitch:** Lenke farbige Lichtstrahlen mit Spiegeln durch eine nächtliche Kristallhöhle, mische Rot, Grün und Blau zu neuen Farben und bring jeden Kristall zum Leuchten – mit jedem Kapitel wird es Morgen. *(guessed)*

**Genre:** grid puzzle (Licht lenken, Farben mischen) *(guessed)*

**Controls:** Tippen/Klicken auf ein Feld: Spiegel setzen → drehen → entfernen; Rechtsklick entfernt. Tastatur: Pfeiltasten + Leertaste, Entf/Rücktaste/X entfernt, Z rückgängig, R neu starten, H Hinweis, M Ton, L Sprache, Esc Menü. *(guessed)*

**Question:** Macht es Spaß, Lichtstrahlen mit wenigen Spiegeln zu Farbkristallen zu lenken, wenn Farbmischung und sich kreuzende Strahlen echte Aha-Momente erzeugen? *(guessed)*

**Hooks:** Gelb braucht Rot + Grün aus zwei Richtungen, Weiß alle drei; jeder Spiegel ist beidseitig und lenkt auch fremde Strahlen ab. Der Himmel wird mit jedem Kapitel heller (Mitternacht → Blaue Stunde → Morgenrot). *(guessed)*

**Intent:** soft or no failure *(provisional)*

## Look and references
- Look: dunkles Nachtglas; additive, leuchtende Lichtstrahlen mit fließenden Lichtfunken; facettierte Edelstein-Kristalle; silberne Spiegel, goldene feste Spiegel, Steinmauern, Farbglas-Filter; der Himmel wandert pro Kapitel von Mitternachtsblau über Blaue Stunde zu Morgenrot. Signature: beim Lösen scheint die Sonne durch das Brett, beim Finale geht sie über dem Ergebnis auf. Jede Grundfarbe hat zusätzlich eine Form (Rot Dreieck, Grün Quadrat, Blau Raute) auf Linsen, Glas und den Markern unter jedem Kristall. Every figure drawn, no emoji, no plain circles. *(guessed)*
- References: keine genannt; Werte aus klassischen Licht-/Spiegelrätseln *(guessed)*
- View: 2D · Camera: static, das ganze Brett im Fenster *(guessed)*

## First minute
Titel „New Dawn“: drei Linsen speisen einen weißen Kristall, ein Knopf „Spielen“. Level 1: ein roter Lichtstrahl schießt aus einer Linse ins Leere, daneben ein dunkler roter Kristall, ein Hinweis „Tippe auf das umrandete Feld im Strahl“, und genau dieses Feld pulsiert. Der Spieler tippt, ein Spiegel erscheint, der Strahl knickt in die falsche Richtung ab – noch einmal tippen dreht den Spiegel, der Strahl trifft, der Kristall glüht auf, Funken, die Sonne scheint durchs Brett. Level 2–3 bringen zwei und drei Knicke und Mauern, Level 4 zwei Farben. *(guessed)*

## Challenge
Ab Level 5 (ca. Minute 5) müssen sich Strahlen kreuzen, und ein Spiegel für Grün lenkt plötzlich Blau ab; ab Kapitel 2 müssen zwei Strahlen im selben Kristall ankommen, und eine falsche Farbe lässt ihn flackern und erscheint durchgestrichen unter ihm. Spiegel sind begrenzt (Par + 1); Par ist bewiesen die kleinste mögliche Spiegelzahl, drei Sterne nur mit Par und ohne Hinweis. Kein Verlieren: Rückgängig und Neustart sind gratis. Kapitel 3 bringt Farbglas, das wirklich zählt, und weiße Kristalle. Das Tagesrätsel steigt von Montag bis Sonntag an und ist nie schwerer als der eigene Fortschritt (mindestens mit den Regeln von Level 4); Endlos wird schwerer, bis es ab dem 13. Rätsel bei den Regeln von Level 30 bleibt. *(guessed)*

## Core loop
- Strahlen ansehen → Spiegel setzen/drehen → Strahlen springen live um
- Kristalle füllen sich mit Farbe → alle leuchten → Sterne, nächstes Level
- Besser werden: mit weniger Spiegeln (Par) lösen für drei Sterne

## Goal & fail state
- Ziel: alle 30 Level der drei Kapitel lösen (Mitternacht → Morgenrot), danach Tagesrätsel und Endlos-Modus.
- Kein Scheitern: falsche Farbe = Kristall flackert; Rückgängig/Neustart jederzeit.

## Features
- [x] Brett mit Strahlen-Simulation: Spiegel /, \, Mauern, Kristalle, Linsen (Emitter)
- [x] Farbmischung Rot/Grün/Blau → Gelb, Magenta, Cyan, Weiß
- [x] 30 Level in 3 Kapiteln, jedes bringt eine neue Idee (feste Spiegel, Mischen, Filter, Weiß)
- [x] Spiegel-Vorrat, Par und Sterne; Hinweis-Knopf
- [x] Rückgängig ohne Limit, Neustart, Fortschritt gespeichert (offline, localStorage)
- [x] Tagesrätsel und Endlos-Modus aus dem Generator
- [x] Synth-Sounds (Web Audio), Stummschalten
- [x] Generator mit exaktem Löser: jedes Brett lösbar, Par = kleinste Spiegelzahl
- [x] Formen pro Grundfarbe für Farbenblinde; Marker zeigen fehlende und falsche Farben
- [x] Deutsch und Englisch, nach Browser-Sprache gewählt und umschaltbar

## Keep
-

## Avoid
- Internet-Abhängigkeiten (alles offline, eine Datei)
- Emoji-Grafik

## Out of scope
- Level-Editor: change it after play
- Online-Bestenlisten: needs a server

## Build order
1. Ein Kapitel spielbar von Level 1 bis zum Kapitelende: Strahlen, Spiegel, Kristalle, Sieg-Moment (kein Verlieren, nur Neustart).
2. Mischen, Filter, Weiß; Kapitel 2 und 3.
3. Tagesrätsel, Endlos, Sound, Feinschliff.

---
**Kill condition:** Wenn das Umlenken nach zwei Tuning-Runden nur Ausprobieren statt Denken ist. *(guessed)*

**Who it's for / what they feel:** Rätselfans, die eine ruhige, schöne Viertelstunde mit „Aha!“ wollen. *(guessed)*

**Games you love / don't:** keine genannt.
