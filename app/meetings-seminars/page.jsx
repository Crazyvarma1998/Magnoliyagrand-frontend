import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "meetings-seminars";
const seoTitle = "Meeting & Seminar Venue in Manassas | Magnoliya Grand";

const page = {
  "navLabel": "Meetings",
  "eyebrow": "Meetings & seminars",
  "title": "Focused spaces for",
  "accent": "meaningful progress.",
  "description": "Flexible meeting and seminar rooms in Manassas, Virginia with fast Wi-Fi, audiovisual support, catering, parking, and direct Hilton Garden Inn access.",
  "heroImage": "/home-assets/banner-5.jpg",
  "introTitle": "A better setting for the work that matters",
  "intro": "From leadership retreats and training days to association meetings and educational seminars, our flexible rooms create the right balance of focus, comfort, and polish.",
  "highlights": [
    {
      "value": "4",
      "label": "flexible divisions"
    },
    {
      "value": "24/7",
      "label": "hotel convenience"
    },
    {
      "value": "1",
      "label": "coordinated event team"
    }
  ],
  "sections": [
    {
      "kicker": "Built around the agenda",
      "title": "Configure the room around your goals.",
      "body": "Choose classroom, theater, banquet, or custom layouts. Add registration, networking, food service, and breakouts without sending attendees across multiple locations.",
      "image": "/home-assets/pre-event-area.jpg"
    },
    {
      "kicker": "Effortless logistics",
      "title": "The practical details are already considered.",
      "body": "Reliable connectivity, professional AV, ample parking, customizable catering, and attached accommodations make planning simpler for organizers and attendance easier for guests.",
      "image": "/home-assets/6-professional-event-planners.jpg"
    }
  ]
};

const planningFacts = {
  "title": "Meeting planning essentials",
  "summary": "Configure focused rooms for leadership sessions, training programs, seminars, and association meetings.",
  "items": [
    [
      "Room format",
      "Flexible divisions support classroom, theater, boardroom, workshop, and meal configurations."
    ],
    [
      "Connectivity",
      "High-speed Wi-Fi and professional audiovisual support are available for presentations and collaboration."
    ],
    [
      "Arrival",
      "Complimentary on-site parking and a dedicated pre-event area support registration and attendee check-in."
    ],
    [
      "Meals and breaks",
      "Customizable catering can be scheduled around sessions, networking breaks, and working meals."
    ],
    [
      "Overnight programs",
      "The connected Hilton Garden Inn supports retreats, speakers, and traveling attendees."
    ]
  ]
};

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function MeetingsSeminarsPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
