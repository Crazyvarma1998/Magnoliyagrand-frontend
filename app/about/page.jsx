import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "about";
const seoTitle = "About Our Manassas Event Venue | Magnoliya Grand";

const page = {
  "navLabel": "About",
  "eyebrow": "The story of Magnoliya Grand",
  "title": "Grandeur, grounded in",
  "accent": "genuine hospitality.",
  "description": "Meet Northern Virginia's landmark conference and event venue, where monumental scale, thoughtful service, and effortless access come together.",
  "heroImage": "/home-assets/about-img.gif",
  "introTitle": "Welcome to Magnoliya Grand Manor",
  "intro": "Attached to the Hilton Garden Inn in Manassas, Magnoliya Grand is a premier destination for extraordinary events and unforgettable conferences. We are 25 miles from Washington, D.C. and 12 miles from Dulles International Airport, making arrival simple for local and traveling guests.",
  "highlights": [
    {
      "value": "14,500",
      "label": "square-foot ballroom"
    },
    {
      "value": "2,000",
      "label": "theater-style guests"
    },
    {
      "value": "12 mi",
      "label": "from Dulles Airport"
    }
  ],
  "sections": [
    {
      "kicker": "Our vision",
      "title": "Every gathering deserves an exceptional setting.",
      "body": "From conferences and corporate events to life's most celebrated moments, our vision is to create an experience that feels remarkable and effortlessly accommodating. Our team brings each idea to life with precision, warmth, and care.",
      "image": "/gallery/img-4.jpg"
    },
    {
      "kicker": "Dedicated service",
      "title": "The details feel seamless because they are deeply considered.",
      "body": "Experienced event professionals, chef-led catering, production-ready technology, and flexible spaces work together as one. From the first plan to the final farewell, our team is committed to service excellence.",
      "image": "/home-assets/6-professional-event-planners.jpg"
    },
    {
      "kicker": "Convenience and accessibility",
      "title": "Close to the capital. Connected to comfort.",
      "body": "Our Manassas location offers the balance planners look for: easy regional access, on-site Hilton Garden Inn accommodations, ample parking, waterfront views, and a serene garden setting near historic Manassas National Battlefield Park.",
      "image": "/gallery/img-15.jpg"
    }
  ]
};

const planningFacts = null;

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function AboutPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
