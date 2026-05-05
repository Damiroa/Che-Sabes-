import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

export function GameOverScreen() {
  const { score, highScore, bestStreak, questionsAnswered, resetGame, goToMenu } = useGameStore();
  const isNewRecord = score >= highScore && score > 0;

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 16 }}
        style={{
          width: 78, height: 78, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isNewRecord ? "rgba(250,204,21,0.08)" : "rgba(255,255,255,0.04)",
          border: `1.5px solid ${isNewRecord ? "rgba(250,204,21,0.3)" : "rgba(255,255,255,0.08)"}`,
          marginBottom: "1.25rem",
          fontSize: "2rem",
        }}
      >
        {isNewRecord ? "🏆" : "💀"}
      </motion.div>

      {/* I.G.C badge */}
      <div style={{
        display: "inline-flex", alignItems: "center",
        padding: "2px 10px", borderRadius: "999px",
        background: "rgba(29,78,216,0.1)", border: "1px solid rgba(59,130,246,0.2)",
        marginBottom: "0.5rem",
      }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: "#60a5fa", textTransform: "uppercase" }}>
          I.G.C Trivia
        </span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.75rem",
          fontWeight: 900,
          color: "#ffffff",
          letterSpacing: "-0.03em",
          marginBottom: "0.25rem",
        }}
      >
        {isNewRecord ? "¡Nuevo récord!" : "Fin del juego"}
      </motion.h2>

      {isNewRecord && (
        <p style={{ fontSize: "0.82rem", color: "#3b82f6", fontWeight: 600, marginBottom: "1.25rem" }}>
          Superaste tu mejor puntaje
        </p>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "9px", width: "100%", maxWidth: "310px",
          marginBottom: "1.25rem", marginTop: "1rem",
        }}
      >
        {[
          { label: "Puntaje", value: score.toLocaleString() },
          { label: "Racha max", value: `×${bestStreak}` },
          { label: "Preguntas", value: questionsAnswered },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "0.85rem 0.5rem",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.35rem", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>
              {stat.value}
            </span>
            <span style={{ fontSize: "0.65rem", color: "#1e3a5f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "4px" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* High score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.26 }}
        style={{
          padding: "0.6rem 1.5rem", borderRadius: "10px",
          background: "rgba(29,78,216,0.08)",
          border: "1px solid rgba(59,130,246,0.18)",
          marginBottom: "1.75rem",
        }}
      >
        <p style={{ fontSize: "0.63rem", color: "#1e3a5f", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Récord histórico</p>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.65rem", fontWeight: 900, color: "#60a5fa", lineHeight: 1.15 }}>
          {highScore.toLocaleString()} <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1d4ed8" }}>pts</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: "280px" }}
      >
        <button
          onClick={resetGame}
          style={{
            width: "100%", padding: "1rem 0", borderRadius: "14px",
            background: "#1d6fe8", color: "#fff",
            fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 700,
            letterSpacing: "0.04em", border: "none", cursor: "pointer",
            boxShadow: "0 6px 20px rgba(29,111,232,0.3)",
          }}
        >
          Jugar de nuevo
        </button>
        <button
          onClick={goToMenu}
          style={{
            width: "100%", padding: "0.85rem 0", borderRadius: "14px",
            background: "transparent", color: "#1e3a5f",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer",
          }}
        >
          Menú principal
        </button>
      </motion.div>
    </motion.div>
  );
}
