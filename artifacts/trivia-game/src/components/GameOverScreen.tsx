import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

export function GameOverScreen() {
  const { score, highScore, bestStreak, questionsAnswered, resetGame, goToMenu } = useGameStore();

  const isNewRecord = score >= highScore && score > 0;

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="text-8xl mb-4"
      >
        {isNewRecord ? "🏆" : "💀"}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-4xl font-black mb-1"
        style={{ color: "#e2e8f0" }}
      >
        {isNewRecord ? "¡Nuevo Récord!" : "Juego Terminado"}
      </motion.h2>

      {isNewRecord && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-6"
          style={{ color: "#a78bfa" }}
        >
          ¡Superaste tu mejor puntaje!
        </motion.p>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8 mt-4"
      >
        {[
          { label: "Puntaje", value: score.toLocaleString(), icon: "⭐" },
          { label: "Mejor racha", value: `×${bestStreak}`, icon: "🔥" },
          { label: "Respondidas", value: questionsAnswered, icon: "📝" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-4 px-2 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span className="text-2xl mb-1">{stat.icon}</span>
            <span className="text-xl font-black" style={{ color: "#e2e8f0" }}>
              {stat.value}
            </span>
            <span className="text-xs" style={{ color: "#64748b" }}>{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* High score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mb-8 px-6 py-3 rounded-2xl"
        style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)" }}
      >
        <p className="text-sm mb-0.5" style={{ color: "#64748b" }}>Récord histórico</p>
        <p className="text-3xl font-black" style={{ color: "#a78bfa" }}>
          {highScore.toLocaleString()} pts
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <button
          onClick={resetGame}
          className="w-full py-5 rounded-2xl text-xl font-black transition-all hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            color: "#fff",
            boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
          }}
        >
          Jugar de nuevo
        </button>
        <button
          onClick={goToMenu}
          className="w-full py-4 rounded-2xl text-base font-semibold transition-all hover:opacity-80"
          style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}
        >
          Ir al menú
        </button>
      </motion.div>
    </motion.div>
  );
}
