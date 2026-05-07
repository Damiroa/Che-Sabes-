import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useGameStore } from "./engine/gameStore";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { MenuScreen } from "./components/MenuScreen";
import { CategorySelect } from "./components/CategorySelect";
import { GameScreen } from "./components/GameScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { StageUpScreen } from "./components/StageUpScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { audio } from "./utils/audio";

function App() {
  const phase = useGameStore((s) => s.phase);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const nowMuted = audio.toggle();
    setIsMuted(nowMuted);
  };

  // Start bg music when entering gameplay
  useEffect(() => {
    if (phase === "playing" || phase === "category-select") {
      if (!isMuted) audio.startBg();
    } else if (phase === "menu" || phase === "game-over") {
      audio.stopBg();
    }
  }, [phase, isMuted]);

  return (
    <div
      className="scanlines"
      style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}
    >
      <AnimatedBackground />

      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        <AnimatePresence mode="wait">
          {phase === "menu"            && <MenuScreen     key="menu"     isMuted={isMuted} onToggleMute={handleToggleMute} />}
          {phase === "category-select" && <CategorySelect key="category" isMuted={isMuted} />}
          {phase === "playing"         && <GameScreen     key="playing"  isMuted={isMuted} onToggleMute={handleToggleMute} />}
          {phase === "feedback"        && <FeedbackScreen key="feedback" />}
          {phase === "game-over"       && <GameOverScreen key="gameover" isMuted={isMuted} />}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "stage-up" && <StageUpScreen key="stage-up" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
