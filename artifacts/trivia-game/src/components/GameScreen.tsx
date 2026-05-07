import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../data/questions";

export function GameScreen() {
  const {
    lives, score, streak, skipsLeft, stage,
    currentQuestion, timerSeconds,
    answerQuestion, skipQuestion,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shortInput, setShortInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const answeredRef = useRef(false);

  useEffect(() => {
    setTimeLeft(timerSeconds);
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

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQuestion?.id, timerSeconds]);

  if (!currentQuestion) return null;

  const catColor = CATEGORY_COLORS[currentQuestion.category];
  const multiplier = getStreakMultiplier(streak);
  const diffColor = { easy: "#22c55e", medium: "#f59e0b", hard: "#ef4444" }[currentQuestion.difficulty];
  const diffLabel = { easy: "Fácil", medium: "Medio", hard: "Difícil" }[currentQuestion.difficulty];
  const catLabel = {
    genius: "Modo Genio", entertainment: "Entretenimiento",
    sports: "Deportes", culture: "Cultura Pop", random: "Random",
  }[currentQuestion.category];

  const timerPct = (timeLeft / timerSeconds) * 100;
  const timerColor = timeLeft > 8 ? "#22c55e" : timeLeft > 4 ? "#f59e0b" : "#ef4444";

  const handleAnswer = (ans: string) => {
    if (selectedAnswer || answeredRef.current) return;
    answeredRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(ans);
    setTimeout(() => { answerQuestion(ans); }, 300);
  };

  const isMC = currentQuestion.type !== "short" && currentQuestion.options;
  const options = currentQuestion.options ?? [];

  return (
    <motion.div
      style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        padding: "0",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* ── Top HUD bar ─────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "16px 48px",
        gap: "20px",
        background: "rgba(0,0,0,0.12)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.18)",
        flexShrink: 0,
      }}>
        {/* Lives */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ opacity: i < lives ? 1 : 0.2, scale: i < lives ? 1 : 0.75 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ fontSize: "1.4rem" }}
            >
              ❤️
            </motion.span>
          ))}
        </div>

        {/* Phase */}
        <div style={{
          padding: "5px 16px", borderRadius: "999px",
          background: "rgba(255,255,255,0.22)",
          border: "1.5px solid rgba(255,255,255,0.4)",
        }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
            FASE {stage}
          </span>
        </div>

        {/* Diff badge */}
        <span style={{
          fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.9)",
          background: `${diffColor}35`, padding: "4px 12px", borderRadius: "999px",
          border: `1.5px solid ${diffColor}70`,
        }}>
          {diffLabel}
        </span>

        {/* Streak */}
        <AnimatePresence>
          {streak >= 3 && (
            <motion.span
              key="streak"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                fontSize: "0.8rem", fontWeight: 700, color: "#fff",
                background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                borderRadius: "999px", padding: "4px 12px",
              }}
            >
              🔥 {streak} racha ×{multiplier}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Timer bar */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            flex: 1, height: "8px", borderRadius: "999px",
            background: "rgba(255,255,255,0.25)", overflow: "hidden",
          }}>
            <motion.div
              animate={{ width: `${timerPct}%`, backgroundColor: timerColor }}
              transition={{ duration: 0.6, ease: "linear" }}
              style={{ height: "100%", borderRadius: "999px" }}
            />
          </div>
          <motion.span
            key={timeLeft}
            initial={{ scale: timeLeft <= 5 ? 1.35 : 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.12 }}
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900,
              color: timeLeft <= 5 ? "#fef08a" : "#fff", minWidth: "3rem", textAlign: "right",
              textShadow: timeLeft <= 5 ? "0 0 16px rgba(254,240,138,0.7)" : "none",
            }}
          >
            {timeLeft}s
          </motion.span>
        </div>

        {/* Score + skip */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={score}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.14 }}
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 900,
                color: "#fff", letterSpacing: "-0.02em",
                textShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              {score.toLocaleString()}
            </motion.span>
          </AnimatePresence>

          <button
            onClick={skipQuestion}
            disabled={skipsLeft <= 0}
            style={{
              fontSize: "0.74rem", fontWeight: 700,
              color: skipsLeft > 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)",
              background: "transparent", border: "none",
              cursor: skipsLeft > 0 ? "pointer" : "default",
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}
          >
            Skip {skipsLeft > 0 ? `(${skipsLeft})` : "—"}
          </button>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────── */}
      <div style={{
        flex: 1, display: "flex", gap: "0",
        padding: "32px 48px", gap: "40px",
        overflow: "hidden",
      }}>
        {/* Left — Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id + "-q"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <p style={{
              fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.9)",
              marginBottom: "1rem", letterSpacing: "0.06em", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 32, height: 32, borderRadius: "8px",
                background: `${catColor}30`, fontSize: "1rem",
              }}>
                {CATEGORY_ICONS[currentQuestion.category]}
              </span>
              {catLabel}
              <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 4 }}>
                · +{currentQuestion.points * multiplier} pts
              </span>
            </p>

            <div style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px)",
              border: "2px solid rgba(255,255,255,0.98)",
              borderRadius: "24px",
              padding: "2rem 2.2rem",
              boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.35rem", fontWeight: 600,
                color: "#0f172a", lineHeight: 1.55,
              }}>
                {currentQuestion.question}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right — Answers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id + "-a"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            style={{
              flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px",
            }}
          >
            {isMC && options.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              return (
                <motion.button
                  key={opt}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  whileHover={!selectedAnswer ? { scale: 1.02, x: 4 } : {}}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selectedAnswer}
                  style={{
                    padding: "1rem 1.4rem",
                    borderRadius: "16px",
                    textAlign: "left",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem", fontWeight: 600,
                    color: isSelected ? "#fff" : "#1e293b",
                    background: isSelected ? "#0369a1" : "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(8px)",
                    border: `2px solid ${isSelected ? "#0369a1" : "rgba(255,255,255,0.95)"}`,
                    cursor: selectedAnswer ? "default" : "pointer",
                    boxShadow: isSelected ? "0 6px 24px rgba(3,105,161,0.4)" : "0 2px 12px rgba(0,0,0,0.08)",
                    transition: "background 0.12s, border 0.12s, color 0.12s",
                    display: "flex", alignItems: "center", gap: "12px",
                  }}
                >
                  <span style={{
                    width: 28, height: 28, borderRadius: "8px",
                    background: isSelected ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.78rem", fontWeight: 900, flexShrink: 0,
                    color: isSelected ? "#fff" : "#64748b",
                  }}>
                    {["A", "B", "C", "D"][idx]}
                  </span>
                  {opt}
                </motion.button>
              );
            })}

            {currentQuestion.type === "short" && (
              <>
                <input
                  type="text"
                  value={shortInput}
                  onChange={(e) => setShortInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && shortInput.trim() && handleAnswer(shortInput.trim())}
                  placeholder="Escribí tu respuesta..."
                  autoFocus
                  style={{
                    width: "100%", padding: "1rem 1.4rem", borderRadius: "16px",
                    background: "rgba(255,255,255,0.92)", border: "2px solid rgba(255,255,255,0.98)",
                    color: "#0f172a", fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem", outline: "none",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <button
                  onClick={() => shortInput.trim() && handleAnswer(shortInput.trim())}
                  disabled={!shortInput.trim() || !!selectedAnswer}
                  style={{
                    padding: "1rem 1.4rem", borderRadius: "16px",
                    background: "#0369a1", color: "#fff",
                    fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1rem",
                    opacity: !shortInput.trim() ? 0.35 : 1,
                    cursor: shortInput.trim() ? "pointer" : "default", border: "none",
                    boxShadow: "0 4px 20px rgba(3,105,161,0.4)",
                  }}
                >
                  Confirmar →
                </button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
