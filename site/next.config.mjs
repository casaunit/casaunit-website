import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Airtable attachment CDN — used once unit photos are stored as
      // Airtable attachments and pulled in via lib/inventory/getUnits.ts
      { protocol: "https", hostname: "*.airtableusercontent.com" }
    ]
  }
};

export default withNextIntl(nextConfig);
