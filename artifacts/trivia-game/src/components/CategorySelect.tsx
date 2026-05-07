import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS, Category } from "../data/questions";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";

const categories: (Category | "all")[] = ["all", "genius", "entertainment", "sports", "culture", "random"];

const META: Record<string, { label: string; sub: string }> = {
  all:           { label: "Todas las categorías", sub: "Preguntas mezcladas"          },
  genius:        { label: "Modo Genio",            sub: "Ciencia · Historia · Cultura" },
  entertainment: { label: "Entretenimiento",        sub: "Cine · Series · Libros"       },
  sports:        { label: "Deportes",               sub: "Fútbol · Olimpiadas · Récords" },
  culture:       { label: "Cultura Pop",            sub: "Música · Anime · Juegos"      },
  random:        { label: "Datos Random",           sub: "Curiosidades del mundo"        },
};
const ICONS: Record<string, string> = {
  all: "🌟", genius: CATEGORY_ICONS["genius"], entertainment: CATEGORY_ICONS["entertainment"],
  sports: CATEGORY_ICONS["sports"], culture: CATEGORY_ICONS["culture"], random: CATEGORY_ICONS["random"],
};

interface Props { isMuted: boolean }

export function CategorySelect({ isMuted }: Props) {
  const { startGame, goToMenu } = useGameStore();
  const { isMobile, isTablet } = useBreakpoint();

  const handleStart = (cat: Category | "all") => {
    if (!isMuted) audio.click();
    startGame(cat);
  };
  const handleBack = () => { if (!isMuted) audio.click(); goToMenu(); };

  const catColor = (cat: string) =>
    cat === "all" ? "#0369a1" : CATEGORY_COLORS[cat as Category];

  /* ── Mobile ──────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <motion.div
        style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column", padding: "24px 20px 36px", overflowY: "auto" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <button onClick={handleBack} style={backBtn}>← Volver</button>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: "0.3rem" }}>Elegí tu categoría</h2>
        <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.72)", marginBottom: "1.25rem" }}>La dificultad sube cada 10 preguntas</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
          {categories.map((cat, i) => (
            <motion.button key={cat}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleStart(cat)}
              style={catCard}
            >
              <span style={{ fontSize: "1.7rem", marginBottom: "6px", display: "block" }}>{ICONS[cat]}</span>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{META[cat].label}</p>
              <p style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "2px" }}>{META[cat].sub}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  /* ── Tablet ──────────────────────────────────────────────── */
  if (isTablet) {
    return (
      <motion.div
        style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "28px 36px", overflowY: "auto" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <button onClick={handleBack} style={{ ...backBtn, marginBottom: "1.2rem" }}>← Volver</button>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.4rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: "0.3rem" }}>Elegí tu categoría</h2>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", marginBottom: "1.4rem" }}>La dificultad sube automáticamente cada 10 preguntas</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", flex: 1 }}>
          {categories.map((cat, i) => (
            <motion.button key={cat}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }}
              onClick={() => handleStart(cat)}
              style={catCard}
            >
              <span style={{ width: 46, height: 46, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", background: `${catColor(cat)}20`, fontSize: "1.5rem", marginBottom: "0.65rem" }}>{ICONS[cat]}</span>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{META[cat].label}</p>
              <p style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>{META[cat].sub}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  /* ── Desktop ─────────────────────────────────────────────── */
  return (
    <motion.div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "stretch", padding: "40px 60px", gap: "60px" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <button onClick={handleBack} style={{ ...backBtn, marginBottom: "2rem" }}>← Volver</button>
        <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "2.8rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "0.75rem", textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
          Elegí tu categoría
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }}
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.72)", fontWeight: 500, lineHeight: 1.55 }}>
          La dificultad sube automáticamente cada 10 preguntas. ¿Llegás a la Fase 3?
        </motion.p>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: "14px", alignContent: "center" }}>
        {categories.map((cat, i) => (
          <motion.button key={cat}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.22 }}
            whileHover={{ scale: 1.04, y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleStart(cat)}
            className="neon-btn"
            style={catCard}
          >
            <span style={{ width: 52, height: 52, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", background: `${catColor(cat)}20`, fontSize: "1.6rem", flexShrink: 0, marginBottom: "0.75rem" }}>{ICONS[cat]}</span>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "3px" }}>{META[cat].label}</p>
            <p style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500 }}>{META[cat].sub}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

const backBtn: React.CSSProperties = {
  alignSelf: "flex-start",
  fontSize: "0.76rem", fontWeight: 700, color: "rgba(255,255,255,0.85)",
  background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.3)",
  cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em",
  padding: "0.4rem 1rem", borderRadius: "999px", marginBottom: "1rem",
};

const catCard: React.CSSProperties = {
  display: "flex", flexDirection: "column", alignItems: "flex-start",
  padding: "1.1rem 1.2rem", borderRadius: "18px",
  background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)",
  border: "2px solid rgba(255,255,255,0.95)",
  cursor: "pointer", textAlign: "left",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};
