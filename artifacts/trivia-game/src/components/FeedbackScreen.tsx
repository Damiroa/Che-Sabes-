import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { Particles } from "./Particles";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";

export function FeedbackScreen() {
  const store = useGameStore();
  const { isMobile, isTablet } = useBreakpoint();

  const [isCorrect]      = useState(() => store.lastAnswerCorrect === true);
  const [frozenAnswer]   = useState(() => store.lastCorrectAnswer);
  const [frozenStreak]   = useState(() => store.streak);
  const [frozenLives]    = useState(() => store.lives);
  const [timedOut]       = useState(() => store.timedOut);
  const [frozenCoins]    = useState(() => store.lastCoinsEarned);
  const [frozenMaxMulti] = useState(() => store.shop.maxMulti);

  const [particleTrigger, setParticleTrigger] = useState(0);
  const [showCoinReward,  setShowCoinReward]  = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    if (isCorrect) {
      setParticleTrigger(n => n + 1);
      if (frozenCoins > 0) {
        setTimeout(() => { setShowCoinReward(true); audio.coinEarn(); }, 280);
      }
    }
  }, []);

  const multiplier  = getStreakMultiplier(frozenStreak, frozenMaxMulti);
  const accentColor = isCorrect ? "#16a34a" : "#dc2626";
  const bgColor     = isCorrect ? "rgba(240,253,244,0.93)" : "rgba(254,242,242,0.93)";
  const borderColor = isCorrect ? "rgba(134,239,172,0.8)"  : "rgba(252,165,165,0.8)";
  const cardShadow  = isCorrect ? "0 12px 48px rgba(74,222,128,0.28)" : "0 12px 48px rgba(248,113,113,0.28)";

  /* ── Sub-components (plain JSX, not React components) ────── */
  const renderStatusCard = (compact = false) => (
    <motion.div
      initial={{ scale: 0.76, opacity: 0, rotate: -2 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      style={{
        padding: compact ? "1.4rem 1.3rem" : "2.4rem 2rem",
        borderRadius: "24px", width: compact ? "100%" : 330,
        background: bgColor, backdropFilter: "blur(20px)",
        border: `2.5px solid ${borderColor}`, textAlign: "center",
        boxShadow: cardShadow, flexShrink: 0, position: "relative",
      }}
    >
      <motion.div
        animate={isCorrect ? { rotate: [0,-8,8,-4,0], scale: [1,1.2,1] } : { x: [0,-6,6,-4,4,-2,0] }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ fontSize: compact ? "2.8rem" : "4rem", marginBottom: "0.55rem", lineHeight: 1 }}
      >
        {timedOut ? "⏱️" : isCorrect ? "✅" : "❌"}
      </motion.div>

      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: compact ? "1.55rem" : "1.9rem", fontWeight: 900, color: accentColor, marginBottom: !isCorrect ? "0.8rem" : "0.3rem", textShadow: `0 0 20px ${accentColor}50` }}>
        {timedOut ? "¡Tiempo!" : isCorrect ? "¡Correcto!" : "¡Incorrecto!"}
      </p>

      {!isCorrect && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
          <p style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Respuesta correcta</p>
          <p style={{ fontSize: "0.97rem", fontWeight: 700, color: "#0f172a" }}>{frozenAnswer}</p>
        </motion.div>
      )}

      {/* Coin reward shown inside card */}
      <AnimatePresence>
        {showCoinReward && frozenCoins > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            style={{
              marginTop: "0.75rem",
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "5px 14px", borderRadius: "999px",
              background: "rgba(250,204,21,0.15)",
              border: "1.5px solid rgba(250,204,21,0.4)",
            }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{ fontSize: "1rem" }}
            >🪙</motion.span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: 900, color: "#fde68a" }}>
              +{frozenCoins}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderNextBtn = () => (
    <motion.button
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.24, type: "spring", stiffness: 220 }}
      whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04 }}
      onClick={store.nextQuestion}
      className="neon-btn"
      style={{
        padding: isMobile ? "1rem" : "1.05rem 3rem",
        width: isMobile ? "100%" : "auto",
        borderRadius: "18px", background: "#fff", color: "#0369a1",
        fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900,
        letterSpacing: "0.03em", border: "none", cursor: "pointer",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}
    >Siguiente →</motion.button>
  );

  const renderStreakBadge = () => frozenStreak >= 3 ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, type: "spring" }}
      style={{ padding: "0.5rem 1.2rem", borderRadius: "999px", background: "rgba(251,191,36,0.2)", border: "1.5px solid rgba(251,191,36,0.5)" }}
    >
      <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff" }}>🔥 Racha {frozenStreak} — ×{multiplier}</p>
    </motion.div>
  ) : null;

  const renderLivesDots = () => (
    <div style={{ display: "flex", gap: "8px" }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span key={i}
          initial={{ scale: 1.3 }} animate={{ scale: 1, opacity: i < frozenLives ? 1 : 0.2 }}
          transition={{ delay: i * 0.08, type: "spring" }}
          style={{ fontSize: "1.55rem" }}
        >❤️</motion.span>
      ))}
    </div>
  );

  /* ── Mobile ──────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <Particles trigger={particleTrigger} originX="50%" originY="45%" />
        <motion.div
          style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 18px", gap: "14px", overflowY: "auto" }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
        >
          {renderStatusCard(true)}
          {!isCorrect && renderLivesDots()}
          {isCorrect && renderStreakBadge()}
          {renderNextBtn()}
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
          style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 44px", gap: "18px" }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
        >
          {renderStatusCard()}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "13px" }}>
            {!isCorrect && renderLivesDots()}
            {isCorrect && renderStreakBadge()}
            {renderNextBtn()}
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
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "52px", padding: "40px 80px" }}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      >
        {renderStatusCard()}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "18px", maxWidth: 380 }}>
          {!isCorrect && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              {renderLivesDots()}
            </motion.div>
          )}
          {isCorrect && renderStreakBadge()}
          {renderNextBtn()}
        </div>
      </motion.div>
    </>
  );
}
