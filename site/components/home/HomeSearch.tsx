"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { useRouter } from "@/lib/navigation";
import { cities } from "@/data/seed/cities";
import { apartmentTypes } from "@/components/search/options";

/**
 * The homepage's primary conversion surface — sits directly under the
 * Hero so a visitor can start searching within seconds. Deliberately
 * lightweight (local state, no URL sync) since it only ever submits
 * forward into /apartments, which owns the real filter state. Field
 * values/keys match SearchFilters.tsx exactly so the two never drift.
 */
export default function HomeSearch() {
  const t = useTranslations("HomeSearch");
  const locale = useLocale();
  const router = useRouter();

  const [city, setCity] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [moveIn, setMoveIn] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query: Record<string, string> = {};
    if (city) query.city = city;
    if (priceMin) query.priceMin = priceMin;
    if (priceMax) query.priceMax = priceMax;
    if (bedrooms) query.bedrooms = bedrooms;
    if (moveIn) query.moveIn = moveIn;
    router.push({ pathname: "/apartments", query });
  }

  const fieldClass =
    "w-full rounded-lg border border-border bg-white px-3.5 py-3 text-sm text-ink outline-none transition-colors focus:border-ink/30";
  const labelClass = "text-xs font-semibold uppercase tracking-wide text-ink/50";

  return (
    <section className="bg-cream-soft py-14 sm:py-20">
      <div className="container-wide">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-medium text-ink sm:text-3xl">{t("title")}</h2>
          <p className="mt-2 text-ink/60">{t("subtitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-4 border border-border bg-white p-5 sm:p-6 lg:flex-row lg:items-end lg:gap-3"
        >
          <label className="flex flex-1 flex-col gap-1.5">
            <span className={labelClass}>{t("city")}</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className={fieldClass}>
              <option value="">{t("any")}</option>
              {cities
                .filter((c) => c.isActive)
                .map((c) => (
                  <option key={c.id} value={c.slug}>
                    {locale === "fr" ? c.nameFr : c.nameEn}
                  </option>
                ))}
            </select>
          </label>

          <label className="flex flex-1 flex-col gap-1.5">
            <span className={labelClass}>{t("priceMin")}</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="$0"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="flex flex-1 flex-col gap-1.5">
            <span className={labelClass}>{t("priceMax")}</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="$5000"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="flex flex-1 flex-col gap-1.5">
            <span className={labelClass}>{t("bedrooms")}</span>
            <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={fieldClass}>
              <option value="">{t("any")}</option>
              {apartmentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {locale === "fr" ? type.labelFr : type.labelEn}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-1 flex-col gap-1.5">
            <span className={labelClass}>{t("moveInDate")}</span>
            <input
              type="date"
              value={moveIn}
              onChange={(e) => setMoveIn(e.target.value)}
              className={fieldClass}
            />
          </label>

          <button type="submit" className="btn-primary shrink-0 gap-2">
            <Search size={16} />
            {t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
