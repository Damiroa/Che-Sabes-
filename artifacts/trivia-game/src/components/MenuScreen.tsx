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
      style={{ background: "#f7f8fc" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.75, opacity: 0, y: -14 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        style={{ marginBottom: "1.75rem" }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 78, height: 78, borderRadius: "24px",
            background: "#0f172a",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
            boxShadow: "0 8px 32px rgba(15,23,42,0.18)",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <text x="19" y="29" textAnchor="middle" fontSize="28" fontFamily="Outfit, sans-serif" fontWeight="900" fill="white">?</text>
          </svg>
        </motion.div>

        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: "2.6rem",
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          color: "#0f172a",
          marginBottom: "0.35rem",
        }}>
          ¿Che Sabes?
        </h1>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "#94a3b8",
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
          transition={{ delay: 0.22 }}
          style={{
            marginBottom: "1.5rem",
            padding: "0.6rem 1.75rem",
            borderRadius: "12px",
            background: "#fff",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
          }}
        >
          <p style={{ fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8" }}>
            Récord
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.15 }}>
            {highScore.toLocaleString()} <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#94a3b8" }}>pts</span>
          </p>
        </motion.div>
      )}

      {/* Play button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, type: "spring", stiffness: 200 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => useGameStore.getState().resetGame()}
        style={{
          width: "100%", maxWidth: "260px",
          padding: "1.05rem 0",
          borderRadius: "14px",
          background: "#0f172a",
          color: "#fff",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.05rem",
          fontWeight: 800,
          letterSpacing: "0.04em",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(15,23,42,0.2)",
          marginBottom: "2rem",
        }}
      >
        ¡Jugar ahora!
      </motion.button>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }}
        style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}
      >
        {["❤️ 3 vidas", "⏱️ 15 segundos", "🔥 Racha ×4", "📚 170+ preguntas"].map((tag) => (
          <span
            key={tag}
            style={{
              padding: "0.3rem 0.75rem",
              borderRadius: "999px",
              background: "#fff",
              border: "1.5px solid #e2e8f0",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#64748b",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
