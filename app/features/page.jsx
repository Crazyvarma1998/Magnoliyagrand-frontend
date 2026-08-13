import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "features";
const seoTitle = "Event Venue Amenities & Services | Magnoliya Grand";

const page = {
  "navLabel": "Features",
  "eyebrow": "Considered at every scale",
  "title": "Everything your event needs,",
  "accent": "beautifully connected.",
  "description": "Discover the catering, technology, hotel access, parking, private suites, waterfront spaces, and planning support at Magnoliya Grand.",
  "heroImage": "/home-assets/5-landscaped-garden.jpg",
  "introTitle": "Exceptional features. Limitless possibilities.",
  "intro": "Every Magnoliya Grand feature is designed around guest comfort and planner confidence. The result is a venue where logistics recede and the experience takes center stage.",
  "highlights": [
    {
      "value": "10",
      "label": "flexible venue spaces"
    },
    {
      "value": "0",
      "label": "steps to Hilton Garden Inn"
    },
    {
      "value": "1",
      "label": "dedicated planning team"
    }
  ],
  "featureGrid": [
    [
      "Expansive Ballroom",
      "14,500 square feet, divisible into four flexible rooms.",
      "/home-assets/1-expansive-ballroom-space.jpg"
    ],
    [
      "Pre-Event Area",
      "A dedicated setting for registration, networking, cocktails, and arrival.",
      "/home-assets/pre-event-area.jpg"
    ],
    [
      "Private Suites",
      "Comfortable bride, groom, performer, and VIP preparation spaces.",
      "/home-assets/3-bride-groom-suites.jpg"
    ],
    [
      "Hilton Access",
      "Direct access to guest rooms and the services of Hilton Garden Inn.",
      "/gallery/img-1.jpg"
    ],
    [
      "Cutting-Edge Technology",
      "Advanced audiovisual equipment and high-speed Wi-Fi.",
      "/home-assets/6-cutting-edge-technology.jpg"
    ],
    [
      "Expert Event Planning",
      "Experienced professionals and customizable event packages.",
      "/home-assets/6-professional-event-planners.jpg"
    ],
    [
      "Culinary Excellence",
      "Gourmet menus with thoughtful dietary accommodations.",
      "/home-assets/8-culinary-excellence.jpg"
    ],
    [
      "Ample Parking",
      "Spacious on-site parking for guests, vendors, and event teams.",
      "/home-assets/9-ample-parking.jpg"
    ],
    [
      "Scenic Surroundings",
      "Waterfront views and landscaped gardens for outdoor moments.",
      "/home-assets/4-waterfront-patio.jpg"
    ]
  ]
};

const planningFacts = null;

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function FeaturesPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
