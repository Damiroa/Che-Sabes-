import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { Particles } from "./Particles";

export function FeedbackScreen() {
  const store = useGameStore();

  const [isCorrect]    = useState(() => store.lastAnswerCorrect === true);
  const [frozenAnswer] = useState(() => store.lastCorrectAnswer);
  const [frozenStreak] = useState(() => store.streak);
  const [frozenLives]  = useState(() => store.lives);
  const [timedOut]     = useState(() => store.timedOut);
  const [particleTrigger, setParticleTrigger] = useState(0);

  const multiplier  = getStreakMultiplier(frozenStreak);
  const accentColor = isCorrect ? "#16a34a" : "#dc2626";
  const bgColor     = isCorrect ? "rgba(240,253,244,0.93)" : "rgba(254,242,242,0.93)";
  const borderColor = isCorrect ? "rgba(134,239,172,0.8)"  : "rgba(252,165,165,0.8)";

  useEffect(() => {
    if (isCorrect) setParticleTrigger((n) => n + 1);
  }, []);

  return (
    <>
      <Particles trigger={particleTrigger} originX="50%" originY="50%" />

      <motion.div
        style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "56px", padding: "40px 80px",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {/* Status card */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{
            width: 340, flexShrink: 0,
            padding: "2.5rem 2rem",
            borderRadius: "28px",
            background: bgColor,
            backdropFilter: "blur(20px)",
            border: `2.5px solid ${borderColor}`,
            textAlign: "center",
            boxShadow: isCorrect
              ? "0 12px 48px rgba(74,222,128,0.3), 0 0 40px rgba(74,222,128,0.15)"
              : "0 12px 48px rgba(248,113,113,0.3), 0 0 40px rgba(248,113,113,0.15)",
          }}
        >
          <motion.div
            animate={isCorrect ? { rotate: [0, -8, 8, -4, 0], scale: [1, 1.2, 1] } : { x: [0,-6,6,-4,4,-2,0] }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "4.5rem", marginBottom: "0.75rem", lineHeight: 1 }}
          >
            {timedOut ? "⏱️" : isCorrect ? "✅" : "❌"}
          </motion.div>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "2rem", fontWeight: 900, color: accentColor,
            marginBottom: !isCorrect ? "1rem" : 0,
            textShadow: `0 0 20px ${accentColor}60`,
          }}>
            {timedOut ? "¡Tiempo!" : isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
          </p>

          {!isCorrect && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <p style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                Respuesta correcta
              </p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>{frozenAnswer}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Right — details + next */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", maxWidth: 400 }}>
          {/* Lives */}
          {!isCorrect && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ display: "flex", gap: "10px" }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: i < frozenLives ? 1 : 1.4, opacity: i < frozenLives ? 1 : 0.8 }}
                  animate={{ scale: 1, opacity: i < frozenLives ? 1 : 0.2 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  style={{ fontSize: "1.8rem" }}
                >❤️</motion.span>
              ))}
            </motion.div>
          )}

          {/* Streak bonus */}
          {isCorrect && frozenStreak >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15, type: "spring" }}
              style={{
                padding: "0.65rem 1.4rem", borderRadius: "16px",
                background: "rgba(251,191,36,0.2)",
                border: "1.5px solid rgba(251,191,36,0.5)",
              }}
            >
              <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
                🔥 Racha {frozenStreak} — ×{multiplier} bonus activado
              </p>
            </motion.div>
          )}

          {/* Next button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, type: "spring", stiffness: 220 }}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}
            onClick={store.nextQuestion}
            className="neon-btn"
            style={{
              padding: "1.1rem 3.2rem",
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
    </>
  );
}
