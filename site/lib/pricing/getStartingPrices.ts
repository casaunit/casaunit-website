import { getAllUnits } from "@/lib/inventory/getUnits";
import { ApartmentType, PublicUnit } from "@/types/unit";

export type PriceCategory = "studio" | "1br" | "2br" | "3br";

// "penthouse" folds into the 3-bedroom bucket (closest fit for a
// homepage that only ever shows 4 categories) — "other" is deliberately
// left out of every bucket since it doesn't map to a bedroom count.
const CATEGORY_TYPES: Record<PriceCategory, ApartmentType[]> = {
  studio: ["studio"],
  "1br": ["1br", "1br_den"],
  "2br": ["2br", "2br_den"],
  "3br": ["3br", "penthouse"]
};

// Shown until real priced inventory exists for a category — these are
// the "starting from" figures Zak provided. Replace by simply adding
// priced units to inventory; real data always wins over this fallback
// once at least one unit in a category has monthlyRent > 0.
const FALLBACK_STARTING_PRICES: Record<PriceCategory, number> = {
  studio: 900,
  "1br": 1150,
  "2br": 1450,
  "3br": 1700
};

export interface StartingPrice {
  category: PriceCategory;
  price: number;
  isFallback: boolean;
}

export function computeStartingPrices(units: PublicUnit[]): StartingPrice[] {
  return (Object.keys(CATEGORY_TYPES) as PriceCategory[]).map((category) => {
    const types = CATEGORY_TYPES[category];
    const priced = units.filter((u) => types.includes(u.apartmentType) && u.monthlyRent > 0);
    if (priced.length > 0) {
      const min = Math.min(...priced.map((u) => u.monthlyRent));
      return { category, price: min, isFallback: false };
    }
    return { category, price: FALLBACK_STARTING_PRICES[category], isFallback: true };
  });
}

/**
 * "Starting at" price per bedroom category for the homepage. Pulls the
 * lowest real monthly rent per category from live inventory (same
 * getAllUnits() source as the marketplace); falls back to Zak's
 * provided placeholder figures for any category with no priced units
 * yet. No code change needed once real inventory carries real prices —
 * this simply stops returning fallback values on its own.
 */
export async function getStartingPrices(): Promise<StartingPrice[]> {
  const units = await getAllUnits();
  return computeStartingPrices(units);
}
