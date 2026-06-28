import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";

// Slim, always-on site-wide ticker. Public companies only — feeds from the
// same shared `useLiveQuotes` source as the Brothers @ Work hero section,
// so the two never disagree. Private/non-profit employers are shown in the
// hero section's "Brothers also at" strip, never here.

type Placeholder = { kind: "placeholder"; symbol: string; name: string };
type Real = { kind: "real" } & LiveQuote;

const PLACEHOLDERS: Placeholder[] = [
  { kind: "placeholder", symbol: "BAC",   name: "Bank of America" },
  { kind: "placeholder", symbol: "WFC",   name: "Wells Fargo" },
  { kind: "placeholder", symbol: "JPM",   name: "JPMorgan Chase" },
  { kind: "placeholder", symbol: "GS",    name: "Goldman Sachs" },
  { kind: "placeholder", symbol: "MSFT",  name: "Microsoft" },
  { kind: "placeholder", symbol: "BLK",   name: "BlackRock" },
  { kind: "placeholder", symbol: "XOM",   name: "Exxon Mobil" },
  { kind: "placeholder", symbol: "ALLY",  name: "Ally Financial" },
  { kind: "placeholder", symbol: "CFG",   name: "Citizens Financial" },
  { kind: "placeholder", symbol: "JEF",   name: "Jefferies" },
  { kind: "placeholder", symbol: "D",     name: "Dominion Energy" },
  { kind: "placeholder", symbol: "OR.PA", name: "L'Oréal" },
  { kind: "placeholder", symbol: "BA",    name: "Boeing" },
  { kind: "placeholder", symbol: "GM",    name: "General Motors" },
  { kind: "placeholder", symbol: "KO",    name: "Coca-Cola" },
  { kind: "placeholder", symbol: "HSBC",  name: "HSBC" },
  { kind: "placeholder", symbol: "PIPR",  name: "Piper Sandler" },
];

export function StockTicker() {
  const { quotes } = useLiveQuotes();
  const marketOpen = isUSMarketOpen();

  const real: Real[] = quotes.map((q) => ({ kind: "real", ...q }));
  const loop: (Real | Placeholder)[] =
    real.length > 0 ? [...real, ...real] : [...PLACEHOLDERS, ...PLACEHOLDERS];

  return (
    <div className="relative overflow-hidden border-y border-[var(--gold)]/30 bg-[var(--ink)] text-[var(--cream)]">
      <div className="absolute left-0 top-0 z-10 flex h-full items-center gap-2 bg-[var(--gold)] px-4 text-xs font-bold uppercase tracking-widest text-[var(--navy)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--navy)]" />
        Brothers @ Work
        {!marketOpen && (
          <span className="ml-2 hidden sm:inline rounded-sm border border-[var(--navy)]/30 px-1.5 py-0.5 text-[9px] tracking-widest">
            CLOSED
          </span>
        )}
      </div>
      <div className="flex animate-ticker-fast whitespace-nowrap py-3 pl-56">
        {loop.map((q, i) => {
          if (q.kind === "placeholder") {
            return (
              <div key={`p-${q.symbol}-${i}`} className="flex items-center gap-3 px-6 text-sm led-text">
                <span className="font-semibold text-[var(--gold)]">{q.symbol}</span>
                <span className="text-[var(--cream)]/60">{q.name}</span>
                <span className="text-[var(--cream)]/40 animate-pulse">— — —</span>
                <span className="text-[var(--gold)]/40">•</span>
              </div>
            );
          }
          const up = q.change > 0;
          const flat = q.change === 0;
          const Arrow = flat ? Minus : up ? ArrowUp : ArrowDown;
          return (
            <div key={`${q.symbol}-${i}`} className="flex items-center gap-3 px-6 text-sm led-text">
              <span className="font-semibold text-[var(--gold)]">{q.symbol}</span>
              <span className="text-[var(--cream)]/70">{q.name}</span>
              <span>${q.price.toFixed(2)}</span>
              <span
                className={`flex items-center gap-1 ${
                  flat ? "text-amber-300" : up ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                <Arrow className="h-3.5 w-3.5" strokeWidth={3} />
                {up ? "+" : ""}{q.change.toFixed(2)} ({up ? "+" : ""}{q.changePct.toFixed(2)}%)
              </span>
              <span className="text-[var(--gold)]/40">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
