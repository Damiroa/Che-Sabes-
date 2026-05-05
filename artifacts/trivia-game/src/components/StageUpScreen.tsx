import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

const STAGE_META: Record<number, { emoji: string; title: string; sub: string; diffLabel: string; diffColor: string }> = {
  2: { emoji: "⚡", title: "Fase 2", sub: "Las preguntas se ponen serias", diffLabel: "MEDIO", diffColor: "#d97706" },
  3: { emoji: "🔥", title: "Fase 3", sub: "Solo para los mejores", diffLabel: "DIFÍCIL", diffColor: "#dc2626" },
};

function getMeta(stage: number) {
  return STAGE_META[stage] ?? {
    emoji: "💀",
    title: `Fase ${stage}`,
    sub: "Estás en terreno peligroso",
    diffLabel: "DIFÍCIL",
    diffColor: "#dc2626",
  };
}

export function StageUpScreen() {
  const { stage, timerSeconds, score, questionsAnswered, continueAfterStageUp } = useGameStore();

  // Freeze values at mount
  const [frozenStage] = useState(() => stage);
  const [frozenTimer] = useState(() => timerSeconds);
  const [frozenScore] = useState(() => score);

  const meta = getMeta(frozenStage);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ background: "#f7f8fc" }}
    >
      {/* Stage icon */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.05 }}
        style={{
          width: 90, height: 90, borderRadius: "28px",
          background: "#0f172a",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2.6rem",
          marginBottom: "1.5rem",
          boxShadow: "0 8px 32px rgba(15,23,42,0.18)",
        }}
      >
        {meta.emoji}
      </motion.div>

      {/* Stage label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#94a3b8", marginBottom: "0.35rem",
        }}
      >
        ¡Nivel superado!
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "3rem", fontWeight: 900,
          color: "#0f172a", letterSpacing: "-0.05em",
          lineHeight: 1, marginBottom: "0.4rem",
        }}
      >
        {meta.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28 }}
        style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 500, marginBottom: "1.75rem" }}
      >
        {meta.sub}
      </motion.p>

      {/* Info cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "10px", width: "100%", maxWidth: "300px",
          marginBottom: "2rem",
        }}
      >
        {/* Difficulty */}
        <div style={{
          padding: "0.9rem 0.75rem", borderRadius: "14px",
          background: "#fff", border: "1.5px solid #e2e8f0",
          boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "4px" }}>
            Dificultad
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: meta.diffColor }}>
            {meta.diffLabel}
          </p>
        </div>

        {/* Timer */}
        <div style={{
          padding: "0.9rem 0.75rem", borderRadius: "14px",
          background: "#fff", border: "1.5px solid #e2e8f0",
          boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "4px" }}>
            Tiempo
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: frozenTimer <= 10 ? "#dc2626" : "#d97706" }}>
            {frozenTimer}s
          </p>
        </div>

        {/* Score so far */}
        <div style={{
          padding: "0.9rem 0.75rem", borderRadius: "14px",
          background: "#fff", border: "1.5px solid #e2e8f0",
          boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
          display: "flex", flexDirection: "column", alignItems: "center",
          gridColumn: "1 / -1",
        }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "4px" }}>
            Puntaje acumulado
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 900, color: "#0f172a" }}>
            {frozenScore.toLocaleString()} pts
          </p>
        </div>
      </motion.div>

      {/* Continue */}
      <motion.button
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, type: "spring", stiffness: 200 }}
        whileTap={{ scale: 0.97 }}
        onClick={continueAfterStageUp}
        style={{
          width: "100%", maxWidth: "280px",
          padding: "1.1rem 0",
          borderRadius: "14px",
          background: "#0f172a",
          color: "#fff",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "1.05rem", fontWeight: 800,
          letterSpacing: "0.04em",
          border: "none", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(15,23,42,0.2)",
        }}
      >
        ¡Siguiente fase! →
      </motion.button>
    </motion.div>
  );
}
