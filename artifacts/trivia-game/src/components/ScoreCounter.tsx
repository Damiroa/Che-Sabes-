import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  style?: React.CSSProperties;
}

export function ScoreCounter({ value, style }: Props) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (value === prev.current) return;
    const start = prev.current;
    const end = value;
    const diff = end - start;
    const duration = Math.min(600, Math.abs(diff) * 2);
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
      setDisplay(Math.round(start + diff * eased));
      if (t < 1) requestAnimationFrame(animate);
      else prev.current = end;
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span style={style}>{display.toLocaleString()}</span>;
}
