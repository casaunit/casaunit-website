import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { units } from "@/data/seed/units";
import PropertyCard from "@/components/property/PropertyCard";

export default function FeaturedApartments() {
  const t = useTranslations("Featured");
  const featured = units.slice(0, 3);

  return (
    <section className="bg-cream-soft py-16 sm:py-24">
      <div className="container-content">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">{t("title")}</h2>
            <p className="mt-3 max-w-lg text-ink/60">{t("subtitle")}</p>
          </div>
          <Link href="/apartments" className="btn-secondary shrink-0">
            {t("viewAll")}
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((unit) => (
            <PropertyCard key={unit.id} unit={unit} />
          ))}
        </div>
      </div>
    </section>
  );
}
