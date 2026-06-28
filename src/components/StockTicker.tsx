import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

// Companies where Beta Upsilon brothers work
const COMPANIES = [
  { symbol: "EY",   name: "Ernst & Young", private: true },
  { symbol: "BAC",  name: "Bank of America" },
  { symbol: "WFC",  name: "Wells Fargo" },
  { symbol: "JPM",  name: "JPMorgan Chase" },
  { symbol: "GS",   name: "Goldman Sachs" },
  { symbol: "PWC",  name: "PwC", private: true },
  { symbol: "GM",   name: "General Motors" },
  { symbol: "BA",   name: "Boeing" },
  { symbol: "PEP",  name: "PepsiCo" },
  { symbol: "HSBC", name: "HSBC" },
  { symbol: "CFA",  name: "Chick-fil-A", private: true },
  { symbol: "KO",   name: "Coca-Cola" },
  { symbol: "PIPR", name: "Piper Sandler" },
];

type Quote = { symbol: string; name: string; price: number; change: number; changePct: number };

// Seed pseudo prices so we always have something. Try to hydrate from a free API.
function seedQuote(c: { symbol: string; name: string }): Quote {
  // Fully deterministic so SSR + client match (no hydration mismatch)
  const seed = [...c.symbol].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  const price = 50 + (seed % 350) + (seed % 17) * 0.31;
  const change = ((seed % 13) - 6) * 0.42;
  return {
    symbol: c.symbol,
    name: c.name,
    price: +price.toFixed(2),
    change: +change.toFixed(2),
    changePct: +((change / price) * 100).toFixed(2),
  };
}

export function StockTicker() {
  const [quotes, setQuotes] = useState<Quote[]>(() => COMPANIES.map(seedQuote));

  useEffect(() => {
    // Try Stooq (free, no auth, CORS-friendly CSV). Fallback to seeded prices.
    const fetchOne = async (c: typeof COMPANIES[number]): Promise<Quote | null> => {
      if (c.private) return null;
      try {
        const res = await fetch(`https://stooq.com/q/l/?s=${c.symbol.toLowerCase()}.us&f=sd2t2ohlcv&h&e=csv`);
        if (!res.ok) return null;
        const text = await res.text();
        const rows = text.trim().split("\n");
        if (rows.length < 2) return null;
        const cells = rows[1].split(",");
        // Symbol,Date,Time,Open,High,Low,Close,Volume
        const open = parseFloat(cells[3]);
        const close = parseFloat(cells[6]);
        if (!isFinite(close) || !isFinite(open)) return null;
        const change = +(close - open).toFixed(2);
        return {
          symbol: c.symbol,
          name: c.name,
          price: +close.toFixed(2),
          change,
          changePct: +((change / open) * 100).toFixed(2),
        };
      } catch {
        return null;
      }
    };

    (async () => {
      const results = await Promise.all(COMPANIES.map(fetchOne));
      setQuotes((prev) =>
        prev.map((q, i) => results[i] ?? q)
      );
    })();
  }, []);

  // duplicate list so the marquee can loop seamlessly
  const loop = [...quotes, ...quotes];

  return (
    <div className="relative overflow-hidden border-y border-[var(--gold)]/30 bg-[var(--ink)] text-[var(--cream)]">
      <div className="absolute left-0 top-0 z-10 flex h-full items-center gap-2 bg-[var(--gold)] px-4 text-xs font-bold uppercase tracking-widest text-[var(--navy)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--navy)]" />
        Brothers @ Work
      </div>
      <div className="flex animate-ticker whitespace-nowrap py-3 pl-56">
        {loop.map((q, i) => {
          const up = q.change >= 0;
          return (
            <div key={`${q.symbol}-${i}`} className="flex items-center gap-3 px-6 text-sm">
              <span className="font-mono font-semibold text-[var(--gold)]">{q.symbol}</span>
              <span className="text-[var(--cream)]/70">{q.name}</span>
              <span className="font-mono">${q.price.toFixed(2)}</span>
              <span className={`flex items-center gap-1 font-mono ${up ? "text-emerald-400" : "text-rose-400"}`}>
                {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
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
