import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";
import logoImg from "/logo.jpeg";

interface Props { isMuted: boolean; onToggleMute: () => void }

export function MenuScreen({ isMuted, onToggleMute }: Props) {
  const { highScore } = useGameStore();
  const { isMobile, isTablet } = useBreakpoint();

  /* ── Mobile layout ───────────────────────────────────────── */
  if (isMobile) {
    return (
      <motion.div
        style={{
          width: "100%", minHeight: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "32px 24px 40px",
          overflowY: "auto",
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Mute */}
        <button onClick={onToggleMute} style={muteStyle("absolute", 16, 20)}>
          {isMuted ? "🔇" : "🔊"}
        </button>

        {/* Logo */}
        <motion.img
          src={logoImg} alt="¿Che Sabes?"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 160, height: 160, borderRadius: "36px", objectFit: "cover",
            boxShadow: "0 16px 56px rgba(0,0,0,0.28)",
            border: "3px solid rgba(255,255,255,0.9)",
            marginBottom: "1.2rem",
          }}
        />

        {/* Title */}
        <p style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.68)", marginBottom: "0.25rem" }}>
          🎯 Trivia Game
        </p>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "3rem", fontWeight: 900,
          color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.5rem",
          textShadow: "0 4px 24px rgba(0,0,0,0.18)",
        }}>¿Che Sabes?</h1>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.78)", textAlign: "center", lineHeight: 1.55, marginBottom: "1.4rem" }}>
          Pon a prueba tu conocimiento con más de 170 preguntas en 5 categorías.
        </p>

        {/* High score */}
        {highScore > 0 && (
          <div style={{ ...glassCard, marginBottom: "1.2rem", padding: "0.7rem 1.4rem", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "1.5rem" }}>🏆</span>
            <div>
              <p style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.58)", marginBottom: "1px" }}>Tu récord</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                {highScore.toLocaleString()} <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>pts</span>
              </p>
            </div>
          </div>
        )}

        {/* Play */}
        <motion.button
          whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}
          onClick={() => { if (!isMuted) audio.click(); useGameStore.getState().resetGame(); }}
          style={{ width: "100%", maxWidth: 300, padding: "1.1rem", borderRadius: "18px", background: "#fff", color: "#0369a1", fontFamily: "'Outfit', sans-serif", fontSize: "1.15rem", fontWeight: 900, border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", marginBottom: "1.2rem" }}
        >¡Jugar ahora! 🎯</motion.button>

        {/* Tags */}
        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", justifyContent: "center" }}>
          {["❤️ 3 vidas", "⏱️ Timer", "🔥 Racha ×4", "📚 170+", "🎓 3 fases"].map(tag => (
            <span key={tag} style={{ padding: "0.32rem 0.8rem", borderRadius: "999px", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.28)", fontSize: "0.74rem", fontWeight: 700, color: "#fff" }}>{tag}</span>
          ))}
        </div>
      </motion.div>
    );
  }

  /* ── Tablet layout ───────────────────────────────────────── */
  if (isTablet) {
    return (
      <motion.div
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 40px", gap: "44px" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <button onClick={onToggleMute} style={muteStyle("absolute", 16, 20)}>{isMuted ? "🔇" : "🔊"}</button>

        <motion.img src={logoImg} alt="¿Che Sabes?"
          animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 200, height: 200, borderRadius: "40px", objectFit: "cover", boxShadow: "0 20px 64px rgba(0,0,0,0.3)", border: "3px solid rgba(255,255,255,0.9)", flexShrink: 0 }}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 380 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.68)", marginBottom: "0.35rem" }}>🎯 Trivia Game</p>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "3.2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.5rem", textShadow: "0 4px 20px rgba(0,0,0,0.18)" }}>¿Che Sabes?</h1>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.55, marginBottom: "1.4rem" }}>
            Pon a prueba tu conocimiento con más de 170 preguntas en 5 categorías.
          </p>
          {highScore > 0 && (
            <div style={{ ...glassCard, marginBottom: "1.4rem", padding: "0.65rem 1.4rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🏆</span>
              <div>
                <p style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.58)" }}>Tu récord</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                  {highScore.toLocaleString()} <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>pts</span>
                </p>
              </div>
            </div>
          )}
          <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.03 }}
            onClick={() => { if (!isMuted) audio.click(); useGameStore.getState().resetGame(); }}
            style={{ padding: "1.05rem 2.8rem", borderRadius: "16px", background: "#fff", color: "#0369a1", fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900, border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(0,0,0,0.2)", marginBottom: "1.2rem" }}
          >¡Jugar ahora! 🎯</motion.button>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["❤️ 3 vidas", "⏱️ Timer", "🔥 ×4", "📚 170+"].map(tag => (
              <span key={tag} style={{ padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.28)", fontSize: "0.76rem", fontWeight: 700, color: "#fff" }}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── Desktop layout ──────────────────────────────────────── */
  return (
    <motion.div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 60px", gap: "64px" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button onClick={onToggleMute} style={muteStyle("absolute", 20, 28)}>{isMuted ? "🔇" : "🔊"}</button>

      <motion.div initial={{ scale: 0.7, opacity: 0, x: -30 }} animate={{ scale: 1, opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }} style={{ flexShrink: 0 }}>
        <motion.img src={logoImg} alt="¿Che Sabes?"
          animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 280, height: 280, borderRadius: "48px", objectFit: "cover", boxShadow: "0 24px 80px rgba(0,0,0,0.32), 0 0 60px rgba(255,255,255,0.1)", border: "4px solid rgba(255,255,255,0.9)", display: "block" }}
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.4 }} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 520 }}>
        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>🎯 Trivia Game</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "4.2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.6rem", textShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>¿Che Sabes?</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }} style={{ fontSize: "1.05rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", marginBottom: "1.8rem", lineHeight: 1.6 }}>
          Pon a prueba tu conocimiento con más de 170 preguntas en 5 categorías. ¡La dificultad sube cada 10 preguntas!
        </motion.p>
        {highScore > 0 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} style={{ ...glassCard, marginBottom: "1.6rem", padding: "0.8rem 1.75rem", display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "1.8rem" }}>🏆</span>
            <div>
              <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "1px" }}>Tu récord</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.7rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                {highScore.toLocaleString()} <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>pts</span>
              </p>
            </div>
          </motion.div>
        )}
        <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, type: "spring", stiffness: 200 }}
          whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04, boxShadow: "0 16px 56px rgba(0,0,0,0.3)" }}
          onClick={() => { if (!isMuted) audio.click(); useGameStore.getState().resetGame(); }}
          className="neon-btn"
          style={{ padding: "1.15rem 3.5rem", borderRadius: "18px", background: "#fff", color: "#0369a1", fontFamily: "'Outfit', sans-serif", fontSize: "1.25rem", fontWeight: 900, letterSpacing: "0.02em", border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.22)", marginBottom: "1.5rem" }}
        >¡Jugar ahora! 🎯</motion.button>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44 }} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {["❤️ 3 vidas", "⏱️ Timer adaptativo", "🔥 Racha ×4", "📚 170+ preguntas", "🎓 3 fases"].map(tag => (
            <span key={tag} style={{ padding: "0.4rem 1rem", borderRadius: "999px", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.3)", fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>{tag}</span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Shared helpers ──────────────────────────────────────────
const glassCard: React.CSSProperties = {
  borderRadius: "16px",
  background: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(12px)",
  border: "1.5px solid rgba(255,255,255,0.35)",
};

function muteStyle(position: "absolute" | "fixed", top: number, right: number): React.CSSProperties {
  return {
    position, top, right, zIndex: 10,
    background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.3)",
    borderRadius: "50%", width: 38, height: 38,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: "1.1rem",
  };
}
