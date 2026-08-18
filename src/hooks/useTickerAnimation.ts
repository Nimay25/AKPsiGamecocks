import { useEffect, useRef, useState } from "react";

const TICKER_SPEED_PX_PER_SEC = 140;

export function useTickerAnimation(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ transform?: string }>({});
  const startRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const widthRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      // Content is duplicated, so the seamless loop point is half the scroll width.
      widthRef.current = el.scrollWidth / 2;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    startRef.current = performance.now() - offsetRef.current;

    const tick = (now: number) => {
      if (!widthRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startRef.current;
      const loopDistance = widthRef.current;
      const loopDurationMs = (loopDistance / TICKER_SPEED_PX_PER_SEC) * 1000;
      const progress = (elapsed % loopDurationMs) / loopDurationMs;
      const x = -progress * loopDistance;
      offsetRef.current = elapsed % loopDurationMs;
      setStyle({ transform: `translate3d(${x}px, 0, 0)` });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        startRef.current = performance.now() - offsetRef.current;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  return { ref, style };
}
