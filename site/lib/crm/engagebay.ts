import { LeadPayload } from "@/types/lead";
import { LandlordLeadPayload } from "@/types/landlordLead";
import { CRMAdapter, CRMResult } from "./types";

/**
 * EngageBay adapter — posts the lead as a Contact, then (for tenant
 * leads only) creates a Deal for that contact on your configured Track
 * (EngageBay's name for a pipeline), starting at the New Lead stage.
 *
 * One-time setup required in EngageBay before this does anything useful
 * — none of this involves touching this file again, only your Vercel
 * env vars:
 *
 * 1. Admin Settings -> API -> copy your REST API Key -> set it as
 *    ENGAGEBAY_API_KEY in Vercel. Never share this key in chat/code —
 *    add it directly in the Vercel dashboard.
 * 2. Account Settings -> Deal Tracks -> create a track for tenant leads
 *    (e.g. "Tenant Pipeline") with milestones named EXACTLY (case
 *    sensitive): New Lead, Qualified, Units Sent, Viewing Booked,
 *    Application, Placed. Set that track's name as ENGAGEBAY_TRACK_NAME
 *    in Vercel. Until this is set, contacts are still created — deals
 *    just won't be, so nothing breaks if you set the API key first and
 *    the track later.
 * 3. Admin Settings -> Custom Fields -> Contact -> add a Textarea field
 *    named exactly "Lead Details". This is where budget/move-in date/
 *    immigration status/etc. land, since EngageBay only has built-in
 *    fields for name/email/phone.
 * 4. Set CRM_PROVIDER=engagebay in Vercel once the above is ready.
 */
const API_BASE = "https://app.engagebay.com/dev/api/panel";

function isLandlordLead(payload: LeadPayload | LandlordLeadPayload): payload is LandlordLeadPayload {
    return payload.leadType === "landlord";
}

function getNameParts(payload: LeadPayload | LandlordLeadPayload): { first: string; last: string } {
    if (isLandlordLead(payload)) {
          const parts = payload.contactName.trim().split(/\s+/);
          return { first: parts[0] || payload.contactName, last: parts.slice(1).join(" ") };
    }
    return { first: payload.firstName, last: payload.lastName };
}

// Everything that isn't a built-in EngageBay contact field gets folded
// into one readable "Lead Details" blob — see setup step 3 above.
function summarizeDetails(payload: LeadPayload | LandlordLeadPayload): string {
    const skip = new Set([
          "leadType",
          "email",
          "phone",
          "whatsapp",
          "firstName",
          "lastName",
          "contactName",
          "consentMarketing",
          "submittedAt"
        ]);
    return Object.entries(payload)
      .filter(([key, value]) => !skip.has(key) && value !== undefined && value !== "")
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
}

async function engagebayFetch(path: string, apiKey: string, body: unknown) {
    return fetch(`${API_BASE}${path}`, {
          method: "POST",
          headers: {
                  Authorization: apiKey,
                  Accept: "application/json",
                  "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
    });
}

export const engagebayAdapter: CRMAdapter = {
    name: "engagebay",
    async sendLead(payload: LeadPayload | LandlordLeadPayload): Promise<CRMResult> {
          const apiKey = process.env.ENGAGEBAY_API_KEY;
          const trackName = process.env.ENGAGEBAY_TRACK_NAME;
          const newLeadStage = process.env.ENGAGEBAY_NEW_LEAD_STAGE || "New Lead";

      if (!apiKey) {
              return { success: false, error: "ENGAGEBAY_API_KEY is not configured in environment variables." };
      }

      const { first, last } = getNameParts(payload);

      try {
              // 1. Create (or update, if the email already exists) the contact.
            const contactRes = await engagebayFetch("/subscribers/subscriber", apiKey, {
                      properties: [
                        { name: "name", value: first, type: "SYSTEM" },
                        { name: "last_name", value: last, type: "SYSTEM" },
                        { name: "email", value: payload.email, type: "SYSTEM" },
                        { name: "phone", value: payload.phone, type: "SYSTEM" },
                        {
                                      name: "Lead Details",
                                      value: summarizeDetails(payload),
                                      field_type: "TEXTAREA",
                                      is_searchable: false,
                                      type: "CUSTOM"
                        }
                                ],
                      tags: [{ tag: isLandlordLead(payload) ? "CasaUnit Landlord" : "CasaUnit Tenant" }]
            });

            if (!contactRes.ok) {
                      const body = await contactRes.text().catch(() => "");
                      return { success: false, error: `EngageBay contact create failed: ${contactRes.status} ${body.slice(0, 300)}` };
            }

            // Landlord leads become contacts only — they don't enter the
            // tenant 6-stage deal pipeline.
            if (isLandlordLead(payload)) {
                      return { success: true };
            }

            // No track configured yet (step 2 above not done) — contact is
            // safely saved, just skip the deal until it is.
            if (!trackName) {
                      return { success: true };
            }

            const dealName = `${first} ${last} — ${payload.preferredCity || ""}`.trim();
              const dealRes = await engagebayFetch(`/deals/create-deal/${encodeURIComponent(payload.email)}`, apiKey, {
                        name: dealName,
                        track_name: trackName,
                        milestoneLabelName: newLeadStage
              });

            if (!dealRes.ok) {
                      const body = await dealRes.text().catch(() => "");
                      // Contact already saved successfully — don't fail the whole
                // dispatch just because the deal step had an issue.
                return { success: true, error: `Contact saved, but deal create failed: ${dealRes.status} ${body.slice(0, 300)}` };
            }

            return { success: true };
      } catch (err) {
              return { success: false, error: err instanceof Error ? err.message : "Unknown EngageBay error" };
      }
    }
};
