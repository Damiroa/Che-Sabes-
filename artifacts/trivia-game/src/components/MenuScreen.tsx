import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";

interface Props {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenShop: () => void;
}

export function MenuScreen({ isMuted, onToggleMute, onOpenShop }: Props) {
  const { highScore, coins } = useGameStore();
  const { isMobile, isTablet } = useBreakpoint();

  const handlePlay = () => {
    if (!isMuted) audio.click();
    useGameStore.getState().resetGame();
  };

  /* ── Shared elements ─────────────────────────────────────── */
  const renderCoinBadge = (size: "sm" | "lg" = "sm") => (
    <div style={{
      display: "flex", alignItems: "center", gap: size === "lg" ? 8 : 5,
      padding: size === "lg" ? "6px 16px" : "4px 12px",
      borderRadius: "999px",
      background: "rgba(250,204,21,0.15)",
      border: "1.5px solid rgba(250,204,21,0.38)",
    }}>
      <span style={{ fontSize: size === "lg" ? "1.2rem" : "0.95rem" }}>🪙</span>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: size === "lg" ? "1.15rem" : "0.95rem", fontWeight: 900, color: "#fde68a" }}>
        {coins.toLocaleString()}
      </span>
    </div>
  );

  const renderShopBtn = (full = false) => (
    <motion.button
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      onClick={onOpenShop}
      style={{
        padding: full ? "0.9rem" : "0.75rem 1.4rem",
        width: full ? "100%" : "auto",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.18)",
        border: "1.5px solid rgba(255,255,255,0.32)",
        color: "#fff", fontFamily: "'Outfit', sans-serif",
        fontSize: full ? "1rem" : "0.9rem", fontWeight: 800,
        cursor: "pointer", letterSpacing: "0.02em",
      }}
    >🛒 Tienda</motion.button>
  );

  const renderPlayBtn = (full = false) => (
    <motion.button
      whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.04, boxShadow: "0 16px 48px rgba(0,0,0,0.28)" }}
      onClick={handlePlay}
      className="neon-btn"
      style={{
        padding: full ? "1.1rem" : "1.15rem 3.5rem",
        width: full ? "100%" : "auto",
        borderRadius: "18px", background: "#fff", color: "#0369a1",
        fontFamily: "'Outfit', sans-serif", fontSize: "1.2rem", fontWeight: 900,
        letterSpacing: "0.02em", border: "none", cursor: "pointer",
        boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
      }}
    >Comenzar partida 🎯</motion.button>
  );

  const renderTags = () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
      {["🎓 6 cursos", "⏱️ Timer", "🔥 Racha ×4", "💡 Aprende jugando", "🛒 Tienda"].map(tag => (
        <span key={tag} style={{ padding: "0.35rem 0.9rem", borderRadius: "999px", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.28)", fontSize: "0.76rem", fontWeight: 700, color: "#fff" }}>{tag}</span>
      ))}
    </div>
  );

  /* ── Mobile ─────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <motion.div
        style={{ width: "100%", height: "100%", minHeight: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "safe center", padding: "76px 20px 36px", overflowY: "auto" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      >
        {/* Top bar */}
        <div style={{ position: "absolute", top: 14, left: 16, right: 16, display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
          {renderCoinBadge()}
          <div style={{ display: "flex", gap: "6px" }}>
            <motion.button whileTap={{ scale: 0.94 }} onClick={onOpenShop} style={iconBtnStyle}>🛒</motion.button>
            <motion.button whileTap={{ scale: 0.94 }} onClick={onToggleMute} style={iconBtnStyle}>{isMuted ? "🔇" : "🔊"}</motion.button>
          </div>
        </div>

        <p style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fef08a", marginBottom: "0.35rem" }}>IGC · Juegos escolares</p>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.8rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.5rem", textShadow: "0 4px 20px rgba(0,0,0,0.18)" }}>Preguntados Escolar</h1>
        <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", textAlign: "center", lineHeight: 1.55, marginBottom: "1.2rem" }}>
          Elige tu curso y demuestra cuánto sabes con preguntas y respuestas a tu nivel.
        </p>

        {highScore > 0 && (
          <div style={{ ...glassCard, marginBottom: "1rem", padding: "0.65rem 1.3rem", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.4rem" }}>🏆</span>
            <div>
              <p style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Tu récord</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{highScore.toLocaleString()}</p>
            </div>
          </div>
        )}

        <div style={{ width: "100%", maxWidth: 300, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.1rem" }}>
          {renderPlayBtn(true)}
          {renderShopBtn(true)}
        </div>

        {renderTags()}
      </motion.div>
    );
  }

  /* ── Tablet ─────────────────────────────────────────────── */
  if (isTablet) {
    return (
      <motion.div
        style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "safe center", padding: "28px 40px", gap: "40px" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      >
        <div style={{ position: "absolute", top: 14, right: 18, display: "flex", gap: "7px" }}>
          {renderCoinBadge()}
          <motion.button whileTap={{ scale: 0.94 }} onClick={onToggleMute} style={iconBtnStyle}>{isMuted ? "🔇" : "🔊"}</motion.button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 380 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fef08a", marginBottom: "0.35rem" }}>IGC · Juegos escolares</p>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "3rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.5rem" }}>Preguntados Escolar</h1>
          <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.55, marginBottom: "1.2rem" }}>Elige tu curso y demuestra cuánto sabes.</p>
          {highScore > 0 && (
            <div style={{ ...glassCard, marginBottom: "1.2rem", padding: "0.6rem 1.3rem", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.4rem" }}>🏆</span>
              <div>
                <p style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Tu récord</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{highScore.toLocaleString()}</p>
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: "10px", marginBottom: "1.1rem" }}>
            {renderPlayBtn()}
            {renderShopBtn()}
          </div>
          {renderTags()}
        </div>
      </motion.div>
    );
  }

  /* ── Desktop ─────────────────────────────────────────────── */
  return (
    <motion.div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "safe center", padding: "40px 60px", gap: "64px" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
    >
      {/* Top-right controls */}
      <div style={{ position: "absolute", top: 18, right: 24, display: "flex", gap: "8px", alignItems: "center" }}>
        {renderCoinBadge()}
        <motion.button whileTap={{ scale: 0.94 }} onClick={onToggleMute} style={iconBtnStyle}>{isMuted ? "🔇" : "🔊"}</motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: 620, padding: "2.8rem 3.2rem", borderRadius: "30px", background: "rgba(3,105,161,0.25)", border: "1px solid rgba(255,255,255,0.28)", boxShadow: "0 24px 70px rgba(2,56,87,0.2)", backdropFilter: "blur(14px)" }}>
        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fef08a", marginBottom: "0.5rem" }}>Preguntados IGC</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "4.2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.6rem", textShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>Preguntados Escolar</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }} style={{ fontSize: "1.05rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", marginBottom: "1.6rem", lineHeight: 1.6 }}>
          Elige tu curso y demuestra cuánto sabes con preguntas y respuestas adaptadas a tu nivel.
        </motion.p>

        {highScore > 0 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} style={{ ...glassCard, marginBottom: "1.5rem", padding: "0.75rem 1.7rem", display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "1.7rem" }}>🏆</span>
            <div>
              <p style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.58)" }}>Tu récord</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{highScore.toLocaleString()} <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.52)", fontWeight: 600 }}>pts</span></p>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, type: "spring", stiffness: 200 }} style={{ display: "flex", gap: "12px", marginBottom: "1.4rem" }}>
          {renderPlayBtn()}
          {renderShopBtn()}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}>
          {renderTags()}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const glassCard: React.CSSProperties = {
  borderRadius: "16px",
  background: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(12px)",
  border: "1.5px solid rgba(255,255,255,0.32)",
};

const iconBtnStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.28)",
  borderRadius: "50%", width: 36, height: 36,
  display: "flex", alignItems: "center", justifyContent: "safe center",
  cursor: "pointer", fontSize: "1rem",
};
