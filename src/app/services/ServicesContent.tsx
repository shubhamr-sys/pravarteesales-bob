"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Network,
  ShieldCheck,
  Server,
  Database,
  Building2,
  BrainCircuit,
  Monitor,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import adobe from "@/assets/technology-partner/adobe-logo.svg";
import cisco from "@/assets/technology-partner/Cisco_logo_blue_2016.svg.webp";
import dell from "@/assets/technology-partner/Dell_logo_2016.svg";
import delta from "@/assets/technology-partner/delta-displays-logo.svg";
import epson from "@/assets/technology-partner/epson-hd-logo.png";
import fortinet from "@/assets/technology-partner/Fortinet_logo.svg";
import hcl from "@/assets/technology-partner/HCL Tech.jpg";
import hpe from "@/assets/technology-partner/Hewlett_Packard_Enterprise_logo.svg";
import hp from "@/assets/technology-partner/hp-logo-png.png";
import ibm from "@/assets/technology-partner/ibm-striped_logo.avif";
import lg from "@/assets/technology-partner/LGE_Logo_Mono_Black_RGB.svg";
import microsoft from "@/assets/technology-partner/Microsoft_logo_(2012).svg";
import poly from "@/assets/technology-partner/Poly_Inc._Logo.svg";
import qnap from "@/assets/technology-partner/Qnap_Logo_2004.svg";
import quickheal from "@/assets/technology-partner/Quick_Heal_LOGO-01.svg";
import redhat from "@/assets/technology-partner/RedHatLogo.jpg";
import seagate from "@/assets/technology-partner/seagate_PMS_stacked_pos.png";
import sony from "@/assets/technology-partner/Sony_logo.svg.webp";
import sophos from "@/assets/technology-partner/Sophos_logo.svg";
import synology from "@/assets/technology-partner/synology_logo.jpg";

const techPartners = [
  { name: "Adobe", logo: adobe },
  { name: "Cisco", logo: cisco },
  { name: "Dell", logo: dell },
  { name: "Delta Displays", logo: delta },
  { name: "Epson", logo: epson },
  { name: "Fortinet", logo: fortinet },
  { name: "HCL Tech", logo: hcl },
  { name: "Hewlett Packard Enterprise", logo: hpe },
  { name: "HP", logo: hp },
  { name: "IBM", logo: ibm },
  { name: "LG", logo: lg },
  { name: "Microsoft", logo: microsoft },
  { name: "Poly", logo: poly },
  { name: "QNAP", logo: qnap },
  { name: "Quick Heal", logo: quickheal },
  { name: "Red Hat", logo: redhat },
  { name: "Seagate", logo: seagate },
  { name: "Sony", logo: sony },
  { name: "Sophos", logo: sophos },
  { name: "Synology", logo: synology },
];

const partnerRow1 = [...techPartners.slice(0, 10), ...techPartners.slice(0, 10)];
const partnerRow2 = [...techPartners.slice(10), ...techPartners.slice(10)];

const services = [
  {
    id: "networks",
    icon: Network,
    title: "Networks",
    tagline: "Connected. Secure. Reliable.",
    description:
      "We design and deploy enterprise-grade network infrastructure for government institutions — from LAN/WAN to SD-WAN and Wi-Fi. Our solutions ensure high availability, redundancy, and performance even in mission-critical environments.",
    features: [
      "Structured cabling & LAN design",
      "WAN & MPLS connectivity",
      "SD-WAN solutions",
      "Wi-Fi & wireless networks",
      "Network monitoring & NOC support",
      "Campus & multi-site networks",
    ],
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security",
    tagline: "Protect. Detect. Respond.",
    description:
      "Comprehensive cybersecurity solutions designed for the stringent requirements of government infrastructure — from next-gen firewalls to Security Operations Centers (SOC) and endpoint protection.",
    features: [
      "Next-gen firewalls (NGFW)",
      "Endpoint Detection & Response (EDR)",
      "Security Operations Center (SOC)",
      "Identity & Access Management",
      "Penetration testing & audits",
      "Compliance & data protection",
    ],
  },
  {
    id: "server",
    icon: Server,
    title: "Server",
    tagline: "Power. Scalability. Performance.",
    description:
      "Enterprise-grade server infrastructure — physical, virtualized, and hyper-converged — built for the demanding workloads of government applications, ERP systems, and citizen-facing services.",
    features: [
      "Physical & rack-mount servers",
      "Virtualization (VMware, Hyper-V)",
      "Hyper-Converged Infrastructure (HCI)",
      "High-availability clustering",
      "Server migrations & upgrades",
      "Annual Maintenance Contracts",
    ],
  },
  {
    id: "storage",
    icon: Database,
    title: "Storage",
    tagline: "Secure. Scalable. Always Available.",
    description:
      "Scalable storage architectures ensuring data integrity, high availability, and disaster recovery for government databases, archives, and mission-critical systems.",
    features: [
      "SAN & NAS solutions",
      "All-flash & hybrid storage",
      "Backup & disaster recovery",
      "Data deduplication & compression",
      "Cloud-integrated storage",
      "Long-term archival solutions",
    ],
  },
  {
    id: "data-center",
    icon: Building2,
    title: "Data Center",
    tagline: "Design. Build. Manage.",
    description:
      "End-to-end data center design, construction, and management — from physical infrastructure to power, cooling, and connectivity — ensuring uptime and operational continuity for critical government services.",
    features: [
      "Data center design & build",
      "Power & UPS systems",
      "Precision cooling & HVAC",
      "Structured cabling",
      "Physical security & access control",
      "Data center audits & migration",
    ],
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    tagline: "Intelligent Government. Smarter Decisions.",
    description:
      "AI-powered tools and platforms that help government institutions automate processes, gain insights from data, and deliver faster, smarter citizen services.",
    features: [
      "AI-based analytics dashboards",
      "Intelligent document processing",
      "Predictive maintenance systems",
      "Surveillance & video analytics",
      "Natural language processing (NLP)",
      "Machine learning model deployment",
    ],
  },
  {
    id: "digital-workspace",
    icon: Monitor,
    title: "Digital Workspace",
    tagline: "Work Anywhere. Securely.",
    description:
      "Unified digital workspace solutions enabling secure, flexible, and productive work environments for government officials — whether in office, in the field, or working remotely.",
    features: [
      "Virtual Desktop Infrastructure (VDI)",
      "Unified Communication & Collaboration",
      "Secure remote access (VPN/ZTNA)",
      "Email & messaging platforms",
      "Document management systems",
      "End-user device management (MDM)",
    ],
  },
];

export default function ServicesContent() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-[#0A1F44] pt-36 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,87,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,87,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">
              What We Offer
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white font-[var(--font-plus-jakarta)]">
              Our IT Solutions
            </h1>
            <p className="mt-5 text-white/60 text-lg max-w-2xl">
              Seven specialized domains of IT expertise, delivering end-to-end
              solutions built for the demands of government infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.div
                id={service.id}
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center scroll-mt-24 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Text */}
                <div className={isEven ? "" : "lg:order-2"}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0057FF]/10 flex items-center justify-center">
                      <Icon size={20} className="text-[#0057FF]" />
                    </div>
                    <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">
                      {service.tagline}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-[#0A1F44]/60 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-6 text-[#0057FF] font-semibold text-sm hover:gap-3 transition-all duration-200"
                  >
                    Enquire About This Service <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Features Card */}
                <div className={`bg-[#F8F9FA] rounded-2xl p-8 ${isEven ? "" : "lg:order-1"}`}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0A1F44]/40 mb-5">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="text-[#0057FF] mt-0.5 shrink-0"
                        />
                        <span className="text-[#0A1F44]/80 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Technology Partners Marquee */}
      <section className="py-16 bg-[#F8F9FA] overflow-hidden border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">
              Technology Partners
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
              Powered by World-Class Brands
            </h2>
          </motion.div>
        </div>

        {/* Row 1 — left to right */}
        <div className="flex overflow-x-hidden mb-4">
          <motion.div
            className="flex gap-6 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {partnerRow1.map((partner, i) => (
              <div
                key={i}
                className="shrink-0 w-[180px] h-[80px] bg-white rounded-xl flex items-center justify-center p-4"
                title={partner.name}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 — right to left */}
        <div className="flex overflow-x-hidden">
          <motion.div
            className="flex gap-6 shrink-0"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {partnerRow2.map((partner, i) => (
              <div
                key={i}
                className="shrink-0 w-[180px] h-[80px] bg-white rounded-xl flex items-center justify-center p-4"
                title={partner.name}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0057FF]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-plus-jakarta)]">
            Need a Custom IT Solution?
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Our experts will design a tailored solution for your department&apos;s specific needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-white text-[#0057FF] font-semibold px-8 py-4 rounded-lg hover:bg-[#F8F9FA] transition-colors duration-200"
          >
            Talk to Our Team <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
