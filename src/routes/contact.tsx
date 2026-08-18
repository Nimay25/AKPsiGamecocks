import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Instagram, Send } from "lucide-react";
import contactClassroom from "@/assets/contact-classroom.webp";
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

const DIRECTORY = [
  { role: "President", name: "Grace Johnson", email: "akpsipresident.by@gmail.com" },
  { role: "VP of Finance", name: "Cooper Johnston", email: "akpsifinance.by@gmail.com" },
  { role: "VP of Recruitment", name: "Amanda Collins", email: "recruitment@akpsigamecocks.com" },
  { role: "Director of Alumni Relations", name: "Sven Nielsen", email: "akpsi.bu.alumni@gmail.com" },
  { role: "Director of Inter-Chapter Relations", name: "Gabriel Giusti", email: "connectbetaupsilon@gmail.com" },
];

function Contact() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 text-[var(--cream)] min-h-[70vh] flex items-end">
        <div className="absolute inset-0 -z-10">
          <img src={contactClassroom} alt="Classroom at the Darla Moore School of Business" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/80 via-[var(--navy)]/60 to-[var(--navy)]/85" />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 w-full">
          <Reveal><p className="eyebrow"><span className="gold-rule" />Contact</p></Reveal>
          <Reveal delay={100}>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-tight sm:text-6xl md:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
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
                  <a href="mailto:soakpsi@mailbox.sc.edu" className="hover:text-[var(--gold)]">soakpsi@mailbox.sc.edu</a>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 text-[var(--gold)]" />
                  <a href="https://instagram.com/akpsigamecocks" className="hover:text-[var(--gold)]" target="_blank" rel="noreferrer">
                    @akpsigamecocks
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

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxufqjtd1aHoNNhuAzK-ObjCA_aYNAuivzXHeagTYgYk_nMTsqnUGYcXO5AVQlaJ4oJ7Q/exec";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(form.email)) next.email = "Please enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-soft)]" noValidate>
      <p className="eyebrow"><span className="gold-rule" />Send a Message</p>
      <h2 className="mt-3 font-display text-3xl text-[var(--navy)] sm:text-4xl">Get in touch.</h2>

      <div className="mt-8 space-y-5">
        <Field label="Name" value={form.name} onChange={update("name")} error={errors.name} />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} error={errors.email} />
        <Field label="Subject" value={form.subject} onChange={update("subject")} error={errors.subject} />
        <div>
          <label className="text-xs uppercase tracking-widest text-[var(--navy)]/60">Message</label>
          <textarea
            value={form.message}
            onChange={update("message")}
            rows={5}
            maxLength={2000}
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--cream)]/40 px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
        </div>
      </div>

      <button type="submit" disabled={status === "sending"} className="mt-8 btn-gold btn-gold-hover disabled:opacity-60 disabled:cursor-not-allowed">
        <Send className="h-4 w-4" />
        {status === "sending" ? "Sending…" : status === "success" ? "Sent" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="mt-4 text-sm text-green-700">Thanks — we'll be in touch soon.</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">
          Something went wrong. Please email us directly at{" "}
          <a href="mailto:soakpsi@mailbox.sc.edu" className="underline hover:text-[var(--gold)]">soakpsi@mailbox.sc.edu</a>.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-[var(--navy)]/60">{label}</label>
      <input
        {...props}
        maxLength={200}
        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--cream)]/40 px-4 py-3 text-sm outline-none focus:border-[var(--gold)]"
        aria-invalid={!!error}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

