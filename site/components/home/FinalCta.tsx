import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

export default function FinalCta() {
  const t = useTranslations("Hero");

  return (
    <section className="bg-forest py-16 text-cream sm:py-20">
      <div className="container-content flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-lg font-heading text-2xl font-bold sm:text-3xl">
          {t("headline")}
        </h2>
        <Link
          href="/find-my-apartment"
          className="inline-flex items-center justify-center rounded-xl bg-cream px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-cream/90"
        >
          {t("ctaPrimary")}
        </Link>
      </div>
    </section>
  );
}
