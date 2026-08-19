import InteriorPage, { createPageMetadata } from "../components/InteriorPage";
import { getCmsPageConfig, getCmsPageRecord } from "../cms-client";

const slug = "gallery";
const seoTitle = "Magnoliya Grand Venue Gallery | Manassas, Virginia";

const page = {
  "navLabel": "Gallery",
  "eyebrow": "The venue in focus",
  "title": "Every angle,",
  "accent": "distinctly Magnoliya.",
  "description": "Explore real photographs of Magnoliya Grand's ballroom, waterfront patio, landscaped gardens, reception spaces, and venue exterior in Manassas, Virginia.",
  "heroImage": "/gallery/img-15.jpg",
  "introTitle": "Real spaces. Real light. Remarkable possibilities.",
  "intro": "Tour the grand ballroom, waterfront setting, landscaped garden, arrival spaces, and event details before scheduling your private visit.",
  "highlights": [
    {
      "value": "20",
      "label": "venue perspectives"
    },
    {
      "value": "10",
      "label": "flexible spaces"
    },
    {
      "value": "1",
      "label": "private tour away"
    }
  ],
  "gallery": [
    "/gallery/img-1.jpg?v=live-gallery-2026",
    "/gallery/img-2.jpg?v=live-gallery-2026",
    "/gallery/img-3.jpg?v=live-gallery-2026",
    "/gallery/img-4.jpg?v=live-gallery-2026",
    "/gallery/img-5.jpg?v=live-gallery-2026",
    "/gallery/img-6.jpg?v=live-gallery-2026",
    "/gallery/img-7.jpg?v=live-gallery-2026",
    "/gallery/img-8.jpg?v=live-gallery-2026",
    "/gallery/img-9.jpg?v=live-gallery-2026",
    "/gallery/img-10.jpg?v=live-gallery-2026",
    "/gallery/img-11.jpg?v=live-gallery-2026",
    "/gallery/img-12.jpg?v=live-gallery-2026",
    "/gallery/img-13.jpg?v=live-gallery-2026",
    "/gallery/img-14.jpg?v=live-gallery-2026",
    "/gallery/img-15.jpg?v=live-gallery-2026",
    "/gallery/img-16.jpg?v=live-gallery-2026",
    "/gallery/img-17.jpg?v=live-gallery-2026",
    "/gallery/img-18.jpg?v=live-gallery-2026",
    "/gallery/img-19.jpg?v=live-gallery-2026",
    "/gallery/img-20.jpg?v=live-gallery-2026"
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

export default async function GalleryPage() {
  const cmsPage = await getCmsPageConfig(slug, page);
  return <InteriorPage slug={slug} page={cmsPage} planningFacts={planningFacts} seoTitle={seoTitle} />;
}
