import { useGameStore } from "../engine/gameStore";
// Animate composited shapes rather than repainting the entire background.
export function AnimatedBackground() {
  const stage = useGameStore((s) => Math.min(s.stage, 3));
  return (
    <div className={`animated-background stage-${stage}`} aria-hidden="true">
      <div className="background-glow background-glow-top" />
      <div className="background-glow background-glow-bottom" />
    </div>
  );
}
