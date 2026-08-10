import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getAllUnits, filterUnits } from "@/lib/inventory/getUnits";
import { parseBudgetRange } from "@/lib/search/parseBudgetRange";
import { Locale } from "@/i18n";
import PropertyCard from "@/components/property/PropertyCard";
import SearchFilters from "@/components/search/SearchFilters";

export const metadata: Metadata = {
  title: "All Available Apartments | Move to Canada",
  description: "Browse every available apartment across our partner cities in Canada."
};

export default async function AllApartmentsPage({
  params: { locale },
  searchParams
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | undefined>;
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("ApartmentsListing");

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
    <div className="container-content py-10 sm:py-14">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{t("titleAll")}</h1>
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
