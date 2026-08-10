import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Locale } from "@/routing";
import LeadForm from "@/components/leads/LeadForm";

export const metadata: Metadata = {
  title: "Find My Apartment | Move to Canada",
  description:
    "Tell us your city, budget, apartment size and move-in date — a housing advisor will contact you with matching options."
};

export default async function FindMyApartmentPage({
  params: { locale },
  searchParams
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | undefined>;
}) {
  setRequestLocale(locale);
  const t = await getTranslations("LeadForm");

  return (
    <div className="bg-cream-soft py-14 sm:py-20">
      <div className="container-wide max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("pageTitle")}</h1>
        <p className="mt-3 text-ink/60">{t("pageSubtitle")}</p>

        <div className="card mt-8 p-6 sm:p-8">
          <LeadForm
            initialCity={searchParams.city}
            initialBudget={searchParams.budget}
            initialBedrooms={searchParams.bedrooms}
            initialMoveIn={searchParams.moveIn}
            unitViewedId={searchParams.unit}
            buildingViewedId={searchParams.building}
          />
        </div>
      </div>
    </div>
  );
}
