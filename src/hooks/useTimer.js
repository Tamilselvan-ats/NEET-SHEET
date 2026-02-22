import { useEffect, useState } from 'react';

export default function useTimer({ enabled, startTime, minutes }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    if (!enabled || !startTime) return;

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSecondsLeft(Math.max(0, minutes * 60 - elapsed));
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [enabled, startTime, minutes]);

  return secondsLeft;
}
