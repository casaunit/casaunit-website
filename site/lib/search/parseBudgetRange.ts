// Converts the coarse range values used by the hero SearchWidget
// (e.g. "1500-2000", "under-1000", "3000-plus") into a min/max pair.
// The dedicated listing-page filters use separate priceMin/priceMax
// query params for finer control — both feed the same filterUnits().
export function parseBudgetRange(value?: string | null): { min?: number; max?: number } {
  if (!value) return {};
  if (value === "under-1000") return { max: 1000 };
  if (value === "3000-plus") return { min: 3000 };
  const [min, max] = value.split("-").map(Number);
  return {
    min: Number.isFinite(min) ? min : undefined,
    max: Number.isFinite(max) ? max : undefined
  };
}
