import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";

export function FeedbackScreen() {
  const store = useGameStore();

  // Freeze values at mount time so exit animation doesn't flash wrong state
  const [isCorrect] = useState(() => store.lastAnswerCorrect === true);
  const [frozenAnswer] = useState(() => store.lastCorrectAnswer);
  const [frozenStreak] = useState(() => store.streak);
  const [frozenLives] = useState(() => store.lives);

  const multiplier = getStreakMultiplier(frozenStreak);
  const accentColor = isCorrect ? "#22c55e" : "#ef4444";

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      {/* Status icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className="mb-5"
        style={{
          width: 72, height: 72, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isCorrect ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
          border: `1.5px solid ${accentColor}44`,
        }}
      >
        <span style={{ fontSize: "2rem" }}>{isCorrect ? "✓" : "✕"}</span>
      </motion.div>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.6rem",
          fontWeight: 800,
          color: accentColor,
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em",
        }}
      >
        {isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
      </motion.p>

      {/* Wrong answer: show correct */}
      {!isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <p style={{ fontSize: "0.8rem", color: "#475569", marginBottom: "4px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Respuesta correcta
          </p>
          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e2e8f0" }}>{frozenAnswer}</p>
        </motion.div>
      )}

      {/* Lives remaining after wrong */}
      {!isCorrect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} style={{ fontSize: "1.2rem", opacity: i < frozenLives ? 1 : 0.18 }}>❤️</span>
          ))}
        </motion.div>
      )}

      {/* Streak bonus */}
      {isCorrect && frozenStreak >= 3 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.14, type: "spring", stiffness: 260 }}
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#facc15",
            marginBottom: "1.5rem",
          }}
        >
          🔥 Racha {frozenStreak} — ×{multiplier} bonus
        </motion.p>
      )}

      {/* Next button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, type: "spring", stiffness: 200 }}
        whileTap={{ scale: 0.97 }}
        onClick={store.nextQuestion}
        style={{
          width: "100%", maxWidth: "280px",
          padding: "1rem 0",
          borderRadius: "14px",
          background: "rgba(124,58,237,0.9)",
          color: "#fff",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          border: "none",
          cursor: "pointer",
        }}
      >
        Siguiente →
      </motion.button>
    </motion.div>
  );
}
