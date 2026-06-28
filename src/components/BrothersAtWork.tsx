import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import tradingFloor from "@/assets/trading-floor.jpg";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";

// Vertical placement of the building's physical LED ticker band in the
// background photo, expressed as % from the top of the image. Adjust these
// two numbers if the photo is swapped.
const LED_BAND_TOP_PCT = 15;
const LED_BAND_BOTTOM_PCT = 28;
// The physical LED band in the photo is not perfectly level — the right side
// sits slightly higher than the left. Match that tilt so the overlay sits ON
// the band instead of floating off-axis.
const LED_BAND_ROTATE_DEG = -1.6;

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

// Placeholder rail content while the first poll lands — keeps geometry stable
// so the scroll animation doesn't jump when real data arrives.
const PLACEHOLDER_SYMBOLS = [
  "BAC", "WFC", "JPM", "GS", "GM", "BA", "KO", "HSBC", "PIPR",
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

  // --- photo treatment ---
  const photoSaturate = useTransform(scrollYProgress, [0, 0.35, 0.7], [1, 0.85, 0]);
  const photoBrightness = useTransform(scrollYProgress, [0, 0.35, 0.7], [1, 0.7, 0.05]);
  const photoOpacity = useTransform(scrollYProgress, [0.65, 0.85], [1, 0.25]);
  const photoFilter = useTransform(
    [photoSaturate, photoBrightness] as const,
    ([s, b]) => `saturate(${s}) brightness(${b})`,
  );

  // --- overlay ticker (sits on the building's LED band) ---
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 0.72], [0, 0.55, 1, 0]);
  const overlayGlow = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const overlayScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.04]);

  // --- hero (full-width) ticker takes over ---
  const heroOpacity = useTransform(scrollYProgress, [0.55, 0.78], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.55, 0.85], [40, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.7, 0.92], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.7, 0.92], [24, 0]);

  const { quotes, loading } = useLiveQuotes();
  const marketOpen = isUSMarketOpen();

  // Build a loopable rail (duplicated for seamless marquee).
  const rail = quotes.length > 0 ? [...quotes, ...quotes] : null;

  return (
    <section
      ref={sectionRef}
      aria-label="Brothers at Work — live market ticker for AKPSI employers"
      className="relative bg-black text-white"
      style={{ height: "200vh" }}
    >
      {/* Mobile shortens the scroll distance for snappier feel */}
      <style>{`@media (max-width: 768px){ section[aria-label="Brothers at Work — live market ticker for AKPSI employers"]{ height:150vh !important; } }`}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background photo */}
        <motion.div
          className="absolute inset-0"
          style={{
            filter: reduceMotion ? "saturate(0) brightness(0.2)" : photoFilter,
            opacity: reduceMotion ? 0.35 : photoOpacity,
            willChange: "filter, opacity",
          }}
        >
          <img
            src={tradingFloor}
            alt="Darla Moore School of Business trading room with LED stock ticker"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85 pointer-events-none" />

        {/* OVERLAY TICKER — pinned on top of the building's physical LED band */}
        <motion.div
          aria-hidden="true"
          className="absolute left-0 right-0 overflow-hidden bg-black/45 border-y border-[#ff3b3b]/40"
          style={{
            top: `${LED_BAND_TOP_PCT}%`,
            height: `${LED_BAND_BOTTOM_PCT - LED_BAND_TOP_PCT}%`,
            opacity: reduceMotion ? 0 : overlayOpacity,
            scale: reduceMotion ? 1 : overlayScale,
            transformOrigin: "center",
            willChange: "opacity, transform",
          }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 80px rgba(255, 60, 60, 0.35)",
              opacity: overlayGlow,
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

        {/* HERO TICKER — full-width, dominant after photo fades */}
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 px-4"
          style={{
            opacity: reduceMotion ? 1 : heroOpacity,
            y: reduceMotion ? 0 : heroY,
            willChange: "opacity, transform",
          }}
        >
          <motion.div
            className="text-center"
            style={{
              opacity: reduceMotion ? 1 : headlineOpacity,
              y: reduceMotion ? 0 : headlineY,
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
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/65">
              Real-time markets. Real Carolina AKΨ placements.
            </p>
          </motion.div>

          {/* Full-width hero marquee */}
          <div className="relative w-screen -mx-4 overflow-hidden border-y border-white/10 bg-black py-5 sm:py-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
            <div className="flex animate-ticker-hero whitespace-nowrap">
              {rail
                ? rail.map((q, i) => <QuotePill key={`h-${q.symbol}-${i}`} q={q} />)
                : PLACEHOLDER_SYMBOLS.concat(PLACEHOLDER_SYMBOLS).map((s, i) => (
                    <PlaceholderPill key={`hp-${i}`} symbol={s} />
                  ))}
            </div>
          </div>

          {/* Static "Brothers also at" strip — private / non-public employers */}
          <div className="mt-2 w-full max-w-5xl text-center">
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
          </div>
        </motion.div>

        {/* Loading shimmer hint near top before first poll resolves */}
        {loading && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Connecting to markets…
          </div>
        )}
      </div>
    </section>
  );
}
