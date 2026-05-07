import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS, Category } from "../data/questions";

const categories: (Category | "all")[] = ["all", "genius", "entertainment", "sports", "culture", "random"];

const META: Record<string, { label: string; sub: string }> = {
  all:           { label: "Todas las categorías", sub: "Preguntas mezcladas" },
  genius:        { label: "Modo Genio",            sub: "Ciencia · Historia · Cultura" },
  entertainment: { label: "Entretenimiento",        sub: "Cine · Series · Libros" },
  sports:        { label: "Deportes",               sub: "Fútbol · Olimpiadas · Récords" },
  culture:       { label: "Cultura Pop",            sub: "Música · Anime · Videojuegos" },
  random:        { label: "Datos Random",           sub: "Curiosidades del mundo" },
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
          fontSize: "0.74rem", fontWeight: 700, color: "rgba(255,255,255,0.85)",
          background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.3)",
          cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "0.35rem 0.85rem", borderRadius: "999px",
        }}
      >
        ← Volver
      </button>

      <h2 style={{
        fontFamily: "'Outfit', sans-serif", fontSize: "1.9rem", fontWeight: 900,
        color: "#fff", letterSpacing: "-0.03em", marginBottom: "0.2rem",
        textShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>
        ¿Che Sabes?
      </h2>
      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.78)", fontWeight: 600, marginBottom: "1.4rem" }}>
        Elegí tu categoría para comenzar
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {categories.map((cat, i) => {
          const isAll = cat === "all";
          const color = isAll ? "#0369a1" : CATEGORY_COLORS[cat as Category];
          const icon = isAll ? "🌟" : CATEGORY_ICONS[cat as Category];
          const meta = META[cat];

          return (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.045, duration: 0.16 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGame(cat)}
              style={{
                display: "flex", alignItems: "center", gap: "0.9rem",
                padding: "0.9rem 1rem", borderRadius: "16px",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid rgba(255,255,255,0.95)",
                cursor: "pointer", textAlign: "left",
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{
                width: 48, height: 48, borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${color}1a`,
                fontSize: "1.5rem", flexShrink: 0,
              }}>
                {icon}
              </span>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.96rem", fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>
                  {meta.label}
                </p>
                <p style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 500, marginTop: "2px" }}>
                  {meta.sub}
                </p>
              </div>
              <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: "1.2rem" }}>›</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
