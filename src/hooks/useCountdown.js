import { useEffect, useState } from 'react';

export function useCountdown(startedAt, durationSec) {
  const [left, setLeft] = useState(durationSec || 0);
  useEffect(() => {
    if (!startedAt || !durationSec) return;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      setLeft(Math.max(0, durationSec - elapsed));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt, durationSec]);
  return left;
}
