import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "trade-shows-expos";
const seoTitle = "Trade Show & Expo Venue in Virginia | Magnoliya Grand";

const page = {
  "navLabel": "Trade Shows",
  "eyebrow": "Trade shows & expos",
  "title": "More room for",
  "accent": "ideas to connect.",
  "description": "Flexible trade show and expo space near Washington, D.C. and Dulles Airport with 14,500 square feet, registration areas, Wi-Fi, parking, and hotel access.",
  "heroImage": "/home-assets/banner-9.jpg",
  "introTitle": "A flexible expo floor in a destination guests can reach",
  "intro": "Use the open Magna Ballroom for exhibits and demonstrations, the pre-event area for registration, and divisible rooms for education, sponsors, or private meetings.",
  "highlights": [
    {
      "value": "14,500",
      "label": "square-foot show floor"
    },
    {
      "value": "4",
      "label": "divisible zones"
    },
    {
      "value": "12 mi",
      "label": "from Dulles Airport"
    }
  ],
  "sections": [
    {
      "kicker": "Flexible floor plans",
      "title": "Exhibits, education, and networking—connected.",
      "body": "Create a unified show floor or divide the venue into focused zones. High-speed Wi-Fi, AV support, and an experienced planning team keep attendees and exhibitors moving smoothly.",
      "image": "/home-assets/1-expansive-ballroom-space.jpg"
    },
    {
      "kicker": "Planner-friendly access",
      "title": "A practical location with premium hospitality.",
      "body": "On-site parking, direct Hilton access, regional airport proximity, catering, and flexible arrival spaces support productive one-day expos and multi-day programs.",
      "image": "/home-assets/9-ample-parking.jpg"
    }
  ]
};

const planningFacts = {
  "title": "Expo planning essentials",
  "summary": "Organize exhibits, registration, education, catering, loading, and overnight stays in one accessible destination.",
  "items": [
    [
      "Show floor",
      "The 14,500-square-foot Magna Ballroom can remain open or divide into four programmed zones."
    ],
    [
      "Registration",
      "Dedicated pre-event space supports attendee check-in, credentialing, sponsor displays, and networking."
    ],
    [
      "Technology",
      "High-speed Wi-Fi and audiovisual capabilities support demonstrations, presentations, and education sessions."
    ],
    [
      "Exhibitor access",
      "The events team coordinates approved vendors, setup windows, room layouts, and production requirements."
    ],
    [
      "Attendee convenience",
      "Complimentary parking and connected Hilton Garden Inn accommodations reduce travel friction."
    ]
  ]
};

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function TradeShowsExposPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
