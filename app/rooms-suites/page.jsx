import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "rooms-suites";
const seoTitle = "Hotels Near Magnoliya Grand | Rooms & Suites";

const page = {
  "navLabel": "Rooms & Suites",
  // "eyebrow": "Stay close to every moment",
  "title": "More rooms. More convenience.",
  "accent": "One exceptional event destination.",
  // "description": "Your guests deserve a comfortable place to stay without having to travel far after celebrating.",
  "heroImage": "/hotel-assets/hiltonbanner.jpeg",
  "introTitle": "Stay close. Celebrate fully.",
  "intro": "Magnoliya Grand offers two convenient hotel options within a short walk of the venue. Hilton Garden Inn is directly connected, while Courtyard by Marriott is just a few steps away with 149 additional guest rooms.",
  "highlights": [],
  "hotelStays": [
    {
      "brand": "Hilton Garden Inn",
      "title": "From celebration to room, without stepping outside.",
      "description": "Guests can move conveniently between Hilton Garden Inn and Magnoliya Grand without stepping outside, keeping wedding parties, families, speakers, and conference attendees close to every moment.",
      "link": "https://www.hilton.com/en/hotels/mnzmngi-hilton-garden-inn-manassas/",
      "linkLabel": "Explore Hilton Garden Inn",
      "images": [
        "/hotel-assets/hilton-premium-king.jpg",
        "/hotel-assets/hilton-double-queen.jpg",
        "/home-assets/5-landscaped-garden.jpg"
      ],
      "features": []
    },
    {
      "brand": "Courtyard by Marriott",
      "title": "More flexibility for larger guest lists.",
      "description": "Courtyard by Marriott Manassas Battlefield Park adds 149 guest rooms just moments from Magnoliya Grand, giving hosts greater flexibility for large groups, peak dates, and multi-day celebrations.",
      "link": "https://www.marriott.com/en-us/hotels/mnzch-courtyard-manassas-battlefield-park/photos/",
      "linkLabel": "Explore Courtyard rooms",
      "images": [
        "/hotel-assets/courtyard-king-room.jpg",
        "/hotel-assets/courtyard-suite-living.jpg",
        "/hotel-assets/courtyard-king-suite.jpg"
      ],
      "features": []
    }
  ],
  "stayBenefits": [
    {
      "title": "Convenience for Out-of-Town Guests",
      "body": "Family, friends, clients, and colleagues can stay close to the celebration without worrying about long drives or complicated transportation."
    },
    {
      "title": "Perfect for Multi-Day Events",
      "body": "Nearby accommodations make Magnoliya Grand especially well suited for weddings and celebrations that unfold across several days."
    },
    {
      "title": "A Complete Event Destination",
      "body": "Bring catering, event coordination, décor, entertainment, and accommodations together in one convenient destination."
    },
    {
      "title": "Celebrate More. Travel Less.",
      "body": "With Magnoliya Grand, Hilton Garden Inn, and Courtyard by Marriott, guests can arrive, stay, celebrate, and relax within minutes of one another."
    }
  ]
};

const planningFacts = null;

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function RoomsSuitesPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
