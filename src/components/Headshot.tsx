import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { HEADSHOT_CROP, headshotSlug, type CropRect } from "@/lib/headshotFocus";
import {
  buildExport,
  clearOverrides,
  defaultRect,
  saveOverride,
  useCropEditing,
  useOverrides,
  type CropMode,
} from "@/lib/cropEditor";

function styleFor(rect: CropRect | null): CSSProperties {
  if (!rect) {
    return { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" };
  }
  const [x, y, w, h] = rect;
  return {
    position: "absolute",
    width: `${(1 / w) * 100}%`,
    height: `${(1 / h) * 100}%`,
    left: `${(-x / w) * 100}%`,
    top: `${(-y / h) * 100}%`,
    maxWidth: "none",
  };
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function Headshot({ url, name, isLg, className = "" }: { url: string; name: string; isLg: boolean; className?: string }) {
  const edit = useCropEditing();
  const overrides = useOverrides();
  const slug = headshotSlug(url);
  const mode: CropMode = isLg ? "lg" : "sq";
  const stored = overrides[slug]?.[mode] ?? HEADSHOT_CROP[slug]?.[mode] ?? null;

  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [rect, setRect] = useState<CropRect | null>(stored);
  const rectRef = useRef<CropRect | null>(stored);
  const setBoth = (r: CropRect) => {
    rectRef.current = r;
    setRect(r);
  };

  useEffect(() => {
    rectRef.current = stored;
    setRect(stored);
  }, [url, mode, stored ? stored.join(",") : ""]);

  const ensureRect = (): CropRect => {
    if (rectRef.current) return rectRef.current;
    const img = imgRef.current;
    const target = isLg ? 4 / 5 : 1;
    const r = img && img.naturalWidth ? defaultRect(img.naturalWidth, img.naturalHeight, target) : ([0, 0, 1, 1] as CropRect);
    rectRef.current = r;
    return r;
  };

  const commit = (r: CropRect) => {
    setBoth(r);
    saveOverride(slug, mode, r);
  };

  // Wheel zoom (non-passive so the page doesn't scroll while adjusting).
  useEffect(() => {
    if (!edit) return;
    const el = boxRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const [x, y, w, h] = ensureRect();
      const s = clamp(Math.exp(dy * 0.0015), 0.5, 2);
      let nw = w * s;
      let nh = h * s;
      const cap = Math.min(1 / nw, 1 / nh, 1);
      nw *= cap;
      nh *= cap;
      nw = Math.max(nw, 0.08);
      nh = Math.max(nh, 0.08);
      const nx = clamp(x + (w - nw) / 2, 0, 1 - nw);
      const ny = clamp(y + (h - nh) / 2, 0, 1 - nh);
      commit([nx, ny, nw, nh]);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [edit, slug, mode]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!edit) return;
    e.preventDefault();
    const el = boxRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    const box = el.getBoundingClientRect();
    let lastX = e.clientX;
    let lastY = e.clientY;
    const move = (ev: PointerEvent) => {
      const [x, y, w, h] = ensureRect();
      const nx = clamp(x - ((ev.clientX - lastX) / box.width) * w, 0, Math.max(0, 1 - w));
      const ny = clamp(y - ((ev.clientY - lastY) / box.height) * h, 0, Math.max(0, 1 - h));
      lastX = ev.clientX;
      lastY = ev.clientY;
      commit([nx, ny, w, h]);
    };
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  };

  return (
    <div
      ref={boxRef}
      onPointerDown={onPointerDown}
      className={`absolute inset-0 ${edit ? "cursor-grab touch-none ring-2 ring-[var(--gold)]/70 active:cursor-grabbing" : ""}`}
    >
      <img
        ref={imgRef}
        src={url}
        alt={name}
        draggable={false}
        onLoad={() => {
          if (!rectRef.current) setBoth(ensureRect());
        }}
        style={styleFor(rect)}
        className={`max-w-none object-cover transition duration-300 ${className}`}
        loading="lazy"
      />
    </div>
  );
}

export function CropEditorBar() {
  const edit = useCropEditing();
  const overrides = useOverrides();
  const [copied, setCopied] = useState(false);
  if (!edit) return null;
  const count = Object.keys(overrides).length;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] flex flex-wrap items-center justify-center gap-3 border-t border-[var(--gold)]/40 bg-black/85 px-4 py-3 text-xs text-white backdrop-blur">
      <span>Crop mode: drag to move · scroll to zoom · {count} photo{count === 1 ? "" : "s"} adjusted</span>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(buildExport());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="rounded-full border border-[var(--gold)] px-3 py-1.5 text-[var(--gold)] transition hover:bg-[var(--gold)]/15"
      >
        {copied ? "Copied!" : "Copy crop code"}
      </button>
      <button
        type="button"
        onClick={() => clearOverrides()}
        className="rounded-full border border-white/30 px-3 py-1.5 text-white/70 transition hover:border-white/60"
      >
        Reset my edits
      </button>
    </div>
  );
}
