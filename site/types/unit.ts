export type ApartmentType =
  | "studio"
  | "1br"
  | "1br_den"
  | "2br"
  | "2br_den"
  | "3br"
  | "penthouse"
  | "other";

// "paused" = temporarily off-market (e.g. under renovation, pending
// paperwork) — treated the same as reserved/rented for public
// visibility: never shown, without being deleted from inventory.
export type UnitStatus = "available" | "reserved" | "rented" | "coming_soon" | "paused";

/**
 * The full inventory record, as it exists in Airtable (or any future
 * database). Carries partner/building identity and the exact address —
 * fields that must NEVER reach a page, a client component, or an API
 * response sent to the browser.
 *
 * IMPORTANT: this type is for lib/inventory/* only. Do not import
 * InternalUnit in anything under app/ or components/ — those files
 * should only ever see PublicUnit (see toPublicUnit.ts). If a page or
 * component needs to import this type, that's a sign the privacy
 * boundary is being crossed and the code needs to move server-side.
 */
export interface InternalUnit {
  id: string;
  unitId: string; // partner's own reference code, if any
  slug: string;

  // --- PRIVATE — never leaves lib/inventory ---
  buildingId: string; // opaque internal code, e.g. "GAT-001" — safe to correlate leads with, does NOT reveal the building's identity on its own
  partnerBuildingName: string; // the real building/property name, e.g. "Talisman"
  exactAddress?: string;
  partnerContact?: string;
  sourceUrl?: string;
  internalNotes?: string;
  commissionInfo?: string;
  // --- end private fields ---

  city: string; // city slug
  neighbourhood?: string; // public-safe general area only, e.g. "Hull" — never a street address
  unitNumber?: string;
  floor?: string;
  bedrooms: number;
  bathrooms: number;
  apartmentType: ApartmentType;
  squareFeet?: number;
  monthlyRent: number;
  availableDate: string; // ISO date
  furnished: boolean;
  parking: boolean;
  locker: boolean;
  petsAllowed: boolean;
  utilitiesIncluded: string[];
  amenities?: string[];
  descriptionEn: string;
  descriptionFr: string;
  images: string[]; // unit interior photos
  commonAreaImages: string[]; // gym, lobby, rooftop, etc.
  floorPlanUrl?: string;
  status: UnitStatus;
  photosReviewed: boolean; // safety gate — must be true before this unit's photos can appear publicly (see lib/inventory/toPublicUnit.ts)
  isPlaceholder?: boolean; // true = sample data, not real inventory
}

/**
 * The safe, public-facing shape. This is what every page, component,
 * and API response is allowed to touch. It deliberately does NOT
 * extend InternalUnit — building this as its own independent interface
 * means `{ ...internalUnit }` can never accidentally satisfy it, and
 * adding a new private field to InternalUnit can never silently leak
 * through here. See lib/inventory/toPublicUnit.ts for the (explicit,
 * allowlist-only) mapping between the two.
 */
export interface PublicUnit {
  id: string;
  buildingId: string; // opaque correlation key only — used to tell your CRM which internal building a lead is about, never displayed as a name
  slug: string;
  publicLabel: string; // e.g. "Unité 804" — generated from unitNumber, never the real building name
  unitNumber?: string;
  floor?: string;
  city: string;
  neighbourhood?: string;
  bedrooms: number;
  bathrooms: number;
  apartmentType: ApartmentType;
  squareFeet?: number;
  monthlyRent: number;
  availableDate: string;
  furnished: boolean;
  parking: boolean;
  locker: boolean;
  petsAllowed: boolean;
  utilitiesIncluded: string[];
  amenities?: string[];
  descriptionEn: string;
  descriptionFr: string;
  images: string[];
  commonAreaImages: string[];
  floorPlanUrl?: string;
  status: UnitStatus;
  isPlaceholder?: boolean;
}
