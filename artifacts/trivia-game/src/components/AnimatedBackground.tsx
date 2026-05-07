import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

interface BlobDef { color: string; size: number; left: number; top: number; anim: string; baseDur: number }
interface StageCfg { bg: string; blobs: BlobDef[] }

const STAGE_CFG: Record<number, StageCfg> = {
  1: {
    bg: "#29b5e8",
    blobs: [
      { color: "rgba(2,132,199,0.38)",   size: 480, left: -140, top: -120, anim: "blob-float-a", baseDur: 16 },
      { color: "rgba(56,189,248,0.42)",  size: 360, left: 900,  top: -60,  anim: "blob-float-b", baseDur: 20 },
      { color: "rgba(14,165,233,0.30)",  size: 300, left: -60,  top: 420,  anim: "blob-float-c", baseDur: 14 },
      { color: "rgba(7,182,213,0.35)",   size: 420, left: 750,  top: 400,  anim: "blob-float-d", baseDur: 18 },
      { color: "rgba(103,232,249,0.40)", size: 260, left: 400,  top: -80,  anim: "blob-float-e", baseDur: 12 },
      { color: "rgba(56,189,248,0.28)",  size: 320, left: 500,  top: 500,  anim: "blob-float-a", baseDur: 22 },
    ],
  },
  2: {
    bg: "#f97316",
    blobs: [
      { color: "rgba(194,65,12,0.42)",   size: 460, left: -120, top: -100, anim: "blob-float-a", baseDur: 7  },
      { color: "rgba(251,146,60,0.48)",  size: 340, left: 880,  top: -50,  anim: "blob-float-b", baseDur: 9  },
      { color: "rgba(245,158,11,0.35)",  size: 300, left: -50,  top: 400,  anim: "blob-float-c", baseDur: 6  },
      { color: "rgba(249,115,22,0.38)",  size: 400, left: 740,  top: 380,  anim: "blob-float-d", baseDur: 8  },
      { color: "rgba(252,211,77,0.44)",  size: 250, left: 420,  top: -60,  anim: "blob-float-e", baseDur: 5  },
      { color: "rgba(251,146,60,0.32)",  size: 300, left: 520,  top: 480,  anim: "blob-float-b", baseDur: 7  },
    ],
  },
  3: {
    bg: "#ef4444",
    blobs: [
      { color: "rgba(153,27,27,0.45)",   size: 440, left: -110, top: -90,  anim: "blob-float-a", baseDur: 3.5 },
      { color: "rgba(252,165,165,0.50)", size: 320, left: 870,  top: -40,  anim: "blob-float-b", baseDur: 4.5 },
      { color: "rgba(220,38,38,0.38)",   size: 290, left: -45,  top: 390,  anim: "blob-float-c", baseDur: 3   },
      { color: "rgba(248,113,113,0.42)", size: 380, left: 730,  top: 370,  anim: "blob-float-d", baseDur: 4   },
      { color: "rgba(254,202,202,0.52)", size: 240, left: 410,  top: -50,  anim: "blob-float-e", baseDur: 2.8 },
      { color: "rgba(239,68,68,0.36)",   size: 290, left: 530,  top: 470,  anim: "blob-float-c", baseDur: 3.5 },
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
            filter: "blur(80px)",
            animation: `${b.anim} ${b.baseDur}s ease-in-out infinite`,
            animationDelay: `${-(i * 1.7)}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
