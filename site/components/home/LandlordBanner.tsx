import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";

export default function LandlordBanner() {
  const t = useTranslations("LandlordBanner");

  return (
    <section className="bg-ink py-16 text-cream sm:py-24">
      <div className="container-wide flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-xl">
          <p className="eyebrow-on-dark">{t("eyebrow")}</p>
          <h2 className="mt-3 font-heading text-3xl font-medium sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-cream/65">{t("description")}</p>
        </div>
        <Link href="/landlords" className="btn-on-dark shrink-0">
          {t("cta")}
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}
