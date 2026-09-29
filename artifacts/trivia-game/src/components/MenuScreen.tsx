import { ArrowRight, ShoppingBag, Trophy } from "lucide-react";
import { useGameStore } from "../engine/gameStore";
import { audio } from "../utils/audio";
import { CoinBadge, GameButton, SoundButton } from "./GameUI";

interface Props {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenShop: () => void;
}

export function MenuScreen({ isMuted, onToggleMute, onOpenShop }: Props) {
  const highScore = useGameStore((s) => s.highScore);
  const coins = useGameStore((s) => s.coins);
  const resetGame = useGameStore((s) => s.resetGame);
  return (
    <section className="screen menu-screen">
      <header className="screen-header">
        <CoinBadge value={coins} />
        <SoundButton muted={isMuted} onToggle={onToggleMute} />
      </header>
      <div className="center-content">
        <div className="menu-card">
          <p className="eyebrow">Un desafío, muchas formas de aprender</p>
          <h1 data-screen-title tabIndex={-1}>
            Che Sabe
          </h1>
          <p className="lead">
            Elegí tu curso, encontrá tu materia y poné a prueba lo que sabés.
          </p>
          {highScore > 0 && (
            <div className="record-row">
              <Trophy aria-hidden="true" />
              <span>
                Tu récord <strong>{highScore.toLocaleString()} puntos</strong>
              </span>
            </div>
          )}
          <div className="button-row">
            <GameButton
              onClick={() => {
                if (!isMuted) audio.click();
                resetGame();
              }}
            >
              Comenzar partida <ArrowRight aria-hidden="true" />
            </GameButton>
            <GameButton className="secondary" onClick={onOpenShop}>
              <ShoppingBag aria-hidden="true" />
              Tienda
            </GameButton>
          </div>
          <p className="menu-facts">
            6 cursos <span aria-hidden="true">·</span> 19 materias{" "}
            <span aria-hidden="true">·</span> A tu ritmo de aprendizaje
          </p>
        </div>
      </div>
    </section>
  );
}
