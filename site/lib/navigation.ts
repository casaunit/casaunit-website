import { createNavigation } from "next-intl/navigation";
import { routing } from "@/routing";

// Locale-aware Link/router — automatically prefixes hrefs with /en or /fr,
// so components never construct locale paths by hand.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
