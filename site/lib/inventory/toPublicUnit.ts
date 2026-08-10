import { InternalUnit, PublicUnit } from "@/types/unit";

/**
 * The ONLY function allowed to turn an InternalUnit into something a
 * page/component can render. Every field is copied one by one — never
 * `{ ...internal }` — so partnerBuildingName, exactAddress,
 * partnerContact, sourceUrl, internalNotes, and commissionInfo are
 * structurally impossible to leak here: they're not in the return
 * object's shape, and there's no spread that could accidentally add
 * them back in later.
 *
 * `publicLabel` replaces the real building name for display — it's
 * generated, never stored, so there's no Airtable field an editor
 * could accidentally fill in with the real building name and have it
 * show up publicly.
 */
export function toPublicUnit(u: InternalUnit): PublicUnit {
  return {
    id: u.id,
    buildingId: u.buildingId,
    slug: u.slug,
    publicLabel: `Unité ${u.unitNumber || u.unitId}`,
    unitNumber: u.unitNumber,
    floor: u.floor,
    city: u.city,
    neighbourhood: u.neighbourhood,
    bedrooms: u.bedrooms,
    bathrooms: u.bathrooms,
    apartmentType: u.apartmentType,
    squareFeet: u.squareFeet,
    monthlyRent: u.monthlyRent,
    availableDate: u.availableDate,
    furnished: u.furnished,
    parking: u.parking,
    locker: u.locker,
    petsAllowed: u.petsAllowed,
    utilitiesIncluded: u.utilitiesIncluded,
    amenities: u.amenities,
    descriptionEn: u.descriptionEn,
    descriptionFr: u.descriptionFr,
    images: u.images,
    commonAreaImages: u.commonAreaImages,
    floorPlanUrl: u.floorPlanUrl,
    status: u.status,
    isPlaceholder: u.isPlaceholder
  };
}

/**
 * A unit is safe to show publicly only once BOTH are true:
 *  - status is "available" or "coming_soon" (existing rule — reserved/
 *    rented units already never reach the public site)
 *  - photosReviewed is true — a human has confirmed the photos don't
 *    reveal building signage, branding, or other identifying details
 *
 * An unreviewed unit simply doesn't exist publicly yet, the same way a
 * "rented" unit doesn't — nothing renders, nothing errors.
 */
export function isPubliclyVisible(u: InternalUnit): boolean {
  const statusOk = u.status === "available" || u.status === "coming_soon";
  return statusOk && u.photosReviewed === true;
}
