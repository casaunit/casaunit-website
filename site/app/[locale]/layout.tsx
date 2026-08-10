import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import AttributionCapture from "@/components/marketing/AttributionCapture";
import "../globals.css";

// Fraunces — an elegant, warm editorial serif for headings, paired with
// Inter for body copy. This is the "premium real estate" type pairing
// (serif display + clean sans) referenced from the Talisman visual brief.
const headingFont = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading"
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "CasaUnit — Votre nouvelle vie au Canada commence ici",
  description:
    "Trouvez votre logement à Ottawa et Gatineau avant même votre arrivée au Canada. Recherchez par ville, budget et besoins — notre équipe vous accompagne à chaque étape."
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale segment — required by
  // next-intl in the App Router (otherwise every page opts into dynamic
  // rendering). See app/[locale]/page.tsx for the matching call.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <AttributionCapture />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
