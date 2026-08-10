import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import StorySection from "@/components/home/StorySection";
import CitiesTeaser from "@/components/home/CitiesTeaser";
import GuideTeaser from "@/components/home/GuideTeaser";
import LandlordBanner from "@/components/home/LandlordBanner";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import { stockPhotos } from "@/lib/media/stockPhotos";
import { Locale } from "@/routing";

export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations("Story");

  return (
    <>
      <Hero />

      <StorySection
        number="01"
        title={t("step1.title")}
        description={t("step1.description")}
        imageSrc={stockPhotos.livingRoom}
        imageAlt=""
      />
      <StorySection
        number="02"
        title={t("step2.title")}
        description={t("step2.description")}
        imageSrc={stockPhotos.airportArrival}
        imageAlt=""
        reverse
      />
      <StorySection
        number="03"
        title={t("step3.title")}
        description={t("step3.description")}
        imageSrc={stockPhotos.movingIn}
        imageAlt=""
      />

      <CitiesTeaser />
      <GuideTeaser />
      <LandlordBanner />

      <section className="py-16 sm:py-20">
        <div className="container-wide">
          <WhatsAppButton variant="banner" context="homepage" />
        </div>
      </section>
    </>
  );
}
