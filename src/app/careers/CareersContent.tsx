"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, ChevronDown, ChevronUp,
  Briefcase, Rocket, Users, Shield, TrendingUp, Heart,
} from "lucide-react";

/* ── data ────────────────────────────────────────────────────── */

const openings = [
  {
    title: "Business Development Executive",
    department: "Sales & Business Development",
    location: "Noida, UP",
    type: "Full-time",
    experience: "1–3 years",
    description:
      "Drive new business opportunities across government and public sector accounts. You will identify leads, prepare proposals, represent Pravartee Sales at GEM portals and government procurement events, and build long-term client relationships.",
    responsibilities: [
      "Identify and pursue new government accounts through GEM, tenders, and direct outreach",
      "Prepare and present proposals, quotations, and technical bids",
      "Maintain and grow relationships with existing clients",
      "Coordinate with technical and delivery teams to ensure successful project handoffs",
      "Meet and exceed monthly and quarterly revenue targets",
    ],
    requirements: [
      "1–3 years of B2G or B2B sales experience, preferably in IT hardware or solutions",
      "Familiarity with Government e-Marketplace (GEM) portal is a strong plus",
      "Strong communication and negotiation skills",
      "Proficiency in MS Office; CRM experience is a bonus",
      "Self-motivated, target-driven, and comfortable working independently",
    ],
  },
  {
    title: "Network Engineer",
    department: "Engineering & Delivery",
    location: "Noida, UP",
    type: "Full-time",
    experience: "2–5 years",
    description:
      "Design, deploy, and support enterprise network infrastructure for government clients. You will work hands-on with switches, routers, firewalls, and wireless systems — ensuring high availability and security for mission-critical government networks.",
    responsibilities: [
      "Design and implement LAN, WAN, and wireless network solutions for government sites",
      "Configure and manage switches, routers, firewalls (Cisco, Fortinet, HP Aruba)",
      "Perform network audits, capacity planning, and performance optimisation",
      "Respond to and resolve network incidents and escalations",
      "Prepare technical documentation, network diagrams, and handover reports",
    ],
    requirements: [
      "2–5 years of hands-on network engineering experience",
      "Proficiency with Cisco IOS, FortiOS, or HP Comware",
      "CCNA/CCNP or equivalent certification preferred",
      "Experience with government or defence network environments is a plus",
      "Strong troubleshooting skills and ability to work on-site at client locations",
    ],
  },
  {
    title: "GeM & Tender Specialist",
    department: "Procurement & Compliance",
    location: "Noida, UP",
    type: "Full-time",
    experience: "1–4 years",
    description:
      "Manage end-to-end participation in Government e-Marketplace (GEM) bids and government tenders. You will ensure timely, accurate, and competitive bid submissions while staying compliant with all government procurement regulations.",
    responsibilities: [
      "Monitor and track GEM portal for relevant bids, tenders, and opportunities",
      "Prepare and submit accurate bid documents, price bids, and technical bids",
      "Coordinate with OEM partners for authorisation letters and compliance documents",
      "Maintain bid calendar and ensure zero missed deadlines",
      "Liaise with clients and buyers for clarifications and order processing",
    ],
    requirements: [
      "1–4 years of experience specifically with GEM portal or government tendering",
      "Strong attention to detail and ability to manage multiple bids simultaneously",
      "Knowledge of GeM policies, L1 bidding, and government procurement rules",
      "Proficiency in MS Excel, Word, and PDF document handling",
      "Good written communication for preparing bid narratives and compliance statements",
    ],
  },
  {
    title: "IT Support & Field Engineer",
    department: "Engineering & Delivery",
    location: "Noida / Delhi NCR (Field)",
    type: "Full-time",
    experience: "1–3 years",
    description:
      "Provide on-site and remote IT support to government clients across Delhi NCR. You will handle hardware installation, configuration, troubleshooting, and maintenance for desktops, laptops, printers, servers, and networking equipment.",
    responsibilities: [
      "Install, configure, and commission IT equipment at government client sites",
      "Provide first- and second-level support for hardware, software, and network issues",
      "Maintain asset registers and update service records",
      "Coordinate with OEM service centres for warranty repairs and replacements",
      "Travel to client sites as required within Delhi NCR",
    ],
    requirements: [
      "1–3 years of IT support or field engineering experience",
      "Hands-on experience with Windows OS, MS Office, and basic networking",
      "Ability to handle physical hardware installation and cabling",
      "Good communication and professional conduct at client government premises",
      "Valid driver's licence or willingness to commute across NCR",
    ],
  },
  {
    title: "Accounts Executive",
    department: "Finance & Accounts",
    location: "Noida, UP",
    type: "Full-time",
    experience: "1–3 years",
    description:
      "Handle day-to-day financial operations including invoicing, GST compliance, vendor payments, and reconciliation. You will work closely with the sales and procurement teams to ensure accurate and timely financial records.",
    responsibilities: [
      "Raise invoices, process purchase orders, and manage accounts receivable/payable",
      "Prepare and file GST returns and maintain tax compliance records",
      "Perform monthly bank reconciliations and ledger entries in Tally",
      "Assist in preparation of MIS reports and financial summaries for management",
      "Coordinate with vendors, clients, and the CA for audit requirements",
    ],
    requirements: [
      "1–3 years of accounting experience, preferably in a trading or IT company",
      "Proficiency in Tally ERP and MS Excel",
      "Working knowledge of GST, TDS, and basic accounting principles",
      "High accuracy and attention to detail in financial data entry",
      "B.Com or equivalent degree in Accounting/Finance",
    ],
  },
];

const perks = [
  { icon: Rocket,     title: "High-Impact Work",      description: "Your work powers real government infrastructure — defence, healthcare, education, and beyond." },
  { icon: TrendingUp, title: "Fast Growth",            description: "A lean, growing team means your contributions are visible and promotions are merit-based." },
  { icon: Users,      title: "Collaborative Culture",  description: "Work alongside engineers, sales professionals, and domain experts who share knowledge freely." },
  { icon: Shield,     title: "Job Stability",          description: "Government-focused businesses are resilient. Enjoy the security of a stable and growing client base." },
  { icon: Heart,      title: "Work-Life Balance",      description: "Flexible working arrangements and a management team that respects your personal time." },
  { icon: Briefcase,  title: "Career Development",     description: "Access to OEM training programmes, certifications, and industry events to keep your skills sharp." },
];

/* ── role card ───────────────────────────────────────────────── */

function RoleCard({ role, index }: { role: typeof openings[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 overflow-hidden"
    >
      {/* Header (always visible) */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-7 flex items-start justify-between gap-4"
      >
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs font-semibold bg-[#0057FF]/10 text-[#0057FF] px-3 py-1 rounded-full">
              {role.department}
            </span>
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1">
              <MapPin size={11} /> {role.location}
            </span>
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center gap-1">
              <Clock size={11} /> {role.type}
            </span>
            <span className="text-xs font-medium bg-[#F5A623]/10 text-[#c47d00] px-3 py-1 rounded-full">
              {role.experience}
            </span>
          </div>
          <h3 className="font-bold text-[#0A1F44] text-xl font-[var(--font-plus-jakarta)]">
            {role.title}
          </h3>
          <p className="mt-2 text-sm text-[#0A1F44]/60 leading-relaxed">
            {role.description}
          </p>
        </div>
        <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#0A1F44]/50">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-6">
              {/* Responsibilities */}
              <div>
                <h4 className="font-semibold text-[#0A1F44] text-sm mb-3 uppercase tracking-wide">
                  Responsibilities
                </h4>
                <ul className="space-y-2">
                  {role.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-[#0A1F44]/65">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0057FF] shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Requirements */}
              <div>
                <h4 className="font-semibold text-[#0A1F44] text-sm mb-3 uppercase tracking-wide">
                  Requirements
                </h4>
                <ul className="space-y-2">
                  {role.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-[#0A1F44]/65">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F5A623] shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Apply CTA */}
            <div className="px-7 pb-7">
              <a
                href={`mailto:hr@pravarteesales.com?subject=Application: ${encodeURIComponent(role.title)}`}
                className="inline-flex items-center gap-2 bg-[#0057FF] hover:bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
              >
                Apply for this Role
              </a>
              <p className="mt-2 text-xs text-[#0A1F44]/40">
                Send your CV to hr@pravarteesales.com with the role title in the subject line.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── page ────────────────────────────────────────────────────── */

export default function CareersContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
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
              Join Our Team
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white font-[var(--font-plus-jakarta)]">
              Careers at Pravartee
            </h1>
            <p className="mt-5 text-white/60 text-lg max-w-2xl">
              Help us build the digital backbone of India&apos;s government. We are
              looking for driven, curious people who want their work to matter.
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: `${openings.length}`, label: "Open Positions" },
                { value: "Noida HQ",           label: "Primary Location" },
                { value: "Full-time",           label: "Employment Type" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-[#F5A623] font-[var(--font-plus-jakarta)]">
                    {s.value}
                  </div>
                  <div className="text-white/50 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Join Us ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">
              Why Pravartee
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
              A Place Where Your Work Has Impact
            </h2>
            <p className="mt-3 text-[#0A1F44]/60 max-w-xl mx-auto">
              We are a small, focused team doing meaningful work for some of
              India&apos;s most important institutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#F8F9FA] rounded-2xl p-8 border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0057FF]/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[#0057FF]" />
                  </div>
                  <h3 className="font-bold text-[#0A1F44] mb-2 font-[var(--font-plus-jakarta)]">
                    {perk.title}
                  </h3>
                  <p className="text-[#0A1F44]/60 text-sm leading-relaxed">
                    {perk.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Open Roles ───────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">
              Open Positions
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
              Current Openings
            </h2>
            <p className="mt-3 text-[#0A1F44]/60 max-w-xl mx-auto">
              Click any role to view full details and apply.
            </p>
          </motion.div>

          <div className="space-y-4">
            {openings.map((role, i) => (
              <RoleCard key={role.title} role={role} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── General Application CTA ──────────────────────────── */}
      <section className="py-24 bg-[#0A1F44] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,87,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,87,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-plus-jakarta)]">
              Don&apos;t See the Right Role?
            </h2>
            <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
              We are always open to meeting talented people. Send us your CV and
              tell us how you can contribute — we will keep it on file for future
              opportunities.
            </p>
            <a
              href="mailto:hr@pravarteesales.com?subject=General Application - Pravartee Sales"
              className="mt-8 inline-flex items-center gap-2 bg-[#F5A623] hover:bg-yellow-500 text-[#0A1F44] font-bold px-8 py-4 rounded-xl transition-colors duration-200 text-sm"
            >
              Send a General Application
            </a>
            <p className="mt-4 text-white/30 text-xs">hr@pravarteesales.com</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}