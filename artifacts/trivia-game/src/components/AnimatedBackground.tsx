import { useGameStore } from "../engine/gameStore";
// Static radial gradients avoid repainting large blurred layers on mobile.
// One small decorative layer retains subtle movement using transforms only.
export function AnimatedBackground() {
  const stage = useGameStore((s) => Math.min(s.stage, 3));
  return (
    <div className={`animated-background stage-${stage}`} aria-hidden="true">
      <div className="background-orbit" />
    </div>
  );
}
