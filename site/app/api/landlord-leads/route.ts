import { NextRequest, NextResponse } from "next/server";
import { landlordLeadSchema } from "@/lib/validation/landlordLeadSchema";
import { getAttributionFromCookies } from "@/lib/utm/getAttributionFromCookies";
import { persistLead } from "@/lib/leads/store";
import { dispatchLead } from "@/lib/crm/dispatch";
import { LandlordLeadPayload } from "@/types/landlordLead";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = landlordLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const attribution = getAttributionFromCookies();

  const payload: LandlordLeadPayload = {
    leadType: "landlord",
    ...parsed.data,
    ...attribution,
    leadSource: attribution.utmSource || "direct",
    submittedAt: new Date().toISOString()
  };

  // Same persist-then-dispatch pattern as tenant leads — the submission
  // is never lost even if the CRM webhook call fails. Your Make.com
  // scenario can branch on `leadType` to route this into a separate
  // "Landlord Leads" Airtable table from the tenant leads table.
  await persistLead(payload);
  const result = await dispatchLead(payload);

  return NextResponse.json({ success: true, crmSynced: result.success });
}
