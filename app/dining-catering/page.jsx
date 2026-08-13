import DiningCateringExperience from "../components/DiningCateringExperience";
import { SITE_URL } from "../seo-config";

export const metadata = {
  title: "Dining & Catering in Manassas, VA | Magnoliya Grand",
  description:
    "Explore custom event catering, plated dinners, buffets, action stations, cultural menus, dessert displays, beverage service, and tastings at Magnoliya Grand.",
  alternates: { canonical: "/dining-catering" },
  openGraph: {
    title: "Dining & Catering | Magnoliya Grand",
    description:
      "Exceptional cuisine, beautifully presented for weddings, conferences, galas, and celebrations in Northern Virginia.",
    url: "/dining-catering",
    siteName: "Magnoliya Grand",
    locale: "en_US",
    images: [
      {
        url: "/dining-catering/hero.jpg",
        width: 1536,
        height: 1024,
        alt: "A collection of elegant dining and catering presentations at Magnoliya Grand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dining & Catering | Magnoliya Grand",
    description:
      "Exceptional cuisine, beautifully presented for unforgettable events in Northern Virginia.",
    images: ["/dining-catering/hero.jpg"],
  },
};

const diningServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/dining-catering#service`,
  name: "Dining & Catering at Magnoliya Grand",
  serviceType: "Event catering",
  description: metadata.description,
  url: `${SITE_URL}/dining-catering`,
  image: `${SITE_URL}/dining-catering/hero.jpg`,
  provider: { "@id": `${SITE_URL}/#venue` },
  areaServed: [
    { "@type": "City", name: "Manassas" },
    { "@type": "AdministrativeArea", name: "Northern Virginia" },
    { "@type": "City", name: "Washington, D.C." },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dining and catering services",
    itemListElement: [
      "Full-service event catering",
      "Wedding and reception dining",
      "Corporate catering",
      "Cocktail and hors d'oeuvres receptions",
      "Buffet dining",
      "Plated and seated dinners",
      "Food and action stations",
      "Dessert and specialty displays",
      "Custom and fusion cuisine",
      "International and cultural menus",
      "Beverage service, including alcohol and bourbons",
      "Late-night event enhancements",
      "Menu tastings",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function DiningCateringPage() {
  return (
    <>
      <DiningCateringExperience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(diningServiceSchema) }}
      />
    </>
  );
}
