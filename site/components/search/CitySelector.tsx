"use client";

import { useLocale, useTranslations } from "next-intl";
import { cities } from "@/data/seed/cities";

interface CitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CitySelector({ value, onChange }: CitySelectorProps) {
  const t = useTranslations("Search");
  const locale = useLocale();

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
        {t("city")}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-border bg-white px-3.5 py-3 text-sm font-medium text-ink outline-none focus:border-ink/30"
      >
        <option value="">{t("cityPlaceholder")}</option>
        {cities
          .filter((c) => c.isActive)
          .map((city) => (
            <option key={city.id} value={city.slug}>
              {locale === "fr" ? city.nameFr : city.nameEn}
            </option>
          ))}
      </select>
    </label>
  );
}
