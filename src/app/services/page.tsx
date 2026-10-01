import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | Pravartee Sales",
  description:
    "Explore Pravartee Sales IT solutions: Networks, Security, Server, Storage, Data Center, AI, and Digital Workspace for Government.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
