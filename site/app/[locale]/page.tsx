import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import CitiesSection from "@/components/home/CitiesSection";
import FeaturedApartments from "@/components/home/FeaturedApartments";
import HowItWorks from "@/components/home/HowItWorks";
import TrustSection from "@/components/home/TrustSection";
import ResourcesPreview from "@/components/home/ResourcesPreview";
import FinalCta from "@/components/home/FinalCta";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import { Locale } from "@/routing";

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <CitiesSection />
      <FeaturedApartments />
      <HowItWorks />
      <TrustSection />

      <section className="py-16 sm:py-20">
        <div className="container-content">
          <WhatsAppButton variant="banner" context="homepage" />
        </div>
      </section>

      <ResourcesPreview />
      <FinalCta />
    </>
  );
}
