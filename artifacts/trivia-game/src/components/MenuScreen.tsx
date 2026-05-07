import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import logoImg from "/logo.jpeg";

export function MenuScreen() {
  const { highScore } = useGameStore();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Logo image */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: -18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.05 }}
        style={{ marginBottom: "0.5rem" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          <img
            src={logoImg}
            alt="¿Che Sabes?"
            style={{
              width: 170,
              height: 170,
              borderRadius: "36px",
              objectFit: "cover",
              boxShadow: "0 12px 48px rgba(99,102,241,0.28), 0 4px 16px rgba(15,23,42,0.14)",
              border: "3px solid rgba(255,255,255,0.9)",
              display: "block",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#6366f1",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "1.75rem",
          background: "rgba(99,102,241,0.1)",
          padding: "0.35rem 1rem",
          borderRadius: "999px",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        ✨ Pon a prueba tu conocimiento
      </motion.p>

      {/* High score */}
      {highScore > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{
            marginBottom: "1.5rem",
            padding: "0.6rem 1.75rem",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            border: "1.5px solid rgba(99,102,241,0.18)",
            boxShadow: "0 2px 12px rgba(99,102,241,0.08)",
          }}
        >
          <p style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6366f1", marginBottom: "2px" }}>
            🏆 Tu récord
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.1 }}>
            {highScore.toLocaleString()} <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#94a3b8" }}>pts</span>
          </p>
        </motion.div>
      )}

      {/* Play button */}
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, type: "spring", stiffness: 200 }}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => useGameStore.getState().resetGame()}
        style={{
          width: "100%", maxWidth: "260px",
          padding: "1.1rem 0",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          color: "#fff",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.1rem",
          fontWeight: 900,
          letterSpacing: "0.04em",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 28px rgba(99,102,241,0.38)",
          marginBottom: "1.75rem",
        }}
      >
        ¡Jugar ahora! 🎯
      </motion.button>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.42 }}
        style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}
      >
        {["❤️ 3 vidas", "⏱️ 15s", "🔥 Racha ×4", "📚 170+ preguntas"].map((tag) => (
          <span
            key={tag}
            style={{
              padding: "0.3rem 0.75rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(99,102,241,0.15)",
              fontSize: "0.71rem",
              fontWeight: 700,
              color: "#475569",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
