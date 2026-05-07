import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";

export function FeedbackScreen() {
  const store = useGameStore();

  const [isCorrect]    = useState(() => store.lastAnswerCorrect === true);
  const [frozenAnswer] = useState(() => store.lastCorrectAnswer);
  const [frozenStreak] = useState(() => store.streak);
  const [frozenLives]  = useState(() => store.lives);
  const [timedOut]     = useState(() => store.timedOut);

  const multiplier  = getStreakMultiplier(frozenStreak);
  const accentColor = isCorrect ? "#16a34a" : "#dc2626";
  const bgColor     = isCorrect ? "rgba(240,253,244,0.92)" : "rgba(254,242,242,0.92)";
  const borderColor = isCorrect ? "rgba(187,247,208,0.9)" : "rgba(254,202,202,0.9)";

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      {/* Status card */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{
          width: "100%", maxWidth: "300px",
          padding: "1.6rem",
          borderRadius: "22px",
          background: bgColor,
          backdropFilter: "blur(16px)",
          border: `2px solid ${borderColor}`,
          marginBottom: "1.25rem",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
          {timedOut ? "⏱️" : isCorrect ? "✅" : "❌"}
        </div>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.6rem", fontWeight: 900,
          color: accentColor,
          marginBottom: timedOut || !isCorrect ? "0.75rem" : 0,
          letterSpacing: "-0.02em",
        }}>
          {timedOut ? "¡Tiempo!" : isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
        </p>

        {!isCorrect && (
          <>
            <p style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
              Respuesta correcta
            </p>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>{frozenAnswer}</p>
          </>
        )}
      </motion.div>

      {/* Lives */}
      {!isCorrect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 mb-4"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} style={{ fontSize: "1.5rem", opacity: i < frozenLives ? 1 : 0.2 }}>❤️</span>
          ))}
        </motion.div>
      )}

      {/* Streak */}
      {isCorrect && frozenStreak >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, type: "spring" }}
          style={{
            padding: "0.45rem 1.1rem",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.25)",
            border: "1.5px solid rgba(255,255,255,0.45)",
            marginBottom: "1rem",
          }}
        >
          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>
            🔥 Racha {frozenStreak} — ×{multiplier} bonus
          </p>
        </motion.div>
      )}

      {/* Next button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        whileTap={{ scale: 0.97 }}
        onClick={store.nextQuestion}
        style={{
          width: "100%", maxWidth: "280px",
          padding: "1.05rem 0",
          borderRadius: "16px",
          background: "#fff",
          color: "#0369a1",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.05rem", fontWeight: 900,
          letterSpacing: "0.04em",
          border: "none", cursor: "pointer",
          boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
        }}
      >
        Siguiente →
      </motion.button>
    </motion.div>
  );
}
