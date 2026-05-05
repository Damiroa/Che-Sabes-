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
          width: 80, height: 80, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isNewRecord ? "rgba(250,204,21,0.1)" : "rgba(100,116,139,0.1)",
          border: `1.5px solid ${isNewRecord ? "rgba(250,204,21,0.3)" : "rgba(100,116,139,0.2)"}`,
          marginBottom: "1.25rem",
          fontSize: "2.2rem",
        }}
      >
        {isNewRecord ? "🏆" : "💀"}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.8rem",
          fontWeight: 900,
          color: "#e2e8f0",
          letterSpacing: "-0.03em",
          marginBottom: "0.3rem",
        }}
      >
        {isNewRecord ? "¡Nuevo récord!" : "Fin del juego"}
      </motion.h2>

      {isNewRecord && (
        <p style={{ fontSize: "0.85rem", color: "#7c3aed", fontWeight: 600, marginBottom: "1.5rem" }}>
          Superaste tu mejor puntaje
        </p>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          width: "100%",
          maxWidth: "320px",
          marginBottom: "1.5rem",
          marginTop: "1rem",
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
              padding: "0.9rem 0.5rem",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: "#e2e8f0", lineHeight: 1 }}>
              {stat.value}
            </span>
            <span style={{ fontSize: "0.68rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "4px" }}>
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
          padding: "0.6rem 1.5rem",
          borderRadius: "10px",
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.2)",
          marginBottom: "1.75rem",
        }}
      >
        <p style={{ fontSize: "0.68rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Récord</p>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#a78bfa", lineHeight: 1.1 }}>
          {highScore.toLocaleString()} pts
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
            width: "100%", padding: "1rem 0",
            borderRadius: "14px",
            background: "rgba(124,58,237,0.9)",
            color: "#fff",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1rem", fontWeight: 700,
            letterSpacing: "0.04em",
            border: "none", cursor: "pointer",
          }}
        >
          Jugar de nuevo
        </button>
        <button
          onClick={goToMenu}
          style={{
            width: "100%", padding: "0.85rem 0",
            borderRadius: "14px",
            background: "transparent",
            color: "#475569",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.9rem", fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.07)",
            cursor: "pointer",
          }}
        >
          Menú principal
        </button>
      </motion.div>
    </motion.div>
  );
}
