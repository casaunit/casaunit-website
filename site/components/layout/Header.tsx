"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/lib/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("Nav");

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur">
      <div className="container-wide flex h-16 items-center justify-between py-3 sm:h-20">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink p-1.5">
            <Image
              src="/logo-icon-white.png"
              alt="CasaUnit"
              width={28}
              height={28}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="font-heading text-lg font-semibold text-ink sm:text-xl">CasaUnit</span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          <Link href="/" className="text-sm font-medium text-ink/70 transition-colors hover:text-ink">
            {t("home")}
          </Link>
          <Link href="/guide" className="text-sm font-medium text-ink/70 transition-colors hover:text-ink">
            {t("guide")}
          </Link>
          <Link
            href="/landlords"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-1.5 text-sm font-medium text-ink/80 transition-colors hover:border-ink/30 hover:text-ink"
          >
            {t("landlords")}
          </Link>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher />
          <Link href="/apartments" className="btn-primary">
            {t("cta")}
          </Link>
        </div>

        <button className="p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream lg:hidden">
          <nav className="container-wide flex flex-col gap-1 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink/80 hover:bg-ink/5"
            >
              {t("home")}
            </Link>
            <Link
              href="/apartments"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink/80 hover:bg-ink/5"
            >
              {t("cta")}
            </Link>
            <Link
              href="/guide"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink/80 hover:bg-ink/5"
            >
              {t("guide")}
            </Link>
            <Link
              href="/landlords"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink/80 hover:bg-ink/5"
            >
              {t("landlords")}
            </Link>
            <div className="mt-2 flex items-center justify-between px-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
