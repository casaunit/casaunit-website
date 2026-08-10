import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { cities } from "@/data/seed/cities";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <div className="container-content grid grid-cols-2 gap-10 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Image src="/logo-white.png" alt="CasaUnit" width={140} height={90} className="h-10 w-auto object-contain object-left" />
          <p className="mt-3 max-w-[220px] text-sm text-cream/60">{t("tagline")}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream">{t("cities")}</p>
          <ul className="mt-3 space-y-2">
            {cities.map((city) => (
              <li key={city.id}>
                <Link href={`/${city.slug}`} className="text-sm text-cream/60 hover:text-cream">
                  {city.nameEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream">{t("company")}</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/how-it-works" className="text-sm text-cream/60 hover:text-cream">
                {nav("howItWorks")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-cream/60 hover:text-cream">
                {nav("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-cream/60 hover:text-cream">
                {nav("contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-cream">{t("legal")}</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/privacy-policy" className="text-sm text-cream/60 hover:text-cream">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use" className="text-sm text-cream/60 hover:text-cream">
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="text-sm text-cream/60 hover:text-cream">
                {t("cookies")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5">
        <p className="container-content text-xs text-cream/40">
          © {new Date().getFullYear()} CasaUnit. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
