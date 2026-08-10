import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import HomeSearch from "@/components/home/HomeSearch";
import FeaturedUnits from "@/components/home/FeaturedUnits";
import SplitSection from "@/components/home/SplitSection";
import CityLifestyle from "@/components/home/CityLifestyle";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import { stockPhotos } from "@/lib/media/stockPhotos";
import { Locale } from "@/routing";

/**
 * Homepage — order is deliberate and matches Zak's brief exactly:
 * Hero -> Search -> Featured units (marketplace has top conversion
 * priority) -> real-estate storytelling -> arrival guide teaser ->
 * city lifestyle -> keys/settle-in moment -> landlord teaser -> footer.
 * No informational content sits between Hero and the marketplace.
 */
export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <Hero />
      <HomeSearch />
      <FeaturedUnits />

      <SplitSection
        eyebrow={t("RealEstate.eyebrow")}
        title={t("RealEstate.title")}
        description={t("RealEstate.description")}
        image={stockPhotos.interiorShowcase}
        imageAlt=""
        imagePosition="30% center"
        ctaLabel={t("RealEstate.cta")}
        ctaHref="/apartments"
      />

      <SplitSection
        eyebrow={t("Arrival.eyebrow")}
        title={t("Arrival.title")}
        description={t("Arrival.description")}
        image={stockPhotos.airportArrival}
        imageAlt=""
        imagePosition="45% center"
        ctaLabel={t("Arrival.cta")}
        ctaHref="/guide"
        reverse
      />

      <CityLifestyle />

      <SplitSection
        eyebrow={t("Keys.eyebrow")}
        title={t("Keys.title")}
        description={t("Keys.description")}
        image={stockPhotos.keysMovingIn}
        imageAlt=""
        imagePosition="55% center"
      />

      <SplitSection
        eyebrow={t("LandlordTeaser.eyebrow")}
        title={t("LandlordTeaser.title")}
        description={t("LandlordTeaser.description")}
        image={stockPhotos.landlordBuilding}
        imageAlt=""
        imagePosition="75% center"
        ctaLabel={t("LandlordTeaser.cta")}
        ctaHref="/landlords"
        reverse
      />

      <section className="py-14 sm:py-16">
        <div className="container-wide">
          <WhatsAppButton variant="banner" context="homepage" />
        </div>
      </section>
    </>
  );
}
