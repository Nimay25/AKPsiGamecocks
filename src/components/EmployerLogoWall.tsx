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

/** Floating side rails: logos drift gently along the left and right edges, behind the headline. */
export function EmployerLogoRail({ side }: { side: "left" | "right" }) {
  const half = Math.ceil(EMPLOYER_LOGOS.length / 2);
  const logos =
    side === "left" ? EMPLOYER_LOGOS.slice(0, half) : EMPLOYER_LOGOS.slice(half);

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 z-0 hidden w-[22%] flex-col items-center justify-around py-8 md:flex ${
        side === "left" ? "left-0 pl-4 lg:pl-10" : "right-0 pr-4 lg:pr-10"
      }`}
    >
      {logos.map((logo, i) => (
        <div
          key={logo.name}
          className="baw-float pointer-events-auto flex items-center justify-center"
          style={{
            animation: `baw-float ${12 + i * 1.6}s ease-in-out ${
              i * 1.1 + (side === "right" ? 0.7 : 0)
            }s infinite`,
          }}
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
