"use client";

import { useLocale, useTranslations } from "next-intl";
import { apartmentTypes } from "./options";

interface BedroomSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BedroomSelector({ value, onChange }: BedroomSelectorProps) {
  const t = useTranslations("Search");
  const locale = useLocale();

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
        {t("bedrooms")}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-border bg-white px-3.5 py-3 text-sm font-medium text-ink outline-none focus:border-ink/30"
      >
        <option value="">{t("bedroomsPlaceholder")}</option>
        {apartmentTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {locale === "fr" ? type.labelFr : type.labelEn}
          </option>
        ))}
      </select>
    </label>
  );
}
