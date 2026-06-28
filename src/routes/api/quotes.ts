import { createFileRoute } from "@tanstack/react-router";

const SYMBOLS = [
  "BAC", "WFC", "JPM", "GS", "GM", "BA", "PEP", "HSBC", "KO", "PIPR",
];

type Quote = {
  symbol: string;
  price: number;
  change: number;
  changePct: number;
};

async function fetchOne(symbol: string): Promise<Quote | null> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as any;
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta) return null;
    const price = Number(meta.regularMarketPrice);
    const prev = Number(meta.chartPreviousClose ?? meta.previousClose);
    if (!isFinite(price) || !isFinite(prev) || prev === 0) return null;
    const change = price - prev;
    return {
      symbol,
      price: +price.toFixed(2),
      change: +change.toFixed(2),
      changePct: +((change / prev) * 100).toFixed(2),
    };
  } catch {
    return null;
  }
}

// 60s in-memory cache (per worker isolate)
let cache: { ts: number; data: Quote[] } | null = null;
const TTL_MS = 60_000;

export const Route = createFileRoute("/api/quotes")({
  server: {
    handlers: {
      GET: async () => {
        if (cache && Date.now() - cache.ts < TTL_MS) {
          return Response.json(
            { quotes: cache.data, cached: true },
            { headers: { "cache-control": "public, max-age=60" } },
          );
        }
        const results = await Promise.all(SYMBOLS.map(fetchOne));
        const quotes = results.filter((q): q is Quote => q !== null);
        if (quotes.length > 0) cache = { ts: Date.now(), data: quotes };
        return Response.json(
          { quotes, cached: false },
          { headers: { "cache-control": "public, max-age=60" } },
        );
      },
    },
  },
});
