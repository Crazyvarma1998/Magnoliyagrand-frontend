import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
import { getCmsPageConfig, getCmsPageRecord } from "../cms-client";

const slug = "features";
const seoTitle = "Event Venue Amenities & Services | Magnoliya Grand";

const page = {
  "navLabel": "Features",
  "eyebrow": "Considered at every scale",
  "title": "Everything your event needs,",
  "accent": "beautifully connected.",
  "description": "Discover the catering, technology, hotel access, parking, private suites, waterfront spaces, and planning support at Magnoliya Grand.",
  "heroImage": "/home-assets/5-landscaped-garden.jpg",
  "featureCta": {
    "label": "Explore our spaces",
    "href": "https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062",
    "newTab": true
  },
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

export default async function FeaturesPage() {
  const cmsPage = await getCmsPageConfig(slug, page);
  return <InteriorPage slug={slug} page={cmsPage} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
