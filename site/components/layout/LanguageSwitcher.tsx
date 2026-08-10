"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(nextLocale: "en" | "fr") {
    // `pathname` is typed as the union of every canonical route in
    // routing.ts's `pathnames` map; casting to `any` here just avoids
    // re-deriving that union for a same-page locale swap.
    router.replace(pathname as any, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <button
        onClick={() => switchTo("fr")}
        className={locale === "fr" ? "text-ink" : "text-ink/40 hover:text-ink"}
        aria-current={locale === "fr"}
      >
        FR
      </button>
      <span className="text-ink/25">/</span>
      <button
        onClick={() => switchTo("en")}
        className={locale === "en" ? "text-ink" : "text-ink/40 hover:text-ink"}
        aria-current={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
