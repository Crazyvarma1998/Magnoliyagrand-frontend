import InteriorPage, { createPageMetadata } from "../InteriorPage";

export const metadata = createPageMetadata("services");

export default function ServicesPage() {
  return <InteriorPage slug="services" />;
}
