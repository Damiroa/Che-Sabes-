import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { SkipForward, Flame } from "lucide-react";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { CATEGORY_LABELS } from "../data/questions";
import { QuestionTimer } from "./QuestionTimer";
import { ScoreCounter } from "./ScoreCounter";
import {
  CoinBadge,
  GameButton,
  Lives,
  SoundButton,
  UI_TRANSITION,
} from "./GameUI";
import { audio } from "../utils/audio";

interface Props {
  isMuted: boolean;
  onToggleMute: () => void;
}
const QuestionContent = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(function QuestionContent({ children }, ref) {
  const present = useIsPresent();
  return (
    <motion.div
      ref={ref}
      className="question-layout"
      initial={{ opacity: 0.7, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={UI_TRANSITION}
      inert={!present}
    >
      {children}
    </motion.div>
  );
});

export function GameScreen({ isMuted, onToggleMute }: Props) {
  const s = useGameStore();
  const present = useIsPresent();
  const [selected, setSelected] = useState<string | null>(null);
  const [shortInput, setShortInput] = useState("");
  const answered = useRef(false);
  const delay = useRef<ReturnType<typeof setTimeout> | null>(null);
  const q = s.currentQuestion;
  useEffect(() => {
    answered.current = false;
    setSelected(null);
    setShortInput("");
    return () => {
      if (delay.current) clearTimeout(delay.current);
    };
  }, [q?.id]);
  useEffect(() => {
    if (s.phase !== "playing" && delay.current) clearTimeout(delay.current);
  }, [s.phase]);
  if (!q) return null;
  const multiplier = getStreakMultiplier(s.streak, s.shop.maxMulti);
  // The reward uses the streak after this answer, just like answerQuestion.
  const answerMultiplier = getStreakMultiplier(s.streak + 1, s.shop.maxMulti);
  const active = present && s.phase === "playing";
  const answer = (value: string) => {
    if (!active || answered.current) return;
    answered.current = true;
    setSelected(value);
    const correct =
      value.trim().toLowerCase() === q.correct.trim().toLowerCase();
    if (!isMuted) correct ? audio.correct() : audio.wrong();
    delay.current = setTimeout(() => s.answerQuestion(value), 350);
  };
  const timeout = () => {
    if (!active || answered.current) return;
    answered.current = true;
    s.answerQuestion("", true);
  };
  return (
    <section className="screen game-screen">
      <header className="game-hud">
        <Lives count={s.lives} shield={s.activeShield} />
        <span className="badge">Fase {s.stage}</span>
        <span className="score" aria-label={`${s.score} puntos`}>
          <ScoreCounter value={s.score} /> <small>pts</small>
        </span>
        <CoinBadge value={s.coins} />
        <GameButton
          className="secondary skip-button"
          aria-label={`Saltar pregunta (${s.skipsLeft} disponibles)`}
          disabled={!active || selected !== null || s.skipsLeft <= 0}
          onClick={() => {
            if (answered.current) return;
            if (!isMuted) audio.click();
            s.skipQuestion();
          }}
        >
          <SkipForward aria-hidden="true" size={20} />
          <span>{s.skipsLeft}</span>
        </GameButton>
        <SoundButton muted={isMuted} onToggle={onToggleMute} />
      </header>
      <div className="game-content">
        <div className="question-meta">
          <div>
            <p className="eyebrow">
              {q.subject ?? CATEGORY_LABELS[q.category]}
            </p>
            <span className={`difficulty ${q.difficulty}`}>
              {
                { easy: "Fácil", medium: "Medio", hard: "Difícil" }[
                  q.difficulty
                ]
              }
            </span>
          </div>
          <QuestionTimer
            questionId={q.id}
            seconds={s.timerSeconds}
            paused={!active || selected !== null}
            muted={isMuted}
            onExpire={timeout}
          />
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <QuestionContent key={q.id}>
            <div className="question-card">
              <span className="question-points">
                +{q.points * answerMultiplier} puntos
              </span>
              <h1 data-screen-title tabIndex={-1}>
                {q.question}
              </h1>
            </div>
            <div className="answers" aria-label="Respuestas">
              {q.type !== "short" && q.options ? (
                q.options.map((option, index) => {
                  const chosen = selected === option;
                  const correct =
                    chosen &&
                    option.trim().toLowerCase() ===
                      q.correct.trim().toLowerCase();
                  return (
                    <GameButton
                      key={`${q.id}-${option}`}
                      className={`answer-btn${chosen ? (correct ? " is-correct" : " is-wrong") : ""}`}
                      disabled={!active || selected !== null}
                      onClick={() => answer(option)}
                      aria-pressed={chosen}
                    >
                      <span className="answer-letter" aria-hidden="true">
                        {"ABCD"[index]}
                      </span>
                      <span>{option}</span>
                    </GameButton>
                  );
                })
              ) : (
                <form
                  className="answers"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (shortInput.trim()) answer(shortInput.trim());
                  }}
                >
                  <label htmlFor="short-answer">Tu respuesta</label>
                  <input
                    id="short-answer"
                    value={shortInput}
                    onChange={(e) => setShortInput(e.target.value)}
                    disabled={selected !== null}
                    autoComplete="off"
                  />
                  <GameButton
                    type="submit"
                    disabled={!shortInput.trim() || selected !== null}
                  >
                    Confirmar respuesta
                  </GameButton>
                </form>
              )}
            </div>
          </QuestionContent>
        </AnimatePresence>
        <footer className="game-progress">
          <div className="progress-label">
            <span>
              {s.correctAnswers % 4} de 4 aciertos para la próxima fase
            </span>
            {s.streak >= 3 && (
              <span className="streak">
                <Flame aria-hidden="true" size={18} />
                {s.streak} · ×{multiplier}
              </span>
            )}
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Avance de fase"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={s.correctAnswers % 4}
          >
            <motion.div
              className="progress-fill"
              animate={{ scaleX: (s.correctAnswers % 4) / 4 }}
              transition={UI_TRANSITION}
            />
          </div>
        </footer>
      </div>
    </section>
  );
}
