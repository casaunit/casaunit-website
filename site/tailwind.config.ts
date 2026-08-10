import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // v2 palette — Talisman-inspired premium real estate: white,
        // off-white, deep navy, with a small amount of lighter blue used
        // sparingly for tints/accents. Old token *names* (cream/ink/forest/
        // terracotta) are kept so every component that already references
        // them repaints automatically — only the hex values changed.
        cream: {
          DEFAULT: "#FFFFFF", // white
          soft: "#F5F5F1" // off-white / very light grey
        },
        ink: {
          DEFAULT: "#101B33", // deep navy — primary text + dark sections
          soft: "#48546B" // softened navy-grey for secondary text
        },
        forest: {
          DEFAULT: "#3D5A80", // lighter blue accent, used sparingly (tints, icons)
          light: "#6E8CB4"
        },
        terracotta: {
          DEFAULT: "#101B33", // CTAs are navy, not an accent color, in v2
          dark: "#0A1424"
        },
        border: "#E4E3DD"
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"]
      },
      borderRadius: {
        xl: "0.375rem",
        "2xl": "0.5rem"
      },
      boxShadow: {
        card: "0 4px 24px -6px rgba(27, 36, 48, 0.10)",
        cardHover: "0 12px 32px -8px rgba(27, 36, 48, 0.16)"
      },
      maxWidth: {
        content: "1200px"
      }
    }
  },
  plugins: []
};

export default config;
