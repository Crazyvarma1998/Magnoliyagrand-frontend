import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
import { getCmsPageConfig, getCmsPageRecord } from "../cms-client";

const slug = "contact";
const seoTitle = "Contact Magnoliya Grand Event Venue | Manassas, VA";

const page = {
  "navLabel": "Contact",
  "eyebrow": "Book a private tour",
  "title": "Your date is waiting.",
  "accent": "Let's begin.",
  "description": "Contact Magnoliya Grand in Manassas, Virginia to schedule a venue tour, request event availability, or speak with the events team.",
  "heroImage": "/contact-assets/contact-hero.png",
  "introTitle": "Tell us what you are imagining",
  "intro": "Share your date, guest count, and event vision. Our team will help you explore the right space, configuration, services, and next steps.",
  "experience": {
    "eyebrow": "Private event concierge",
    "headline": ["Every", "unforgettable", "event", "starts", "with", "hello."],
    "intro": "Share your date, guest count, and vision. Our events team will shape the right space, flow, and next step around your occasion.",
    "conversationLabel": "Start a conversation",
    "phoneLabel": "Call the events team",
    "emailLabel": "Send your vision",
    "addressLabel": "Visit Magnoliya Grand",
    "distanceLabel": "Minutes from Dulles Airport",
    "requestLabel": "Request your date",
    "directionsLabel": "Get directions",
    "mapLabel": "Live satellite destination",
    "mapName": "Magnoliya Grand",
    "coordinates": "38.80515° N · 77.51532° W",
    "mapLinkLabel": "Open live map",
    "formKicker": "Begin your event",
    "formTitle": "Tell us what",
    "formAccent": "you are imagining.",
    "formIntro": "Share the essentials and our events team will follow up with availability, thoughtful recommendations, and the next steps for a private tour.",
    "responseLabel": "Personal response",
    "responseValue": "Typically within 24 hours",
    "submitLabel": "Send your inquiry",
    "journey": [["Imagine", "Tell us the occasion, date, and atmosphere you have in mind."], ["Visit", "Walk the venue with a specialist and explore the right setting."], ["Celebrate", "Bring your gathering to life with a team focused on every detail."]]
  },
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

export default async function ContactPage() {
  const cmsPage = await getCmsPageConfig(slug, page);
  return <InteriorPage slug={slug} page={cmsPage} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
