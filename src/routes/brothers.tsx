import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Linkedin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { bySection } from "@/lib/roster";
import darlaMoore from "@/assets/darla-moore.webp";
import pc1 from "@/assets/pc/thumbnail-img-4178_orig_1.jpg.asset.json";
import pc2 from "@/assets/pc/20241026-095236-bf5f16_orig_1.jpeg.asset.json";
import pc3 from "@/assets/pc/pc-photo_orig_2.jpeg.asset.json";
import pc4 from "@/assets/pc/img-2660_orig_1.jpg.asset.json";
import pc5 from "@/assets/pc/img-2659_orig_1.jpg.asset.json";
import pc6 from "@/assets/pc/screenshot-2023-06-26-at-9-14-17-am_orig.png.asset.json";

const PC_PHOTOS: string[] = [pc1.url, pc2.url, pc3.url, pc4.url, pc5.url, pc6.url];

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

const EBOARD = bySection("eboard");
const LEADERSHIP = [...bySection("director"), ...bySection("chair")];
const BROTHERS = bySection("brother");

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
          style={{ backgroundImage: `url(${darlaMoore})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal variant="fade"><p className="eyebrow"><span className="gold-rule" />The Brotherhood</p></Reveal>
          <Reveal variant="fade" delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-tight sm:text-6xl md:text-7xl">
              The brothers behind <span className="italic text-[var(--gold)]">Alpha Kappa Psi</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="Leadership" title="Executive Board" bg="cream">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EBOARD.map((b, i) => <BrotherCard key={b.name + b.role} name={b.name} role={b.role} delay={i * 60} />)}
        </div>
      </Section>

      <Section eyebrow="Operations" title="Leadership Team" bg="white">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {LEADERSHIP.map((b, i) => <BrotherCard key={b.name + b.role} name={b.name} role={b.role} delay={i * 60} compact />)}
        </div>
      </Section>

      <Section eyebrow="Roster" title="Current Brothers" bg="cream">
        <ActiveBrothers />
      </Section>

      <Section eyebrow="History" title="Pledge Classes" bg="navy" className="pb-8 md:pb-12">
        <PledgeCarousel />
      </Section>
    </>
  );
}

function Section({ eyebrow, title, bg, className = "", children }: { eyebrow: string; title: string; bg: "cream" | "white" | "navy"; className?: string; children: React.ReactNode }) {
  const bgClass = bg === "cream" ? "bg-[var(--cream)]" : bg === "white" ? "bg-white" : "bg-[var(--navy)] text-[var(--cream)]";
  const titleColor = bg === "navy" ? "text-[var(--cream)]" : "text-[var(--navy)]";
  return (
    <section className={`${bgClass} py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal variant="fade"><p className="eyebrow"><span className="gold-rule" />{eyebrow}</p></Reveal>
        <Reveal variant="fade" delay={100}>
          <h2 className={`mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl ${titleColor}`}>{title}</h2>
        </Reveal>
        <Reveal variant="fade" delay={200}>
          <div className="mt-12">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

function BrotherCard({ name, role, delay = 0, compact = false }: { name: string; role: string; delay?: number; compact?: boolean }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <Reveal variant="fade" delay={delay}>
      <article className={`group rounded-2xl border border-[var(--border)] bg-white transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] ${compact ? "p-3" : "p-5"}`}>
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-deep)] ${compact ? "aspect-[1/1]" : "aspect-[4/5]"}`}>
          <div className={`absolute inset-0 grid place-items-center font-display text-[var(--gold)]/40 ${compact ? "text-4xl" : "text-6xl"}`}>{initials}</div>
        </div>
        <div className={compact ? "mt-3" : "mt-5"}>
          <p className={`uppercase tracking-widest text-[var(--gold)] ${compact ? "text-[10px]" : "text-xs"}`}>{role}</p>
          <h3 className={`mt-1 font-display text-[var(--navy)] ${compact ? "text-base" : "text-xl"}`}>{name}</h3>
        </div>
      </article>
    </Reveal>
  );
}

function ActiveBrothers() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => BROTHERS.filter(b => `${b.name} ${b.pledgeClass}`.toLowerCase().includes(query.toLowerCase())),
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
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((b, i) => (
          <Reveal key={b.name + i} variant="fade" delay={i * 40}>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-white px-5 py-4 transition hover:border-[var(--gold)]">
              <p className="min-w-0 truncate text-sm text-[var(--navy)]">
                <span className="font-medium">{b.name}</span>
                <span className="text-[var(--navy)]/40"> | </span>
                <span className="text-[var(--navy)]/70">{b.pledgeClass}</span>
              </p>
              <a
                href={b.linkedin || "#"}
                target={b.linkedin ? "_blank" : undefined}
                rel={b.linkedin ? "noreferrer" : undefined}
                aria-label={`${b.name} on LinkedIn`}
                className="shrink-0 text-[var(--navy)]/50 hover:text-[var(--gold)]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        ))}
        {filtered.length === 0 && <p className="text-sm text-[var(--navy)]/60">No matches.</p>}
      </div>
    </>
  );
}

/** Photo carousel runs independently of the pledge-class selector. */
function PledgeCarousel() {
  const [i, setI] = useState(0);
  const [photo, setPhoto] = useState(0);
  const total = PLEDGE_CLASSES.length;
  const current = PLEDGE_CLASSES[i]!;
  const photos = PC_PHOTOS.length;
  const goPhoto = (dir: number) => setPhoto((p) => (p + dir + photos) % photos);

  useEffect(() => {
    const id = setInterval(() => setPhoto((p) => (p + 1) % photos), 5000);
    return () => clearInterval(id);
  }, [photos]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex justify-center">
        <div className="relative inline-block">
          <img
            key={PC_PHOTOS[photo]}
            src={PC_PHOTOS[photo]}
            alt="Alpha Kappa Psi pledge class photo"
            className="block h-auto w-auto max-h-[min(52vh,460px)] max-w-full rounded-2xl animate-[fadeIn_0.6s_ease]"
          />
          {/* preload remaining photos */}
          <div className="hidden">
            {PC_PHOTOS.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goPhoto(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-[var(--cream)] backdrop-blur transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goPhoto(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/50 text-[var(--cream)] backdrop-blur transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* photo thumbnails */}
      <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
        {PC_PHOTOS.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setPhoto(idx)}
            aria-label={`Show photo ${idx + 1}`}
            className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition ${
              idx === photo ? "border-[var(--gold)] opacity-100" : "border-white/15 opacity-60 hover:opacity-90"
            }`}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>


      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-display text-2xl text-[var(--cream)]">
          {current.term} <span className="text-[var(--cream)]/40">|</span>{" "}
          <span className="text-[var(--gold)]">{current.pc}</span>
        </p>
        <p className="text-xs uppercase tracking-widest text-[var(--cream)]/55">
          Rush Theme: <span className="text-[var(--cream)]/85">{current.theme}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {PLEDGE_CLASSES.map((p, idx) => (
          <button
            key={p.pc}
            type="button"
            onClick={() => setI(idx)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              idx === i
                ? "border-[var(--gold)] text-[var(--gold)]"
                : "border-white/15 text-[var(--cream)]/60 hover:border-white/40"
            }`}
          >
            {p.term}
          </button>
        ))}
      </div>
      <p className="sr-only">{total} pledge classes</p>
    </div>
  );
}
