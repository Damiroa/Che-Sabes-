import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

export function MenuScreen() {
  const { goToMenu, highScore } = useGameStore();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-2"
      >
        <div className="text-8xl mb-4 select-none">🧠</div>
        <h1
          className="text-5xl font-black tracking-tight mb-2"
          style={{ color: "#e2e8f0" }}
        >
          TRIVIA
          <span style={{ color: "#a78bfa" }}> MASTER</span>
        </h1>
        <p className="text-lg" style={{ color: "#94a3b8" }}>
          Pon a prueba tu conocimiento
        </p>
      </motion.div>

      {highScore > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 px-6 py-3 rounded-2xl"
          style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}
        >
          <p className="text-sm" style={{ color: "#94a3b8" }}>Récord histórico</p>
          <p className="text-3xl font-black" style={{ color: "#a78bfa" }}>
            {highScore.toLocaleString()} pts
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 180 }}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <button
          onClick={() => useGameStore.getState().resetGame()}
          className="w-full py-5 rounded-2xl text-xl font-black tracking-wide transition-all duration-150 active:scale-95 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
            color: "#fff",
            boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
          }}
        >
          ¡JUGAR AHORA!
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 grid grid-cols-3 gap-6 text-center max-w-sm"
      >
        {[
          { icon: "❤️", label: "3 vidas" },
          { icon: "⚡", label: "Rachas x4" },
          { icon: "⏭️", label: "2 skips" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <span className="text-3xl">{item.icon}</span>
            <span className="text-xs font-semibold" style={{ color: "#64748b" }}>
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
