// Shared option lists for the search widget and filter components.
// Centralized here so the hero search, /[city]/apartments filters, and
// the lead form all stay in sync if ranges ever change.

export const budgetRanges = [
  { value: "under-1000", labelEn: "Under $1,000", labelFr: "Moins de 1 000 $" },
  { value: "1000-1500", labelEn: "$1,000 – $1,500", labelFr: "1 000 $ – 1 500 $" },
  { value: "1500-2000", labelEn: "$1,500 – $2,000", labelFr: "1 500 $ – 2 000 $" },
  { value: "2000-2500", labelEn: "$2,000 – $2,500", labelFr: "2 000 $ – 2 500 $" },
  { value: "2500-3000", labelEn: "$2,500 – $3,000", labelFr: "2 500 $ – 3 000 $" },
  { value: "3000-plus", labelEn: "$3,000+", labelFr: "3 000 $ et plus" }
];

export const apartmentTypes = [
  { value: "studio", labelEn: "Studio", labelFr: "Studio" },
  { value: "1br", labelEn: "1 Bedroom", labelFr: "1 chambre" },
  { value: "1br_den", labelEn: "1 Bedroom + Den", labelFr: "1 chambre + bureau" },
  { value: "2br", labelEn: "2 Bedrooms", labelFr: "2 chambres" },
  { value: "2br_den", labelEn: "2 Bedrooms + Den", labelFr: "2 chambres + bureau" },
  { value: "3br", labelEn: "3 Bedrooms", labelFr: "3 chambres" }
];
