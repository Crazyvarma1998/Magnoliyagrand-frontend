import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "galas-fundraisers";
const seoTitle = "Gala & Fundraiser Venue in Virginia | Magnoliya Grand";

const page = {
  "navLabel": "Galas",
  "eyebrow": "Galas & fundraisers",
  "title": "An evening with",
  "accent": "purpose and presence.",
  "description": "A grand gala and fundraiser venue in Northern Virginia with banquet capacity for 1,200, professional production, catering, parking, and hotel access.",
  "heroImage": "/home-assets/banner-7.jpg",
  "introTitle": "Create the kind of evening guests remember—and support",
  "intro": "The Magna Ballroom offers the scale for dramatic dining, live entertainment, auctions, awards, and storytelling, while our event team keeps every transition polished.",
  "highlights": [
    {
      "value": "1,200",
      "label": "banquet guests"
    },
    {
      "value": "14.5K",
      "label": "square feet"
    },
    {
      "value": "6",
      "label": "social channels supported"
    }
  ],
  "sections": [
    {
      "kicker": "A stage for impact",
      "title": "From first arrival to final appeal.",
      "body": "Welcome sponsors in the pre-event area, shape the ballroom around dining and program needs, and use advanced audiovisual capabilities to make every story clear and compelling.",
      "image": "/gallery/img-14.jpg"
    },
    {
      "kicker": "Hospitality that supports the mission",
      "title": "Your cause leads. We handle the experience.",
      "body": "Custom menus, dedicated planners, green rooms, ample parking, and connected hotel rooms help boards and committees focus on guests, fundraising, and impact.",
      "image": "/home-assets/8-culinary-excellence.jpg"
    }
  ]
};

const planningFacts = {
  "title": "Gala planning essentials",
  "summary": "Balance dining, fundraising, entertainment, sponsor visibility, and guest movement in one adaptable ballroom.",
  "items": [
    [
      "Banquet capacity",
      "The Magna Ballroom accommodates up to 1,200 banquet guests before layout-specific production adjustments."
    ],
    [
      "Production",
      "Stages, audiovisual systems, wooden or LED dance floors, and flexible lighting packages are available."
    ],
    [
      "Guest flow",
      "Pre-event areas can support registration, cocktails, sponsor displays, and silent-auction experiences."
    ],
    [
      "Catering",
      "Custom menus and dietary accommodations can be planned around receptions, dinner service, and program timing."
    ],
    [
      "Access",
      "Complimentary parking and connected hotel accommodations support local and traveling guests."
    ]
  ]
};

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function GalasFundraisersPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
