import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { audio } from "../utils/audio";
import logoImg from "/logo.jpeg";

interface Props { isMuted: boolean; onToggleMute: () => void }

export function MenuScreen({ isMuted, onToggleMute }: Props) {
  const { highScore } = useGameStore();

  return (
    <motion.div
      style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 60px", gap: "64px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mute button — top right */}
      <button
        onClick={onToggleMute}
        style={{
          position: "absolute", top: 20, right: 28,
          background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.3)",
          borderRadius: "50%", width: 38, height: 38,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "1.1rem", zIndex: 10,
        }}
        title={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

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
            width: 280, height: 280, borderRadius: "48px",
            objectFit: "cover",
            boxShadow: "0 24px 80px rgba(0,0,0,0.32), 0 0 60px rgba(255,255,255,0.12)",
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
          transition={{ delay: 0.16 }}
          style={{
            fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem",
          }}
        >🎯 Trivia Game</motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "4.2rem", fontWeight: 900, color: "#fff",
            letterSpacing: "-0.04em", lineHeight: 1,
            marginBottom: "0.6rem",
            textShadow: "0 4px 24px rgba(0,0,0,0.2), 0 0 40px rgba(255,255,255,0.1)",
          }}
        >¿Che Sabes?</motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
          style={{
            fontSize: "1.05rem", fontWeight: 500, color: "rgba(255,255,255,0.8)",
            marginBottom: "1.8rem", lineHeight: 1.6,
          }}
        >
          Pon a prueba tu conocimiento con más de 170 preguntas en 5 categorías. ¡La dificultad sube cada 10 preguntas!
        </motion.p>

        {/* High score */}
        {highScore > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            style={{
              marginBottom: "1.6rem", padding: "0.8rem 1.75rem",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", gap: "16px",
            }}
          >
            <span style={{ fontSize: "1.8rem" }}>🏆</span>
            <div>
              <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "1px" }}>
                Tu récord
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                {highScore.toLocaleString()} <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>pts</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Play button */}
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, type: "spring", stiffness: 200 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.04, boxShadow: "0 16px 56px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.15)" }}
          onClick={() => { if (!isMuted) audio.click(); useGameStore.getState().resetGame(); }}
          className="neon-btn"
          style={{
            padding: "1.15rem 3.5rem", borderRadius: "18px",
            background: "#fff", color: "#0369a1",
            fontFamily: "'Outfit', sans-serif", fontSize: "1.25rem", fontWeight: 900,
            letterSpacing: "0.02em", border: "none", cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,0,0,0.22)", marginBottom: "1.5rem",
          }}
        >
          ¡Jugar ahora! 🎯
        </motion.button>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.44 }}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          {["❤️ 3 vidas", "⏱️ Timer adaptativo", "🔥 Racha ×4", "📚 170+ preguntas", "🎓 3 fases"].map((tag) => (
            <span key={tag} style={{
              padding: "0.4rem 1rem", borderRadius: "999px",
              background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.3)",
              fontSize: "0.8rem", fontWeight: 700, color: "#fff",
            }}>{tag}</span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
