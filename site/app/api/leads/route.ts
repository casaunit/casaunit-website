import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation/leadSchema";
import { getAttributionFromCookies } from "@/lib/utm/getAttributionFromCookies";
import { persistLead } from "@/lib/leads/store";
import { dispatchLead } from "@/lib/crm/dispatch";
import { LeadPayload } from "@/types/lead";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything,
  // but never persist or dispatch.
  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const attribution = getAttributionFromCookies();

  const payload: LeadPayload = {
    ...parsed.data,
    // The form asks for a single "WhatsApp / Phone Number" field, but the
    // CRM schema keeps phone/whatsapp separate for flexibility — both are
    // populated with the same value the visitor gave us.
    phone: parsed.data.whatsapp,
    ...attribution,
    leadSource: attribution.utmSource || "direct",
    submittedAt: new Date().toISOString()
  };

  // 1. Persist first — the lead must never be lost even if the CRM call fails.
  await persistLead(payload);

  // 2. Then dispatch to the configured CRM (Make.com → Airtable by default).
  const result = await dispatchLead(payload);

  // The visitor still gets a success response even if CRM dispatch failed —
  // the lead is safely stored and can be retried/synced manually.
  return NextResponse.json({ success: true, crmSynced: result.success });
}
