import { useState, useEffect } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useGameStore } from "./engine/gameStore";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { MenuScreen } from "./components/MenuScreen";
import { CategorySelect } from "./components/CategorySelect";
import { GameScreen } from "./components/GameScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { StageUpScreen } from "./components/StageUpScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { ShopPanel } from "./components/ShopPanel";
import { audio } from "./utils/audio";

const PAGE_TRANSITION: Transition = { duration: 0.26, ease: [0.4, 0, 0.2, 1] };

function Page({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={PAGE_TRANSITION}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        overflowY: "auto", overflowX: "hidden",
        minHeight: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const phase = useGameStore((s) => s.phase);
  const [isMuted,    setIsMuted]    = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const handleToggleMute = () => {
    const nowMuted = audio.toggle();
    setIsMuted(nowMuted);
  };

  const openShop  = () => { audio.click(); setIsShopOpen(true);  };
  const closeShop = () => setIsShopOpen(false);

  useEffect(() => {
    const playing = ["category-select", "playing", "feedback", "stage-up"].includes(phase);
    if (playing && !isMuted) audio.startBg();
    else if (phase === "menu" || phase === "game-over") audio.stopBg();
  }, [phase, isMuted]);

  // Close shop when a game starts
  useEffect(() => {
    if (phase === "playing") setIsShopOpen(false);
  }, [phase]);

  return (
    <div className="app-shell">
      <AnimatedBackground />

      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        <AnimatePresence mode="wait">
          {phase === "menu" && (
            <Page key="menu" id="menu">
              <MenuScreen isMuted={isMuted} onToggleMute={handleToggleMute} onOpenShop={openShop} />
            </Page>
          )}
          {phase === "category-select" && (
            <Page key="category" id="category">
              <CategorySelect isMuted={isMuted} />
            </Page>
          )}
          {phase === "playing" && (
            <Page key="playing" id="playing">
              <GameScreen isMuted={isMuted} onToggleMute={handleToggleMute} />
            </Page>
          )}
          {phase === "feedback" && (
            <Page key="feedback" id="feedback">
              <FeedbackScreen />
            </Page>
          )}
          {phase === "game-over" && (
            <Page key="gameover" id="gameover">
              <GameOverScreen isMuted={isMuted} onOpenShop={openShop} />
            </Page>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "stage-up" && <StageUpScreen key="stage-up" />}
        </AnimatePresence>
      </div>

      {/* Shop overlay — always mounted so it can slide over any screen */}
      <ShopPanel isOpen={isShopOpen} onClose={closeShop} />
    </div>
  );
}

export default App;
