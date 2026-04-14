import { motion } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";

export function FeedbackScreen() {
  const {
    lastAnswerCorrect,
    lastCorrectAnswer,
    streak,
    currentQuestion,
    nextQuestion,
    lives,
  } = useGameStore();

  if (!currentQuestion) return null;

  const multiplier = getStreakMultiplier(streak);
  const isCorrect = lastAnswerCorrect === true;

  const bgColor = isCorrect ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)";
  const borderColor = isCorrect ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)";
  const accentColor = isCorrect ? "#22c55e" : "#ef4444";
  const emoji = isCorrect ? "🎉" : "💔";
  const title = isCorrect ? "¡Correcto!" : "¡Incorrecto!";

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="text-8xl mb-6"
      >
        {emoji}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-black mb-4"
        style={{ color: accentColor }}
      >
        {title}
      </motion.h2>

      {!isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-5 py-3 rounded-2xl mb-6"
          style={{ background: bgColor, border: `1.5px solid ${borderColor}` }}
        >
          <p className="text-sm mb-1" style={{ color: "#94a3b8" }}>La respuesta correcta era:</p>
          <p className="text-xl font-bold" style={{ color: "#e2e8f0" }}>{lastCorrectAnswer}</p>
        </motion.div>
      )}

      {isCorrect && streak >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
          className="px-5 py-3 rounded-2xl mb-6 flex items-center gap-2"
          style={{ background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.35)" }}
        >
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-black text-lg" style={{ color: "#facc15" }}>
              Racha de {streak}! ×{multiplier} multiplicador
            </p>
          </div>
        </motion.div>
      )}

      {!isCorrect && (
        <div className="flex gap-1 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="text-2xl"
              style={{ opacity: i < lives ? 1 : 0.2 }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={nextQuestion}
        className="w-full max-w-sm py-5 rounded-2xl text-xl font-black transition-all"
        style={{
          background: `linear-gradient(135deg, #7c3aed, #a78bfa)`,
          color: "#fff",
          boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
        }}
      >
        Siguiente →
      </motion.button>
    </motion.div>
  );
}
