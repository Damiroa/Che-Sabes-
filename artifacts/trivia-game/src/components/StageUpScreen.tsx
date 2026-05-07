import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

const AUTO_ADVANCE_MS = 3200;

const STAGE_META: Record<number, {
  emoji: string; label: string; sublabel: string;
  accent: string; glow: string; particles: string[];
}> = {
  2: {
    emoji: "⚡",
    label: "¡Fase 2!",
    sublabel: "Nivel Medio",
    accent: "#d97706",
    glow: "rgba(217,119,6,0.35)",
    particles: ["🌟", "⚡", "🔸", "✨", "⚡"],
  },
  3: {
    emoji: "🔥",
    label: "¡Fase 3!",
    sublabel: "Nivel Difícil",
    accent: "#dc2626",
    glow: "rgba(220,38,38,0.35)",
    particles: ["🔥", "💀", "🔴", "🔥", "💥"],
  },
};

function getMeta(stage: number) {
  return STAGE_META[stage] ?? {
    emoji: "💀",
    label: `¡Fase ${stage}!`,
    sublabel: "Modo Experto",
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.35)",
    particles: ["💀", "⚡", "🔮", "💀", "✨"],
  };
}

interface Particle { id: number; x: number; y: number; emoji: string; delay: number }

export function StageUpScreen() {
  const { stage, timerSeconds, score, continueAfterStageUp } = useGameStore();
  const [frozenStage]  = useState(() => stage);
  const [frozenTimer]  = useState(() => timerSeconds);
  const [frozenScore]  = useState(() => score);
  const [progress, setProgress] = useState(1);
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: getMeta(stage).particles[i % getMeta(stage).particles.length],
      delay: Math.random() * 0.6,
    }))
  );

  const meta = getMeta(frozenStage);

  useEffect(() => {
    const start = Date.now();
    const raf = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.max(0, 1 - elapsed / AUTO_ADVANCE_MS));
      if (elapsed >= AUTO_ADVANCE_MS) {
        clearInterval(raf);
        continueAfterStageUp();
      }
    }, 30);
    return () => clearInterval(raf);
  }, []);

  return (
    <motion.div
      style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 20, overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Full screen color flash on enter */}
      <motion.div
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute", inset: 0,
          background: meta.accent,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Floating emoji particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], y: -80 }}
          transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: "1.5rem",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 40, rotate: -4 }}
        animate={{ scale: 1,   opacity: 1, y: 0,  rotate: 0  }}
        exit={{   scale: 0.85, opacity: 0, y: -30, rotate: 2  }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        style={{
          position: "relative", zIndex: 5,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "2px solid rgba(255,255,255,0.95)",
          borderRadius: "28px",
          padding: "2.2rem 2rem 1.6rem",
          width: "100%", maxWidth: "300px",
          textAlign: "center",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.6), 0 20px 60px ${meta.glow}, 0 8px 24px rgba(15,23,42,0.1)`,
        }}
      >
        {/* Emoji bounce */}
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 0.8, repeat: 2, ease: "easeInOut" }}
          style={{ fontSize: "3.8rem", lineHeight: 1, marginBottom: "0.6rem" }}
        >
          {meta.emoji}
        </motion.div>

        {/* Stage label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p style={{
            fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#94a3b8", marginBottom: "4px",
          }}>
            ¡Nivel superado!
          </p>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "2rem", fontWeight: 900,
            color: meta.accent, letterSpacing: "-0.03em",
            lineHeight: 1, marginBottom: "2px",
          }}>
            {meta.label}
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1rem", fontWeight: 700,
            color: "#0f172a", marginBottom: "1.1rem",
          }}>
            {meta.sublabel}
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            display: "flex", gap: "10px", marginBottom: "1.2rem",
          }}
        >
          <div style={{
            flex: 1, background: "rgba(15,23,42,0.05)", borderRadius: "12px",
            padding: "0.6rem 0.5rem",
          }}>
            <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "2px" }}>Puntaje</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: "#0f172a" }}>
              {frozenScore.toLocaleString()}
            </p>
          </div>
          <div style={{
            flex: 1, background: "rgba(15,23,42,0.05)", borderRadius: "12px",
            padding: "0.6rem 0.5rem",
          }}>
            <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "2px" }}>Tiempo</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: meta.accent }}>
              {frozenTimer}s
            </p>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div style={{
          width: "100%", height: "5px", borderRadius: "999px",
          background: "rgba(15,23,42,0.1)", overflow: "hidden",
          marginBottom: "6px",
        }}>
          <motion.div
            style={{
              height: "100%", borderRadius: "999px",
              background: `linear-gradient(90deg, ${meta.accent}, ${meta.glow.replace("0.35", "0.8")})`,
              width: `${progress * 100}%`,
            }}
          />
        </div>
        <p style={{ fontSize: "0.62rem", color: "#94a3b8", fontWeight: 700 }}>
          Continuando automáticamente…
        </p>
      </motion.div>
    </motion.div>
  );
}
