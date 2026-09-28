import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
const COLORS = [
  "#fde68a",
  "#a5f3fc",
  "#bbf7d0",
  "#f9a8d4",
  "#c4b5fd",
  "#fed7aa",
];
export function Particles({ trigger }: { trigger: number }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!trigger || reducedMotion) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(timer);
  }, [trigger, reducedMotion]);
  if (!visible || reducedMotion) return null;
  return (
    <div className="particles" aria-hidden="true">
      {COLORS.map((color, i) => (
        <motion.span
          key={`${trigger}-${i}`}
          style={{ background: color }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((i * Math.PI) / 3) * 90,
            y: Math.sin((i * Math.PI) / 3) * 70,
            opacity: 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
