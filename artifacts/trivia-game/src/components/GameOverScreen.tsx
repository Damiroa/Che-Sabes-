import { useEffect, useState } from "react";
import { Trophy, Flag, RotateCcw, Home, ShoppingBag } from "lucide-react";
import { useGameStore } from "../engine/gameStore";
import { CoinBadge, GameButton } from "./GameUI";
import { Particles } from "./Particles";
import { audio } from "../utils/audio";

interface Props {
  isMuted: boolean;
  onOpenShop: () => void;
}
export function GameOverScreen({ isMuted, onOpenShop }: Props) {
  const [result] = useState(() => useGameStore.getState());
  const coins = useGameStore((s) => s.coins);
  const record = result.score > 0 && result.score >= result.highScore;
  useEffect(() => {
    if (record && !isMuted) audio.stageUp();
  }, [record, isMuted]);
  const Icon = record ? Trophy : Flag;
  return (
    <section className="screen result-screen">
      {record && <Particles trigger={1} />}
      <header className="screen-header">
        <span className="wordmark">Che Sabe</span>
        <CoinBadge value={coins} />
      </header>
      <div className="center-content">
        <div className="result-content game-over-content">
          <Icon size={56} className="celebration-icon" aria-hidden="true" />
          <h1 data-screen-title tabIndex={-1}>
            {result.exhausted
              ? "¡Completaste todas las preguntas!"
              : record
                ? "¡Nuevo récord!"
                : "Fin del juego"}
          </h1>
          <p className="lead">
            {result.exhausted
              ? "Terminaste esta materia sin repetir preguntas."
              : "Cada partida es una oportunidad para aprender algo nuevo."}
          </p>
          <dl className="stats-grid">
            <div>
              <dt>Puntaje</dt>
              <dd>{result.score.toLocaleString()}</dd>
            </div>
            <div>
              <dt>Mejor racha</dt>
              <dd>{result.bestStreak}</dd>
            </div>
            <div>
              <dt>Preguntas</dt>
              <dd>{result.questionsAnswered}</dd>
            </div>
          </dl>
          <p>
            Récord histórico:{" "}
            <strong>{result.highScore.toLocaleString()} puntos</strong>
          </p>
          <div className="button-row">
            <GameButton
              onClick={() => {
                if (!isMuted) audio.click();
                result.resetGame();
              }}
            >
              <RotateCcw aria-hidden="true" />
              Jugar de nuevo
            </GameButton>
            <GameButton className="secondary" onClick={onOpenShop}>
              <ShoppingBag aria-hidden="true" />
              Tienda
            </GameButton>
            <GameButton
              className="secondary"
              onClick={() => {
                if (!isMuted) audio.click();
                result.goToMenu();
              }}
            >
              <Home aria-hidden="true" />
              Menú
            </GameButton>
          </div>
        </div>
      </div>
    </section>
  );
}
