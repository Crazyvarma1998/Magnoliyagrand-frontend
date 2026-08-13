import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL } from "./seo-config";

const VENUE_ID = `${SITE_URL}/#venue`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    {
      path: "./fonts/cormorant-garamond-latin-normal.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-latin-italic.woff2",
      weight: "400 600",
      style: "italic",
    },
  ],
});

const sans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: "./fonts/manrope-latin-normal.woff2",
  weight: "400 700",
  style: "normal",
});

const artistic = localFont({
  variable: "--font-artistic",
  display: "swap",
  src: [
    {
      path: "./fonts/bodoni-moda-latin-normal.woff2",
      weight: "400 500",
      style: "normal",
    },
    {
      path: "./fonts/bodoni-moda-latin-italic.woff2",
      weight: "400 500",
      style: "italic",
    },
  ],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Magnoliya Grand",
  title: {
    default: "Magnoliya Grand | Luxury Event Venue in Manassas, Virginia",
    template: "%s",
  },
  description:
    "A landmark luxury event venue near Washington, D.C. Explore a 14,500-square-foot ballroom, waterfront spaces, and capacity for up to 2,000 guests.",
  authors: [{ name: "Magnoliya Grand Events Team", url: `${SITE_URL}/about` }],
  creator: "Magnoliya Grand",
  publisher: "Magnoliya Grand",
  category: "Event venue",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Magnoliya Grand | The Room Becomes the Occasion",
    description: "Northern Virginia's grand stage for weddings, conferences, cultural celebrations, and milestone events.",
    type: "website",
    url: "/",
    siteName: "Magnoliya Grand",
    locale: "en_US",
    images: [{
      url: "/magnoliya-grand-share.jpg",
      secureUrl: `${SITE_URL}/magnoliya-grand-share.jpg`,
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt: "Magnoliya Grand luxury ballroom in Manassas, Virginia",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magnoliya Grand | The Room Becomes the Occasion",
    description: "Northern Virginia's grand stage for weddings, conferences, cultural celebrations, and milestone events.",
    images: ["/magnoliya-grand-share.jpg"],
  },
  other: {
    "geo.region": "US-VA",
    "geo.placename": "Manassas",
    "geo.position": "38.7509;-77.4805",
    ICBM: "38.7509, -77.4805",
  },
};

const address = {
  "@type": "PostalAddress",
  streetAddress: "7001 Infantry Ridge Rd",
  addressLocality: "Manassas",
  addressRegion: "VA",
  postalCode: "20109",
  addressCountry: "US",
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Magnoliya Grand",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/home-assets/magnoliya-official-logo.png`,
        contentUrl: `${SITE_URL}/home-assets/magnoliya-official-logo.png`,
        width: 4216,
        height: 806,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-703-843-5536",
        email: "sales@magnoliyagrand.com",
        contactType: "event sales",
        areaServed: "US-VA",
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://www.facebook.com/magnoliyagrand/",
        "https://www.instagram.com/magnoliyagrand/",
        "https://x.com/MagnoliyaGrand",
        "https://www.linkedin.com/in/magnoliya-grand-7727b92ab",
        "https://www.youtube.com/channel/UCNG6YVfx2i9b5O98vgE7rFw",
        "https://www.tiktok.com/@magnoliyagrand",
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Magnoliya Grand",
      description: "Official website of Magnoliya Grand Conference and Event Center in Manassas, Virginia.",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Magnoliya Grand | Luxury Event Venue in Manassas, Virginia",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": VENUE_ID },
      primaryImageOfPage: { "@id": `${SITE_URL}/#primaryimage` },
      inLanguage: "en-US",
    },
    {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#primaryimage`,
      url: `${SITE_URL}/magnoliya-grand-share.jpg`,
      contentUrl: `${SITE_URL}/magnoliya-grand-share.jpg`,
      width: 1200,
      height: 630,
      caption: "Magnoliya Grand Conference and Event Center in Manassas, Virginia",
    },
    {
      "@type": ["EventVenue", "LocalBusiness"],
      "@id": VENUE_ID,
      name: "Magnoliya Grand Conference & Event Center",
      alternateName: ["Magnoliya Grand", "Magnoliya Grand Manor"],
      url: SITE_URL,
      mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
      parentOrganization: { "@id": ORGANIZATION_ID },
      telephone: "+1-703-843-5536",
      email: "sales@magnoliyagrand.com",
      address,
      maximumAttendeeCapacity: 2000,
      image: { "@id": `${SITE_URL}/#primaryimage` },
      logo: { "@id": `${SITE_URL}/#logo` },
      priceRange: "$$$",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.7509,
        longitude: -77.4805,
      },
      hasMap: "https://maps.google.com/?q=7001+Infantry+Ridge+Rd+Manassas+VA+20109",
      areaServed: [
        { "@type": "City", name: "Manassas" },
        { "@type": "AdministrativeArea", name: "Northern Virginia" },
        { "@type": "City", name: "Washington, D.C." },
      ],
      containedInPlace: {
        "@type": "Hotel",
        name: "Hilton Garden Inn Manassas",
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "14,500-square-foot divisible ballroom", value: true },
        { "@type": "LocationFeatureSpecification", name: "Waterfront gardens and terrace", value: true },
        { "@type": "LocationFeatureSpecification", name: "Connected Hilton Garden Inn", value: true },
        { "@type": "LocationFeatureSpecification", name: "Complimentary on-site parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "Professional audiovisual capabilities and Wi-Fi", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private preparation suites and green rooms", value: true },
      ],
      knowsAbout: [
        "Northern Virginia weddings",
        "Conferences & Corporate events near Dulles Airport",
        "Meetings and seminars",
        "Galas and fundraisers",
        "Cultural and music concerts",
        "Trade shows and expos",
        "Milestone celebrations",
      ],
      subjectOf: [
        "https://www.cvent.com/venues/en-US/middleburg/special-event-venue/magnoliya-grand-conference-event-center/venue-e0192da6-1a1c-461b-8a2c-c27236ec697d",
        "https://southasianherald.com/magnoliya-grand-conference-and-event-center-opens-in-manassas-virginia/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Magnoliya Grand event experiences",
        itemListElement: [
          "Weddings and receptions",
          "Conferences & Corporate",
          "Meetings and seminars",
          "Galas and fundraisers",
          "Cultural and music concerts",
          "Trade shows and expos",
          "Milestone celebrations",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body className={`${display.variable} ${sans.variable} ${artistic.variable}`}>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
      </body>
    </html>
  );
}
