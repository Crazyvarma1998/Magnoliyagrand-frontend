import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
import { getCmsPageConfig, getCmsPageRecord } from "../cms-client";

const slug = "blog";
const seoTitle = "Northern Virginia Event Planning Guides | Magnoliya Grand";

const page = {
  "navLabel": "Blog",
  "eyebrow": "Ideas for remarkable gatherings",
  "title": "The Magnoliya",
  "accent": "journal.",
  "description": "Planning guidance, venue inspiration, and expert ideas for weddings, conferences, galas, concerts, and milestone events in Northern Virginia.",
  "heroImage": "/home-assets/banner-11.jpg",
  "introTitle": "Thoughtful guidance for events with presence",
  "intro": "Explore practical planning advice, creative inspiration, and venue insights from the Magnoliya Grand team. This journal is prepared for hosts and planners creating memorable gatherings in Manassas and across Northern Virginia.",
  "highlights": [
    {
      "value": "7",
      "label": "event planning categories"
    },
    {
      "value": "10",
      "label": "flexible venue spaces"
    },
    {
      "value": "1",
      "label": "expert planning team"
    }
  ],
  "featureLinkLabel": "Read article",
  "featureGrid": [
    [
      "How to Choose a Northern Virginia Wedding Venue",
      "A practical guide to guest capacity, ceremony flow, hotel access, catering, parking, and the questions to ask during a private tour.",
      "/gallery/img-11.jpg",
      "/blog/choosing-northern-virginia-wedding-venue"
    ],
    [
      "Planning a Conference Near Dulles Airport",
      "Build a smoother attendee experience with the right location, breakout strategy, audiovisual plan, catering schedule, and accommodations.",
      "/home-assets/6-cutting-edge-technology.jpg",
      "/blog/planning-conference-near-dulles-airport"
    ],
    [
      "Ballroom Layouts for Galas and Fundraisers",
      "Understand how dining, staging, auctions, sponsor visibility, entertainment, and guest circulation work together in a grand ballroom.",
      "/gallery/img-14.jpg",
      "/blog/ballroom-layouts-galas-fundraisers"
    ],
    [
      "Indoor and Outdoor Wedding Flow",
      "Connect a waterfront ceremony, garden portraits, cocktail hour, grand entrance, dinner, and dancing without interrupting the guest experience.",
      "/home-assets/4-waterfront-patio.jpg",
      "/blog/indoor-outdoor-wedding-flow"
    ],
    [
      "What to Include in an Event Venue Checklist",
      "Compare capacity, accessibility, technology, catering, preparation suites, parking, accommodations, and planning support before booking.",
      "/home-assets/6-professional-event-planners.jpg",
      "/blog/event-venue-checklist"
    ],
    [
      "Creating a Memorable Multicultural Celebration",
      "Plan with space for traditions, performances, personal menus, dramatic entrances, family moments, and an inclusive guest experience.",
      "/gallery/img-18.jpg",
      "/blog/multicultural-celebration"
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

export default async function BlogPage() {
  const cmsPage = await getCmsPageConfig(slug, page);
  return <InteriorPage slug={slug} page={cmsPage} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
