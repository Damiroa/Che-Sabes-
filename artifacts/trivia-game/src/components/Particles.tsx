import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

const COLORS = ["#fde68a", "#a5f3fc", "#bbf7d0", "#f9a8d4", "#c4b5fd", "#fed7aa", "#fff"];
const SHAPES = ["●", "★", "◆", "▲", "✦"];

interface Particle {
  id: number; x: number; y: number;
  angle: number; dist: number;
  color: string; shape: string;
  size: number; spin: number;
}

interface Props {
  trigger: number;
  originX?: string;
  originY?: string;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    angle: (i / count) * 360 + Math.random() * 15,
    dist: 90 + Math.random() * 140,
    color: COLORS[i % COLORS.length],
    shape: SHAPES[i % SHAPES.length],
    size: 9 + Math.random() * 10,
    spin: (Math.random() - 0.5) * 540,
  }));
}

export function Particles({ trigger, originX = "50%", originY = "50%" }: Props) {
  const { isMobile } = useBreakpoint();
  // 14 particles on mobile, 22 on desktop — fewer = smoother on low-end devices
  const COUNT = isMobile ? 14 : 22;
  const [bursts, setBursts] = useState<{ key: number; particles: Particle[] }[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const key = Date.now();
    const particles = makeParticles(COUNT);
    setBursts(prev => [...prev, { key, particles }]);
    const timer = setTimeout(() => setBursts(prev => prev.filter(b => b.key !== key)), 1100);
    return () => { clearTimeout(timer); };
  }, [trigger]);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 200, overflow: "hidden" }}>
      <AnimatePresence>
        {bursts.map(burst =>
          burst.particles.map(p => {
            const rad = (p.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * p.dist;
            const ty = Math.sin(rad) * p.dist;
            return (
              <motion.div
                key={`${burst.key}-${p.id}`}
                initial={{ opacity: 1, scale: 0.2, rotate: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1, rotate: p.spin, x: tx, y: ty }}
                transition={{ duration: 0.85, ease: [0.2, 0.8, 0.4, 1] }}
                style={{
                  position: "absolute", left: originX, top: originY,
                  fontSize: p.size, color: p.color, lineHeight: 1,
                  userSelect: "none", fontWeight: 900,
                  willChange: "transform, opacity",
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
