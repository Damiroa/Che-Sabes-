import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../data/questions";
import { CircularTimer } from "./CircularTimer";
import { ScoreCounter } from "./ScoreCounter";
import { audio } from "../utils/audio";

interface Props { isMuted: boolean; onToggleMute: () => void }

export function GameScreen({ isMuted, onToggleMute }: Props) {
  const {
    lives, score, streak, skipsLeft, stage, questionsAnswered,
    currentQuestion, timerSeconds, answerQuestion, skipQuestion,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "wrong">("idle");
  const [shortInput, setShortInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const answeredRef = useRef(false);
  const lastTickRef = useRef(timerSeconds);

  useEffect(() => {
    setTimeLeft(timerSeconds);
    setSelectedAnswer(null);
    setAnswerState("idle");
    setShortInput("");
    answeredRef.current = false;
    lastTickRef.current = timerSeconds;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (!answeredRef.current) {
            answeredRef.current = true;
            answerQuestion("", true);
          }
          return 0;
        }
        const next = prev - 1;
        if (!isMuted) {
          if (next <= 4) audio.urgentTick();
          else if (next <= 8) audio.tick();
        }
        return next;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQuestion?.id, timerSeconds]);

  if (!currentQuestion) return null;

  const catColor = CATEGORY_COLORS[currentQuestion.category];
  const multiplier = getStreakMultiplier(streak);
  const diffColor  = { easy: "#4ade80", medium: "#fbbf24", hard: "#f87171" }[currentQuestion.difficulty];
  const diffLabel  = { easy: "Fácil",  medium: "Medio",   hard: "Difícil" }[currentQuestion.difficulty];
  const catLabel   = {
    genius: "Modo Genio", entertainment: "Entretenimiento",
    sports: "Deportes",   culture: "Cultura Pop", random: "Random",
  }[currentQuestion.category];

  const isMC = currentQuestion.type !== "short" && !!currentQuestion.options;
  const options = currentQuestion.options ?? [];

  // Progress within current stage (0–9 questions answered = 0–90%)
  const stageProgress = (questionsAnswered % 10) / 10;

  const handleAnswer = (ans: string) => {
    if (selectedAnswer || answeredRef.current) return;
    answeredRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect =
      ans.toLowerCase().trim() === currentQuestion.correct.toLowerCase().trim();

    setSelectedAnswer(ans);
    setAnswerState(isCorrect ? "correct" : "wrong");
    if (!isMuted) isCorrect ? audio.correct() : audio.wrong();

    setTimeout(() => answerQuestion(ans), 420);
  };

  return (
    <motion.div
      style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* ── HUD bar ─────────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "12px 40px", gap: "18px", flexShrink: 0,
        background: "rgba(0,0,0,0.18)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}>
        {/* Lives */}
        <div style={{ display: "flex", gap: "3px" }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ opacity: i < lives ? 1 : 0.2, scale: i < lives ? 1 : 0.75 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ fontSize: "1.4rem" }}
            >❤️</motion.span>
          ))}
        </div>

        {/* Phase + diff */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{
            padding: "4px 14px", borderRadius: "999px",
            background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.35)",
            fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#fff",
          }}>FASE {stage}</span>
          <span style={{
            padding: "3px 10px", borderRadius: "999px",
            background: `${diffColor}25`, border: `1.5px solid ${diffColor}60`,
            fontSize: "0.7rem", fontWeight: 700, color: diffColor,
            textShadow: `0 0 8px ${diffColor}80`,
          }}>{diffLabel}</span>
        </div>

        {/* Streak */}
        <AnimatePresence>
          {streak >= 3 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              style={{
                padding: "3px 12px", borderRadius: "999px",
                background: "rgba(251,191,36,0.2)", border: "1.5px solid rgba(251,191,36,0.5)",
                fontSize: "0.75rem", fontWeight: 700, color: "#fde68a",
              }}
            >🔥 {streak} racha ×{multiplier}</motion.span>
          )}
        </AnimatePresence>

        {/* Stage progress bar (mini) */}
        <div style={{
          flex: 1, height: "6px", borderRadius: "999px",
          background: "rgba(255,255,255,0.18)", overflow: "hidden",
        }}>
          <motion.div
            animate={{ width: `${stageProgress * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="progress-shimmer"
            style={{ height: "100%", borderRadius: "999px" }}
          />
        </div>
        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", fontWeight: 700, whiteSpace: "nowrap" }}>
          {questionsAnswered % 10}/10
        </span>

        {/* Score */}
        <ScoreCounter
          value={score}
          style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "1.35rem",
            fontWeight: 900, color: "#fff",
            textShadow: "0 0 12px rgba(255,255,255,0.4)",
          }}
        />

        {/* Skip */}
        <button
          onClick={() => { if (!isMuted) audio.click(); skipQuestion(); }}
          disabled={skipsLeft <= 0}
          style={{
            fontSize: "0.72rem", fontWeight: 700,
            color: skipsLeft > 0 ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.28)",
            background: skipsLeft > 0 ? "rgba(255,255,255,0.12)" : "transparent",
            border: skipsLeft > 0 ? "1.5px solid rgba(255,255,255,0.25)" : "none",
            padding: "4px 10px", borderRadius: "999px",
            cursor: skipsLeft > 0 ? "pointer" : "default",
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}
        >⏭ Skip {skipsLeft > 0 ? `(${skipsLeft})` : "—"}</button>

        {/* Mute */}
        <button
          onClick={() => { onToggleMute(); }}
          style={{
            background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)",
            borderRadius: "50%", width: 34, height: 34,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: "1rem",
          }}
          title={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div style={{
        flex: 1, display: "flex", gap: "40px",
        padding: "28px 48px", overflow: "hidden",
      }}>
        {/* Left — Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id + "-q"}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            {/* Category + points */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.1rem" }}>
              <span style={{
                width: 36, height: 36, borderRadius: "10px",
                background: `${catColor}28`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem",
              }}>{CATEGORY_ICONS[currentQuestion.category]}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {catLabel}
              </span>
              <span style={{
                marginLeft: "auto", fontSize: "0.74rem", fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.12)", padding: "2px 10px", borderRadius: "999px",
              }}>+{currentQuestion.points * multiplier} pts</span>
            </div>

            {/* Question card */}
            <div style={{
              background: "rgba(255,255,255,0.93)",
              backdropFilter: "blur(20px)",
              border: "2px solid rgba(255,255,255,0.98)",
              borderRadius: "24px",
              padding: "2rem 2.2rem",
              boxShadow: "0 8px 40px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.5)",
              flex: 1,
              display: "flex", alignItems: "center",
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.3rem", fontWeight: 600,
                color: "#0f172a", lineHeight: 1.55,
              }}>
                {currentQuestion.question}
              </p>
            </div>

            {/* Circular timer below question card */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px" }}>
              <CircularTimer timeLeft={timeLeft} total={timerSeconds} />
              <div style={{ flex: 1 }}>
                <div style={{
                  width: "100%", height: "5px", borderRadius: "999px",
                  background: "rgba(255,255,255,0.2)", overflow: "hidden",
                }}>
                  <motion.div
                    animate={{ width: `${(timeLeft / timerSeconds) * 100}%` }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    style={{
                      height: "100%", borderRadius: "999px",
                      background: timeLeft > 8 ? "#4ade80" : timeLeft > 4 ? "#fbbf24" : "#f87171",
                      boxShadow: timeLeft <= 4 ? "0 0 8px #f87171" : "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right — Answers */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id + "-a"}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.22, delay: 0.06, ease: "easeOut" }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "11px" }}
          >
            {isMC && options.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              const isCorrectOpt = answerState !== "idle" && isSelected && answerState === "correct";
              const isWrongOpt   = answerState !== "idle" && isSelected && answerState === "wrong";

              return (
                <motion.button
                  key={opt}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={!selectedAnswer ? { x: 5, scale: 1.015 } : {}}
                  whileTap={!selectedAnswer ? { scale: 0.97 } : {}}
                  onClick={() => { if (!isMuted) audio.click(); handleAnswer(opt); }}
                  disabled={!!selectedAnswer}
                  className={`${isWrongOpt ? "shake" : ""} ${isCorrectOpt ? "correct-glow" : ""} neon-btn`}
                  style={{
                    padding: "1rem 1.4rem",
                    borderRadius: "16px",
                    textAlign: "left",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem", fontWeight: 600,
                    color: isCorrectOpt ? "#fff" : isWrongOpt ? "#fff" : "#1e293b",
                    background: isCorrectOpt
                      ? "linear-gradient(135deg, #16a34a, #4ade80)"
                      : isWrongOpt
                      ? "linear-gradient(135deg, #dc2626, #f87171)"
                      : "rgba(255,255,255,0.91)",
                    backdropFilter: "blur(8px)",
                    border: `2px solid ${
                      isCorrectOpt ? "#4ade80" : isWrongOpt ? "#f87171" : "rgba(255,255,255,0.95)"
                    }`,
                    cursor: selectedAnswer ? "default" : "pointer",
                    boxShadow: isCorrectOpt
                      ? "0 6px 24px rgba(74,222,128,0.5)"
                      : isWrongOpt
                      ? "0 6px 24px rgba(248,113,113,0.5)"
                      : "0 2px 12px rgba(0,0,0,0.08)",
                    display: "flex", alignItems: "center", gap: "12px",
                    transition: "background 0.15s, border 0.15s, color 0.15s",
                  }}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: "9px", flexShrink: 0,
                    background: isSelected ? "rgba(255,255,255,0.25)" : "rgba(15,23,42,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.8rem", fontWeight: 900,
                    color: isSelected ? "#fff" : "#64748b",
                  }}>
                    {["A","B","C","D"][idx]}
                  </span>
                  {opt}
                </motion.button>
              );
            })}

            {!isMC && (
              <>
                <input
                  type="text"
                  value={shortInput}
                  onChange={(e) => setShortInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && shortInput.trim() && handleAnswer(shortInput.trim())}
                  placeholder="Escribí tu respuesta..."
                  autoFocus
                  style={{
                    width: "100%", padding: "1rem 1.4rem", borderRadius: "16px",
                    background: "rgba(255,255,255,0.92)", border: "2px solid rgba(255,255,255,0.98)",
                    color: "#0f172a", fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem", outline: "none",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <button
                  onClick={() => { if (!isMuted) audio.click(); shortInput.trim() && handleAnswer(shortInput.trim()); }}
                  disabled={!shortInput.trim() || !!selectedAnswer}
                  className="neon-btn"
                  style={{
                    padding: "1rem 1.4rem", borderRadius: "16px",
                    background: "#0369a1", color: "#fff",
                    fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "1rem",
                    opacity: !shortInput.trim() ? 0.35 : 1,
                    cursor: shortInput.trim() ? "pointer" : "default", border: "none",
                    boxShadow: "0 4px 20px rgba(3,105,161,0.4)",
                  }}
                >Confirmar →</button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
