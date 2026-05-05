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
      style={{ background: "#f7f8fc" }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 16 }}
        style={{
          width: 80, height: 80, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isNewRecord ? "#fefce8" : "#fff",
          border: `2px solid ${isNewRecord ? "#fde68a" : "#e2e8f0"}`,
          marginBottom: "1.25rem",
          fontSize: "2.2rem",
          boxShadow: "0 4px 16px rgba(15,23,42,0.08)",
        }}
      >
        {isNewRecord ? "🏆" : "💀"}
      </motion.div>

      <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "0.3rem" }}>
        ¿Che Sabes?
      </p>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.8rem", fontWeight: 900,
          color: "#0f172a", letterSpacing: "-0.03em",
          marginBottom: isNewRecord ? "0.25rem" : "1rem",
        }}
      >
        {isNewRecord ? "¡Nuevo récord!" : "Fin del juego"}
      </motion.h2>

      {isNewRecord && (
        <p style={{ fontSize: "0.82rem", color: "#16a34a", fontWeight: 600, marginBottom: "1rem" }}>
          ¡Superaste tu mejor puntaje!
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
          marginBottom: "1.25rem",
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
              padding: "0.85rem 0.5rem", borderRadius: "12px",
              background: "#fff", border: "1.5px solid #e2e8f0",
              boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
            }}
          >
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>
              {stat.value}
            </span>
            <span style={{ fontSize: "0.65rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "4px" }}>
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
          padding: "0.65rem 1.75rem", borderRadius: "12px",
          background: "#fff", border: "1.5px solid #e2e8f0",
          marginBottom: "1.75rem",
          boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
        }}
      >
        <p style={{ fontSize: "0.63rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Récord histórico</p>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.15 }}>
          {highScore.toLocaleString()} <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#94a3b8" }}>pts</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        style={{ display: "flex", flexDirection: "column", gap: "9px", width: "100%", maxWidth: "280px" }}
      >
        <button
          onClick={resetGame}
          style={{
            width: "100%", padding: "1rem 0", borderRadius: "14px",
            background: "#0f172a", color: "#fff",
            fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 700,
            letterSpacing: "0.04em", border: "none", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(15,23,42,0.18)",
          }}
        >
          Jugar de nuevo
        </button>
        <button
          onClick={goToMenu}
          style={{
            width: "100%", padding: "0.85rem 0", borderRadius: "14px",
            background: "#fff", color: "#64748b",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 600,
            border: "1.5px solid #e2e8f0", cursor: "pointer",
          }}
        >
          Menú principal
        </button>
      </motion.div>
    </motion.div>
  );
}
