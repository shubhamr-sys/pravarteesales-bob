import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pravartee Sales | IT Solutions for Government",
  description:
    "Pravartee Sales delivers end-to-end IT solutions — Networks, Security, Servers, Storage, Data Centers, AI, and Digital Workspace — trusted by government institutions across India.",
  keywords: "IT solutions, government IT, network, security, data center, AI, digital workspace, India",
  openGraph: {
    title: "Pravartee Sales | IT Solutions for Government",
    description:
      "Empowering Government with Intelligent IT Solutions. Trusted by 50+ Government clients across India.",
    url: "https://pravarteesales.com",
    siteName: "Pravartee Sales",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col font-[var(--font-inter)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
