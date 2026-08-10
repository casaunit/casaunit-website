"use client";

import { useState } from "react";
import Image from "next/image";

interface UnitGalleryProps {
  images: string[];
  alt: string;
}

export default function UnitGallery({ images, alt }: UnitGalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-forest/10 to-terracotta/10" />
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-forest/10">
        <Image src={images[active]} alt={alt} fill className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === active ? "border-terracotta" : "border-transparent"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
