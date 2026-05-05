import { motion } from "framer-motion";
import { useGameStore } from "../engine/gameStore";

interface StageCfg {
  bg: string;
  blobs: string[];
  speedMult: number; // higher = faster
}

const STAGE_CFG: Record<number, StageCfg> = {
  1: {
    bg: "#eef3ff",
    blobs: [
      "rgba(99,102,241,0.13)",
      "rgba(147,197,253,0.15)",
      "rgba(165,180,252,0.12)",
      "rgba(196,213,255,0.18)",
      "rgba(129,140,248,0.10)",
    ],
    speedMult: 1,
  },
  2: {
    bg: "#fef9ec",
    blobs: [
      "rgba(251,146,60,0.15)",
      "rgba(253,186,116,0.18)",
      "rgba(245,158,11,0.12)",
      "rgba(252,211,77,0.16)",
      "rgba(249,115,22,0.11)",
    ],
    speedMult: 2.2,
  },
  3: {
    bg: "#fff1f1",
    blobs: [
      "rgba(239,68,68,0.16)",
      "rgba(252,165,165,0.18)",
      "rgba(220,38,38,0.13)",
      "rgba(254,202,202,0.20)",
      "rgba(248,113,113,0.14)",
    ],
    speedMult: 4.5,
  },
};

function getCfg(stage: number): StageCfg {
  return STAGE_CFG[Math.min(stage, 3)];
}

const BLOB_DEFS = [
  { size: 380, left: -110, top: -80,  anim: "blob-float-a", baseDur: 17 },
  { size: 260, left: 170,  top: -30,  anim: "blob-float-b", baseDur: 21 },
  { size: 220, left: -40,  top: 280,  anim: "blob-float-c", baseDur: 15 },
  { size: 310, left: 130,  top: 340,  anim: "blob-float-d", baseDur: 19 },
  { size: 190, left: 210,  top: 140,  anim: "blob-float-e", baseDur: 13 },
];

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
      {BLOB_DEFS.map((b, i) => {
        const dur = b.baseDur / cfg.speedMult;
        return (
          <motion.div
            key={i}
            animate={{ backgroundColor: cfg.blobs[i] }}
            transition={TRANSITION}
            style={{
              position: "absolute",
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              filter: "blur(48px)",
              animation: `${b.anim} ${dur}s ease-in-out infinite`,
              animationDelay: `${-(i * 1.4)}s`,
            }}
          />
        );
      })}
    </motion.div>
  );
}
