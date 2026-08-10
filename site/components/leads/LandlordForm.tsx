"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cities } from "@/data/seed/cities";
import { getStoredAttribution } from "@/lib/utm/attribution";
import { trackEvent } from "@/lib/analytics/events";

const unitsCountOptions = ["1", "2-5", "6-20", "20+"];

export default function LandlordForm() {
  const t = useTranslations("LandlordForm");
  const locale = useLocale();

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const attribution = getStoredAttribution() || {};

    const payload = {
      contactName: form.get("contactName"),
      email: form.get("email"),
      phone: form.get("phone"),
      companyOrOwnerName: form.get("companyOrOwnerName") || undefined,
      propertyCity: form.get("propertyCity"),
      propertyAddress: form.get("propertyAddress") || undefined,
      unitsCount: form.get("unitsCount") || undefined,
      message: form.get("message") || undefined,
      consentMarketing: form.get("consentMarketing") === "on",
      website: form.get("website") || "",
      ...attribution
    };

    try {
      const res = await fetch("/api/landlord-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors ? Object.values(data.errors).flat().join(" ") : "Submission failed");
      }

      trackEvent("landlord_lead_submitted", { city: payload.propertyCity });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 size={40} className="text-forest" />
        <p className="font-heading text-lg font-medium text-ink">{t("successTitle")}</p>
        <p className="max-w-sm text-sm text-ink/60">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("contactName")} required>
          <input name="contactName" required className="input" />
        </Field>
        <Field label={t("companyOrOwnerName")}>
          <input name="companyOrOwnerName" className="input" />
        </Field>
        <Field label={t("email")} required>
          <input name="email" type="email" required className="input" />
        </Field>
        <Field label={t("phone")} required>
          <input name="phone" type="tel" required className="input" />
        </Field>
        <Field label={t("propertyCity")} required>
          <select name="propertyCity" required defaultValue="" className="input">
            <option value="">{t("select")}</option>
            {cities.filter((c) => c.isActive).map((c) => (
              <option key={c.id} value={c.slug}>
                {locale === "fr" ? c.nameFr : c.nameEn}
              </option>
            ))}
            <option value="other">{t("otherCity")}</option>
          </select>
        </Field>
        <Field label={t("unitsCount")}>
          <select name="unitsCount" defaultValue="" className="input">
            <option value="">{t("select")}</option>
            {unitsCountOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("propertyAddress")} className="sm:col-span-2">
          <input name="propertyAddress" className="input" />
        </Field>
      </div>

      <Field label={t("message")}>
        <textarea name="message" rows={4} className="input resize-none" />
      </Field>

      <label className="flex items-start gap-2.5 text-sm text-ink/70">
        <input
          type="checkbox"
          name="consentMarketing"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border"
        />
        <span>{t("consent")}</span>
      </label>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMessage || t("errorMessage")}</p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary justify-center">
        {status === "submitting" ? <Loader2 size={18} className="mr-2 animate-spin" /> : null}
        {t("submit")}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  className,
  children
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className || ""}`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </span>
      {children}
    </label>
  );
}
