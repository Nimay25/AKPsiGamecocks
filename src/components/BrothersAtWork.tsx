import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate } from "framer-motion";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import darlaMoore from "@/assets/darla-moore-real.jpg";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";

// Vertical placement of the building's physical LED ticker band in the
// background photo, expressed as % from the top of the image. Tuned for
// src/assets/darla-moore-real.jpg (465x500).
const LED_BAND_TOP_PCT = 6.5;
const LED_BAND_BOTTOM_PCT = 12.5;
const LED_BAND_CENTER_PCT = (LED_BAND_TOP_PCT + LED_BAND_BOTTOM_PCT) / 2;
const LED_BAND_HEIGHT_PCT = LED_BAND_BOTTOM_PCT - LED_BAND_TOP_PCT;

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

  // ---- Phase map ----
  // 0.00–0.20  full photo visible
  // 0.20–0.45  photo zooms in on LED band; vignette tightens
  // 0.40–0.60  black masks slide in from top/bottom, leaving only the band
  // 0.55–0.75  isolated band slides to vertical center of viewport
  // 0.65–0.85  photo's LED band fades out → real live data ticker fades in
  // 0.80–1.00  headline + supporting copy resolve

  // Photo zoom: scale up, transform-origin pinned to the LED band so the
  // band stays anchored as it grows.
  const photoScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 2.2, 2.4]);

  // Black masks above & below the band. Heights grow from 0 to "everything
  // except the band". When complete, only the band slice remains visible.
  const maskTopHeight = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    [`0%`, `${LED_BAND_TOP_PCT}%`],
  );
  const maskBottomHeight = useTransform(
    scrollYProgress,
    [0.25, 0.55],
    [`0%`, `${100 - LED_BAND_BOTTOM_PCT}%`],
  );
  const maskOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // Translate the entire (already-zoomed) photo so the band lands in the
  // vertical center of the viewport.
  const bandShiftVH = useTransform(
    scrollYProgress,
    [0.5, 0.75],
    [0, 50 - LED_BAND_CENTER_PCT],
  );
  const bandShift = useMotionTemplate`${bandShiftVH}vh`;

  // Photo band fades out → live data band fades in.
  const photoBandOpacity = useTransform(scrollYProgress, [0.6, 0.78], [1, 0]);
  const liveBandOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);

  // Outer photo opacity (helps the whole thing settle into pure black at the end).
  const photoOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  // Headline copy.
  const headlineOpacity = useTransform(scrollYProgress, [0.78, 0.95], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.78, 0.95], [24, 0]);

  const { quotes, loading } = useLiveQuotes();
  const marketOpen = isUSMarketOpen();
  const rail = quotes.length > 0 ? [...quotes, ...quotes] : null;

  return (
    <section
      ref={sectionRef}
      aria-label="Brothers at Work — live market ticker for AKPSI employers"
      className="relative bg-black text-white"
      style={{ height: "260vh" }}
    >
      <style>{`@media (max-width: 768px){ section[aria-label="Brothers at Work — live market ticker for AKPSI employers"]{ height:200vh !important; } }`}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Photo + masks group — translates together so the visible band slides to viewport center */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: reduceMotion ? 0 : bandShift,
            opacity: reduceMotion ? 0.3 : photoOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* Background photo, zoomed so the LED band grows */}
          <motion.img
            src={darlaMoore}
            alt="Darla Moore School of Business trading room with LED stock ticker"
            width={1860}
            height={2000}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            style={{
              scale: reduceMotion ? 1 : photoScale,
              transformOrigin: `50% ${LED_BAND_CENTER_PCT}%`,
              willChange: "transform",
            }}
          />

          {/* Top black mask — grows down to the band */}
          <motion.div
            className="absolute inset-x-0 top-0 bg-black"
            style={{
              height: reduceMotion ? `${LED_BAND_TOP_PCT}%` : maskTopHeight,
              opacity: reduceMotion ? 1 : maskOpacity,
            }}
          />
          {/* Bottom black mask — grows up to the band */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-black"
            style={{
              height: reduceMotion ? `${100 - LED_BAND_BOTTOM_PCT}%` : maskBottomHeight,
              opacity: reduceMotion ? 1 : maskOpacity,
            }}
          />

          {/* Live data ticker — pinned exactly over the band slice, fades in as photo band fades out */}
          <motion.div
            className="absolute left-0 right-0 overflow-hidden bg-black border-y border-[#ff3b3b]/50"
            style={{
              top: `${LED_BAND_TOP_PCT}%`,
              height: `${LED_BAND_HEIGHT_PCT}%`,
              opacity: reduceMotion ? 1 : liveBandOpacity,
              boxShadow: "inset 0 0 60px rgba(255,60,60,0.35)",
              willChange: "opacity",
            }}
            aria-hidden="true"
          >
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

          {/* A thin black scrim over the photo band only — used to fade the *photo's* LED text out
              independently from the rest of the photo, so the live ticker reveal feels clean */}
          <motion.div
            className="absolute left-0 right-0 bg-black"
            style={{
              top: `${LED_BAND_TOP_PCT}%`,
              height: `${LED_BAND_HEIGHT_PCT}%`,
              opacity: reduceMotion ? 1 : useTransform(photoBandOpacity, (v) => 1 - v),
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Headline & supporting copy — settle in after the ticker centers */}
        <motion.div
          className="absolute inset-x-0 bottom-[18vh] flex flex-col items-center gap-4 px-4 text-center"
          style={{
            opacity: reduceMotion ? 1 : headlineOpacity,
            y: reduceMotion ? 0 : headlineY,
            willChange: "opacity, transform",
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
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-medium leading-none">
            BROTHERS <span className="led-glow-amber">@</span> WORK
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/65">
            Real-time markets. Real Carolina AKΨ placements.
          </p>

          <div className="mt-4 w-full max-w-5xl">
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

        {loading && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40">
            Connecting to markets…
          </div>
        )}
      </div>
    </section>
  );
}
