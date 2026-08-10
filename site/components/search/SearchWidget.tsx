"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { useRouter } from "@/lib/navigation";
import { trackEvent } from "@/lib/analytics/events";
import CitySelector from "./CitySelector";
import BudgetSelector from "./BudgetSelector";
import BedroomSelector from "./BedroomSelector";
import MoveInDatePicker from "./MoveInDatePicker";

/**
 * The hero search widget. On submit it routes to /{city}/apartments with
 * the selections as query params, which the listing page reads to
 * pre-apply filters — the same SearchFilters component reused there.
 */
export default function SearchWidget() {
  const t = useTranslations("Search");
  const router = useRouter();

  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [moveIn, setMoveIn] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent("search_started", { city, budget, bedrooms, moveIn });
    if (city) trackEvent("city_selected", { city });

    const params = new URLSearchParams();
    if (budget) params.set("budget", budget);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (moveIn) params.set("moveIn", moveIn);

    const destination = city ? `/${city}/apartments` : "/apartments";
    router.push(`${destination}${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end lg:gap-3"
    >
      <CitySelector value={city} onChange={setCity} />
      <BudgetSelector value={budget} onChange={setBudget} />
      <BedroomSelector value={bedrooms} onChange={setBedrooms} />
      <MoveInDatePicker value={moveIn} onChange={setMoveIn} />
      <button type="submit" className="btn-primary w-full lg:w-auto">
        <Search size={18} className="mr-2" />
        {t("submit")}
      </button>
    </form>
  );
}
