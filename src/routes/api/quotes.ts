import { createFileRoute } from "@tanstack/react-router";

// Public-traded employers only. Private firms (EY, PwC, Chick-fil-A,
// Special Olympics, gov/judicial roles) are handled separately as a
// static "Brothers also at:" strip in the UI.
const SYMBOLS: { symbol: string; name: string }[] = [
  { symbol: "BAC",  name: "Bank of America" },
  { symbol: "WFC",  name: "Wells Fargo" },
  { symbol: "JPM",  name: "JPMorgan Chase" },
  { symbol: "GS",   name: "Goldman Sachs" },
  { symbol: "GM",   name: "General Motors" },
  { symbol: "BA",   name: "Boeing" },
  { symbol: "KO",   name: "Coca-Cola" },
  { symbol: "HSBC", name: "HSBC" },
  { symbol: "PIPR", name: "Piper Sandler" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "BLK",  name: "BlackRock" },
  { symbol: "XOM",  name: "ExxonMobil" },
  { symbol: "ALLY", name: "Ally Financial" },
  { symbol: "CFG",  name: "Citizens Financial" },
  { symbol: "JEF",  name: "Jefferies" },
  { symbol: "D",    name: "Dominion Energy" },
  { symbol: "LRLCY", name: "L'Oréal" },
];

type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  prevClose: number;
  ts: number;
};

async function fetchOne(
  entry: { symbol: string; name: string },
  token: string,
): Promise<Quote | null> {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${entry.symbol}&token=${token}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;
    const j = (await res.json()) as {
      c?: number; d?: number; dp?: number; pc?: number; t?: number;
    };
    const price = Number(j.c);
    if (!isFinite(price) || price === 0) return null;
    const change = Number(j.d ?? 0);
    const changePct = Number(j.dp ?? 0);
    const prevClose = Number(j.pc ?? price - change);
    return {
      symbol: entry.symbol,
      name: entry.name,
      price: +price.toFixed(2),
      change: +change.toFixed(2),
      changePct: +changePct.toFixed(2),
      prevClose: +prevClose.toFixed(2),
      ts: (j.t ?? Math.floor(Date.now() / 1000)) * 1000,
    };
  } catch {
    return null;
  }
}

// In-memory cache per worker isolate.
// 25s matches the client's poll cadence and stays inside Finnhub's 60/min free tier.
let cache: { ts: number; data: Quote[] } | null = null;
const TTL_MS = 25_000;

export const Route = createFileRoute("/api/quotes")({
  server: {
    handlers: {
      GET: async () => {
        const token = process.env.FINNHUB_API_KEY;
        if (!token) {
          return Response.json(
            { quotes: cache?.data ?? [], error: "missing_token" },
            { status: 500 },
          );
        }
        if (cache && Date.now() - cache.ts < TTL_MS) {
          return Response.json(
            { quotes: cache.data, cached: true, fetchedAt: cache.ts },
            { headers: { "cache-control": "public, max-age=25" } },
          );
        }
        const results = await Promise.all(
          SYMBOLS.map((s) => fetchOne(s, token)),
        );
        const quotes = results.filter((q): q is Quote => q !== null);
        // Only refresh the cache if we got something — otherwise hold last good values.
        if (quotes.length > 0) cache = { ts: Date.now(), data: quotes };
        return Response.json(
          {
            quotes: quotes.length > 0 ? quotes : (cache?.data ?? []),
            cached: false,
            fetchedAt: cache?.ts ?? Date.now(),
          },
          { headers: { "cache-control": "public, max-age=25" } },
        );
      },
    },
  },
});
