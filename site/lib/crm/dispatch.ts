import { LeadPayload } from "@/types/lead";
import { CRMAdapter } from "./types";
import { genericWebhookAdapter } from "./genericWebhook";

// Registry of available adapters. Add hubspot.ts, gohighlevel.ts, zoho.ts,
// pipedrive.ts here later and register them the same way.
const adapters: Record<string, CRMAdapter> = {
  genericWebhook: genericWebhookAdapter
};

export async function dispatchLead(payload: LeadPayload) {
  const provider = process.env.CRM_PROVIDER || "genericWebhook";
  const adapter = adapters[provider];

  if (!adapter) {
    return { success: false, error: `Unknown CRM_PROVIDER: ${provider}` };
  }

  // The lead should already be persisted to the database/store *before*
  // this is called — dispatch failure here must never mean a lost lead.
  return adapter.sendLead(payload);
}
