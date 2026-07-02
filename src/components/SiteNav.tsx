import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/photos/akpsi-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/brothers", label: "Brothers" },
  { to: "/recruitment", label: "Recruitment" },
  { to: "/alumni", label: "Alumni" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { state } = useRouter();
  const isRecruitment = state.location.pathname === "/recruitment";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBase = isRecruitment
    ? "bg-gradient-to-r from-red-950 via-red-900 to-red-950"
    : "bg-[var(--navy)]";

  const scrolledBg = isRecruitment
    ? "bg-gradient-to-r from-red-950 via-red-900 to-red-950/95 backdrop-blur-md shadow-[0_2px_20px_rgba(153,27,27,0.35)]"
    : "bg-[var(--navy)]/92 backdrop-blur-md shadow-[0_2px_20px_rgba(10,31,68,0.25)]";

  return (
    <>
      <header
        className={`sticky inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? scrolledBg : headerBase
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--cream)] p-1.5">
              <img src={logo} alt="AKPSI" className="h-full w-full object-contain" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-[var(--cream)]">
              AKΨ <span className="text-[var(--gold)]">·</span> Beta Upsilon
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-[var(--cream)]/85 transition hover:text-[var(--gold)]"
                activeProps={{ className: "text-[var(--gold)]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/recruitment" className="btn-gold btn-gold-hover text-sm">
              Rush Fall 2026
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full text-[var(--cream)] hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } ${isRecruitment ? "bg-gradient-to-b from-red-900 to-red-950" : "bg-[var(--navy)]"}`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-lg text-[var(--cream)]">AKΨ · Beta Upsilon</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--cream)] hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-2 px-8 pt-12">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-[var(--cream)] py-3 border-b border-white/10 hover:text-[var(--gold)]"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/recruitment" onClick={() => setOpen(false)} className="btn-gold btn-gold-hover mt-8 self-start">
            Rush Fall 2026
          </Link>
        </div>
      </div>
    </>
  );
}
