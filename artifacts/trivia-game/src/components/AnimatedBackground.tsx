import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

interface StageCfg {
  bg: string;
  blobs: { color: string; size: number; left: number; top: number; anim: string; baseDur: number }[];
}

const STAGE_CFG: Record<number, StageCfg> = {
  1: {
    bg: "#dce8ff",
    blobs: [
      { color: "rgba(99,102,241,0.28)",  size: 340, left: -90,  top: -70,  anim: "blob-float-a", baseDur: 16 },
      { color: "rgba(147,197,253,0.32)", size: 260, left: 170,  top: -40,  anim: "blob-float-b", baseDur: 20 },
      { color: "rgba(129,140,248,0.22)", size: 200, left: -30,  top: 290,  anim: "blob-float-c", baseDur: 14 },
      { color: "rgba(79,70,229,0.18)",   size: 290, left: 120,  top: 360,  anim: "blob-float-d", baseDur: 18 },
      { color: "rgba(196,213,255,0.35)", size: 180, left: 200,  top: 150,  anim: "blob-float-e", baseDur: 12 },
    ],
  },
  2: {
    bg: "#fde9c0",
    blobs: [
      { color: "rgba(251,146,60,0.32)",  size: 310, left: -80,  top: -60,  anim: "blob-float-a", baseDur: 7  },
      { color: "rgba(253,186,116,0.36)", size: 240, left: 180,  top: -30,  anim: "blob-float-b", baseDur: 9  },
      { color: "rgba(245,158,11,0.25)",  size: 220, left: -40,  top: 280,  anim: "blob-float-c", baseDur: 6  },
      { color: "rgba(249,115,22,0.20)",  size: 270, left: 130,  top: 350,  anim: "blob-float-d", baseDur: 8  },
      { color: "rgba(252,211,77,0.30)",  size: 170, left: 210,  top: 140,  anim: "blob-float-e", baseDur: 5  },
    ],
  },
  3: {
    bg: "#fdd5d5",
    blobs: [
      { color: "rgba(239,68,68,0.34)",   size: 300, left: -70,  top: -50,  anim: "blob-float-a", baseDur: 3.5 },
      { color: "rgba(252,165,165,0.38)", size: 230, left: 160,  top: -20,  anim: "blob-float-b", baseDur: 4.5 },
      { color: "rgba(220,38,38,0.26)",   size: 200, left: -50,  top: 270,  anim: "blob-float-c", baseDur: 3   },
      { color: "rgba(248,113,113,0.28)", size: 260, left: 120,  top: 340,  anim: "blob-float-d", baseDur: 4   },
      { color: "rgba(254,202,202,0.40)", size: 160, left: 205,  top: 130,  anim: "blob-float-e", baseDur: 2.8 },
    ],
  },
};

function getCfg(stage: number): StageCfg {
  return STAGE_CFG[Math.min(stage, 3)];
}

const TRANSITION = { duration: 1.8, ease: "easeInOut" };

export function AnimatedBackground() {
  const stage = useGameStore((s) => s.stage);
  const cfg = getCfg(stage);

  return (
    <motion.div
      animate={{ backgroundColor: cfg.bg }}
      transition={TRANSITION}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {cfg.blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={{ backgroundColor: b.color }}
          transition={TRANSITION}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            filter: "blur(56px)",
            animation: `${b.anim} ${b.baseDur}s ease-in-out infinite`,
            animationDelay: `${-(i * 1.7)}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
