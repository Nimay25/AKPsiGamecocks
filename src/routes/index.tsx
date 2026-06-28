import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Building2, Instagram } from "lucide-react";
import heroCampus from "@/assets/photos/chapter-mckissick.jpg";
import gallery1 from "@/assets/photos/brothers-house.jpg";
import gallery2 from "@/assets/photos/pledge-roses-1.jpg";
import gallery3 from "@/assets/photos/pledge-roses-2.jpg";
import gallery4 from "@/assets/photos/pledge-stairs.jpg";
import gallery5 from "@/assets/photos/marquee-real.jpg";
import gallery6 from "@/assets/photos/chapter-mckissick.jpg";
import { Reveal, CountUp } from "@/components/Reveal";

const GALLERY = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Kappa Psi · Beta Upsilon — USC's Premier Professional Fraternity" },
      { name: "description", content: "Voted #1 professional business fraternity at USC for 18 consecutive years. Develop professionalism, leadership, and lifelong networks." },
      { property: "og:title", content: "Alpha Kappa Psi · Beta Upsilon at USC" },
      { property: "og:description", content: "USC's premier co-ed professional business fraternity." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const PILLARS = [
  { title: "Brotherhood", text: "A lifelong network of principled peers and mentors." },
  { title: "Knowledge", text: "Workshops, case studies, and real-world business exposure." },
  { title: "Integrity", text: "Doing the right thing — always, even when no one's watching." },
  { title: "Service", text: "Giving back to Columbia and our national philanthropy partners." },
  { title: "Unity", text: "One chapter, every major, every background." },
];




function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <img
          src={heroCampus}
          alt="AKPSI brothers in business professional attire on USC's historic campus"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--navy-deep)]/85 via-[var(--navy)]/70 to-[var(--navy)]/90" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-28 pb-20 md:px-10">
          <Reveal>
            <p className="eyebrow text-[var(--gold)]">
              <span className="gold-rule" />
              Beta Upsilon · Est. at the University of South Carolina
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.95] text-[var(--cream)] sm:text-6xl lg:text-7xl">
              Alpha Kappa Psi
              <span className="block text-[var(--gold)] italic font-normal">Beta Upsilon.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--cream)]/85 sm:text-xl">
              USC's premier, co-ed, professional fraternity — creating opportunities
              to develop professionalism, foster leadership, build networks, and
              enhance the individual abilities of our members.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/recruitment" className="btn-gold btn-gold-hover">
                Rush Fall 2026 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/about" className="btn-outline-light hover:bg-white/10">
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--cream)]/50 text-xs tracking-[0.3em] uppercase">
          Scroll
        </div>
      </section>

      {/* AWARD BADGE BAND */}
      <section className="bg-[var(--navy)] py-14 text-[var(--cream)]">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <Award className="mx-auto h-10 w-10 text-[var(--gold)]" />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 eyebrow">A Trophy Earned · Eighteen Times Over</p>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Voted the <span className="text-[var(--gold)]">#1 Professional Business Fraternity</span> at the University of South Carolina —
              <span className="italic"> 18 consecutive years.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[var(--cream)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: 150, suffix: "+", label: "Active Brothers" },
              { n: 18, label: "Years #1 at USC" },
              { n: 90, suffix: "%+", label: "Internship Placement" },
              { n: 500, suffix: "+", label: "Alumni Network" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="border-t border-[var(--gold)]/40 pt-6">
                  <div className="font-display text-6xl font-medium text-[var(--navy)] tabular-nums">
                    <CountUp to={s.n} suffix={s.suffix ?? ""} />
                  </div>
                  <p className="mt-2 text-sm uppercase tracking-widest text-[var(--navy)]/70">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>




      {/* PILLARS PREVIEW */}
      <section className="bg-[var(--navy)] py-24 text-[var(--cream)]">
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
            <Reveal delay={200}>
              <Link to="/about" className="text-sm uppercase tracking-widest text-[var(--gold)] hover:underline">
                Read more →
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.06] hover:-translate-y-1">
                  <div className="font-display text-sm uppercase tracking-widest text-[var(--gold)]">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--cream)]/70">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-[var(--cream)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow"><span className="gold-rule" />Latest</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">
                Follow <span className="text-[var(--gold)]">@akpsi_usc</span>
              </h2>
            </div>
            <a
              href="https://instagram.com/akpsi_usc"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)] hover:text-[var(--gold)]"
            >
              <Instagram className="h-4 w-4" /> Open Instagram
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {GALLERY.map((src, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="aspect-square overflow-hidden rounded-xl relative group">
                  <img src={src} alt="Beta Upsilon brotherhood moment" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-[var(--navy)]/0 group-hover:bg-[var(--navy)]/30 transition" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RUSH CTA */}
      <section className="relative overflow-hidden bg-[var(--ink)] py-24 text-[var(--cream)]">
        <div className="absolute inset-x-0 top-0 marquee-bulbs h-4 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 marquee-bulbs h-4 opacity-60" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Building2 className="mx-auto h-9 w-9 text-[var(--gold)]" />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 eyebrow">Now Casting</p>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="mt-3 font-display text-5xl font-medium sm:text-6xl">
              Fall 2026 <span className="italic text-[var(--gold)]">Rush.</span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--cream)]/75">
              We're rolling out the red carpet this semester. Find your seat
              under the marquee — and step onto the stage.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <Link to="/recruitment" className="mt-10 btn-gold btn-gold-hover">
              Explore Recruitment <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
