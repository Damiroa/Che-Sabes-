import { AnimatePresence } from "framer-motion";
import { useGameStore } from "./engine/gameStore";
import { MenuScreen } from "./components/MenuScreen";
import { CategorySelect } from "./components/CategorySelect";
import { GameScreen } from "./components/GameScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { StageUpScreen } from "./components/StageUpScreen";
import { GameOverScreen } from "./components/GameOverScreen";

function App() {
  const phase = useGameStore((s) => s.phase);

  return (
    <div
      className="min-h-screen w-full max-w-md mx-auto relative"
      style={{ background: "#f7f8fc" }}
    >
      <AnimatePresence mode="wait">
        {phase === "menu" && <MenuScreen key="menu" />}
        {phase === "category-select" && <CategorySelect key="category" />}
        {phase === "playing" && <GameScreen key="playing" />}
        {phase === "feedback" && <FeedbackScreen key="feedback" />}
        {phase === "stage-up" && <StageUpScreen key="stage-up" />}
        {phase === "game-over" && <GameOverScreen key="gameover" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
