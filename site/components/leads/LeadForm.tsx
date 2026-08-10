"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cities } from "@/data/seed/cities";
import { budgetRanges, apartmentTypes } from "@/components/search/options";
import { parseBudgetRange } from "@/lib/search/parseBudgetRange";
import { getStoredAttribution } from "@/lib/utm/attribution";
import { trackEvent } from "@/lib/analytics/events";

interface LeadFormProps {
  initialCity?: string;
  initialBudget?: string; // range value, e.g. "1500-2000"
  initialBedrooms?: string;
  initialMoveIn?: string;
  unitViewedId?: string;
  buildingViewedId?: string;
  unitLabel?: string; // e.g. "2 Bedroom + Den — [Sample Building Name]" for confirmation display
  onSuccess?: () => void;
}

export default function LeadForm({
  initialCity = "",
  initialBudget = "",
  initialBedrooms = "",
  initialMoveIn = "",
  unitViewedId,
  buildingViewedId,
  unitLabel,
  onSuccess
}: LeadFormProps) {
  const t = useTranslations("LeadForm");
  const locale = useLocale();

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [startedTracked, setStartedTracked] = useState(false);

  function trackStartOnce() {
    if (!startedTracked) {
      trackEvent("lead_form_started", { unitViewedId, buildingViewedId });
      setStartedTracked(true);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const budgetValue = String(form.get("budget") || "");
    const { min, max } = parseBudgetRange(budgetValue);
    const attribution = getStoredAttribution() || {};

    const payload = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      whatsapp: form.get("whatsapp"),
      email: form.get("email"),
      currentCountry: form.get("currentCountry"),
      preferredCity: form.get("preferredCity"),
      preferredNeighbourhood: form.get("preferredNeighbourhood") || undefined,
      budgetMin: min,
      budgetMax: max,
      bedrooms: form.get("bedrooms"),
      moveInDate: form.get("moveInDate") || undefined,
      arrivalDate: form.get("arrivalDate") || undefined,
      occupants: form.get("occupants") ? Number(form.get("occupants")) : undefined,
      needsParking: form.get("needsParking") === "on",
      hasPets: form.get("hasPets") === "on",
      furnishedPreference: form.get("furnishedPreference") || undefined,
      immigrationStatus: form.get("immigrationStatus") || undefined,
      additionalComments: form.get("additionalComments") || undefined,
      unitViewedId,
      buildingViewedId,
      consentMarketing: form.get("consentMarketing") === "on",
      website: form.get("website") || "", // honeypot
      ...attribution
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors ? Object.values(data.errors).flat().join(" ") : "Submission failed");
      }

      trackEvent("lead_submitted", { unitViewedId, buildingViewedId, city: payload.preferredCity });
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 size={40} className="text-forest" />
        <p className="font-heading text-lg font-bold text-ink">{t("successTitle")}</p>
        <p className="max-w-sm text-sm text-ink/60">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={trackStartOnce} className="flex flex-col gap-6">
      {unitLabel && (
        <div className="rounded-xl bg-forest/10 px-4 py-3 text-sm font-medium text-forest">
          {t("attachedUnit")}: {unitLabel}
        </div>
      )}

      {/* Honeypot — hidden from real visitors via CSS, not display:none (some bots skip those) */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("firstName")} required>
          <input name="firstName" required className="input" />
        </Field>
        <Field label={t("lastName")} required>
          <input name="lastName" required className="input" />
        </Field>
        <Field label={t("whatsapp")} required>
          <input name="whatsapp" type="tel" required className="input" placeholder="+212 6XX XXX XXX" />
        </Field>
        <Field label={t("email")} required>
          <input name="email" type="email" required className="input" />
        </Field>
        <Field label={t("currentCountry")}>
          <input name="currentCountry" className="input" />
        </Field>
        <Field label={t("preferredCity")} required>
          <select name="preferredCity" required defaultValue={initialCity} className="input">
            <option value="">{t("select")}</option>
            {cities.filter((c) => c.isActive).map((c) => (
              <option key={c.id} value={c.slug}>
                {locale === "fr" ? c.nameFr : c.nameEn}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("preferredNeighbourhood")}>
          <input name="preferredNeighbourhood" className="input" />
        </Field>
        <Field label={t("budget")} required>
          <select name="budget" required defaultValue={initialBudget} className="input">
            <option value="">{t("select")}</option>
            {budgetRanges.map((r) => (
              <option key={r.value} value={r.value}>
                {locale === "fr" ? r.labelFr : r.labelEn}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("bedrooms")} required>
          <select name="bedrooms" required defaultValue={initialBedrooms} className="input">
            <option value="">{t("select")}</option>
            {apartmentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {locale === "fr" ? type.labelFr : type.labelEn}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("moveInDate")}>
          <input name="moveInDate" type="date" defaultValue={initialMoveIn} className="input" />
        </Field>
        <Field label={t("arrivalDate")}>
          <input name="arrivalDate" type="date" className="input" />
        </Field>
        <Field label={t("occupants")}>
          <input name="occupants" type="number" min={1} className="input" />
        </Field>
        <Field label={t("furnishedPreference")}>
          <select name="furnishedPreference" defaultValue="no_preference" className="input">
            <option value="no_preference">{t("noPreference")}</option>
            <option value="furnished">{t("furnished")}</option>
            <option value="unfurnished">{t("unfurnished")}</option>
          </select>
        </Field>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="needsParking" className="h-4 w-4 rounded border-border" />
          {t("needsParking")}
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input type="checkbox" name="hasPets" className="h-4 w-4 rounded border-border" />
          {t("hasPets")}
        </label>
      </div>

      <Field label={t("immigrationStatus")} hint={t("immigrationStatusHint")}>
        <input name="immigrationStatus" className="input" />
      </Field>

      <Field label={t("additionalComments")}>
        <textarea name="additionalComments" rows={3} className="input resize-none" />
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
        {status === "submitting" ? (
          <Loader2 size={18} className="mr-2 animate-spin" />
        ) : null}
        {t("submit")}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  children
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-ink/40">{hint}</span>}
    </label>
  );
}
