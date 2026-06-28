import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Linkedin, Search } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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

// EDIT: replace all brother data with brotherhood-census export
const EBOARD = [
  { name: "Alexandra Reed", role: "President", brief: "Finance · '26 · NYC summer at JPM." },
  { name: "Marcus Chen", role: "VP Finance", brief: "Accounting · '26 · EY incoming." },
  { name: "Priya Patel", role: "VP Education", brief: "Marketing · '26 · case champion." },
  { name: "Jordan Williams", role: "VP Recruitment", brief: "IB · '27 · Goldman SLP." },
  { name: "Sofia Martinez", role: "VP Member Resources", brief: "OSCM · '26 · GM rotation." },
  { name: "Ethan Brooks", role: "VP Service", brief: "Risk Mgmt · '27 · CFA candidate." },
];

const LEADERSHIP = [
  { name: "Riley Thompson", role: "Director of Alumni Relations", group: "Director" },
  { name: "Sam Nakamura", role: "Director of Recruitment", group: "Director" },
  { name: "Olivia Grant", role: "Director of Professional Development", group: "Director" },
  { name: "Aiden Park", role: "Chair, Brotherhood", group: "Chair" },
  { name: "Bella Hughes", role: "Chair, Case Competition", group: "Chair" },
  { name: "Carson Lee", role: "Chair, Community Service", group: "Chair" },
  { name: "Diego Alvarez", role: "Chair, Finance", group: "Chair" },
  { name: "Emma Wright", role: "Chair, Marketing", group: "Chair" },
];

const BROTHERS = [
  "Avery Brooks '27", "Brandon Hayes '26", "Cameron Liu '28", "Devon Singh '27",
  "Elena Rivera '26", "Frances Kim '28", "Gabriel Ortiz '27", "Hannah Cole '26",
  "Isaac Morgan '28", "Julia Schwartz '27", "Kai Robinson '26", "Lily Tran '28",
  "Mason Greene '27", "Nora Bennett '26", "Owen Park '28", "Paige Sutton '27",
];

const PLEDGE_CLASSES = [
  { term: "Fall 2025", count: 22 },
  { term: "Spring 2025", count: 19 },
  { term: "Fall 2024", count: 24 },
  { term: "Spring 2024", count: 17 },
  { term: "Fall 2023", count: 21 },
];

function Brothers() {
  return (
    <>
      <section className="bg-[var(--navy)] pt-40 pb-20 text-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />The Brotherhood</p></Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-tight sm:text-7xl">
              The brothers behind <span className="italic text-[var(--gold)]">Beta Upsilon</span>.
            </h1>
          </Reveal>
          {/* EDIT: photos, names, roles, and LinkedIns populate from a future brotherhood census export */}
        </div>
      </section>

      {/* E-Board */}
      <Section eyebrow="Leadership" title="Executive Board" bg="cream">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EBOARD.map((b, i) => <BrotherCard key={b.name} {...b} delay={i * 60} />)}
        </div>
      </Section>

      {/* Leadership */}
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

      {/* Active Brothers */}
      <Section eyebrow="Roster" title="Current Brothers" bg="cream">
        <ActiveBrothers />
      </Section>

      {/* Pledge Classes */}
      <Section eyebrow="History" title="Pledge Classes" bg="navy">
        <div className="space-y-6">
          {PLEDGE_CLASSES.map((p, i) => (
            <Reveal key={p.term} delay={i * 80}>
              <div className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.06] sm:grid-cols-[200px_minmax(0,1fr)_auto]">
                <div className="aspect-[16/9] sm:aspect-[3/2] rounded-xl bg-gradient-to-br from-[var(--navy-deep)] to-[var(--ink)] grid place-items-center text-[var(--gold)]/30 font-display text-2xl sm:col-span-1 col-span-2">
                  Class Photo
                </div>
                <div className="min-w-0">
                  <p className="eyebrow">{p.term}</p>
                  <h3 className="mt-2 font-display text-2xl">{p.count} new brothers initiated</h3>
                  <p className="mt-1 text-sm text-[var(--cream)]/65">{/* EDIT: short class blurb */}A class that brought new energy, talent, and leadership to Beta Upsilon.</p>
                </div>
                <span className="hidden text-[var(--gold)] font-display text-xl sm:block">→</span>
              </div>
            </Reveal>
          ))}
        </div>
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
        <Reveal><p className="eyebrow"><span className="gold-rule" />{eyebrow}</p></Reveal>
        <Reveal delay={100}>
          <h2 className={`mt-3 font-display text-4xl font-medium sm:text-5xl ${titleColor}`}>{title}</h2>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function BrotherCard({ name, role, brief, delay = 0 }: { name: string; role: string; brief?: string; delay?: number }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0,2);
  return (
    <Reveal delay={delay}>
      <article className="group rounded-2xl border border-[var(--border)] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-deep)]">
          {/* EDIT: real headshot */}
          <div className="absolute inset-0 grid place-items-center font-display text-6xl text-[var(--gold)]/40">{initials}</div>
        </div>
        <div className="mt-5">
          <p className="text-xs uppercase tracking-widest text-[var(--gold)]">{role}</p>
          <h3 className="mt-1 font-display text-xl text-[var(--navy)]">{name}</h3>
          {brief && <p className="mt-2 text-sm text-[var(--navy)]/70">{brief}</p>}
          <a href="#" aria-label={`${name} on LinkedIn`} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[var(--navy)]/60 hover:text-[var(--gold)]">
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function ActiveBrothers() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => BROTHERS.filter(b => b.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  return (
    <>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--navy)]/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search brothers…"
          className="w-full rounded-full border border-[var(--border)] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[var(--gold)]"
        />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((b) => (
          <div key={b} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-white px-5 py-4 hover:border-[var(--gold)] transition">
            <span className="text-[var(--navy)] truncate">{b}</span>
            <Linkedin className="h-4 w-4 text-[var(--navy)]/50 shrink-0" />
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-[var(--navy)]/60">No matches.</p>}
      </div>
    </>
  );
}
