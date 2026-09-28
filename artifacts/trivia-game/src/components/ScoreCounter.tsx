import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
export function ScoreCounter({
  value,
  style,
}: {
  value: number;
  style?: React.CSSProperties;
}) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) {
      current.current = value;
      setDisplay(value);
      return;
    }
    const start = current.current;
    const startedAt = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min((now - startedAt) / 400, 1);
      const eased = (1 - Math.cos(Math.PI * t)) / 2;
      current.current = Math.round(start + (value - start) * eased);
      setDisplay(current.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, reducedMotion]);
  return <span style={style}>{display.toLocaleString()}</span>;
}
