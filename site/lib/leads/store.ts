import { LeadPayload } from "@/types/lead";

/**
 * Persistence for submitted leads. A lead is written here BEFORE it's
 * dispatched to the CRM (see lib/crm/dispatch.ts) — so even if the CRM
 * webhook is down, the lead itself is never lost.
 *
 * v1 has no database wired up yet, so this logs to the server console
 * (visible in your hosting provider's function logs, e.g. Vercel).
 * Swap the body of this function for a real insert once Postgres/
 * Prisma (or another store) is connected — nothing else in the lead
 * flow needs to change.
 */
export async function persistLead(payload: LeadPayload) {
  // eslint-disable-next-line no-console
  console.log("[lead:received]", JSON.stringify(payload));
  return { id: `local_${Date.now()}` };
}
