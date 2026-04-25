import type { Metadata } from "next";

import StudioClient from "./studio-client";

export { viewport } from "next-sanity/studio";

export const metadata: Metadata = {
  title: "Studio — Kevin Block",
  description: "Sanity Studio für die Inhaltsverwaltung",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  return <StudioClient />;
}
