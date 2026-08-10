import { useTranslations } from "next-intl";
import { ShieldCheck, Users, Receipt, MapPin, PlaneTakeoff, Languages } from "lucide-react";

export default function TrustSection() {
  const t = useTranslations("Trust");

  const items = [
    { icon: ShieldCheck, key: "verified" as const },
    { icon: Users, key: "advisors" as const },
    { icon: Receipt, key: "pricing" as const },
    { icon: MapPin, key: "local" as const },
    { icon: PlaneTakeoff, key: "beforeArrival" as const },
    { icon: Languages, key: "languages" as const }
  ];

  return (
    <section className="bg-ink py-16 text-cream sm:py-24">
      <div className="container-content">
        <h2 className="max-w-2xl font-heading text-3xl font-bold sm:text-4xl">{t("title")}</h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream/10 text-cream">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold">{t(`${item.key}.title`)}</h3>
                  <p className="mt-1 text-sm text-cream/60">{t(`${item.key}.description`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
