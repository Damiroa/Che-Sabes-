import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { Particles } from "./Particles";
import { useBreakpoint } from "../hooks/useBreakpoint";

export function FeedbackScreen() {
  const store = useGameStore();
  const { isMobile, isTablet } = useBreakpoint();

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
  const cardShadow  = isCorrect ? "0 12px 48px rgba(74,222,128,0.28)" : "0 12px 48px rgba(248,113,113,0.28)";

  useEffect(() => { if (isCorrect) setParticleTrigger(n => n + 1); }, []);

  const StatusCard = ({ compact = false }) => (
    <motion.div
      initial={{ scale: 0.78, opacity: 0, rotate: -2 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      style={{
        padding: compact ? "1.5rem 1.4rem" : "2.5rem 2rem",
        borderRadius: "24px",
        background: bgColor, backdropFilter: "blur(20px)",
        border: `2.5px solid ${borderColor}`, textAlign: "center",
        boxShadow: cardShadow,
        width: compact ? "100%" : 340, flexShrink: 0,
      }}
    >
      <motion.div
        animate={isCorrect ? { rotate: [0,-8,8,-4,0], scale: [1,1.2,1] } : { x: [0,-6,6,-4,4,-2,0] }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ fontSize: compact ? "3rem" : "4.5rem", marginBottom: "0.65rem", lineHeight: 1 }}
      >
        {timedOut ? "⏱️" : isCorrect ? "✅" : "❌"}
      </motion.div>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: compact ? "1.6rem" : "2rem", fontWeight: 900, color: accentColor, marginBottom: !isCorrect ? "0.85rem" : 0, textShadow: `0 0 20px ${accentColor}60` }}>
        {timedOut ? "¡Tiempo!" : isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
      </p>
      {!isCorrect && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <p style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "5px" }}>Respuesta correcta</p>
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>{frozenAnswer}</p>
        </motion.div>
      )}
    </motion.div>
  );

  const NextButton = () => (
    <motion.button
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22, type: "spring", stiffness: 200 }}
      whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04 }}
      onClick={store.nextQuestion}
      className="neon-btn"
      style={{
        padding: isMobile ? "1rem" : "1.1rem 3.2rem",
        width: isMobile ? "100%" : "auto",
        borderRadius: "18px", background: "#fff", color: "#0369a1",
        fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900,
        letterSpacing: "0.03em", border: "none", cursor: "pointer",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}
    >Siguiente →</motion.button>
  );

  /* ── Mobile ──────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <Particles trigger={particleTrigger} originX="50%" originY="40%" />
        <motion.div
          style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", gap: "16px", overflowY: "auto" }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
        >
          <StatusCard compact />
          {!isCorrect && (
            <div style={{ display: "flex", gap: "8px" }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 1.3 }} animate={{ scale: 1, opacity: i < frozenLives ? 1 : 0.2 }} transition={{ delay: i * 0.1, type: "spring" }} style={{ fontSize: "1.5rem" }}>❤️</motion.span>
              ))}
            </div>
          )}
          {isCorrect && frozenStreak >= 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, type: "spring" }}
              style={{ padding: "0.5rem 1.2rem", borderRadius: "999px", background: "rgba(251,191,36,0.2)", border: "1.5px solid rgba(251,191,36,0.5)" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>🔥 Racha {frozenStreak} — ×{multiplier}</p>
            </motion.div>
          )}
          <NextButton />
        </motion.div>
      </>
    );
  }

  /* ── Tablet ──────────────────────────────────────────────── */
  if (isTablet) {
    return (
      <>
        <Particles trigger={particleTrigger} originX="50%" originY="50%" />
        <motion.div
          style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 48px", gap: "20px" }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
        >
          <StatusCard />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
            {!isCorrect && (
              <div style={{ display: "flex", gap: "10px" }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.span key={i} initial={{ scale: 1.3 }} animate={{ scale: 1, opacity: i < frozenLives ? 1 : 0.2 }} transition={{ delay: i * 0.1 }} style={{ fontSize: "1.6rem" }}>❤️</motion.span>
                ))}
              </div>
            )}
            {isCorrect && frozenStreak >= 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, type: "spring" }}
                style={{ padding: "0.55rem 1.4rem", borderRadius: "999px", background: "rgba(251,191,36,0.2)", border: "1.5px solid rgba(251,191,36,0.5)" }}>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>🔥 Racha {frozenStreak} — ×{multiplier}</p>
              </motion.div>
            )}
            <NextButton />
          </div>
        </motion.div>
      </>
    );
  }

  /* ── Desktop ─────────────────────────────────────────────── */
  return (
    <>
      <Particles trigger={particleTrigger} originX="50%" originY="50%" />
      <motion.div
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "56px", padding: "40px 80px" }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      >
        <StatusCard />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", maxWidth: 400 }}>
          {!isCorrect && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: "flex", gap: "10px" }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: i < frozenLives ? 1 : 1.4 }} animate={{ scale: 1, opacity: i < frozenLives ? 1 : 0.2 }} transition={{ delay: i * 0.1, type: "spring" }} style={{ fontSize: "1.8rem" }}>❤️</motion.span>
              ))}
            </motion.div>
          )}
          {isCorrect && frozenStreak >= 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.15, type: "spring" }}
              style={{ padding: "0.65rem 1.4rem", borderRadius: "16px", background: "rgba(251,191,36,0.2)", border: "1.5px solid rgba(251,191,36,0.5)" }}>
              <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>🔥 Racha {frozenStreak} — ×{multiplier} bonus</p>
            </motion.div>
          )}
          <NextButton />
        </div>
      </motion.div>
    </>
  );
}
