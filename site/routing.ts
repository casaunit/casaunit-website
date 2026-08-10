import { defineRouting } from "next-intl/routing";

// Central routing config (next-intl v4). French is the default/primary
// language and ships unprefixed at the root ("/trouver-une-unite"),
// English lives under "/en" ("/en/find-a-home"). Adding "ar" later is a
// matter of dropping in messages/ar.json + one more line here and one
// more branch in each `pathnames` entry below — no other code changes.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/apartments": {
      fr: "/trouver-une-unite",
      en: "/find-a-home"
    },
    "/apartments/[unitSlug]": {
      fr: "/trouver-une-unite/[unitSlug]",
      en: "/find-a-home/[unitSlug]"
    },
    "/[city]": "/[city]",
    "/guide": {
      fr: "/guide-d-installation",
      en: "/settling-in-guide"
    },
    "/landlords": {
      fr: "/vous-etes-proprietaire",
      en: "/for-landlords"
    },
    "/find-my-apartment": {
      fr: "/demande",
      en: "/apply"
    }
  }
});

export type Locale = (typeof routing.locales)[number];
