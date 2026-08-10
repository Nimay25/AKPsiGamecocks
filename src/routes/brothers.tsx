import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Linkedin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import darlaMoore from "@/assets/darla-moore.jpg.asset.json";

export const Route = createFileRoute("/brothers")({
  head: () => ({
    meta: [
      { title: "Brothers — AKPSI Beta Upsilon" },
      { name: "description", content: "Meet the Executive Board, Leadership, and Active Brothers of Beta Upsilon." },
      { property: "og:title", content: "Brothers of Beta Upsilon" },
      { property: "og:description", content: "Our Executive Board, leadership team, and active brotherhood." },
      { property: "og:url", content: "/brothers" },
    ],
    links: [{ rel: "canonical", href: "/brothers" }],
  }),
  component: Brothers,
});

const EBOARD = [
  { name: "John Doe", role: "President" },
  { name: "Jane Doe", role: "VP Finance" },
  { name: "John Smith", role: "VP Education" },
  { name: "Jane Smith", role: "VP Recruitment" },
  { name: "Alex Doe", role: "VP Member Resources" },
  { name: "Sam Doe", role: "VP Service" },
];

const LEADERSHIP = [
  { name: "Placeholder One", role: "Director of Alumni Relations", group: "Director" },
  { name: "Placeholder Two", role: "Director of Recruitment", group: "Director" },
  { name: "Placeholder Three", role: "Director of Professional Development", group: "Director" },
  { name: "Placeholder Four", role: "Chair, Brotherhood", group: "Chair" },
  { name: "Placeholder Five", role: "Chair, Case Competition", group: "Chair" },
  { name: "Placeholder Six", role: "Chair, Community Service", group: "Chair" },
  { name: "Placeholder Seven", role: "Chair, Finance", group: "Chair" },
  { name: "Placeholder Eight", role: "Chair, Marketing", group: "Chair" },
];

const BROTHERS = [
  { name: "John Doe", pc: "Beta Omicron" },
  { name: "Jane Doe", pc: "Beta Xi" },
  { name: "John Smith", pc: "Beta Nu" },
  { name: "Jane Smith", pc: "Beta Mu" },
  { name: "Alex Doe", pc: "Beta Lambda" },
  { name: "Sam Doe", pc: "Beta Kappa" },
  { name: "Chris Doe", pc: "Beta Iota" },
  { name: "Pat Doe", pc: "Beta Theta" },
  { name: "Taylor Doe", pc: "Beta Omicron" },
  { name: "Jordan Doe", pc: "Beta Xi" },
  { name: "Morgan Doe", pc: "Beta Nu" },
  { name: "Casey Doe", pc: "Beta Mu" },
  { name: "Riley Doe", pc: "Beta Lambda" },
  { name: "Avery Doe", pc: "Beta Kappa" },
  { name: "Quinn Doe", pc: "Beta Iota" },
  { name: "Reese Doe", pc: "Beta Theta" },
];

const PLEDGE_CLASSES = [
  { term: "Fall 2026", pc: "Beta Omicron", theme: "Hollywood" },
  { term: "Spring 2026", pc: "Beta Xi", theme: "The Beatles" },
  { term: "Fall 2025", pc: "Beta Nu", theme: "Shark Tank" },
  { term: "Spring 2025", pc: "Beta Mu", theme: "Space Jam" },
  { term: "Fall 2024", pc: "Beta Lambda", theme: "Festival" },
  { term: "Spring 2024", pc: "Beta Kappa", theme: "Golf" },
  { term: "Fall 2023", pc: "Beta Iota", theme: "Golden Ticket" },
  { term: "Spring 2023", pc: "Beta Theta", theme: "Monopoly" },
  { term: "Fall 2022", pc: "Beta Eta", theme: "Postcard" },
  { term: "Spring 2022", pc: "Beta Zeta", theme: "Aliens" },
  { term: "Fall 2021", pc: "Beta Epsilon", theme: "NCAA / ESPN" },
  { term: "Spring 2021", pc: "Beta Delta", theme: "Reaching New Heights" },
  { term: "Fall 2020", pc: "Beta Gamma", theme: "Play Your Cards Right" },
  { term: "Spring 2020", pc: "Beta Beta", theme: "Survivor" },
  { term: "Fall 2019", pc: "Beta Alpha", theme: "Stranger Things" },
  { term: "Spring 2019", pc: "Alpha Omega", theme: "Find Your Perfect Playlist" },
  { term: "Fall 2018", pc: "Alpha Psi", theme: "The Voice" },
  { term: "Spring 2018", pc: "Alpha Chi", theme: "Light the Fire" },
  { term: "Fall 2017", pc: "Alpha Phi", theme: "Find Your Greatness" },
  { term: "Spring 2017", pc: "Alpha Upsilon", theme: "Think Different" },
  { term: "Fall 2016", pc: "Alpha Tau", theme: "Invest in Yourself" },
  { term: "Spring 2016", pc: "Alpha Sigma", theme: "The Wolf of Greene Street" },
  { term: "Fall 2015", pc: "Alpha Rho", theme: "I'm a Business, Man" },
];

function Brothers() {
  return (
    <>
      <section className="relative pt-40 pb-20 text-[var(--cream)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${darlaMoore.url})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal variant="fade"><p className="eyebrow"><span className="gold-rule" />The Brotherhood</p></Reveal>
          <Reveal variant="fade" delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-tight sm:text-7xl">
              The brothers behind <span className="italic text-[var(--gold)]">Alpha Kappa Psi</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="Leadership" title="Executive Board" bg="cream">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EBOARD.map((b, i) => <BrotherCard key={b.name} {...b} delay={i * 60} />)}
        </div>
      </Section>

      <Section eyebrow="Operations" title="Leadership Team" bg="white">
        <h3 className="font-display text-xl text-[var(--navy)]">Directors</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.filter(l => l.group === "Director").map((b, i) => (
            <BrotherCard key={b.name} {...b} delay={i * 60} />
          ))}
        </div>
        <h3 className="mt-16 font-display text-xl text-[var(--navy)]">Chairs</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.filter(l => l.group === "Chair").map((b, i) => (
            <BrotherCard key={b.name} {...b} delay={i * 60} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Roster" title="Current Brothers" bg="cream">
        <ActiveBrothers />
      </Section>

      <Section eyebrow="History" title="Pledge Classes" bg="navy">
        <PledgeCarousel />
      </Section>
    </>
  );
}

function Section({ eyebrow, title, bg, children }: { eyebrow: string; title: string; bg: "cream" | "white" | "navy"; children: React.ReactNode }) {
  const bgClass = bg === "cream" ? "bg-[var(--cream)]" : bg === "white" ? "bg-white" : "bg-[var(--navy)] text-[var(--cream)]";
  const titleColor = bg === "navy" ? "text-[var(--cream)]" : "text-[var(--navy)]";
  return (
    <section className={`${bgClass} py-24`}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="fade"><p className="eyebrow"><span className="gold-rule" />{eyebrow}</p></Reveal>
        <Reveal variant="fade" delay={100}>
          <h2 className={`mt-3 font-display text-4xl font-medium sm:text-5xl ${titleColor}`}>{title}</h2>
        </Reveal>
        <Reveal variant="fade" delay={200}>
          <div className="mt-12">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

function BrotherCard({ name, role, delay = 0 }: { name: string; role: string; delay?: number }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <Reveal variant="fade" delay={delay}>
      <article className="group rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-deep)]">
          <div className="absolute inset-0 grid place-items-center font-display text-6xl text-[var(--gold)]/40">{initials}</div>
        </div>
        <div className="mt-5">
          <p className="text-xs uppercase tracking-widest text-[var(--gold)]">{role}</p>
          <h3 className="mt-1 font-display text-xl text-[var(--navy)]">{name}</h3>
        </div>
      </article>
    </Reveal>
  );
}

function ActiveBrothers() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => BROTHERS.filter(b => `${b.name} ${b.pc}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  return (
    <>
      <Reveal variant="fade">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--navy)]/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brothers…"
            className="w-full rounded-full border border-[var(--border)] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[var(--gold)]"
          />
        </div>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((b, i) => {
          const initials = b.name.split(" ").map(n => n[0]).join("").slice(0, 2);
          return (
            <Reveal key={b.name + i} variant="fade" delay={i * 40}>
              <article className="rounded-2xl border border-[var(--border)] bg-white p-4 transition hover:-translate-y-1 hover:border-[var(--gold)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-deep)]">
                  <div className="absolute inset-0 grid place-items-center font-display text-5xl text-[var(--gold)]/40">{initials}</div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate text-sm text-[var(--navy)]">
                    <span className="font-medium">{b.name}</span>
                    <span className="text-[var(--navy)]/40"> | </span>
                    <span className="text-[var(--navy)]/70">{b.pc}</span>
                  </p>
                  <a href="#" aria-label={`${b.name} on LinkedIn`} className="shrink-0 text-[var(--navy)]/50 hover:text-[var(--gold)]">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
        {filtered.length === 0 && <p className="text-sm text-[var(--navy)]/60">No matches.</p>}
      </div>
    </>
  );
}

function PledgeCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 900), behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous pledge classes"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-[var(--cream)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next pledge classes"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-[var(--cream)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PLEDGE_CLASSES.map((p) => (
          <figure
            key={p.pc}
            className="w-[280px] shrink-0 snap-start sm:w-[360px]"
          >
            <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--navy-deep)] to-[var(--ink)] grid place-items-center font-display text-xl text-[var(--gold)]/30">
              Class Photo
            </div>
            <figcaption className="mt-4">
              <p className="font-display text-lg text-[var(--cream)]">
                {p.term} <span className="text-[var(--cream)]/40">|</span> <span className="text-[var(--gold)]">{p.pc}</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[var(--cream)]/55">{p.theme}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
