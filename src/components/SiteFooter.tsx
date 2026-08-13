import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";
import logoAsset from "@/assets/akpsi-logo-hd.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--navy)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="mb-4 grid h-14 w-14 place-items-center rounded-xl bg-[var(--cream)] p-2">
              <img src={logoAsset.url} alt="Alpha Kappa Psi Beta Upsilon logo" className="h-full w-full object-contain" />
            </span>
            <div className="font-display text-2xl font-semibold">
              Alpha Kappa Psi <span className="text-[var(--gold)]">·</span> Beta Upsilon
            </div>
            <p className="mt-3 max-w-md text-sm text-[var(--cream)]/70">
              USC's premier co-ed professional business fraternity. Developing
              principled business leaders nationally since 1904; at South
              Carolina since 2007.
            </p>
            <div className="mt-6 flex gap-3">
              {/* EDIT: real social links */}
              <a href="https://instagram.com/akpsi_usc" target="_blank" rel="noreferrer"
                 className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-[var(--gold)] hover:text-[var(--navy)] transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-[var(--gold)] hover:text-[var(--navy)] transition">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="eyebrow">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[var(--gold)]">About</Link></li>
              <li><Link to="/brothers" className="hover:text-[var(--gold)]">Brothers</Link></li>
              <li><Link to="/recruitment" className="hover:text-[var(--gold)]">Recruitment</Link></li>
              <li><Link to="/alumni" className="hover:text-[var(--gold)]">Alumni</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--gold)]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow">Get in touch</div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--cream)]/80">
              <li>
                <a href="mailto:soakpsi@mailbox.sc.edu" className="hover:text-[var(--gold)]">
                  Get in Touch → soakpsi@mailbox.sc.edu
                </a>
              </li>
              <li>University of South Carolina</li>
              <li>Columbia, SC</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[var(--cream)]/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Alpha Kappa Psi, Beta Upsilon Chapter · University of South Carolina.</p>
          <p>
            Powered by <span className="text-[var(--gold)]">AKPSI Productions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
