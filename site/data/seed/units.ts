import { InternalUnit } from "@/types/unit";

/**
 * PLACEHOLDER DATA — NOT REAL INVENTORY.
 *
 * These records exist only so the homepage and listing components have
 * something to render during development. Every entry is flagged
 * `isPlaceholder: true` and the UI shows a visible "sample data" notice
 * whenever placeholder units are displayed.
 *
 * Even though this is fake data, it's still typed as InternalUnit and
 * passed through the same toPublicUnit() projection as real Airtable
 * records (see lib/inventory/getUnits.ts) — so the placeholder path
 * exercises the exact same privacy boundary real inventory will.
 *
 * Replace this file (or point it at Airtable — see README) with real
 * unit data before launch.
 */
export const units: InternalUnit[] = [
  {
    id: "unit_sample_1",
    unitId: "SAMPLE-001",
    slug: "sample-2-bedroom-den-gatineau",
    buildingId: "SAMPLE-BLDG-1",
    partnerBuildingName: "[Sample Building — placeholder, never shown publicly]",
    exactAddress: undefined,
    city: "gatineau",
    neighbourhood: "[Neighbourhood]",
    unitNumber: "204",
    floor: "2",
    bedrooms: 2,
    bathrooms: 2,
    apartmentType: "2br_den",
    squareFeet: 1025,
    monthlyRent: 0,
    availableDate: "",
    furnished: false,
    parking: true,
    locker: false,
    petsAllowed: false,
    utilitiesIncluded: [],
    descriptionEn: "Sample listing placeholder — replace with real unit details.",
    descriptionFr: "Exemple de logement — à remplacer par de vraies données.",
    images: [],
    commonAreaImages: [],
    status: "coming_soon",
    photosReviewed: true,
    isPlaceholder: true
  },
  {
    id: "unit_sample_2",
    unitId: "SAMPLE-002",
    slug: "sample-1-bedroom-ottawa",
    buildingId: "SAMPLE-BLDG-2",
    partnerBuildingName: "[Sample Building — placeholder, never shown publicly]",
    exactAddress: undefined,
    city: "ottawa",
    neighbourhood: "[Neighbourhood]",
    unitNumber: "512",
    floor: "5",
    bedrooms: 1,
    bathrooms: 1,
    apartmentType: "1br",
    squareFeet: 650,
    monthlyRent: 0,
    availableDate: "",
    furnished: false,
    parking: false,
    locker: false,
    petsAllowed: false,
    utilitiesIncluded: [],
    descriptionEn: "Sample listing placeholder — replace with real unit details.",
    descriptionFr: "Exemple de logement — à remplacer par de vraies données.",
    images: [],
    commonAreaImages: [],
    status: "coming_soon",
    photosReviewed: true,
    isPlaceholder: true
  },
  {
    id: "unit_sample_3",
    unitId: "SAMPLE-003",
    slug: "sample-studio-ottawa",
    buildingId: "SAMPLE-BLDG-3",
    partnerBuildingName: "[Sample Building — placeholder, never shown publicly]",
    exactAddress: undefined,
    city: "ottawa",
    neighbourhood: "[Neighbourhood]",
    unitNumber: "108",
    floor: "1",
    bedrooms: 0,
    bathrooms: 1,
    apartmentType: "studio",
    squareFeet: 420,
    monthlyRent: 0,
    availableDate: "",
    furnished: true,
    parking: false,
    locker: false,
    petsAllowed: true,
    utilitiesIncluded: [],
    descriptionEn: "Sample listing placeholder — replace with real unit details.",
    descriptionFr: "Exemple de logement — à remplacer par de vraies données.",
    images: [],
    commonAreaImages: [],
    status: "coming_soon",
    photosReviewed: true,
    isPlaceholder: true
  }
];
