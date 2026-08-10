"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, usePathname } from "@/lib/navigation";
import { useSearchParams } from "next/navigation";
import { apartmentTypes } from "./options";

/**
 * Filter bar for /apartments and /[city]/apartments. Filters are stored
 * in the URL (not component state) so results are shareable/bookmarkable
 * and so the hero SearchWidget can deep-link straight into a filtered view.
 */
export default function SearchFilters() {
  const t = useTranslations("ApartmentsListing");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearAll() {
    router.push(pathname);
  }

  const priceMin = searchParams.get("priceMin") || "";
  const priceMax = searchParams.get("priceMax") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const furnished = searchParams.get("furnished") || "";
  const parking = searchParams.get("parking") === "true";
  const pets = searchParams.get("pets") === "true";

  const hasActiveFilters = !!(priceMin || priceMax || bedrooms || furnished || parking || pets);

  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="btn-secondary mb-4 sm:hidden"
      >
        <SlidersHorizontal size={16} className="mr-2" />
        {t("filters")}
      </button>

      <div className={`${open ? "grid" : "hidden"} card grid-cols-2 gap-4 p-5 sm:grid sm:grid-cols-3 sm:p-6 lg:grid-cols-6`}>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
            {t("priceMin")}
          </span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="$0"
            defaultValue={priceMin}
            onBlur={(e) => updateParam("priceMin", e.target.value)}
            className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink/30"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
            {t("priceMax")}
          </span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="$5000"
            defaultValue={priceMax}
            onBlur={(e) => updateParam("priceMax", e.target.value)}
            className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink/30"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
            {t("bedrooms")}
          </span>
          <select
            value={bedrooms}
            onChange={(e) => updateParam("bedrooms", e.target.value)}
            className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink/30"
          >
            <option value="">{t("any")}</option>
            {apartmentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {locale === "fr" ? type.labelFr : type.labelEn}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
            {t("furnished")}
          </span>
          <select
            value={furnished}
            onChange={(e) => updateParam("furnished", e.target.value)}
            className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-ink/30"
          >
            <option value="">{t("any")}</option>
            <option value="true">{t("furnishedYes")}</option>
            <option value="false">{t("furnishedNo")}</option>
          </select>
        </label>

        <label className="flex items-center gap-2 self-end pb-2.5">
          <input
            type="checkbox"
            checked={parking}
            onChange={(e) => updateParam("parking", e.target.checked ? "true" : "")}
            className="h-4 w-4 rounded border-border"
          />
          <span className="text-sm text-ink/70">{t("parkingRequired")}</span>
        </label>

        <label className="flex items-center gap-2 self-end pb-2.5">
          <input
            type="checkbox"
            checked={pets}
            onChange={(e) => updateParam("pets", e.target.checked ? "true" : "")}
            className="h-4 w-4 rounded border-border"
          />
          <span className="text-sm text-ink/70">{t("petFriendly")}</span>
        </label>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ink/60 hover:text-ink"
        >
          <X size={14} /> {t("clearFilters")}
        </button>
      )}
    </div>
  );
}
