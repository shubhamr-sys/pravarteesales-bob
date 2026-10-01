"use client";
import { motion } from "framer-motion";
import { BadgeCheck, Handshake, Lightbulb, ShieldCheck } from "lucide-react";
import GovtBuildingIllustration from "./illustrations/GovtBuildingIllustration";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Government-Grade Expertise",
    description:
      "Deep understanding of public sector requirements, procurement norms, and compliance standards across state and central government bodies.",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Approach",
    description:
      "Every solution is designed with security at its core — protecting sensitive government data and critical infrastructure from evolving threats.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Future-Readiness",
    description:
      "We bring cutting-edge AI, cloud, and digital transformation capabilities to help governments stay ahead in the digital era.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description:
      "We don't just install and leave. Our dedicated support teams provide ongoing AMC, training, and technology upgrades for continuity.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">
              Why Pravartee
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[#0A1F44] leading-tight font-[var(--font-plus-jakarta)]">
              The Trusted Partner for Government IT
            </h2>
            <p className="mt-5 text-[#0A1F44]/60 text-lg leading-relaxed">
              With over a decade of experience delivering critical IT
              infrastructure to government institutions, Pravartee Sales brings
              unmatched reliability, expertise, and commitment to every
              engagement.
            </p>

            {/* Stats row */}
            <div className="mt-8 flex items-center gap-6">
              {[
                { v: "10+", l: "Years" },
                { v: "50+", l: "Govt Clients" },
                { v: "100+", l: "Projects" },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0057FF]">{s.v}</div>
                    <div className="text-xs text-[#0A1F44]/50 uppercase tracking-wide mt-1">{s.l}</div>
                  </div>
                  {i < 2 && <div className="w-px h-12 bg-gray-200" />}
                </div>
              ))}
            </div>

            {/* Illustration below stats on mobile */}
            <div className="lg:hidden mt-10 rounded-2xl overflow-hidden border border-gray-100">
              <GovtBuildingIllustration />
            </div>

            {/* Pillars grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-[#F8F9FA] rounded-2xl p-6 hover:bg-[#0A1F44] group transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0057FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#0057FF] transition-colors duration-300">
                      <Icon size={20} className="text-[#0057FF] group-hover:text-white transition-colors duration-300"/>
                    </div>
                    <h4 className="font-bold text-[#0A1F44] group-hover:text-white text-sm mb-2 transition-colors duration-300 font-[var(--font-plus-jakarta)]">
                      {pillar.title}
                    </h4>
                    <p className="text-[#0A1F44]/60 group-hover:text-white/60 text-xs leading-relaxed transition-colors duration-300">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Government Building Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl overflow-hidden border border-[#0057FF]/20 shadow-2xl shadow-blue-900/20"
            >
              <GovtBuildingIllustration />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}