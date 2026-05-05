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
      style={{ background: "#f7f8fc" }}
    >
      <button
        onClick={goToMenu}
        style={{
          alignSelf: "flex-start", marginBottom: "1.5rem",
          fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8",
          background: "transparent", border: "none", cursor: "pointer",
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}
      >
        ← Volver
      </button>

      <h2 style={{
        fontFamily: "'Outfit', sans-serif", fontSize: "1.6rem", fontWeight: 900,
        color: "#0f172a", letterSpacing: "-0.03em", marginBottom: "0.2rem",
      }}>
        ¿Che Sabes?
      </h2>
      <p style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 500, marginBottom: "1.4rem" }}>
        Elegí tu categoría para comenzar
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
        {categories.map((cat, i) => {
          const isAll = cat === "all";
          const color = isAll ? "#0f172a" : CATEGORY_COLORS[cat as Category];
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
                padding: "0.85rem 1rem", borderRadius: "14px",
                background: "#fff",
                border: "1.5px solid #e2e8f0",
                cursor: "pointer", textAlign: "left",
                boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
              }}
            >
              <span style={{
                width: 40, height: 40, borderRadius: "11px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${color}14`,
                fontSize: "1.1rem", flexShrink: 0,
              }}>
                {icon}
              </span>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.94rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>
                  {meta.label}
                </p>
                <p style={{ fontSize: "0.71rem", color: "#94a3b8", fontWeight: 500, marginTop: "2px" }}>
                  {meta.sub}
                </p>
              </div>
              <span style={{ marginLeft: "auto", color: "#cbd5e1", fontSize: "1rem" }}>›</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
