import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { stockPhotos } from "@/lib/media/stockPhotos";

/**
 * Homepage hero — cinematic, contrasted treatment over Image 6
 * (waterfront residential district). A deep navy scrim sits over the
 * full photo (stronger on the left, where the copy lives, tapering
 * toward the right so the architecture stays rich and visible) with
 * white typography on top. Deliberately not washed out and deliberately
 * not black-crush — the goal is premium real-estate photography with
 * enough contrast to read cleanly. Loads eagerly (priority) since it's
 * always the first thing painted; the section directly below returns to
 * a bright white marketplace, and that jump in contrast is intentional.
 */
export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex min-h-[80vh] overflow-hidden bg-ink sm:min-h-[88vh]">
      <Image
        src={stockPhotos.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ filter: "saturate(1.1) contrast(1.06)" }}
        className="object-cover object-[78%_center] sm:object-[68%_center]"
      />

      {/* Mobile: navy scrim rising from the bottom so white text sits over it. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/20 sm:hidden" />
      {/* Desktop: cinematic navy wash — stronger on the left (text side), tapering toward the architecture on the right. */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/80 via-ink/45 to-ink/20 sm:block" />
      {/* Subtle top/bottom vignette for depth, both breakpoints. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/35" />

      <div className="container-wide relative flex flex-1 flex-col justify-end pb-12 pt-40 sm:justify-center sm:pb-0 sm:pt-0">
        <div className="max-w-lg">
          <p className="eyebrow-on-dark">{t("eyebrow")}</p>
          <h1 className="mt-4 font-heading text-4xl font-medium leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/85 sm:text-lg">
            {t("subheadline")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/apartments" className="btn-on-dark">
              {t("ctaPrimary")}
            </Link>
            <Link href="/guide" className="btn-outline-on-dark">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
