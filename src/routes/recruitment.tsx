import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Ticket, Clapperboard, Film, ChevronDown, ArrowRight } from "lucide-react";
import heroMarquee from "@/assets/recruitment-hero.jpg";
import curtainsImg from "@/assets/theater-curtains.png";
import dressPro1 from "@/assets/dress-pro-1.png.asset.json";
import dressPro2 from "@/assets/dress-pro-2.png.asset.json";
import dressCasual from "@/assets/dress-casual.png.asset.json";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/recruitment")({
  head: () => ({
    meta: [
      { title: "Now Casting: Fall 2026 Rush — AKPSI Beta Upsilon" },
      { name: "description", content: "Apply to rush Alpha Kappa Psi at USC. Rush schedule, dress guide, FAQ, and the application." },
      { property: "og:title", content: "Now Casting: AKPSI Fall 2026 Rush" },
      { property: "og:description", content: "We're rolling out the red carpet — apply for Fall 2026 Rush." },
      { property: "og:url", content: "/recruitment" },
    ],
    links: [{ rel: "canonical", href: "/recruitment" }],
  }),
  component: Recruitment,
});

const APPLY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfCgCYZZ8K5KUr3uVBS8XOXzayMvuNbqIZ1XZAC8yRIBwwDmA/viewform";
const REMIND_URL = "https://www.remind.com/join/akpsi2025";

const SCHEDULE = [
  { title: "Info Session", dress: "Business Casual", desc: "Get an inside look at AKPSI — what we do, who we are, and what rush looks like.", date: "Aug 27", time: "7:00 PM" },
  { title: "Speed Dating", dress: "Business Casual", desc: "Quick, low-pressure intros with the brotherhood — meet as many brothers as you can.", date: "Aug 31", time: "TBA" },
  { title: "Mingling", dress: "Business Casual", desc: "Relaxed hangout to keep the conversations going and get to know brothers deeper.", date: "Sep 1", time: "TBA" },
  { title: "Case Competition", dress: "Business Professional", desc: "Team up on a real business case and present your recommendation to a panel.", date: "Sep 2", time: "TBA" },
  { title: "Passion Pitch", dress: "Business Professional", desc: "Three minutes, one story — pitch what drives you.", date: "Sep 3", time: "TBA" },
  { title: "Final Interview", dress: "Business Professional", desc: "One-on-one conversations with active brothers to close out the process.", date: "Sep 4", time: "TBA" },
];

const TESTIMONIALS = [
  { quote: "Pledging changed my college experience. I left rush with mentors, a job lead, and twenty new friends.", who: "Recent Pledge, Fall 2025" },
  { quote: "Look for people who are curious and kind. Polish comes second.", who: "VP Recruitment" },
  { quote: "We're not casting types — we're casting potential.", who: "Director of Recruitment" },
];

const FAQ = [
  { q: "Do I need to be a business major?", a: "Not at all. We recruit across every college at USC." },
  { q: "Is there a GPA requirement?", a: "A 2.75 cumulative GPA is required to join and stay active." },
  { q: "How should I prepare for the case competition?", a: "Read the prompt carefully, structure your recommendation around a clear problem statement, lean on quantitative reasoning, and rehearse the delivery. We value clarity and confidence over jargon." },
  { q: "Who do I contact with questions?", a: "Email Sam Nakamura (Director of Recruitment) at recruitment@akpsiuofsc.com or Jordan Williams (VPR) at vpr@akpsiuofsc.com. {/* EDIT */}" },
];

function Recruitment() {
  return (
    <>
      <CurtainHero />



      <FilmDivider />

      {/* Why Rush */}
      <section className="bg-[var(--cream)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Why Rush</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">
              The role of a lifetime.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-[var(--navy)]/75 leading-relaxed">
              Pledging AKPSI is a transformative semester of professional
              workshops, mentorship from older brothers, real case work, and
              friendships that outlast every internship line on your resume.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <blockquote className="relative h-full rounded-2xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-soft)]">
                  <div className="absolute -top-3 -left-2 font-display text-6xl text-[var(--gold)]">&ldquo;</div>
                  <p className="relative text-[var(--navy)] leading-relaxed">{t.quote}</p>
                  <footer className="mt-6 text-xs uppercase tracking-widest text-[var(--navy)]/60">— {t.who}</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-[var(--ink)] py-24 text-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Rush Schedule</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
              The filmstrip.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[var(--cream)]/70">
              Dates TBA — check back soon. All events on USC's campus unless noted.
              {/* EDIT: replace dates/locations when announced */}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SCHEDULE.map((e, i) => (
              <Reveal key={e.title} delay={i * 80}>
                <div className="group relative rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition hover:border-[var(--gold)]/70 hover:-translate-y-1">
                  {/* ticket perforation */}
                  <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--ink)] border border-[var(--gold)]/30" />
                  <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--ink)] border border-[var(--gold)]/30" />
                  <div className="flex items-center justify-between">
                    <Clapperboard className="h-5 w-5 text-[var(--gold)]" />
                    <span className="font-mono text-xs text-[var(--cream)]/50">EVENT #{(i + 1).toString().padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl">{e.title}</h3>
                  <p className="mt-2 text-sm text-[var(--cream)]/70">{e.desc}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-dashed border-[var(--gold)]/30 pt-4 text-xs">
                    <span className="text-[var(--gold)] uppercase tracking-widest">{e.dress}</span>
                    <span className="text-[var(--cream)]/40">Date TBA</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FilmDivider />

      {/* Dress Guide */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Wardrobe</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">Dress Guide.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: "Men", casual: "Polo or button-down + chinos + clean shoes.", pro: "Suit, tie, dress shoes, polished belt." },
              { name: "Women", casual: "Blouse or sweater + slacks or modest skirt + flats.", pro: "Blazer, blouse, slacks or pencil skirt, closed-toe heels or flats." },
              { name: "Gender-neutral", casual: "Tailored top + slacks/chinos + clean shoes.", pro: "Tailored suit or blazer + slacks, in any cut that fits you." },
            ].map((d, i) => (
              <Reveal key={d.name} delay={i * 80}>
                <article className="group rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--cream)]">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[var(--navy)] to-[var(--navy-deep)] grid place-items-center text-[var(--gold)]/40 font-display text-3xl">
                    {/* EDIT: photo of brothers in this attire */}
                    {d.name}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-[var(--navy)]">{d.name}</h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div>
                        <dt className="text-[var(--gold)] uppercase tracking-widest text-xs">Business Casual</dt>
                        <dd className="mt-1 text-[var(--navy)]/75">{d.casual}</dd>
                      </div>
                      <div>
                        <dt className="text-[var(--gold)] uppercase tracking-widest text-xs">Business Professional</dt>
                        <dd className="mt-1 text-[var(--navy)]/75">{d.pro}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--cream)] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Recruitment FAQ</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">Before you apply.</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
            {FAQ.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Closing CTAs */}
      <section className="relative overflow-hidden bg-[var(--ink)] py-24 text-[var(--cream)]">
        <div className="absolute inset-x-0 top-0 marquee-bulbs h-5 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 marquee-bulbs h-5 opacity-60" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal><Ticket className="mx-auto h-10 w-10 text-[var(--gold)]" /></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-5xl font-medium sm:text-6xl">
              Your <span className="italic text-[var(--gold)]">audition</span> awaits.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={APPLY_URL} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover">
                Apply for Fall 2026 Rush
              </a>
              <a href={REMIND_URL} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover">
                Get Rush Text Updates
              </a>
              {/* EDIT: swap links each cycle */}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CurtainHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 closed → 1 fully open

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Curtains open through the first 70% of scroll, then hold open
  const openP = Math.min(progress / 0.7, 1);
  const eased = 1 - Math.pow(1 - openP, 3); // easeOutCubic
  const contentP = Math.min(Math.max((openP - 0.35) / 0.5, 0), 1);

  return (
    <section
      ref={wrapRef}
      className="relative bg-[var(--ink)]"
      style={{ height: "220vh" }}
      aria-label="Now Casting Fall 2026 Rush"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden text-[var(--cream)]">
        {/* Backdrop image */}
        <img
          src={heroMarquee}
          alt="Empty theater stage lit by a single spotlight — Now Casting Fall 2026 Rush"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/10 via-[var(--ink)]/25 to-[var(--ink)]/85" />

        {/* red carpet + marquee bulbs */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-red-900 via-red-600 to-red-900 z-30" />
        <div className="absolute inset-x-0 top-3 marquee-bulbs h-5 flicker opacity-80 z-30" />
        <div className="absolute inset-x-0 bottom-3 marquee-bulbs h-5 flicker opacity-80 z-30" />
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-red-900 via-red-600 to-red-900 z-30" />

        {/* HERO content */}
        <div
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 pt-52 pb-24 text-center transition-opacity"
          style={{ opacity: contentP }}
        >
          <div className="mt-8">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-black/70 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)] shadow-[0_0_20px_rgba(212,175,55,0.35)] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.9)]" /> <span className="pt-0.5">Now Casting</span>
            </div>
          </div>
          <h1 className="mt-8 font-display text-5xl font-medium leading-[0.95] sm:text-7xl lg:text-8xl">
            Alpha Kappa Psi
            <span className="block mt-3 text-[var(--gold)] italic">Fall 2026 Rush.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[var(--cream)]/85 sm:text-xl">
            AKPSI is going full Hollywood. Bring your best outfits, lots of
            popcorn, and your friends when we roll out the red carpet this
            semester.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={APPLY_URL} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover">
              Apply for Fall 2026 <ArrowRight className="h-4 w-4" />
            </a>
            <a href={REMIND_URL} target="_blank" rel="noreferrer" className="btn-outline-light hover:bg-white/10">
              Get Rush Text Updates
            </a>
          </div>
        </div>

        {/* Curtain valance (top) — always visible, sits above curtain panels */}
        <div
          className="pointer-events-none absolute left-1/2 top-3 z-20 h-[38%] w-[120%] -translate-x-1/2 bg-no-repeat"
          style={{
            backgroundImage: `url(${curtainsImg})`,
            backgroundSize: "100% auto",
            backgroundPosition: "center top",
            WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
          }}
        />

        {/* Left curtain panel */}
        <div
          className="pointer-events-none absolute top-0 left-0 z-20 h-full w-[62%] will-change-transform"
          style={{
            transform: `translateX(${-eased * 102}%)`,
            backgroundImage: `url(${curtainsImg})`,
            backgroundSize: "170% 115%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            filter: "drop-shadow(8px 0 24px rgba(0,0,0,0.55))",
          }}
        />
        {/* Right curtain panel */}
        <div
          className="pointer-events-none absolute top-0 right-0 z-20 h-full w-[62%] will-change-transform"
          style={{
            transform: `translateX(${eased * 102}%)`,
            backgroundImage: `url(${curtainsImg})`,
            backgroundSize: "170% 115%",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
            filter: "drop-shadow(-8px 0 24px rgba(0,0,0,0.55))",
          }}
        />

        {/* Scroll hint */}
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[var(--cream)]/70 transition-opacity"
          style={{ opacity: 1 - openP }}
        >
          Scroll to open the curtains ↓
        </div>
      </div>
    </section>
  );
}

function FilmDivider() {

  return (
    <div className="relative h-10 bg-[var(--ink)]">
      <div className="film-strip absolute inset-x-0 top-0 h-10 opacity-70" />
      <Film className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-[var(--gold)]" />
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
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
