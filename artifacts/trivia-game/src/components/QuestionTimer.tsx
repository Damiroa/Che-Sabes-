import { useEffect, useRef, useState } from "react";
import { CircularTimer } from "./CircularTimer";
import { audio } from "../utils/audio";

interface Props {
  questionId: number;
  seconds: number;
  paused: boolean;
  muted: boolean;
  onExpire: () => void;
}
// Countdown renders stay inside this component, so answer buttons never rerender on a tick.
export function QuestionTimer({
  questionId,
  seconds,
  paused,
  muted,
  onExpire,
}: Props) {
  const [remaining, setRemaining] = useState(seconds);
  const latest = useRef({ muted, onExpire });
  latest.current = { muted, onExpire };
  useEffect(() => {
    if (paused) return;
    const deadline = Date.now() + seconds * 1000;
    let previous = seconds;
    let expired = false;
    setRemaining(seconds);
    const tick = () => {
      if (expired) return;
      const next = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      if (next === previous) return;
      previous = next;
      setRemaining(next);
      if (next === 0) {
        expired = true;
        latest.current.onExpire();
      } else if (!latest.current.muted) {
        if (next <= 4) audio.urgentTick();
        else if (next <= 8) audio.tick();
      }
    };
    const timer = setInterval(tick, 250);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [questionId, seconds, paused]);
  return <CircularTimer timeLeft={remaining} total={seconds} />;
}
