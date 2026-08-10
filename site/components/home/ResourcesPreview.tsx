import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";

// Article slugs/titles are placeholders reflecting the topics you listed —
// real articles get written and swapped in when the /resources section is built.
const articles = [
  { slug: "how-to-rent-in-canada-before-arriving", titleEn: "How to Rent an Apartment in Canada Before Arriving", titleFr: "Comment louer un appartement au Canada avant votre arrivée" },
  { slug: "ottawa-vs-gatineau", titleEn: "Ottawa vs Gatineau: Where Should You Live?", titleFr: "Ottawa vs Gatineau : où devriez-vous habiter ?" },
  { slug: "moving-to-canada-checklist", titleEn: "Moving to Canada Checklist", titleFr: "Liste de vérification pour déménager au Canada" }
];

export default function ResourcesPreview() {
  const t = useTranslations("Resources");

  return (
    <section className="py-16 sm:py-24">
      <div className="container-content">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">{t("title")}</h2>
            <p className="mt-3 text-ink/60">{t("subtitle")}</p>
          </div>
          <Link href="/resources" className="btn-secondary shrink-0">
            {t("viewAll")}
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/resources/${article.slug}`} className="card p-6">
              <div className="aspect-[16/10] rounded-xl bg-forest/10" />
              <h3 className="mt-4 font-heading text-base font-bold leading-snug text-ink">
                {article.titleEn}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                Read <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
