# Scrambled Legs

Official website for Scrambled Legs, featuring the famous Hot Dog Counter and a sophisticated mashing game with mini-games and real-time audio management.

---

## 🚀 Fresh Instance Bootstrap (Read This First!)

If you're a newly spawned language model, **you need to read this section**. It will get you up to speed in minutes.

### For Fresh LLMs Only

Follow these steps in order:

1. **Read this README** (you are here)
2. **Read [LOGS.md](./LOGS.md)** — Start with the most recent entry at the top. Understand what was just done and any open issues.
3. **Skim [TODO.md](./TODO.md)** — Check the Recommended Next Work section first, then scan for anything 🔄 blocked or 🚀 in progress.
4. **Skim [PROCESS.md](./PROCESS.md)** — How to maintain docs so the next instance stays caught up.
5. **Only if working on specific systems** — read the relevant deep-dive docs below.

**That's it.** You're now caught up. Ready to work!

### Current State (as of last session)

- **Active work area**: Mini-game system (modes, scheduling, difficulty, text)
- **🔴 Immediate bug**: Double session-end fire is still occurring on Mash Gauntlet — the `saveFlowInProgressRef` fix (BUG-001) may not be catching it. Needs re-investigation before anything else.
- **In progress**: Mash text overhaul (INVEST-002) — Phase 1 done (consolidation), Phase 2 (content audit + expansion) is next
- **Open investigation**: 10-press gap feel (INVEST-001) — mechanics confirmed correct, live testing with logging still needed

### Key files for the mini-game system

| File | What it does |
|------|-------------|
| `src/game/miniGames.js` | All 5 mini-game definitions + difficulty scaling + shuffle-bag scheduler |
| `src/game/director.js` | State machine — phases, outcomes, MASH NOW! warning |
| `src/game/store.js` | Glue layer — mode lifecycle, audio transitions, save flow |
| `src/game/mashText.js` | **NEW** — single source of truth for all challenge + bubble text |
| `src/game/modes/` | Individual game play loops (goldenEgg, pong, twilight, pigDodge, thresholdMash) |
| `src/components/calendar/KudosCta.js` | Mash button host — save flow, press handling, challenge text |
| `src/components/calendar/MashNowWarning.js` | MASH NOW! strobe warning component |

### Why This Structure?

- **LOGS.md** keeps you from repeating work or rediscovering bugs
- **TODO.md** keeps work organized and prevents duplicates
- **PROCESS.md** ensures the next person after you also stays caught up
- **This README** is the project map

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Documentation Files (Important!)](#-documentation-files-important)
- [Project Structure](#project-structure)
- [Audio System Overview](#-audio-system-overview)
- [Development](#development)
- [Deployment](#deployment)
- [Features](#features)

---

## 🏃 Quick Start

```bash
# Install dependencies
npm install

# Run development server (opens http://localhost:3000)
npm start

# Build for production
npm run build

# Verify build succeeded (must have zero errors and zero warnings)
npm run build 2>&1 | grep -E "Compiled|error"
```

---

## 📚 Documentation Files (IMPORTANT!)

These files are **essential** for maintaining knowledge across sessions. Always update them after work.

| File | Purpose | Read When |
|------|---------|-----------|
| **[LOGS.md](./LOGS.md)** | Session-by-session record of work done, bugs found, decisions made | Starting work — read the top entry first |
| **[TODO.md](./TODO.md)** | Task list with Official IDs, priorities, and status | Understanding what's next; check Recommended Next Work section |
| **[PROCESS.md](./PROCESS.md)** | How to update LOGS.md and TODO.md | Before updating docs |
| **[AUDIO_ARCHITECTURE.md](./AUDIO_ARCHITECTURE.md)** | Deep technical dive into the audio system | When working on audio |
| **[MINI_GAME_MESSAGING_TIMELINE.md](./MINI_GAME_MESSAGING_TIMELINE.md)** | Phase-by-phase message timeline for all 5 mini-games | When changing mini-game text or timing |
| **[MASH_CHALLENGE_BUBBLE_TEXT_OVERHAUL.md](./MASH_CHALLENGE_BUBBLE_TEXT_OVERHAUL.md)** | Audit doc for all challenge + bubble text. 18 TODO items for content work | When working on mash text (INVEST-002) |
| **[TEN_PRESS_GAP_INVESTIGATION.md](./TEN_PRESS_GAP_INVESTIGATION.md)** | Open investigation into perceived gap inconsistency between mini-games | When investigating INVEST-001 |

**TL;DR**: After every work session, you MUST:
1. Update LOGS.md with what you did
2. Update TODO.md with task status changes
3. Build and verify: `npm run build`

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── calendar/              # Event, RSVP, mash game UI
│   │   ├── KudosCta.js       # Mash button (starts audio on press 1)
│   │   ├── HighScoreHud.js   # Score display
│   │   └── ...
│   ├── NotificationFab.js     # Push notification UI
│   └── ...
├── pages/                     # Full page routes
├── game/                      # Mash game core system
│   ├── store.js              # Game state + audio integration ⭐
│   ├── director.js           # Mini-game scheduling & phases
│   ├── miniGames.js          # 5 mini-game definitions
│   ├── modes/                # Mini-game play mechanics
│   │   ├── goldenEgg.js
│   │   ├── pigDodge.js
│   │   ├── pong.js
│   │   ├── twilight.js
│   │   └── thresholdMash.js
│   └── applyAmbient.js       # Visual effects (emojis, flashes)
├── services/
│   ├── AudioManager.js       # Audio playback & crossfades ⭐⭐
│   ├── firebase.js           # Firebase config
│   ├── auth.js               # Authentication
│   └── ai.js                 # Gemini AI with caching
├── hooks/
│   ├── useMashEffects.js     # Visual effects
│   └── useEventKudos.js      # Score tracking
├── App.js                    # Main router
└── index.js                  # Entry point

public/audio/
├── main-tracks/
│   └── mash-theme.mp3        # Main loop (45.77s)
└── minigames/
    ├── dodge.mp3
    ├── golden-egg.mp3
    ├── mash-gauntlet.mp3
    ├── pong.mp3
    └── twilight.mp3
```

⭐ = Most important for audio work  
⭐⭐ = Core of audio system

---

## 🎵 Audio System Overview

**Status**: Stable and production-ready ✅

The audio system manages seamless transitions between main track and 5 mini-game tracks using crossfades and volume synchronization.

### Latest Fixes (Most Recent Session)

- ✅ Main track volume sync bug fixed (was staying at 0% after mini-games)
- ✅ Crossfade durations synchronized to 1 second (entry and exit)
- ✅ Master volume system fully operational
- ✅ UNIVERSAL_VOLUME constant centralized (0.7)

### Key Files

- **AudioManager.js** — Handles playback, crossfades, volume
- **store.js** — Integrates audio with game lifecycle
- **miniGames.js** — Audio paths and volume levels

For detailed architecture, see [AUDIO_ARCHITECTURE.md](./AUDIO_ARCHITECTURE.md).

---

## 🛠️ Development

### Installation

```bash
npm install
```

### Running Locally

```bash
npm start
```

Development server opens at http://localhost:3000. Changes auto-reload.

### Building for Production

```bash
npm run build
```

Output: `build/` folder with optimized static files.

**Important**: Build must have **zero errors and zero warnings**. If it doesn't, fix it before declaring work done.

### Project Tech Stack

- **Frontend**: React 18, React Router
- **Styling**: styled-components
- **Backend**: Firebase (Auth, Realtime Database, AI)
- **Audio**: HTML5 Audio API with RequestAnimationFrame fades
- **State**: React hooks + external event emitters

---

## 🚀 Deployment

The site deploys to GitHub Pages at `thescrambledlegs.com`.

### Automated Deployment (Recommended)

GitHub Actions automatically deploys when you push to `main`:

1. Runs on push to main branch
2. Builds the React app
3. Deploys to `gh-pages` branch
4. GitHub Pages serves the site

**Setup required**:

1. Go to Settings > Pages → Set source to "gh-pages" branch
2. Go to Settings > Actions > General → Enable "Read and write permissions"
3. Custom domain configured in Settings > Pages

### Manual Deployment

```bash
./deploy.sh  # Builds and pushes to gh-pages branch
```

### Troubleshooting

- **Changes not appearing**: Clear browser cache, check Actions tab for errors
- **Build failing**: Run `npm run build` locally to debug
- **Domain issues**: Verify DNS records and GitHub Pages settings

---

## ✨ Features

- **Hot Dog Counter** — Track community contributions with Firebase backend
- **Mashing Game** — Press-the-button gameplay with score tracking
- **5 Mini-Games** — Golden Egg, Dodge, Mash Gauntlet, Twilight, Pong
- **Audio System** — Seamless main track + mini-game transitions
- **Real-time Sync** — Live multiplayer state via Firebase
- **Responsive Design** — Mobile-first, works on all devices
- **Notifications** — Push notifications for ride updates
- **Push Notifications** — Real-time ride alerts

---

## 📞 Getting Help

### If You're Stuck On...

| Topic | Where to Look |
|-------|---------------|
| Recent work or known issues | [LOGS.md](./LOGS.md) |
| What to work on next | [TODO.md](./TODO.md) |
| Audio mechanics or bugs | [AUDIO_ARCHITECTURE.md](./AUDIO_ARCHITECTURE.md) |
| Creating a new mini-game | [MINI_GAME_BUILDER.md](./MINI_GAME_BUILDER.md) |
| Game state management | `src/game/director.js` and `src/game/store.js` |
| UI components | `src/components/` (read the relevant file) |

---

## ✅ Pre-Commit Checklist

Before pushing or declaring work done:

- [ ] All changes are committed with clear commit messages
- [ ] `npm run build` succeeds with **zero errors, zero warnings**
- [ ] Features work as expected (tested in browser)
- [ ] LOGS.md has been updated with what you did
- [ ] TODO.md has been updated with task status changes
- [ ] No debug console.log statements left in code

---

## 📅 Last Updated

- **Date**: 2026-04-30
- **Most Recent Work**: Audio system refactor (volume sync, crossfade synchronization)
- **Status**: Production ready ✅

**Next person**: Start with [LOGS.md](./LOGS.md) to see what was just done!