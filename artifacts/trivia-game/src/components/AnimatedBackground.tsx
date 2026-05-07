import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

interface BlobDef { color: string; size: number; left: number; top: number; anim: string; baseDur: number }
interface StageCfg { bg: string; blobs: BlobDef[] }

const STAGE_CFG: Record<number, StageCfg> = {
  1: {
    bg: "#29b5e8",
    blobs: [
      { color: "rgba(2,132,199,0.38)",   size: 360, left: -100, top: -80,  anim: "blob-float-a", baseDur: 16 },
      { color: "rgba(56,189,248,0.42)",  size: 270, left: 160,  top: -40,  anim: "blob-float-b", baseDur: 20 },
      { color: "rgba(14,165,233,0.30)",  size: 210, left: -35,  top: 290,  anim: "blob-float-c", baseDur: 14 },
      { color: "rgba(7,182,213,0.35)",   size: 300, left: 110,  top: 360,  anim: "blob-float-d", baseDur: 18 },
      { color: "rgba(103,232,249,0.40)", size: 190, left: 195,  top: 145,  anim: "blob-float-e", baseDur: 12 },
    ],
  },
  2: {
    bg: "#f97316",
    blobs: [
      { color: "rgba(194,65,12,0.42)",   size: 330, left: -85,  top: -65,  anim: "blob-float-a", baseDur: 7  },
      { color: "rgba(251,146,60,0.48)",  size: 250, left: 170,  top: -35,  anim: "blob-float-b", baseDur: 9  },
      { color: "rgba(245,158,11,0.35)",  size: 230, left: -40,  top: 280,  anim: "blob-float-c", baseDur: 6  },
      { color: "rgba(249,115,22,0.38)",  size: 280, left: 125,  top: 355,  anim: "blob-float-d", baseDur: 8  },
      { color: "rgba(252,211,77,0.44)",  size: 175, left: 205,  top: 138,  anim: "blob-float-e", baseDur: 5  },
    ],
  },
  3: {
    bg: "#ef4444",
    blobs: [
      { color: "rgba(153,27,27,0.45)",   size: 320, left: -75,  top: -55,  anim: "blob-float-a", baseDur: 3.5 },
      { color: "rgba(252,165,165,0.50)", size: 240, left: 155,  top: -25,  anim: "blob-float-b", baseDur: 4.5 },
      { color: "rgba(220,38,38,0.38)",   size: 210, left: -48,  top: 275,  anim: "blob-float-c", baseDur: 3   },
      { color: "rgba(248,113,113,0.42)", size: 270, left: 115,  top: 345,  anim: "blob-float-d", baseDur: 4   },
      { color: "rgba(254,202,202,0.52)", size: 168, left: 200,  top: 128,  anim: "blob-float-e", baseDur: 2.8 },
    ],
  },
};

function getCfg(stage: number): StageCfg {
  return STAGE_CFG[Math.min(stage, 3)];
}

const TRANSITION = { duration: 1.6, ease: "easeInOut" };

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
            filter: "blur(60px)",
            animation: `${b.anim} ${b.baseDur}s ease-in-out infinite`,
            animationDelay: `${-(i * 1.7)}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
