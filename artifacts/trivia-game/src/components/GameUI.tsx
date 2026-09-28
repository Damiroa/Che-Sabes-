import { motion, type HTMLMotionProps } from "framer-motion";
import { Coins, Heart, Shield, Volume2, VolumeX } from "lucide-react";

export const UI_TRANSITION = { duration: 0.35, ease: "easeInOut" } as const;

export function GameButton({
  className = "",
  disabled,
  children,
  ...props
}: HTMLMotionProps<"button">) {
  return (
    <motion.button
      type="button"
      className={`game-button ${className}`}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={UI_TRANSITION}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function SoundButton({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: () => void;
}) {
  return (
    <GameButton
      className="icon-button secondary"
      onClick={onToggle}
      aria-label={muted ? "Activar sonido" : "Silenciar"}
      aria-pressed={muted}
    >
      {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
    </GameButton>
  );
}

export function CoinBadge({ value }: { value: number }) {
  return (
    <span className="badge coins" aria-label={`${value} monedas`}>
      <Coins aria-hidden="true" size={19} />
      {value.toLocaleString()}
    </span>
  );
}

export function Lives({
  count,
  shield = false,
}: {
  count: number;
  shield?: boolean;
}) {
  return (
    <span
      className="lives"
      role="img"
      aria-label={`${count} vidas${shield ? ", escudo activo" : ""}`}
    >
      {[0, 1, 2].map((i) => (
        <Heart
          key={i}
          size={20}
          aria-hidden="true"
          fill={i < count ? "currentColor" : "none"}
          className={i < count ? "" : "spent-life"}
        />
      ))}
      {shield && <Shield aria-hidden="true" size={20} />}
    </span>
  );
}

export function BrandMark() {
  return (
    <img
      className="brand-mark"
      src={`${import.meta.env.BASE_URL}che-sabe.svg`}
      width="80"
      height="80"
      alt=""
      aria-hidden="true"
    />
  );
}
