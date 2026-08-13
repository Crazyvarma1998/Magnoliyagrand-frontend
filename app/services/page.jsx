import InteriorPage, { createPageMetadata } from "../components/InteriorPage";

const slug = "services";
const seoTitle = "Complete Event Services in Manassas, VA | Magnoliya Grand";

const page = {
  "navLabel": "Services",
  "eyebrow": "One team. Every detail.",
  "title": "Your vision. Our expertise.",
  "accent": "One extraordinary experience.",
  "description": "Discover complete event services designed to bring every detail of your Magnoliya Grand celebration together with confidence and care.",
  "heroImage": "/home-assets/8-culinary-excellence.jpg",
  "introTitle": "Our Complete Event Services",
  "intro": "Your Vision. Our Expertise. One Extraordinary Experience.",
  "highlights": [],
  "services": [
    {
      "icon": "🍽️",
      "title": "Exceptional Catering",
      "body": "Delight your guests with expertly prepared cuisine and customizable menus designed to complement your celebration. Our New York-based premier luxury CGA culinary catering team specializes in upscale weddings, corporate functions, large galas, and destination events worldwide. Renowned for innovative fusion cuisine and custom gourmet experiences, CGA brings exceptional flavors, elegant presentation, and culinary excellence to every occasion.",
      "image": "/service-assets/exceptional-catering.jpg"
    },
    {
      "icon": "✨",
      "title": "Dedicated Event Coordination",
      "body": "Our experienced event coordinators work closely with you and your vendors to ensure every detail is thoughtfully planned and flawlessly executed. We help manage the timeline, setup, transitions, and event flow so you can enjoy your celebration.",
      "image": "/service-assets/dedicated-event-coordination.jpg"
    },
    {
      "icon": "💍",
      "title": "Event Celebration Support",
      "body": "Whether it's a wedding, reception, anniversary, birthday, Sweet 16, graduation, or cultural celebration, our team can help coordinate the details and trusted vendors needed to bring your vision to life.",
      "image": "/service-assets/wedding-celebration-support.jpg"
    },
    {
      "icon": "🎧",
      "title": "DJ & Entertainment",
      "body": "Set the perfect mood with professional DJs and entertainment services through our trusted partner companies. From elegant background music to an energetic dance floor, we help keep your guests entertained throughout the celebration.",
      "image": "/service-assets/dj-entertainment.jpg"
    },
    {
      "icon": "🌸",
      "title": "Décor & Event Design",
      "body": "Transform your vision into a beautiful reality. Through our preferred décor partners, you can create stunning settings with elegant backdrops, floral arrangements, specialty lighting, stages, linens, and customized themes.",
      "image": "/service-assets/decor-event-design.jpg"
    },
    {
      "icon": "🎤",
      "title": "Premium Audio-Visual Services",
      "body": "From crystal-clear sound and professional microphones to large displays, presentation equipment, lighting, and staging, our AV solutions help ensure your event looks and sounds exceptional.",
      "image": "/service-assets/premium-audio-visual.jpg"
    },
    {
      "icon": "📡",
      "title": "Professional Live Streaming & Virtual Events",
      "body": "Extend your celebration beyond the ballroom with professional online streaming services. We can help bring your wedding, corporate event, conference, or special celebration to guests who cannot attend in person, allowing family, friends, clients, and colleagues to be part of the experience from anywhere in the world.",
      "image": "/home-assets/6-cutting-edge-technology.jpg"
    },
    {
      "icon": "📸",
      "title": "Photography & Videography",
      "body": "Preserve the moments that matter most. Our trusted photography and videography partners capture the emotions, celebrations, and unforgettable memories of your special day.",
      "image": "/service-assets/photography-videography.jpg"
    },
    {
      "icon": "🏢",
      "title": "Corporate & Professional Events",
      "body": "Create an impressive experience for your clients, employees, and guests. Magnoliya Grand provides the space, technology, catering, and event support for conferences, meetings, seminars, galas, award ceremonies, and corporate celebrations.",
      "image": "/service-assets/corporate-professional-events.jpg"
    },
    {
      "icon": "🤝",
      "title": "Trusted Partner Network",
      "body": "You don't have to coordinate everything yourself. We work with a carefully selected network of trusted DJs, decorators, photographers, entertainment professionals, and other event specialists to simplify your planning and help deliver a cohesive experience.",
      "image": "/service-assets/trusted-partner-network.png",
      "imageFit": "contain"
    }
  ]
};

const planningFacts = null;

export const metadata = createPageMetadata(slug, page, seoTitle);

export default function ServicesPage() {
  return <InteriorPage slug={slug} page={page} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
