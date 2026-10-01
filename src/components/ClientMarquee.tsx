"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  { name: "Ministry of Defence", logo: "/logos/mod.svg", abbr: "MoD" },
  { name: "DRDO", logo: "/logos/drdo.svg", abbr: "DRDO" },
  { name: "National Informatics Centre", logo: "/logos/nic.svg", abbr: "NIC" },
  { name: "BSNL", logo: "/logos/bsnl.svg", abbr: "BSNL" },
  { name: "Indian Railways", logo: "/logos/railway.svg", abbr: "IR" },
  { name: "ISRO", logo: "/logos/isro.svg", abbr: "ISRO" },
  { name: "Election Commission of India", logo: "/logos/eci.svg", abbr: "ECI" },
  { name: "UIDAI", logo: "/logos/uidai.svg", abbr: "UIDAI" },
];

// Duplicate for seamless infinite loop
const allClients = [...clients, ...clients];

export default function ClientMarquee() {
  return (
    <section className="py-16 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#0A1F44]/40 text-sm font-semibold uppercase tracking-widest"
        >
          Trusted by Government Departments Across India
        </motion.p>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative flex overflow-x-hidden mb-4">
        <motion.div
          className="flex gap-5 shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {allClients.map((client, i) => (
            <div
              key={i}
              className="shrink-0 w-[200px] h-[80px] rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0057FF]/20 transition-all duration-300"
              title={client.name}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex gap-5 shrink-0"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {allClients.map((client, i) => (
            <div
              key={i}
              className="shrink-0 w-[200px] h-[80px] rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0057FF]/20 transition-all duration-300"
              title={client.name}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}