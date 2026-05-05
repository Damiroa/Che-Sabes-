import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS, Category } from "../data/questions";

const categories: (Category | "all")[] = ["all", "genius", "entertainment", "sports", "culture", "random"];

const META: Record<string, { label: string; sub: string }> = {
  all: { label: "Todas las categorías", sub: "Preguntas mezcladas" },
  genius: { label: "Modo Genio", sub: "Ciencia · Historia · Cultura" },
  entertainment: { label: "Entretenimiento", sub: "Cine · Series · Libros" },
  sports: { label: "Deportes", sub: "Fútbol · Olimpiadas · Récords" },
  culture: { label: "Cultura Pop", sub: "Música · Anime · Videojuegos" },
  random: { label: "Datos Random", sub: "Curiosidades del mundo" },
};

export function CategorySelect() {
  const { startGame, goToMenu } = useGameStore();

  return (
    <motion.div
      className="flex flex-col min-h-screen px-5 pt-5 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <button
        onClick={goToMenu}
        style={{
          alignSelf: "flex-start",
          marginBottom: "1.5rem",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#475569",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        ← Volver
      </button>

      <h2 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "1.5rem",
        fontWeight: 900,
        color: "#e2e8f0",
        letterSpacing: "-0.02em",
        marginBottom: "0.25rem",
      }}>
        Categoría
      </h2>
      <p style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 500, marginBottom: "1.5rem" }}>
        Elige tu especialidad o juega con todo
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {categories.map((cat, i) => {
          const isAll = cat === "all";
          const color = isAll ? "#a78bfa" : CATEGORY_COLORS[cat as Category];
          const icon = isAll ? "🌟" : CATEGORY_ICONS[cat as Category];
          const meta = META[cat];

          return (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.18 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGame(cat)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                padding: "0.9rem 1rem",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.035)",
                border: `1.5px solid rgba(255,255,255,0.07)`,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{
                width: 38, height: 38, borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${color}18`,
                fontSize: "1.1rem",
                flexShrink: 0,
              }}>
                {icon}
              </span>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#e2e8f0", lineHeight: 1.2 }}>
                  {meta.label}
                </p>
                <p style={{ fontSize: "0.72rem", color: "#475569", fontWeight: 500, marginTop: "2px" }}>
                  {meta.sub}
                </p>
              </div>
              <span style={{ marginLeft: "auto", color: "#334155", fontSize: "0.9rem" }}>›</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
