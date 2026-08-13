import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";
import { EmployerLogoWall, EmployerLogoRail } from "@/components/EmployerLogoWall";

const TICKER_SPEED_PX_PER_SEC = 140;

function useTickerAnimation(enabled: boolean) {
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

const PLACEHOLDER_SYMBOLS = [
  "BAC", "WFC", "JPM", "GS", "GM", "BA", "KO", "HSBC", "PIPR",
  "MSFT", "BLK", "XOM", "ALLY", "CFG", "JEF", "D", "LRLCY",
];

function QuotePill({ q }: { q: LiveQuote }) {
  const up = q.change > 0;
  const flat = q.change === 0;
  const Arrow = flat ? Minus : up ? ArrowUp : ArrowDown;
  const tone = flat ? "led-glow-amber" : up ? "led-glow-up" : "led-glow-down";
  return (
    <div className="flex items-center gap-3 px-6 led-text text-base sm:text-lg">
      <span className="led-glow-amber font-semibold">{q.symbol}</span>
      <span className="text-white/55 text-sm sm:text-base">{q.name}</span>
      <span className="text-white">${q.price.toFixed(2)}</span>
      <span className={`flex items-center gap-1 ${tone}`}>
        <Arrow className="h-3.5 w-3.5" strokeWidth={3} />
        {up ? "+" : ""}{q.change.toFixed(2)} ({up ? "+" : ""}{q.changePct.toFixed(2)}%)
      </span>
      <span className="text-white/20">•</span>
    </div>
  );
}

function PlaceholderPill({ symbol }: { symbol: string }) {
  return (
    <div className="flex items-center gap-3 px-6 led-text text-base sm:text-lg">
      <span className="led-glow-amber font-semibold">{symbol}</span>
      <span className="text-white/40 animate-pulse">— — —</span>
      <span className="text-white/20">•</span>
    </div>
  );
}

function TickerBar({ rail }: { rail: (LiveQuote | string)[] }) {
  const { ref, style } = useTickerAnimation(true);
  return (
    <div
      className="relative overflow-hidden bg-black border-y border-[#ff3b3b]/50"
      style={{ boxShadow: "0 0 60px rgba(255,60,60,0.35), inset 0 0 60px rgba(255,60,60,0.25)" }}
    >
      <div
        ref={ref}
        className="flex items-center py-4 whitespace-nowrap w-max"
        style={{
          ...style,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {rail.map((item, i) =>
          typeof item === "string" ? (
            <PlaceholderPill key={`p-${i}`} symbol={item} />
          ) : (
            <QuotePill key={`o-${item.symbol}-${i}`} q={item} />
          ),
        )}
      </div>
    </div>
  );
}

export function BrothersAtWork() {
  const { quotes, loading } = useLiveQuotes();
  const marketOpen = isUSMarketOpen();

  const rail = quotes.length > 0 ? [...quotes, ...quotes] : null;
  const placeholderRail = [...PLACEHOLDER_SYMBOLS, ...PLACEHOLDER_SYMBOLS];

  return (
    <section
      id="brothers-at-work"
      aria-label="Brothers at Work — live market ticker for AKPSI employers"
      className="relative bg-black text-white"
    >
      {/* Ticker bar */}
      <TickerBar rail={rail ?? placeholderRail} />

      {/* Floating logo rails + centered content */}
      <div className="relative min-h-[92svh] overflow-hidden py-20 sm:py-24">
        <EmployerLogoRail side="left" />
        <EmployerLogoRail side="right" />

        <div className="relative z-0 flex min-h-[70svh] items-center px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="led-text text-xs sm:text-sm uppercase tracking-[0.4em] led-glow-amber">
              ● LIVE · POWERED BY REAL DATA
              {!marketOpen && (
                <span className="ml-3 rounded-sm border border-white/30 px-2 py-0.5 text-[10px] tracking-widest text-white/70">
                  MARKET CLOSED
                </span>
              )}
            </p>
            <h2 className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
              BROTHERS <span className="led-glow-amber">@</span> WORK
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/65">
              Real-time markets. Real Carolina AKΨ placements.
            </p>

            {loading && (
              <div className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Connecting to markets…
              </div>
            )}
          </div>
        </div>

        <EmployerLogoWall />
      </div>

    </section>
  );
}
