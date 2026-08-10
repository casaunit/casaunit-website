import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { cities } from "@/data/seed/cities";
import { getUnitsByCity, filterUnits } from "@/lib/inventory/getUnits";
import { parseBudgetRange } from "@/lib/search/parseBudgetRange";
import { Locale } from "@/i18n";
import PropertyCard from "@/components/property/PropertyCard";
import SearchFilters from "@/components/search/SearchFilters";

export function generateStaticParams() {
  return cities.filter((c) => c.isActive).map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params: { locale, city }
}: {
  params: { locale: Locale; city: string };
}): Promise<Metadata> {
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) return {};
  const name = locale === "fr" ? cityData.nameFr : cityData.nameEn;
  return {
    title: `Apartments for Rent in ${name} | Move to Canada`,
    description: `All available rental apartments in ${name}, ${cityData.province} — filter by budget, bedrooms, and move-in date.`
  };
}

export default async function CityApartmentsPage({
  params: { locale, city },
  searchParams
}: {
  params: { locale: Locale; city: string };
  searchParams: Record<string, string | undefined>;
}) {
  unstable_setRequestLocale(locale);

  const cityData = cities.find((c) => c.slug === city && c.isActive);
  if (!cityData) notFound();

  const t = await getTranslations("ApartmentsListing");
  const cityName = locale === "fr" ? cityData.nameFr : cityData.nameEn;

  const { min, max } = parseBudgetRange(searchParams.budget);
  const allCityUnits = await getUnitsByCity(city);
  const filtered = filterUnits(allCityUnits, {
    bedrooms: searchParams.bedrooms,
    budgetMin: searchParams.priceMin ? Number(searchParams.priceMin) : min,
    budgetMax: searchParams.priceMax ? Number(searchParams.priceMax) : max,
    furnished:
      searchParams.furnished === "true" ? true : searchParams.furnished === "false" ? false : undefined,
    parking: searchParams.parking === "true",
    petsAllowed: searchParams.pets === "true"
  });

  return (
    <div className="container-content py-10 sm:py-14">
      <h1 className="text-3xl font-extrabold sm:text-4xl">
        {t("titleForCity", { city: cityName })}
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
        <div className="card p-10 text-center text-ink/50">{t("noResults")}</div>
      )}
    </div>
  );
}
