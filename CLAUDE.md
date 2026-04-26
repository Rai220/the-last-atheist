# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

«Последний Атеист» — a Russian-language visual novel built on the **Monogatari** engine. Vanilla JS/HTML/CSS — no build step is needed for development. The game is entirely client-side; localStorage is the only persistence layer.

`AGENTS.md` contains the canonical lore/design bible (themes, characters, easter eggs, meme placement rules). Read it before writing or editing dialogue.

## Common commands

```bash
bun run serve        # Dev server with live-reload (port 5100). Primary workflow.
bun run build:web    # Production web build → ./build/web (strips debug script).
```

Other targets exist but are secondary:
- `yarn start` — Electron desktop wrapper (`scripts.start`).
- `yarn build:mac` / `:windows` / `:linux` — electron-builder targets.
- `bun run start:electrobun` / `build:electrobun` — Electrobun targets.
- Android: APK is built via Capacitor (`@capacitor/android`); a prebuilt `the-last-atheist.apk` lives at the repo root.

There is **no lint, typecheck, or test** infrastructure. Don't suggest running tests — there are none.

Asset generation scripts (`generate_art.py`, `generate_music.py`, `generate_scenes_pillow.py`) are offline tools and need `GEMINI_API_KEY`. They are not part of the dev loop.

## Architecture

### Engine layer
`engine/core/monogatari.js` is the bundled Monogatari VN engine (vendored). Don't modify it. The game extends it through these globals: `monogatari.script({...})`, `monogatari.characters({...})`, `monogatari.assets(...)`, `monogatari.storage({...})`, `monogatari.action(...)`.

### Script load order (see `index.html`)
1. `engine/debug/debug.js` (stripped from web build by `build-web.ts`)
2. `engine/core/monogatari.js`
3. `js/options.js`, `js/storage.js`, `js/characters.js`, `js/assets.js`, `js/effects.js`
4. Chapter scripts: `js/scripts/prologue.js` → `judgment.js` → `hell.js` → `endings.js`
5. `js/script.js` (messages, notifications, `resetStoryStateForNewGame`)
6. `js/main.js` (entry point — must load last)

Each chapter file calls `monogatari.script({ Label_Name: [ ... ] })` to register labels. Branching is by `jump <Label>` strings inside the action arrays; `Choice` blocks mutate stats inside `onChosen` callbacks via `this.storage({...})`.

### Game state model (`js/storage.js`)
Stats are flat keys on `monogatari.storage()`. The big ones that gate branches:
- `wtf_level`, `denial_count`, `cruelty_score`, `argument_quality`, `empathy_shown`, `humor_used`, `rebellion_score`, `acceptance_score` — judged stats
- `life_current` / `life_max` — HP-style meter (UI: `#life-meter` in `index.html`)
- `lilith_interest`, `lilith_trust`, `viktor_friendship`, `demon_friendship`, `inna_interest`, `alice_rapport` — relationship axes
- `matrix_suspicion`, `noticed_patterns`, `seen_inna_parallels` — Matrix-route gates
- `judgment_verdict`, `death_type`, `morning_choice`, `prologue_personality` — branch tags

`resetStoryStateForNewGame` in `js/script.js` is the canonical reset list — keep it in sync with `js/storage.js` whenever you add a stat.

### `js/main.js` — runtime layer
This file owns everything that wraps Monogatari at runtime. Be aware of these subsystems before changing anything in `main.js`:

- **`installProceedGuard`** monkey-patches `monogatari.proceed`, `monogatari.run`, and `monogatari.loadFromSlot`. It catches `"Extra condition check failed."` rejections (a Monogatari quirk that hangs the dialogue) and skips one step forward. `loadFromSlot` also schedules `recoverEmptyGameScreenAfterLoad` to advance past blank screens after a load. **If you see save/load hangs, this is the layer to check.** Recent commits (`5101d7f`, `7bc9ef2`, `d7ca678`) all touched this.
- **Skip / fast-forward** (`addSkipButton`, `_enableSkipAcceleration`): the skip button uses `monogatari.skip()`, but additionally injects CSS that zeroes animations and monkey-patches `window.setTimeout` to compress 5–10000ms timers to 1ms. Two modes: `seen` (stops at unvisited labels) and `all`. Toggle by double-click.
- **Label-visited tracking**: `markLabelVisited` / `isLabelVisited` persist to `localStorage['tla_seen_labels']`. The skip system and the route map both read this. Polled every 200ms by `startLabelTracker`.
- **`ROUTE_MAP`**: a hand-maintained graph of labels and edges rendered as SVG inside `showRouteMap`. **Adding a new ending or a new branching node usually requires editing `ALL_ENDINGS` and `ROUTE_MAP` in `js/main.js`** — they are not auto-generated from the scripts.
- **Ending counter / gallery**: reads `localStorage['tla_endings']` (written from ending labels). The keys must match `ALL_ENDINGS`.
- **Easter eggs**: `initJustLilithEasterEgg` (DDLC-style red flash on main menu after any Lilith ending) and `initPostGlitchEffects` (persistent UI glitch after the Glitch ending) — both gated on localStorage-tracked endings.
- **Dev mode**: `Ctrl+Shift+D` (or `Cmd+Shift+D`) toggles a live stats overlay reading from `monogatari.storage()`.

### Dev server (`serve.ts`)
Bun static server on port 5100. Watches `js`, `style`, `engine/core`, `engine/debug`, and the root for changes; pushes a WebSocket "reload" message to a script injected into every `.html` response. The WebSocket endpoint is `/__reload`.

### Web build (`build-web.ts`)
Copies a fixed allowlist of dirs (`assets`, `engine/core`, `engine/LICENSE`, `js`, `style`, `favicon.ico`, `manifest.json`, `service-worker.js`) to `./build/web` and writes a sanitized `index.html` with the debug script line removed. **If you add a new top-level resource the game depends on, add it to `include[]` in `build-web.ts`** — it will silently 404 in production otherwise. GitHub Pages deploy (`.github/workflows/deploy.yml`) uploads the entire repo, not the `build/web` output.

## Conventions

- **Language**: dialogue is Russian. UI strings are Russian. Code comments and identifiers are mixed Russian/English — match the surrounding style of the file.
- **Indentation in JS**: tabs (Monogatari house style — see existing files).
- **No build step for game code**. Don't introduce TypeScript, bundlers, or transpilers in `js/`. `serve.ts` and `build-web.ts` are TS only because they run under Bun directly.
- **Persisted localStorage keys**: `tla_seen_labels`, `tla_endings`. Don't rename without a migration path — players have saves.

## Asset generation rules (from `AGENTS.md`)

- **Never generate text on images**. Every Imagen/Gemini prompt must include `no text, no letters, no words, no signs, no labels, no writing on the image`. All in-game text is rendered by Monogatari's UI, never baked into backgrounds.
- **Don't substitute SVG mock-ups when image generation fails**. If the Gemini API is unavailable (e.g. geo-blocked), produce nothing — never fall back to SVG placeholders.

## Tech stack reference

- **Engine**: Monogatari (vendored at `engine/core/`)
- **Runtime**: Bun for dev/build scripts; vanilla JS for the game itself
- **Wrappers**: Electron, Electrobun, Capacitor (Android) — all secondary
- **CSP**: defined inline in `index.html` (`script-src 'self' 'unsafe-eval'` is required by Monogatari)
