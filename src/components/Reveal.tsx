import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  variant?: "up" | "fade";
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div", variant = "up" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      // Tall blocks (e.g. the full Leadership Team grid) can never reach a 15%
      // intersection ratio in a short viewport, so scale the threshold down.
      {
        threshold: Math.min(0.15, (window.innerHeight * 0.15) / Math.max(el.offsetHeight, 1)),
        rootMargin: "0px 0px -40px 0px",
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as React.ElementType;
  const animClass = variant === "fade" ? (visible ? "reveal-fade-in" : "reveal-fade") : (visible ? "reveal-in" : "reveal");
  return (
    <Comp
      ref={ref as React.Ref<HTMLElement>}
      style={{ animationDelay: `${delay}ms` }}
      className={`${animClass} ${className}`}
    >
      {children}
    </Comp>
  );
}

export function CountUp({ to, duration = 1800, suffix = "", prefix = "", decimals = 0 }: { to: number; duration?: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const factor = Math.pow(10, decimals);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(to * eased * factor) / factor);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, factor]);

  return <span ref={ref}>{prefix}{value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
}
