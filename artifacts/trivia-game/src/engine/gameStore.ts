import { create } from "zustand";
import { persist } from "zustand/middleware";
import { questions, Question, Category } from "../data/questions";

export type GamePhase = "menu" | "category-select" | "playing" | "feedback" | "game-over";

export interface GameState {
  phase: GamePhase;
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
  difficulty: "easy" | "medium" | "hard";
  questionsAnswered: number;

  startGame: (category: Category | "all") => void;
  answerQuestion: (answer: string, timeout?: boolean) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  resetGame: () => void;
  goToMenu: () => void;
}

const MAX_LIVES = 3;
const INITIAL_SKIPS = 2;

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

function getDifficulty(questionsAnswered: number): "easy" | "medium" | "hard" {
  if (questionsAnswered < 5) return "easy";
  if (questionsAnswered < 12) return "medium";
  return "hard";
}

function getStreakMultiplier(streak: number): number {
  if (streak >= 9) return 4;
  if (streak >= 6) return 3;
  if (streak >= 3) return 2;
  return 1;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: "menu",
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
      difficulty: "easy",
      questionsAnswered: 0,

      startGame: (category) => {
        const difficulty = "easy";
        const q = pickQuestion([], category, difficulty);
        set({
          phase: "playing",
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
          difficulty,
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
        const basePoints = isCorrect ? q.points * multiplier : 0;
        const newScore = state.score + basePoints;
        const newLives = isCorrect ? state.lives : state.lives - 1;
        const newBestStreak = Math.max(state.bestStreak, newStreak);
        const newHighScore = Math.max(state.highScore, newScore);
        const newQuestionsAnswered = state.questionsAnswered + 1;
        const newDifficulty = getDifficulty(newQuestionsAnswered);
        const isGameOver = newLives <= 0;

        set({
          phase: isGameOver ? "game-over" : "feedback",
          score: newScore,
          highScore: newHighScore,
          lives: newLives,
          streak: newStreak,
          bestStreak: newBestStreak,
          lastAnswerCorrect: isCorrect,
          lastCorrectAnswer: q.correct,
          timedOut: timeout,
          difficulty: newDifficulty,
          questionsAnswered: newQuestionsAnswered,
        });
      },

      skipQuestion: () => {
        const state = get();
        if (state.skipsLeft <= 0) return;
        const newDifficulty = getDifficulty(state.questionsAnswered);
        const q = pickQuestion(state.usedQuestionIds, state.selectedCategory, newDifficulty);
        if (!q) {
          set({ phase: "game-over" });
          return;
        }
        set({
          currentQuestion: q,
          usedQuestionIds: [...state.usedQuestionIds, q.id],
          skipsLeft: state.skipsLeft - 1,
          streak: 0,
          difficulty: newDifficulty,
        });
      },

      nextQuestion: () => {
        const state = get();
        const newDifficulty = getDifficulty(state.questionsAnswered);
        const q = pickQuestion(state.usedQuestionIds, state.selectedCategory, newDifficulty);
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
          difficulty: newDifficulty,
        });
      },

      resetGame: () => {
        set({
          phase: "category-select",
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

export { getStreakMultiplier };
