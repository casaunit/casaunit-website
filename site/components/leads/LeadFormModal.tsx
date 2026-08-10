"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import LeadForm from "./LeadForm";

interface LeadFormModalProps {
  triggerLabel: string;
  unitViewedId?: string;
  buildingViewedId?: string;
  unitLabel?: string;
  initialCity?: string;
  triggerClassName?: string;
}

/**
 * Wraps LeadForm in a modal. Used for the unit detail page's
 * "I'm Interested in This Unit" CTA so the visitor's selected apartment
 * is attached to the lead without leaving the page.
 */
export default function LeadFormModal({
  triggerLabel,
  unitViewedId,
  buildingViewedId,
  unitLabel,
  initialCity,
  triggerClassName = "btn-primary w-full justify-center sm:w-auto"
}: LeadFormModalProps) {
  const t = useTranslations("LeadForm");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={triggerClassName}
      >
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-cream p-6 sm:rounded-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-ink">{t("title")}</h2>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={22} />
              </button>
            </div>

            <LeadForm
              unitViewedId={unitViewedId}
              buildingViewedId={buildingViewedId}
              unitLabel={unitLabel}
              initialCity={initialCity}
            />
          </div>
        </div>
      )}
    </>
  );
}
