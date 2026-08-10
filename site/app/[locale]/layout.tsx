import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import AttributionCapture from "@/components/marketing/AttributionCapture";
import "../globals.css";

const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading"
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "CasaUnit — Your New Home in Canada Starts Here",
  description:
    "Browse apartments in Ottawa and Gatineau, tell us what you're looking for, and our team will help you secure your home before you arrive."
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  // Enables static rendering for this locale segment — required by
  // next-intl in the App Router (otherwise every page opts into dynamic
  // rendering). See app/[locale]/page.tsx for the matching call.
  unstable_setRequestLocale(locale);

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
