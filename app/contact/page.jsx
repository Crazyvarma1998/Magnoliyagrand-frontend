import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "contact";
const seoTitle = "Contact Magnoliya Grand Event Venue | Manassas, VA";

const page = {
  "navLabel": "Contact",
  "eyebrow": "Book a private tour",
  "title": "Your date is waiting.",
  "accent": "Let's begin.",
  "description": "Contact Magnoliya Grand in Manassas, Virginia to schedule a venue tour, request event availability, or speak with the events team.",
  "heroImage": "/gallery/img-1.jpg",
  "introTitle": "Tell us what you are imagining",
  "intro": "Share your date, guest count, and event vision. Our team will help you explore the right space, configuration, services, and next steps.",
  "highlights": [
    {
      "value": "24 hr",
      "label": "typical response target"
    },
    {
      "value": "12 mi",
      "label": "from Dulles Airport"
    },
    {
      "value": "1",
      "label": "private tour to begin"
    }
  ]
};

const planningFacts = null;

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function ContactPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
