"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@pravarteesales.com",
    href: "mailto:info@pravarteesales.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "011 403 66 978",
    href: "tel:01140366978",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "222, Tower C Ithum, Sector-62, Noida, UP-201309",
    href: "https://www.google.com/maps/place/iThum-Noida/@28.6255104,77.3707271,17.75z/data=!4m6!3m5!1s0x390ce5336becb191:0xa89caf8bfb9e7068!8m2!3d28.6270614!4d77.3723967!16s%2Fg%2F11j118h_hh?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
  },
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission — integrate with Formspree/Resend in production
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

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
              Reach Out
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white font-[var(--font-plus-jakarta)]">
              Get in Touch
            </h1>
            <p className="mt-5 text-white/60 text-lg max-w-2xl">
              Discuss your IT requirements, request a proposal, or simply learn
              more about how Pravartee Sales can support your organisation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
                  Contact Information
                </h2>
                <p className="mt-2 text-[#0A1F44]/60 text-sm leading-relaxed">
                  Our team typically responds within one business day.
                </p>
              </div>

              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0057FF]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0057FF] transition-colors duration-300">
                      <Icon
                        size={18}
                        className="text-[#0057FF] group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/40 mb-1">
                        {info.label}
                      </div>
                      <div className="text-[#0A1F44] font-medium text-sm">
                        {info.value}
                      </div>
                    </div>
                  </a>
                );
              })}

              {/* Quick response note */}
              <div className="bg-[#0A1F44] rounded-2xl p-6 text-white">
                <div className="text-[#F5A623] font-semibold text-sm mb-2">
                  Government Enquiries
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  For government departments and PSUs with urgent infrastructure
                  requirements, our team is available to provide an expedited
                  response.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <CheckCircle2 size={56} className="text-[#0057FF] mb-5" />
                  <h3 className="text-2xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
                    Message Sent!
                  </h3>
                  <p className="text-[#0A1F44]/60 mt-3 max-w-md">
                    Thank you for reaching out. Our team will review your
                    enquiry and get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A1F44] placeholder-gray-400 focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A1F44] placeholder-gray-400 focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
                        Organisation
                      </label>
                      <input
                        type="text"
                        placeholder="Department / Company name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A1F44] placeholder-gray-400 focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
                        Service of Interest
                      </label>
                      <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A1F44] focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 transition-all bg-white">
                        <option value="">Select a service</option>
                        <option>Networks</option>
                        <option>Security</option>
                        <option>Server</option>
                        <option>Storage</option>
                        <option>Data Center</option>
                        <option>Artificial Intelligence</option>
                        <option>Digital Workspace</option>
                        <option>Multiple / General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0A1F44]/50 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your requirements or questions..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A1F44] placeholder-gray-400 focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-[#0057FF] hover:bg-blue-600 disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/20"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
