/**
 * Payload for the "Vous êtes propriétaire ?" interest form. Kept as a
 * separate, smaller type from LeadPayload (types/lead.ts) — a landlord
 * submission isn't a tenant search and shouldn't be squeezed into that
 * shape. Both payloads share the same webhook (see lib/crm/dispatch.ts)
 * and are told apart by `leadType`, so your Make.com scenario can route
 * each into its own Airtable table.
 */
export interface LandlordLeadPayload {
  leadType: "landlord";
  contactName: string;
  email: string;
  phone: string;
  companyOrOwnerName?: string;
  propertyCity: string;
  propertyAddress?: string;
  unitsCount?: string; // "1", "2-5", "6-20", "20+"
  message?: string;
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
  submittedAt: string;
}
