"use client";

import { useEffect } from "react";
import { captureAttributionOnce } from "@/lib/utm/attribution";

// Mounted once in the root layout. Invisible — just runs the UTM/referrer
// capture on first load so it's available for any lead submitted later
// in the visit, no matter which page they land on or how many pages
// they browse before submitting.
export default function AttributionCapture() {
  useEffect(() => {
    captureAttributionOnce();
  }, []);

  return null;
}
