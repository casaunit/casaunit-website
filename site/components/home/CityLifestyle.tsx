import Image from "next/image";
import { useTranslations } from "next-intl";
import { stockPhotos } from "@/lib/media/stockPhotos";

/**
 * Full-bleed lifestyle moment (Image 2 — Ottawa/Gatineau waterfront at
 * night). Unlike every other section, this photo is naturally dark, so
 * it's the one place white text over the image is correct rather than
 * navy text on a bright background. Text stays minimal by design — the
 * photography carries the section.
 */
export default function CityLifestyle() {
  const t = useTranslations("CityLifestyle");

  return (
    <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-ink sm:min-h-[70vh]">
      <Image
        src={stockPhotos.cityLifestyle}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className="container-wide relative pb-10 sm:pb-14">
        <h2 className="font-heading text-3xl font-medium text-cream sm:text-4xl">{t("title")}</h2>
      </div>
    </section>
  );
}
