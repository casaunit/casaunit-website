import { useLocale, useTranslations } from "next-intl";
import { BedDouble, Bath, Ruler, CalendarDays } from "lucide-react";
import { Link } from "@/lib/navigation";
import { Unit } from "@/types/unit";

interface PropertyCardProps {
  unit: Unit;
}

const typeLabel: Record<string, { en: string; fr: string }> = {
  studio: { en: "Studio", fr: "Studio" },
  "1br": { en: "1 Bedroom", fr: "1 chambre" },
  "1br_den": { en: "1 Bedroom + Den", fr: "1 chambre + bureau" },
  "2br": { en: "2 Bedrooms", fr: "2 chambres" },
  "2br_den": { en: "2 Bedrooms + Den", fr: "2 chambres + bureau" },
  "3br": { en: "3 Bedrooms", fr: "3 chambres" }
};

export default function PropertyCard({ unit }: PropertyCardProps) {
  const t = useTranslations("Featured");
  const locale = useLocale() as "en" | "fr";

  const label = typeLabel[unit.apartmentType];
  const description = locale === "fr" ? unit.descriptionFr : unit.descriptionEn;

  return (
    <Link href={`/apartments/${unit.slug}`} className="card group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-forest/10">
        {/* Real photo goes here once inventory is connected */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium uppercase tracking-wide text-ink/30">
          {unit.isPlaceholder ? t("placeholderNotice") : ""}
        </div>
        {unit.status === "coming_soon" && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream">
            Coming Soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">
          {label ? (locale === "fr" ? label.fr : label.en) : ""}
        </p>
        <h3 className="mt-1 font-heading text-lg font-bold text-ink">{unit.buildingName}</h3>
        <p className="text-sm text-ink/55">
          {unit.neighbourhood ? `${unit.neighbourhood}, ` : ""}
          {unit.city}
        </p>

        <p className="mt-3 font-heading text-xl font-bold text-ink">
          {unit.monthlyRent > 0 ? `$${unit.monthlyRent.toLocaleString()}/mo` : "—"}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink/60">
          <span className="flex items-center gap-1.5">
            <BedDouble size={16} /> {unit.bedrooms} {t("bedrooms")}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={16} /> {unit.bathrooms} {t("bathrooms")}
          </span>
          {unit.squareFeet && (
            <span className="flex items-center gap-1.5">
              <Ruler size={16} /> {unit.squareFeet} {t("sqft")}
            </span>
          )}
        </div>

        {unit.availableDate && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/60">
            <CalendarDays size={16} />
            {t("availableFrom")} {unit.availableDate}
          </p>
        )}

        <p className="mt-3 line-clamp-2 text-sm text-ink/55">{description}</p>

        <span className="mt-4 inline-flex items-center justify-center rounded-xl border border-ink/15 py-2.5 text-sm font-semibold text-ink transition-colors group-hover:bg-ink group-hover:text-cream">
          {t("viewUnit")}
        </span>
      </div>
    </Link>
  );
}
