import type { Metadata } from "next";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers | Pravartee Sales",
  description:
    "Join Pravartee Sales and help build the digital infrastructure of India's government. View open positions in sales, engineering, finance, and more.",
};

export default function CareersPage() {
  return <CareersContent />;
}