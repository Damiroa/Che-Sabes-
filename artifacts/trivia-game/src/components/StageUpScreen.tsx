import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

const AUTO_ADVANCE_MS = 2800;

const STAGE_META: Record<number, { emoji: string; label: string; diffColor: string }> = {
  2: { emoji: "⚡", label: "Fase 2 — Nivel Medio",  diffColor: "#d97706" },
  3: { emoji: "🔥", label: "Fase 3 — Nivel Difícil", diffColor: "#dc2626" },
};

function getMeta(stage: number) {
  return STAGE_META[stage] ?? { emoji: "💀", label: `Fase ${stage} — Modo Experto`, diffColor: "#dc2626" };
}

export function StageUpScreen() {
  const { stage, timerSeconds, score, continueAfterStageUp } = useGameStore();

  const [frozenStage]  = useState(() => stage);
  const [frozenTimer]  = useState(() => timerSeconds);
  const [frozenScore]  = useState(() => score);
  const [progress, setProgress] = useState(1);

  const meta = getMeta(frozenStage);

  // Shrink progress bar and auto-advance
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
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "2rem",
        zIndex: 10,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Frosted card */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 20 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{   scale: 0.88,  opacity: 0, y: -16 }}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.05 }}
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1.5px solid rgba(255,255,255,0.9)",
          borderRadius: "24px",
          padding: "2rem 2rem 1.5rem",
          width: "100%", maxWidth: "310px",
          boxShadow: "0 8px 40px rgba(15,23,42,0.12)",
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.12 }}
          style={{ fontSize: "3.2rem", marginBottom: "0.75rem", lineHeight: 1 }}
        >
          {meta.emoji}
        </motion.div>

        <p style={{
          fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.16em",
          textTransform: "uppercase", color: "#94a3b8", marginBottom: "0.3rem",
        }}>
          ¡Nivel superado!
        </p>

        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.7rem", fontWeight: 900,
          color: "#0f172a", letterSpacing: "-0.03em",
          marginBottom: "0.2rem", lineHeight: 1.1,
        }}>
          {meta.label}
        </h2>

        <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "1.25rem" }}>
          Puntaje: <strong style={{ color: "#0f172a" }}>{frozenScore.toLocaleString()}</strong>
          &nbsp;·&nbsp;Tiempo: <strong style={{ color: meta.diffColor }}>{frozenTimer}s</strong>
        </p>

        {/* Auto-progress bar */}
        <div style={{
          width: "100%", height: "4px", borderRadius: "999px",
          background: "rgba(15,23,42,0.1)", overflow: "hidden",
        }}>
          <motion.div
            style={{
              height: "100%", borderRadius: "999px",
              background: meta.diffColor,
              width: `${progress * 100}%`,
            }}
          />
        </div>
        <p style={{ fontSize: "0.65rem", color: "#94a3b8", marginTop: "6px", fontWeight: 600 }}>
          Continuando automáticamente…
        </p>
      </motion.div>
    </motion.div>
  );
}
