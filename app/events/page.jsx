import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
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
  "featureGrid": eventExperiences.map(({ title, description, image, href }) => [
    title,
    description,
    image,
    href
  ])
};

const planningFacts = null;

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function EventsPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
