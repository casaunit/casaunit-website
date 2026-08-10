import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Building2, Users, ShieldCheck, Zap } from "lucide-react";
import { Locale } from "@/routing";
import { stockPhotos } from "@/lib/media/stockPhotos";
import LandlordForm from "@/components/leads/LandlordForm";

export const metadata: Metadata = {
  title: "Vous êtes propriétaire ? | CasaUnit",
  description: "Faites connaître vos unités disponibles à des locataires sérieux, prêts à s'installer à Ottawa et Gatineau."
};

export default async function LandlordsPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations("Landlords");

  const benefits = [
    { icon: Users, key: "renters" as const },
    { icon: Zap, key: "speed" as const },
    { icon: ShieldCheck, key: "quality" as const },
    { icon: Building2, key: "control" as const }
  ];

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink">
        <Image src={stockPhotos.landlordBuilding} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="container-wide relative pb-14 pt-32 sm:pb-20">
          <p className="eyebrow-on-dark">{t("eyebrow")}</p>
          <h1 className="mt-3 max-w-2xl font-heading text-4xl font-medium text-cream sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-cream/75">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("benefitsEyebrow")}</p>
            <h2 className="mt-3 font-heading text-3xl font-medium text-ink sm:text-4xl">{t("benefitsTitle")}</h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.key}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/10 text-forest">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-medium text-ink">{t(`benefits.${b.key}.title`)}</h3>
                  <p className="mt-1.5 text-sm text-ink/60">{t(`benefits.${b.key}.description`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream-soft py-16 sm:py-24">
        <div className="container-wide max-w-2xl">
          <p className="eyebrow">{t("formEyebrow")}</p>
          <h2 className="mt-3 font-heading text-3xl font-medium text-ink sm:text-4xl">{t("formTitle")}</h2>
          <p className="mt-3 text-ink/60">{t("formSubtitle")}</p>

          <div className="mt-8 border border-border bg-white p-6 sm:p-8">
            <LandlordForm />
          </div>
        </div>
      </section>
    </div>
  );
}
