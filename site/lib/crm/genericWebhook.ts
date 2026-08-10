import { LeadPayload } from "@/types/lead";
import { CRMAdapter, CRMResult } from "./types";

/**
 * Default v1 adapter: posts the lead as JSON to a single webhook URL.
 * Confirmed setup: this webhook points at a Make.com scenario, which
 * writes the lead into an Airtable base shared with the whole team.
 *
 * Swapping providers later (HubSpot, GoHighLevel, Zoho, Pipedrive...)
 * only means writing a new file in /lib/crm/adapters that implements
 * the same CRMAdapter interface, then pointing CRM_PROVIDER at it.
 * No changes to the lead form or API route are required.
 */
export const genericWebhookAdapter: CRMAdapter = {
  name: "genericWebhook",
  async sendLead(payload: LeadPayload): Promise<CRMResult> {
    const url = process.env.CRM_WEBHOOK_URL;

    if (!url) {
      return {
        success: false,
        error: "CRM_WEBHOOK_URL is not configured in environment variables."
      };
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        return { success: false, error: `Webhook responded with ${res.status}` };
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown webhook error"
      };
    }
  }
};
