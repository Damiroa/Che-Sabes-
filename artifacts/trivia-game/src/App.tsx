import { AnimatePresence } from "framer-motion";
import { useGameStore } from "./engine/gameStore";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { MenuScreen } from "./components/MenuScreen";
import { CategorySelect } from "./components/CategorySelect";
import { GameScreen } from "./components/GameScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { StageUpScreen } from "./components/StageUpScreen";
import { GameOverScreen } from "./components/GameOverScreen";

function App() {
  const phase = useGameStore((s) => s.phase);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      position: "relative",
      overflow: "hidden",
    }}>
      <AnimatedBackground />

      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        <AnimatePresence mode="wait">
          {phase === "menu"            && <MenuScreen     key="menu"     />}
          {phase === "category-select" && <CategorySelect key="category" />}
          {phase === "playing"         && <GameScreen     key="playing"  />}
          {phase === "feedback"        && <FeedbackScreen key="feedback" />}
          {phase === "game-over"       && <GameOverScreen key="gameover" />}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "stage-up" && <StageUpScreen key="stage-up" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
