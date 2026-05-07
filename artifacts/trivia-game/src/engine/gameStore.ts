import { create } from "zustand";
import { persist } from "zustand/middleware";
import { questions, Question, Category } from "../data/questions";

export type GamePhase =
  | "menu"
  | "category-select"
  | "playing"
  | "feedback"
  | "stage-up"
  | "game-over";

export interface ShopState {
  doubleCoins: boolean;
  timerPro: boolean;
  maxMulti: boolean;
  skipBonus: boolean;
  shieldCount: number; // consumable stack, max 3
}

const DEFAULT_SHOP: ShopState = {
  doubleCoins: false,
  timerPro: false,
  maxMulti: false,
  skipBonus: false,
  shieldCount: 0,
};

type PermanentKey = "doubleCoins" | "timerPro" | "maxMulti" | "skipBonus";
const PERMANENT_KEYS: PermanentKey[] = ["doubleCoins", "timerPro", "maxMulti", "skipBonus"];
const ITEM_PRICES: Record<string, number> = {
  doubleCoins: 80, timerPro: 60, maxMulti: 120, skipBonus: 50, shield: 40,
};

export interface GameState {
  phase: GamePhase;
  stage: number;
  lives: number;
  score: number;
  highScore: number;
  streak: number;
  bestStreak: number;
  skipsLeft: number;
  currentQuestion: Question | null;
  usedQuestionIds: number[];
  selectedCategory: Category | "all";
  lastAnswerCorrect: boolean | null;
  lastCorrectAnswer: string;
  timedOut: boolean;
  timerSeconds: number;
  difficulty: "easy" | "medium" | "hard";
  questionsAnswered: number;

  // Shop — persisted
  coins: number;
  shop: ShopState;

  // Runtime — not persisted
  activeShield: boolean;
  lastCoinsEarned: number;

  startGame: (category: Category | "all") => void;
  answerQuestion: (answer: string, timeout?: boolean) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  continueAfterStageUp: () => void;
  resetGame: () => void;
  goToMenu: () => void;
  purchaseItem: (itemId: string) => "ok" | "no_coins" | "already_owned" | "stack_full";
}

const MAX_LIVES      = 3;
const INITIAL_TIMER  = 15;
const MIN_TIMER      = 10;
const TIMER_BONUS    = 4;
const STAGE_LEN      = 10;

function pickQuestion(
  usedIds: number[],
  category: Category | "all",
  difficulty: "easy" | "medium" | "hard"
): Question | null {
  const pool = questions.filter(
    (q) =>
      !usedIds.includes(q.id) &&
      (category === "all" || q.category === category) &&
      q.difficulty === difficulty
  );
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function stageDiff(stage: number): "easy" | "medium" | "hard" {
  return stage === 1 ? "easy" : stage === 2 ? "medium" : "hard";
}

export function getStreakMultiplier(streak: number, maxMulti = false): number {
  if (maxMulti && streak >= 12) return 5;
  if (streak >= 9) return 4;
  if (streak >= 6) return 3;
  if (streak >= 3) return 2;
  return 1;
}

function coinsForAnswer(stage: number, doubleCoins: boolean, streak: number): number {
  const base = stage === 1 ? 8 : stage === 2 ? 12 : 18;
  const bonus = streak >= 3 ? 3 : 0;
  return (base + bonus) * (doubleCoins ? 2 : 1);
}

function startTimer(shop: ShopState): number {
  return Math.max(MIN_TIMER, INITIAL_TIMER + (shop.timerPro ? TIMER_BONUS : 0));
}
function startSkips(shop: ShopState): number {
  return 2 + (shop.skipBonus ? 1 : 0);
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: "menu",
      stage: 1,
      lives: MAX_LIVES,
      score: 0,
      highScore: 0,
      streak: 0,
      bestStreak: 0,
      skipsLeft: 2,
      currentQuestion: null,
      usedQuestionIds: [],
      selectedCategory: "all",
      lastAnswerCorrect: null,
      lastCorrectAnswer: "",
      timedOut: false,
      timerSeconds: INITIAL_TIMER,
      difficulty: "easy",
      questionsAnswered: 0,
      coins: 0,
      shop: DEFAULT_SHOP,
      activeShield: false,
      lastCoinsEarned: 0,

      startGame: (category) => {
        const { shop } = get();
        const useShield = shop.shieldCount > 0;
        const q = pickQuestion([], category, "easy");
        set({
          phase: "playing",
          stage: 1,
          lives: MAX_LIVES,
          score: 0,
          streak: 0,
          bestStreak: 0,
          skipsLeft: startSkips(shop),
          currentQuestion: q,
          usedQuestionIds: q ? [q.id] : [],
          selectedCategory: category,
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          timerSeconds: startTimer(shop),
          difficulty: "easy",
          questionsAnswered: 0,
          activeShield: useShield,
          lastCoinsEarned: 0,
          shop: useShield ? { ...shop, shieldCount: shop.shieldCount - 1 } : shop,
        });
      },

      answerQuestion: (answer, timeout = false) => {
        const state = get();
        const q = state.currentQuestion;
        if (!q) return;

        const isCorrect =
          !timeout &&
          answer.trim().toLowerCase() === q.correct.trim().toLowerCase();

        const newStreak    = isCorrect ? state.streak + 1 : 0;
        const multiplier   = getStreakMultiplier(isCorrect ? newStreak : state.streak, state.shop.maxMulti);
        const newScore     = state.score + (isCorrect ? q.points * multiplier : 0);
        const newHighScore = Math.max(state.highScore, newScore);
        const newBest      = Math.max(state.bestStreak, newStreak);
        const newQA        = state.questionsAnswered + 1;

        // Shield absorbs a wrong answer
        const shieldSave    = !isCorrect && state.activeShield;
        const newLives      = isCorrect || shieldSave ? state.lives : state.lives - 1;
        const newShield     = shieldSave ? false : state.activeShield;

        // Coins
        const earned    = isCorrect ? coinsForAnswer(state.stage, state.shop.doubleCoins, newStreak) : 0;
        const newCoins  = state.coins + earned;

        // Timer shrinks on correct answer
        const newTimer = isCorrect
          ? Math.max(MIN_TIMER, state.timerSeconds - 1)
          : state.timerSeconds;

        const isGameOver = newLives <= 0;
        const advStage   = !isGameOver && newQA % STAGE_LEN === 0;
        const newStage   = advStage ? state.stage + 1 : state.stage;

        set({
          phase: isGameOver ? "game-over" : advStage ? "stage-up" : "feedback",
          stage: newStage,
          score: newScore,
          highScore: newHighScore,
          lives: newLives,
          streak: newStreak,
          bestStreak: newBest,
          lastAnswerCorrect: isCorrect,
          lastCorrectAnswer: q.correct,
          timedOut: timeout,
          timerSeconds: newTimer,
          difficulty: stageDiff(newStage),
          questionsAnswered: newQA,
          coins: newCoins,
          lastCoinsEarned: earned,
          activeShield: newShield,
        });
      },

      skipQuestion: () => {
        const state = get();
        if (state.skipsLeft <= 0) return;
        const diff = stageDiff(state.stage);
        const q = pickQuestion(state.usedQuestionIds, state.selectedCategory, diff);
        if (!q) { set({ phase: "game-over" }); return; }
        set({
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          skipsLeft: state.skipsLeft - 1,
          streak: 0,
          difficulty: diff,
        });
      },

      nextQuestion: () => {
        const state = get();
        const diff = stageDiff(state.stage);
        const q = pickQuestion(state.usedQuestionIds, state.selectedCategory, diff);
        if (!q) { set({ phase: "game-over" }); return; }
        set({
          phase: "playing",
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          difficulty: diff,
          lastCoinsEarned: 0,
        });
      },

      continueAfterStageUp: () => {
        const state = get();
        const diff = stageDiff(state.stage);
        const q = pickQuestion(state.usedQuestionIds, state.selectedCategory, diff);
        if (!q) { set({ phase: "game-over" }); return; }
        set({
          phase: "playing",
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          difficulty: diff,
          lastCoinsEarned: 0,
        });
      },

      resetGame: () => {
        const { shop } = get();
        set({
          phase: "category-select",
          stage: 1,
          lives: MAX_LIVES,
          score: 0,
          streak: 0,
          bestStreak: 0,
          skipsLeft: startSkips(shop),
          currentQuestion: null,
          usedQuestionIds: [],
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          timerSeconds: startTimer(shop),
          difficulty: "easy",
          questionsAnswered: 0,
          lastCoinsEarned: 0,
        });
      },

      goToMenu: () => set({ phase: "menu" }),

      purchaseItem: (itemId) => {
        const state = get();
        const price = ITEM_PRICES[itemId];
        if (price === undefined) return "already_owned";
        if (state.coins < price) return "no_coins";

        const shop = { ...state.shop };

        if (itemId === "shield") {
          if (shop.shieldCount >= 3) return "stack_full";
          shop.shieldCount += 1;
        } else if (PERMANENT_KEYS.includes(itemId as PermanentKey)) {
          if (shop[itemId as PermanentKey] === true) return "already_owned";
          (shop as Record<string, unknown>)[itemId] = true;
        } else {
          return "already_owned";
        }

        set({ coins: state.coins - price, shop });
        return "ok";
      },
    }),
    {
      name: "che-sabes-store",
      partialize: (state) => ({
        highScore: state.highScore,
        coins: state.coins,
        shop: state.shop,
      }),
    }
  )
);
