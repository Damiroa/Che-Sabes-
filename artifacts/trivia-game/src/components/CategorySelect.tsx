import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS, Category } from "../data/questions";

const categories: (Category | "all")[] = ["all", "genius", "entertainment", "sports", "culture", "random"];

const META: Record<string, { label: string; sub: string; emoji: string }> = {
  all:           { label: "Todas",           sub: "Preguntas mezcladas",          emoji: "🌟" },
  genius:        { label: "Modo Genio",      sub: "Ciencia · Historia · Cultura", emoji: CATEGORY_ICONS["genius"] },
  entertainment: { label: "Entretenimiento", sub: "Cine · Series · Libros",       emoji: CATEGORY_ICONS["entertainment"] },
  sports:        { label: "Deportes",        sub: "Fútbol · Olimpiadas",          emoji: CATEGORY_ICONS["sports"] },
  culture:       { label: "Cultura Pop",     sub: "Música · Anime · Juegos",      emoji: CATEGORY_ICONS["culture"] },
  random:        { label: "Datos Random",    sub: "Curiosidades del mundo",        emoji: CATEGORY_ICONS["random"] },
};

export function CategorySelect() {
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
          onClick={goToMenu}
          style={{
            alignSelf: "flex-start", marginBottom: "2rem",
            fontSize: "0.76rem", fontWeight: 700, color: "rgba(255,255,255,0.85)",
            background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.32)",
            cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em",
            padding: "0.4rem 1rem", borderRadius: "999px",
          }}
        >
          ← Volver
        </button>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
          style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "2.8rem", fontWeight: 900,
            color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05,
            marginBottom: "0.75rem",
            textShadow: "0 4px 20px rgba(0,0,0,0.18)",
          }}
        >
          Elegí tu categoría
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", fontWeight: 500, lineHeight: 1.5 }}
        >
          Cada categoría tiene preguntas de distinta dificultad. ¡La dificultad sube cada 10 preguntas!
        </motion.p>
      </div>

      {/* Right panel — 2×3 grid */}
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "14px",
        alignContent: "center",
      }}>
        {categories.map((cat, i) => {
          const color = cat === "all" ? "#0369a1" : CATEGORY_COLORS[cat as Category];
          const meta = META[cat];

          return (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.2 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => startGame(cat)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start",
                padding: "1.25rem 1.4rem",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(16px)",
                border: "2px solid rgba(255,255,255,0.95)",
                cursor: "pointer", textAlign: "left",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                transition: "box-shadow 0.2s",
              }}
            >
              <span style={{
                width: 52, height: 52, borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${color}1a`,
                fontSize: "1.7rem", flexShrink: 0, marginBottom: "0.75rem",
              }}>
                {meta.emoji}
              </span>
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
