import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS, CATEGORY_LABELS } from "../data/questions";

export function GameScreen() {
  const {
    lives,
    score,
    streak,
    skipsLeft,
    currentQuestion,
    answerQuestion,
    skipQuestion,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shortInput, setShortInput] = useState("");

  if (!currentQuestion) return null;

  const catColor = CATEGORY_COLORS[currentQuestion.category];
  const catIcon = CATEGORY_ICONS[currentQuestion.category];
  const catLabel = CATEGORY_LABELS[currentQuestion.category];
  const multiplier = getStreakMultiplier(streak);

  const handleAnswer = (ans: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(ans);
    setTimeout(() => {
      answerQuestion(ans);
      setSelectedAnswer(null);
      setShortInput("");
    }, 400);
  };

  const handleShortSubmit = () => {
    if (!shortInput.trim()) return;
    handleAnswer(shortInput.trim());
  };

  const difficultyLabel = {
    easy: { label: "Fácil", color: "#22c55e" },
    medium: { label: "Medio", color: "#f59e0b" },
    hard: { label: "Difícil", color: "#ef4444" },
  }[currentQuestion.difficulty];

  return (
    <motion.div
      className="flex flex-col min-h-screen px-4 pt-6 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* HUD */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ scale: i < lives ? 1 : 0.7, opacity: i < lives ? 1 : 0.25 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-2xl"
            >
              ❤️
            </motion.span>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={score}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="text-2xl font-black"
              style={{ color: "#e2e8f0" }}
            >
              {score.toLocaleString()}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs" style={{ color: "#64748b" }}>puntos</span>
        </div>

        <div className="flex flex-col items-end">
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: "rgba(250,204,21,0.15)", color: "#facc15", border: "1px solid rgba(250,204,21,0.3)" }}
            >
              🔥 ×{multiplier} racha {streak}
            </motion.div>
          )}
          <button
            onClick={skipQuestion}
            disabled={skipsLeft <= 0}
            className="mt-1 text-xs font-semibold px-3 py-1 rounded-full transition-all disabled:opacity-30"
            style={{ background: "rgba(100,116,139,0.2)", color: "#94a3b8" }}
          >
            Skip ({skipsLeft})
          </button>
        </div>
      </div>

      {/* Category badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={{
            background: `${catColor}22`,
            color: catColor,
            border: `1px solid ${catColor}44`,
          }}
        >
          {catIcon} {catLabel}
        </span>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-bold"
          style={{
            background: `${difficultyLabel.color}22`,
            color: difficultyLabel.color,
            border: `1px solid ${difficultyLabel.color}44`,
          }}
        >
          {difficultyLabel.label} · +{currentQuestion.points * multiplier}pts
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="flex-1 flex flex-col"
        >
          <div
            className="rounded-2xl p-6 mb-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-xl font-bold leading-snug" style={{ color: "#e2e8f0" }}>
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          {currentQuestion.type !== "short" && currentQuestion.options && (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selectedAnswer}
                  className="py-4 px-5 rounded-2xl text-left font-semibold text-base transition-all duration-150"
                  style={{
                    background:
                      selectedAnswer === opt
                        ? `${catColor}33`
                        : "rgba(255,255,255,0.05)",
                    border:
                      selectedAnswer === opt
                        ? `2px solid ${catColor}`
                        : "1.5px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                    transform: selectedAnswer === opt ? "scale(0.98)" : "scale(1)",
                  }}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* Short answer */}
          {currentQuestion.type === "short" && (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={shortInput}
                onChange={(e) => setShortInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleShortSubmit()}
                placeholder="Escribe tu respuesta..."
                className="w-full py-4 px-5 rounded-2xl text-base outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  color: "#e2e8f0",
                }}
                autoFocus
              />
              <button
                onClick={handleShortSubmit}
                disabled={!shortInput.trim() || !!selectedAnswer}
                className="py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-40"
                style={{ background: catColor, color: "#fff" }}
              >
                Confirmar →
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
