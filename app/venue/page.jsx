import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
import { getCmsPageConfig, getCmsPageRecord } from "../cms-client";

const slug = "venue";
const seoTitle = "Event Venue in Manassas, VA | Magnoliya Grand";

const page = {
  "navLabel": "Venue",
  "eyebrow": "Ten spaces. One remarkable destination.",
  "title": "A room for every",
  "accent": "scale of imagination.",
  "description": "Explore Magnoliya Grand's flagship ballroom, flexible meeting rooms, pre-event spaces, waterfront patio, and landscaped gardens in Manassas, Virginia.",
  "heroImage": "/home-assets/banner-8.jpg",
  "introTitle": "The Magna Ballroom",
  "intro": "At 14,500 square feet, our flagship ballroom can remain one dramatic expanse or divide into flexible independent rooms. It supports intimate programs, banquet celebrations for up to 1,000 guests, and theater-style events for up to 1,900.",
  "highlights": [
    {
      "value": "14,500",
      "label": "square feet"
    },
    {
      "value": "1,000",
      "label": "banquet capacity"
    },
    {
      "value": "1,900",
      "label": "theater capacity"
    }
  ],
  "courtyardSpotlight": {
    "eyebrow": "More room for every arrival",
    "title": "Courtyard by Marriott",
    "subtitle": "More flexibility for larger guest lists.",
    "description": "Courtyard by Marriott Manassas Battlefield Park adds 149 guest rooms just moments from Magnoliya Grand, giving hosts greater flexibility for large groups, peak dates, and multi-day celebrations.",
    "image": "/hotel-assets/courtyard-exterior-enhanced.jpg",
    "imageWidth": 1672,
    "imageHeight": 941,
    "imageAlt": "Courtyard by Marriott Manassas Battlefield Park exterior",
    "linkLabel": "Explore Courtyard by Marriott",
    "linkHref": "https://www.marriott.com/en-us/hotels/mnzch-courtyard-manassas-battlefield-park/overview/"
  },
  "sections": [],
  "table": [
    [
      "Magna",
      "1,000",
      "1,700"
    ],
    [
      "Yoshino",
      "450",
      "800"
    ],
    [
      "Yoshino A",
      "200",
      "400"
    ],
    [
      "Yoshino B",
      "200",
      "400"
    ],
    [
      "Denali Ballroom",
      "450",
      "800"
    ],
    [
      "Denali A",
      "200",
      "400"
    ],
    [
      "Denali B",
      "200",
      "400"
    ],
    [
      "TEJ Ballroom",
      "140",
      "250"
    ],
    [
      "Liberty Ballroom",
      "180",
      "360"
    ],
    [
      "Lake View Garden",
      "—",
      "500"
    ],
    [
      "Lake View Terrace",
      "—",
      "160"
    ]
  ],
  "additionalSpaces": [
    [
      "Front Pre-function Area",
      "4,000 square feet"
    ],
    [
      "Side Pre-function Area",
      "2,000 square feet"
    ],
    [
      "Back Pre-function Area",
      "1,500 square feet"
    ],
    [
      "Lake View Patio",
      "100 guests"
    ]
  ]
};

const planningFacts = null;

export async function generateMetadata() {
  const record = await getCmsPageRecord(slug);
  const cmsPage = record?.sections?.find((section) => section.sectionKey === "page-config")?.contentJson || page;
  const result = createPageMetadata(slug, cmsPage, record?.seoTitle || seoTitle);
  if (record?.seoDescription) {
    result.description = record.seoDescription;
    result.openGraph.description = record.seoDescription;
    result.twitter.description = record.seoDescription;
  }
  return result;
}

export default async function VenuePage() {
  const cmsPage = await getCmsPageConfig(slug, page);
  return <InteriorPage slug={slug} page={cmsPage} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
