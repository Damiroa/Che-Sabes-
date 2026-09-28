const R = 27;
const C = 2 * Math.PI * R;
export function CircularTimer({
  timeLeft,
  total,
}: {
  timeLeft: number;
  total: number;
}) {
  const urgent = timeLeft <= 4;
  return (
    <div
      className={`circular-timer${urgent ? " urgent" : ""}`}
      role="timer"
      aria-label={`Tiempo restante: ${timeLeft} segundos`}
    >
      <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          className="timer-track"
          strokeWidth="5"
        />
        <circle
          cx="32"
          cy="32"
          r={R}
          fill="none"
          className="timer-ring"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - timeLeft / total)}
        />
      </svg>
      <span aria-hidden="true">{timeLeft}</span>
    </div>
  );
}
