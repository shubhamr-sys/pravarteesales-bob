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
} from "lucide-react";

const services = [
  {
    icon: Network,
    title: "Networks",
    description:
      "High-performance LAN, WAN, and SD-WAN infrastructure designed for secure and reliable government connectivity.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "End-to-end cybersecurity solutions including firewalls, endpoint protection, SOC, and compliance frameworks.",
  },
  {
    icon: Server,
    title: "Server",
    description:
      "Enterprise-grade server solutions — physical, virtual, and hyper-converged — optimized for government workloads.",
  },
  {
    icon: Database,
    title: "Storage",
    description:
      "Scalable SAN, NAS, and cloud storage architectures ensuring data integrity, availability, and disaster recovery.",
  },
  {
    icon: Building2,
    title: "Data Center",
    description:
      "Design, build, and manage modern data centers with power, cooling, and connectivity infrastructure for critical operations.",
  },
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    description:
      "AI-powered analytics, automation, and decision-support systems tailored for government intelligence and administration.",
  },
  {
    icon: Monitor,
    title: "Digital Workspace",
    description:
      "Unified digital workspace solutions enabling secure remote access, collaboration, and productivity for government staff.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
            Our IT Solutions
          </h2>
          <p className="mt-4 text-[#0A1F44]/60 text-lg max-w-2xl mx-auto">
            Comprehensive technology solutions crafted for the unique demands of
            government infrastructure and operations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0057FF]/10 flex items-center justify-center mb-5 group-hover:bg-[#0057FF] transition-colors duration-300">
                  <Icon
                    size={22}
                    className="text-[#0057FF] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#0A1F44] mb-3 font-[var(--font-plus-jakarta)]">
                  {service.title}
                </h3>
                <p className="text-[#0A1F44]/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#0A1F44] rounded-2xl p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-plus-jakarta)]">
                Need a Custom IT Solution?
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We tailor solutions to meet the specific needs of government
                departments and institutions.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 text-[#F5A623] font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              Talk to Our Team <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
