// Publishable Finnhub quote key. Finnhub quote endpoints are read-only and
// rate-limited per key, so this is safe to ship in the client bundle. It lets
// the ticker work on hosts (e.g. Vercel) where the /api/quotes server route
// isn't available.
export const FINNHUB_PUBLIC_KEY = "d908u71r01qk8bfjnso0d908u71r01qk8bfjnsog";

export const TICKER_SYMBOLS: { symbol: string; name: string }[] = [
  { symbol: "BAC", name: "Bank of America" },
  { symbol: "GM", name: "General Motors" },
  { symbol: "LRLCY", name: "L'Or\u00e9al" },
  { symbol: "JPM", name: "JPMorgan Chase" },
  { symbol: "KO", name: "Coca-Cola" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "WFC", name: "Wells Fargo" },
  { symbol: "BA", name: "Boeing" },
  { symbol: "BLK", name: "BlackRock" },
  { symbol: "GS", name: "Goldman Sachs" },
  { symbol: "XOM", name: "ExxonMobil" },
  { symbol: "AAPL", name: "Apple" },
  { symbol: "HSBC", name: "HSBC" },
  { symbol: "NKE", name: "Nike" },
  { symbol: "PIPR", name: "Piper Sandler" },
  { symbol: "DIS", name: "Disney" },
  { symbol: "ALLY", name: "Ally Financial" },
  { symbol: "PEP", name: "PepsiCo" },
  { symbol: "CFG", name: "Citizens Financial" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "JEF", name: "Jefferies" },
  { symbol: "TGT", name: "Target" },
  { symbol: "D", name: "Dominion Energy" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "MS", name: "Morgan Stanley" },
  { symbol: "V", name: "Visa" },
  { symbol: "META", name: "Meta Platforms" },
  { symbol: "F", name: "Ford" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "C", name: "Citigroup" },
  { symbol: "MA", name: "Mastercard" },
  { symbol: "DAL", name: "Delta Air Lines" },
  { symbol: "T", name: "AT&T" },
  { symbol: "PG", name: "Procter & Gamble" },
];
