import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { stockPhotos } from "@/lib/media/stockPhotos";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink sm:min-h-screen">
      <Image
        src={stockPhotos.heroBuilding}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />

      <div className="container-wide relative pb-16 pt-40 sm:pb-24 sm:pt-56">
        <p className="eyebrow-on-dark">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-2xl font-heading text-4xl font-medium leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
          {t("headline")}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg">
          {t("subheadline")}
        </p>
        <div className="mt-8">
          <Link href="/apartments" className="btn-on-dark">
            {t("ctaPrimary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
