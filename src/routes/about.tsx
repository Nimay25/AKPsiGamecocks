import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import aboutBrothers from "@/assets/photos/pledge-roses-1.jpg";
import mooreAtrium from "@/assets/moore-atrium.jpg.asset.json";
import doiDirector from "@/assets/doi-director.jpg.asset.json";
import { Reveal, CountUp } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AKPSI Beta Upsilon at USC" },
      { name: "description", content: "Our chapter, mission, and commitment to diversity at USC." },
      { property: "og:title", content: "About AKPSI Beta Upsilon" },
      { property: "og:description", content: "Learn about Beta Upsilon's mission and DOI commitment." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const PILLARS = [
  { title: "Brotherhood", text: "An extensive network of principled peers and mentors built through shared work, mentorship programs, and bonds that stand the test of time." },
  { title: "Integrity", text: "Maintaining high ethical standards in all facets of life." },
  { title: "Service", text: "Improving the communities around us all across the globe." },
  { title: "Unity", text: "Every major. Every background. One chapter." },
  { title: "Knowledge", text: "Dedication to lifelong learning in and out of the classroom." },
];

const FAQS = [
  {
    q: "Why Alpha Kappa Psi?",
    a: "While this means something different to every brother, Alpha Kappa Psi is:\n\n• The most successful professional business fraternity at the University of South Carolina, winning the #1 professional organization award nineteen years running.\n• Our brothers and alumni are deeply entrenched in the professional world, from traditional placements in investment banking and Big Four consulting to law, public health, sports management, and technology. If you have an interest, we have someone with the experience to get you there.\n• We pride ourselves on organizational and study-specific diversity, being open to all majors: simply put, business is better when high achieving individuals of ALL disciplines can learn from one another.",
  },
  { q: "Who can join?", a: "Alpha Kappa Psi is open to all University of South Carolina students, regardless of major or organizational involvement." },
  { q: "Is it only for business majors?", a: "No—about [X]% of our brothers are non-business majors. We look for driven candidates, regardless of major or industry focus." },
  { q: "How do I rush?", a: "Visit our Recruitment page for the full Fall 2026 schedule, dress guide, and application link!" },
  { q: "What do I get out of joining?", a: "You join a lifelong network of principled business leaders. Members gain access to mentorship from alumni across every industry, professional development workshops, interview prep, exclusive recruiting events, leadership opportunities, and a tight-knit community that supports you long after graduation." },
];

function About() {
  const [nimayClicks, setNimayClicks] = useState(0);
  const handleNimayClick = () => {
    const next = nimayClicks + 1;
    setNimayClicks(next);
    if (next >= 15) {
      window.open("https://www.instagram.com/nimay_anki", "_blank", "noopener,noreferrer");
      setNimayClicks(0);
    }
  };

  return (
    <>
      <section className="relative pt-40 pb-20 text-[var(--cream)] overflow-hidden min-h-[80vh] flex items-end">
        <div className="absolute inset-0 -z-10">
          <img src={mooreAtrium.url} alt="Darla Moore School of Business atrium" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/85 via-[var(--navy)]/70 to-[var(--navy)]/90" />
        </div>
        <div className="mx-auto max-w-7xl px-6 w-full">
          <Reveal>
            <p className="eyebrow"><span className="gold-rule" />About</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[1.1] sm:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              Shaping{"\u00a0"}people,{"\u00a0"}<br />Shaping{"\u00a0"}business{"\u00a0"}<span className="text-[var(--gold)]"> since 2007</span>
            </h1>
            <div className="mt-8 h-1 w-24 bg-[var(--gold)]" />
          </Reveal>
        </div>
      </section>


      {/* Our Chapter */}
      <section id="chapter" className="bg-[var(--cream)] py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow"><span className="gold-rule" />Our Chapter</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">
                History &amp; Mission.
              </h2>
              <div className="mt-6 space-y-5 text-[var(--navy)]/80 leading-relaxed">
                <p>
                  Alpha Kappa Psi was founded on October 5, 1904 at New York
                  University. Today it is America's oldest and largest co-ed
                  professional business fraternity, with more than 300,000
                  initiated members worldwide. {/* EDIT: confirm chapter founding date */}
                </p>
                <p>
                  Beta Upsilon was chartered at the University of South Carolina
                  to develop principled business leaders. We do that through
                  professional development, service, and a brotherhood of
                  driven peers from every major on campus.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { n: 150, suffix: "+", l: "Active Brothers" },
                  { n: 3.91, suffix: "", l: "Average GPA", decimals: 2 },
                  { n: 71, suffix: "%", l: "Out-of-State" },
                ].map((s) => (
                  <div key={s.l} className="border-t border-[var(--gold)]/40 pt-4">
                    <div className="font-display text-3xl text-[var(--navy)] tabular-nums">
                      <CountUp to={s.n} suffix={s.suffix} decimals={s.decimals ?? 0} />
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-[var(--navy)]/60">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(10,31,68,0.4)]">
              <img src={aboutBrothers} alt="Beta Upsilon brothers holding yellow roses" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" className="relative bg-[var(--navy-deep)] py-24 text-[var(--cream)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal><p className="eyebrow"><span className="gold-rule" />Our Pillars</p></Reveal>
              <Reveal delay={100}>
                <h2 className="mt-3 max-w-xl font-display text-4xl font-medium sm:text-5xl">
                  Five values. One brotherhood.
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-white/10 bg-[var(--navy)]/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)] hover:bg-[var(--navy)]/60 hover:shadow-[0_10px_40px_-10px_rgba(200,162,75,0.35)]">
                  <div className="font-display text-sm uppercase tracking-widest text-[var(--gold)] transition-colors">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium text-[var(--cream)] transition-colors">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--cream)]/70 transition-colors">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOI */}
      <section id="doi" className="bg-[var(--navy)] py-24 text-[var(--cream)]">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <Reveal><p className="eyebrow"><span className="gold-rule" />Diversity, Opportunity &amp; Inclusion</p></Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
                Every brother belongs here.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <blockquote className="mt-8 max-w-xl border-l-2 border-[var(--gold)] pl-6">

                <p className="font-display text-2xl leading-snug text-[var(--cream)] sm:text-3xl">
                  "No brother should feel like they have to leave part of themselves at the door."
                </p>
                <footer className="mt-4 text-xs uppercase tracking-widest text-[var(--gold)]">
                  -Nimay Ankireddypalli, Director of DOI
                </footer>
              </blockquote>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <figure className="relative mx-auto w-full max-w-[320px]">
              <div className="rounded-2xl border-4 border-[var(--gold)] p-1.5 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
                <div className="overflow-hidden rounded-xl border border-[var(--gold)]/60">
                  <img
                    src={doiDirector.url}
                    alt="Director of Diversity, Opportunity and Inclusion"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="bg-[var(--cream)] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />FAQ</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const lines = a.split("\n").filter(Boolean);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-lg text-[var(--navy)]">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[var(--gold)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-[var(--navy)]/75 leading-relaxed space-y-3">
            {lines.map((line, i) =>
              line.startsWith("•") ? (
                <div key={i} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span>{line.replace(/^•\s*/, "")}</span>
                </div>
              ) : (
                <p key={i}>{line}</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
