# ¿Che Sabes?

A single-player browser trivia game in Spanish with a shop system, coins, and progressive difficulty.

## Run & Operate

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Workflow: `artifacts/trivia-game: web` → preview path `/`

## Stack

- React + Vite (artifact: `artifacts/trivia-game`)
- Zustand (persist key `che-sabes-store`) — state + shop
- Framer Motion — all animations and page transitions
- Web Audio API — synthesized music loop + SFX (no audio files)
- Outfit + Space Grotesk fonts (Google Fonts)
- Tailwind CSS (via `@import "tailwindcss"`)

## Where things live

- `src/engine/gameStore.ts` — full game + shop state (Zustand)
- `src/data/questions.ts` — 170+ trivia questions
- `src/data/shopItems.ts` — shop item definitions (5 items)
- `src/utils/audio.ts` — Web Audio engine: music + all SFX
- `src/components/` — all screens and shared components
- `src/hooks/useBreakpoint.ts` — isMobile/isTablet/isDesktop

## Architecture decisions

- All game logic is frontend-only — no backend required
- Shop and high score are persisted to `localStorage` via Zustand `partialize`
- Music is a note-sequenced Web Audio loop (128 BPM, C major), starts on Play, stops on menu/game-over
- Screen transitions use `filter: blur(10px)` + `scale(0.97)` via a `<Page>` wrapper in `App.tsx`
- Timer timeout is detected via `useEffect` watching `timeLeft === 0` (not inside the setState updater) to avoid React render-phase update warnings
- `AnimatedBackground` uses 4 blobs per stage (reduced from 6) with `will-change: transform` for GPU compositing

## Product

- 5 question categories, 3 difficulty stages (10 questions each)
- 3 lives, streak multiplier (×1–×4, ×5 with Racha Legendaria upgrade)
- 2 skips per game (3 with Skip Master upgrade)
- **Shop system**: 5 items — Doble Monedas (80🪙), Timer Pro (60🪙), Racha Legendaria (120🪙), Skip Master (50🪙), Escudo consumable (40🪙 ×3)
- Coins earned per correct answer: 8/12/18 by stage, ×2 with Doble Monedas, +3 bonus at streak ≥3
- Shield absorbs one wrong answer without losing a life
- Floating `+N 🪙` reward shown on correct answers
- Fully responsive: mobile, tablet, desktop layouts

## User preferences

- Keep the project lightweight and stable (school project, non-profit)
- No real monetization

## Gotchas

- `question.correct` is the correct answer field (not `.answer`)
- `getStreakMultiplier(streak, maxMulti?)` — pass `shop.maxMulti` for ×5 cap
- Do not call store `set()` inside React `setState` updater functions (causes render-phase warning)
- Timer bonus from `timerPro` is applied at `startGame`, not per question
