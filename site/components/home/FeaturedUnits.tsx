import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { getAllUnits } from "@/lib/inventory/getUnits";
import PropertyCard from "@/components/property/PropertyCard";

/**
 * Homepage marketplace preview — shows a handful of available units
 * directly under the search bar so visitors can start browsing within
 * seconds, per the "marketplace first" priority. Pulls from the same
 * getAllUnits() source as the full /apartments listing (Airtable when
 * configured, seed data otherwise), so this never needs separate wiring
 * once real inventory is connected — it just shows fewer of them.
 */
export default async function FeaturedUnits() {
  const t = await getTranslations("FeaturedUnits");
  const units = (await getAllUnits()).slice(0, 6);

  if (units.length === 0) return null;

  return (
    <section className="py-14 sm:py-20">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl font-medium text-ink sm:text-3xl">{t("title")}</h2>
          <Link
            href="/apartments"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors hover:text-ink sm:inline-flex"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <PropertyCard key={unit.id} unit={unit} />
          ))}
        </div>

        <Link
          href="/apartments"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors hover:text-ink sm:hidden"
        >
          {t("viewAll")}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
