import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import SearchWidget from "@/components/search/SearchWidget";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden bg-cream-soft">
      <div className="container-content grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
            {t("headline")}
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink/65 sm:text-lg">
            {t("subheadline")}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/find-my-apartment" className="btn-primary">
              {t("ctaPrimary")}
            </Link>
            <Link href="/apartments" className="btn-secondary">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        {/* Placeholder for premium hero photography — replace with real
           property/lifestyle imagery once available. */}
        <div className="hidden aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-forest/10 to-terracotta/10 lg:block" />
      </div>

      <div className="container-content pb-14 sm:pb-20 lg:pb-24 lg:-mt-6">
        <SearchWidget />
      </div>
    </section>
  );
}
