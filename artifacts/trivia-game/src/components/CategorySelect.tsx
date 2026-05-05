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
          alignSelf: "flex-start", marginBottom: "1.5rem",
          fontSize: "0.72rem", fontWeight: 700, color: "#1e3a5f",
          background: "transparent", border: "none", cursor: "pointer",
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}
      >
        ← Volver
      </button>

      {/* I.G.C label */}
      <div style={{ marginBottom: "0.3rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#3b82f6", textTransform: "uppercase" }}>
          I.G.C Trivia
        </span>
      </div>

      <h2 style={{
        fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", fontWeight: 900,
        color: "#ffffff", letterSpacing: "-0.02em", marginBottom: "0.2rem",
      }}>
        Categoría
      </h2>
      <p style={{ fontSize: "0.8rem", color: "#1e3a5f", fontWeight: 500, marginBottom: "1.4rem" }}>
        Elige tu especialidad o juega con todo
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {categories.map((cat, i) => {
          const isAll = cat === "all";
          const color = isAll ? "#60a5fa" : CATEGORY_COLORS[cat as Category];
          const icon = isAll ? "🌟" : CATEGORY_ICONS[cat as Category];
          const meta = META[cat];

          return (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.16 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGame(cat)}
              style={{
                display: "flex", alignItems: "center", gap: "0.85rem",
                padding: "0.85rem 1rem", borderRadius: "13px",
                background: "rgba(255,255,255,0.03)",
                border: "1.5px solid rgba(255,255,255,0.06)",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <span style={{
                width: 38, height: 38, borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${color}15`,
                fontSize: "1.05rem", flexShrink: 0,
              }}>
                {icon}
              </span>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.93rem", fontWeight: 700, color: "#eef2ff", lineHeight: 1.2 }}>
                  {meta.label}
                </p>
                <p style={{ fontSize: "0.7rem", color: "#1e3a5f", fontWeight: 500, marginTop: "2px" }}>
                  {meta.sub}
                </p>
              </div>
              <span style={{ marginLeft: "auto", color: "#1e2d45", fontSize: "0.9rem" }}>›</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
