import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

const AUTO_ADVANCE_MS = 2000;

const STAGE_META: Record<number, {
  emoji: string; label: string; sublabel: string;
  accent: string; glow: string; particles: string[];
}> = {
  2: {
    emoji: "⚡",
    label: "¡Fase 2!",
    sublabel: "Nivel Medio",
    accent: "#d97706",
    glow: "rgba(217,119,6,0.4)",
    particles: ["🌟", "⚡", "🔸", "✨", "⚡", "🌟"],
  },
  3: {
    emoji: "🔥",
    label: "¡Fase 3!",
    sublabel: "Nivel Difícil",
    accent: "#dc2626",
    glow: "rgba(220,38,38,0.4)",
    particles: ["🔥", "💀", "🔴", "🔥", "💥", "🔥"],
  },
};

function getMeta(stage: number) {
  return STAGE_META[stage] ?? {
    emoji: "💀", label: `¡Fase ${stage}!`, sublabel: "Modo Experto",
    accent: "#7c3aed", glow: "rgba(124,58,237,0.4)",
    particles: ["💀", "⚡", "🔮", "💀", "✨", "🔮"],
  };
}

interface Particle { id: number; x: number; y: number; emoji: string; delay: number }

export function StageUpScreen() {
  const { stage, timerSeconds, score, continueAfterStageUp } = useGameStore();
  const [frozenStage]  = useState(() => stage);
  const [frozenTimer]  = useState(() => timerSeconds);
  const [frozenScore]  = useState(() => score);
  const [countdown, setCountdown] = useState(2);
  const [progress, setProgress] = useState(1);

  const [particles] = useState<Particle[]>(() => {
    const m = getMeta(stage);
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      emoji: m.particles[i % m.particles.length],
      delay: Math.random() * 0.4,
    }));
  });

  const meta = getMeta(frozenStage);

  useEffect(() => {
    // Countdown: 2 → 1 → advance
    const t1 = setTimeout(() => setCountdown(1), 1000);
    const t2 = setTimeout(() => continueAfterStageUp(), AUTO_ADVANCE_MS);

    // Progress bar
    const start = Date.now();
    const raf = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.max(0, 1 - elapsed / AUTO_ADVANCE_MS));
      if (elapsed >= AUTO_ADVANCE_MS) clearInterval(raf);
    }, 30);

    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(raf); };
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
      transition={{ duration: 0.25 }}
    >
      {/* Flash overlay */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0, background: "#fff", zIndex: 0, pointerEvents: "none" }}
      />

      {/* Floating emoji particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.7], y: -90 }}
          transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
          style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            fontSize: "1.8rem", zIndex: 1, pointerEvents: "none",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        initial={{ scale: 0.55, opacity: 0, y: 50, rotate: -5 }}
        animate={{ scale: 1,    opacity: 1, y: 0,  rotate: 0  }}
        exit={{   scale: 0.8,   opacity: 0, y: -28, rotate: 3  }}
        transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.08 }}
        style={{
          position: "relative", zIndex: 5,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "2.5px solid rgba(255,255,255,0.98)",
          borderRadius: "28px",
          padding: "1.8rem 2rem 1.4rem",
          width: "100%", maxWidth: "300px",
          textAlign: "center",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.5), 0 24px 64px ${meta.glow}, 0 8px 24px rgba(15,23,42,0.12)`,
        }}
      >
        {/* Emoji bounce */}
        <motion.div
          animate={{ y: [0, -12, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.7, repeat: 2, ease: "easeInOut" }}
          style={{ fontSize: "3.6rem", lineHeight: 1, marginBottom: "0.5rem" }}
        >
          {meta.emoji}
        </motion.div>

        {/* Labels */}
        <p style={{
          fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#94a3b8", marginBottom: "2px",
        }}>
          ¡Nivel superado!
        </p>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "2.1rem", fontWeight: 900,
          color: meta.accent, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "2px",
        }}>
          {meta.label}
        </h2>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 700,
          color: "#0f172a", marginBottom: "1rem",
        }}>
          {meta.sublabel}
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
          <div style={{ flex: 1, background: "rgba(15,23,42,0.05)", borderRadius: "12px", padding: "0.55rem 0.4rem" }}>
            <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "2px" }}>Puntaje</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: "#0f172a" }}>
              {frozenScore.toLocaleString()}
            </p>
          </div>
          <div style={{ flex: 1, background: "rgba(15,23,42,0.05)", borderRadius: "12px", padding: "0.55rem 0.4rem" }}>
            <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "2px" }}>Tiempo</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: meta.accent }}>
              {frozenTimer}s
            </p>
          </div>
          {/* Countdown */}
          <div style={{ flex: 1, background: meta.glow.replace("0.4", "0.12"), borderRadius: "12px", padding: "0.55rem 0.4rem", border: `1.5px solid ${meta.glow.replace("0.4", "0.3")}` }}>
            <p style={{ fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "2px" }}>Inicio en</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={countdown}
                initial={{ scale: 1.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 900, color: meta.accent, lineHeight: 1 }}
              >
                {countdown}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%", height: "5px", borderRadius: "999px", background: "rgba(15,23,42,0.1)", overflow: "hidden" }}>
          <motion.div
            style={{
              height: "100%", borderRadius: "999px",
              background: `linear-gradient(90deg, ${meta.accent}, ${meta.glow.replace("0.4", "0.8")})`,
              width: `${progress * 100}%`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
