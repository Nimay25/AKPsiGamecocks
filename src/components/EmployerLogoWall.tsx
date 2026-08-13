import ey from "@/assets/logos/ey.png.asset.json";
import pwc from "@/assets/logos/pwc.png.asset.json";
import gs from "@/assets/logos/gs.png.asset.json";
import jpm from "@/assets/logos/jpm.png.asset.json";
import boa from "@/assets/logos/boa.png.asset.json";
import wf from "@/assets/logos/wf.png.asset.json";
import hsbc from "@/assets/logos/hsbc.png.asset.json";
import ps from "@/assets/logos/ps.png.asset.json";
import boeing from "@/assets/logos/boeing.png.asset.json";
import gm from "@/assets/logos/gm.png.asset.json";
import cc from "@/assets/logos/cc.png.asset.json";
import chicki from "@/assets/logos/chicki.png.asset.json";
import so from "@/assets/logos/so.png.asset.json";
import fcc from "@/assets/logos/fcc.png.asset.json";
import fifth from "@/assets/logos/5.png.asset.json";

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

/** A single employer logo on its own polished plate with a shine sweep. */
export function EmployerLogo({
  logo,
  index = 0,
  compact = false,
}: {
  logo: Employer;
  index?: number;
  compact?: boolean;
}) {
  return (
    <figure
      className={`logo-plate group relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#ffc857] hover:shadow-[0_0_34px_-4px_rgba(255,200,87,0.55)] ${
        compact ? "h-16 w-40 px-4 lg:h-20 lg:w-48" : "h-24 px-5 sm:h-28"
      }`}
      style={{ animationDelay: `${(index % 8) * 0.45}s` }}
    >
      <img
        src={logo.url}
        alt={`${logo.name} logo`}
        loading="lazy"
        className={`relative z-10 w-auto max-w-[82%] object-contain transition-transform duration-500 group-hover:scale-[1.07] ${
          compact ? "max-h-10 lg:max-h-12" : "max-h-14 sm:max-h-16"
        }`}
      />
      <span className="logo-shine pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
      <figcaption className="sr-only">{logo.name}</figcaption>
    </figure>
  );
}

/** Floating side rails: logos drift gently along the left and right edges. */
export function EmployerLogoRail({ side }: { side: "left" | "right" }) {
  const half = Math.ceil(EMPLOYER_LOGOS.length / 2);
  const logos =
    side === "left" ? EMPLOYER_LOGOS.slice(0, half) : EMPLOYER_LOGOS.slice(half);

  return (
    <div
      aria-hidden="false"
      className={`pointer-events-none absolute inset-y-0 z-10 hidden flex-col items-center justify-around py-10 md:flex ${
        side === "left" ? "left-0 pl-4 lg:pl-10" : "right-0 pr-4 lg:pr-10"
      }`}
    >
      {logos.map((logo, i) => (
        <div
          key={logo.name}
          className="baw-float pointer-events-auto"
          style={{
            animation: `baw-float ${12 + i * 1.6}s ease-in-out ${
              i * 1.1 + (side === "right" ? 0.7 : 0)
            }s infinite`,
          }}
        >
          <EmployerLogo logo={logo} index={i + (side === "right" ? 4 : 0)} compact />
        </div>
      ))}
    </div>
  );
}

/** Mobile fallback: simple grid of the same plates. */
export function EmployerLogoWall() {
  return (
    <div className="mx-auto mt-12 max-w-3xl px-6 md:hidden">
      <p className="text-center text-[11px] uppercase tracking-[0.35em] text-white/45">
        Where our brothers work
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {EMPLOYER_LOGOS.map((logo, i) => (
          <EmployerLogo key={logo.name} logo={logo} index={i} />
        ))}
      </div>
    </div>
  );
}

