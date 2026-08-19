import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

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

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function VenuePage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
