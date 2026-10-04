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
          <img
            className="menu-artwork"
            src={`${import.meta.env.BASE_URL}che-sabes-cover.jpg`}
            alt="Personaje de Che Sabés con su computadora y libros"
            width={600}
            height={600}
            fetchPriority="high"
          />
          <div className="menu-copy">
            <p className="eyebrow">Aprendé. Jugá. Superate.</p>
            <h1 data-screen-title tabIndex={-1}>
              Che Sabés
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
              <span>6 cursos</span>
              <span>19 materias</span>
              <span>Un nuevo desafío en cada partida</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
