export interface Building {
  id: string;
  slug: string;
  name: string;
  cityId: string;
  neighbourhood?: string;
  address: string;
  descriptionEn: string;
  descriptionFr: string;
  amenities: string[];
  photos: string[];
  nearbyTransit?: string[];
  nearbyGrocery?: string[];
  nearbyUniversities?: string[];
  nearbyEmploymentAreas?: string[];
  lat?: number;
  lng?: number;
  isActive: boolean;
}
