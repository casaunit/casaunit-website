import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FAF7F2",
          soft: "#F3EEE5"
        },
        ink: {
          DEFAULT: "#1B2430", // deep navy-charcoal, primary text + trust color
          soft: "#3A4453"
        },
        forest: {
          DEFAULT: "#1F3A34", // secondary trust color, used sparingly (badges, icons)
          light: "#2E5249"
        },
        terracotta: {
          DEFAULT: "#C4623F", // single accent, CTAs only
          dark: "#A84F31"
        },
        border: "#E6E0D4"
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
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
