import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { cities } from "@/data/seed/cities";
import { getUnitsByCity } from "@/lib/inventory/getUnits";
import { Link } from "@/lib/navigation";
import { Locale } from "@/routing";
import { stockPhotos } from "@/lib/media/stockPhotos";
import PropertyCard from "@/components/property/PropertyCard";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";

export function generateStaticParams() {
  return cities.filter((c) => c.isActive).map((c) => ({ city: c.slug }));
}

const cityImages: Record<string, string> = {
  ottawa: stockPhotos.buildingOttawa,
  gatineau: stockPhotos.buildingGatineau
};

export async function generateMetadata({
  params: { locale, city }
}: {
  params: { locale: Locale; city: string };
}): Promise<Metadata> {
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) return {};
  const name = locale === "fr" ? cityData.nameFr : cityData.nameEn;
  return {
    title: `${name} | CasaUnit`,
    description: `Découvrez ${name}, ${cityData.province} — trouvez votre logement avant votre arrivée au Canada.`
  };
}

export default async function CityPage({
  params: { locale, city }
}: {
  params: { locale: Locale; city: string };
}) {
  setRequestLocale(locale);

  const cityData = cities.find((c) => c.slug === city && c.isActive);
  if (!cityData) notFound();

  const t = await getTranslations("CityPage");
  const cityName = locale === "fr" ? cityData.nameFr : cityData.nameEn;
  const units = (await getUnitsByCity(city)).slice(0, 6);

  return (
    <div>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-ink">
        <Image src={cityImages[city] || stockPhotos.buildingOttawa} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/5" />
        <div className="container-wide relative pb-14 pt-32 sm:pb-20">
          <p className="eyebrow-on-dark">{cityData.province}</p>
          <h1 className="mt-3 font-heading text-4xl font-medium text-cream sm:text-5xl">{cityName}</h1>
          <p className="mt-4 max-w-xl text-cream/75">{t(`descriptions.${city}`)}</p>
          <Link href={{ pathname: "/apartments", query: { city } }} className="btn-on-dark mt-7">
            {t("viewApartments", { city: cityName })}
          </Link>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <h2 className="font-heading text-2xl font-medium text-ink sm:text-3xl">
              {t("availableIn", { city: cityName })}
            </h2>
            <Link href={{ pathname: "/apartments", query: { city } }} className="text-sm font-semibold text-ink/70 hover:text-ink">
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
        <div className="container-wide">
          <WhatsAppButton variant="banner" context={city} message={t("whatsappMessage", { city: cityName })} />
        </div>
      </section>
    </div>
  );
}
