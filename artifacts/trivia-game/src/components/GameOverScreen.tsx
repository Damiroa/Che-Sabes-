import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import logoImg from "/logo.jpeg";

export function GameOverScreen() {
  const { score, highScore, bestStreak, questionsAnswered, resetGame, goToMenu } = useGameStore();
  const isNewRecord = score >= highScore && score > 0;

  return (
    <motion.div
      style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 80px", gap: "72px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Left — logo + result */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", flexShrink: 0 }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={logoImg}
            alt="¿Che Sabes?"
            style={{
              width: 160, height: 160,
              borderRadius: "32px", objectFit: "cover",
              boxShadow: "0 12px 48px rgba(0,0,0,0.28)",
              border: "3px solid rgba(255,255,255,0.9)",
              opacity: 0.9,
            }}
          />
          <div style={{
            position: "absolute", bottom: -16, right: -16,
            width: 56, height: 56, borderRadius: "50%",
            background: isNewRecord ? "#fefce8" : "rgba(255,255,255,0.9)",
            border: `3px solid ${isNewRecord ? "#fde68a" : "rgba(255,255,255,0.6)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.8rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.16)",
          }}>
            {isNewRecord ? "🏆" : "💀"}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.14em", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", marginBottom: "4px" }}>
            ¿Che Sabes?
          </p>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "2.2rem", fontWeight: 900,
            color: "#fff", letterSpacing: "-0.03em",
            textShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}>
            {isNewRecord ? "¡Nuevo récord!" : "Fin del juego"}
          </h2>
          {isNewRecord && (
            <p style={{ fontSize: "0.9rem", color: "#bbf7d0", fontWeight: 600 }}>
              ¡Superaste tu mejor puntaje!
            </p>
          )}
        </div>
      </motion.div>

      {/* Right — stats + buttons */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: 520, flex: 1 }}
      >
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {[
            { label: "Puntaje final",   value: score.toLocaleString(), emoji: "⭐" },
            { label: "Racha máxima",    value: `×${bestStreak}`,        emoji: "🔥" },
            { label: "Preguntas",       value: String(questionsAnswered), emoji: "📝" },
          ].map((stat) => (
            <div key={stat.label} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "1.25rem 1rem", borderRadius: "20px",
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(16px)",
              border: "2px solid rgba(255,255,255,0.95)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}>
              <span style={{ fontSize: "1.6rem", marginBottom: "6px" }}>{stat.emoji}</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>
                {stat.value}
              </span>
              <span style={{ fontSize: "0.68rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "5px" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* High score strip */}
        <div style={{
          padding: "0.9rem 1.6rem", borderRadius: "16px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.38)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            🏆 Récord histórico
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 900, color: "#fff" }}>
            {highScore.toLocaleString()} <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>pts</span>
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "14px" }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            onClick={resetGame}
            style={{
              flex: 1, padding: "1.05rem 0", borderRadius: "16px",
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
            onClick={goToMenu}
            style={{
              flex: 1, padding: "1.05rem 0", borderRadius: "16px",
              background: "rgba(255,255,255,0.2)", color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", fontWeight: 700,
              border: "1.5px solid rgba(255,255,255,0.35)", cursor: "pointer",
            }}
          >
            Menú principal
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
