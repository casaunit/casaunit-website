"use client";

const COOKIE_NAME = "chr_attribution";
const COOKIE_DAYS = 30;

export interface Attribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referringUrl?: string;
  landingPage?: string;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
] as const;

/**
 * Run once on first page load (see app/[locale]/layout.tsx). Reads UTM
 * params + referrer from the very first page a visitor lands on, and
 * stores them for 30 days so a lead submitted several pages later still
 * carries correct attribution back to the CRM.
 */
export function captureAttributionOnce() {
  if (typeof window === "undefined") return;
  if (getStoredAttribution()) return; // already captured this visit window

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    referringUrl: document.referrer || undefined,
    landingPage: window.location.pathname
  };

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      const camelKey = ("utm" +
        key.slice(3).replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase())) as keyof Attribution;
      (attribution as any)[camelKey] = value;
    }
  });

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(attribution)
  )}; max-age=${COOKIE_DAYS * 24 * 60 * 60}; path=/; SameSite=Lax`;
}

export function getStoredAttribution(): Attribution | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}
