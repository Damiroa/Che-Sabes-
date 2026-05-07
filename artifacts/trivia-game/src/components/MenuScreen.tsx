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
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: -18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.05 }}
        style={{ marginBottom: "0.6rem" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          <img
            src={logoImg}
            alt="¿Che Sabes?"
            style={{
              width: 190,
              height: 190,
              borderRadius: "40px",
              objectFit: "cover",
              boxShadow: "0 16px 56px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.16)",
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
          fontSize: "0.78rem",
          fontWeight: 700,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "1.75rem",
          background: "rgba(255,255,255,0.2)",
          padding: "0.4rem 1.1rem",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.35)",
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
            padding: "0.65rem 1.75rem",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.22)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.4)",
          }}
        >
          <p style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "2px" }}>
            🏆 Tu récord
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.8rem", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
            {highScore.toLocaleString()} <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>pts</span>
          </p>
        </motion.div>
      )}

      {/* Play button */}
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, type: "spring", stiffness: 200 }}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => useGameStore.getState().resetGame()}
        style={{
          width: "100%", maxWidth: "270px",
          padding: "1.15rem 0",
          borderRadius: "18px",
          background: "#fff",
          color: "#0369a1",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.15rem",
          fontWeight: 900,
          letterSpacing: "0.03em",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
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
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.22)",
              border: "1.5px solid rgba(255,255,255,0.38)",
              fontSize: "0.74rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
