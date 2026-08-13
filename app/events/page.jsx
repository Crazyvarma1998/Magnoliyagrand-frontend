import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "events";
const seoTitle = "Weddings, Conferences & Events | Magnoliya Grand";

const page = {
  "navLabel": "Events",
  "eyebrow": "Every occasion deserves its own world",
  "title": "Gatherings with",
  "accent": "presence and possibility.",
  "description": "Explore weddings, conferences, meetings, galas, concerts, trade shows, and milestone celebrations at Magnoliya Grand in Manassas, Virginia.",
  "heroImage": "/home-assets/banner-3.jpg",
  "introTitle": "One destination. Seven ways to make it unforgettable.",
  "intro": "Magnoliya Grand adapts to the people, purpose, and energy of each gathering. Explore our dedicated event experiences, then schedule a private tour to shape the venue around your date, guest count, and vision.",
  "highlights": [
    {
      "value": "7",
      "label": "event experiences"
    },
    {
      "value": "10",
      "label": "flexible venue spaces"
    },
    {
      "value": "2,000",
      "label": "maximum guests"
    }
  ],
  "featureGrid": [
    [
      "Weddings & Receptions",
      "Waterfront ceremonies, private suites, chef-led catering, and a grand ballroom for celebrations of every scale.",
      "/home-assets/banner-10.jpg",
      "/weddings"
    ],
    [
      "Conferences & Corporate",
      "Keynotes, breakout configurations, production-ready AV, catering, parking, and attached hotel accommodations.",
      "/home-assets/banner-4.jpg",
      "/corporate-conferences"
    ],
    [
      "Meetings & Seminars",
      "Focused, flexible rooms for leadership retreats, training days, educational programs, and association meetings.",
      "/home-assets/banner-5.jpg",
      "/meetings-seminars"
    ],
    [
      "Galas & Fundraisers",
      "A dramatic setting for dining, auctions, awards, entertainment, storytelling, and mission-driven evenings.",
      "/home-assets/banner-7.jpg",
      "/galas-fundraisers"
    ],
    [
      "Cultural & Music Concerts",
      "A production-ready Northern Virginia stage with theater seating for audiences of up to 2,000.",
      "/home-assets/banner-8.jpg",
      "/cultural-music-concerts"
    ],
    [
      "Trade Shows & Expos",
      "A 14,500-square-foot show floor with registration space, divisible zones, Wi-Fi, parking, and hotel access.",
      "/home-assets/banner-9.jpg",
      "/trade-shows-expos"
    ],
    [
      "Milestone Celebrations",
      "Quinceañeras, anniversaries, birthdays, proms, graduations, and family milestones made magnificent.",
      "/home-assets/banner-12.jpg",
      "/milestone-celebrations"
    ]
  ]
};

const planningFacts = null;

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function EventsPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
