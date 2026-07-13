## Redo "Brothers @ Work" section

Replace the current scroll-driven cinematic section with a simple, static black-background layout.

### Changes to `src/components/BrothersAtWork.tsx`
- Remove the trading floor background image, all `useScroll`/`useTransform`/`motion` scroll animations, the aspect-locked stage, the welded LED band geometry, and the vignette overlay.
- Remove the `tradingFloor` asset import.
- New layout (single non-sticky section, black background):
  1. **Stock ticker at the top** — a horizontal red-bordered black bar spanning full width, using the same `useLiveQuotes` data and `QuotePill` styling already in the file. Marquee animation kept, but sped up (swap `animate-ticker-fast` for a faster inline animation or a new/faster utility).
  2. **Below the ticker** — the existing content shown plainly, centered, with normal padding:
     - "● LIVE · POWERED BY LIVE DATA" (+ MARKET CLOSED badge when applicable)
     - `BROTHERS @ WORK` headline
     - "Real-time markets. Real Carolina AKΨ placements." subhead
     - "Brothers also at" pill list (`PRIVATE_EMPLOYERS`)
- No scroll-linked transforms, no clip-path reveal, no falling ticker, no reduced-motion branching for scroll effects (marquee still respects reduced motion via CSS if configured).

### Speed
- Ticker marquee runs noticeably faster than current `animate-ticker-fast`. If no faster utility exists in `styles.css`, add a `.animate-ticker-fastest` keyframe (or shorten the existing duration).

### Not changed
- `src/hooks/useLiveQuotes.ts`, `src/routes/api/quotes.ts`, `src/components/StockTicker.tsx` (site-wide bottom ticker) — untouched.
- Symbol list stays the same.

### Result
Simple page: fast stock ticker bar at top on black, static headline + employer pills below. No image, no scroll choreography.
