import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./globals.css";
import { site } from "@/data/site";

const title = `${site.name} | ${site.serviceArea} Builders & Developers`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  keywords: [
    "construction company Bulawayo",
    "builders Bulawayo",
    "property development Zimbabwe",
    "renovations Bulawayo",
    "Realify Construction",
    "Realify Investments",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.hero.imageAlt }],
    locale: "en_ZW",
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: [site.ogImage] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F5F2ED", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: { "@type": "PostalAddress", streetAddress: "19 Elliston Road", addressLocality: "Bulawayo", addressCountry: "ZW" },
  areaServed: site.serviceArea,
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory">
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
