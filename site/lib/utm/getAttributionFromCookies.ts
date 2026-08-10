import { cookies } from "next/headers";
import { Attribution } from "./attribution";

const COOKIE_NAME = "chr_attribution";

// Server-side counterpart to captureAttributionOnce() (attribution.ts).
// Used in the /api/leads route to read the UTM/referrer data that was
// captured on the visitor's first page load, even if they submit the
// form several pages and minutes later.
export function getAttributionFromCookies(): Attribution {
  try {
    const raw = cookies().get(COOKIE_NAME)?.value;
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
