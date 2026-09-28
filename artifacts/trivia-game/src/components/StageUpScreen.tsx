import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useGameStore } from "../engine/gameStore";
import { GameButton } from "./GameUI";
import { audio } from "../utils/audio";

export function StageUpScreen() {
  const [result] = useState(() => useGameStore.getState());
  useEffect(() => {
    audio.stageUp();
    const timer = setTimeout(() => result.continueAfterStageUp(), 2000);
    return () => clearTimeout(timer);
  }, [result]);
  return (
    <section className="screen result-screen">
      <div className="center-content">
        <div className="result-content">
          <Sparkles size={52} aria-hidden="true" className="celebration-icon" />
          <h1 data-screen-title tabIndex={-1}>
            ¡Fase {result.stage}!
          </h1>
          <p className="lead">
            {result.stage === 2
              ? "Vamos con el nivel medio"
              : "Un nuevo desafío de nivel difícil"}
          </p>
          <p>
            {result.timerSeconds} segundos por pregunta ·{" "}
            {result.score.toLocaleString()} puntos
          </p>
          <div className="progress-track stage-progress" aria-hidden="true">
            <motion.div
              className="progress-fill"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </div>
          <GameButton onClick={result.continueAfterStageUp}>
            Continuar <ArrowRight aria-hidden="true" />
          </GameButton>
          <p className="hint">La partida continúa automáticamente.</p>
        </div>
      </div>
    </section>
  );
}
