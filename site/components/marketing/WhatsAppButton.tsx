"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics/events";

interface WhatsAppButtonProps {
  variant?: "floating" | "banner";
  message?: string;
  context?: string; // e.g. "ottawa" or a unit slug, for analytics
}

function buildWhatsAppUrl(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const encoded = encodeURIComponent(message);
  // Falls back to a placeholder if the number hasn't been configured yet,
  // so the button never silently does nothing during development.
  return number ? `https://wa.me/${number}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}

export default function WhatsAppButton({
  variant = "floating",
  message,
  context
}: WhatsAppButtonProps) {
  const t = useTranslations("WhatsApp");
  const finalMessage = message || t("defaultMessage");
  const href = buildWhatsAppUrl(finalMessage);

  function handleClick() {
    trackEvent("whatsapp_clicked", { context: context || "global" });
  }

  if (variant === "banner") {
    return (
      <div className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-semibold text-ink">{t("bannerTitle")}</p>
          <p className="mt-1 text-sm text-ink/60">{t("bannerSubtitle")}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="btn-primary shrink-0"
        >
          <MessageCircle size={18} className="mr-2" />
          {t("bannerCta")}
        </a>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={t("floatingLabel")}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-forest px-4 py-3.5 text-cream shadow-cardHover transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={22} />
      <span className="hidden text-sm font-semibold sm:inline">{t("floatingLabel")}</span>
    </a>
  );
}
