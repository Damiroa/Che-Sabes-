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
- `src/data/questions.ts` — original 170-question bank and shared types
- `src/data/courseQuestions.ts` — 298 course records
- `src/data/additionalQuestions.ts` — 97 shared academic questions
- `src/data/shopItems.ts` — shop item definitions (5 items)
- `src/utils/audio.ts` — Web Audio engine: music + all SFX
- `src/components/` — all screens and shared components
- `src/hooks/useBreakpoint.ts` — isMobile/isTablet/isDesktop

## Architecture decisions

- All game logic is frontend-only — no backend required
- Shop and high score are persisted to `localStorage` via Zustand `partialize`
- Music is a note-sequenced Web Audio loop (128 BPM, C major), starts on Play, stops on menu/game-over
- Screen transitions use opacity + `scale(0.97)` via stable keyed `<Page>` wrappers in `App.tsx`
- A deadline timer updates only when the displayed second changes; timeouts and sound run outside React state updater functions
- `AnimatedBackground` uses 4 blobs per stage (reduced from 6) with `will-change: transform` for GPU compositing

## Product

- 6 school courses and 19 subjects, including the 15 requested academic categories; difficulty increases every 4 correct answers
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

## Mobile and question update (September 2026)

- New shared bank: `src/data/additionalQuestions.ts` adds 97 questions with stable IDs, four distinct answers, category and difficulty. `src/data/categories.ts` defines the 15 requested academic categories. Display labels remain Spanish.
- All 298 course records and the original 170 legacy records remain. The course game now selects from 395 records (298 existing + 97 shared); shared questions work in every course without copying them six times. The original legacy bank retains its existing formats.
- Three supplied entries are covered without adding duplicates: French Revolution and processor questions already exist; the first San Martín prompt is covered by the Andes campaign prompt in this batch. Some wording was clarified to make the correct answer unambiguous.
- Selection excludes `usedQuestionIds` before random sampling. Stage difficulty is preferred, then other unused questions in the same course/subject. Answered and skipped questions stay blocked until a new game. Exhaustion ends with a completion message; it never refills the pool. Previous-game history does not prevent restarting.
- Viewport uses `100dvh` with a `100vh` fallback and safe-area padding. Screen containers scroll, buttons have 44px minimum targets, and page transitions keep stable keys. Full-screen blur transitions were replaced with the existing fade/scale effect. Button transforms are owned by Framer Motion.
- Answer delays and timers clean up on question/phase changes. Deadlines account for background tabs; sound side effects run outside React state updaters. Phase guards reject duplicate actions. Stage progress uses an animation instead of a 30ms React interval.

### Run, test and publish

- Development: `pnpm run start:game` (port 3000), or foreground `pnpm --filter @workspace/trivia-game dev`.
- Game tests: `pnpm run test:game`.
- Game production build: `pnpm run build:game`.
- Entire workspace: `PORT=3000 BASE_PATH=/ pnpm run build` (the separate mockup app requires those environment variables).
- Production: `pnpm run start:production`. The server binds `0.0.0.0`, respects `PORT` (default 3000), and serves only `artifacts/trivia-game/dist/public`. It requires a completed build and no provider credentials or database.
- `.replit` configures the Project workflow, port 3000 → 80, and Autoscale build/run commands. Publishing must run from the Replit project containing these changes. The public URL is assigned by Replit after a successful publish; this sandbox has no Replit publishing connection.
- Replit configuration reference: https://docs.replit.com/replit-app/configuration

Verified here: game logic/data tests, full workspace build, production HTTP responses and assets, and shared Chromium gameplay/layout at phone/tablet/desktop sizes. Android/iPhone device emulation does not replace testing on physical devices or Safari.
