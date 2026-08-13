import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Instagram, Send } from "lucide-react";
import contactClassroom from "@/assets/contact-classroom.jpg.asset.json";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AKPSI Beta Upsilon at USC" },
      { name: "description", content: "Get in touch with Beta Upsilon leadership at the University of South Carolina." },
      { property: "og:title", content: "Contact AKPSI Beta Upsilon" },
      { property: "og:description", content: "Reach the chapter, the e-board, and leadership." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

// EDIT: real names and emails
const DIRECTORY = [
  { role: "President", name: "Alexandra Reed", email: "president@akpsiuofsc.com" },
  { role: "VP Finance", name: "Marcus Chen", email: "vpf@akpsiuofsc.com" },
  { role: "VP Education", name: "Priya Patel", email: "vpe@akpsiuofsc.com" },
  { role: "VP Recruitment", name: "Jordan Williams", email: "vpr@akpsiuofsc.com" },
  { role: "Director of Alumni Relations", name: "Riley Thompson", email: "alumni@akpsiuofsc.com" },
];

function Contact() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 text-[var(--cream)] min-h-[70vh] flex items-end">
        <div className="absolute inset-0 -z-10">
          <img src={contactClassroom.url} alt="Classroom at the Darla Moore School of Business" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/80 via-[var(--navy)]/60 to-[var(--navy)]/85" />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 w-full">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Contact</p></Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-tight sm:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              Say <span className="italic text-[var(--gold)]">hello</span>.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[var(--cream)]/90">
              Questions about rush, alumni mentorship, sponsorships, or anything else?
              We'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={150}>
            <div>
              <p className="eyebrow"><span className="gold-rule" />Directory</p>
              <h2 className="mt-3 font-display text-3xl text-[var(--navy)] sm:text-4xl">Reach the right brother.</h2>

              <ul className="mt-8 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
                {DIRECTORY.map((d) => (
                  <li key={d.role} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[var(--gold)]">{d.role}</div>
                      <div className="font-display text-lg text-[var(--navy)]">{d.name}</div>
                    </div>
                    <a href={`mailto:${d.email}`} className="inline-flex items-center gap-2 text-sm text-[var(--navy)]/75 hover:text-[var(--gold)]">
                      <Mail className="h-4 w-4" /> {d.email}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-3 text-sm text-[var(--navy)]/80">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[var(--gold)]" />
                  <a href="mailto:akpsibetaupsilon@gmail.com" className="hover:text-[var(--gold)]">akpsibetaupsilon@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 text-[var(--gold)]" />
                  <a href="https://instagram.com/akpsi_usc" className="hover:text-[var(--gold)]" target="_blank" rel="noreferrer">
                    @akpsi_usc
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[var(--gold)]" />
                  <span>University of South Carolina · Columbia, SC</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open user's mail client as a simple, dependency-free handler.
    // EDIT: wire to a real form handler (Formspree, edge function, etc.)
    const body = `Name: ${form.name}%0AEmail: ${form.email}%0A%0A${encodeURIComponent(form.message)}`;
    window.location.href = `mailto:akpsibetaupsilon@gmail.com?subject=${encodeURIComponent(form.subject || "Website inquiry")}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-soft)]">
      <p className="eyebrow"><span className="gold-rule" />Send a Message</p>
      <h2 className="mt-3 font-display text-3xl text-[var(--navy)] sm:text-4xl">Get in touch.</h2>

      <div className="mt-8 space-y-5">
        <Field label="Name" value={form.name} onChange={update("name")} required />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
        <Field label="Subject" value={form.subject} onChange={update("subject")} />
        <div>
          <label className="text-xs uppercase tracking-widest text-[var(--navy)]/60">Message</label>
          <textarea
            value={form.message}
            onChange={update("message")}
            rows={5}
            required
            maxLength={2000}
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--cream)]/40 px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
          />
        </div>
      </div>

      <button type="submit" className="mt-8 btn-gold btn-gold-hover">
        <Send className="h-4 w-4" /> {sent ? "Opened mail client" : "Send Message"}
      </button>
    </form>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-[var(--navy)]/60">{label}</label>
      <input
        {...props}
        maxLength={200}
        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--cream)]/40 px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
      />
    </div>
  );
}
