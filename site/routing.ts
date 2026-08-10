import { defineRouting } from "next-intl/routing";

// Central routing config (next-intl v4). Only "en" and "fr" ship in v1 —
// adding "ar" later is a matter of dropping in messages/ar.json and adding
// "ar" here, no other code changes required.
export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "always"
});

export type Locale = (typeof routing.locales)[number];
