import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Only "en" and "fr" ship in v1. Adding "ar" later is a matter of dropping
// in messages/ar.json and adding "ar" to this array + middleware.ts —
// no component code changes required.
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
