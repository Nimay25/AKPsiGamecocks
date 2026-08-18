import { createFileRoute } from "@tanstack/react-router";
import { Heart, Mail } from "lucide-react";
import alumniMap from "@/assets/alumni-graduation.webp";
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
  {
    q: "AKPsi equipped me with the skills to feel confident in any room, which improved my ability to lead others in a variety of situations. The brothers showed me the importance of lifelong learning, helping me to excel in my new job, where I can soak up knowledge like a sponge and feel confident suggesting new ideas to the team, despite being the youngest person on it.",
    name: "Ryan St. Clair",
    year: "2026",
    role: "",
  },
  {
    q: "AKPsi was home during a time when everything felt new and unfamiliar. What started as a group of strangers quickly became a brotherhood built on trust, support, and genuine connection. The impact of AKPsi extends far beyond my college years — it shaped how I approach my professional life and taught me the importance of community, mentorship, and building authentic relationships in the workplace.",
    name: "Ahmed Yousfi",
    year: "2023",
    role: "",
  },
  {
    q: "Among many things, AKPsi taught me that building and maintaining relationships is one of the most crucial yet rewarding skills to develop. I recommend taking the time to intentionally foster relationships in all areas of life.",
    name: "Sophia Arias",
    year: "2026",
    role: "",
  },
  {
    q: "The most important experience I gained from my time in AKPsi pertains to the impact of networking. Whether through brother interviews or mock job prep scenarios, the skills I gained have had a direct positive impact on my career trajectory since entering the workforce. The value of building and maintaining connections cannot be overstated.",
    name: "Nick Nicholson",
    year: "2020",
    role: "",
  },
];

function Alumni() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--navy)] pt-40 pb-20 text-[var(--cream)]">
        <img src={alumniMap} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/70 via-[var(--navy)]/60 to-[var(--navy)]/90" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Alumni</p></Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-tight sm:text-6xl md:text-7xl">
              Once a brother, <span className="italic text-[var(--gold)]">always</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Network map */}
      <section className="bg-[var(--navy-deep)] py-16 md:py-24 text-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />The Network</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              550+ brothers. 30 states; 15 countries.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: "Employers", items: ["JPMorgan", "McKinsey & Co.", "EY", "PwC", "Bank of America", "KPMG", "Deloitte", "Wells Fargo", "Goldman Sachs", "The Boeing Company", "Apple", "Amazon", "PepsiCo"] },
              { title: "Graduate Schools", items: ["Wharton (UPenn)", "Columbia Business School", "Harvard Law School", "Stanford Graduate School of Business", "Fuqua School of Business (Duke)", "SC Johnson (Cornell)", "Stern (NYU)", "McDonough (Georgetown)", "D'Amore-McKim (Northeastern)", "Bayes Business School (City, University of London)", "ESCP Europe", "Charles University in Prague", "Medical University of South Carolina"] },
              { title: "Industries", items: ["Investment Banking", "Consulting", "Marketing", "Defense", "Entrepreneurship", "Sourcing", "Consumer Goods", "Law", "HR Management", "Sports and Television", "Corporate Finance"] },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                  <h3 className="font-display text-xl text-[var(--gold)]">{c.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--cream)]/85">
                    {c.items.map((x) => <li key={x}>· {x}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
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
                      {t.name.split(" ").map((w: string) => w[0]).slice(0,2).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--navy)]">{t.name} <span className="text-[var(--navy)]/60 font-normal">'{t.year.slice(-2)}</span></div>
                      {t.role && <div className="text-[var(--navy)]/60 text-xs">{t.role}</div>}
                    </div>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow"><span className="gold-rule" />Stay Connected</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">Alumni mentorship program.</h2>
              <p className="mt-4 text-[var(--navy)]/75 leading-relaxed">
                Our alumni mentorship program allows brothers to learn from alumni with similar career goals–helping members navigate recruiting, grad school, and career inflection points. Reach out to get matched!
              </p>
              <div className="mt-8 text-sm">
                <a href="mailto:akpsi.bu.alumni@gmail.com" className="inline-flex items-center gap-3 text-[var(--navy)] hover:text-[var(--gold)]">
                  <Mail className="h-4 w-4 text-[var(--gold)]" />
                  <span>Sven Nielsen, Director of Alumni Relations — akpsi.bu.alumni@gmail.com</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl border border-[var(--gold)]/40 bg-gradient-to-br from-[var(--cream)] to-white p-8 shadow-[var(--shadow-soft)]">
              <Heart className="h-7 w-7 text-[var(--gold)]" />
              <p className="eyebrow mt-4">Give Back</p>
              <h3 className="mt-2 font-display text-3xl text-[var(--navy)]">Wilson A. Crone Exceptional Character Award</h3>
              <p className="mt-4 text-[var(--navy)]/75 leading-relaxed">
                The Beta Upsilon chapter of Alpha Kappa Psi invites our alumni to contribute towards the Wilson A. Crone Exceptional Character Award. This scholarship supports Beta Upsilon brothers pursuing professional development and educational opportunities. A gift of any size opens the door for our brothers. Click “Donate” to learn more about Wilson’s legacy and character.
              </p>
              <a href="https://www.gofundme.com/f/donate-to-the-wilson-a-crone-exceptional-character-award" target="_blank" rel="noopener noreferrer" className="mt-6 btn-gold btn-gold-hover">Donate</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
