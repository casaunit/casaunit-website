import { Unit } from "@/types/unit";
import { units as seedUnits } from "@/data/seed/units";

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

/**
 * Inventory source of truth for v1.
 *
 * If AIRTABLE_BASE_ID + AIRTABLE_API_KEY are set, units are pulled live
 * from your Airtable base (the same account used for leads) — add,
 * edit, or remove a row there and it shows up here within `revalidate`
 * seconds, no redeploy needed. Until those env vars are set, this falls
 * back to the placeholder seed data so the site keeps working.
 *
 * Swapping this for a real database later means rewriting the body of
 * this one file — every page that calls getAllUnits/getUnitsByCity/
 * getUnitBySlug stays unchanged.
 */
async function fetchFromAirtable(): Promise<Unit[] | null> {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;
  const table = process.env.AIRTABLE_UNITS_TABLE || "Units";

  if (!baseId || !apiKey) return null;

  try {
    // Airtable caps each response at 100 records and returns an `offset`
    // token when more exist — at 30-50 units today a single page covers
    // everything, but this loop keeps fetching until Airtable stops
    // returning an offset so nothing silently disappears once inventory
    // grows past 100 units.
    const records: any[] = [];
    let offset: string | undefined;

    do {
      const url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`);
      url.searchParams.set("filterByFormula", "OR(status='available',status='coming_soon')");
      url.searchParams.set("pageSize", "100");
      if (offset) url.searchParams.set("offset", offset);

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 60 } // refresh at most once a minute
      });
      if (!res.ok) return records.length ? records.map(mapAirtableRecordToUnit) : null;

      const data = await res.json();
      records.push(...(data.records || []));
      offset = data.offset;
    } while (offset);

    return records.map(mapAirtableRecordToUnit);
  } catch {
    // Network/config issue — fail quietly to the seed fallback rather
    // than breaking the page for visitors.
    return null;
  }
}

function mapAirtableRecordToUnit(record: any): Unit {
  const f = record.fields || {};
  return {
    id: record.id,
    unitId: f.unit_id || record.id,
    slug: f.slug || record.id,
    buildingId: f.building_id || "",
    buildingName: f.building_name || "",
    city: f.city || "",
    neighbourhood: f.neighbourhood,
    unitNumber: f.unit_number,
    bedrooms: f.bedrooms ?? 0,
    bathrooms: f.bathrooms ?? 0,
    apartmentType: f.apartment_type || "1br",
    squareFeet: f.square_feet,
    monthlyRent: f.monthly_rent ?? 0,
    availableDate: f.available_date || "",
    furnished: !!f.furnished,
    parking: !!f.parking,
    petsAllowed: !!f.pets_allowed,
    utilitiesIncluded: f.utilities_included || [],
    amenities: f.amenities || [],
    descriptionEn: f.description_en || "",
    descriptionFr: f.description_fr || "",
    // Supports both Airtable attachment objects ({url, ...}) and plain
    // URL strings, so switching photo hosting to an external CDN later
    // (see README) is a data change only — never a code change.
    images: (f.images || []).map((img: any) => (typeof img === "string" ? img : img.url)),
    floorPlanUrl: Array.isArray(f.floor_plan)
      ? f.floor_plan[0]?.url
      : typeof f.floor_plan === "string"
        ? f.floor_plan
        : undefined,
    status: f.status || "available"
  };
}

export async function getAllUnits(): Promise<Unit[]> {
  const airtableUnits = await fetchFromAirtable();
  const all = airtableUnits ?? seedUnits;
  // Public-facing pages only ever show these two statuses, regardless
  // of source — Reserved/Rented units never render publicly.
  return all.filter((u) => u.status === "available" || u.status === "coming_soon");
}

export async function getUnitsByCity(city: string): Promise<Unit[]> {
  const all = await getAllUnits();
  return all.filter((u) => u.city === city);
}

export async function getUnitBySlug(slug: string): Promise<Unit | undefined> {
  const all = await getAllUnits();
  return all.find((u) => u.slug === slug);
}

export function filterUnits(units: Unit[], filters: UnitFilters): Unit[] {
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
