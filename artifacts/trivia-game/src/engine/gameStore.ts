import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question, Category } from "../data/questions";
import { Course, Subject, courseQuestions } from "../data/courseQuestions";

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
  historyQuestionIds: number[];
  selectedCategory: Category | "all";
  selectedCourse: Course;
  selectedSubject: Subject;
  lastAnswerCorrect: boolean | null;
  lastCorrectAnswer: string;
  timedOut: boolean;
  timerSeconds: number;
  difficulty: "easy" | "medium" | "hard";
  questionsAnswered: number;
  correctAnswers: number;

  // Shop — persisted
  coins: number;
  shop: ShopState;

  // Runtime — not persisted
  activeShield: boolean;
  lastCoinsEarned: number;

  startGame: (course: Course, subject: Subject) => void;
  answerQuestion: (answer: string, timeout?: boolean) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  continueAfterStageUp: () => void;
  resetGame: () => void;
  resetQuestionHistory: () => void;
  goToMenu: () => void;
  purchaseItem: (itemId: string) => "ok" | "no_coins" | "already_owned" | "stack_full";
}

const MAX_LIVES      = 3;
const INITIAL_TIMER  = 15;
const MIN_TIMER      = 10;
const TIMER_BONUS    = 4;
const STAGE_LEN      = 4;

function pickQuestion(
  blockedIds: number[],
  course: Course,
  subject: Subject,
  difficulty: "easy" | "medium" | "hard"
): Question | null {
  const pool = courseQuestions.filter(
    (q) =>
      !blockedIds.includes(q.id) &&
      q.course === course &&
      q.subject === subject &&
      q.difficulty === difficulty
  );
  const fallbackPool = courseQuestions.filter(
    (q) => !blockedIds.includes(q.id) && q.course === course && q.subject === subject,
  );
  const available = pool.length ? pool : fallbackPool;
  if (!available.length) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function rememberQuestion(historyIds: number[], question: Question): number[] {
  return historyIds.includes(question.id) ? historyIds : [...historyIds, question.id];
}

function pickNextQuestion(usedIds: number[], historyIds: number[], course: Course, subject: Subject, difficulty: "easy" | "medium" | "hard"): Question | null {
  return pickQuestion([...new Set([...usedIds, ...historyIds])], course, subject, difficulty);
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
      historyQuestionIds: [],
      selectedCategory: "all",
      selectedCourse: "1ro",
      selectedSubject: "Historia",
      lastAnswerCorrect: null,
      lastCorrectAnswer: "",
      timedOut: false,
      timerSeconds: INITIAL_TIMER,
      difficulty: "easy",
      questionsAnswered: 0,
      correctAnswers: 0,
      coins: 0,
      shop: DEFAULT_SHOP,
      activeShield: false,
      lastCoinsEarned: 0,

      startGame: (course, subject) => {
        const { shop } = get();
        const useShield = shop.shieldCount > 0;
        const q = pickQuestion(get().historyQuestionIds, course, subject, "easy");
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
          historyQuestionIds: q ? rememberQuestion(get().historyQuestionIds, q) : get().historyQuestionIds,
          selectedCategory: "all",
          selectedCourse: course,
          selectedSubject: subject,
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          timerSeconds: startTimer(shop),
          difficulty: "easy",
          questionsAnswered: 0,
          correctAnswers: 0,
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
        const newCorrectAnswers = state.correctAnswers + (isCorrect ? 1 : 0);

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
        const advStage   = !isGameOver && newCorrectAnswers > 0 && newCorrectAnswers % STAGE_LEN === 0;
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
          correctAnswers: newCorrectAnswers,
          coins: newCoins,
          lastCoinsEarned: earned,
          activeShield: newShield,
        });
      },

      skipQuestion: () => {
        const state = get();
        if (state.skipsLeft <= 0) return;
        const diff = stageDiff(state.stage);
        const q = pickNextQuestion(state.usedQuestionIds, state.historyQuestionIds, state.selectedCourse, state.selectedSubject, diff);
        if (!q) { set({ phase: "game-over" }); return; }
        set({
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          historyQuestionIds: rememberQuestion(state.historyQuestionIds, q),
          skipsLeft: state.skipsLeft - 1,
          streak: 0,
          difficulty: diff,
        });
      },

      nextQuestion: () => {
        const state = get();
        const diff = stageDiff(state.stage);
        const q = pickNextQuestion(state.usedQuestionIds, state.historyQuestionIds, state.selectedCourse, state.selectedSubject, diff);
        if (!q) { set({ phase: "game-over" }); return; }
        set({
          phase: "playing",
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          historyQuestionIds: rememberQuestion(state.historyQuestionIds, q),
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
        const q = pickNextQuestion(state.usedQuestionIds, state.historyQuestionIds, state.selectedCourse, state.selectedSubject, diff);
        if (!q) { set({ phase: "game-over" }); return; }
        set({
          phase: "playing",
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          historyQuestionIds: rememberQuestion(state.historyQuestionIds, q),
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
          correctAnswers: 0,
          lastCoinsEarned: 0,
        });
      },

      goToMenu: () => set({ phase: "menu" }),

      resetQuestionHistory: () => set({ historyQuestionIds: [], usedQuestionIds: [] }),

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
