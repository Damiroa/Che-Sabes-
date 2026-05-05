import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../data/questions";

export function GameScreen() {
  const { lives, score, streak, skipsLeft, currentQuestion, answerQuestion, skipQuestion } = useGameStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shortInput, setShortInput] = useState("");

  if (!currentQuestion) return null;

  const catColor = CATEGORY_COLORS[currentQuestion.category];
  const multiplier = getStreakMultiplier(streak);

  const handleAnswer = (ans: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(ans);
    setTimeout(() => {
      answerQuestion(ans);
      setSelectedAnswer(null);
      setShortInput("");
    }, 300);
  };

  const diffColor = { easy: "#22c55e", medium: "#f59e0b", hard: "#ef4444" }[currentQuestion.difficulty];
  const diffLabel = { easy: "Fácil", medium: "Medio", hard: "Difícil" }[currentQuestion.difficulty];
  const catLabel = {
    genius: "Genio", entertainment: "Entretenimiento",
    sports: "Deportes", culture: "Cultura Pop", random: "Random",
  }[currentQuestion.category];

  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 pt-5 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* HUD */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ opacity: i < lives ? 1 : 0.15, scale: i < lives ? 1 : 0.8 }}
              transition={{ type: "spring", stiffness: 280 }}
              style={{ fontSize: "1.1rem" }}
            >
              ❤️
            </motion.span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.span
            key={score}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.35rem",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            {score.toLocaleString()}
          </motion.span>
        </AnimatePresence>

        <button
          onClick={skipQuestion}
          disabled={skipsLeft <= 0}
          style={{
            fontSize: "0.7rem", fontWeight: 700,
            color: skipsLeft > 0 ? "#3b82f6" : "#1e2d45",
            background: "transparent",
            border: "none",
            cursor: skipsLeft > 0 ? "pointer" : "default",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Skip {skipsLeft > 0 ? `(${skipsLeft})` : "—"}
        </button>
      </div>

      {/* Streak */}
      <AnimatePresence>
        {streak >= 3 && (
          <motion.div
            key="streak"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: "0.75rem" }}
          >
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#facc15", letterSpacing: "0.06em" }}>
              🔥 RACHA {streak} — ×{multiplier} puntos
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex-1 flex flex-col"
        >
          {/* Meta */}
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: catColor }}>
              {CATEGORY_ICONS[currentQuestion.category]} {catLabel}
            </span>
            <span style={{ color: "#1e2d45", fontSize: "0.75rem" }}>·</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: diffColor }}>{diffLabel}</span>
            <span style={{ fontSize: "0.73rem", color: "#1e2d45", marginLeft: "auto" }}>
              +{currentQuestion.points * multiplier} pts
            </span>
          </div>

          {/* Question */}
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "#eef2ff",
            lineHeight: 1.48,
            marginBottom: "1.5rem",
          }}>
            {currentQuestion.question}
          </p>

          {/* Options */}
          {currentQuestion.type !== "short" && currentQuestion.options && (
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                return (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!selectedAnswer}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "12px",
                      textAlign: "left",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.94rem",
                      fontWeight: 600,
                      color: isSelected ? "#fff" : "#93c5fd",
                      background: isSelected ? "#1d6fe8" : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${isSelected ? "#3b82f6" : "rgba(255,255,255,0.07)"}`,
                      cursor: selectedAnswer ? "default" : "pointer",
                      transition: "background 0.1s, border 0.1s",
                    }}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Short answer */}
          {currentQuestion.type === "short" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              <input
                type="text"
                value={shortInput}
                onChange={(e) => setShortInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && shortInput.trim() && handleAnswer(shortInput.trim())}
                placeholder="Tu respuesta..."
                autoFocus
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                  color: "#eef2ff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.94rem",
                  outline: "none",
                }}
              />
              <button
                onClick={() => shortInput.trim() && handleAnswer(shortInput.trim())}
                disabled={!shortInput.trim() || !!selectedAnswer}
                style={{
                  padding: "0.85rem",
                  borderRadius: "12px",
                  background: "#1d6fe8",
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.94rem",
                  opacity: !shortInput.trim() ? 0.35 : 1,
                  cursor: shortInput.trim() ? "pointer" : "default",
                  border: "none",
                }}
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
