import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../data/questions";
import { SUBJECT_ICONS, Subject } from "../data/courseQuestions";
import { CircularTimer } from "./CircularTimer";
import { ScoreCounter } from "./ScoreCounter";
import { FloatingReward } from "./FloatingReward";
import { audio } from "../utils/audio";
import { useBreakpoint } from "../hooks/useBreakpoint";

interface Props { isMuted: boolean; onToggleMute: () => void }

export function GameScreen({ isMuted, onToggleMute }: Props) {
  const {
    lives, score, streak, skipsLeft, stage, questionsAnswered,
    currentQuestion, timerSeconds, answerQuestion, skipQuestion,
    coins, shop, activeShield, lastCoinsEarned,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState]       = useState<"idle" | "correct" | "wrong">("idle");
  const [shortInput, setShortInput]         = useState("");
  const [timeLeft, setTimeLeft]             = useState(timerSeconds);
  const [coinTrigger, setCoinTrigger]       = useState(0);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const answeredRef = useRef(false);
  const prevCoins  = useRef(lastCoinsEarned);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    setTimeLeft(timerSeconds);
    setSelectedAnswer(null);
    setAnswerState("idle");
    setShortInput("");
    answeredRef.current = false;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const next = Math.max(0, prev - 1);
        if (!isMuted && next > 0) {
          if (next <= 4) audio.urgentTick();
          else if (next <= 8) audio.tick();
        }
        return next;
      });
    }, 1000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQuestion?.id, timerSeconds]);

  // Trigger timeout when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && !answeredRef.current) {
      answeredRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
      answerQuestion("", true);
    }
  }, [timeLeft]);

  // Trigger floating coin reward when lastCoinsEarned changes
  useEffect(() => {
    if (lastCoinsEarned > 0 && lastCoinsEarned !== prevCoins.current) {
      setCoinTrigger(n => n + 1);
      prevCoins.current = lastCoinsEarned;
    }
  }, [lastCoinsEarned]);

  if (!currentQuestion) return null;

  const multiplier    = getStreakMultiplier(streak, shop.maxMulti);
  const diffColor     = { easy: "#4ade80", medium: "#fbbf24", hard: "#f87171" }[currentQuestion.difficulty];
  const diffLabel     = { easy: "Fácil",   medium: "Medio",   hard: "Difícil"  }[currentQuestion.difficulty];
  const catLabel      = { genius: "Genio", entertainment: "Entretenimiento", sports: "Deportes", culture: "Cultura Pop", random: "Random" }[currentQuestion.category];
  const subjectLabel  = currentQuestion.subject ?? catLabel;
  const subjectIcon   = SUBJECT_ICONS[currentQuestion.subject as Subject] ?? CATEGORY_ICONS[currentQuestion.category];
  const catColor      = CATEGORY_COLORS[currentQuestion.category];
  const isMC          = currentQuestion.type !== "short" && !!currentQuestion.options;
  const options       = currentQuestion.options ?? [];
  const stageProgress = (questionsAnswered % 10) / 10;
  const timerPct      = (timeLeft / timerSeconds) * 100;
  const timerBarColor = timeLeft > 8 ? "#4ade80" : timeLeft > 4 ? "#fbbf24" : "#f87171";

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

  // ── Answer buttons — plain function, not a React component
  const renderAnswers = (compact = false) => {
    if (isMC) {
      return options.map((opt, idx) => {
        const isSelected   = selectedAnswer === opt;
        const isCorrectOpt = isSelected && answerState === "correct";
        const isWrongOpt   = isSelected && answerState === "wrong";
        return (
          <motion.button
            key={opt}
            layout
            whileHover={!selectedAnswer ? { x: 4, scale: 1.01 } : {}}
            whileTap={!selectedAnswer ? { scale: 0.97 } : {}}
            onClick={() => { if (!isMuted) audio.click(); handleAnswer(opt); }}
            disabled={!!selectedAnswer}
            className={`${isWrongOpt ? "shake" : ""} ${isCorrectOpt ? "correct-glow" : ""} neon-btn`}
            style={{
              padding: compact ? "0.75rem 1rem" : "0.92rem 1.2rem",
              borderRadius: "14px", textAlign: "left",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: compact ? "0.86rem" : "0.97rem", fontWeight: 600,
              color: isCorrectOpt ? "#fff" : isWrongOpt ? "#fff" : "#1e293b",
              background: isCorrectOpt
                ? "linear-gradient(135deg,#16a34a,#4ade80)"
                : isWrongOpt
                ? "linear-gradient(135deg,#dc2626,#f87171)"
                : "rgba(255,255,255,0.91)",
              border: `2px solid ${isCorrectOpt ? "#4ade80" : isWrongOpt ? "#f87171" : "rgba(255,255,255,0.95)"}`,
              cursor: selectedAnswer ? "default" : "pointer",
              boxShadow: isCorrectOpt ? "0 6px 20px rgba(74,222,128,0.45)" : isWrongOpt ? "0 6px 20px rgba(248,113,113,0.45)" : "0 2px 10px rgba(0,0,0,0.07)",
              display: "flex", alignItems: "center", gap: "10px",
              transition: "background 0.18s, border 0.18s, color 0.18s, box-shadow 0.18s",
            }}
          >
            <span style={{ width: 26, height: 26, borderRadius: "7px", flexShrink: 0, background: isSelected ? "rgba(255,255,255,0.22)" : "rgba(15,23,42,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.74rem", fontWeight: 900, color: isSelected ? "#fff" : "#64748b" }}>
              {["A","B","C","D"][idx]}
            </span>
            {opt}
          </motion.button>
        );
      });
    }
    return [
      <input key="inp" type="text" value={shortInput} onChange={e => setShortInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && shortInput.trim() && handleAnswer(shortInput.trim())}
        placeholder="Escribí tu respuesta..." autoFocus
        style={{ width: "100%", padding: "0.9rem 1.2rem", borderRadius: "14px", background: "rgba(255,255,255,0.92)", border: "2px solid rgba(255,255,255,0.98)", color: "#0f172a", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.97rem", outline: "none" }}
      />,
      <button key="ok" onClick={() => { if (!isMuted) audio.click(); shortInput.trim() && handleAnswer(shortInput.trim()); }}
        disabled={!shortInput.trim() || !!selectedAnswer}
        style={{ padding: "0.9rem", borderRadius: "14px", background: "#0369a1", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "0.97rem", opacity: !shortInput.trim() ? 0.35 : 1, cursor: shortInput.trim() ? "pointer" : "default", border: "none" }}>
        Confirmar →
      </button>,
    ];
  };

  // ── Shared HUD helpers (plain functions) ─────────────────
  const renderLives = (size: string) => (
    <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.span key={i} animate={{ opacity: i < lives ? 1 : 0.22, scale: i < lives ? 1 : 0.72 }} transition={{ type: "spring", stiffness: 300 }} style={{ fontSize: size }}>❤️</motion.span>
      ))}
      {activeShield && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} title="Escudo activo" style={{ fontSize: size, marginLeft: 2 }}>🛡️</motion.span>}
    </div>
  );

  const renderStreak = (size: string) => streak >= 3 ? (
    <AnimatePresence>
      <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
        style={{ padding: "3px 10px", borderRadius: "999px", background: "rgba(251,191,36,0.2)", border: "1.5px solid rgba(251,191,36,0.5)", fontSize: size, fontWeight: 700, color: "#fde68a" }}>
        🔥 {streak} ×{multiplier}
      </motion.span>
    </AnimatePresence>
  ) : null;

  const renderCoins = (size: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "999px", background: "rgba(250,204,21,0.12)", border: "1.5px solid rgba(250,204,21,0.3)" }}>
      <span style={{ fontSize: size }}>🪙</span>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: size, fontWeight: 800, color: "#fde68a" }}>{coins}</span>
    </div>
  );

  const renderProgress = (h = "8px") => (
    <div style={{ flex: 1, height: h, borderRadius: "999px", background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
      <motion.div animate={{ width: `${stageProgress * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }} className="progress-shimmer" style={{ height: "100%", borderRadius: "999px" }} />
    </div>
  );

  /* ── Mobile ──────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <motion.div style={{ width: "100%", minHeight: "100%", display: "flex", flexDirection: "column", position: "relative" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
      >
        <FloatingReward trigger={coinTrigger} text={`+${lastCoinsEarned} 🪙`} offsetX="70%" offsetY="30%" />

        {/* HUD */}
        <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "9px 12px", background: "rgba(0,0,0,0.18)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.14)", flexShrink: 0, flexWrap: "wrap" }}>
          {renderLives("1rem")}
          <span style={{ padding: "2px 8px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.33)", fontSize: "0.64rem", fontWeight: 800, textTransform: "uppercase", color: "#fff" }}>F{stage}</span>
          {renderStreak("0.66rem")}
          {renderProgress("5px")}
          <ScoreCounter value={score} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 900, color: "#fff" }} />
          {renderCoins("0.82rem")}
          <button onClick={handleSkip} disabled={skipsLeft <= 0} style={{ fontSize: "0.65rem", fontWeight: 700, color: skipsLeft > 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)", background: "transparent", border: "none", cursor: skipsLeft > 0 ? "pointer" : "default" }}>⏭{skipsLeft > 0 ? `(${skipsLeft})` : "—"}</button>
          <button onClick={onToggleMute} style={muteBtn(28)}>{isMuted ? "🔇" : "🔊"}</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px 22px", display: "flex", flexDirection: "column", gap: "11px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.88)", textTransform: "uppercase" }}>{subjectIcon} {subjectLabel}</span>
            <span style={{ marginLeft: "auto", padding: "2px 7px", borderRadius: "999px", background: `${diffColor}30`, border: `1.5px solid ${diffColor}60`, fontSize: "0.66rem", fontWeight: 700, color: diffColor }}>{diffLabel}</span>
            <CircularTimer timeLeft={timeLeft} total={timerSeconds} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id + "-q"} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}
              style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", border: "2px solid rgba(255,255,255,0.98)", borderRadius: "18px", padding: "1.1rem 1rem", boxShadow: "0 6px 24px rgba(0,0,0,0.14)" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.02rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.55 }}>{currentQuestion.question}</p>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id + "-a"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, delay: 0.05 }}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {renderAnswers(true)}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  /* ── Tablet ──────────────────────────────────────────────── */
  if (isTablet) {
    return (
      <motion.div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
      >
        <FloatingReward trigger={coinTrigger} text={`+${lastCoinsEarned} 🪙`} offsetX="75%" offsetY="20%" />

        <div style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 26px", background: "rgba(0,0,0,0.18)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(255,255,255,0.14)", flexShrink: 0 }}>
          {renderLives("1.2rem")}
          <span style={{ padding: "3px 11px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.33)", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", color: "#fff" }}>FASE {stage}</span>
          <span style={{ padding: "2px 9px", borderRadius: "999px", background: `${diffColor}28`, border: `1.5px solid ${diffColor}60`, fontSize: "0.66rem", fontWeight: 700, color: diffColor }}>{diffLabel}</span>
          {renderStreak("0.68rem")}
          {renderProgress("6px")}
          <span style={{ fontSize: "0.66rem", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{questionsAnswered % 10}/10</span>
          <ScoreCounter value={score} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.15rem", fontWeight: 900, color: "#fff" }} />
          {renderCoins("0.88rem")}
          <button onClick={handleSkip} disabled={skipsLeft <= 0} style={{ fontSize: "0.68rem", fontWeight: 700, color: skipsLeft > 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)", background: "transparent", border: "none", cursor: skipsLeft > 0 ? "pointer" : "default" }}>⏭ ({skipsLeft})</button>
          <button onClick={onToggleMute} style={muteBtn(30)}>{isMuted ? "🔇" : "🔊"}</button>
        </div>

        <div style={{ flex: 1, display: "flex", gap: "22px", padding: "18px 26px", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id + "-q"} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "13px" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {subjectIcon} {subjectLabel} <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: 6 }}>+{currentQuestion.points * multiplier} pts</span>
              </p>
              <div style={{ background: "rgba(255,255,255,0.92)", border: "2px solid rgba(255,255,255,0.98)", borderRadius: "20px", padding: "1.5rem 1.7rem", boxShadow: "0 8px 32px rgba(0,0,0,0.14)", flex: 1, display: "flex", alignItems: "center" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.55 }}>{currentQuestion.question}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                <CircularTimer timeLeft={timeLeft} total={timerSeconds} />
                <div style={{ flex: 1, height: "5px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
                  <motion.div animate={{ width: `${timerPct}%` }} transition={{ duration: 0.8, ease: "linear" }} style={{ height: "100%", borderRadius: "999px", background: timerBarColor }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id + "-a"} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2, delay: 0.06 }}
              style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "9px" }}>
              {renderAnswers()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  /* ── Desktop ─────────────────────────────────────────────── */
  return (
    <motion.div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
    >
      <FloatingReward trigger={coinTrigger} text={`+${lastCoinsEarned} 🪙`} offsetX="82%" offsetY="18%" />

      {/* HUD */}
      <div style={{ display: "flex", alignItems: "center", padding: "11px 38px", gap: "16px", flexShrink: 0, background: "rgba(0,0,0,0.18)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
        {renderLives("1.35rem")}
        <span style={{ padding: "4px 13px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.33)", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>FASE {stage}</span>
        <span style={{ padding: "3px 10px", borderRadius: "999px", background: `${diffColor}25`, border: `1.5px solid ${diffColor}60`, fontSize: "0.7rem", fontWeight: 700, color: diffColor, textShadow: `0 0 8px ${diffColor}80` }}>{diffLabel}</span>
        {renderStreak("0.75rem")}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "11px" }}>
          {renderProgress("8px")}
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.62)", fontWeight: 700, whiteSpace: "nowrap" }}>{questionsAnswered % 10}/10</span>
        </div>
        <ScoreCounter value={score} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.3rem", fontWeight: 900, color: "#fff", textShadow: "0 0 12px rgba(255,255,255,0.4)" }} />
        {renderCoins("0.92rem")}
        <button onClick={handleSkip} disabled={skipsLeft <= 0} style={{ fontSize: "0.7rem", fontWeight: 700, color: skipsLeft > 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)", background: skipsLeft > 0 ? "rgba(255,255,255,0.12)" : "transparent", border: skipsLeft > 0 ? "1.5px solid rgba(255,255,255,0.22)" : "none", padding: "4px 9px", borderRadius: "999px", cursor: skipsLeft > 0 ? "pointer" : "default", letterSpacing: "0.05em", textTransform: "uppercase" }}>⏭ Skip {skipsLeft > 0 ? `(${skipsLeft})` : "—"}</button>
        <button onClick={onToggleMute} style={muteBtn(33)}>{isMuted ? "🔇" : "🔊"}</button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", gap: "38px", padding: "26px 46px", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion.id + "-q"} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "1rem" }}>
              <span style={{ width: 34, height: 34, borderRadius: "9px", background: `${catColor}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.15rem" }}>{subjectIcon}</span>
              <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{subjectLabel}</span>
              <span style={{ marginLeft: "auto", fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.58)", background: "rgba(255,255,255,0.12)", padding: "2px 9px", borderRadius: "999px" }}>+{currentQuestion.points * multiplier} pts</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(20px)", border: "2px solid rgba(255,255,255,0.98)", borderRadius: "22px", padding: "1.9rem 2rem", boxShadow: "0 8px 40px rgba(0,0,0,0.16)", flex: 1, display: "flex", alignItems: "center" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 600, color: "#0f172a", lineHeight: 1.55 }}>{currentQuestion.question}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "15px" }}>
              <CircularTimer timeLeft={timeLeft} total={timerSeconds} />
              <div style={{ flex: 1, height: "5px", borderRadius: "999px", background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
                <motion.div animate={{ width: `${timerPct}%` }} transition={{ duration: 0.8, ease: "linear" }} style={{ height: "100%", borderRadius: "999px", background: timerBarColor, boxShadow: timeLeft <= 4 ? `0 0 8px ${timerBarColor}` : "none" }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion.id + "-a"} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22, delay: 0.06, ease: "easeOut" }}
            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
            {renderAnswers()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const muteBtn = (size: number): React.CSSProperties => ({
  background: "rgba(255,255,255,0.14)", border: "1.5px solid rgba(255,255,255,0.22)",
  borderRadius: "50%", width: size, height: size,
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", fontSize: size * 0.46 + "px", flexShrink: 0,
});
