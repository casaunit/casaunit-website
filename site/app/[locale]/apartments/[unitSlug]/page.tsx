import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { BedDouble, Bath, Ruler, CalendarDays, Car, Sofa, PawPrint, Archive } from "lucide-react";
import { getAllUnits, getUnitBySlug } from "@/lib/inventory/getUnits";
import { Locale } from "@/routing";
import UnitGallery from "@/components/property/UnitGallery";
import LeadFormModal from "@/components/leads/LeadFormModal";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";

export async function generateStaticParams() {
  const units = await getAllUnits();
  return units.map((u) => ({ unitSlug: u.slug }));
}

export async function generateMetadata({
  params: { unitSlug }
}: {
  params: { unitSlug: string };
}): Promise<Metadata> {
  const unit = await getUnitBySlug(unitSlug);
  if (!unit) return {};
  return {
    title: `${unit.publicLabel} — ${unit.city} | CasaUnit`,
    description: unit.descriptionEn
  };
}

export default async function UnitDetailPage({
  params: { locale, unitSlug }
}: {
  params: { locale: Locale; unitSlug: string };
}) {
  setRequestLocale(locale);

  const unit = await getUnitBySlug(unitSlug);
  if (!unit) notFound();

  const t = await getTranslations("UnitDetail");
  const description = locale === "fr" ? unit.descriptionFr : unit.descriptionEn;
  const unitLabel = `${unit.publicLabel} — ${unit.city}`;

  return (
    <div className="container-wide py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <UnitGallery images={unit.images} alt={unit.publicLabel} />

          <div className="mt-8">
            <p className="text-sm text-ink/50">
              {unit.neighbourhood ? `${unit.neighbourhood}, ` : ""}
              {unit.city}
            </p>
            <h1 className="mt-1 font-heading text-3xl font-bold sm:text-4xl">{unit.publicLabel}</h1>
            {unit.floor && <p className="mt-1 text-ink/50">{t("floorLabel")} {unit.floor}</p>}

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat icon={BedDouble} label={t("bedrooms")} value={unit.bedrooms} />
              <Stat icon={Bath} label={t("bathrooms")} value={unit.bathrooms} />
              {unit.squareFeet && <Stat icon={Ruler} label={t("sqft")} value={unit.squareFeet} />}
              <Stat
                icon={CalendarDays}
                label={t("availableFrom")}
                value={unit.availableDate || t("tbd")}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge icon={Sofa}>{unit.furnished ? t("furnished") : t("unfurnished")}</Badge>
              <Badge icon={Car}>{unit.parking ? t("parkingAvailable") : t("noParking")}</Badge>
              <Badge icon={Archive}>{unit.locker ? t("lockerAvailable") : t("noLocker")}</Badge>
              <Badge icon={PawPrint}>{unit.petsAllowed ? t("petsAllowed") : t("noPets")}</Badge>
            </div>

            {unit.commonAreaImages.length > 0 && (
              <>
                <h2 className="mt-10 font-heading text-xl font-bold">{t("commonAreas")}</h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {unit.commonAreaImages.map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-forest/10">
                      <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </>
            )}

            <h2 className="mt-10 font-heading text-xl font-bold">{t("description")}</h2>
            <p className="mt-2 text-ink/65">{description}</p>

            {unit.amenities.length > 0 && (
              <>
                <h2 className="mt-8 font-heading text-xl font-bold">{t("amenities")}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {unit.amenities.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-sm text-ink/70"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}

            {unit.utilitiesIncluded.length > 0 && (
              <>
                <h2 className="mt-8 font-heading text-xl font-bold">{t("utilities")}</h2>
                <ul className="mt-2 list-inside list-disc text-ink/65">
                  {unit.utilitiesIncluded.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-8 font-heading text-xl font-bold">{t("neighbourhoodArea")}</h2>
            <div className="mt-2 aspect-video w-full rounded-xl bg-forest/10" />
            <p className="mt-2 text-xs text-ink/40">{t("mapPlaceholder")}</p>
          </div>
        </div>

        {/* Sticky sidebar: price + primary CTA */}
        <div className="h-fit lg:sticky lg:top-24">
          <div className="card p-6">
            <p className="font-heading text-3xl font-bold text-ink">
              {unit.monthlyRent > 0 ? `$${unit.monthlyRent.toLocaleString()}` : "—"}
              <span className="text-base font-medium text-ink/50">/{t("month")}</span>
            </p>
            <p className="mt-1 text-sm text-ink/50">{t("subjectToApproval")}</p>

            <div className="mt-6">
              <LeadFormModal
                triggerLabel={t("interestedCta")}
                unitViewedId={unit.id}
                buildingViewedId={unit.buildingId}
                unitLabel={unitLabel}
                initialCity={unit.city}
                triggerClassName="btn-primary w-full justify-center"
              />
            </div>

            <div className="mt-3">
              <WhatsAppButton
                variant="banner"
                context={unit.slug}
                message={t("whatsappMessage", { unit: unitLabel })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <Icon size={18} className="text-forest" />
      <p className="mt-2 text-lg font-bold text-ink">{value}</p>
      <p className="text-xs text-ink/50">{label}</p>
    </div>
  );
}

function Badge({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-ink/70">
      <Icon size={15} /> {children}
    </span>
  );
}
