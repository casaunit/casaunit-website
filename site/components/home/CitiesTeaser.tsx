import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { stockPhotos } from "@/lib/media/stockPhotos";

const cityCards = [
  { slug: "ottawa" as const, key: "ottawa" as const, image: stockPhotos.buildingOttawa },
  { slug: "gatineau" as const, key: "gatineau" as const, image: stockPhotos.buildingGatineau }
];

export default function CitiesTeaser() {
  const t = useTranslations("Cities");

  return (
    <section className="py-16 sm:py-24">
      <div className="container-wide">
        <div className="max-w-xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-3 font-heading text-3xl font-medium text-ink sm:text-4xl">{t("title")}</h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {cityCards.map((city) => (
            <Link
              key={city.slug}
              href={{ pathname: "/[city]", params: { city: city.slug } }}
              className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-xl p-7"
            >
              <Image
                src={city.image}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="relative">
                <p className="eyebrow-on-dark">{t(`${city.key}.province`)}</p>
                <h3 className="mt-2 font-heading text-2xl font-medium text-cream">
                  {t(`${city.key}.name`)}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cream transition-all group-hover:gap-2.5">
                  {t(`${city.key}.cta`)}
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
