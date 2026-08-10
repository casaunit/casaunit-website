import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { stockPhotos } from "@/lib/media/stockPhotos";

export default function GuideTeaser() {
  const t = useTranslations("GuideTeaser");

  return (
    <section className="py-16 sm:py-24">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:order-2">
          <Image
            src={stockPhotos.guideChecklist}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-md lg:order-1">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-3 font-heading text-3xl font-medium text-ink sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/60">{t("description")}</p>
          <Link href="/guide" className="btn-secondary mt-7">
            {t("cta")}
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
