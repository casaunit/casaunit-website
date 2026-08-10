import { z } from "zod";

// Mirrors LeadPayload (types/lead.ts). Kept intentionally short on
// "required" fields — the brief calls for a fast, low-friction form, so
// only what's truly needed to start a conversation is mandatory. Every
// other field enriches the lead if provided but never blocks submission.
// Immigration status is explicitly optional per the brief.
export const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  whatsapp: z.string().min(6, "A WhatsApp or phone number is required"),
  email: z.string().email("Enter a valid email address"),
  currentCountry: z.string().optional().default(""),
  preferredCity: z.string().min(1, "Select a city"),
  preferredNeighbourhood: z.string().optional(),
  budgetMin: z.coerce.number().optional().default(0),
  budgetMax: z.coerce.number().optional().default(0),
  bedrooms: z.string().min(1, "Select an apartment type"),
  moveInDate: z.string().optional(),
  arrivalDate: z.string().optional(),
  occupants: z.coerce.number().optional(),
  needsParking: z.boolean().optional(),
  hasPets: z.boolean().optional(),
  furnishedPreference: z.enum(["furnished", "unfurnished", "no_preference"]).optional(),
  immigrationStatus: z.string().optional(),
  additionalComments: z.string().optional(),
  unitViewedId: z.string().optional(),
  buildingViewedId: z.string().optional(),
  consentMarketing: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to submit this form" })
  }),

  // Attribution, filled in automatically — never shown to the visitor
  leadSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  referringUrl: z.string().optional(),
  landingPage: z.string().optional(),

  // Honeypot — real visitors never fill this in; bots often do.
  website: z.string().max(0, "Spam detected").optional()
});

export type LeadFormValues = z.infer<typeof leadSchema>;
