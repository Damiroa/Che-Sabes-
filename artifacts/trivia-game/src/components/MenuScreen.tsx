import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import logoImg from "/logo.jpeg";

export function MenuScreen() {
  const { highScore } = useGameStore();

  return (
    <motion.div
      style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 60px",
        gap: "64px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Left — Logo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, x: -30 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}
        style={{ flexShrink: 0 }}
      >
        <motion.img
          src={logoImg}
          alt="¿Che Sabes?"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 280,
            height: 280,
            borderRadius: "48px",
            objectFit: "cover",
            boxShadow: "0 24px 80px rgba(0,0,0,0.32), 0 8px 24px rgba(0,0,0,0.18)",
            border: "4px solid rgba(255,255,255,0.9)",
            display: "block",
          }}
        />
      </motion.div>

      {/* Right — Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 520 }}
      >
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.75)",
            marginBottom: "0.5rem",
          }}
        >
          🎯 Trivia Game
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "4.2rem", fontWeight: 900,
            color: "#fff", letterSpacing: "-0.04em",
            lineHeight: 1, marginBottom: "0.6rem",
            textShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}
        >
          ¿Che Sabes?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          style={{
            fontSize: "1.1rem", fontWeight: 500,
            color: "rgba(255,255,255,0.82)",
            marginBottom: "1.8rem", lineHeight: 1.5,
          }}
        >
          Pon a prueba tu conocimiento con más de 170 preguntas en 5 categorías. ¿Llegás a la Fase 3?
        </motion.p>

        {/* High score */}
        {highScore > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            style={{
              marginBottom: "1.6rem",
              padding: "0.75rem 1.75rem",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255,255,255,0.38)",
              display: "flex", alignItems: "center", gap: "16px",
            }}
          >
            <span style={{ fontSize: "1.8rem" }}>🏆</span>
            <div>
              <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: "1px" }}>
                Tu récord
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                {highScore.toLocaleString()} <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>pts</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Play button */}
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03, boxShadow: "0 12px 48px rgba(0,0,0,0.28)" }}
          onClick={() => useGameStore.getState().resetGame()}
          style={{
            padding: "1.1rem 3.5rem",
            borderRadius: "18px",
            background: "#fff",
            color: "#0369a1",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.25rem",
            fontWeight: 900,
            letterSpacing: "0.02em",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
            marginBottom: "1.5rem",
          }}
        >
          ¡Jugar ahora! 🎯
        </motion.button>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42 }}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          {["❤️ 3 vidas", "⏱️ 15s adaptativo", "🔥 Racha ×4", "📚 170+ preguntas", "🎓 3 fases"].map((tag) => (
            <span key={tag} style={{
              padding: "0.4rem 1rem", borderRadius: "999px",
              background: "rgba(255,255,255,0.2)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              fontSize: "0.8rem", fontWeight: 700, color: "#fff",
            }}>
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
