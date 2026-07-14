import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";
import logosSheet from "@/assets/employer-logos.png.asset.json";

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

function LogoTile({ cell, visible }: { cell: LogoCell; visible: boolean }) {
  return (
    <div
      role="img"
      aria-label={cell.label}
      className="h-20 w-36 sm:h-24 sm:w-44 lg:h-28 lg:w-52 transition-all duration-700 ease-out"
      style={{
        backgroundImage: `url(${logosSheet.url})`,
        backgroundSize: "300% 500%",
        backgroundPosition: `${cell.col * 50}% ${cell.row * 25}%`,
        backgroundRepeat: "no-repeat",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.92)",
        filter: visible ? "drop-shadow(0 8px 22px rgba(0,0,0,0.55))" : "none",
      }}
    />
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

export function BrothersAtWork() {
  const { quotes, loading } = useLiveQuotes();
  const marketOpen = isUSMarketOpen();

  const rail = quotes.length > 0 ? [...quotes, ...quotes] : null;
  const placeholderRail = [...PLACEHOLDER_SYMBOLS, ...PLACEHOLDER_SYMBOLS];

  // Scroll progress across the whole tall section (0 → 1)
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setP(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Each logo reveals across a slice of scroll progress, bottom → top.
  // 5 logos per side. Reveal window: 10% → 75% of scroll.
  const revealAt = (indexFromBottom: number) => {
    const start = 0.1;
    const end = 0.75;
    const step = (end - start) / 5;
    const trigger = start + indexFromBottom * step;
    return p >= trigger;
  };

  return (
    <section
      ref={wrapRef}
      id="brothers-at-work"
      aria-label="Brothers at Work — live market ticker for AKPSI employers"
      className="relative bg-black text-white"
      style={{ height: "220vh" }}
    >
      {/* Sticky viewport — ticker sits at top; content pins for the scroll duration */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col">
        {/* Ticker bar */}
        <div
          className="relative overflow-hidden bg-black border-y border-[#ff3b3b]/50 shrink-0"
          style={{ boxShadow: "0 0 60px rgba(255,60,60,0.35), inset 0 0 60px rgba(255,60,60,0.25)" }}
        >
          <div className="flex items-center py-4 whitespace-nowrap animate-baw-ticker w-max">
            {(rail ?? placeholderRail).map((item, i) =>
              typeof item === "string" ? (
                <PlaceholderPill key={`p-${i}`} symbol={item} />
              ) : (
                <QuotePill key={`o-${item.symbol}-${i}`} q={item} />
              ),
            )}
          </div>
        </div>

        {/* Stage: side logo rails + centered content */}
        <div className="relative flex-1 min-h-0">
          {/* Left rail — bottom → top reveal */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden md:flex flex-col-reverse items-center justify-around py-8 pl-4 lg:pl-8 z-10">
            {LEFT_LOGOS.map((cell, i) => (
              <LogoTile key={`l-${cell.label}`} cell={cell} visible={revealAt(i)} />
            ))}
          </div>

          {/* Right rail — bottom → top reveal */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden md:flex flex-col-reverse items-center justify-around py-8 pr-4 lg:pr-8 z-10">
            {RIGHT_LOGOS.map((cell, i) => (
              <LogoTile key={`r-${cell.label}`} cell={cell} visible={revealAt(i)} />
            ))}
          </div>

          {/* Centered content */}
          <div className="relative z-0 h-full flex items-center justify-center px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="led-text text-xs sm:text-sm uppercase tracking-[0.4em] led-glow-amber">
                ● LIVE · POWERED BY REAL DATA
                {!marketOpen && (
                  <span className="ml-3 rounded-sm border border-white/30 px-2 py-0.5 text-[10px] tracking-widest text-white/70">
                    MARKET CLOSED
                  </span>
                )}
              </p>
              <h2 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-medium leading-none">
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

          {/* Mobile fallback: show logos in a compact grid below content */}
          <div className="md:hidden absolute inset-x-0 bottom-4 flex justify-center gap-2 px-4 opacity-90">
            {[...LEFT_LOGOS.slice(0, 3), ...RIGHT_LOGOS.slice(0, 3)].map((cell, i) => (
              <LogoTile key={`m-${cell.label}`} cell={cell} visible={p > 0.2 + i * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
