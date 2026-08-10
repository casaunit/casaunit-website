import { City } from "@/types/city";

// v1 seed data. Later this is replaced by a DB query (see /lib/db) — the
// shape stays identical so components never need to change.
export const cities: City[] = [
  {
    id: "city_ottawa",
    slug: "ottawa",
    nameEn: "Ottawa",
    nameFr: "Ottawa",
    province: "Ontario",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "city_gatineau",
    slug: "gatineau",
    nameEn: "Gatineau",
    nameFr: "Gatineau",
    province: "Quebec",
    isActive: true,
    sortOrder: 2
  }
  // Add Toronto, Montreal, etc. here later — no template changes needed.
];
