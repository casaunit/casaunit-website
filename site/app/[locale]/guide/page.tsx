import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Locale } from "@/routing";
import { stockPhotos } from "@/lib/media/stockPhotos";
import GuideSection from "@/components/guide/GuideSection";

export const metadata: Metadata = {
  title: "Guide d'installation au Canada | CasaUnit",
  description: "Un guide simple et visuel pour vos premières semaines à Ottawa et Gatineau — arrivée, logement, argent, téléphone, déplacements."
};

export default async function GuidePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations("Guide");
  const s = (key: string) => t(`sections.${key}` as any);

  const sections = [
    {
      id: "arrival",
      number: "01",
      title: s("arrival.title"),
      image: stockPhotos.airportArrival,
      items: [
        {
          title: s("arrival.items.transport.title"),
          body: s("arrival.items.transport.body"),
          sourceLabel: t("sourceLabel"),
          sourceUrl: "https://www.octranspo.com/en/ottawa-destinations/ottawa-international-airport"
        },
        {
          title: s("arrival.items.steps.title"),
          body: s("arrival.items.steps.body"),
          sourceLabel: t("sourceLabel"),
          sourceUrl: "https://www.canada.ca/content/dam/ircc/documents/pdf/english/corporate/publications-manuals/welcome_to_canada_important_things_to_do_after_you_arrive_e.pdf"
        }
      ]
    },
    {
      id: "housing",
      number: "02",
      title: s("housing.title"),
      image: stockPhotos.buildingOttawa,
      items: [
        { title: s("housing.items.findUnit.title"), body: s("housing.items.findUnit.body") },
        {
          title: s("housing.items.insurance.title"),
          body: s("housing.items.insurance.body"),
          sourceLabel: t("sourceLabel"),
          sourceUrl: "https://www.rbcinsurance.com/en-ca/advice-learning/home-insurance/why-renters-need-tenant-insurance/"
        },
        {
          title: s("housing.items.utilities.title"),
          body: s("housing.items.utilities.body"),
          sourceLabel: t("sourceLabel"),
          sourceUrl: "https://hydroottawa.com/en"
        }
      ]
    },
    {
      id: "money",
      number: "03",
      title: s("money.title"),
      image: stockPhotos.guideMoney,
      items: [
        {
          title: s("money.items.bankAccount.title"),
          body: s("money.items.bankAccount.body"),
          sourceLabel: t("sourceLabel"),
          sourceUrl: "https://www.canada.ca/en/financial-consumer-agency/services/banking/opening-bank-account-newcomers.html"
        },
        { title: s("money.items.payments.title"), body: s("money.items.payments.body") }
      ]
    },
    {
      id: "phone",
      number: "04",
      title: s("phone.title"),
      image: stockPhotos.guidePhone,
      items: [
        { title: s("phone.items.number.title"), body: s("phone.items.number.body") },
        { title: s("phone.items.simPlan.title"), body: s("phone.items.simPlan.body") }
      ]
    },
    {
      id: "transit",
      number: "05",
      title: s("transit.title"),
      image: stockPhotos.guideTransit,
      items: [
        {
          title: s("transit.items.transit.title"),
          body: s("transit.items.transit.body"),
          sourceLabel: t("sourceLabel"),
          sourceUrl: "https://www.octranspo.com/en/fares/payment/where-how-to-pay/oc-transpo-sto-fares"
        },
        { title: s("transit.items.ottawaGatineau.title"), body: s("transit.items.ottawaGatineau.body") }
      ]
    },
    {
      id: "firstWeeks",
      number: "06",
      title: s("firstWeeks.title"),
      image: stockPhotos.guideChecklist,
      items: [
        {
          title: s("firstWeeks.items.checklist.title"),
          body: s("firstWeeks.items.checklist.body"),
          sourceLabel: t("sourceLabel"),
          sourceUrl: "https://ottawa.ca/en/living-ottawa/immigrating-ottawa/after-you-arrive/first-days"
        }
      ]
    }
  ];

  return (
    <div>
      <section className="bg-cream-soft py-16 sm:py-24">
        <div className="container-wide max-w-2xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="mt-3 font-heading text-4xl font-medium text-ink sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-base leading-relaxed text-ink/60">{t("subtitle")}</p>
        </div>
      </section>

      {sections.map((section, i) => (
        <GuideSection
          key={section.id}
          number={section.number}
          title={section.title}
          imageSrc={section.image}
          items={section.items}
          reverse={i % 2 === 1}
        />
      ))}

      <p className="container-wide border-t border-border py-8 text-xs text-ink/40">{t("disclaimer")}</p>
    </div>
  );
}
