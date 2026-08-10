/**
 * Curated, free-to-use Unsplash photography used for lifestyle/city/guide
 * imagery site-wide (hero sections, story blocks, the Guide d'installation,
 * the landlord page). Every ID below was verified against its Unsplash
 * page and confirmed "Free to use under the Unsplash License" (not
 * Unsplash+/premium) before being added here.
 *
 * IMPORTANT — this is decorative/editorial photography only. It never
 * represents actual CasaUnit apartment inventory — real unit photos come
 * exclusively from Airtable (see lib/inventory/getUnits.ts). Swap any of
 * these for your own photography at any time by changing the ID here —
 * no other file needs to change.
 */
function unsplash(id: string) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;
}

export const stockPhotos = {
  // Zak-supplied photography (2026-08 iteration) — assigned to specific
  // sections per his brief. Do not swap these for stock/generated images
  // without asking him first; each one has a designated purpose below.
  heroImage: "/images/image6-hero.jpg", // homepage hero — waterfront residential district, negative space left
  airportArrival: "/images/image1-airport-arrival.jpg", // family at airport, "Destination Canada" signage — homepage "Arrival" teaser + Guide arrival section
  cityLifestyle: "/images/image2-city-lifestyle.jpg", // Ottawa/Gatineau waterfront skyline at night
  keysMovingIn: "/images/image3-keys.jpg", // family receiving keys to their new home
  interiorShowcase: "/images/image4-interior.jpg", // premium apartment interior — real-estate storytelling section
  landlordBuilding: "/images/image5-landlord-building.jpg", // premium waterfront building at dusk — property owner sections

  // Verified free-license Unsplash photography (unchanged, not part of
  // the 6 supplied images) — still used by city pages + guide sections.
  buildingOttawa: unsplash("1479839672679-a46483c0e7c8"), // white modern apartment building
  buildingGatineau: unsplash("1755735340764-3b077cab0c5c"), // apartment building, trees + sky
  guideMoney: unsplash("1772588627327-1eeddcf73c11"), // documents + calculator
  guidePhone: unsplash("1687720106084-d6e235ad226c"), // SIM/card close-up
  guideTransit: unsplash("1712212308848-b17bd6f70be7"), // public transit bus
  guideChecklist: unsplash("1661956600684-97d3a4320e45") // laptop + coffee, planning
} as const;
