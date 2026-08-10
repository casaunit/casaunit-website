import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { getStartingPrices, PriceCategory } from "@/lib/pricing/getStartingPrices";

const ORDER: PriceCategory[] = ["studio", "1br", "2br", "3br"];

/**
 * Premium "starting from" price band — Talisman-style simplicity, no
 * SaaS cards. Prices come from live inventory (lowest real rent per
 * bedroom category) with a graceful fallback to Zak's placeholder
 * figures for any category with no priced units yet — see
 * lib/pricing/getStartingPrices.ts.
 */
export default async function StartingPrices() {
  const t = await getTranslations("StartingPrices");
  const prices = await getStartingPrices();
  const byCategory = Object.fromEntries(prices.map((p) => [p.category, p]));

  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="container-wide">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-medium text-ink sm:text-3xl">{t("title")}</h2>
          <p className="mt-2 text-ink/60">{t("subtitle")}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 divide-y divide-border border-y border-border sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:border-y-0 sm:border-t sm:border-b">
          {ORDER.map((category) => {
            const entry = byCategory[category];
            return (
              <div key={category} className="flex flex-col items-start gap-1.5 px-1 py-6 sm:px-8 sm:py-8">
                <p className="eyebrow">{t(`categories.${category}`)}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/45">{t("from")}</p>
                <p className="font-heading text-3xl font-medium text-ink sm:text-4xl">
                  {entry.price.toLocaleString()} $
                  <span className="ml-1 text-base font-normal text-ink/50">{t("perMonth")}</span>
                </p>
              </div>
            );
          })}
        </div>

        <Link
          href="/apartments"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
        >
          {t("cta")}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
