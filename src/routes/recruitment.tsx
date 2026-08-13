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

const INTEREST_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdIa5t7v2V8rRZnS7kRX45UBErzlWMh0bIEZJg80e0c7zz2Fw/viewform";
const REMIND_URL = "https://www.remind.com/join/akpsi2025";

// Before August 17, 2026 the primary CTA is the Coffee Chat/Interest Form.
// On or after that date it switches to the Fall 2026 Rush application (same link this cycle).
const RUSH_OPENS_AT = new Date("2026-08-17T00:00:00-04:00");
function primaryCta() {
  const now = new Date();
  return now >= RUSH_OPENS_AT
    ? { text: "Apply for Fall 2026 Rush", href: INTEREST_FORM_URL }
    : { text: "Fall 2026 Coffee Chat/Interest Form", href: INTEREST_FORM_URL };
}

const SCHEDULE = [
  { title: "Info Session", dress: "Casual", date: "Aug 27", time: "7-8:30pm", location: "Russell House 207", tier: null },
  { title: "Speed Dating", dress: "Business Casual", date: "Aug 31", time: "7-9pm", location: "Pastides Alumni Center", tier: null },
  { title: "Mingling", dress: "Business Casual", date: "Sep 1", time: "7-9pm", location: "Russell House 207", tier: null },
  { title: "Case Competition", dress: "Business Professional", date: "Sep 2", time: "Private Screening", location: "Invite Only", tier: "bronze" },
  { title: "Passion Pitch", dress: "Business Professional", date: "Sep 3", time: "Private Screening", location: "Invite Only", tier: "silver" },
  { title: "Final Interview", dress: "Business Professional", date: "Sep 4", time: "Private Screening", location: "Invite Only", tier: "gold" },
] as const;



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
      <section className="bg-[var(--cream)] py-14 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Why Rush</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium text-[var(--navy)] sm:text-5xl">
              The role of a lifetime.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-[var(--navy)]/75 leading-relaxed">
              Pledging AKPSI is a transformative semester of professional
              workshops, mentorship from older brothers, case competitions, and
              friendships that outlast every bullet point on your resume.
              Here are a few tips from our recruitment team as you come out to rush!
            </p>
          </Reveal>

          {/* Ariana */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="aspect-[4/3] rounded-2xl bg-[var(--navy)]/5 flex items-center justify-center border border-[var(--border)]">
                <Clapperboard className="h-12 w-12 text-[var(--gold)]/40" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative">
                <span className="absolute -top-4 -left-2 font-display text-6xl text-[var(--gold)]/20">&ldquo;</span>
                <p className="relative text-[var(--navy)] leading-relaxed">
                  Don't just think about how you want to be remembered during rush, think about who you want to become after. AKPsi opens the door to so many opportunities to grow professionally, academically, and personally, and you don't need to have it all figured out yet. Be curious, ask questions, and look for the people who inspire you to become a better version of yourself. Recruitment is just the beginning, so embrace everything you can learn from it and get excited about where it might take you!
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px w-8 bg-[var(--gold)]" />
                  <p className="text-xs uppercase tracking-widest text-[var(--navy)]/60">
                    <span className="font-semibold text-[var(--navy)]">Ariana Conroy</span> — Director of Outreach
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Amanda */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="relative">
                <span className="absolute -top-4 -left-2 font-display text-6xl text-[var(--gold)]/20">&ldquo;</span>
                <p className="relative text-[var(--navy)] leading-relaxed">
                  The best advice for recruitment I can give is to be yourself. This organization is so incredible because of the diverse group of genuine, hard-working individuals that want to help each other succeed. We are so excited to get to know all of the rushees!
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px w-8 bg-[var(--gold)]" />
                  <p className="text-xs uppercase tracking-widest text-[var(--navy)]/60">
                    <span className="font-semibold text-[var(--navy)]">Amanda Collins</span> — VP of Recruitment
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100} className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl bg-[var(--navy)]/5 flex items-center justify-center border border-[var(--border)]">
                <Film className="h-12 w-12 text-[var(--gold)]/40" />
              </div>
            </Reveal>
          </div>

          {/* Tim */}
          <div className="mt-14 max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="aspect-[21/9] rounded-2xl bg-[var(--navy)]/5 flex items-center justify-center border border-[var(--border)] mb-6">
                <Ticket className="h-10 w-10 text-[var(--gold)]/40" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-xl md:text-2xl font-display italic text-[var(--navy)] leading-relaxed">
                As someone who rushed twice, always come in with the mindset of being your best self. Being confident and authentic makes all the difference in these five days–I know it changed everything for me. Oh, and please, remember to have fun!
              </p>
              <div className="mt-5 flex flex-col items-center">
                <div className="w-12 h-px bg-[var(--gold)] mb-3" />
                <span className="font-semibold text-[var(--navy)]">Tim Woodley</span>
                <span className="text-xs uppercase tracking-widest text-[var(--navy)]/60">Director of Rush</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-[var(--ink)] py-16 md:py-24 text-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Fall 2026</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl md:text-5xl">
              Rush Schedule: The Filmstrip.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[var(--cream)]/70">
              Six auditions. One week. Will you make the cast?
            </p>
          </Reveal>

          <div className="mt-12 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SCHEDULE.map((e, i) => (
              <Reveal key={e.title} delay={i * 80} className="h-full">
                <ScheduleCard e={e} i={i} />
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      <FilmDivider />

      {/* Dress Guide */}
      <section className="bg-white py-16 md:py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Wardrobe</p></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-3 font-display text-3xl font-medium text-[var(--navy)] sm:text-4xl md:text-5xl">How to dress!</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-[var(--navy)]/70">
              If you have any doubt–lean professional.
            </p>
          </Reveal>

          {/* Business Professional */}
          <div className="mt-10 grid gap-8 md:mt-16 md:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
            <Reveal>
              <div className="grid gap-4 lg:sticky lg:top-24">
                <img src={dressPro1.url} alt="Brothers in business professional attire" className="aspect-[4/5] w-full rounded-2xl object-cover object-top shadow-[var(--shadow-soft)] sm:aspect-[4/3]" />
                <img src={dressPro2.url} alt="Brothers in business professional attire — group" className="aspect-[16/10] w-full rounded-2xl object-cover object-top shadow-[var(--shadow-soft)] sm:aspect-[16/9]" />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <p className="eyebrow"><span className="gold-rule" />Business Professional</p>
                <h3 className="mt-3 font-display text-3xl text-[var(--navy)]">Think Conservative.</h3>
                <p className="mt-3 text-[var(--navy)]/75">Navy, black, grey, or nude suit. Jacket should match pants or skirt. Closed-toe shoes, minimalistic jewelry and no overly-flashy jewelry.</p>
                <div className="mt-6 space-y-5">
                  {[
                    { name: "Feminine", body: "Soft-colored blouse or button-down under a matching blazer. Well-fitted dress pants or knee-length skirt. Closed-toe nude or black flats or pumps no higher than 3-inches." },
                    { name: "Masculine", body: "Crisp, collared button-down in solid or subtle patterns with a matching suit jacket and pants. Solid or subtly patterned tie that complements the suit and brown or black loafers or dress shoes that match the belt." },
                    { name: "Gender-Neutral", body: "Matched suit — jacket, pants, and belt in one palette. Soft solid or subtly patterned button-down. Closed-toe brown or black loafers or dress shoes. Keep accessories minimal so nothing distracts from your presence." },
                  ].map((s) => (
                    <div key={s.name} className="rounded-xl border border-[var(--border)] bg-[var(--cream)] p-5">
                      <dt className="text-xs uppercase tracking-widest text-[var(--gold)]">{s.name} Style</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-[var(--navy)]/80">{s.body}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Business Casual */}
          <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-start">
            <Reveal>
              <div>
                <p className="eyebrow"><span className="gold-rule" />Business Casual</p>
                <h3 className="mt-3 font-display text-3xl text-[var(--navy)]">Think Moderate.</h3>
                <p className="mt-3 text-[var(--navy)]/75">Brighter colors, subtle patterns, a complementary blazer or sweater. Clean and put together, but a little more flexible.</p>
                <div className="mt-6 space-y-5">
                  {[
                    { name: "Feminine", body: "Colored or patterned blouse, button down, or dress paired with a blazer, sweater, or cardigan. Pair with colored or patterned ankle-length pants or knee-length skirt. Any type of peep-toe or close-toed shoes, flats or heels four inches or less." },
                    { name: "Masculine", body: "Button-up or button-down in plain, neutral colors or pattern paired with a blazer. Neutral or colored khaki or suit pants with belt and matching dress shoes." },
                    { name: "Gender-Neutral", body: "Clean, put-together top — colored or subtly patterned — with pants that complement (khaki, nude, black, or grey) and a matching belt. Dress shoes that don't distract. Fun socks encouraged. Minimal jewelry." },
                  ].map((s) => (
                    <div key={s.name} className="rounded-xl border border-[var(--border)] bg-[var(--cream)] p-5">
                      <dt className="text-xs uppercase tracking-widest text-[var(--gold)]">{s.name} Style</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-[var(--navy)]/80">{s.body}</dd>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <img src={dressCasual.url} alt="Brothers in business casual attire in front of the AKPSI house" className="w-full rounded-2xl object-cover shadow-[var(--shadow-soft)]" />
            </Reveal>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="bg-[var(--cream)] py-16 md:py-24">
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
      <section className="relative overflow-hidden bg-[var(--ink)] py-16 md:py-24 text-[var(--cream)]">
        <div className="absolute inset-x-0 top-0 marquee-bulbs h-5 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 marquee-bulbs h-5 opacity-60" />
        <div className="mx-auto max-w-4xl px-5 sm:px-6 text-center">
          <Reveal><Ticket className="mx-auto h-10 w-10 text-[var(--gold)]" /></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl md:text-6xl">
              Your <span className="italic text-[var(--gold)]">audition</span> awaits.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={primaryCta().href} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover">
                {primaryCta().text}
              </a>
              <a href={REMIND_URL} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover">
                Get Rush Text Updates
              </a>
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
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold)] shadow-[0_0_20px_rgba(212,175,55,0.35)]">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.9)]" /> <span className="pt-0.5">Now Casting</span>
            </div>
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
            Alpha Kappa Psi
            <span className="block mt-3 text-[var(--gold)] italic">Fall 2026 Rush.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-[var(--cream)]/85 sm:text-xl">
            AKPSI is bringing Hollywood to the Soda City. Bring your best outfits,
            lots of popcorn, and your friends when we roll out the red carpet
            this semester!
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={primaryCta().href} target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover">
              {primaryCta().text} <ArrowRight className="h-4 w-4" />
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

type ScheduleEvent = (typeof SCHEDULE)[number];

const TIER_STYLES: Record<string, { metal: string; label: string; ink: string; sub: string; rule: string }> = {
  bronze: { metal: "metal-bronze", label: "Bronze", ink: "text-[#2a1408]", sub: "text-[#2a1408]/75", rule: "border-[#2a1408]/30" },
  silver: { metal: "metal-silver", label: "Silver", ink: "text-[#1b1f24]", sub: "text-[#1b1f24]/75", rule: "border-[#1b1f24]/30" },
  gold: { metal: "metal-gold", label: "Gold", ink: "text-[#241a03]", sub: "text-[#241a03]/75", rule: "border-[#241a03]/30" },
};

function ScheduleCard({ e, i }: { e: ScheduleEvent; i: number }) {
  const tier = e.tier ? TIER_STYLES[e.tier] : null;

  if (tier) {
    return (
      <div
        className={`metal-card group relative flex h-full flex-col rounded-2xl p-6 ring-1 ring-black/25 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] transition hover:-translate-y-1 ${tier.metal}`}
      >
        <div className="pointer-events-none absolute inset-[6px] rounded-xl border border-black/25" />
        <div className={`relative flex items-center justify-between ${tier.ink}`}>
          <Clapperboard className="h-5 w-5 opacity-80" />
          <span className="font-mono text-xs opacity-70">EVENT #{(i + 1).toString().padStart(2, "0")}</span>
        </div>
        <p className={`relative mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] ${tier.sub}`}>
          Private Screening · Closed Invite
        </p>
        <h3 className={`relative mt-2 font-display text-2xl ${tier.ink}`}>{e.title}</h3>
        <div className={`relative mt-2 flex items-baseline gap-2 font-mono text-sm ${tier.ink}`}>
          <span className="font-semibold">{e.date}</span>
          <span className="opacity-50">·</span>
          <span className="opacity-80">{e.time}</span>
        </div>
        <div className={`relative mt-auto flex items-center justify-between border-t pt-4 text-xs ${tier.rule} ${tier.ink}`}>
          <span className="uppercase tracking-widest font-semibold">{e.dress}</span>
          <span className="opacity-70">{e.location}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition hover:border-[var(--gold)]/70 hover:-translate-y-1">
      <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--ink)] border border-[var(--gold)]/30" />
      <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--ink)] border border-[var(--gold)]/30" />
      <div className="flex items-center justify-between">
        <Clapperboard className="h-5 w-5 text-[var(--gold)]" />
        <span className="font-mono text-xs text-[var(--cream)]/50">EVENT #{(i + 1).toString().padStart(2, "0")}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl">{e.title}</h3>
      <div className="mt-2 flex items-baseline gap-2 font-mono text-sm">
        <span className="text-[var(--gold)]">{e.date}</span>
        <span className="text-[var(--cream)]/40">·</span>
        <span className="text-[var(--cream)]/70">{e.time}</span>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-dashed border-[var(--gold)]/30 pt-4 text-xs">
        <span className="text-[var(--gold)] uppercase tracking-widest">{e.dress}</span>
        <span className="text-[var(--cream)]/40">{e.location}</span>
      </div>
    </div>
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
