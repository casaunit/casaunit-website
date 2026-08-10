import { useTranslations } from "next-intl";
import { ClipboardList, Search, MessageSquare, KeyRound } from "lucide-react";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    { icon: ClipboardList, key: "step1" as const },
    { icon: Search, key: "step2" as const },
    { icon: MessageSquare, key: "step3" as const },
    { icon: KeyRound, key: "step4" as const }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container-content">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-ink/60">{t("subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.key}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/10 text-forest">
                  <Icon size={22} />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-terracotta">
                  {t("title")} {i + 1}
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold text-ink">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm text-ink/60">{t(`${step.key}.description`)}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-xs text-ink/45">{t("disclaimer")}</p>
      </div>
    </section>
  );
}
