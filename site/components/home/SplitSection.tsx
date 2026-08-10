import Image from "next/image";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";

interface SplitSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  imagePosition?: string; // Tailwind object-position value, e.g. "center 30%"
  ctaLabel?: string;
  // Typed as string and cast at the call site — the routing.ts pathnames
  // union is stricter than a plain string, same pattern as LanguageSwitcher.tsx.
  ctaHref?: string;
  reverse?: boolean;
}

/**
 * Reusable alternating image/text block used for every editorial
 * homepage moment (real estate, arrival guide, keys/settle-in, landlord
 * teaser). Image always keeps its natural framing via `imagePosition`
 * instead of a blind center-crop. Description and CTA are optional so
 * the same component works for both a full pitch (with button) and a
 * minimal, emotional beat (title + short line, no CTA).
 */
export default function SplitSection({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "center",
  ctaLabel,
  ctaHref,
  reverse = false
}: SplitSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div
        className={`container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectPosition: imagePosition }}
            className="object-cover"
          />
        </div>

        <div className="max-w-md">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h3 className={`font-heading text-2xl font-medium leading-tight text-ink sm:text-3xl ${eyebrow ? "mt-3" : ""}`}>
            {title}
          </h3>
          {description && <p className="mt-4 text-base leading-relaxed text-ink/60">{description}</p>}
          {ctaLabel && ctaHref && (
            <Link href={ctaHref as any} className="btn-secondary mt-7">
              {ctaLabel}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
