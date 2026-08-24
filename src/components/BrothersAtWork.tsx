import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";
import { useTickerAnimation } from "@/hooks/useTickerAnimation";
import { EmployerLogoWall, EmployerLogoOrbit } from "@/components/EmployerLogoWall";

const PLACEHOLDER_SYMBOLS = [
  "BAC", "WFC", "JPM", "GS", "GM", "BA", "KO", "HSBC", "PIPR",
  "MSFT", "BLK", "XOM", "ALLY", "CFG", "JEF", "D", "LRLCY",
  "AAPL", "AMZN", "PEP",
];

function QuotePill({ q }: { q: LiveQuote }) {
  const up = q.change > 0;
  const flat = q.change === 0;
  const Arrow = flat ? Minus : up ? ArrowUp : ArrowDown;
  const tone = flat ? "text-white/55" : up ? "led-glow-up" : "led-glow-down";
  return (
    <div className="flex items-center gap-3 px-6 led-text text-sm sm:text-base">
      <span className="font-semibold text-white">{q.symbol}</span>
      <span className="text-white/55">{q.name}</span>
      <span className="text-white/90">${q.price.toFixed(2)}</span>
      <span className={`flex items-center gap-1 ${tone}`}>
        <Arrow className="h-3.5 w-3.5" strokeWidth={3} />
        {up ? "+" : ""}{q.change.toFixed(2)} ({up ? "+" : ""}{q.changePct.toFixed(2)}%)
      </span>
      <span className="text-white/25">•</span>
    </div>
  );
}

function PlaceholderPill({ symbol }: { symbol: string }) {
  return (
    <div className="flex items-center gap-3 px-6 led-text text-sm sm:text-base">
      <span className="font-semibold text-white">{symbol}</span>
      <span className="animate-pulse text-white/55">— — —</span>
      <span className="text-white/25">•</span>
    </div>
  );
}

function TickerBar({ rail }: { rail: (LiveQuote | string)[] }) {
  const { ref, style } = useTickerAnimation(true);
  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        background: "#08090b",
      }}
    >
      <div
        ref={ref}
        className="flex items-center py-3.5 whitespace-nowrap w-max"
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
      className="market-light relative"
    >
      {/* Ticker bar */}
      <TickerBar rail={rail ?? placeholderRail} />

      {/* Floating logo rails + centered content */}
      <div className="relative min-h-[92svh] overflow-hidden py-20 sm:py-24">
        <EmployerLogoOrbit />

        <div className="relative z-10 flex min-h-[70svh] items-center px-6">
          <div className="relative mx-auto max-w-3xl text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-y-[35%] -inset-x-[45%] -z-10"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--market-bg) 72%, transparent) 30%, color-mix(in oklab, var(--market-bg) 32%, transparent) 62%, transparent 100%)",
              }}
            />

            <p className="led-text text-xs sm:text-sm uppercase tracking-[0.4em] market-muted">
              ● LIVE · POWERED BY REAL DATA
              {!marketOpen && (
                <span
                  className="ml-3 rounded-sm px-2 py-0.5 text-[10px] tracking-widest market-muted"
                  style={{ border: "1px solid var(--market-line)" }}
                >
                  MARKET CLOSED
                </span>
              )}
            </p>
            <h2 className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none market-ink">
              <span className="whitespace-nowrap">
                BROTHERS <span style={{ color: "var(--gold)" }}>@</span>{" "}
                <span style={{ color: "var(--gold)" }}>WORK</span>
              </span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg market-muted">
              Real-time markets. Real Carolina AKΨ placements.
            </p>

            {loading && (
              <div className="mt-8 text-[10px] uppercase tracking-[0.3em] market-muted">
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
