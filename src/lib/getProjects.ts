import fs from "fs";
import path from "path";

/* ── raw row (internal only) ─────────────────────────────────── */
interface RawOrder {
  contractNo: string;
  orderDate: string;
  status: string;
  ministry: string;
  organisation: string;
  brand: string;
  item: string;
}

/* ── public shape (one card per org-month) ───────────────────── */
export interface MergedProject {
  /** "Apr 2023", "Mar 2026", etc. */
  monthYear: string;
  ministry: string;
  organisation: string;
  /** All distinct item strings from that org in that month */
  items: string[];
  /** Corresponding brand for each item (parallel array) */
  brands: string[];
  /** Latest status across merged rows */
  status: string;
}

/* ── CSV parser ──────────────────────────────────────────────── */
function parseCSVRow(row: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === "," && !inQuotes) { fields.push(current.trim()); current = ""; }
    else { current += ch; }
  }
  fields.push(current.trim());
  return fields;
}

/* ── text cleaning ───────────────────────────────────────────── */
function stripGarbage(s: string): string {
  s = s.replace(/[\u0900-\u097F\uFFFD\uE000-\uF8FF\u0080-\u00BF]+/g, "");
  // eslint-disable-next-line no-control-regex
  s = s.replace(/[^\x00-\x7F]+/g, "");
  return s.trim();
}

function extractMinistry(raw: string): string {
  return stripGarbage(raw.split("|")[0]);
}

function extractOrganisation(raw: string): string {
  const match = raw.match(/Organisation Name\s*[:|]\s*([^|]+)/i);
  if (!match) return "";
  let org = stripGarbage(match[1]);
  org = org.replace(/\s*(office zone|kaya.*|n\/a|\bna\b).*/i, "");
  return org.trim();
}

/* ── date helpers ────────────────────────────────────────────── */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function toMonthYear(dateStr: string): string {
  // Formats seen: "05-Mar-2026", "12-Apr-2023", "17-Apr-2024"
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const mon = parts[1]; // "Mar"
    const yr  = parts[2]; // "2026"
    if (MONTHS.includes(mon) && yr.length === 4) return `${mon} ${yr}`;
  }
  return dateStr; // fallback: keep raw
}

/* ── parse rows from one file ────────────────────────────────── */
function parseRows(lines: string[], hasBrandFirst: boolean): RawOrder[] {
  const rows: RawOrder[] = [];
  for (const line of lines) {
    const cols = parseCSVRow(line);
    const contractNo = cols[0]?.trim() ?? "";
    if (!contractNo.startsWith("GEMC")) continue;

    const brand = hasBrandFirst ? (cols[6] ?? "") : (cols[8] ?? "");
    const item  = hasBrandFirst ? (cols[7] ?? "") : (cols[6] ?? "");
    const rawDept = cols[4] ?? "";

    rows.push({
      contractNo,
      orderDate:    cols[1]?.trim() ?? "",
      status:       cols[2]?.trim() ?? "",
      ministry:     extractMinistry(rawDept),
      organisation: extractOrganisation(rawDept),
      brand:        stripGarbage(brand),
      item:         stripGarbage(item),
    });
  }
  return rows;
}

/* ── merge: group by (organisation || ministry) + month-year ─── */
function mergeOrders(rows: RawOrder[]): MergedProject[] {
  const map = new Map<string, MergedProject>();

  for (const row of rows) {
    const org = row.organisation || row.ministry;
    const my  = toMonthYear(row.orderDate);
    const key = `${org}__${my}`;

    if (!map.has(key)) {
      map.set(key, {
        monthYear:    my,
        ministry:     row.ministry,
        organisation: row.organisation,
        items:        [],
        brands:       [],
        status:       row.status,
      });
    }

    const entry = map.get(key)!;

    // Only add if this item text isn't already represented
    const itemNorm = row.item.trim().toLowerCase();
    const alreadyPresent = entry.items.some(
      (existing) => existing.trim().toLowerCase() === itemNorm
    );
    if (!alreadyPresent && row.item.trim()) {
      entry.items.push(row.item.trim());
      entry.brands.push(row.brand.trim());
    }

    // Prefer "Accepted" or "Delivered" over empty
    if (row.status) entry.status = row.status;
  }

  return Array.from(map.values());
}

/* ── public entry point ──────────────────────────────────────── */
export async function getProjects(): Promise<MergedProject[]> {
  const dataDir = path.join(process.cwd(), "projects-data");

  const files = [
    { name: "PRAVARTEE SALES PVT LTD (2025-2026) - March.csv", brandFirst: true  },
    { name: "PRAVARTEE SALES PVT LTD (2024-2025) - April.csv", brandFirst: false },
    { name: "PRAVARTEE SALES PVT LTD 2023-2024 - Aprl.csv",    brandFirst: false },
  ];

  const all: RawOrder[] = [];

  for (const file of files) {
    const csvPath = path.join(dataDir, file.name);
    if (!fs.existsSync(csvPath)) continue;
    const raw = fs.readFileSync(csvPath, "utf-8");
    const lines = raw.split(/\r?\n/).filter(Boolean).slice(1);
    all.push(...parseRows(lines, file.brandFirst));
  }

  return mergeOrders(all);
}