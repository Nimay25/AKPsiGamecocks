import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import tradingFloor from "@/assets/trading-floor.jpg";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";

// --- Welded position on the building's physical LED ticker band ---
// Measured against the trading-floor photo. Positions are % of the
// aspect-locked stage (which preserves the photo's 1920×1280 ratio).
const LED_BAND_TOP_PCT = 15.38;
const LED_BAND_BOTTOM_PCT = 27.55;
const LED_BAND_LEFT_PCT = -1.64;
const LED_BAND_WIDTH_PCT = 112;
const LED_BAND_ROTATE_DEG = -3.83;
const LED_BAND_HEIGHT_PCT = LED_BAND_BOTTOM_PCT - LED_BAND_TOP_PCT;

// --- Where the ticker lands once it un-rotates / centers ---
const CENTER_TOP_PCT = 32;
const CENTER_LEFT_PCT = -6;
const CENTER_WIDTH_PCT = 112;
const CENTER_HEIGHT_PCT = 10;

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
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // --- Photo: holds, then fades out completely ---
  const photoSaturate = useTransform(scrollYProgress, [0.0, 0.18, 0.32], [1, 0.7, 0]);
  const photoBrightness = useTransform(scrollYProgress, [0.0, 0.18, 0.32], [1, 0.55, 0]);
  const photoOpacity = useTransform(scrollYProgress, [0.08, 0.32], [1, 0]);
  const photoFilter = useTransform(
    [photoSaturate, photoBrightness] as const,
    ([s, b]) => `saturate(${s}) brightness(${b})`,
  );

  // --- Ticker geometry: welded → centered horizontal → falls down → off ---
  // Stage % values (the ticker lives in the aspect-locked stage).
  const tickerTopNum = useTransform(
    scrollYProgress,
    [0.00, 0.08, 0.28, 0.58, 0.85, 1.0],
    [LED_BAND_TOP_PCT, LED_BAND_TOP_PCT, CENTER_TOP_PCT, 58, 105, 120],
  );
  const tickerLeftNum = useTransform(
    scrollYProgress,
    [0.00, 0.08, 0.28],
    [LED_BAND_LEFT_PCT, LED_BAND_LEFT_PCT, CENTER_LEFT_PCT],
  );
  const tickerWidthNum = useTransform(
    scrollYProgress,
    [0.00, 0.08, 0.28],
    [LED_BAND_WIDTH_PCT, LED_BAND_WIDTH_PCT, CENTER_WIDTH_PCT],
  );
  const tickerHeightNum = useTransform(
    scrollYProgress,
    [0.00, 0.08, 0.28],
    [LED_BAND_HEIGHT_PCT, LED_BAND_HEIGHT_PCT, CENTER_HEIGHT_PCT],
  );
  const tickerRotateNum = useTransform(
    scrollYProgress,
    [0.00, 0.08, 0.28],
    [LED_BAND_ROTATE_DEG, LED_BAND_ROTATE_DEG, 0],
  );

  const tickerTop = useMotionTemplate`${tickerTopNum}%`;
  const tickerLeft = useMotionTemplate`${tickerLeftNum}%`;
  const tickerWidth = useMotionTemplate`${tickerWidthNum}%`;
  const tickerHeight = useMotionTemplate`${tickerHeightNum}%`;
  const tickerRotate = useMotionTemplate`${tickerRotateNum}deg`;

  // Red ambient glow grows as it leaves the building and becomes the hero bar.
  const tickerGlow = useTransform(scrollYProgress, [0.0, 0.32], [0.25, 1]);

  // Ticker fades in once the section is sticky, welded onto the LED band.
  const tickerOpacity = useTransform(scrollYProgress, [0.0, 0.04, 0.12], [0, 0.4, 1]);

  // --- Text reveal/erase clip — appears behind/above the falling ticker ---
  // Reveal (top→bottom): bottom inset shrinks from 100% to 0%.
  const textBottomInset = useTransform(scrollYProgress, [0.30, 0.58], [100, 0]);
  // Erase (top→bottom): top inset grows from 0% to 100%.
  const textTopInset = useTransform(scrollYProgress, [0.62, 0.90], [0, 100]);
  const textClip = useMotionTemplate`inset(${textTopInset}% 0% ${textBottomInset}% 0%)`;

  // "Brothers also at" strip rides in/out with the headline.
  const alsoAtOpacity = useTransform(
    scrollYProgress,
    [0.50, 0.62, 0.82, 0.92],
    [0, 1, 1, 0],
  );
  const alsoAtY = useTransform(scrollYProgress, [0.50, 0.62], [16, 0]);

  const { quotes, loading } = useLiveQuotes();
  const marketOpen = isUSMarketOpen();

  // Build a loopable rail (duplicated for seamless marquee).
  const rail = quotes.length > 0 ? [...quotes, ...quotes] : null;

  return (
    <section
      id="brothers-at-work"
      ref={sectionRef}
      aria-label="Brothers at Work — live market ticker for AKPSI employers"
      className="relative bg-black text-white"
      style={{ height: "500vh" }}
    >
      {/* Mobile shortens the scroll distance for snappier feel */}
      <style>{`@media (max-width: 768px){ section[aria-label="Brothers at Work — live market ticker for AKPSI employers"]{ height:340vh !important; } }`}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/*
          Aspect-locked stage so the welded ticker stays glued to the LED
          band regardless of viewport size.
        */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "max(100vw, calc(100vh * 1.5))",
            height: "max(100vh, calc(100vw / 1.5))",
          }}
        >
          {/* Background photo — fades out, ticker stays */}
          <motion.div
            className="absolute inset-0"
            style={{
              filter: reduceMotion ? "saturate(0) brightness(0.1)" : photoFilter,
              opacity: reduceMotion ? 0 : photoOpacity,
              willChange: "filter, opacity",
            }}
          >
            <img
              src={tradingFloor}
              alt="Darla Moore School of Business trading room with LED stock ticker"
              width={1920}
              height={1280}
              className="block h-full w-full"
              loading="lazy"
            />
          </motion.div>

          {/* TEXT — revealed top→bottom behind the falling ticker */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-[4vh] z-10 flex flex-col items-center px-6 text-center"
            style={{
              clipPath: reduceMotion ? "none" : textClip,
            }}
          >
            <p className="led-text text-xs sm:text-sm uppercase tracking-[0.4em] led-glow-amber">
              ● LIVE · POWERED BY LIVE DATA
              {!marketOpen && (
                <>
                  <span className="ml-3 rounded-sm border border-white/30 px-2 py-0.5 text-[10px] tracking-widest text-white/70">
                    MARKET CLOSED
                  </span>
                  &nbsp;&nbsp;●
                </>
              )}
            </p>
            <h2 className="mt-4 font-display text-5xl sm:text-7xl lg:text-8xl font-medium leading-none">
              BROTHERS <span className="led-glow-amber">@</span> WORK
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/65">
              Real-time markets. Real Carolina AKΨ placements.
            </p>
          </motion.div>

          {/* THE TICKER — single element that morphs the whole way through */}
          <motion.div
            aria-hidden="true"
            className="absolute z-20 overflow-hidden bg-black/85 border-y border-[#ff3b3b]/50"
            style={{
              top: tickerTop,
              left: tickerLeft,
              width: tickerWidth,
              height: tickerHeight,
              rotate: reduceMotion ? `${LED_BAND_ROTATE_DEG}deg` : tickerRotate,
              transformOrigin: "center",
              boxShadow: "0 0 60px rgba(255,60,60,0.35)",
              opacity: reduceMotion ? 1 : tickerOpacity,
              willChange: "transform, top, left, width, height, opacity",
            }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 80px rgba(255, 60, 60, 0.45)",
                opacity: tickerGlow,
              }}
            />
            <div className="flex h-full items-center animate-ticker-fast whitespace-nowrap">
              {(rail ?? PLACEHOLDER_SYMBOLS.concat(PLACEHOLDER_SYMBOLS)).map((item, i) =>
                typeof item === "string" ? (
                  <PlaceholderPill key={`p-${i}`} symbol={item} />
                ) : (
                  <QuotePill key={`o-${item.symbol}-${i}`} q={item} />
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* Vignette covers the viewport, sits below the text/ticker */}
        <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/30 via-transparent to-black/85 pointer-events-none" />

        {/* "Brothers also at" — fades in with the headline, fades out with it */}
        <motion.div
          className="absolute inset-x-0 bottom-10 z-30 px-6 text-center"
          style={{
            opacity: reduceMotion ? 1 : alsoAtOpacity,
            y: reduceMotion ? 0 : alsoAtY,
          }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
            Brothers also at
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-2">
            {PRIVATE_EMPLOYERS.map((name) => (
              <li
                key={name}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs sm:text-sm text-white/80"
              >
                {name}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Loading shimmer hint near top before first poll resolves */}
        {loading && (
          <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Connecting to markets…
          </div>
        )}
      </div>
    </section>
  );
}
