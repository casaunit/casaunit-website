import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { cities } from "@/data/seed/cities";
import { getUnitsByCity } from "@/lib/inventory/getUnits";
import { Link } from "@/lib/navigation";
import { Locale } from "@/i18n";
import PropertyCard from "@/components/property/PropertyCard";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";

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
    title: `${name} Apartments for Rent | Move to Canada`,
    description: `Browse apartments in ${name}, ${cityData.province}. Find your home in Canada before you arrive.`
  };
}

export default async function CityPage({
  params: { locale, city }
}: {
  params: { locale: Locale; city: string };
}) {
  unstable_setRequestLocale(locale);

  const cityData = cities.find((c) => c.slug === city && c.isActive);
  if (!cityData) notFound();

  const t = await getTranslations("CityPage");
  const cityName = locale === "fr" ? cityData.nameFr : cityData.nameEn;
  const units = (await getUnitsByCity(city)).slice(0, 6);

  return (
    <div>
      <section className="bg-cream-soft py-14 sm:py-20">
        <div className="container-content">
          <p className="text-sm font-semibold uppercase tracking-wide text-terracotta">
            {cityData.province}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">{cityName}</h1>
          <p className="mt-4 max-w-xl text-ink/65">{t(`descriptions.${city}`)}</p>
          <Link href={`/${city}/apartments`} className="btn-primary mt-6">
            {t("viewApartments", { city: cityName })}
          </Link>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-content">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">{t("availableIn", { city: cityName })}</h2>
            <Link href={`/${city}/apartments`} className="text-sm font-semibold text-terracotta">
              {t("seeAll")}
            </Link>
          </div>

          {units.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((unit) => (
                <PropertyCard key={unit.id} unit={unit} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-ink/50">{t("noUnits")}</p>
          )}
        </div>
      </section>

      <section className="pb-16">
        <div className="container-content">
          <WhatsAppButton variant="banner" context={city} message={t("whatsappMessage", { city: cityName })} />
        </div>
      </section>
    </div>
  );
}
