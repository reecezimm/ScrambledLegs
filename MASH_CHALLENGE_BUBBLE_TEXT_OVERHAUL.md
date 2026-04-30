# Mash Challenge & Bubble Text Overhaul

**Status**: 🚀 In Progress — Ongoing collaborative work  
**Priority**: HIGH  
**Last Updated**: 2026-04-30

This document tracks the audit, consolidation, and quality improvement of all text strings
used during the Mash Now game loop. Two primary systems exist (Challenge Text and Bubble Text)
plus a third (Flying Emojis). All three are documented here.

---

## Overview of the Two Text Zones

### Zone 1 — Challenge Text (Center Screen)
The large text that appears in the middle of the display during mashing. Driven by `pickChallenge()`
inside **KudosCta.js**. Updates every press (gated by dwell timer). Gets "frozen" by all mini-games
so their own status messages can show.

### Zone 2 — Bubble Text (Shoots Up From Button)
Short phrases that float up from the mash button. Driven by `spawnPhrase()` inside
**useMashEffects.js**. Gated by a 5-second cooldown. Disabled during mini-game play phases.

---

## Where All Text Lives

### Challenge Text — KudosCta.js

| Array / Object | Lines | Description |
|----------------|-------|-------------|
| `HD_FIRST_25` | ~389–417 | 25 hand-tuned messages for presses 1–25 (linear, no random) |
| `HD_CHALLENGE_BANDS` | ~97–265 | Band-based random pool for press 26+. 6 bands by difficulty. |
| `CREW_CHALLENGES` | ~269–379 | 95 crew-specific taunts. Require 4s dwell (vs 2.5s standard). |

**Selection flow (`pickChallenge()`, ~line 428):**
1. Press ≤25 → direct index lookup in `HD_FIRST_25`
2. Press 26+ → `bandForPress()` picks a band → random pick from that band
3. Repeat guard: up to 10 retries to avoid repeating the last message
4. Crew challenges have a separate dwell timer (4s) vs standard messages (2.5s)

**Band breakdown (HD_CHALLENGE_BANDS):**

| Band | Press Range | Pool Size | Notes |
|------|-------------|-----------|-------|
| 0 | 0–2 | 3 | Gentle on-ramp |
| 1 | 3–5 | 4 | Still early |
| 2 | 6–9 | 5 | Getting warmer |
| 3 | 10–14 | 7 | Mid-range |
| 4 | 15–24 | 9 | High intensity |
| 5 | 25+ | 83 | Full pool incl. crew-specific taunts |

**Known issues / questions:**
- [ ] Band 5 has 83 messages — is that pool wide enough to avoid noticeable repeats?
- [ ] Are CREW_CHALLENGES also in Band 5, or only accessible via the separate crew path?
- [ ] "DON'T STOP MASHING\nEVEN DURING MINI-GAMES" repeated 8× in HD_FIRST_25 — intentional (drill the rule) but needs confirmation it's the right UX
- [ ] "STOP MASHING = GAME OVER" repeated 6× — same question

---

### Bubble Text — useMashEffects.js

| Array | Lines | Description |
|-------|-------|-------------|
| `PHRASES` | ~609–648 | 48 phrases across 3 categories |

**Phrase categories:**

| Category | Count | Examples |
|----------|-------|---------|
| Core | 14 | "Get crackin'!", "Egg-cellent!", "Send it!" |
| Hype | 5 | "LET'S GET SCRAMBLED", "CRACK 'EM ALL", "YOLK ON FIRE" |
| Crew-specific | 29 | Jordan, SWIDZ, Pig Boy, Reed, Casey Newton, Tyler VANDAL, Matt Wiley, Derek VanSlyke, Will Markes, Paul Manoppo, GLARBTRON, Brent St. Martin, Alex Birno |

**Selection flow (`spawnPhrase()`, ~line 603):**
1. 5-second cooldown between spawns
2. Random index from full `PHRASES` array (no band/press weighting)
3. Up to 10 retries to avoid last phrase

**Known issues / questions:**
- [ ] No press-count weighting — a brand-new user on press 1 can get crew-specific taunts
- [ ] 48 phrases — after many games the user will see significant repetition
- [ ] Are crew names accurate and up-to-date?
- [ ] 5-second cooldown — is that the right feel? Too slow? Too fast?
- [ ] Phrases are plain English (Get crackin', Send it!) while challenge text is all-caps — visual inconsistency

---

### Flying Emojis — KudosCta.js

| Array | Lines | Description |
|-------|-------|-------------|
| Default | N/A | `'🌭'` always available |
| `FIRE_EMOJIS` | ~1578 | 6 emojis: fire, explosion, volcano, lightning. Unlocks at press 25 |
| `FARM_EMOJIS` | ~1579 | 15 emojis: animals, crops, tractors. Mix rate grows from press 25 |
| `CHAOS_EMOJIS` | ~1580 | 57 emojis: party, food, chaos. Unlocks at press 50 |
| `DIVERSE_EMOJIS` | ~1581 | 22 emojis: skin-tone cyclists, runners, acrobats, bodybuilders. Unlocks at press 100 |

**Selection flow (`pickSpawnEmoji()`, ~line 1588):**

| Press Range | Pool Logic |
|-------------|-----------|
| 0–24 | Always 🌭 |
| 25–49 | 15% FIRE, else FARM (farm mix ratio grows linearly) |
| 50–99 | 20% CHAOS, 15% FIRE, else FARM |
| 100+ | 25% DIVERSE, 20% CHAOS, 15% FIRE, else FARM |

Farm mix ratio: `(pressCount - 25) / 75 × 0.65`, capped at 65%

---

## Ambient Control System

All three zones are governed by `director.js` → `DEFAULTS.ambient`:
```
flyingEmojis:  'on' | 'off'         → body.dataset.ambFlying
bubbleText:    'on' | 'off'         → body.dataset.ambBubble
challengeText: 'on' | 'off' | 'frozen' → body.dataset.ambChallenge
```

Applied by `applyAmbient.js`. Mini-games set overrides in their config:

| Mini-Game | challengeText | bubbleText | flyingEmojis |
|-----------|---------------|------------|--------------|
| PREAMBLE | frozen | (default) | (default) |
| GOLDEN_EGG | frozen | off | off |
| MASH_GAUNTLET | frozen | (on during play) | (on during play) |
| TWILIGHT | frozen | off | off |
| DODGE | frozen | off | off |
| PONG | frozen | off | off |

---

## Randomness Issues to Investigate

### Issue 1 — No Press-Count Weighting for Bubble Phrases
Bubble phrases pull from the full 48-phrase pool regardless of how many presses the user has.
A brand new player on press 2 can get crew-specific insider jokes like "SWIDZ WOULDN'T STOP."
This is jarring for new users and dilutes the "you earned this" feel of crew references.

**Proposed fix**: Weight bubble phrases by press count, similar to how challenge text uses bands.
- Press 1–30: Core + Hype only (18 phrases)
- Press 31+: Full pool including crew-specific (48 phrases)

### Issue 2 — Repeat Visibility in Bubble Phrases
48 phrases with 1 repeat guard means: after seeing a phrase, you could see it again 2 phrases later.
With a 5-second cooldown, in a 60-second session the user sees ~12 bubble phrases. With 48 total,
coverage is sparse but repeats within a single session are common.

**Proposed fix**: Expand pool OR use a shuffle-bag pattern (exhaust full pool before reshuffling).

### Issue 3 — Challenge Text Band 5 Pool Size
Band 5 (press 25+) has 83 messages including crew-specific taunts. The repeat guard is only 1-deep.
In a long session, the same crew taunt can appear again within 2 challenges.

**Proposed fix**: Increase repeat guard depth for Band 5 (track last 5 or use shuffle-bag).

### Issue 4 — Text Case Inconsistency (Bubble vs Challenge)
Challenge text is ALL CAPS. Bubble phrases mix cases: "Get crackin'!", "Egg-cellent!", "LET'S GET SCRAMBLED".
This inconsistency may be intentional (different visual register) or accidental.

**Decision needed**: Normalize to all-caps, or keep mixed-case as-is?

### Issue 5 — Crew Name Accuracy
Both PHRASES and HD_CHALLENGE_BANDS contain crew-specific references. Need to verify:
- All crew names are spelled correctly
- No outdated nicknames
- Coverage is fair (no crew member missing, no one over-represented)

---

## Consolidation Plan

Currently text lives in two separate files with no shared source:
- Challenge text → `KudosCta.js`
- Bubble text → `useMashEffects.js`

**Proposed**: Extract all string data to a dedicated file `src/game/mashText.js`:
```
src/game/mashText.js
  ├── HD_FIRST_25          (challenge, linear)
  ├── HD_CHALLENGE_BANDS   (challenge, band-based)
  ├── CREW_CHALLENGES      (challenge, crew-specific)
  ├── BUBBLE_PHRASES       (bubble, all)
  └── (emoji arrays can stay in KudosCta.js — they're display-layer)
```

This makes it easy to audit all copy in one place, add new messages, and fix inconsistencies.

---

## TODO List

### Audit Tasks (Do First)
- [ ] **TEXT-001**: Read full HD_FIRST_25 array and audit for tone, accuracy, and coverage
- [ ] **TEXT-002**: Read full HD_CHALLENGE_BANDS (all bands) and audit for quality
- [ ] **TEXT-003**: Read full CREW_CHALLENGES set and verify crew name accuracy
- [ ] **TEXT-004**: Read full BUBBLE_PHRASES array and audit for tone and case consistency
- [ ] **TEXT-005**: Map which crew names appear in which arrays (challenge vs bubble)

### Randomness Fixes
- [ ] **TEXT-006**: Add press-count gate to bubble phrases (Core+Hype only before press 30)
- [ ] **TEXT-007**: Increase repeat guard depth for Band 5 challenge text (track last 5)
- [ ] **TEXT-008**: Evaluate shuffle-bag vs repeat-guard for bubble phrases
- [ ] **TEXT-009**: Audit emoji pool transitions — do the press-count thresholds feel right?

### Content Expansion
- [ ] **TEXT-010**: Add new bubble phrases (target: 80+ total to reduce repetition)
- [ ] **TEXT-011**: Add new Band 5 challenge messages if pool feels thin after audit
- [ ] **TEXT-012**: Verify and update crew references in both systems

### Consolidation
- [ ] **TEXT-013**: Extract all string arrays to `src/game/mashText.js`
- [ ] **TEXT-014**: Update KudosCta.js and useMashEffects.js to import from mashText.js
- [ ] **TEXT-015**: Add JSDoc to mashText.js describing each array's purpose and usage context

### Quality Decisions (Needs User Input)
- [ ] **TEXT-016**: Decide on case normalization — all-caps for bubbles or keep mixed?
- [ ] **TEXT-017**: Decide dwell times — is 4s for crew challenges vs 2.5s standard the right ratio?
- [ ] **TEXT-018**: Confirm HD_FIRST_25 repetition is intentional (rules drilled 8× and 6×)

---

## How to Use This Document

When working on a task:
1. Mark it `🚀 In Progress` in the TODO list above
2. Work through the changes
3. Mark it `✅ Done` with a date
4. Add findings/surprises to the relevant section above
5. Update `LOGS.md` with what was done

---

## Files Referenced

| File | Role |
|------|------|
| `src/components/calendar/KudosCta.js` | Challenge text data + selection logic + emoji pools |
| `src/hooks/useMashEffects.js` | Bubble phrase data + selection logic + animations |
| `src/game/director.js` | Ambient defaults (`DEFAULTS.ambient`) |
| `src/game/miniGames.js` | Per-mini-game ambient overrides |
| `src/game/applyAmbient.js` | Writes ambient state to body data attributes |
| `src/game/modes/` | Mode files that set `ctx.setStatus()` / `ctx.setSubStatus()` during play |
