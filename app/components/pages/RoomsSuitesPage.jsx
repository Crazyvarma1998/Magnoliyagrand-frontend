import InteriorPage, { createPageMetadata } from "../InteriorPage";

export const metadata = createPageMetadata("rooms-suites");

export default function RoomsSuitesPage() {
  return <InteriorPage slug="rooms-suites" />;
}
