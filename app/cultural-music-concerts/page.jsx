import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "cultural-music-concerts";
const seoTitle = "Concert & Cultural Event Venue | Magnoliya Grand";

const page = {
  "navLabel": "Concerts",
  "eyebrow": "Cultural & music concerts",
  "title": "Every performance deserves",
  "accent": "a grand stage.",
  "description": "A 2,000-seat cultural and music concert venue in Northern Virginia with advanced audiovisual capabilities, green rooms, parking, catering, and hotel access.",
  "heroImage": "/home-assets/banner-8.jpg",
  "introTitle": "A Northern Virginia stage built for shared experience",
  "intro": "Present concerts, cultural programs, community celebrations, and large-scale performances in a flexible ballroom with theater seating for up to 2,000 attendees.",
  "highlights": [
    {
      "value": "2,000",
      "label": "theater-style audience"
    },
    {
      "value": "2",
      "label": "private green-room areas"
    },
    {
      "value": "1",
      "label": "production-ready venue"
    }
  ],
  "sections": [
    {
      "kicker": "Production ready",
      "title": "Room for the sound, light, and energy.",
      "body": "Advanced AV infrastructure, customizable floor plans, performer green rooms, and a generous pre-event area support everything from intimate showcases to large community productions.",
      "image": "/home-assets/6-cutting-edge-technology.jpg"
    },
    {
      "kicker": "Made for community",
      "title": "Tradition, expression, and celebration at scale.",
      "body": "Magnoliya Grand welcomes the many cultures of Northern Virginia with flexible spaces, inclusive hospitality, and catering options designed around the needs of each program.",
      "image": "/gallery/img-18.jpg"
    }
  ]
};

const planningFacts = {
  "title": "Concert planning essentials",
  "summary": "Coordinate audience seating, staging, sound, performers, hospitality, and guest arrival in a production-ready setting.",
  "items": [
    [
      "Audience capacity",
      "The Magna Ballroom supports up to 2,000 theater-style attendees, depending on staging and production."
    ],
    [
      "Performer support",
      "Private green rooms provide preparation and holding space for artists, speakers, and VIPs."
    ],
    [
      "Production",
      "Professional audiovisual capabilities, staging, lighting, Wi-Fi, and dance-floor options are available."
    ],
    [
      "Cultural hospitality",
      "Custom menus, Halal options, and separate vegetarian and non-vegetarian preparation areas are available."
    ],
    [
      "Arrival and stay",
      "Complimentary parking and direct Hilton Garden Inn access simplify audience and performer logistics."
    ]
  ]
};

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function CulturalMusicConcertsPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
