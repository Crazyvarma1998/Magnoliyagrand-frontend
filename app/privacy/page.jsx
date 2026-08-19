import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
import { getCmsPageConfig, getCmsPageRecord } from "../cms-client";

const slug = "privacy";
const seoTitle = "Privacy Policy | Magnoliya Grand";

const page = {
  "navLabel": "Privacy",
  "eyebrow": "Privacy policy",
  "title": "Your information,",
  "accent": "handled with care.",
  "description": "Magnoliya Grand's privacy policy explains how inquiry information, analytics data, and booking details are collected and used.",
  "heroImage": "/home-assets/banner-13.jpg",
  "introTitle": "Privacy at Magnoliya Grand",
  "intro": "This policy explains the information collected when you use this website, submit an inquiry, or follow a link to our booking provider.",
  "highlights": [
    {
      "value": "Only",
      "label": "necessary information collected"
    },
    {
      "value": "Never",
      "label": "personal data sold"
    },
    {
      "value": "You",
      "label": "control your inquiry details"
    }
  ],
  "policy": [
    [
      "Information we collect",
      "We may collect details you voluntarily provide, including your name, email address, phone number, event type, preferred date, guest count, and message. Basic technical and analytics data may also be collected to understand site performance and usage."
    ],
    [
      "How information is used",
      "Information is used to respond to inquiries, prepare event information, coordinate tours, improve the website, measure marketing performance, and protect the security of our services."
    ],
    [
      "Booking and third-party services",
      "Booking requests may be completed through TripleSeat. Maps, analytics, social networks, and embedded media may also process data under their own privacy policies when you choose to use those services."
    ],
    [
      "Sharing and retention",
      "We do not sell personal information. Information may be shared with service providers only when needed to operate the website, respond to your request, or comply with law. Records are retained only as long as reasonably necessary."
    ],
    [
      "Cookies and analytics",
      "The website may use essential cookies and privacy-conscious analytics. You can control non-essential cookies through your browser settings where applicable."
    ],
    [
      "Your choices",
      "You may request access, correction, or deletion of information you submitted by emailing sales@magnoliyagrand.com."
    ],
    [
      "Contact",
      "Questions about this policy may be sent to Magnoliya Grand, 7001 Infantry Ridge Rd, Manassas, VA 20109, or sales@magnoliyagrand.com."
    ]
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

export default async function PrivacyPage() {
  const cmsPage = await getCmsPageConfig(slug, page);
  return <InteriorPage slug={slug} page={cmsPage} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
