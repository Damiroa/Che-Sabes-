import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../data/questions";
import { CircularTimer } from "./CircularTimer";
import { ScoreCounter } from "./ScoreCounter";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";

interface Props { isMuted: boolean; onToggleMute: () => void }

export function GameScreen({ isMuted, onToggleMute }: Props) {
  const {
    lives, score, streak, skipsLeft, stage, questionsAnswered,
    currentQuestion, timerSeconds, answerQuestion, skipQuestion,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState]       = useState<"idle" | "correct" | "wrong">("idle");
  const [shortInput, setShortInput]         = useState("");
  const [timeLeft, setTimeLeft]             = useState(timerSeconds);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const answeredRef = useRef(false);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    setTimeLeft(timerSeconds);
    setSelectedAnswer(null);
    setAnswerState("idle");
    setShortInput("");
    answeredRef.current = false;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (!answeredRef.current) { answeredRef.current = true; answerQuestion("", true); }
          return 0;
        }
        const next = prev - 1;
        if (!isMuted) { if (next <= 4) audio.urgentTick(); else if (next <= 8) audio.tick(); }
        return next;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQuestion?.id, timerSeconds]);

  if (!currentQuestion) return null;

  const multiplier      = getStreakMultiplier(streak);
  const diffColor       = { easy: "#4ade80", medium: "#fbbf24", hard: "#f87171" }[currentQuestion.difficulty];
  const diffLabel       = { easy: "Fácil",  medium: "Medio",   hard: "Difícil"  }[currentQuestion.difficulty];
  const catLabel        = { genius: "Genio", entertainment: "Entretenimiento", sports: "Deportes", culture: "Cultura Pop", random: "Random" }[currentQuestion.category];
  const catColor        = CATEGORY_COLORS[currentQuestion.category];
  const isMC            = currentQuestion.type !== "short" && !!currentQuestion.options;
  const options         = currentQuestion.options ?? [];
  const stageProgress   = (questionsAnswered % 10) / 10;
  const timerPct        = (timeLeft / timerSeconds) * 100;
  const timerBarColor   = timeLeft > 8 ? "#4ade80" : timeLeft > 4 ? "#fbbf24" : "#f87171";

  const handleAnswer = (ans: string) => {
    if (selectedAnswer || answeredRef.current) return;
    answeredRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    const ok = ans.toLowerCase().trim() === currentQuestion.correct.toLowerCase().trim();
    setSelectedAnswer(ans);
    setAnswerState(ok ? "correct" : "wrong");
    if (!isMuted) ok ? audio.correct() : audio.wrong();
    setTimeout(() => answerQuestion(ans), 420);
  };

  const handleSkip = () => { if (!isMuted) audio.click(); skipQuestion(); };

  // ── Renders the answer buttons as plain JSX (NOT a sub-component).
  // Using a sub-component causes React to remount it on every state change,
  // replaying the entrance animation. A plain function avoids that.
  const renderAnswers = (compact = false) => {
    const fontSize  = compact ? "0.88rem" : "0.97rem";
    const padding   = compact ? "0.78rem 1rem" : "0.95rem 1.2rem";

    if (isMC) {
      return options.map((opt, idx) => {
        const isSelected   = selectedAnswer === opt;
        const isCorrectOpt = isSelected && answerState === "correct";
        const isWrongOpt   = isSelected && answerState === "wrong";

        return (
          <motion.button
            key={opt}
            // Only animate entry once per question (key tied to question id)
            layout
            whileHover={!selectedAnswer ? { x: 4, scale: 1.01 } : {}}
            whileTap={!selectedAnswer ? { scale: 0.97 } : {}}
            onClick={() => { if (!isMuted) audio.click(); handleAnswer(opt); }}
            disabled={!!selectedAnswer}
            className={`${isWrongOpt ? "shake" : ""} ${isCorrectOpt ? "correct-glow" : ""} neon-btn`}
            style={{
              padding, borderRadius: "14px", textAlign: "left",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize, fontWeight: 600,
              color:      isCorrectOpt ? "#fff" : isWrongOpt ? "#fff" : "#1e293b",
              background: isCorrectOpt
                ? "linear-gradient(135deg,#16a34a,#4ade80)"
                : isWrongOpt
                ? "linear-gradient(135deg,#dc2626,#f87171)"
                : "rgba(255,255,255,0.91)",
              border: `2px solid ${isCorrectOpt ? "#4ade80" : isWrongOpt ? "#f87171" : "rgba(255,255,255,0.95)"}`,
              cursor:     selectedAnswer ? "default" : "pointer",
              boxShadow:  isCorrectOpt
                ? "0 6px 20px rgba(74,222,128,0.45)"
                : isWrongOpt
                ? "0 6px 20px rgba(248,113,113,0.45)"
                : "0 2px 10px rgba(0,0,0,0.07)",
              display: "flex", alignItems: "center", gap: "10px",
              transition: "background 0.18s, border 0.18s, color 0.18s, box-shadow 0.18s",
            }}
          >
            <span style={{
              width: 26, height: 26, borderRadius: "7px", flexShrink: 0,
              background: isSelected ? "rgba(255,255,255,0.22)" : "rgba(15,23,42,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.74rem", fontWeight: 900,
              color: isSelected ? "#fff" : "#64748b",
            }}>
              {["A","B","C","D"][idx]}
            </span>
            {opt}
          </motion.button>
        );
      });
    }

    // Short answer
    return [
      <input
        key="input"
        type="text"
        value={shortInput}
        onChange={e => setShortInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && shortInput.trim() && handleAnswer(shortInput.trim())}
        placeholder="Escribí tu respuesta..."
        autoFocus
        style={{ width: "100%", padding: "0.9rem 1.2rem", borderRadius: "14px", background: "rgba(255,255,255,0.92)", border: "2px solid rgba(255,255,255,0.98)", color: "#0f172a", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.97rem", outline: "none" }}
      />,
      <button
        key="confirm"
        onClick={() => { if (!isMuted) audio.click(); shortInput.trim() && handleAnswer(shortInput.trim()); }}
        disabled={!shortInput.trim() || !!selectedAnswer}
        style={{ padding: "0.9rem", borderRadius: "14px", background: "#0369a1", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "0.97rem", opacity: !shortInput.trim() ? 0.35 : 1, cursor: shortInput.trim() ? "pointer" : "default", border: "none" }}
      >Confirmar →</button>,
    ];
  };

  // ── Shared HUD sub-elements ──────────────────────────────────
  const renderLives = (size: string) => (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span key={i}
          animate={{ opacity: i < lives ? 1 : 0.2, scale: i < lives ? 1 : 0.75 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ fontSize: size }}
        >❤️</motion.span>
      ))}
    </div>
  );

  const renderStreakBadge = (fontSize: string) => streak >= 3 ? (
    <AnimatePresence>
      <motion.span
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        style={{ padding: "3px 10px", borderRadius: "999px", background: "rgba(251,191,36,0.2)", border: "1.5px solid rgba(251,191,36,0.5)", fontSize, fontWeight: 700, color: "#fde68a" }}
      >🔥 {streak} ×{multiplier}</motion.span>
    </AnimatePresence>
  ) : null;

  const renderProgressBar = (height = "8px") => (
    <>
      <div style={{ flex: 1, height, borderRadius: "999px", background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
        <motion.div
          animate={{ width: `${stageProgress * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="progress-shimmer"
          style={{ height: "100%", borderRadius: "999px" }}
        />
      </div>
    </>
  );

  /* ── Mobile layout ───────────────────────────────────────────── */
  if (isMobile) {
    return (
      <motion.div
        style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
      >
        {/* Mini HUD */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 14px", background: "rgba(0,0,0,0.18)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.15)", flexShrink: 0, flexWrap: "wrap" }}>
          {renderLives("1.1rem")}
          <span style={{ padding: "2px 9px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.35)", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: "#fff" }}>F{stage}</span>
          {renderStreakBadge("0.68rem")}
          {renderProgressBar("5px")}
          <ScoreCounter value={score} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", fontWeight: 900, color: "#fff" }} />
          <button onClick={handleSkip} disabled={skipsLeft <= 0} style={{ fontSize: "0.68rem", fontWeight: 700, color: skipsLeft > 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.28)", background: "transparent", border: "none", cursor: skipsLeft > 0 ? "pointer" : "default", textTransform: "uppercase" }}>
            ⏭{skipsLeft > 0 ? `(${skipsLeft})` : "—"}
          </button>
          <button onClick={onToggleMute} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.85rem" }}>
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {CATEGORY_ICONS[currentQuestion.category]} {catLabel}
            </span>
            <span style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: "999px", background: `${diffColor}30`, border: `1.5px solid ${diffColor}60`, fontSize: "0.68rem", fontWeight: 700, color: diffColor }}>{diffLabel}</span>
            <CircularTimer timeLeft={timeLeft} total={timerSeconds} />
          </div>

          {/* Question — keyed to question id so it animates only on change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id + "-q"}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", border: "2px solid rgba(255,255,255,0.98)", borderRadius: "20px", padding: "1.2rem 1.1rem", boxShadow: "0 6px 28px rgba(0,0,0,0.14)" }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.55 }}>
                {currentQuestion.question}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Answers — keyed to question id so buttons only animate on question change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id + "-a"}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18, delay: 0.05 }}
              style={{ display: "flex", flexDirection: "column", gap: "9px" }}
            >
              {renderAnswers(true)}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  /* ── Tablet layout ───────────────────────────────────────────── */
  if (isTablet) {
    return (
      <motion.div
        style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 28px", background: "rgba(0,0,0,0.18)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.15)", flexShrink: 0 }}>
          {renderLives("1.2rem")}
          <span style={{ padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.35)", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", color: "#fff" }}>FASE {stage}</span>
          <span style={{ padding: "3px 10px", borderRadius: "999px", background: `${diffColor}28`, border: `1.5px solid ${diffColor}60`, fontSize: "0.68rem", fontWeight: 700, color: diffColor }}>{diffLabel}</span>
          {renderStreakBadge("0.7rem")}
          {renderProgressBar("6px")}
          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.65)", fontWeight: 700, whiteSpace: "nowrap" }}>{questionsAnswered % 10}/10</span>
          <ScoreCounter value={score} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.2rem", fontWeight: 900, color: "#fff" }} />
          <button onClick={handleSkip} disabled={skipsLeft <= 0} style={{ fontSize: "0.7rem", fontWeight: 700, color: skipsLeft > 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.28)", background: "transparent", border: "none", cursor: skipsLeft > 0 ? "pointer" : "default" }}>⏭ Skip {skipsLeft > 0 ? `(${skipsLeft})` : "—"}</button>
          <button onClick={onToggleMute} style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.95rem" }}>{isMuted ? "🔇" : "🔊"}</button>
        </div>

        <div style={{ flex: 1, display: "flex", gap: "24px", padding: "20px 28px", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id + "-q"}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "14px" }}
            >
              <p style={{ fontSize: "0.74rem", fontWeight: 700, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {CATEGORY_ICONS[currentQuestion.category]} {catLabel}
                <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 6 }}>+{currentQuestion.points * multiplier} pts</span>
              </p>
              <div style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", border: "2px solid rgba(255,255,255,0.98)", borderRadius: "22px", padding: "1.6rem 1.8rem", boxShadow: "0 8px 36px rgba(0,0,0,0.14)", flex: 1, display: "flex", alignItems: "center" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.18rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.55 }}>{currentQuestion.question}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CircularTimer timeLeft={timeLeft} total={timerSeconds} />
                <div style={{ flex: 1, height: "5px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
                  <motion.div animate={{ width: `${timerPct}%` }} transition={{ duration: 0.8, ease: "linear" }} style={{ height: "100%", borderRadius: "999px", background: timerBarColor }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Answers keyed to question id only — no re-animation on state change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id + "-a"}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.06 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}
            >
              {renderAnswers()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  /* ── Desktop layout ──────────────────────────────────────────── */
  return (
    <motion.div
      style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
    >
      {/* HUD */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 40px", gap: "18px", flexShrink: 0, background: "rgba(0,0,0,0.18)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
        {renderLives("1.4rem")}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ padding: "4px 14px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.35)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>FASE {stage}</span>
          <span style={{ padding: "3px 10px", borderRadius: "999px", background: `${diffColor}25`, border: `1.5px solid ${diffColor}60`, fontSize: "0.7rem", fontWeight: 700, color: diffColor, textShadow: `0 0 8px ${diffColor}80` }}>{diffLabel}</span>
        </div>
        {renderStreakBadge("0.75rem")}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
          {renderProgressBar("8px")}
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", fontWeight: 700, whiteSpace: "nowrap" }}>{questionsAnswered % 10}/10</span>
        </div>
        <ScoreCounter value={score} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.35rem", fontWeight: 900, color: "#fff", textShadow: "0 0 12px rgba(255,255,255,0.4)" }} />
        <button onClick={handleSkip} disabled={skipsLeft <= 0} style={{ fontSize: "0.72rem", fontWeight: 700, color: skipsLeft > 0 ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.28)", background: skipsLeft > 0 ? "rgba(255,255,255,0.12)" : "transparent", border: skipsLeft > 0 ? "1.5px solid rgba(255,255,255,0.25)" : "none", padding: "4px 10px", borderRadius: "999px", cursor: skipsLeft > 0 ? "pointer" : "default", letterSpacing: "0.05em", textTransform: "uppercase" }}>⏭ Skip {skipsLeft > 0 ? `(${skipsLeft})` : "—"}</button>
        <button onClick={onToggleMute} style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1rem" }}>{isMuted ? "🔇" : "🔊"}</button>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", gap: "40px", padding: "28px 48px", overflow: "hidden" }}>
        {/* Left — Question, keyed to id */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id + "-q"}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.1rem" }}>
              <span style={{ width: 36, height: 36, borderRadius: "10px", background: `${catColor}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{CATEGORY_ICONS[currentQuestion.category]}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{catLabel}</span>
              <span style={{ marginLeft: "auto", fontSize: "0.74rem", fontWeight: 700, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.12)", padding: "2px 10px", borderRadius: "999px" }}>+{currentQuestion.points * multiplier} pts</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(20px)", border: "2px solid rgba(255,255,255,0.98)", borderRadius: "24px", padding: "2rem 2.2rem", boxShadow: "0 8px 40px rgba(0,0,0,0.16)", flex: 1, display: "flex", alignItems: "center" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.3rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.55 }}>{currentQuestion.question}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px" }}>
              <CircularTimer timeLeft={timeLeft} total={timerSeconds} />
              <div style={{ flex: 1, height: "5px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
                <motion.div animate={{ width: `${timerPct}%` }} transition={{ duration: 0.8, ease: "linear" }} style={{ height: "100%", borderRadius: "999px", background: timerBarColor, boxShadow: timeLeft <= 4 ? "0 0 8px #f87171" : "none" }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right — Answers, keyed to question id only */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id + "-a"}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.22, delay: 0.06, ease: "easeOut" }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "11px" }}
          >
            {renderAnswers()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
