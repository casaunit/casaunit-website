export type ApartmentType =
  | "studio"
  | "1br"
  | "1br_den"
  | "2br"
  | "2br_den"
  | "3br";

export type UnitStatus = "available" | "reserved" | "rented" | "coming_soon";

export interface Unit {
  id: string;
  unitId: string; // external/partner reference
  slug: string;
  buildingId: string;
  buildingName: string; // denormalized for display convenience
  city: string; // city slug
  neighbourhood?: string;
  unitNumber?: string;
  bedrooms: number;
  bathrooms: number;
  apartmentType: ApartmentType;
  squareFeet?: number;
  monthlyRent: number;
  availableDate: string; // ISO date
  furnished: boolean;
  parking: boolean;
  petsAllowed: boolean;
  utilitiesIncluded: string[];
  descriptionEn: string;
  descriptionFr: string;
  images: string[];
  status: UnitStatus;
  isPlaceholder?: boolean; // true = sample data, not real inventory
}
