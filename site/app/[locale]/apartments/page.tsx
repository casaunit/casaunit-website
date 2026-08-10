import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getAllUnits, filterUnits } from "@/lib/inventory/getUnits";
import { parseBudgetRange } from "@/lib/search/parseBudgetRange";
import { cities } from "@/data/seed/cities";
import { Locale } from "@/routing";
import PropertyCard from "@/components/property/PropertyCard";
import SearchFilters from "@/components/search/SearchFilters";

export const metadata: Metadata = {
  title: "Trouver une unité | CasaUnit",
  description: "Parcourez les appartements disponibles à Ottawa et Gatineau — filtrez par ville, budget, chambres et date d'emménagement."
};

export default async function ApartmentsPage({
  params: { locale },
  searchParams
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | undefined>;
}) {
  setRequestLocale(locale);

  const t = await getTranslations("ApartmentsListing");
  const cityData = cities.find((c) => c.slug === searchParams.city && c.isActive);
  const cityName = cityData ? (locale === "fr" ? cityData.nameFr : cityData.nameEn) : undefined;

  const { min, max } = parseBudgetRange(searchParams.budget);
  const allUnits = await getAllUnits();
  const filtered = filterUnits(allUnits, {
    city: searchParams.city,
    bedrooms: searchParams.bedrooms,
    budgetMin: searchParams.priceMin ? Number(searchParams.priceMin) : min,
    budgetMax: searchParams.priceMax ? Number(searchParams.priceMax) : max,
    furnished:
      searchParams.furnished === "true" ? true : searchParams.furnished === "false" ? false : undefined,
    parking: searchParams.parking === "true",
    petsAllowed: searchParams.pets === "true"
  });

  return (
    <div className="bg-cream-soft py-12 sm:py-16">
      <div className="container-wide">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-3 font-heading text-3xl font-medium text-ink sm:text-4xl">
          {cityName ? t("titleForCity", { city: cityName }) : t("titleAll")}
        </h1>
        <p className="mt-2 text-ink/60">{t("resultsCount", { count: filtered.length })}</p>

        <div className="mt-8">
          <SearchFilters />
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((unit) => (
              <PropertyCard key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <div className="border border-border bg-white p-10 text-center text-ink/50">{t("noResults")}</div>
        )}
      </div>
    </div>
  );
}
