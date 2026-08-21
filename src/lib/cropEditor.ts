/**
 * TEMPORARY HEADSHOT CROP EDITOR
 *
 * Visit /brothers?crop=1 to drag (pan) and scroll (zoom) any headshot until the
 * person is framed exactly how you want. Adjustments are saved in your browser
 * only. When everything looks right, hit "Copy crop code" in the bottom bar and
 * paste the result into src/lib/headshotFocus.ts (replacing the HEADSHOT_CROP
 * object) to lock the crops in for everyone.
 */
import { useEffect, useState } from "react";
import { HEADSHOT_CROP, type CropRect } from "./headshotFocus";

const KEY = "akpsi.headshotCrops.v1";
const EVT = "akpsi:crops-changed";

export type CropMode = "sq" | "lg";
export type Overrides = Record<string, Partial<Record<CropMode, CropRect>>>;

export function loadOverrides(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Overrides;
  } catch {
    return {};
  }
}

export function saveOverride(slug: string, mode: CropMode, rect: CropRect) {
  const all = loadOverrides();
  all[slug] = { ...all[slug], [mode]: rect.map((n) => Math.round(n * 1e4) / 1e4) as CropRect };
  window.localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function clearOverrides() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVT));
}

/** True when the page is opened with ?crop=1 (client-side only). */
export function useCropEditing(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(new URLSearchParams(window.location.search).get("crop") === "1");
  }, []);
  return on;
}

export function useOverrides(): Overrides {
  const [ov, setOv] = useState<Overrides>({});
  useEffect(() => {
    const sync = () => setOv(loadOverrides());
    sync();
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
  }, []);
  return ov;
}

const fmt = (r: CropRect) => `[${r.map((n) => Number(n.toFixed(4))).join(", ")}]`;

/** Full HEADSHOT_CROP source, base data merged with local edits. */
export function buildExport(): string {
  const ov = loadOverrides();
  const slugs = Array.from(new Set([...Object.keys(HEADSHOT_CROP), ...Object.keys(ov)])).sort();
  const lines = slugs.map((s) => {
    const base = HEADSHOT_CROP[s];
    const sq = ov[s]?.sq ?? base?.sq ?? ([0, 0, 1, 1] as CropRect);
    const lg = ov[s]?.lg ?? base?.lg ?? ([0, 0, 1, 1] as CropRect);
    return `  "${s}": { sq: ${fmt(sq)}, lg: ${fmt(lg)} },`;
  });
  return `export const HEADSHOT_CROP: Record<string, { sq: CropRect; lg: CropRect }> = {\n${lines.join("\n")}\n};`;
}

/** Largest centered crop of the target aspect that fits inside the image. */
export function defaultRect(naturalW: number, naturalH: number, targetAspect: number): CropRect {
  const imgAspect = naturalW / naturalH;
  let w = 1;
  let h = 1;
  if (imgAspect > targetAspect) w = targetAspect / imgAspect;
  else h = imgAspect / targetAspect;
  return [(1 - w) / 2, (1 - h) / 2, w, h];
}
