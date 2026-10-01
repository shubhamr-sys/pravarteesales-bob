"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 bg-[#0A1F44] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-[#0057FF] opacity-10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Partner With Us
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight font-[var(--font-plus-jakarta)]">
            Ready to Transform Your IT Infrastructure?
          </h2>
          <p className="mt-5 text-white/60 text-lg leading-relaxed">
            Let&apos;s discuss how Pravartee Sales can deliver a tailored IT
            roadmap for your department or institution.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0057FF] hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/40"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200"
            >
              View Our Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
