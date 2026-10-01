"use client";
import { motion } from "framer-motion";
import { Building2, Shield, Network, Server, BrainCircuit, Database, Monitor } from "lucide-react";

const sectors = ["All", "Defence", "Municipal", "State Govt", "PSU", "Health", "Transport"];

const projects = [
  {
    title: "Secure WAN Deployment",
    sector: "Defence",
    icon: Shield,
    description:
      "Designed and deployed a secure Wide Area Network (WAN) connecting 15+ defence establishments with encrypted tunnels and 99.9% uptime SLA.",
    tags: ["Networks", "Security"],
  },
  {
    title: "Smart City Data Center",
    sector: "Municipal",
    icon: Building2,
    description:
      "Built a Tier III-equivalent data center for a municipal corporation to host citizen services, including CCTV analytics and grievance management platforms.",
    tags: ["Data Center", "AI"],
  },
  {
    title: "State Police Cybersecurity",
    sector: "State Govt",
    icon: Shield,
    description:
      "Implemented an end-to-end cybersecurity framework for state police including SOC, SIEM integration, and incident response protocols.",
    tags: ["Security"],
  },
  {
    title: "Enterprise Storage Upgrade",
    sector: "PSU",
    icon: Database,
    description:
      "Migrated legacy storage to an all-flash SAN architecture for a public sector undertaking, reducing I/O latency by 80% and enabling real-time reporting.",
    tags: ["Storage"],
  },
  {
    title: "Hospital IT Infrastructure",
    sector: "Health",
    icon: Monitor,
    description:
      "Deployed server, storage, and networking infrastructure for a government hospital enabling electronic health records (EHR) and telemedicine capabilities.",
    tags: ["Server", "Networks", "Digital Workspace"],
  },
  {
    title: "AI Surveillance Platform",
    sector: "Municipal",
    icon: BrainCircuit,
    description:
      "Deployed an AI-powered video surveillance and analytics platform across a city with 500+ cameras, enabling real-time threat detection and crowd management.",
    tags: ["AI", "Security"],
  },
  {
    title: "Transport Authority Network",
    sector: "Transport",
    icon: Network,
    description:
      "Designed and implemented a state-wide network for a transport authority connecting regional transport offices with centralized license and registration systems.",
    tags: ["Networks"],
  },
  {
    title: "Government Cloud Migration",
    sector: "State Govt",
    icon: Server,
    description:
      "Migrated legacy on-premise government applications to a hybrid cloud environment, improving service availability and reducing infrastructure costs by 40%.",
    tags: ["Server", "Storage"],
  },
  {
    title: "Digital Workspace Rollout",
    sector: "PSU",
    icon: Monitor,
    description:
      "Rolled out a unified digital workspace for 2,000+ employees of a PSU — including VDI, secure email, collaboration tools, and endpoint management.",
    tags: ["Digital Workspace"],
  },
];

const tagColors: Record<string, string> = {
  Networks: "bg-blue-50 text-blue-700",
  Security: "bg-red-50 text-red-700",
  Server: "bg-purple-50 text-purple-700",
  Storage: "bg-orange-50 text-orange-700",
  "Data Center": "bg-gray-100 text-gray-700",
  AI: "bg-green-50 text-green-700",
  "Digital Workspace": "bg-teal-50 text-teal-700",
};

export default function ProjectsContent() {
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
              Our Work
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white font-[var(--font-plus-jakarta)]">
              Key Projects
            </h1>
            <p className="mt-5 text-white/60 text-lg max-w-2xl">
              A track record of successful IT deployments across government
              departments, defence, municipal bodies, and public enterprises.
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "100+", label: "Projects Delivered" },
                { value: "50+", label: "Government Clients" },
                { value: "7", label: "Sectors Served" },
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

      {/* Projects Grid */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Sector tags */}
          <div className="flex flex-wrap gap-3 mb-12">
            {sectors.map((s) => (
              <span
                key={s}
                className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
                  s === "All"
                    ? "bg-[#0057FF] text-white border-[#0057FF]"
                    : "bg-white text-[#0A1F44]/60 border-gray-200 hover:border-[#0057FF] hover:text-[#0057FF]"
                }`}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0057FF]/10 flex items-center justify-center">
                      <Icon size={20} className="text-[#0057FF]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/40 bg-[#F8F9FA] px-3 py-1 rounded-full">
                      {project.sector}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0A1F44] text-lg mb-3 font-[var(--font-plus-jakarta)]">
                    {project.title}
                  </h3>
                  <p className="text-[#0A1F44]/60 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          tagColors[tag] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
