import { Unit } from "@/types/unit";

/**
 * PLACEHOLDER DATA — NOT REAL INVENTORY.
 *
 * These records exist only so the homepage and listing components have
 * something to render during development. Every entry is flagged
 * `isPlaceholder: true` and the UI shows a visible "sample data" notice
 * whenever placeholder units are displayed.
 *
 * Replace this file (or point it at the database / Airtable sync) with
 * real unit data before launch.
 */
export const units: Unit[] = [
  {
    id: "unit_sample_1",
    unitId: "SAMPLE-001",
    slug: "sample-2-bedroom-den-gatineau",
    buildingId: "building_sample_1",
    buildingName: "[Sample Building Name]",
    city: "gatineau",
    neighbourhood: "[Neighbourhood]",
    bedrooms: 2,
    bathrooms: 2,
    apartmentType: "2br_den",
    squareFeet: 1025,
    monthlyRent: 0,
    availableDate: "",
    furnished: false,
    parking: true,
    petsAllowed: false,
    utilitiesIncluded: [],
    descriptionEn: "Sample listing placeholder — replace with real unit details.",
    descriptionFr: "Exemple de logement — à remplacer par de vraies données.",
    images: [],
    status: "coming_soon",
    isPlaceholder: true
  },
  {
    id: "unit_sample_2",
    unitId: "SAMPLE-002",
    slug: "sample-1-bedroom-ottawa",
    buildingId: "building_sample_2",
    buildingName: "[Sample Building Name]",
    city: "ottawa",
    neighbourhood: "[Neighbourhood]",
    bedrooms: 1,
    bathrooms: 1,
    apartmentType: "1br",
    squareFeet: 650,
    monthlyRent: 0,
    availableDate: "",
    furnished: false,
    parking: false,
    petsAllowed: false,
    utilitiesIncluded: [],
    descriptionEn: "Sample listing placeholder — replace with real unit details.",
    descriptionFr: "Exemple de logement — à remplacer par de vraies données.",
    images: [],
    status: "coming_soon",
    isPlaceholder: true
  },
  {
    id: "unit_sample_3",
    unitId: "SAMPLE-003",
    slug: "sample-studio-ottawa",
    buildingId: "building_sample_3",
    buildingName: "[Sample Building Name]",
    city: "ottawa",
    neighbourhood: "[Neighbourhood]",
    bedrooms: 0,
    bathrooms: 1,
    apartmentType: "studio",
    squareFeet: 420,
    monthlyRent: 0,
    availableDate: "",
    furnished: true,
    parking: false,
    petsAllowed: true,
    utilitiesIncluded: [],
    descriptionEn: "Sample listing placeholder — replace with real unit details.",
    descriptionFr: "Exemple de logement — à remplacer par de vraies données.",
    images: [],
    status: "coming_soon",
    isPlaceholder: true
  }
];
