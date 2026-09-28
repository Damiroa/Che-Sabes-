import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import {
  COURSE_LABELS,
  COURSE_ICONS,
  COURSE_SUBJECTS,
  SUBJECT_ICONS,
  type Course,
  type Subject,
} from "../data/courseQuestions";
import { audio } from "../utils/audio";
import { GameButton, UI_TRANSITION } from "./GameUI";

const courses = Object.keys(COURSE_LABELS) as Course[];
export function CategorySelect({ isMuted }: { isMuted: boolean }) {
  const startGame = useGameStore((s) => s.startGame);
  const goToMenu = useGameStore((s) => s.goToMenu);
  const [course, setCourse] = useState<Course | null>(null);
  const click = () => {
    if (!isMuted) audio.click();
  };
  return (
    <section className="screen select-screen">
      <header className="screen-header">
        <GameButton
          className="secondary"
          onClick={() => {
            click();
            course ? setCourse(null) : goToMenu();
          }}
        >
          <ArrowLeft aria-hidden="true" />
          {course ? "Cursos" : "Volver"}
        </GameButton>
        <span className="wordmark">Che Sabe</span>
      </header>
      <div className="selection-content">
        <p className="eyebrow">
          {course ? COURSE_LABELS[course] : "Tu próximo desafío"}
        </p>
        <h1 data-screen-title tabIndex={-1}>
          {course ? "Elegí tu materia" : "Elegí tu curso"}
        </h1>
        <p className="lead">
          {course
            ? "Cada materia tiene preguntas para tu nivel."
            : "Primero el curso, después la materia. ¡Vamos!"}
        </p>
        <motion.div
          key={course ?? "courses"}
          className="selection-grid"
          initial={{ opacity: 0.7, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={UI_TRANSITION}
        >
          {!course
            ? courses.map((c) => (
                <GameButton
                  className="selection-card"
                  key={c}
                  onClick={() => {
                    click();
                    setCourse(c);
                  }}
                >
                  <span className="category-icon" aria-hidden="true">
                    {COURSE_ICONS[c]}
                  </span>
                  <strong>{COURSE_LABELS[c]}</strong>
                  <span className="muted">
                    {COURSE_SUBJECTS[c].length} materias
                  </span>
                  <ArrowRight
                    className="card-arrow"
                    aria-hidden="true"
                    size={18}
                  />
                </GameButton>
              ))
            : COURSE_SUBJECTS[course].map((subject: Subject) => (
                <GameButton
                  className="selection-card"
                  key={subject}
                  onClick={() => {
                    click();
                    startGame(course, subject);
                  }}
                >
                  <span className="category-icon" aria-hidden="true">
                    {SUBJECT_ICONS[subject]}
                  </span>
                  <strong>{subject}</strong>
                  <ArrowRight
                    className="card-arrow"
                    aria-hidden="true"
                    size={18}
                  />
                </GameButton>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
