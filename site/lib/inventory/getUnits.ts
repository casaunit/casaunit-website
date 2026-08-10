import { ApartmentType, InternalUnit, PublicUnit, UnitStatus } from "@/types/unit";
import { units as seedUnits } from "@/data/seed/units";
import { toPublicUnit, isPubliclyVisible } from "./toPublicUnit";

export interface UnitFilters {
  city?: string;
  neighbourhood?: string;
  budgetMin?: number;
  budgetMax?: number;
  bedrooms?: string; // ApartmentType value, e.g. "1br"
  furnished?: boolean;
  parking?: boolean;
  petsAllowed?: boolean;
}

// Airtable column labels are human-friendly (what Zak sees and edits in
// the grid) and get normalized to the internal codes the rest of the
// app already uses. Keep these in sync with the "Units" table template.
const CITY_FROM_AIRTABLE: Record<string, string> = {
  Ottawa: "ottawa",
  Gatineau: "gatineau"
};

// Matches the "Apartment Type" single-select options as actually
// configured in the live base (confirmed via schema check 2026-08-10 —
// no Den variants exist there yet, but Penthouse/Other do). Left the
// Den entries mapped too in case those get added as choices later.
const APARTMENT_TYPE_FROM_AIRTABLE: Record<string, ApartmentType> = {
  Studio: "studio",
  "1 Bedroom": "1br",
  "1 Bedroom + Den": "1br_den",
  "2 Bedrooms": "2br",
  "2 Bedrooms + Den": "2br_den",
  "3 Bedrooms": "3br",
  Penthouse: "penthouse",
  Other: "other"
};

// Matches the "Status" single-select options as actually configured in
// the live base — "Paused" exists there instead of "Reserved".
const STATUS_FROM_AIRTABLE: Record<string, UnitStatus> = {
  Available: "available",
  "Coming Soon": "coming_soon",
  Reserved: "reserved",
  Rented: "rented",
  Paused: "paused"
};

function toAttachmentUrls(field: any): string[] {
  if (!Array.isArray(field)) return [];
  return field.map((item: any) => (typeof item === "string" ? item : item.url)).filter(Boolean);
}

function toFirstAttachmentUrl(field: any): string | undefined {
  const urls = toAttachmentUrls(field);
  return urls[0];
}

// "Building" and "Partner Contact" are linked-record fields in the live
// base (not plain text) — Airtable's API returns these as an array of
// linked record IDs, e.g. ["recguujeEQhzPv50H"]. That opaque record ID
// is actually a *better* internal building reference than a human-typed
// code would be: it can't be guessed at or reverse-engineered to the
// real building name, and it's still enough to correlate a lead with
// the right internal building/contact server-side.
function firstLinkedRecordId(field: any): string {
  if (!Array.isArray(field) || field.length === 0) return "";
  const first = field[0];
  return typeof first === "string" ? first : first?.id || "";
}

// "Utilities Included" is a plain text field in the live base (comma-
// separated), not a multi-select — split defensively either way.
function toStringList(field: any): string[] {
  if (Array.isArray(field)) return field.filter(Boolean);
  if (typeof field === "string") {
    return field
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeForComparison(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// The "Slug" column is free text someone types into Airtable, and it
// becomes part of the public URL (casaunit.com/apartments/<slug>) — so
// it's a real leak vector for the one rule that matters most here: the
// partner/building name must never be public. A human editing the
// sheet could easily reuse the real building name in a slug without
// thinking of it as "publishing" anything. Rather than trust that
// field blindly, reject it whenever it contains the partner building
// name and fall back to a slug built only from fields that are already
// safe to show (unit number + a short stable suffix from the record
// ID) — the same "generate, don't trust free text" approach already
// used for publicLabel in toPublicUnit.ts.
function safeSlug(f: any, recordId: string): string {
  const raw = (f["Slug"] || "").toString().trim();
  const partnerName = (f["Partner / Building Name"] || "").toString().trim();
  const rawNormalized = normalizeForComparison(raw);
  const partnerNormalized = normalizeForComparison(partnerName);
  const leaksPartnerName = partnerNormalized.length > 2 && rawNormalized.includes(partnerNormalized);

  if (raw && !leaksPartnerName) return raw;

  const unitPart = (f["Unit Number"] || f["Unit ID (Partner Ref)"] || "unit")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${unitPart}-${recordId.slice(-6).toLowerCase()}`;
}

/**
 * Inventory source of truth for v1.
 *
 * If AIRTABLE_BASE_ID + AIRTABLE_API_KEY are set, units are pulled live
 * from your Airtable base — add, edit, or remove a row there and it
 * shows up here within `revalidate` seconds, no redeploy needed. Until
 * those env vars are set, this falls back to the placeholder seed data
 * so the site keeps working.
 *
 * CRITICAL: this file is the ONLY place that ever sees InternalUnit
 * (partner/building name, exact address, etc). Every exported function
 * below returns PublicUnit — see toPublicUnit.ts — so a page or
 * component can never accidentally render a private field, no matter
 * what gets added to Airtable later.
 */
async function fetchFromAirtable(): Promise<InternalUnit[] | null> {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;
  const table = process.env.AIRTABLE_UNITS_TABLE || "Units";

  if (!baseId || !apiKey) {
    console.error(
      `[airtable] Missing config — AIRTABLE_BASE_ID: ${baseId ? "set" : "MISSING"}, AIRTABLE_API_KEY: ${apiKey ? "set" : "MISSING"}`
    );
    return null;
  }

  try {
    // Airtable caps each response at 100 records and returns an `offset`
    // token when more exist — this loop keeps fetching until Airtable
    // stops returning one, so nothing silently disappears once
    // inventory grows past 100 units. No status filter at the API level
    // on purpose: filtering (status + photosReviewed) happens in one
    // place, isPubliclyVisible(), so there's a single source of truth
    // for "is this unit allowed to be public" instead of two.
    const records: any[] = [];
    let offset: string | undefined;

    do {
      const url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`);
      url.searchParams.set("pageSize", "100");
      if (offset) url.searchParams.set("offset", offset);

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 60 } // refresh at most once a minute
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error(`[airtable] Request failed: ${res.status} ${res.statusText} — ${body.slice(0, 500)}`);
        return records.length ? records.map(mapAirtableRecordToInternalUnit) : null;
      }

      const data = await res.json();
      records.push(...(data.records || []));
      offset = data.offset;
    } while (offset);

    return records.map(mapAirtableRecordToInternalUnit);
  } catch (err) {
    // Network/config issue — fail quietly to the seed fallback rather
    // than breaking the page for visitors.
    console.error(`[airtable] Fetch threw: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

function mapAirtableRecordToInternalUnit(record: any): InternalUnit {
  const f = record.fields || {};
  return {
    id: record.id,
    unitId: f["Unit ID (Partner Ref)"] || record.id,
    slug: safeSlug(f, record.id),

    // Private — read here, but never returned by any exported function.
    // "Building" is a linked-record field pointing at the Buildings
    // table; we only ever store its opaque record ID, never fetch or
    // touch the Buildings table itself (which holds the real address,
    // owner name, etc.) from this app.
    buildingId: firstLinkedRecordId(f["Building"]),
    partnerBuildingName: f["Partner / Building Name"] || "",
    exactAddress: f["Exact Address"] || undefined,
    partnerContact: firstLinkedRecordId(f["Partner Contact"]) || undefined,
    sourceUrl: f["Source"] || undefined,
    internalNotes: f["Internal Notes"] || undefined,
    commissionInfo: f["Commission Info"] || undefined,

    city: CITY_FROM_AIRTABLE[f["City"]] || (f["City"] || "").toLowerCase(),
    neighbourhood: f["Neighbourhood (Public)"] || undefined,
    unitNumber: f["Unit Number"] || undefined,
    floor: f["Floor"] ? String(f["Floor"]) : undefined,
    bedrooms: f["Bedrooms"] ?? 0,
    bathrooms: f["Bathrooms"] ?? 0,
    apartmentType: APARTMENT_TYPE_FROM_AIRTABLE[f["Apartment Type"]] || "other",
    squareFeet: f["Square Feet"] || undefined,
    monthlyRent: f["Monthly Rent"] ?? 0,
    availableDate: f["Available Date"] || "",
    furnished: !!f["Furnished"],
    parking: !!f["Parking"],
    locker: !!f["Locker"],
    petsAllowed: !!f["Pets Allowed"],
    utilitiesIncluded: toStringList(f["Utilities Included"]),
    amenities: toStringList(f["Amenities"]),
    descriptionEn: f["Description (EN)"] || "",
    descriptionFr: f["Description (FR)"] || "",
    images: toAttachmentUrls(f["Unit Photos"]),
    commonAreaImages: toAttachmentUrls(f["Common Area Photos"]),
    floorPlanUrl: toFirstAttachmentUrl(f["Floor Plan"]),
    // Fallback is "paused" (never publicly visible), not "coming_soon"
    // (which is publicly visible) — an unrecognized or blank Status
    // value should hide a unit, not accidentally publish it.
    status: STATUS_FROM_AIRTABLE[f["Status"]] || "paused",
    photosReviewed: !!f["Photos Reviewed"]
  };
}

async function getAllInternalUnits(): Promise<InternalUnit[]> {
  const airtableUnits = await fetchFromAirtable();
  return airtableUnits ?? seedUnits;
}

export async function getAllUnits(): Promise<PublicUnit[]> {
  const all = await getAllInternalUnits();
  return all.filter(isPubliclyVisible).map(toPublicUnit);
}

export async function getUnitsByCity(city: string): Promise<PublicUnit[]> {
  const all = await getAllUnits();
  return all.filter((u) => u.city === city);
}

export async function getUnitBySlug(slug: string): Promise<PublicUnit | undefined> {
  const all = await getAllUnits();
  return all.find((u) => u.slug === slug);
}

export function filterUnits(units: PublicUnit[], filters: UnitFilters): PublicUnit[] {
  return units.filter((u) => {
    if (filters.city && u.city !== filters.city) return false;
    if (filters.neighbourhood && u.neighbourhood !== filters.neighbourhood) return false;
    if (filters.bedrooms && u.apartmentType !== filters.bedrooms) return false;
    if (filters.furnished !== undefined && u.furnished !== filters.furnished) return false;
    if (filters.parking && !u.parking) return false;
    if (filters.petsAllowed && !u.petsAllowed) return false;
    // Placeholder units carry monthlyRent = 0 and always pass price filters
    // so sample cards stay visible during development.
    if (u.monthlyRent > 0) {
      if (filters.budgetMin && u.monthlyRent < filters.budgetMin) return false;
      if (filters.budgetMax && u.monthlyRent > filters.budgetMax) return false;
    }
    return true;
  });
}
