import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";

export default function CitiesSection() {
  const t = useTranslations("Cities");

  // City copy pulled from translations (keyed by slug) rather than the
  // seed data array — this section is intentionally hand-curated (photo,
  // description) rather than auto-generated, since it's the visitor's
  // first real decision point. Adding Toronto/Montreal later means adding
  // one more card + translation entries, not touching this component.
  const cityCards = [
    { slug: "ottawa", key: "ottawa" as const },
    { slug: "gatineau", key: "gatineau" as const }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container-content">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mt-3 text-ink/60">{t("subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {cityCards.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="card group relative flex min-h-[280px] flex-col justify-end overflow-hidden p-7"
            >
              {/* Placeholder gradient stands in for real city photography */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute inset-0 -z-10 bg-forest/20" />
              <div className="relative">
                <p className="text-sm font-medium uppercase tracking-wide text-cream/70">
                  {t(`${city.key}.province`)}
                </p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-cream">
                  {t(`${city.key}.name`)}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-cream/80">
                  {t(`${city.key}.description`)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cream group-hover:gap-2.5 transition-all">
                  {t(`${city.key}.cta`)}
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}

          {/* Reserved slot — communicates expansion without overpromising a date */}
          <div className="card flex min-h-[280px] flex-col items-start justify-center border-dashed p-7 text-ink/40 sm:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide">{t("comingSoon")}</p>
            <p className="mt-1 text-sm">Toronto · Montreal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
