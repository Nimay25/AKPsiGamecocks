import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";

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

  return (
    <section
      id="brothers-at-work"
      aria-label="Brothers at Work — live market ticker for AKPSI employers"
      className="relative bg-black text-white"
    >
      {/* Ticker bar */}
      <div
        className="relative overflow-hidden bg-black border-y border-[#ff3b3b]/50"
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


      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28 text-center">
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

        <div className="mt-12">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
            Brothers also at
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2">
            {PRIVATE_EMPLOYERS.map((name) => (
              <li
                key={name}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs sm:text-sm text-white/80"
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
    </section>
  );
}
