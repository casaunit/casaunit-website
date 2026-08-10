import Image from "next/image";

interface StorySectionProps {
  number: string; // "01", "02", "03"
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

/**
 * A single alternating image/text block — the Talisman-inspired visual
 * rhythm requested for the homepage's three-part story (Trouvez /
 * Préparez / Installez-vous). Text stays short by design; the photo
 * carries most of the section's weight.
 */
export default function StorySection({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false
}: StorySectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div
        className={`container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink/5">
          <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>

        <div className="max-w-md">
          <span className="font-heading text-sm font-medium text-forest">{number}</span>
          <h3 className="mt-3 font-heading text-2xl font-medium leading-tight text-ink sm:text-3xl">
            {title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink/60">{description}</p>
        </div>
      </div>
    </section>
  );
}
