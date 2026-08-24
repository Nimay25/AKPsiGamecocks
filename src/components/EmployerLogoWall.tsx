import { useEffect, useRef } from "react";
import apple from "@/assets/logos-w/apple.webp.asset.json";
import bankOfAmerica from "@/assets/logos-w/bank-of-america.webp.asset.json";
import boeing from "@/assets/logos-w/boeing.webp.asset.json";
import capitalOne from "@/assets/logos-w/capital-one.webp.asset.json";
import deloitte from "@/assets/logos-w/deloitte.webp.asset.json";
import esteeLauder from "@/assets/logos-w/estee-lauder.webp.asset.json";
import ey from "@/assets/logos-w/ey.webp.asset.json";
import foxSports from "@/assets/logos-w/fox-sports.webp.asset.json";
import gm from "@/assets/logos-w/gm.webp.asset.json";
import goldmanSachs from "@/assets/logos-w/goldman-sachs.webp.asset.json";
import jefferies from "@/assets/logos-w/jefferies.webp.asset.json";
import johnsonJohnson from "@/assets/logos-w/johnson-johnson.webp.asset.json";
import jpmorgan from "@/assets/logos-w/jpmorgan.webp.asset.json";
import kearney from "@/assets/logos-w/kearney.webp.asset.json";
import kpmg from "@/assets/logos-w/kpmg.webp.asset.json";
import loreal from "@/assets/logos-w/loreal.webp.asset.json";
import mckinsey from "@/assets/logos-w/mckinsey.webp.asset.json";
import microsoft from "@/assets/logos-w/microsoft.webp.asset.json";
import morganStanley from "@/assets/logos-w/morgan-stanley.webp.asset.json";
import pepsico from "@/assets/logos-w/pepsico.webp.asset.json";
import pwc from "@/assets/logos-w/pwc.webp.asset.json";
import raytheon from "@/assets/logos-w/raytheon.webp.asset.json";
import tRowePrice from "@/assets/logos-w/t-rowe-price.webp.asset.json";
import usBank from "@/assets/logos-w/us-bank.webp.asset.json";
import vanguard from "@/assets/logos-w/vanguard.webp.asset.json";
import wellsFargo from "@/assets/logos-w/wells-fargo.webp.asset.json";

type Employer = {
  name: string;
  url: string;
  /** optical size correction so every mark reads at a similar visual weight */
  scale?: number;
};

/** Inner ring — clockwise, tighter oval. */
export const EMPLOYER_LOGOS: Employer[] = [
  { name: "J.P. Morgan", url: jpmorgan.url, scale: 1.0 },
  { name: "Goldman Sachs", url: goldmanSachs.url, scale: 0.95 },
  { name: "Morgan Stanley", url: morganStanley.url, scale: 0.95 },
  { name: "Bank of America", url: bankOfAmerica.url, scale: 1.15 },
  { name: "Wells Fargo", url: wellsFargo.url, scale: 0.95 },
  { name: "EY", url: ey.url, scale: 0.95 },
  { name: "PwC", url: pwc.url, scale: 1.0 },
  { name: "Deloitte", url: deloitte.url, scale: 1.1 },
  { name: "KPMG", url: kpmg.url, scale: 1.0 },
  { name: "McKinsey & Company", url: mckinsey.url, scale: 1.1 },
  { name: "Kearney", url: kearney.url, scale: 1.2 },
  { name: "Jefferies", url: jefferies.url, scale: 1.05 },
  { name: "Capital One", url: capitalOne.url, scale: 1.05 },
];

/** Outer ring — counter-clockwise, wide oval. */
export const OUTER_EMPLOYER_LOGOS: Employer[] = [
  { name: "Apple", url: apple.url, scale: 0.85 },
  { name: "Microsoft", url: microsoft.url, scale: 1.0 },
  { name: "Boeing", url: boeing.url, scale: 1.2 },
  { name: "General Motors", url: gm.url, scale: 0.8 },
  { name: "PepsiCo", url: pepsico.url, scale: 1.05 },
  { name: "Johnson & Johnson", url: johnsonJohnson.url, scale: 1.15 },
  { name: "L'Oréal", url: loreal.url, scale: 1.1 },
  { name: "Estée Lauder Companies", url: esteeLauder.url, scale: 0.95 },
  { name: "Vanguard", url: vanguard.url, scale: 1.05 },
  { name: "T. Rowe Price", url: tRowePrice.url, scale: 1.1 },
  { name: "U.S. Bank", url: usBank.url, scale: 1.0 },
  { name: "Raytheon", url: raytheon.url, scale: 1.15 },
  { name: "Fox Sports", url: foxSports.url, scale: 0.9 },
];

/** Every logo, for any grid fallback. */
export const ALL_EMPLOYER_LOGOS: Employer[] = [...EMPLOYER_LOGOS, ...OUTER_EMPLOYER_LOGOS];

/** A single free-floating employer logo — clean, no glow, no plate. */
export function EmployerLogo({
  logo,
  size = 58,
}: {
  logo: Employer;
  /** base height in px before the per-logo optical scale */
  size?: number;
}) {
  const h = size * (logo.scale ?? 1);
  return (
    <span className="relative inline-flex items-center justify-center">
      <img
        src={logo.url}
        alt={`${logo.name} logo`}
        loading="lazy"
        className="relative w-auto object-contain transition-transform duration-500 hover:scale-110"
        style={{ height: `${h}px`, maxWidth: `${h * 2.6}px` }}
      />
    </span>
  );
}

type OrbitProps = {
  logos: Employer[];
  /** fraction of the container used as the oval radius */
  radiusX: number;
  radiusY: number;
  /** radians per second; negative = counter-clockwise */
  speed: number;
  size: number;
  phase?: number;
  minOpacity?: number;
};

function Orbit({ logos, radiusX, radiusY, speed, size, phase = 0, minOpacity = 0.72 }: OrbitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const n = logos.length;
    const start = performance.now();
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.current = { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2, active: true };
    };
    const onLeave = () => (pointer.current.active = false);
    if (!coarse) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }

    const smooth = { x: 0, y: 0 };
    const push = Array.from({ length: n }, () => ({ x: 0, y: 0, f: 0 }));
    let last = start;

    // even spacing along the ellipse perimeter (equal-angle bunches at the sides)
    const SAMPLES = 240;
    let cache: { rx: number; ry: number; cum: number[]; total: number } | null = null;
    const table = (rx: number, ry: number) => {
      if (cache && cache.rx === rx && cache.ry === ry) return cache;
      let total = 0;
      const cum: number[] = [0];
      for (let s = 1; s <= SAMPLES; s++) {
        const a0 = ((s - 1) / SAMPLES) * Math.PI * 2;
        const a1 = (s / SAMPLES) * Math.PI * 2;
        const dx = rx * (Math.cos(a1) - Math.cos(a0));
        const dy = ry * (Math.sin(a1) - Math.sin(a0));
        total += Math.hypot(dx, dy);
        cum.push(total);
      }
      cache = { rx, ry, cum, total };
      return cache;
    };
    const evenAngle = (u: number, rx: number, ry: number) => {
      const { cum, total } = table(rx, ry);
      const target = ((((u % 1) + 1) % 1)) * total;
      let lo = 0;
      let hi = SAMPLES;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] < target) lo = mid + 1;
        else hi = mid;
      }
      return (lo / SAMPLES) * Math.PI * 2;
    };

    const tick = (now: number) => {
      const r = wrap.getBoundingClientRect();
      const fit = Math.min(1, Math.max(0.52, r.width / 900));
      const rx = r.width * radiusX;
      const ry = r.height * radiusY;
      const t = reduce ? 0 : (now - start) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const ease = 1 - Math.exp(-dt * 5);

      smooth.x += (pointer.current.x - smooth.x) * ease;
      smooth.y += (pointer.current.y - smooth.y) * ease;

      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const u = i / n + (phase + t * speed) / (Math.PI * 2);
        const a = evenAngle(u, rx, ry);
        const wob = Math.sin(t * 0.35 + i * 1.7) * 12 * fit;
        // alternate the radius so neighbours never sit on the same arc
        const zig = (i % 2 === 0 ? 1 : -1) * 34 * fit;
        const bx = Math.cos(a) * (rx + wob + zig);
        const by = Math.sin(a) * (ry + wob * 0.6 + zig * 0.7);


        const depth = (Math.sin(a) + 1) / 2; // 0 back .. 1 front
        const baseScale = (0.86 + depth * 0.24) * fit;
        const baseOpacity = minOpacity + depth * (1 - minOpacity);

        let tx = 0;
        let ty = 0;
        let tf = 0;
        if (!coarse && pointer.current.active) {
          const dx = bx - smooth.x;
          const dy = by - smooth.y;
          const d = Math.hypot(dx, dy);
          const R = 190;
          if (d < R && d > 0.001) {
            tf = (1 - d / R) ** 2;
            tx = (dx / d) * tf * 14;
            ty = (dy / d) * tf * 14;
          }
        }

        const p = push[i];
        p.x += (tx - p.x) * ease;
        p.y += (ty - p.y) * ease;
        p.f += (tf - p.f) * ease;

        // keep every mark fully inside the section
        const halfW = el.offsetWidth / 2;
        const halfH = el.offsetHeight / 2;
        const maxX = Math.max(0, r.width / 2 - halfW - 10);
        const maxY = Math.max(0, r.height / 2 - halfH - 10);
        const x = Math.max(-maxX, Math.min(maxX, bx + p.x));
        const y = Math.max(-maxY, Math.min(maxY, by + p.y));
        const scale = baseScale + p.f * 0.06;
        const opacity = Math.min(1, baseOpacity + p.f * 0.15);

        el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [logos, radiusX, radiusY, speed, phase, minOpacity]);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-0">
      {logos.map((logo, i) => (
        <div
          key={logo.name}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 will-change-transform"
          style={{ transition: "opacity 300ms ease" }}
        >
          <EmployerLogo logo={logo} size={size} />
        </div>
      ))}
    </div>
  );
}

/** One evenly spaced ring of employer logos around the headline. */
export function EmployerLogoOrbit() {
  return (
    <Orbit
      logos={ALL_EMPLOYER_LOGOS}
      radiusX={0.395}
      radiusY={0.43}
      speed={0.042}
      size={44}
      minOpacity={0.78}
    />
  );
}


/** The orbit runs on every screen size, so the old mobile grid is retired. */
export function EmployerLogoWall() {
  return null;
}
