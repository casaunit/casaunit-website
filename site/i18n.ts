import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, Locale } from "./i18n-config";

// Re-exported so existing `import { locales, Locale, defaultLocale } from
// "@/i18n"` in pages/layouts keep working unchanged — only middleware.ts
// and lib/navigation.ts import directly from i18n-config.ts (see that
// file for why the split exists).
export { locales, defaultLocale } from "./i18n-config";
export type { Locale } from "./i18n-config";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
