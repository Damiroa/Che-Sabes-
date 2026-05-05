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

export interface GameState {
  phase: GamePhase;
  stage: number;           // 1, 2, 3, … (increases every 10 questions)
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
  timerSeconds: number;    // starts 15, -1 per correct answer, min 10
  difficulty: "easy" | "medium" | "hard";
  questionsAnswered: number;

  startGame: (category: Category | "all") => void;
  answerQuestion: (answer: string, timeout?: boolean) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  continueAfterStageUp: () => void;
  resetGame: () => void;
  goToMenu: () => void;
}

const MAX_LIVES = 3;
const INITIAL_SKIPS = 2;
const INITIAL_TIMER = 15;
const MIN_TIMER = 10;
const QUESTIONS_PER_STAGE = 10;

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
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Stage → difficulty mapping
function stageDifficulty(stage: number): "easy" | "medium" | "hard" {
  if (stage === 1) return "easy";
  if (stage === 2) return "medium";
  return "hard";
}

export function getStreakMultiplier(streak: number): number {
  if (streak >= 9) return 4;
  if (streak >= 6) return 3;
  if (streak >= 3) return 2;
  return 1;
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
      skipsLeft: INITIAL_SKIPS,
      currentQuestion: null,
      usedQuestionIds: [],
      selectedCategory: "all",
      lastAnswerCorrect: null,
      lastCorrectAnswer: "",
      timedOut: false,
      timerSeconds: INITIAL_TIMER,
      difficulty: "easy",
      questionsAnswered: 0,

      startGame: (category) => {
        const q = pickQuestion([], category, "easy");
        set({
          phase: "playing",
          stage: 1,
          lives: MAX_LIVES,
          score: 0,
          streak: 0,
          bestStreak: 0,
          skipsLeft: INITIAL_SKIPS,
          currentQuestion: q,
          usedQuestionIds: q ? [q.id] : [],
          selectedCategory: category,
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          timerSeconds: INITIAL_TIMER,
          difficulty: "easy",
          questionsAnswered: 0,
        });
      },

      answerQuestion: (answer, timeout = false) => {
        const state = get();
        const q = state.currentQuestion;
        if (!q) return;

        const isCorrect =
          !timeout &&
          answer.trim().toLowerCase() === q.correct.trim().toLowerCase();

        const newStreak = isCorrect ? state.streak + 1 : 0;
        const multiplier = getStreakMultiplier(isCorrect ? newStreak : state.streak);
        const newScore = state.score + (isCorrect ? q.points * multiplier : 0);
        const newLives = isCorrect ? state.lives : state.lives - 1;
        const newBestStreak = Math.max(state.bestStreak, newStreak);
        const newHighScore = Math.max(state.highScore, newScore);
        const newQuestionsAnswered = state.questionsAnswered + 1;

        // Timer shrinks by 1 per correct answer, floor at MIN_TIMER
        const newTimerSeconds = isCorrect
          ? Math.max(MIN_TIMER, state.timerSeconds - 1)
          : state.timerSeconds;

        const isGameOver = newLives <= 0;

        // Every QUESTIONS_PER_STAGE questions → advance stage (if not game over)
        const shouldAdvanceStage =
          !isGameOver && newQuestionsAnswered % QUESTIONS_PER_STAGE === 0;

        const newStage = shouldAdvanceStage ? state.stage + 1 : state.stage;
        const newDifficulty = stageDifficulty(newStage);

        const nextPhase: GamePhase = isGameOver
          ? "game-over"
          : shouldAdvanceStage
          ? "stage-up"
          : "feedback";

        set({
          phase: nextPhase,
          stage: newStage,
          score: newScore,
          highScore: newHighScore,
          lives: newLives,
          streak: newStreak,
          bestStreak: newBestStreak,
          lastAnswerCorrect: isCorrect,
          lastCorrectAnswer: q.correct,
          timedOut: timeout,
          timerSeconds: newTimerSeconds,
          difficulty: newDifficulty,
          questionsAnswered: newQuestionsAnswered,
        });
      },

      skipQuestion: () => {
        const state = get();
        if (state.skipsLeft <= 0) return;
        const diff = stageDifficulty(state.stage);
        const q = pickQuestion(state.usedQuestionIds, state.selectedCategory, diff);
        if (!q) {
          set({ phase: "game-over" });
          return;
        }
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
        const diff = stageDifficulty(state.stage);
        const q = pickQuestion(state.usedQuestionIds, state.selectedCategory, diff);
        if (!q) {
          set({ phase: "game-over" });
          return;
        }
        set({
          phase: "playing",
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          difficulty: diff,
        });
      },

      continueAfterStageUp: () => {
        const state = get();
        const diff = stageDifficulty(state.stage);
        const q = pickQuestion(state.usedQuestionIds, state.selectedCategory, diff);
        if (!q) {
          set({ phase: "game-over" });
          return;
        }
        set({
          phase: "playing",
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          difficulty: diff,
        });
      },

      resetGame: () => {
        set({
          phase: "category-select",
          stage: 1,
          lives: MAX_LIVES,
          score: 0,
          streak: 0,
          bestStreak: 0,
          skipsLeft: INITIAL_SKIPS,
          currentQuestion: null,
          usedQuestionIds: [],
          lastAnswerCorrect: null,
          lastCorrectAnswer: "",
          timedOut: false,
          timerSeconds: INITIAL_TIMER,
          difficulty: "easy",
          questionsAnswered: 0,
        });
      },

      goToMenu: () => set({ phase: "menu" }),
    }),
    {
      name: "che-sabes-store",
      partialize: (state) => ({ highScore: state.highScore }),
    }
  )
);
