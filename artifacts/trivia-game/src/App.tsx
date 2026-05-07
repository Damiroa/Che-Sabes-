import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "./engine/gameStore";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { MenuScreen } from "./components/MenuScreen";
import { CategorySelect } from "./components/CategorySelect";
import { GameScreen } from "./components/GameScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { StageUpScreen } from "./components/StageUpScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { audio } from "./utils/audio";

// Shared page-transition variants — blur + fade + slight scale
// Applied once here so individual screens don't need their own initial/exit
const PAGE: Record<string, object> = {
  initial: { opacity: 0, filter: "blur(10px)", scale: 0.97 },
  animate: { opacity: 1, filter: "blur(0px)",  scale: 1    },
  exit:    { opacity: 0, filter: "blur(10px)", scale: 0.97 },
};
const PAGE_TRANSITION = { duration: 0.28, ease: [0.4, 0, 0.2, 1] };

function Page({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <motion.div
      key={id}
      variants={PAGE}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={PAGE_TRANSITION}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const phase = useGameStore((s) => s.phase);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const nowMuted = audio.toggle();
    setIsMuted(nowMuted);
  };

  // Music: start when entering gameplay, stop on menu/game-over
  useEffect(() => {
    const playing = phase === "category-select" || phase === "playing"
      || phase === "feedback" || phase === "stage-up";
    if (playing && !isMuted) {
      audio.startBg();
    } else if (phase === "menu" || phase === "game-over") {
      audio.stopBg();
    }
  }, [phase, isMuted]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <AnimatedBackground />

      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        <AnimatePresence mode="wait">
          {phase === "menu" && (
            <Page id="menu">
              <MenuScreen isMuted={isMuted} onToggleMute={handleToggleMute} />
            </Page>
          )}
          {phase === "category-select" && (
            <Page id="category">
              <CategorySelect isMuted={isMuted} />
            </Page>
          )}
          {phase === "playing" && (
            <Page id="playing">
              <GameScreen isMuted={isMuted} onToggleMute={handleToggleMute} />
            </Page>
          )}
          {phase === "feedback" && (
            <Page id="feedback">
              <FeedbackScreen />
            </Page>
          )}
          {phase === "game-over" && (
            <Page id="gameover">
              <GameOverScreen isMuted={isMuted} />
            </Page>
          )}
        </AnimatePresence>

        {/* Stage-up overlay — not in mode="wait" so it layers on top */}
        <AnimatePresence>
          {phase === "stage-up" && <StageUpScreen key="stage-up" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
