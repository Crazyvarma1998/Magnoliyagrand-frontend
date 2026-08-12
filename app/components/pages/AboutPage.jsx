import InteriorPage, { createPageMetadata } from "../InteriorPage";
export const metadata = createPageMetadata("about");
export default function AboutPage() { return <InteriorPage slug="about" />; }
