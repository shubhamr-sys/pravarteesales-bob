import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Pravartee Sales",
  description:
    "Learn about Pravartee Sales — a decade of delivering trusted IT solutions to government institutions across India.",
};

export default function AboutPage() {
  return <AboutContent />;
}
