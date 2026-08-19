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

type Employer = { name: string; url: string };

export const EMPLOYER_LOGOS: Employer[] = [
  { name: "EY", url: ey },
  { name: "PwC", url: pwc },
  { name: "Goldman Sachs", url: gs },
  { name: "J.P. Morgan", url: jpm },
  { name: "Bank of America", url: boa },
  { name: "Wells Fargo", url: wf },
  { name: "HSBC", url: hsbc },
  { name: "Piper Sandler", url: ps },
  { name: "Boeing", url: boeing },
  { name: "General Motors", url: gm },
  { name: "Coca-Cola", url: cc },
  { name: "Chick-fil-A", url: chicki },
  { name: "Special Olympics", url: so },
  { name: "FCC", url: fcc },
  { name: "Fifth Circuit Solicitor's Office", url: fifth },
];

/** A single free-floating employer logo — no plate, no card. */
export function EmployerLogo({
  logo,
  compact = false,
}: {
  logo: Employer;
  compact?: boolean;
}) {
  return (
    <span className="relative inline-flex items-center justify-center">
      {/* soft light halo so dark logos stay legible on black */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-18%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.38), rgba(255,255,255,0.16) 55%, rgba(255,255,255,0) 78%)",
          filter: "blur(10px)",
        }}
      />
      <img
        src={logo.url}
        alt={`${logo.name} logo`}
        loading="lazy"
        className={`relative w-auto object-contain opacity-95 transition-all duration-500 hover:scale-110 hover:opacity-100 ${
          compact ? "max-h-16 max-w-[190px] lg:max-h-20 lg:max-w-[230px]" : "max-h-14 max-w-[70%]"
        }`}
        style={{
          filter:
            "brightness(1.5) contrast(1.15) saturate(1.1) drop-shadow(0 0 1px rgba(255,255,255,0.95)) drop-shadow(0 0 4px rgba(255,255,255,0.7)) drop-shadow(0 0 14px rgba(255,255,255,0.35))",
        }}
      />
    </span>
  );
}


/** Slow clockwise orbit of logos around the headline, with gentle mouse influence. */
export function EmployerLogoOrbit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = EMPLOYER_LOGOS.length;
    const start = performance.now();
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.current = { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2, active: true };
    };
    const onLeave = () => (pointer.current.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const tick = (now: number) => {
      const r = wrap.getBoundingClientRect();
      const rx = r.width * 0.36;
      const ry = r.height * 0.36;
      const t = reduce ? 0 : (now - start) / 1000;

      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        // clockwise stream, slow
        const a = (i / n) * Math.PI * 2 + t * 0.052;
        // gentle organic wobble so it doesn't read as a rigid wheel
        const wob = Math.sin(t * 0.35 + i * 1.7) * 16;
        let x = Math.cos(a) * (rx + wob);
        let y = Math.sin(a) * (ry + wob * 0.6);

        const depth = (Math.sin(a) + 1) / 2; // 0 back .. 1 front
        let scale = 0.82 + depth * 0.3;
        let opacity = 0.72 + depth * 0.28;

        if (pointer.current.active) {
          const dx = x - pointer.current.x;
          const dy = y - pointer.current.y;
          const d = Math.hypot(dx, dy);
          const R = 160;
          if (d < R && d > 0.001) {
            const f = (1 - d / R) ** 2;
            x += (dx / d) * f * 28;
            y += (dy / d) * f * 28;
            scale += f * 0.12;
            opacity = Math.min(1, opacity + f * 0.25);
          }
        }

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
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-0 hidden md:block">
      {EMPLOYER_LOGOS.map((logo, i) => (
        <div
          key={logo.name}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 will-change-transform"
          style={{ transition: "opacity 300ms ease" }}
        >
          <EmployerLogo logo={logo} compact />
        </div>
      ))}
    </div>
  );
}


/** Mobile fallback: quiet grid of the same floating logos. */
export function EmployerLogoWall() {
  return (
    <div className="mx-auto mt-12 max-w-3xl px-6 md:hidden">
      <p className="text-center text-[11px] uppercase tracking-[0.35em] text-white/45">
        Where our brothers work
      </p>
      <div className="mt-8 grid grid-cols-3 place-items-center gap-x-6 gap-y-8">
        {EMPLOYER_LOGOS.map((logo) => (
          <EmployerLogo key={logo.name} logo={logo} />
        ))}
      </div>
    </div>
  );
}
