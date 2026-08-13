import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "milestone-celebrations";
const seoTitle = "Celebration Venue in Manassas, VA | Magnoliya Grand";

const page = {
  "navLabel": "Celebrations",
  "eyebrow": "Milestone celebrations",
  "title": "Life's biggest moments,",
  "accent": "made magnificent.",
  "description": "An elegant venue for quinceañeras, anniversaries, birthdays, proms, and milestone celebrations in Manassas, Virginia.",
  "heroImage": "/home-assets/banner-12.jpg",
  "introTitle": "A setting worthy of the moment",
  "intro": "Celebrate quinceañeras, anniversaries, birthdays, proms, graduations, and family milestones with dramatic scale, personal service, and room for every tradition.",
  "highlights": [
    {
      "value": "1,200",
      "label": "banquet guests"
    },
    {
      "value": "10",
      "label": "indoor & outdoor spaces"
    },
    {
      "value": "∞",
      "label": "ways to make it yours"
    }
  ],
  "sections": [
    {
      "kicker": "Designed around you",
      "title": "One venue. Your own world.",
      "body": "Custom room layouts, chef-led menus, advanced lighting and AV, waterfront portraits, and private preparation spaces let your celebration feel completely personal.",
      "image": "/gallery/img-20.jpg"
    },
    {
      "kicker": "Easy for family and friends",
      "title": "Gather everyone. Let us handle the rest.",
      "body": "With ample parking, direct hotel access, a convenient Manassas location, and an experienced event team, guests can focus on the people and moments that matter.",
      "image": "/gallery/img-17.jpg"
    }
  ]
};

const planningFacts = {
  "title": "Celebration planning essentials",
  "summary": "Shape birthdays, anniversaries, quinceaneras, proms, graduations, and family milestones around your guest list and traditions.",
  "items": [
    [
      "Banquet capacity",
      "Flexible ballroom configurations support intimate gatherings through celebrations of up to 1,200 banquet guests."
    ],
    [
      "Personalization",
      "Approved decorators, photographers, DJs, and other event professionals may work at the venue with required documentation."
    ],
    [
      "Dining",
      "Customizable menus, Halal choices, and dietary accommodations are available through the catering team."
    ],
    [
      "Entertainment",
      "Stage, audiovisual, lighting, and wooden or LED dance-floor options can be included in event packages."
    ],
    [
      "Guest experience",
      "Complimentary parking, private preparation spaces, waterfront areas, and connected hotel rooms support the full occasion."
    ]
  ]
};

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function MilestoneCelebrationsPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
