import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "weddings";
const seoTitle = "Northern Virginia Wedding Venue | Magnoliya Grand";

const page = {
  "navLabel": "Weddings",
  "eyebrow": "Weddings & receptions",
  "title": "Your forever begins",
  "accent": "somewhere unforgettable.",
  "description": "A luxury wedding venue in Manassas, Virginia with a grand ballroom, waterfront ceremony spaces, private suites, catering, and nearby hotel accommodations.",
  "heroImage": "/home-assets/banner-10.jpg",
  "introTitle": "A Northern Virginia wedding venue made for your story",
  "intro": "Host an intimate ceremony, a grand multicultural celebration, or a ballroom reception for hundreds—all in one beautifully connected destination near Washington, D.C. and Dulles Airport.",
  "highlights": [
    {
      "value": "1,200",
      "label": "banquet guests"
    },
    {
      "value": "2",
      "label": "private preparation suites"
    },
    {
      "value": "1",
      "label": "waterfront destination"
    }
  ],
  "sections": [
    {
      "kicker": "Ceremony to celebration",
      "title": "Every chapter, in one destination.",
      "body": "Exchange vows in the landscaped garden or beside the waterfront, welcome guests in the pre-event area, and celebrate in the Magna Ballroom. Direct Hilton access means loved ones can stay steps from the reception.",
      "image": "/gallery/img-11.jpg"
    },
    {
      "kicker": "Made personal",
      "title": "Traditions honored. Details entirely your own.",
      "body": "Flexible room divisions, customizable menus, advanced production, private suites, and an experienced planning team support cultural traditions, dramatic entrances, live entertainment, and personal design.",
      "image": "/gallery/img-16.jpg"
    }
  ]
};

const planningFacts = {
  "title": "Wedding planning essentials",
  "summary": "Plan the ceremony, reception, guest stay, and dining experience in one connected Manassas destination.",
  "items": [
    [
      "Reception capacity",
      "Up to 1,200 banquet guests, depending on the final floor plan, dance floor, stage, and service requirements."
    ],
    [
      "Ceremony settings",
      "Indoor and outdoor options include the Lake View Garden, Lake View Terrace, and flexible ballroom configurations."
    ],
    [
      "Preparation spaces",
      "Private Bridal Glam Suites provide dedicated space for couples, families, and wedding parties."
    ],
    [
      "Guest accommodations",
      "The connected Hilton Garden Inn keeps overnight guests steps from the celebration."
    ],
    [
      "Food and beverage",
      "Customizable in-house catering, Halal menus, and separate vegetarian and non-vegetarian preparation areas are available."
    ]
  ]
};

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function WeddingsPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
