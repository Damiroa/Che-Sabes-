import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { ScoreCounter } from "./ScoreCounter";
import { Particles } from "./Particles";
import { audio } from "../utils/audio";
import logoImg from "/logo.jpeg";

interface Props { isMuted: boolean }

export function GameOverScreen({ isMuted }: Props) {
  const { score, highScore, bestStreak, questionsAnswered, resetGame, goToMenu } = useGameStore();
  const isNewRecord = score >= highScore && score > 0;
  const [particleTrigger, setParticleTrigger] = useState(0);

  useEffect(() => {
    if (isNewRecord) {
      setParticleTrigger((n) => n + 1);
      if (!isMuted) audio.stageUp();
    }
  }, []);

  return (
    <>
      <Particles trigger={particleTrigger} originX="50%" originY="45%" />

      <motion.div
        style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "40px 80px", gap: "72px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Left */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", flexShrink: 0 }}
        >
          <div style={{ position: "relative" }}>
            <motion.img
              src={logoImg}
              alt="¿Che Sabes?"
              animate={isNewRecord ? { y: [0, -8, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 168, height: 168,
                borderRadius: "32px", objectFit: "cover",
                boxShadow: isNewRecord
                  ? "0 12px 48px rgba(250,204,21,0.4), 0 0 60px rgba(250,204,21,0.2)"
                  : "0 12px 48px rgba(0,0,0,0.28)",
                border: "3px solid rgba(255,255,255,0.9)",
              }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.3 }}
              style={{
                position: "absolute", bottom: -18, right: -18,
                width: 58, height: 58, borderRadius: "50%",
                background: isNewRecord ? "#fef9c3" : "rgba(255,255,255,0.92)",
                border: `3px solid ${isNewRecord ? "#fde68a" : "rgba(255,255,255,0.6)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.9rem",
                boxShadow: isNewRecord ? "0 4px 20px rgba(250,204,21,0.4)" : "0 4px 16px rgba(0,0,0,0.16)",
              }}
            >
              {isNewRecord ? "🏆" : "💀"}
            </motion.div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "4px" }}>
              ¿Che Sabes?
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: "2.2rem", fontWeight: 900, color: "#fff",
                letterSpacing: "-0.03em",
                textShadow: isNewRecord ? "0 0 30px rgba(250,204,21,0.5)" : "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              {isNewRecord ? "¡Nuevo récord!" : "Fin del juego"}
            </motion.h2>
            {isNewRecord && (
              <p style={{ fontSize: "0.92rem", color: "#bbf7d0", fontWeight: 600 }}>
                ¡Superaste tu mejor puntaje!
              </p>
            )}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: 520, flex: 1 }}
        >
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            {[
              { label: "Puntaje final", valueEl: <ScoreCounter value={score} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.75rem", fontWeight: 900, color: "#0f172a", lineHeight: 1 }} />, emoji: "⭐" },
              { label: "Racha máxima",  value: `×${bestStreak}`, emoji: "🔥" },
              { label: "Preguntas",     value: String(questionsAnswered), emoji: "📝" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + Math.random() * 0.15 }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "1.25rem 1rem", borderRadius: "20px",
                  background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
                  border: "2px solid rgba(255,255,255,0.98)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "1.7rem", marginBottom: "6px" }}>{stat.emoji}</span>
                {stat.valueEl ?? (
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.75rem", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>
                    {stat.value}
                  </span>
                )}
                <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "6px" }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* High score strip */}
          <div style={{
            padding: "0.9rem 1.6rem", borderRadius: "16px",
            background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <p style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.7)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              🏆 Récord histórico
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.55rem", fontWeight: 900, color: "#fff" }}>
              {highScore.toLocaleString()} <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "rgba(255,255,255,0.58)" }}>pts</span>
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "14px" }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.04 }}
              onClick={() => { if (!isMuted) audio.click(); resetGame(); }}
              className="neon-btn"
              style={{
                flex: 1, padding: "1.1rem 0", borderRadius: "16px",
                background: "#fff", color: "#0369a1",
                fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", fontWeight: 900,
                letterSpacing: "0.03em", border: "none", cursor: "pointer",
                boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
              }}
            >
              Jugar de nuevo 🎯
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => { if (!isMuted) audio.click(); goToMenu(); }}
              style={{
                flex: 1, padding: "1.1rem 0", borderRadius: "16px",
                background: "rgba(255,255,255,0.18)", color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.96rem", fontWeight: 700,
                border: "1.5px solid rgba(255,255,255,0.35)", cursor: "pointer",
              }}
            >
              Menú principal
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
