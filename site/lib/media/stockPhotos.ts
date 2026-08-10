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
  heroBuilding: unsplash("1769921595480-32e28eb1c155"), // modern building facade, blue sky
  livingRoom: unsplash("1648425731270-ebd373a19149"), // bright modern living room
  airportArrival: unsplash("1504150558240-0b4fd8946624"), // traveler with luggage
  movingIn: unsplash("1758523670991-ee93bc48d81d"), // couple moving boxes into new home
  buildingOttawa: unsplash("1479839672679-a46483c0e7c8"), // white modern apartment building
  buildingGatineau: unsplash("1755735340764-3b077cab0c5c"), // apartment building, trees + sky
  landlordBuilding: unsplash("1779029314445-b20031dfd4e3"), // tall modern building, many windows
  guideMoney: unsplash("1772588627327-1eeddcf73c11"), // documents + calculator
  guidePhone: unsplash("1687720106084-d6e235ad226c"), // SIM/card close-up
  guideTransit: unsplash("1712212308848-b17bd6f70be7"), // public transit bus
  guideChecklist: unsplash("1661956600684-97d3a4320e45") // laptop + coffee, planning
} as const;
