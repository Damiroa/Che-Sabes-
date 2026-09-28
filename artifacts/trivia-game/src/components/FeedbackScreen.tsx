import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, XCircle, Coins } from "lucide-react";
import { useGameStore, getStreakMultiplier } from "../engine/gameStore";
import { Particles } from "./Particles";
import { GameButton, Lives, UI_TRANSITION } from "./GameUI";
import { audio } from "../utils/audio";

export function FeedbackScreen() {
  // Freeze the result while the page exits and the store advances.
  const [result] = useState(() => useGameStore.getState());
  const correct = result.lastAnswerCorrect === true;
  const Icon = result.timedOut ? Clock3 : correct ? CheckCircle2 : XCircle;
  useEffect(() => {
    if (!correct || !result.lastCoinsEarned) return;
    const reward = setTimeout(() => audio.coinEarn(), 300);
    return () => clearTimeout(reward);
  }, [correct, result.lastCoinsEarned]);
  return (
    <section className="screen result-screen">
      {correct && <Particles trigger={1} />}
      <div className="center-content">
        <div className="result-content">
          <motion.div
            className={`result-card ${correct ? "success" : "error"}`}
            initial={{ y: 8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={UI_TRANSITION}
          >
            <Icon className="result-icon" size={52} aria-hidden="true" />
            <h1 data-screen-title tabIndex={-1}>
              {result.timedOut
                ? "¡Se acabó el tiempo!"
                : correct
                  ? "¡Correcto!"
                  : "¡Incorrecto!"}
            </h1>
            {!correct && (
              <div className="correct-answer">
                <p className="muted">La respuesta correcta es</p>
                <strong>{result.lastCorrectAnswer}</strong>
              </div>
            )}
            {correct && result.lastCoinsEarned > 0 && (
              <p className="reward">
                <Coins aria-hidden="true" />+{result.lastCoinsEarned} monedas
              </p>
            )}
          </motion.div>
          {result.streak >= 3 && (
            <p className="badge">
              Racha de {result.streak} · ×
              {getStreakMultiplier(result.streak, result.shop.maxMulti)}
            </p>
          )}
          <Lives count={result.lives} shield={result.activeShield} />
          <GameButton onClick={() => useGameStore.getState().nextQuestion()}>
            Siguiente <ArrowRight aria-hidden="true" />
          </GameButton>
        </div>
      </div>
    </section>
  );
}
