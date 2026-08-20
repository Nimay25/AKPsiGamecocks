/**
 * ROSTER DATA PIPELINE
 *
 * The Brothers page is powered by src/data/roster.csv.
 * Vite imports the raw CSV here and parses it at build time, so the finished
 * site contains only the parsed data — the CSV itself is never served to
 * visitors and cannot be edited by the public.
 *
 * To update members:
 *   1. Edit src/data/roster.csv in your editor (or Excel/Sheets, then paste back).
 *   2. Commit and push to GitHub.
 *   3. Redeploy on Vercel (or your host). The new build will pick up the CSV.
 *
 * Note: This is NOT a live database. Changes only appear after a new deploy.
 */
import rosterCsv from "@/data/roster.csv?raw";

export type RosterSection = "eboard" | "director" | "chair" | "brother";

export type RosterMember = {
  section: RosterSection;
  name: string;
  role: string;
  pledgeClass: string;
  linkedin: string;
  headshot: string;
};

/** Minimal CSV parser: handles quoted fields and commas inside quotes. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else quoted = false;
      } else field += ch;
      continue;
    }
    if (ch === '"') { quoted = true; continue; }
    if (ch === ",") { row.push(field); field = ""; continue; }
    if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; continue; }
    if (ch === "\r") continue;
    field += ch;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

function loadRoster(): RosterMember[] {
  // Strip the "//" guide comments at the top of the CSV before parsing.
  const cleaned = rosterCsv
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
  const [header, ...rows] = parseCsv(cleaned);
  if (!header) return [];
  const idx = (key: string) => header.findIndex((h) => h.trim().toLowerCase() === key);
  const iSection = idx("section");
  const iName = idx("name");
  const iRole = idx("role");
  const iPc = idx("pledge_class");
  const iLi = idx("linkedin");
  const iHeadshot = idx("headshot");

  const members = rows.map((r) => ({
    section: (r[iSection] ?? "brother").trim() as RosterSection,
    name: (r[iName] ?? "").trim(),
    role: (r[iRole] ?? "").trim(),
    pledgeClass: (r[iPc] ?? "").trim(),
    linkedin: (r[iLi] ?? "").trim(),
    headshot: (r[iHeadshot] ?? "").trim(),
  })).filter((m) => m.name !== "");

  // Exec/leadership rows omit LinkedIn + pledge class; inherit them from the
  // matching "brother" row so every card links correctly.
  const byName = new Map<string, RosterMember>();
  // Fallback key tolerates nicknames/spellings (e.g. "Chris" vs "Christopher").
  const key2 = (n: string) => {
    const parts = n.toLowerCase().split(/\s+/).filter(Boolean);
    const last = parts[parts.length - 1] ?? "";
    return `${parts[0]?.[0] ?? ""}|${last}`;
  };
  const byLoose = new Map<string, RosterMember>();
  for (const m of members) {
    if (m.section !== "brother") continue;
    byName.set(m.name.toLowerCase(), m);
    byLoose.set(key2(m.name), m);
  }
  for (const m of members) {
    const base = byName.get(m.name.toLowerCase()) ?? byLoose.get(key2(m.name));
    if (!base || base === m) continue;
    if (!m.linkedin) m.linkedin = base.linkedin;
    if (!m.pledgeClass) m.pledgeClass = base.pledgeClass;
    if (!m.headshot) m.headshot = base.headshot;
  }
  return members;
}


export const ROSTER = loadRoster();
export const bySection = (section: RosterSection) => ROSTER.filter((m) => m.section === section);
