import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Users, BookOpen, Shield, HandHeart, Sparkles } from "lucide-react";
import aboutBrothers from "@/assets/about-brothers.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AKPSI Beta Upsilon at USC" },
      { name: "description", content: "Our chapter, mission, pillars, and commitment to diversity at USC." },
      { property: "og:title", content: "About AKPSI Beta Upsilon" },
      { property: "og:description", content: "Learn about Beta Upsilon's mission, pillars, and DOI commitment." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const PILLARS = [
  { icon: Users, title: "Brotherhood", text: "A bond beyond business — built through shared work, mentorship, and friendship that outlasts graduation." },
  { icon: BookOpen, title: "Knowledge", text: "We learn relentlessly — through case studies, professional speakers, and rigorous peer review." },
  { icon: Shield, title: "Integrity", text: "Every brother is trusted to represent Beta Upsilon and AKPSI with honesty and accountability." },
  { icon: HandHeart, title: "Service", text: "We invest in our Columbia community and AKPSI's national philanthropy partners." },
  { icon: Sparkles, title: "Unity", text: "Every major, every background, one chapter. Difference is our edge." },
];

const FAQS = [
  { q: "What is Alpha Kappa Psi?", a: "Alpha Kappa Psi is the oldest and largest co-ed professional business fraternity in the United States, founded in 1904. Beta Upsilon is our chapter at the University of South Carolina." },
  { q: "Who can join?", a: "Any USC student in good academic standing, of any major or year. We welcome candidates from every college on campus." },
  { q: "Is it only for business majors?", a: "No — about a third of our brothers are non-business majors. We value intellectual diversity, not your transcript header." },
  { q: "What's the time commitment?", a: "Pledging requires roughly 8–10 hours per week. Active membership averages 4–6 hours, with optional events and committees." },
  { q: "Is there a GPA requirement?", a: "AKPSI requires a 2.75 cumulative GPA to join and remain active." },
  { q: "What about dues?", a: "Dues cover national fees, professional events, formal, and chapter operations. Specific amounts and payment plans are reviewed during rush." },
  { q: "How do I rush?", a: "Visit our Recruitment page for the full Fall 2026 schedule, dress guide, and application link." },
];

function About() {
  return (
    <>
      <section className="relative pt-40 pb-20 bg-[var(--navy)] text-[var(--cream)] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow"><span className="gold-rule" />About</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-tight sm:text-7xl">
              A professional fraternity, <span className="italic text-[var(--gold)]">reimagined</span> for South Carolina.
            </h1>
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
                <p className="text-sm text-[var(--navy)]/60 italic">
                  Stats below refresh each semester — current figures are
                  placeholder for this redesign.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { n: "150+", l: "Active Brothers" },
                  { n: "3.81", l: "Average GPA" },
                  { n: "71%", l: "Out-of-State" },
                ].map((s) => (
                  <div key={s.l} className="border-t border-[var(--gold)]/40 pt-4">
                    <div className="font-display text-3xl text-[var(--navy)]">{s.n}</div>
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

      {/* Pillars */}
      <section id="pillars" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow"><span className="gold-rule" />Our Pillars</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">
              The values that shape every brother.
            </h2>
          </Reveal>
          {/* EDIT: confirm the official five pillars wording with VPE */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-8 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                  <p.icon className="h-7 w-7 text-[var(--gold)]" />
                  <h3 className="mt-5 font-display text-2xl text-[var(--navy)]">{p.title}</h3>
                  <p className="mt-3 text-[var(--navy)]/75 leading-relaxed">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOI */}
      <section id="doi" className="bg-[var(--navy)] py-24 text-[var(--cream)]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Diversity, Opportunity &amp; Inclusion</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
              Every brother belongs here.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--cream)]/80 leading-relaxed">
              Beta Upsilon is committed to building a chapter that reflects the
              world our brothers will lead in. We actively recruit, mentor, and
              support members of every background, identity, and lived experience —
              because brotherhood without inclusion isn't brotherhood at all.
            </p>
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
          <p className="px-6 pb-6 text-[var(--navy)]/75 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}
