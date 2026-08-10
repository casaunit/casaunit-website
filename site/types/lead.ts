export interface LeadPayload {
  leadType?: "tenant";
  firstName: string;
  lastName: string;
  phone: string;
  whatsapp: string;
  email: string;
  currentCountry: string;
  preferredCity: string;
  preferredNeighbourhood?: string;
  budgetMin: number;
  budgetMax: number;
  bedrooms: string;
  moveInDate?: string;
  arrivalDate?: string;
  occupants?: number;
  needsParking?: boolean;
  hasPets?: boolean;
  furnishedPreference?: "furnished" | "unfurnished" | "no_preference";
  immigrationStatus?: string; // optional, never required
  additionalComments?: string;
  unitViewedId?: string;
  buildingViewedId?: string;
  consentMarketing: boolean;

  // Attribution — populated automatically, not by the visitor
  leadSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referringUrl?: string;
  landingPage?: string;
  submittedAt: string; // ISO datetime
}
