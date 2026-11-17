// PROTOTYPE - NOT FOR PRODUCTION
// Question: Macht es Spaß, Lichtstrahlen mit wenigen Spiegeln zu Farbkristallen zu lenken?
// Date: 2026-11-16
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address); also shapes all 30 levels
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // --- Puzzle rules ---
  spareMirrors: { value: 1, min: 0, max: 3, step: 1 },  // mirrors in stock beyond par (the generator's solution)
  hintStarCost: { value: 1, min: 0, max: 2, step: 1 },  // stars lost per hint used
  maxHints: { value: 3, min: 0, max: 6, step: 1 },      // hints per puzzle
  overParStarCost: { value: 1, min: 0, max: 2, step: 1 }, // stars lost when more mirrors than par are used

  // --- Level generator ---
  genAttempts: { value: 900, min: 50, max: 4000, step: 50 }, // tries per level before rules are relaxed
  maxSegment: { value: 4, min: 1, max: 8, step: 1 },     // longest straight run of a generated light path, in cells
  endlessStart: { value: 6, min: 0, max: 29, step: 1 },  // campaign level (0-based) whose rules endless mode starts from
  endlessRamp: { value: 2, min: 1, max: 5, step: 1 },    // campaign levels of difficulty added per endless puzzle solved

  // --- Look and feel ---
  beamGlow: { value: 1, min: 0.3, max: 2, step: 0.1 },   // brightness of the soft glow around beams
  flowSpeed: { value: 2.2, min: 0, max: 6, step: 0.1 },  // light sparks running along beams, cells per second
  flowSpacing: { value: 0.9, min: 0.4, max: 2, step: 0.1 }, // cells between sparks
  sparkBurst: { value: 26, min: 0, max: 80, step: 2 },   // particles when a crystal lights up
  winDelay: { value: 1.2, min: 0.3, max: 3, step: 0.1 }, // seconds from the last crystal to the results panel
  skyBlend: { value: 1.2, min: 0.2, max: 5, step: 0.1 }, // how fast the sky changes colour between chapters, per second
};
