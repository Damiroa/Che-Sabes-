import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useIsPresent,
} from "framer-motion";
import { useGameStore } from "./engine/gameStore";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { MenuScreen } from "./components/MenuScreen";
import { CategorySelect } from "./components/CategorySelect";
import { GameScreen } from "./components/GameScreen";
import { FeedbackScreen } from "./components/FeedbackScreen";
import { StageUpScreen } from "./components/StageUpScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { ShopPanel } from "./components/ShopPanel";
import { UI_TRANSITION } from "./components/GameUI";
import { audio } from "./utils/audio";

function Page({ children }: { children: React.ReactNode }) {
  const present = useIsPresent();
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (present)
      element.current
        ?.querySelector<HTMLElement>("[data-screen-title]")
        ?.focus({ preventScroll: true });
  }, [present]);
  return (
    <motion.div
      ref={element}
      className="app-page"
      data-active={present}
      inert={!present}
      initial={{ opacity: 0.7, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={UI_TRANSITION}
      style={{
        zIndex: present ? 2 : 1,
        pointerEvents: present ? "auto" : "none",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const phase = useGameStore((s) => s.phase);
  const [muted, setMuted] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  useEffect(() => {
    const playing = [
      "category-select",
      "playing",
      "feedback",
      "stage-up",
    ].includes(phase);
    if (playing && !muted) audio.startBg();
    else audio.stopBg();
    if (phase === "playing") setShopOpen(false);
  }, [phase, muted]);
  const toggleMute = () => setMuted(audio.toggle());
  const openShop = () => {
    audio.click();
    setShopOpen(true);
  };
  return (
    <MotionConfig reducedMotion="user" transition={UI_TRANSITION}>
      <main className="app-shell">
        <AnimatedBackground />
        <AnimatePresence mode="sync" initial={false}>
          <Page key={phase}>
            {phase === "menu" && (
              <MenuScreen
                isMuted={muted}
                onToggleMute={toggleMute}
                onOpenShop={openShop}
              />
            )}
            {phase === "category-select" && <CategorySelect isMuted={muted} />}
            {phase === "playing" && (
              <GameScreen isMuted={muted} onToggleMute={toggleMute} />
            )}
            {phase === "feedback" && <FeedbackScreen />}
            {phase === "stage-up" && <StageUpScreen />}
            {phase === "game-over" && (
              <GameOverScreen isMuted={muted} onOpenShop={openShop} />
            )}
          </Page>
        </AnimatePresence>
        <ShopPanel isOpen={shopOpen} onClose={() => setShopOpen(false)} />
      </main>
    </MotionConfig>
  );
}
