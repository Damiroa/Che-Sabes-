import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

export function MenuScreen() {
  const { highScore } = useGameStore();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Logo mark */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: -16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        style={{ marginBottom: "1.5rem" }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 72, height: 72, borderRadius: "20px",
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
            boxShadow: "0 12px 36px rgba(124,58,237,0.35)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <text x="18" y="27" textAnchor="middle" fontSize="26" fontFamily="Outfit, sans-serif" fontWeight="900" fill="white">?</text>
          </svg>
        </motion.div>

        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: "2.6rem",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#e2e8f0",
          marginBottom: "0.4rem",
        }}>
          Trivia <span style={{ color: "#7c3aed" }}>Master</span>
        </h1>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.8rem",
          fontWeight: 500,
          color: "#475569",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Pon a prueba tu conocimiento
        </p>
      </motion.div>

      {/* High score */}
      {highScore > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            marginBottom: "1.5rem",
            padding: "0.6rem 1.5rem",
            borderRadius: "10px",
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#475569" }}>
            Récord
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 900, color: "#a78bfa", lineHeight: 1.15 }}>
            {highScore.toLocaleString()} <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#6d28d9" }}>pts</span>
          </p>
        </motion.div>
      )}

      {/* Play button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => useGameStore.getState().resetGame()}
        style={{
          width: "100%", maxWidth: "260px",
          padding: "1.05rem 0",
          borderRadius: "14px",
          background: "rgba(124,58,237,0.9)",
          color: "#fff",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.05rem",
          fontWeight: 800,
          letterSpacing: "0.05em",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 28px rgba(124,58,237,0.35)",
          marginBottom: "2rem",
        }}
      >
        Jugar ahora
      </motion.button>

      {/* Feature tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}
      >
        {[
          "❤️ 3 vidas",
          "🔥 Racha ×4",
          "⏭️ 2 skips",
          "📚 100+ preguntas",
        ].map((tag) => (
          <span
            key={tag}
            style={{
              padding: "0.3rem 0.75rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#475569",
              letterSpacing: "0.03em",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
