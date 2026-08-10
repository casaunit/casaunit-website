"use client";

/**
 * Thin wrapper around GA4 / Meta Pixel / TikTok Pixel so the rest of the
 * app never calls `gtag`/`fbq`/`ttq` directly. Once real container/pixel
 * IDs are added (see .env.example), each function below fires to all
 * configured destinations. Until then, calls are safely no-ops.
 */
type EventName =
  | "search_started"
  | "city_selected"
  | "apartment_viewed"
  | "lead_form_started"
  | "lead_submitted"
  | "landlord_lead_submitted"
  | "whatsapp_clicked"
  | "phone_clicked"
  | "apartment_inquiry";

export function trackEvent(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const w = window as any;

  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  }
  if (typeof w.fbq === "function") {
    w.fbq("trackCustom", name, params);
  }
  if (typeof w.ttq?.track === "function") {
    w.ttq.track(name, params);
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", name, params);
  }
}
