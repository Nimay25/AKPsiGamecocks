import ey from "@/assets/logos-t/ey.png.asset.json";
import pwc from "@/assets/logos-t/pwc.png.asset.json";
import gs from "@/assets/logos-t/gs.png.asset.json";
import jpm from "@/assets/logos-t/jpm.png.asset.json";
import boa from "@/assets/logos-t/boa.png.asset.json";
import wf from "@/assets/logos-t/wf.png.asset.json";
import hsbc from "@/assets/logos-t/hsbc.png.asset.json";
import ps from "@/assets/logos-t/ps.png.asset.json";
import boeing from "@/assets/logos-t/boeing.png.asset.json";
import gm from "@/assets/logos-t/gm.png.asset.json";
import cc from "@/assets/logos-t/cc.png.asset.json";
import chicki from "@/assets/logos-t/chicki.png.asset.json";
import so from "@/assets/logos-t/so.png.asset.json";
import fcc from "@/assets/logos-t/fcc.png.asset.json";
import fifth from "@/assets/logos-t/5.png.asset.json";

type Employer = { name: string; url: string };

export const EMPLOYER_LOGOS: Employer[] = [
  { name: "EY", url: ey.url },
  { name: "PwC", url: pwc.url },
  { name: "Goldman Sachs", url: gs.url },
  { name: "J.P. Morgan", url: jpm.url },
  { name: "Bank of America", url: boa.url },
  { name: "Wells Fargo", url: wf.url },
  { name: "HSBC", url: hsbc.url },
  { name: "Piper Sandler", url: ps.url },
  { name: "Boeing", url: boeing.url },
  { name: "General Motors", url: gm.url },
  { name: "Coca-Cola", url: cc.url },
  { name: "Chick-fil-A", url: chicki.url },
  { name: "Special Olympics", url: so.url },
  { name: "FCC", url: fcc.url },
  { name: "Fifth Circuit Solicitor's Office", url: fifth.url },
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
    <img
      src={logo.url}
      alt={`${logo.name} logo`}
      loading="lazy"
      className={`w-auto object-contain opacity-80 transition-all duration-500 hover:scale-110 hover:opacity-100 ${
        compact ? "max-h-12 max-w-[150px] lg:max-h-14 lg:max-w-[180px]" : "max-h-14 max-w-[70%]"
      }`}
      style={{
        filter:
          "brightness(1.35) contrast(1.05) drop-shadow(0 0 12px rgba(255,255,255,0.28)) drop-shadow(0 6px 18px rgba(0,0,0,0.6))",
      }}
    />
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
        let opacity = 0.42 + depth * 0.4;

        if (pointer.current.active) {
          const dx = x - pointer.current.x;
          const dy = y - pointer.current.y;
          const d = Math.hypot(dx, dy);
          const R = 220;
          if (d < R && d > 0.001) {
            const f = (1 - d / R) ** 2;
            x += (dx / d) * f * 70;
            y += (dy / d) * f * 70;
            scale += f * 0.22;
            opacity = Math.min(1, opacity + f * 0.45);
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
