"use client";

import { useTranslations } from "next-intl";

interface MoveInDatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MoveInDatePicker({ value, onChange }: MoveInDatePickerProps) {
  const t = useTranslations("Search");

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
        {t("moveInDate")}
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-border bg-white px-3.5 py-3 text-sm font-medium text-ink outline-none focus:border-ink/30"
      />
    </label>
  );
}
