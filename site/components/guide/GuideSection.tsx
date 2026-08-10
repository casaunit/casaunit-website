import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface GuideItem {
  title: string;
  body: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

interface GuideSectionProps {
  number: string;
  title: string;
  imageSrc: string;
  items: GuideItem[];
  reverse?: boolean;
}

export default function GuideSection({ number, title, imageSrc, items, reverse = false }: GuideSectionProps) {
  return (
    <section className="border-t border-border py-14 sm:py-20">
      <div
        className={`container-wide grid gap-10 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:aspect-auto">
          <Image src={imageSrc} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>

        <div>
          <span className="font-heading text-sm font-medium text-forest">{number}</span>
          <h2 className="mt-2 font-heading text-2xl font-medium text-ink sm:text-3xl">{title}</h2>

          <div className="mt-6 flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.body}</p>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-ink/45 hover:text-ink/70"
                  >
                    {item.sourceLabel} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
