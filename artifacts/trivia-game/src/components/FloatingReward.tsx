import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatItem { id: number; text: string; color: string }

interface Props {
  trigger: number;   // increment to show
  text: string;      // e.g. "+12 🪙"
  color?: string;
  offsetX?: string;  // css left value
  offsetY?: string;  // css bottom value
}

let _uid = 0;

export function FloatingReward({ trigger, text, color = "#fde68a", offsetX = "50%", offsetY = "35%" }: Props) {
  const [items, setItems] = useState<FloatItem[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const id = ++_uid;
    setItems(prev => [...prev, { id, text, color }]);
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 1300);
  }, [trigger]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, y: 0, scale: 0.85, x: "-50%" }}
            animate={{ opacity: 0, y: -72, scale: 1.1,  x: "-50%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              left: offsetX, bottom: offsetY,
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.15rem", fontWeight: 900,
              color: item.color,
              textShadow: `0 2px 14px ${item.color}99`,
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
