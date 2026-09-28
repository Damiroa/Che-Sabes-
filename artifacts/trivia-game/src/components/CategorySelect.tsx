import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { Course, COURSE_ICONS, COURSE_LABELS, COURSE_SUBJECTS, SUBJECT_ICONS, Subject } from "../data/courseQuestions";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";

const courses: Course[] = ["1ro", "2do", "3ro", "4to", "5to", "6to"];

interface Props { isMuted: boolean }

export function CategorySelect({ isMuted }: Props) {
  const { startGame, goToMenu } = useGameStore();
  const { isMobile, isTablet } = useBreakpoint();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const playClick = () => { if (!isMuted) audio.click(); };
  const handleCourse = (course: Course) => {
    if (!COURSE_SUBJECTS[course].length) return;
    playClick();
    setSelectedCourse(course);
  };
  const handleSubject = (subject: Subject) => {
    if (!selectedCourse) return;
    playClick();
    startGame(selectedCourse, subject);
  };
  const handleBack = () => {
    playClick();
    if (selectedCourse) setSelectedCourse(null);
    else goToMenu();
  };

  const cardColumns = isMobile ? "repeat(2, minmax(0, 1fr))" : isTablet ? "repeat(3, minmax(0, 1fr))" : "repeat(3, minmax(150px, 1fr))";
  const pageStyle: React.CSSProperties = {
    width: "100%", height: "100%", minHeight: 0, display: "flex", flexDirection: "column",
    padding: isMobile ? "24px 20px 36px" : "36px 60px", overflowY: "auto",
  };

  return (
    <motion.div style={pageStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
      <button onClick={handleBack} style={backBtn}>{selectedCourse ? "← Cursos" : "← Volver"}</button>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <p style={eyebrow}>Preguntados IGC</p>
        <h2 style={{ ...heading, fontSize: isMobile ? "2rem" : "2.8rem" }}>
          {selectedCourse ? `Elegí la materia de ${COURSE_LABELS[selectedCourse]}` : "Elegí tu curso"}
        </h2>
        <p style={subtitle}>
          {selectedCourse ? "Selecciona una materia para comenzar la partida." : "Primero elige el curso y después la materia."}
        </p>
      </motion.div>

      {!selectedCourse ? (
        <div style={{ display: "grid", gridTemplateColumns: cardColumns, gap: "14px", marginTop: "1.6rem", maxWidth: 820, width: "100%", alignSelf: "center" }}>
          {courses.map((course, index) => {
            const subjects = COURSE_SUBJECTS[course];
            const available = subjects.length > 0;
            return (
              <motion.button
                key={course}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={available ? { scale: 1.03, y: -3 } : undefined}
                whileTap={available ? { scale: 0.97 } : undefined}
                onClick={() => handleCourse(course)}
                disabled={!available}
                style={{ ...courseCard, opacity: available ? 1 : 0.45, cursor: available ? "pointer" : "not-allowed" }}
              >
                <span style={{ fontSize: "2rem" }}>{COURSE_ICONS[course]}</span>
                <strong style={cardTitle}>{COURSE_LABELS[course]}</strong>
                <span style={cardMeta}>{available ? subjects.join(" · ") : "Sin preguntas cargadas"}</span>
              </motion.button>
            );
          })}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: cardColumns, gap: "14px", marginTop: "1.6rem", maxWidth: 620, width: "100%", alignSelf: "center" }}>
          {COURSE_SUBJECTS[selectedCourse].map((subject, index) => (
            <motion.button
              key={subject}
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(index, 5) * 0.08 }} whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.97 }}
              onClick={() => handleSubject(subject)}
              style={courseCard}
            >
              <span style={{ fontSize: "2.2rem" }}>{SUBJECT_ICONS[subject]}</span>
              <strong style={cardTitle}>{subject}</strong>
              <span style={cardMeta}>Preguntas y respuestas</span>
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

const eyebrow: React.CSSProperties = {
  color: "#fef08a", fontSize: "0.76rem", fontWeight: 800,
  letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "0.45rem",
};
const heading: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif", fontWeight: 900, color: "#fff",
  letterSpacing: "-0.04em", lineHeight: 1.05, margin: 0,
  textShadow: "0 4px 20px rgba(0,0,0,0.2)",
};
const subtitle: React.CSSProperties = {
  color: "rgba(255,255,255,0.78)", fontSize: "0.92rem", lineHeight: 1.5, margin: "0.65rem 0 0",
};
const courseCard: React.CSSProperties = {
  minHeight: 150, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: "8px",
  padding: "1.25rem", borderRadius: "20px", textAlign: "left",
  background: "rgba(255,255,255,0.9)", border: "2px solid rgba(255,255,255,0.95)",
  boxShadow: "0 12px 34px rgba(2,56,87,0.16)", cursor: "pointer", transition: "box-shadow 180ms ease", minWidth: 0, overflowWrap: "anywhere",
};
const cardTitle: React.CSSProperties = { fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", color: "#0f172a" };
const cardMeta: React.CSSProperties = { color: "#64748b", fontSize: "0.76rem" };
const backBtn: React.CSSProperties = {
  alignSelf: "flex-start", marginBottom: "1.8rem", padding: "0.45rem 1rem", borderRadius: "999px",
  background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.3)",
  color: "#fff", cursor: "pointer", fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
};
