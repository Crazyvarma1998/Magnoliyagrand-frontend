import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
import { getCmsPageConfig, getCmsPageRecord } from "../cms-client";
import { eventExperiences } from "../site-data";

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
  "featureLinkLabel": "Explore event",
  "featureGrid": eventExperiences.map(({ title, description, image, href }) => [
    title,
    description,
    image,
    href
  ])
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

export default async function EventsPage() {
  const cmsPage = await getCmsPageConfig(slug, page);
  return <InteriorPage slug={slug} page={cmsPage} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
