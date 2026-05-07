import { motion } from "framer-motion";

interface Props {
  timeLeft: number;
  total: number;
}

const R = 30;
const C = 2 * Math.PI * R;

export function CircularTimer({ timeLeft, total }: Props) {
  const pct = timeLeft / total;
  const offset = C * (1 - pct);
  const color = pct > 0.5 ? "#4ade80" : pct > 0.25 ? "#fbbf24" : "#f87171";
  const isUrgent = pct <= 0.3;

  return (
    <motion.div
      animate={isUrgent ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={isUrgent ? { duration: 0.5, repeat: Infinity } : {}}
      style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}
    >
      <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
        {/* Background ring */}
        <circle cx="36" cy="36" r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6" />
        {/* Progress ring */}
        <motion.circle
          cx="36" cy="36" r={R}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={C}
          animate={{ strokeDashoffset: offset, stroke: color }}
          transition={{ duration: 0.8, ease: "linear" }}
          style={{ filter: isUrgent ? `drop-shadow(0 0 6px ${color})` : "none" }}
        />
      </svg>
      {/* Number */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <motion.span
          key={timeLeft}
          initial={{ scale: isUrgent ? 1.3 : 1.05, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.1rem", fontWeight: 900, color,
            textShadow: isUrgent ? `0 0 12px ${color}` : "none",
          }}
        >
          {timeLeft}
        </motion.span>
      </div>
    </motion.div>
  );
}
