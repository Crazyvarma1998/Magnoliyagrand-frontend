import InteriorPage, { createPageMetadata } from "../InteriorPage";
export const metadata = createPageMetadata("blog");
export default function BlogPage() { return <InteriorPage slug="blog" />; }
