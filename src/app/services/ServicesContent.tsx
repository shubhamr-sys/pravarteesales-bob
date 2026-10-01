"use client";
import { motion } from "framer-motion";
import Link from "next/link";
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

const services = [
  {
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
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${
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
