import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

function TriviaLogo() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </radialGradient>
        <linearGradient id="shineGrad" x1="20%" y1="15%" x2="80%" y2="85%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="22" fill="url(#bgGrad)" />
      <rect width="80" height="80" rx="22" fill="url(#shineGrad)" />
      <text x="40" y="52" textAnchor="middle" fontSize="38" fontFamily="Outfit, sans-serif" fontWeight="900" fill="white">?</text>
      <circle cx="62" cy="18" r="8" fill="#facc15" />
      <text x="62" y="22" textAnchor="middle" fontSize="10" fontFamily="Outfit, sans-serif" fontWeight="800" fill="#78350f">!</text>
    </svg>
  );
}

export function MenuScreen() {
  const { highScore } = useGameStore();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: "linear-gradient(160deg, #0d0d1a 60%, #1a0d2e 100%)" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="mb-5 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-5"
        >
          <TriviaLogo />
        </motion.div>

        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "3rem",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: "linear-gradient(135deg, #ffffff 30%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.35rem",
          }}
        >
          TRIVIA<br />
          <span style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "2.4rem",
            letterSpacing: "-0.02em",
          }}>MASTER</span>
        </h1>

        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#64748b",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Pon a prueba tu conocimiento
        </p>
      </motion.div>

      {/* High score */}
      {highScore > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 px-6 py-3 rounded-2xl flex flex-col items-center"
          style={{
            background: "rgba(167,139,250,0.1)",
            border: "1px solid rgba(167,139,250,0.25)",
          }}
        >
          <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", marginBottom: "2px" }}>
            Récord histórico
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2rem", fontWeight: 900, color: "#a78bfa", lineHeight: 1 }}>
            {highScore.toLocaleString()} <span style={{ fontSize: "1rem", fontWeight: 600, color: "#7c3aed" }}>pts</span>
          </p>
        </motion.div>
      )}

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 180 }}
        className="w-full max-w-xs"
      >
        <button
          onClick={() => useGameStore.getState().resetGame()}
          className="w-full rounded-2xl transition-all duration-150 active:scale-95 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            color: "#fff",
            boxShadow: "0 8px 40px rgba(124,58,237,0.45)",
            padding: "1.1rem 0",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          ¡ JUGAR AHORA !
        </button>
      </motion.div>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="mt-10 flex gap-3 flex-wrap justify-center"
      >
        {[
          { icon: "❤️", label: "3 vidas" },
          { icon: "🔥", label: "Rachas ×4" },
          { icon: "⏭️", label: "2 skips" },
          { icon: "📈", label: "5 categorías" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#64748b",
              letterSpacing: "0.05em",
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
