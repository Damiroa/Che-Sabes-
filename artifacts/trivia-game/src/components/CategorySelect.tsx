import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS, Category } from "../data/questions";
import { audio } from "../utils/audio";

const categories: (Category | "all")[] = ["all", "genius", "entertainment", "sports", "culture", "random"];

const META: Record<string, { label: string; sub: string }> = {
  all:           { label: "Todas las categorías", sub: "Preguntas mezcladas"          },
  genius:        { label: "Modo Genio",            sub: "Ciencia · Historia · Cultura" },
  entertainment: { label: "Entretenimiento",        sub: "Cine · Series · Libros"       },
  sports:        { label: "Deportes",               sub: "Fútbol · Olimpiadas · Récords" },
  culture:       { label: "Cultura Pop",            sub: "Música · Anime · Juegos"      },
  random:        { label: "Datos Random",           sub: "Curiosidades del mundo"        },
};

interface Props { isMuted: boolean }

export function CategorySelect({ isMuted }: Props) {
  const { startGame, goToMenu } = useGameStore();

  return (
    <motion.div
      style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "stretch",
        padding: "40px 60px", gap: "60px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Left panel */}
      <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <button
          onClick={() => { if (!isMuted) audio.click(); goToMenu(); }}
          style={{
            alignSelf: "flex-start", marginBottom: "2rem",
            fontSize: "0.76rem", fontWeight: 700, color: "rgba(255,255,255,0.85)",
            background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.3)",
            cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em",
            padding: "0.4rem 1rem", borderRadius: "999px",
          }}
        >← Volver</button>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "2.8rem", fontWeight: 900,
            color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05,
            marginBottom: "0.75rem",
            textShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >Elegí tu categoría</motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.72)", fontWeight: 500, lineHeight: 1.55 }}
        >
          La dificultad sube automáticamente cada 10 preguntas. ¿Llegás a la Fase 3?
        </motion.p>
      </div>

      {/* Right — 2×3 grid */}
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "14px", alignContent: "center",
      }}>
        {categories.map((cat, i) => {
          const isAll  = cat === "all";
          const color  = isAll ? "#0369a1" : CATEGORY_COLORS[cat as Category];
          const icon   = isAll ? "🌟" : CATEGORY_ICONS[cat as Category];
          const meta   = META[cat];

          return (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.22 }}
              whileHover={{ scale: 1.04, y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { if (!isMuted) audio.click(); startGame(cat); }}
              className="neon-btn"
              style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start",
                padding: "1.25rem 1.4rem", borderRadius: "20px",
                background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)",
                border: "2px solid rgba(255,255,255,0.95)",
                cursor: "pointer", textAlign: "left",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{
                width: 52, height: 52, borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${color}20`, fontSize: "1.6rem", flexShrink: 0, marginBottom: "0.75rem",
              }}>{icon}</span>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "3px" }}>
                {meta.label}
              </p>
              <p style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500 }}>
                {meta.sub}
              </p>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
