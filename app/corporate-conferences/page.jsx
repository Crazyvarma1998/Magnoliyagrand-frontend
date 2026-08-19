import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
import { getCmsPageConfig, getCmsPageRecord } from "../cms-client";

const slug = "corporate-conferences";
const seoTitle = "Conference Venue Near Dulles | Magnoliya Grand";

const page = {
  "navLabel": "Conferences",
  "eyebrow": "Conferences & Corporate",
  "title": "Big ideas deserve",
  "accent": "a room with presence.",
  "description": "A full-service conference venue near Dulles Airport and Washington, D.C. with a 2,000-seat ballroom, breakout configurations, AV, Wi-Fi, catering, and hotel access.",
  "heroImage": "/home-assets/banner-4.jpg",
  "editorialLinkLabel": "Plan your event",
  "editorialLinkHref": "/contact",
  "introTitle": "A conference venue designed for momentum",
  "intro": "Bring keynotes, breakouts, dining, networking, and overnight accommodations together at one accessible Manassas destination. The Magna Ballroom scales from focused company meetings to 2,000-person programs.",
  "highlights": [
    {
      "value": "2,000",
      "label": "theater-style seats"
    },
    {
      "value": "4",
      "label": "ballroom divisions"
    },
    {
      "value": "12 mi",
      "label": "from Dulles Airport"
    }
  ],
  "sections": [
    {
      "kicker": "Program flexibility",
      "title": "Keynote scale. Breakout precision.",
      "body": "Divide the ballroom into four spaces, use the pre-event area for registration and sponsor moments, and support speakers with private green rooms and production-ready AV.",
      "image": "/home-assets/6-cutting-edge-technology.jpg"
    },
    {
      "kicker": "Easy for every attendee",
      "title": "Arrive, meet, dine, and stay.",
      "body": "Direct Hilton Garden Inn access, on-site parking, chef-led catering, and proximity to Dulles and Washington, D.C. make Magnoliya Grand a practical destination without sacrificing atmosphere.",
      "image": "/home-assets/8-culinary-excellence.jpg"
    }
  ]
};

const planningFacts = {
  "title": "Conference planning essentials",
  "summary": "Bring arrival, general sessions, breakouts, catering, production, and accommodations together near Dulles Airport.",
  "items": [
    [
      "General-session capacity",
      "The Magna Ballroom supports up to 2,000 theater-style attendees, subject to production and staging requirements."
    ],
    [
      "Breakout flexibility",
      "The 14,500-square-foot ballroom divides into four rooms for concurrent sessions, workshops, and meals."
    ],
    [
      "Technology",
      "Professional audiovisual capabilities and high-speed Wi-Fi support presentations, panels, and hybrid program needs."
    ],
    [
      "Regional access",
      "Magnoliya Grand is approximately 12 miles from Dulles International Airport and 25 miles from Washington, D.C."
    ],
    [
      "Hotel connection",
      "Direct access to Hilton Garden Inn simplifies room blocks, speaker stays, and multi-day programs."
    ]
  ]
};

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

export default async function CorporateConferencesPage() {
  const cmsPage = await getCmsPageConfig(slug, page);
  return <InteriorPage slug={slug} page={cmsPage} planningFacts={cmsPage.planningFacts || planningFacts} seoTitle={seoTitle} />;
}
