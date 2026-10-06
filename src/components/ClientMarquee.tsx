"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import aiia from "@/assets/clients/all-india-institute-of-ayurveda.webp";
import bro from "@/assets/clients/border-road-orgainization.webp";
import dabur from "@/assets/clients/dabur.webp";
import drdo from "@/assets/clients/defence-research-devlopment-orgainization.webp";
import gulf from "@/assets/clients/gulf.webp";
import iaf from "@/assets/clients/Indian-air-force.webp";
import army from "@/assets/clients/indian-army.webp";
import icmr from "@/assets/clients/indian-council-medical-research.webp";
import iitd from "@/assets/clients/indian-institute-of-technology-delhi.webp";
import mha from "@/assets/clients/ministry-of-home-affairs.webp";
import nia from "@/assets/clients/national-investigation-agency.webp";
import pb from "@/assets/clients/policy-bazaar.webp";
import sai from "@/assets/clients/sports-authority-india.webp";
import du from "@/assets/clients/university-of-delhi.webp";
import yeida from "@/assets/clients/yamuna-expressway-industrial-development-authority.webp";

const clients = [
  { name: "All India Institute of Ayurveda", logo: aiia },
  { name: "Border Roads Organisation", logo: bro },
  { name: "Dabur", logo: dabur },
  { name: "Defence Research & Development Organisation", logo: drdo },
  { name: "Gulf", logo: gulf },
  { name: "Indian Air Force", logo: iaf },
  { name: "Indian Army", logo: army },
  { name: "Indian Council of Medical Research", logo: icmr },
  { name: "IIT Delhi", logo: iitd },
  { name: "Ministry of Home Affairs", logo: mha },
  { name: "National Investigation Agency", logo: nia },
  { name: "PolicyBazaar", logo: pb },
  { name: "Sports Authority of India", logo: sai },
  { name: "University of Delhi", logo: du },
  { name: "Yamuna Expressway Industrial Development Authority", logo: yeida },
];

// Split into two rows and duplicate each for seamless infinite loop
const row1 = [...clients.slice(0, 8), ...clients.slice(0, 8)];
const row2 = [...clients.slice(7), ...clients.slice(7)];

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
          {row1.map((client, i) => (
            <div
              key={i}
              className="shrink-0 w-[270px] h-[120px] bg-white rounded-xl overflow-hidden transition-all duration-300 flex items-center justify-center p-4"
              title={client.name}
            >
              <Image
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
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
          {row2.map((client, i) => (
            <div
              key={i}
              className="shrink-0 w-[270px] h-[120px] bg-white rounded-xl overflow-hidden transition-all duration-300 flex items-center justify-center p-4"
              title={client.name}
            >
              <Image
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
