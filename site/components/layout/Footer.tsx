import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <div className="container-wide grid gap-10 py-16 sm:grid-cols-3 sm:py-20">
        <div className="sm:col-span-1">
          <Image
            src="/logo-white.png"
            alt="CasaUnit"
            width={140}
            height={90}
            className="h-9 w-auto object-contain object-left"
          />
          <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-cream/60">{t("tagline")}</p>
        </div>

        <div>
          <p className="eyebrow-on-dark">{t("navigation")}</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/" className="text-sm text-cream/70 hover:text-cream">
                {nav("home")}
              </Link>
            </li>
            <li>
              <Link href="/apartments" className="text-sm text-cream/70 hover:text-cream">
                {nav("cta")}
              </Link>
            </li>
            <li>
              <Link href="/guide" className="text-sm text-cream/70 hover:text-cream">
                {nav("guide")}
              </Link>
            </li>
            <li>
              <Link href="/landlords" className="text-sm text-cream/70 hover:text-cream">
                {nav("landlords")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow-on-dark">{t("cities")}</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href={{ pathname: "/[city]", params: { city: "ottawa" } }} className="text-sm text-cream/70 hover:text-cream">
                Ottawa
              </Link>
            </li>
            <li>
              <Link href={{ pathname: "/[city]", params: { city: "gatineau" } }} className="text-sm text-cream/70 hover:text-cream">
                Gatineau
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5">
        <p className="container-wide text-xs text-cream/40">
          © {new Date().getFullYear()} CasaUnit. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
