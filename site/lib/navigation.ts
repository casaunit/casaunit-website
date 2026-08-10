import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales } from "@/i18n-config";

// Locale-aware Link/router — automatically prefixes hrefs with /en or /fr,
// so components never construct locale paths by hand.
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
