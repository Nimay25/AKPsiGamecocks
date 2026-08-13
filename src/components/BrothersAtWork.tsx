import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";
import logosSheet from "@/assets/employer-logos.png.asset.json";

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

const PRIVATE_EMPLOYERS = [
  "EY",
  "PwC",
  "Chick-fil-A",
  "Special Olympics",
  "FCC",
  "Fifth Circuit Solicitor's Office",
  "Richland County",
  "Kershaw County",
];

const PLACEHOLDER_SYMBOLS = [
  "BAC", "WFC", "JPM", "GS", "GM", "BA", "KO", "HSBC", "PIPR",
  "MSFT", "BLK", "XOM", "ALLY", "CFG", "JEF", "D", "LRLCY",
];

// Logo sheet is a 3-col × 5-row grid of transparent PNG logos.
// col: 0 = left, 1 = center, 2 = right   |   row: 0 = top → 4 = bottom
type LogoCell = { col: 0 | 1 | 2; row: 0 | 1 | 2 | 3 | 4; label: string };

const LEFT_LOGOS: LogoCell[] = [
  { col: 0, row: 0, label: "EY" },
  { col: 0, row: 1, label: "General Motors" },
  { col: 0, row: 2, label: "Chick-fil-A" },
  { col: 0, row: 3, label: "FCC" },
  { col: 0, row: 4, label: "Special Olympics" },
];

const RIGHT_LOGOS: LogoCell[] = [
  { col: 2, row: 0, label: "Wells Fargo" },
  { col: 2, row: 1, label: "Goldman Sachs" },
  { col: 2, row: 2, label: "Coca-Cola" },
  { col: 2, row: 3, label: "HSBC" },
  { col: 2, row: 4, label: "Boeing" },
];

// Drifting logo tile. `depth` controls how strongly it reacts to the cursor.
function LogoTile({
  cell,
  depth,
  delay,
  duration,
  pointer,
}: {
  cell: LogoCell;
  depth: number;
  delay: number;
  duration: number;
  pointer: { x: number; y: number };
}) {
  return (
    <div
      className="baw-float group pointer-events-auto"
      style={{
        animation: `baw-float ${duration}s ease-in-out ${delay}s infinite`,
        willChange: "transform",
      }}
    >
      <div
        role="img"
        aria-label={cell.label}
        className="h-16 w-28 sm:h-20 sm:w-36 lg:h-24 lg:w-44 opacity-70 transition-all duration-500 ease-out hover:opacity-100 hover:scale-110"
        style={{
          backgroundImage: `url(${logosSheet.url})`,
          backgroundSize: "300% 500%",
          backgroundPosition: `${cell.col * 50}% ${cell.row * 25}%`,
          backgroundRepeat: "no-repeat",
          transform: `translate3d(${pointer.x * depth}px, ${pointer.y * depth}px, 0)`,
          filter: "drop-shadow(0 10px 26px rgba(0,0,0,0.6))",
        }}
      />
    </div>
  );
}

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

  // Cursor parallax: normalized -1..1 offsets, smoothed via CSS transitions.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPointer({
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      });
    };
    const onLeave = () => setPointer({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const renderRail = (cells: LogoCell[], side: "l" | "r") => (
    <div
      className={`pointer-events-none absolute inset-y-0 ${
        side === "l" ? "left-0 pl-4 lg:pl-10" : "right-0 pr-4 lg:pr-10"
      } hidden md:flex flex-col items-center justify-around py-10 z-10`}
    >
      {cells.map((cell, i) => (
        <LogoTile
          key={`${side}-${cell.label}`}
          cell={cell}
          depth={8 + ((i * 5) % 14)}
          delay={i * 1.3 + (side === "r" ? 0.7 : 0)}
          duration={11 + i * 1.7}
          pointer={pointer}
        />
      ))}
    </div>
  );

  return (
    <section
      id="brothers-at-work"
      aria-label="Brothers at Work — live market ticker for AKPSI employers"
      className="relative bg-black text-white"
    >
      {/* Ticker bar */}
      <TickerBar rail={rail ?? placeholderRail} />

      {/* Floating logo field + centered content */}
      <div ref={wrapRef} className="relative min-h-[85svh] overflow-hidden">
        {renderRail(LEFT_LOGOS, "l")}
        {renderRail(RIGHT_LOGOS, "r")}

        <div className="relative z-0 flex min-h-[85svh] items-center justify-center px-6 py-24">
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

            <div className="mt-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                Brothers also at
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2">
                {PRIVATE_EMPLOYERS.map((name) => (
                  <li
                    key={name}
                    className="cursor-default rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs sm:text-sm text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ffc857] hover:bg-[#ffc857]/15 hover:text-[#ffc857] hover:shadow-[0_0_20px_rgba(255,200,87,0.45)]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {loading && (
              <div className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Connecting to markets…
              </div>
            )}
          </div>
        </div>

        {/* Mobile: compact drifting strip below content */}
        <div className="md:hidden absolute inset-x-0 bottom-4 flex justify-center gap-3 px-4">
          {[...LEFT_LOGOS.slice(0, 3), ...RIGHT_LOGOS.slice(0, 3)].map((cell, i) => (
            <LogoTile
              key={`m-${cell.label}`}
              cell={cell}
              depth={0}
              delay={i * 0.9}
              duration={12 + i}
              pointer={{ x: 0, y: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
