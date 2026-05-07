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
      style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "60px", padding: "40px 80px",
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      {/* Status card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
        style={{
          width: 340,
          flexShrink: 0,
          padding: "2.5rem 2rem",
          borderRadius: "28px",
          background: bgColor,
          backdropFilter: "blur(20px)",
          border: `2.5px solid ${borderColor}`,
          textAlign: "center",
          boxShadow: "0 12px 48px rgba(0,0,0,0.14)",
        }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "0.75rem" }}>
          {timedOut ? "⏱️" : isCorrect ? "✅" : "❌"}
        </div>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "2rem", fontWeight: 900,
          color: accentColor, letterSpacing: "-0.02em",
          marginBottom: !isCorrect ? "1rem" : 0,
        }}>
          {timedOut ? "¡Tiempo!" : isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
        </p>

        {!isCorrect && (
          <>
            <p style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
              Respuesta correcta
            </p>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>{frozenAnswer}</p>
          </>
        )}
      </motion.div>

      {/* Right — detail + actions */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", maxWidth: 400 }}>
        {/* Lives */}
        {!isCorrect && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            style={{ display: "flex", gap: "10px" }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} style={{ fontSize: "1.8rem", opacity: i < frozenLives ? 1 : 0.2 }}>❤️</span>
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
              padding: "0.55rem 1.25rem", borderRadius: "999px",
              background: "rgba(255,255,255,0.25)",
              border: "1.5px solid rgba(255,255,255,0.45)",
            }}
          >
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
              🔥 Racha {frozenStreak} — ×{multiplier} bonus
            </p>
          </motion.div>
        )}

        {/* Next button */}
        <motion.button
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          onClick={store.nextQuestion}
          style={{
            padding: "1.1rem 3rem",
            borderRadius: "18px",
            background: "#fff",
            color: "#0369a1",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.15rem", fontWeight: 900,
            letterSpacing: "0.03em",
            border: "none", cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
        >
          Siguiente →
        </motion.button>
      </div>
    </motion.div>
  );
}
