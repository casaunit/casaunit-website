import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { stockPhotos } from "@/lib/media/stockPhotos";

/**
 * Homepage hero — bright, left-aligned over Image 6 (waterfront
 * residential district with negative space on the left, buildings on
 * the right). Deliberately NOT a dark hero: the light gradient is only
 * strong enough on the text side to keep navy copy legible, and the
 * architecture on the right stays untouched. Loads eagerly (priority)
 * since it's always the first thing painted.
 */
export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex min-h-[80vh] overflow-hidden bg-cream sm:min-h-[88vh]">
      <Image
        src={stockPhotos.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[78%_center] sm:object-[68%_center]"
      />

      {/* Mobile: soft scrim rising from the bottom so text sits over it. */}
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/55 to-transparent sm:hidden" />
      {/* Desktop: light gradient from the left only, preserving the building composition on the right. */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-cream via-cream/60 to-transparent sm:block" />

      <div className="container-wide relative flex flex-1 flex-col justify-end pb-12 pt-40 sm:justify-center sm:pb-0 sm:pt-0">
        <div className="max-w-lg">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="mt-4 font-heading text-4xl font-medium leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
            {t("headline")}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
            {t("subheadline")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/apartments" className="btn-primary">
              {t("ctaPrimary")}
            </Link>
            <Link href="/guide" className="btn-secondary">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
