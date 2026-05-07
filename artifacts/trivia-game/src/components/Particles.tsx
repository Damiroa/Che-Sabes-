import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#fde68a", "#a5f3fc", "#bbf7d0", "#f9a8d4", "#c4b5fd", "#fed7aa", "#fff"];
const SHAPES = ["●", "★", "◆", "▲", "✦"];

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  dist: number;
  color: string;
  shape: string;
  size: number;
  spin: number;
}

interface Props {
  trigger: number; // increment to trigger burst
  originX?: string;
  originY?: string;
}

function makeParticles(): Particle[] {
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    angle: (i / 28) * 360 + Math.random() * 20 - 10,
    dist: 120 + Math.random() * 160,
    color: COLORS[i % COLORS.length],
    shape: SHAPES[i % SHAPES.length],
    size: 10 + Math.random() * 12,
    spin: (Math.random() - 0.5) * 720,
  }));
}

export function Particles({ trigger, originX = "50%", originY = "50%" }: Props) {
  const [bursts, setBursts] = useState<{ key: number; particles: Particle[] }[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const key = Date.now();
    const particles = makeParticles();
    setBursts((prev) => [...prev, { key, particles }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.key !== key));
    }, 1200);
  }, [trigger]);

  return (
    <div style={{
      position: "fixed", inset: 0,
      pointerEvents: "none", zIndex: 200,
      overflow: "hidden",
    }}>
      <AnimatePresence>
        {bursts.map((burst) =>
          burst.particles.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * p.dist;
            const ty = Math.sin(rad) * p.dist;
            return (
              <motion.div
                key={`${burst.key}-${p.id}`}
                initial={{
                  position: "absolute",
                  left: originX,
                  top: originY,
                  opacity: 1,
                  scale: 0.2,
                  rotate: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  rotate: p.spin,
                  x: tx,
                  y: ty,
                }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.4, 1] }}
                style={{
                  position: "absolute",
                  left: originX,
                  top: originY,
                  fontSize: p.size,
                  color: p.color,
                  lineHeight: 1,
                  userSelect: "none",
                  textShadow: `0 0 8px ${p.color}`,
                  fontWeight: 900,
                }}
              >
                {p.shape}
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
}
