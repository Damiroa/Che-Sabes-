import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../data/questions";

const TIMER_SECONDS = 15;

export function GameScreen() {
  const { lives, score, streak, skipsLeft, currentQuestion, answerQuestion, skipQuestion } = useGameStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shortInput, setShortInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const answeredRef = useRef(false);

  // Reset + start timer when question changes
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
    setSelectedAnswer(null);
    setShortInput("");
    answeredRef.current = false;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (!answeredRef.current) {
            answeredRef.current = true;
            answerQuestion("", true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestion?.id]);

  if (!currentQuestion) return null;

  const catColor = CATEGORY_COLORS[currentQuestion.category];
  const multiplier = getStreakMultiplier(streak);

  const handleAnswer = (ans: string) => {
    if (selectedAnswer || answeredRef.current) return;
    answeredRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(ans);
    setTimeout(() => {
      answerQuestion(ans);
    }, 300);
  };

  const diffColor = { easy: "#16a34a", medium: "#d97706", hard: "#dc2626" }[currentQuestion.difficulty];
  const diffLabel = { easy: "Fácil", medium: "Medio", hard: "Difícil" }[currentQuestion.difficulty];
  const catLabel = {
    genius: "Genio", entertainment: "Entretenimiento",
    sports: "Deportes", culture: "Cultura Pop", random: "Random",
  }[currentQuestion.category];

  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timeLeft > 8 ? "#16a34a" : timeLeft > 4 ? "#d97706" : "#dc2626";

  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 pt-5 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{ background: "#f7f8fc" }}
    >
      {/* HUD */}
      <div className="flex items-center justify-between mb-4">
        {/* Lives */}
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ opacity: i < lives ? 1 : 0.18, scale: i < lives ? 1 : 0.8 }}
              transition={{ type: "spring", stiffness: 280 }}
              style={{ fontSize: "1.1rem" }}
            >
              ❤️
            </motion.span>
          ))}
        </div>

        {/* Score */}
        <AnimatePresence mode="wait">
          <motion.span
            key={score}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.3rem", fontWeight: 900,
              color: "#0f172a", letterSpacing: "-0.02em",
            }}
          >
            {score.toLocaleString()}
          </motion.span>
        </AnimatePresence>

        {/* Skip */}
        <button
          onClick={skipQuestion}
          disabled={skipsLeft <= 0}
          style={{
            fontSize: "0.7rem", fontWeight: 700,
            color: skipsLeft > 0 ? "#64748b" : "#cbd5e1",
            background: "transparent", border: "none",
            cursor: skipsLeft > 0 ? "pointer" : "default",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}
        >
          Skip {skipsLeft > 0 ? `(${skipsLeft})` : "—"}
        </button>
      </div>

      {/* Timer bar */}
      <div style={{
        width: "100%", height: "5px", borderRadius: "999px",
        background: "#e2e8f0", marginBottom: "1rem", overflow: "hidden",
      }}>
        <motion.div
          animate={{ width: `${timerPct}%`, backgroundColor: timerColor }}
          transition={{ duration: 0.5, ease: "linear" }}
          style={{ height: "100%", borderRadius: "999px" }}
        />
      </div>

      {/* Timer + streak row */}
      <div className="flex items-center justify-between mb-4">
        {/* Timer number */}
        <motion.span
          key={timeLeft}
          initial={{ scale: timeLeft <= 5 ? 1.3 : 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1rem", fontWeight: 900,
            color: timerColor,
            letterSpacing: "-0.02em",
            minWidth: "2.5rem",
          }}
        >
          {timeLeft}s
        </motion.span>

        {/* Streak */}
        <AnimatePresence>
          {streak >= 3 && (
            <motion.span
              key="streak"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                fontSize: "0.75rem", fontWeight: 700, color: "#92400e",
                background: "#fef9c3", border: "1.5px solid #fde68a",
                borderRadius: "999px", padding: "2px 10px",
              }}
            >
              🔥 {streak} racha ×{multiplier}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Diff + pts */}
        <span style={{ fontSize: "0.73rem", color: diffColor, fontWeight: 700 }}>
          {diffLabel} · +{currentQuestion.points * multiplier}pts
        </span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex-1 flex flex-col"
        >
          {/* Category */}
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: catColor, marginBottom: "0.75rem", letterSpacing: "0.04em" }}>
            {CATEGORY_ICONS[currentQuestion.category]} {catLabel.toUpperCase()}
          </p>

          {/* Question text */}
          <div style={{
            background: "#fff",
            border: "1.5px solid #e2e8f0",
            borderRadius: "16px",
            padding: "1.1rem 1rem",
            marginBottom: "1.1rem",
            boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
          }}>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.1rem", fontWeight: 600,
              color: "#0f172a", lineHeight: 1.48,
            }}>
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          {currentQuestion.type !== "short" && currentQuestion.options && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                      fontSize: "0.93rem", fontWeight: 600,
                      color: isSelected ? "#fff" : "#1e293b",
                      background: isSelected ? "#0f172a" : "#fff",
                      border: `1.5px solid ${isSelected ? "#0f172a" : "#e2e8f0"}`,
                      cursor: selectedAnswer ? "default" : "pointer",
                      boxShadow: isSelected ? "none" : "0 1px 3px rgba(15,23,42,0.05)",
                      transition: "background 0.1s, border 0.1s, color 0.1s",
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
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <input
                type="text"
                value={shortInput}
                onChange={(e) => setShortInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && shortInput.trim() && handleAnswer(shortInput.trim())}
                placeholder="Tu respuesta..."
                autoFocus
                style={{
                  width: "100%", padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  background: "#fff", border: "1.5px solid #e2e8f0",
                  color: "#0f172a", fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.93rem", outline: "none",
                  boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
                }}
              />
              <button
                onClick={() => shortInput.trim() && handleAnswer(shortInput.trim())}
                disabled={!shortInput.trim() || !!selectedAnswer}
                style={{
                  padding: "0.85rem", borderRadius: "12px",
                  background: "#0f172a", color: "#fff",
                  fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.93rem",
                  opacity: !shortInput.trim() ? 0.35 : 1,
                  cursor: shortInput.trim() ? "pointer" : "default", border: "none",
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
