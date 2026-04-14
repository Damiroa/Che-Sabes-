import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  Category,
} from "../data/questions";

const categories: (Category | "all")[] = [
  "all",
  "genius",
  "entertainment",
  "sports",
  "culture",
  "random",
];

const ALL_LABEL = "Todas las categorías";
const ALL_ICON = "🌟";
const ALL_COLOR = "#a78bfa";

export function CategorySelect() {
  const { startGame, goToMenu } = useGameStore();

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen px-6 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={goToMenu}
        className="self-start mb-8 flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
        style={{ color: "#64748b" }}
      >
        ← Volver
      </motion.button>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black mb-2"
        style={{ color: "#e2e8f0" }}
      >
        Elige tu categoría
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm mb-8"
        style={{ color: "#64748b" }}
      >
        Selecciona una o juega con todas
      </motion.p>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {categories.map((cat, i) => {
          const isAll = cat === "all";
          const color = isAll ? ALL_COLOR : CATEGORY_COLORS[cat as Category];
          const icon = isAll ? ALL_ICON : CATEGORY_ICONS[cat as Category];
          const label = isAll ? ALL_LABEL : CATEGORY_LABELS[cat as Category];

          return (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => startGame(cat)}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all"
              style={{
                background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                border: `1.5px solid ${color}55`,
              }}
            >
              <span className="text-3xl">{icon}</span>
              <div>
                <p className="font-bold text-base" style={{ color: "#e2e8f0" }}>
                  {label}
                </p>
                {isAll && (
                  <p className="text-xs" style={{ color: "#64748b" }}>
                    Preguntas de todas las categorías
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
