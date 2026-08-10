import { z } from "zod";

// Mirrors LandlordLeadPayload (types/landlordLead.ts). Intentionally
// short — this is an expression of interest, not a full listing
// submission, so it should take under a minute to fill out.
export const landlordLeadSchema = z.object({
  contactName: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(6, "A phone number is required"),
  companyOrOwnerName: z.string().optional(),
  propertyCity: z.string().min(1, "City is required"),
  propertyAddress: z.string().optional(),
  unitsCount: z.string().optional(),
  message: z.string().optional(),
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

export type LandlordLeadFormValues = z.infer<typeof landlordLeadSchema>;
