export interface City {
  id: string;
  slug: string; // used in URLs: /ottawa, /gatineau
  nameEn: string;
  nameFr: string;
  province: string;
  isActive: boolean;
  sortOrder: number;
  heroImage?: string;
}
