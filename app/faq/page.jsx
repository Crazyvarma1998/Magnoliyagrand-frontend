import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "faq";
const seoTitle = "Event Venue Questions & Answers | Magnoliya Grand";

const page = {
  "navLabel": "FAQ",
  "eyebrow": "Plan with confidence",
  "title": "Direct answers to",
  "accent": "the questions planners ask.",
  "description": "Answers about Magnoliya Grand capacity, location, parking, catering, hotel access, weddings, conferences, technology, tours, and booking.",
  "heroImage": "/home-assets/banner-14.jpg",
  "introTitle": "Everything you need to know before your tour",
  "intro": "These answers reflect the venue facts planners compare most. For a custom floor plan, menu, date, or package, contact our events team.",
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
  "faqs": [
    [
      "How many guests can you host?",
      "We can host events of all sizes, from small gatherings to large-scale functions accommodating up to 1,000 guests in banquet style and up to 1,700 guests in theater style."
    ],
    [
      "Do you offer catering?",
      "Yes, we offer in-house catering with customizable menu options."
    ],
    [
      "Do you allow outside vendors?",
      "Yes, we allow outside vendors such as decorators, photographers, DJs, and other event professionals with required documentation."
    ],
    [
      "Can clients bring outside catering?",
      "Outside catering may be allowed with prior approval and additional fees."
    ],
    [
      "Do you offer Halal options?",
      "Yes, we offer Halal menu options for our clients."
    ],
    [
      "Do you have separate vegetarian and non-vegetarian kitchens?",
      "Yes, we have separate preparation areas for vegetarian and non-vegetarian food."
    ],
    [
      "Can guests bring their own alcohol?",
      "No. All alcohol service must be handled through the venue due to Virginia ABC regulations."
    ],
    [
      "Is parking available?",
      "Yes, we offer complimentary onsite parking for all guests."
    ],
    [
      "Is there a hotel available for guests?",
      "Yes, the Hilton Garden Inn hotel is part of Magnoliya Grand, and we offer on-site guest rooms for our clients and their guests."
    ],
    [
      "Do you have bridal suites?",
      "Yes, we offer Bridal Glam Suites for weddings and other special occasions providing a comfortable and private space for the bride, groom, and their parties to get ready for the special day."
    ],
    [
      "Can clients host both ceremony and reception at the venue?",
      "Yes, we offer both indoor and outdoor options for ceremonies and receptions."
    ],
    [
      "Do you have an outside ceremony area?",
      "Yes, we offer beautiful outdoor ceremony options including our Lake View Garden and Lake View Terrace."
    ],
    [
      "Do your packages include decoration?",
      "No, but we offer decoration packages through our trusted and experienced business partners."
    ],
    [
      "Do your packages include AV, stage, and dance floor?",
      "Yes, we offer packages that include AV equipment, stage, and dance floor(s)."
    ],
    [
      "Do you have a stage and dance floor available?",
      "Yes, we offer both wooden and LED dance floors in a variety of sizes to accommodate different event requirements."
    ],
    [
      "How many hours are included in your event packages?",
      "Our standard event packages include 5 hours of event time, along with 4 hours allocated for setup and teardown. Additional setup time may be accommodated, subject to venue availability and provided that the space is not already occupied."
    ],
    [
      "Does your event manager create the timeline or plan the event for us?",
      "No, but we offer event management and design services through our trusted and experienced business partners."
    ]
  ]
};

const planningFacts = null;

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function FaqPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
