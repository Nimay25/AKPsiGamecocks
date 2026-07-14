import { createFileRoute } from "@tanstack/react-router";
import { Heart, Mail, ExternalLink } from "lucide-react";
import alumniMap from "@/assets/alumni-graduation.jpg.asset.json";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni — AKPSI Beta Upsilon" },
      { name: "description", content: "Beta Upsilon's alumni network, mentorship program, and the Crone Scholarship." },
      { property: "og:title", content: "AKPSI Beta Upsilon Alumni Network" },
      { property: "og:description", content: "A nationwide network of Beta Upsilon brothers." },
      { property: "og:url", content: "/alumni" },
    ],
    links: [{ rel: "canonical", href: "/alumni" }],
  }),
  component: Alumni,
});

const QUOTES = [
  { q: "AKPSI taught me how to interview before I even had something to interview for.", who: "Maya Chen '21", role: "Senior Analyst, JPMorgan" },
  { q: "My favorite memory is bid day on the steps with my pledge class — still my closest friends.", who: "Justin Park '20", role: "Strategy, Boeing" },
  { q: "Say yes to everything pledging asks of you. The relationships are the entire point.", who: "Sophie Reyes '22", role: "Consultant, EY" },
  { q: "I've hired three Beta Upsilon brothers since graduating. The pipeline is real.", who: "Tyler Brooks '18", role: "VP, Wells Fargo" },
];

function Alumni() {
  return (
    <>
      <section className="bg-[var(--navy)] pt-40 pb-20 text-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Alumni</p></Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-tight sm:text-7xl">
              Once a brother, <span className="italic text-[var(--gold)]">always</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Network map */}
      <section className="relative overflow-hidden bg-[var(--navy-deep)] py-24 text-[var(--cream)]">
        <img src={alumniMap.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)]/70 to-[var(--navy-deep)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />The Network</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium sm:text-5xl">
              500+ brothers. 40 states. One chapter family.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: "Employers", items: ["JPMorgan", "EY", "PwC", "Goldman Sachs", "Boeing", "Wells Fargo", "Bank of America", "PepsiCo"] },
              { title: "Grad Schools", items: ["Wharton", "Booth", "Darden", "Kenan-Flagler", "Duke Fuqua", "Tuck", "Ross"] },
              { title: "Industries", items: ["Investment Banking", "Consulting", "Tech", "Marketing", "Operations", "Public Policy", "Law"] },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                  <h3 className="font-display text-xl text-[var(--gold)]">{c.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--cream)]/85">
                    {c.items.map((x) => <li key={x}>· {x}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--cream)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Their Words</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">
              How AKPSI prepared us.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {QUOTES.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <blockquote className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-soft)]">
                  <p className="font-display text-xl leading-relaxed text-[var(--navy)]">&ldquo;{t.q}&rdquo;</p>
                  <footer className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4 text-sm">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--navy)] text-[var(--gold)] font-display">
                      {t.who.split(" ").map(w => w[0]).slice(0,2).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--navy)]">{t.who}</div>
                      <div className="text-[var(--navy)]/60 text-xs">{t.role}</div>
                    </div>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow"><span className="gold-rule" />Stay Connected</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">Alumni Mentorship Program.</h2>
              <p className="mt-4 text-[var(--navy)]/75 leading-relaxed">
                Our alumni mentorship pairs brothers across decades — helping
                actives navigate recruiting, grad school, and career inflection
                points. Reach out to get matched.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[var(--gold)]" />
                  <span>Riley Thompson, Director of Alumni Relations — alumni@akpsiuofsc.com</span>
                  {/* EDIT */}
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-[var(--navy)] hover:text-[var(--gold)]">
                  <ExternalLink className="h-4 w-4 text-[var(--gold)]" /> AKPSI Beta Upsilon Alumni Facebook
                </a>
                <a href="#" className="inline-flex items-center gap-2 text-[var(--navy)] hover:text-[var(--gold)]">
                  <ExternalLink className="h-4 w-4 text-[var(--gold)]" /> Alumni Weekend — info coming soon
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl border border-[var(--gold)]/40 bg-gradient-to-br from-[var(--cream)] to-white p-8 shadow-[var(--shadow-soft)]">
              <Heart className="h-7 w-7 text-[var(--gold)]" />
              <p className="eyebrow mt-4">Give Back</p>
              <h3 className="mt-2 font-display text-3xl text-[var(--navy)]">The Crone Scholarship</h3>
              <p className="mt-4 text-[var(--navy)]/75 leading-relaxed">
                The Crone Scholarship supports Beta Upsilon brothers pursuing
                professional development and educational opportunities. Every
                gift, of every size, opens a door for a future brother.
              </p>
              <a href="#" className="mt-6 btn-gold btn-gold-hover">Donate</a>
              {/* EDIT: real donation link */}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
