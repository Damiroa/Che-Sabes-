import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";
import { useBreakpoint } from "../hooks/useBreakpoint";

interface BlobDef { color: string; size: number; left: string; top: string; anim: string; dur: number }
interface StageCfg { bg: string; blobs: BlobDef[] }

// 4 blobs per stage (down from 6) for better perf on low-end devices
const STAGE_CFG: Record<number, StageCfg> = {
  1: {
    bg: "#29b5e8",
    blobs: [
      { color: "rgba(2,132,199,0.40)",   size: 520, left: "-14%", top: "-18%", anim: "blob-float-a", dur: 18 },
      { color: "rgba(56,189,248,0.44)",  size: 400, left: "70%",  top: "-10%", anim: "blob-float-b", dur: 22 },
      { color: "rgba(14,165,233,0.32)",  size: 380, left: "-6%",  top: "55%",  anim: "blob-float-c", dur: 16 },
      { color: "rgba(103,232,249,0.38)", size: 440, left: "62%",  top: "50%",  anim: "blob-float-d", dur: 20 },
    ],
  },
  2: {
    bg: "#f97316",
    blobs: [
      { color: "rgba(194,65,12,0.44)",  size: 500, left: "-13%", top: "-16%", anim: "blob-float-a", dur: 18 },
      { color: "rgba(251,146,60,0.50)", size: 380, left: "68%",  top: "-8%",  anim: "blob-float-b", dur: 22 },
      { color: "rgba(245,158,11,0.36)", size: 360, left: "-5%",  top: "52%",  anim: "blob-float-c", dur: 16 },
      { color: "rgba(252,211,77,0.46)", size: 420, left: "60%",  top: "48%",  anim: "blob-float-d", dur: 20 },
    ],
  },
  3: {
    bg: "#ef4444",
    blobs: [
      { color: "rgba(153,27,27,0.48)",   size: 480, left: "-12%", top: "-15%", anim: "blob-float-a", dur: 18 },
      { color: "rgba(252,165,165,0.52)", size: 360, left: "66%",  top: "-7%",  anim: "blob-float-b", dur: 22 },
      { color: "rgba(220,38,38,0.40)",   size: 340, left: "-4%",  top: "50%",  anim: "blob-float-c", dur: 16 },
      { color: "rgba(254,202,202,0.50)", size: 400, left: "58%",  top: "46%",  anim: "blob-float-d", dur: 20 },
    ],
  },
};

const TRANSITION = { duration: 1.4, ease: "easeInOut" };

export function AnimatedBackground() {
  const stage = useGameStore((s) => s.stage);
  const { isMobile } = useBreakpoint();
  const cfg = STAGE_CFG[Math.min(stage, 3)];

  // On mobile: smaller blobs, less blur (cheaper to render)
  const blurPx = isMobile ? "55px" : "80px";

  return (
    <motion.div
      animate={{ backgroundColor: cfg.bg }}
      transition={TRANSITION}
      style={{
        position: "absolute", inset: 0,
        overflow: "hidden", zIndex: 0, pointerEvents: "none",
      }}
    >
      {cfg.blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={{ backgroundColor: b.color }}
          transition={TRANSITION}
          style={{
            position: "absolute",
            left: b.left, top: b.top,
            width: isMobile ? b.size * 0.75 : b.size,
            height: isMobile ? b.size * 0.75 : b.size,
            borderRadius: "50%",
            filter: `blur(${blurPx})`,
            animation: `${b.anim} ${b.dur}s ease-in-out infinite`,
            animationDelay: `${-(i * 2.8)}s`,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
      ))}
    </motion.div>
  );
}
