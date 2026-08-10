"use client";

import { useLocale, useTranslations } from "next-intl";
import { budgetRanges } from "./options";

interface BudgetSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BudgetSelector({ value, onChange }: BudgetSelectorProps) {
  const t = useTranslations("Search");
  const locale = useLocale();

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
        {t("budget")}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-border bg-white px-3.5 py-3 text-sm font-medium text-ink outline-none focus:border-ink/30"
      >
        <option value="">{t("budgetPlaceholder")}</option>
        {budgetRanges.map((range) => (
          <option key={range.value} value={range.value}>
            {locale === "fr" ? range.labelFr : range.labelEn}
          </option>
        ))}
      </select>
    </label>
  );
}
