"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(nextLocale: "en" | "fr") {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => switchTo("en")}
        className={locale === "en" ? "text-ink" : "text-ink/40 hover:text-ink"}
        aria-current={locale === "en"}
      >
        EN
      </button>
      <span className="text-ink/30">|</span>
      <button
        onClick={() => switchTo("fr")}
        className={locale === "fr" ? "text-ink" : "text-ink/40 hover:text-ink"}
        aria-current={locale === "fr"}
      >
        FR
      </button>
    </div>
  );
}
