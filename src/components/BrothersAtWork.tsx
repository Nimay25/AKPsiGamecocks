import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import tradingFloor from "@/assets/trading-floor.jpg";
import { useLiveQuotes, isUSMarketOpen, type LiveQuote } from "@/hooks/useLiveQuotes";

// Vertical placement of the building's physical LED ticker band in the
// background photo, expressed as % from the top of the image. Adjust these
// two numbers if the photo is swapped.
// Measured directly from the source photo (1920x1280). The main red price
// row spans roughly y=275 → y=420 and drops ~65px from left → right
// (≈ -1.94°). Percentages are of the IMAGE, not the viewport — see the
// aspect-locked wrapper below.
const LED_BAND_TOP_PCT = 21.5;
const LED_BAND_BOTTOM_PCT = 32.8;
const LED_BAND_LEFT_PCT = -6;
const LED_BAND_WIDTH_PCT = 112;
const LED_BAND_ROTATE_DEG = -1.94;

type TickerCalibration = {
  top: number;
  height: number;
  left: number;
  width: number;
  rotate: number;
};

const DEFAULT_CALIBRATION: TickerCalibration = {
  top: LED_BAND_TOP_PCT,
  height: LED_BAND_BOTTOM_PCT - LED_BAND_TOP_PCT,
  left: LED_BAND_LEFT_PCT,
  width: LED_BAND_WIDTH_PCT,
  rotate: LED_BAND_ROTATE_DEG,
};

const CALIBRATION_STORAGE_KEY = "brothersTickerCalibration";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const round = (value: number) => Math.round(value * 100) / 100;

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

function TickerCalibrationControls({
  value,
  onChange,
}: {
  value: TickerCalibration;
  onChange: (next: TickerCalibration) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    mode: "move" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "rotate";
    startX: number;
    startY: number;
    stageWidth: number;
    stageHeight: number;
    start: TickerCalibration;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const commit = (next: TickerCalibration) => {
    onChange({
      top: round(clamp(next.top, 0, 92)),
      height: round(clamp(next.height, 3, 34)),
      left: round(clamp(next.left, -30, 30)),
      width: round(clamp(next.width, 60, 170)),
      rotate: round(clamp(next.rotate, -8, 8)),
    });
  };

  const startDrag = (
    mode: NonNullable<typeof dragRef.current>["mode"],
    event: React.PointerEvent<HTMLElement>,
  ) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      mode,
      startX: event.clientX,
      startY: event.clientY,
      stageWidth: rect.width,
      stageHeight: rect.height,
      start: value,
    };
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const dx = ((event.clientX - drag.startX) / drag.stageWidth) * 100;
    const dy = ((event.clientY - drag.startY) / drag.stageHeight) * 100;
    const next = { ...drag.start };

    if (drag.mode === "move") {
      next.left = drag.start.left + dx;
      next.top = drag.start.top + dy;
    }

    if (drag.mode.includes("top")) {
      next.top = drag.start.top + dy;
      next.height = drag.start.height - dy;
    }

    if (drag.mode.includes("bottom")) {
      next.height = drag.start.height + dy;
    }

    if (drag.mode.includes("left")) {
      next.left = drag.start.left + dx;
      next.width = drag.start.width - dx;
    }

    if (drag.mode.includes("right")) {
      next.width = drag.start.width + dx;
    }

    if (drag.mode === "rotate") {
      next.rotate = drag.start.rotate + dx * 0.16;
    }

    commit(next);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  };

  const exportText = [
    `LED_BAND_TOP_PCT = ${value.top}`,
    `LED_BAND_BOTTOM_PCT = ${round(value.top + value.height)}`,
    `LED_BAND_LEFT_PCT = ${value.left}`,
    `LED_BAND_WIDTH_PCT = ${value.width}`,
    `LED_BAND_ROTATE_DEG = ${value.rotate}`,
  ].join("\n");

  const copyValues = async () => {
    await navigator.clipboard.writeText(exportText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 z-30 select-none"
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        className="absolute border-2 border-cyan-300/95 bg-cyan-300/10 shadow-[0_0_24px_rgba(103,232,249,0.55)]"
        style={{
          top: `${value.top}%`,
          left: `${value.left}%`,
          width: `${value.width}%`,
          height: `${value.height}%`,
          transform: `rotate(${value.rotate}deg)`,
          transformOrigin: "center",
        }}
      >
        <button
          type="button"
          aria-label="Move ticker box"
          className="absolute inset-0 cursor-move"
          onPointerDown={(event) => startDrag("move", event)}
        />
        <button type="button" aria-label="Resize top" className="absolute -top-2 left-8 right-8 h-4 cursor-ns-resize bg-cyan-300/45" onPointerDown={(event) => startDrag("top", event)} />
        <button type="button" aria-label="Resize bottom" className="absolute -bottom-2 left-8 right-8 h-4 cursor-ns-resize bg-cyan-300/45" onPointerDown={(event) => startDrag("bottom", event)} />
        <button type="button" aria-label="Resize left" className="absolute -left-2 bottom-6 top-6 w-4 cursor-ew-resize bg-cyan-300/45" onPointerDown={(event) => startDrag("left", event)} />
        <button type="button" aria-label="Resize right" className="absolute -right-2 bottom-6 top-6 w-4 cursor-ew-resize bg-cyan-300/45" onPointerDown={(event) => startDrag("right", event)} />
        {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            aria-label={`Resize ${mode}`}
            className={`absolute h-5 w-5 rounded-full border border-black bg-cyan-200 ${
              mode === "top-left"
                ? "-left-2.5 -top-2.5 cursor-nwse-resize"
                : mode === "top-right"
                  ? "-right-2.5 -top-2.5 cursor-nesw-resize"
                  : mode === "bottom-left"
                    ? "-bottom-2.5 -left-2.5 cursor-nesw-resize"
                    : "-bottom-2.5 -right-2.5 cursor-nwse-resize"
            }`}
            onPointerDown={(event) => startDrag(mode, event)}
          />
        ))}
        <button
          type="button"
          aria-label="Rotate ticker box"
          className="absolute -top-12 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border border-black bg-red-400 text-xs font-bold text-black shadow-[0_0_18px_rgba(248,113,113,0.8)]"
          onPointerDown={(event) => startDrag("rotate", event)}
        >
          ↻
        </button>
      </div>

      <div className="absolute bottom-5 right-5 max-w-sm border border-cyan-300/50 bg-black/85 p-4 font-mono text-xs text-white shadow-2xl backdrop-blur">
        <p className="font-bold uppercase tracking-widest text-cyan-200">Ticker calibration mode</p>
        <p className="mt-2 text-white/70">Drag the cyan box, pull its handles, or use the red knob to rotate. Copy these values when it lines up.</p>
        <pre className="mt-3 whitespace-pre-wrap rounded-sm bg-white/10 p-3 text-cyan-100">{exportText}</pre>
        <div className="mt-3 flex gap-2">
          <button type="button" className="bg-cyan-300 px-3 py-2 font-bold text-black" onClick={copyValues}>
            {copied ? "Copied" : "Copy values"}
          </button>
          <button type="button" className="border border-white/25 px-3 py-2 text-white" onClick={() => commit(DEFAULT_CALIBRATION)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export function BrothersAtWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [calibrationEnabled, setCalibrationEnabled] = useState(false);
  const [calibration, setCalibration] = useState(DEFAULT_CALIBRATION);

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
  // Gentle fade-in so it appears to "light up" onto the LED band, then holds
  // before the hero takeover wipes it away.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.08, 0.5, 0.68], [0, 0.9, 1, 0]);
  const overlayGlow = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const overlayScale = useTransform(scrollYProgress, [0, 0.5], [1.005, 1.03]);

  // --- hero (full-width) ticker takes over ---
  const heroOpacity = useTransform(scrollYProgress, [0.55, 0.78], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.55, 0.85], [40, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0.7, 0.92], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.7, 0.92], [24, 0]);

  const { quotes, loading } = useLiveQuotes();
  const marketOpen = isUSMarketOpen();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const enabled = params.has("tickerCalibrate");
    setCalibrationEnabled(enabled);

    if (!enabled) return;

    const saved = window.localStorage.getItem(CALIBRATION_STORAGE_KEY);
    if (!saved) return;

    try {
      setCalibration({ ...DEFAULT_CALIBRATION, ...JSON.parse(saved) });
    } catch {
      window.localStorage.removeItem(CALIBRATION_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!calibrationEnabled) return;
    window.localStorage.setItem(CALIBRATION_STORAGE_KEY, JSON.stringify(calibration));
  }, [calibration, calibrationEnabled]);

  // Build a loopable rail (duplicated for seamless marquee).
  const rail = quotes.length > 0 ? [...quotes, ...quotes] : null;

  return (
    <section
      id="brothers-at-work"
      ref={sectionRef}
      aria-label="Brothers at Work — live market ticker for AKPSI employers"
      className="relative bg-black text-white"
      style={{ height: "200vh" }}
    >
      {/* Mobile shortens the scroll distance for snappier feel */}
      <style>{`@media (max-width: 768px){ section[aria-label="Brothers at Work — live market ticker for AKPSI employers"]{ height:150vh !important; } }`}</style>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/*
          Aspect-locked stage: wrapper preserves the photo's 1920×1280 ratio
          AND covers the viewport (both dims ≥ 100%). This lets the overlay
          band be positioned in % of the IMAGE — so it stays welded to the
          physical LED band at every viewport size.
        */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "max(100vw, calc(100vh * 1.5))",
            height: "max(100vh, calc(100vw / 1.5))",
          }}
        >
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
              className="block h-full w-full"
              loading="lazy"
            />
          </motion.div>

          {/* OVERLAY TICKER — welded to the physical LED band in the image */}
          <motion.div
            aria-hidden="true"
            className="absolute overflow-hidden bg-black/55 border-y border-[#ff3b3b]/40 shadow-[0_0_60px_rgba(255,60,60,0.25)]"
            style={{
              top: `${calibration.top}%`,
              left: `${calibration.left}%`,
              width: `${calibration.width}%`,
              height: `${calibration.height}%`,
              opacity: calibrationEnabled ? 1 : reduceMotion ? 0 : overlayOpacity,
              scale: calibrationEnabled || reduceMotion ? 1 : overlayScale,
              rotate: `${calibration.rotate}deg`,
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

          {calibrationEnabled && (
            <TickerCalibrationControls value={calibration} onChange={setCalibration} />
          )}
        </div>
        {/* Vignette sits above the aspect-locked stage so it always covers the viewport */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85 pointer-events-none" />



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
