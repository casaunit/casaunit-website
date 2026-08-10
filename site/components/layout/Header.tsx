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

  const links = [
    { href: "/ottawa/apartments", label: t("findHome") },
    { href: "/ottawa", label: t("ottawa") },
    { href: "/gatineau", label: t("gatineau") },
    { href: "/how-it-works", label: t("howItWorks") },
    { href: "/moving-to-canada", label: t("movingToCanada") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/90 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          {/* White logo mark needs a dark backdrop to read against the
             light header — swap for a color/dark variant if you'd rather
             not have the badge. */}
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink p-1.5">
            <Image src="/logo-icon-white.png" alt="CasaUnit" width={28} height={28} className="h-full w-full object-contain" />
          </span>
          <span className="font-heading text-lg font-bold text-ink sm:text-xl">CasaUnit</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <Link href="/find-my-apartment" className="btn-primary">
            {t("cta")}
          </Link>
        </div>

        <button
          className="p-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-cream lg:hidden">
          <nav className="container-content flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink/80 hover:bg-ink/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between px-2">
              <LanguageSwitcher />
              <Link href="/find-my-apartment" className="btn-primary" onClick={() => setOpen(false)}>
                {t("cta")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
