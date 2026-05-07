import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { ScoreCounter } from "./ScoreCounter";
import { Particles } from "./Particles";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";
import logoImg from "/logo.jpeg";

interface Props { isMuted: boolean; onOpenShop: () => void }

export function GameOverScreen({ isMuted, onOpenShop }: Props) {
  const { score, highScore, bestStreak, questionsAnswered, coins, resetGame, goToMenu } = useGameStore();
  const isNewRecord = score >= highScore && score > 0;
  const [particleTrigger, setParticleTrigger] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    if (isNewRecord) { setParticleTrigger(n => n + 1); if (!isMuted) audio.stageUp(); }
  }, []);

  const stats = [
    { label: "Puntaje",    emoji: "⭐", el: <ScoreCounter value={score} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#0f172a", lineHeight: 1 }} /> },
    { label: "Racha máx.", emoji: "🔥", val: `×${bestStreak}` },
    { label: "Preguntas",  emoji: "📝", val: String(questionsAnswered) },
  ];

  const renderButtons = (col = false) => (
    <div style={{ display: "flex", flexDirection: col ? "column" : "row", gap: "10px", width: col ? "100%" : "auto" }}>
      <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.03 }}
        onClick={() => { if (!isMuted) audio.click(); resetGame(); }}
        className="neon-btn"
        style={{ flex: 1, padding: "0.95rem 0", borderRadius: "15px", background: "#fff", color: "#0369a1", fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 900, border: "none", cursor: "pointer", boxShadow: "0 6px 22px rgba(0,0,0,0.17)" }}
      >Jugar de nuevo 🎯</motion.button>
      <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}
        onClick={onOpenShop}
        style={{ flex: 1, padding: "0.95rem 0", borderRadius: "15px", background: "rgba(255,255,255,0.18)", color: "#fff", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: 800, border: "1.5px solid rgba(255,255,255,0.32)", cursor: "pointer" }}
      >🛒 Tienda</motion.button>
      <motion.button whileTap={{ scale: 0.96 }}
        onClick={() => { if (!isMuted) audio.click(); goToMenu(); }}
        style={{ flex: 1, padding: "0.95rem 0", borderRadius: "15px", background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.75)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 700, border: "1px solid rgba(255,255,255,0.22)", cursor: "pointer" }}
      >Menú</motion.button>
    </div>
  );

  const renderStatCard = (s: typeof stats[number], delay = 0) => (
    <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.15rem 0.9rem", borderRadius: "18px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", border: "2px solid rgba(255,255,255,0.98)", textAlign: "center" }}>
      <span style={{ fontSize: "1.6rem", marginBottom: "5px" }}>{s.emoji}</span>
      {s.el ?? <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{s.val}</span>}
      <span style={{ fontSize: "0.62rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "5px" }}>{s.label}</span>
    </motion.div>
  );

  const CoinRow = () => (
    <div style={{ padding: "0.8rem 1.4rem", borderRadius: "14px", background: "rgba(250,204,21,0.12)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(250,204,21,0.32)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em" }}>🪙 Monedas totales</p>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.3rem", fontWeight: 900, color: "#fde68a" }}>{coins.toLocaleString()}</p>
    </div>
  );

  const HighScoreRow = () => (
    <div style={{ padding: "0.8rem 1.4rem", borderRadius: "14px", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.33)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em" }}>🏆 Récord histórico</p>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.35rem", fontWeight: 900, color: "#fff" }}>{highScore.toLocaleString()} <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>pts</span></p>
    </div>
  );

  /* ── Mobile ──────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <Particles trigger={particleTrigger} originX="50%" originY="40%" />
        <motion.div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 18px 36px", gap: "14px", overflowY: "auto" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
        >
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220 }} style={{ position: "relative" }}>
            <img src={logoImg} alt="¿Che Sabes?" style={{ width: 110, height: 110, borderRadius: "26px", objectFit: "cover", boxShadow: "0 12px 40px rgba(0,0,0,0.26)", border: "3px solid rgba(255,255,255,0.9)" }} />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.28 }}
              style={{ position: "absolute", bottom: -12, right: -12, width: 40, height: 40, borderRadius: "50%", background: isNewRecord ? "#fef9c3" : "rgba(255,255,255,0.92)", border: `3px solid ${isNewRecord ? "#fde68a" : "rgba(255,255,255,0.6)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
              {isNewRecord ? "🏆" : "💀"}
            </motion.div>
          </motion.div>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.8rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{isNewRecord ? "¡Nuevo récord!" : "Fin del juego"}</h2>
            {isNewRecord && <p style={{ fontSize: "0.82rem", color: "#bbf7d0", fontWeight: 600 }}>¡Superaste tu mejor puntaje!</p>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "9px", width: "100%" }}>
            {stats.map((s, i) => renderStatCard(s, 0.1 + i * 0.07))}
          </div>
          <HighScoreRow />
          <CoinRow />
          {renderButtons(true)}
        </motion.div>
      </>
    );
  }

  /* ── Tablet ──────────────────────────────────────────────── */
  if (isTablet) {
    return (
      <>
        <Particles trigger={particleTrigger} originX="50%" originY="45%" />
        <motion.div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 36px", gap: "16px", overflowY: "auto" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
        >
          <motion.div initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220 }} style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ position: "relative" }}>
              <img src={logoImg} alt="¿Che Sabes?" style={{ width: 120, height: 120, borderRadius: "26px", objectFit: "cover", boxShadow: "0 12px 40px rgba(0,0,0,0.26)", border: "3px solid rgba(255,255,255,0.9)" }} />
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.28 }}
                style={{ position: "absolute", bottom: -13, right: -13, width: 44, height: 44, borderRadius: "50%", background: isNewRecord ? "#fef9c3" : "rgba(255,255,255,0.92)", border: `3px solid ${isNewRecord ? "#fde68a" : "rgba(255,255,255,0.6)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                {isNewRecord ? "🏆" : "💀"}
              </motion.div>
            </div>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>{isNewRecord ? "¡Nuevo récord!" : "Fin del juego"}</h2>
              {isNewRecord && <p style={{ fontSize: "0.88rem", color: "#bbf7d0", fontWeight: 600 }}>¡Superaste tu mejor puntaje!</p>}
            </div>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "11px", width: "100%", maxWidth: 500 }}>
            {stats.map((s, i) => renderStatCard(s, 0.1 + i * 0.07))}
          </div>
          <div style={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", gap: "9px" }}>
            <HighScoreRow />
            <CoinRow />
          </div>
          <div style={{ width: "100%", maxWidth: 500 }}>{renderButtons()}</div>
        </motion.div>
      </>
    );
  }

  /* ── Desktop ─────────────────────────────────────────────── */
  return (
    <>
      <Particles trigger={particleTrigger} originX="50%" originY="45%" />
      <motion.div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 80px", gap: "68px" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      >
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 18 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", flexShrink: 0 }}>
          <div style={{ position: "relative" }}>
            <motion.img src={logoImg} alt="¿Che Sabes?"
              animate={isNewRecord ? { y: [0,-8,0] } : {}} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 160, height: 160, borderRadius: "30px", objectFit: "cover", boxShadow: isNewRecord ? "0 12px 48px rgba(250,204,21,0.4)" : "0 12px 48px rgba(0,0,0,0.28)", border: "3px solid rgba(255,255,255,0.9)" }}
            />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.28 }}
              style={{ position: "absolute", bottom: -17, right: -17, width: 54, height: 54, borderRadius: "50%", background: isNewRecord ? "#fef9c3" : "rgba(255,255,255,0.92)", border: `3px solid ${isNewRecord ? "#fde68a" : "rgba(255,255,255,0.6)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
              {isNewRecord ? "🏆" : "💀"}
            </motion.div>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", color: "rgba(255,255,255,0.58)", textTransform: "uppercase", marginBottom: "3px" }}>¿Che Sabes?</p>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.1rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", textShadow: isNewRecord ? "0 0 30px rgba(250,204,21,0.5)" : "0 4px 20px rgba(0,0,0,0.2)" }}>
              {isNewRecord ? "¡Nuevo récord!" : "Fin del juego"}
            </h2>
            {isNewRecord && <p style={{ fontSize: "0.9rem", color: "#bbf7d0", fontWeight: 600 }}>¡Superaste tu mejor puntaje!</p>}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.32 }}
          style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: 500, flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "13px" }}>
            {stats.map((s, i) => renderStatCard(s, 0.2 + i * 0.07))}
          </div>
          <HighScoreRow />
          <CoinRow />
          {renderButtons()}
        </motion.div>
      </motion.div>
    </>
  );
}
