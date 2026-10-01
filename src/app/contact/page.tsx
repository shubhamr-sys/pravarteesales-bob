import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | Pravartee Sales",
  description:
    "Get in touch with Pravartee Sales for IT solution enquiries, project discussions, or partnership opportunities.",
};

export default function ContactPage() {
  return <ContactContent />;
}
