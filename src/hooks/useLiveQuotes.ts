import { useEffect, useRef, useState } from "react";

import { FINNHUB_PUBLIC_KEY, TICKER_SYMBOLS } from "@/lib/marketConfig";


export type LiveQuote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  prevClose: number;
  ts: number;
};

type QuotesResponse = {
  quotes: LiveQuote[];
  fetchedAt?: number;
  cached?: boolean;
};

// Module-level cache so every consumer (top hero section + bottom ticker)
// shares the same data and a single poll interval.
let cache: { quotes: LiveQuote[]; fetchedAt: number } | null = null;
let inFlight: Promise<void> | null = null;
const subscribers = new Set<() => void>();
let pollerStarted = false;

const POLL_MS = 25_000;

async function refresh() {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      const res = await fetch("/api/quotes", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as QuotesResponse;
      if (data?.quotes?.length) {
        cache = { quotes: data.quotes, fetchedAt: data.fetchedAt ?? Date.now() };
        subscribers.forEach((fn) => fn());
      }
    } catch {
      /* keep last good cache */
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

function startPoller() {
  if (pollerStarted || typeof window === "undefined") return;
  pollerStarted = true;
  refresh();
  setInterval(() => {
    // Pause polling when tab is hidden to save quota and CPU.
    if (document.visibilityState === "visible") refresh();
  }, POLL_MS);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") refresh();
  });
}

export function useLiveQuotes() {
  const [, setTick] = useState(0);
  const ref = useRef(cache);

  useEffect(() => {
    startPoller();
    const onChange = () => {
      ref.current = cache;
      setTick((t) => t + 1);
    };
    subscribers.add(onChange);
    // sync on mount in case data already arrived
    onChange();
    return () => {
      subscribers.delete(onChange);
    };
  }, []);

  return {
    quotes: ref.current?.quotes ?? [],
    fetchedAt: ref.current?.fetchedAt ?? 0,
    loading: !ref.current,
  };
}

/**
 * Heuristic: NYSE/NASDAQ regular session 9:30–16:00 ET, Mon–Fri.
 * Good enough for a "Market Closed" badge — server-cached quote `ts`
 * still drives accuracy.
 */
export function isUSMarketOpen(now: Date = new Date()): boolean {
  // Build "now" in America/New_York
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hh = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const mm = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  if (wd === "Sat" || wd === "Sun") return false;
  const mins = hh * 60 + mm;
  return mins >= 9 * 60 + 30 && mins < 16 * 60;
}
