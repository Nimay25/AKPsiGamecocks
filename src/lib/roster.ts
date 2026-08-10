import rosterCsv from "@/data/roster.csv?raw";

export type RosterSection = "eboard" | "director" | "chair" | "brother";

export type RosterMember = {
  section: RosterSection;
  name: string;
  role: string;
  pledgeClass: string;
  linkedin: string;
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
  const [header, ...rows] = parseCsv(rosterCsv);
  if (!header) return [];
  const idx = (key: string) => header.findIndex((h) => h.trim().toLowerCase() === key);
  const iSection = idx("section");
  const iName = idx("name");
  const iRole = idx("role");
  const iPc = idx("pledge_class");
  const iLi = idx("linkedin");

  return rows.map((r) => ({
    section: (r[iSection] ?? "brother").trim() as RosterSection,
    name: (r[iName] ?? "").trim(),
    role: (r[iRole] ?? "").trim(),
    pledgeClass: (r[iPc] ?? "").trim(),
    linkedin: (r[iLi] ?? "").trim(),
  })).filter((m) => m.name !== "");
}

export const ROSTER = loadRoster();
export const bySection = (section: RosterSection) => ROSTER.filter((m) => m.section === section);
