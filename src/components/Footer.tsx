import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const services = [
  "Networks",
  "Security",
  "Server",
  "Storage",
  "Data Center",
  "Artificial Intelligence",
  "Digital Workspace",
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo-white.png"
              alt="Pravartee Sales"
              width={150}
              height={45}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed mt-3">
              Empowering Government institutions with intelligent, secure, and
              scalable IT infrastructure solutions across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#F5A623] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#F5A623] mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#F5A623] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#0057FF]" />
                <a
                  href="https://www.google.com/maps/place/iThum-Noida/@28.6255104,77.3707271,17.75z/data=!4m6!3m5!1s0x390ce5336becb191:0xa89caf8bfb9e7068!8m2!3d28.6270614!4d77.3723967!16s%2Fg%2F11j118h_hh?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  222, Tower C Ithum, Sector-62,<br />Noida, UP-201309
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={16} className="shrink-0 text-[#0057FF]" />
                <a
                  href="mailto:info@pravarteesales.com"
                  className="hover:text-white transition-colors"
                >
                  info@pravarteesales.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={16} className="shrink-0 text-[#0057FF]" />
                <a href="tel:01140366978" className="hover:text-white transition-colors">
                  011 403 66 978
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Pravartee Sales. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            IT Solutions for Government
          </p>
        </div>
      </div>
    </footer>
  );
}
