"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import HeroIllustration from "./illustrations/HeroIllustration";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0A1F44] overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,87,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,87,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-[#0057FF] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-40 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#0057FF]/20 border border-[#0057FF]/40 text-[#60a5fa] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#0057FF] animate-pulse" />
              Trusted by Government Institutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight font-[var(--font-plus-jakarta)]"
            >
              Empowering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0057FF] to-[#60a5fa]">
                Government
              </span>{" "}
              with Intelligent IT Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-white/60 leading-relaxed"
            >
              From secure networks to AI-driven infrastructure — Pravartee Sales
              delivers end-to-end technology solutions trusted by government
              institutions across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-[#0057FF] hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/30"
              >
                Explore Our Services <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Quick stats
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-12 flex gap-8"
            >
              {[
                { v: "10+", l: "Years" },
                { v: "50+", l: "Govt Clients" },
                { v: "100+", l: "Projects" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-bold text-white font-[var(--font-plus-jakarta)]">{s.v}</div>
                  <div className="text-white/40 text-xs mt-0.5 uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </motion.div> */}
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-[480px]"
            >
              <HeroIllustration />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}