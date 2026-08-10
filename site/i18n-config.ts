// Lightweight locale constants, deliberately kept in their own file with
// no other imports. middleware.ts runs on Vercel's Edge Runtime, which
// crashed ("MIDDLEWARE_INVOCATION_FAILED") when it imported these
// constants from i18n.ts, because that file also contains getRequestConfig()
// with a dynamic `import(`./messages/${locale}.json`)` — the edge bundler
// pulled that whole dynamic-import graph into the middleware bundle even
// though middleware only needs the two constants below. Splitting them out
// keeps the middleware bundle small and edge-safe.
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
