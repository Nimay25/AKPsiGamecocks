import { useEffect, useRef } from "react";
import ey from "@/assets/logos-t/ey.webp";
import pwc from "@/assets/logos-t/pwc.webp";
import gs from "@/assets/logos-t/gs.webp";
import jpm from "@/assets/logos-t/jpm.webp";
import boa from "@/assets/logos-t/boa.webp";
import wf from "@/assets/logos-t/wf.webp";
import hsbc from "@/assets/logos-t/hsbc.webp";
import ps from "@/assets/logos-t/ps.webp";
import boeing from "@/assets/logos-t/boeing.webp";
import gm from "@/assets/logos-t/gm.webp";
import cc from "@/assets/logos-t/cc.webp";
import chicki from "@/assets/logos-t/chicki.webp";
import so from "@/assets/logos-t/so.webp";
import fcc from "@/assets/logos-t/fcc.webp";
import fifth from "@/assets/logos-t/5.webp";
import appleAsset from "@/assets/logos-t/apple.svg.asset.json";
import amazonAsset from "@/assets/logos-t/amazon.svg.asset.json";
import kpmgAsset from "@/assets/logos-t/kpmg.svg.asset.json";
import mckinseyAsset from "@/assets/logos-t/mckinsey.svg.asset.json";
import pepsiAsset from "@/assets/logos-t/pepsi.svg.asset.json";

type Employer = {
  name: string;
  url: string;
  /** optical size correction so every mark reads at a similar visual weight */
  scale?: number;
  /** near-black marks get inverted so they stay legible on black */
  invert?: boolean;
};

/** Inner ring — clockwise, tighter oval. */
export const EMPLOYER_LOGOS: Employer[] = [
  { name: "EY", url: ey, scale: 1.05 },
  { name: "PwC", url: pwc, scale: 1.25 },
  { name: "Goldman Sachs", url: gs, scale: 1.05 },
  { name: "J.P. Morgan", url: jpm, scale: 1.0 },
  { name: "Bank of America", url: boa, scale: 0.9 },
  { name: "Wells Fargo", url: wf, scale: 0.95 },
  { name: "HSBC", url: hsbc, scale: 0.9 },
  { name: "Piper Sandler", url: ps, scale: 1.05 },
  { name: "Boeing", url: boeing, scale: 0.78 },
  { name: "General Motors", url: gm, scale: 1.05 },
  { name: "Coca-Cola", url: cc, scale: 0.62 },
  { name: "Chick-fil-A", url: chicki, scale: 0.68 },
];

/** Outer ring — counter-clockwise, wide oval that drifts past the edges. */
export const OUTER_EMPLOYER_LOGOS: Employer[] = [
  { name: "McKinsey & Company", url: mckinseyAsset.url, scale: 0.95, invert: true },
  { name: "KPMG", url: kpmgAsset.url, scale: 1.05 },
  { name: "Apple", url: appleAsset.url, scale: 1.5, invert: true },
  { name: "Amazon", url: amazonAsset.url, scale: 0.9, invert: true },
  { name: "PepsiCo", url: pepsiAsset.url, scale: 1.45 },
  { name: "Special Olympics", url: so, scale: 1.1 },
  { name: "FCC", url: fcc, scale: 0.95 },
  { name: "Fifth Circuit Solicitor's Office", url: fifth, scale: 0.95 },
];

/** Every logo, for the mobile grid. */
export const ALL_EMPLOYER_LOGOS: Employer[] = [...EMPLOYER_LOGOS, ...OUTER_EMPLOYER_LOGOS];

/* Keep brand colors true: no brightness/contrast/saturation shifts —
   legibility comes from a soft white glow behind the mark only. */
const BASE_FILTER =
  "drop-shadow(0 0 2px rgba(255,255,255,0.55)) drop-shadow(0 0 10px rgba(255,255,255,0.25))";
const INVERT_FILTER =
  "invert(1) drop-shadow(0 0 3px rgba(0,0,0,0.45))";

/** A single free-floating employer logo — no plate, no card. */
export function EmployerLogo({
  logo,
  size = 64,
}: {
  logo: Employer;
  /** base height in px before the per-logo optical scale */
  size?: number;
}) {
  const h = size * (logo.scale ?? 1);
  return (
    <span className="relative inline-flex items-center justify-center">
      {/* soft light halo so dark logos stay legible on black */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-22%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.26), rgba(255,255,255,0.10) 55%, rgba(255,255,255,0) 78%)",
          filter: "blur(10px)",
        }}
      />
      <img
        src={logo.url}
        alt={`${logo.name} logo`}
        loading="lazy"
        className="relative w-auto object-contain opacity-95 transition-transform duration-500 hover:scale-110"
        style={{
          height: `${h}px`,
          maxWidth: `${h * 3.4}px`,
          filter: logo.invert ? INVERT_FILTER : BASE_FILTER,
        }}
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
    // touch / coarse pointer devices: no cursor repulsion at all
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

    // eased pointer + per-logo push, so cursor reactions glide instead of snapping
    const smooth = { x: 0, y: 0 };
    const push = Array.from({ length: n }, () => ({ x: 0, y: 0, f: 0 }));
    let last = start;

    const tick = (now: number) => {
      const r = wrap.getBoundingClientRect();
      // shrink the whole system down on narrow screens so it still reads as a ring
      const fit = Math.min(1, Math.max(0.52, r.width / 900));
      const rx = r.width * radiusX;
      const ry = r.height * radiusY;
      const t = reduce ? 0 : (now - start) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const ease = 1 - Math.exp(-dt * 5); // time-based lerp factor

      smooth.x += (pointer.current.x - smooth.x) * ease;
      smooth.y += (pointer.current.y - smooth.y) * ease;

      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const a = (i / n) * Math.PI * 2 + phase + t * speed;
        const wob = Math.sin(t * 0.35 + i * 1.7) * 16 * fit;
        const bx = Math.cos(a) * (rx + wob);
        const by = Math.sin(a) * (ry + wob * 0.6);

        const depth = (Math.sin(a) + 1) / 2; // 0 back .. 1 front
        const baseScale = (0.86 + depth * 0.24) * fit;
        const baseOpacity = minOpacity + depth * (1 - minOpacity);

        // target push away from the cursor (gentle, capped)
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

        const x = bx + p.x;
        const y = by + p.y;
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

/** Two counter-rotating rings of employer logos around the headline. */
export function EmployerLogoOrbit() {
  return (
    <>
      <Orbit logos={EMPLOYER_LOGOS} radiusX={0.30} radiusY={0.31} speed={0.052} size={58} />
      <Orbit
        logos={OUTER_EMPLOYER_LOGOS}
        radiusX={0.52}
        radiusY={0.475}
        speed={-0.036}
        size={56}
        phase={0.4}
        minOpacity={0.6}
      />
    </>
  );
}

/** The orbit now runs on every screen size, so the old mobile grid is retired. */
export function EmployerLogoWall() {
  return null;
}
