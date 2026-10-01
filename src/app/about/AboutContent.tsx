"use client";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Quote } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To deliver reliable, secure, and innovative IT solutions that empower government institutions to serve citizens more efficiently in the digital age.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "To be India''s most trusted IT solutions partner for government, driving digital transformation across every tier of public administration.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards of quality, compliance, and delivery — because government infrastructure demands nothing less.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "We build lasting relationships with government clients, providing continuous support, training, and technology evolution beyond project delivery.",
  },
];

const milestones = [
  {
    year: "2014",
    title: "Founded",
    description:
      "Pravartee Sales established with a vision to deliver enterprise IT infrastructure to government institutions in India.",
  },
  {
    year: "2016",
    title: "First Major Govt. Contract",
    description:
      "Secured our first large-scale government network deployment, connecting 10+ district offices across a state.",
  },
  {
    year: "2018",
    title: "Data Center Practice",
    description:
      "Launched a dedicated Data Center design & build vertical, completing our first Tier III-equivalent government data center.",
  },
  {
    year: "2020",
    title: "Cybersecurity SOC",
    description:
      "Established a Security Operations Center (SOC) capability, enabling 24x7 monitoring for government clients.",
  },
  {
    year: "2022",
    title: "AI & Digital Workspace",
    description:
      "Expanded into Artificial Intelligence and Digital Workspace solutions, delivering AI-powered surveillance and VDI platforms.",
  },
  {
    year: "2024",
    title: "50+ Clients & 100+ Projects",
    description:
      "Reached a landmark — over 50 government clients served and 100+ projects successfully delivered across India.",
  },
];

// Director illustration SVG inline
function DirectorIllustration() {
  return (
    <svg viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Background circle */}
      <circle cx="140" cy="140" r="130" fill="#0d2a5e" opacity="0.5"/>
      <circle cx="140" cy="140" r="110" fill="#0a1f44"/>
      {/* Decorative ring */}
      <circle cx="140" cy="140" r="125" fill="none" stroke="#0057FF" strokeWidth="1.5" strokeDasharray="8,6" opacity="0.4"/>
      {/* Person silhouette - head */}
      <circle cx="140" cy="95" r="38" fill="#1a3a6b"/>
      <circle cx="140" cy="95" r="32" fill="#1e4080"/>
      {/* Face details */}
      <circle cx="128" cy="90" r="4" fill="#0057FF" opacity="0.6"/>
      <circle cx="152" cy="90" r="4" fill="#0057FF" opacity="0.6"/>
      <path d="M128 108 Q140 118 152 108" fill="none" stroke="#0057FF" strokeWidth="2" strokeLinecap="round"/>
      {/* Body / suit */}
      <path d="M80 180 Q80 155 140 150 Q200 155 200 180 L210 270 L70 270 Z" fill="#1a3a6b"/>
      <path d="M140 150 L125 175 L140 195 L155 175 Z" fill="#0057FF" opacity="0.3"/>
      {/* Tie */}
      <path d="M135 155 L130 180 L140 195 L150 180 L145 155 Z" fill="#f5a623" opacity="0.8"/>
      {/* Collar */}
      <path d="M120 152 L140 165 L160 152" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
      {/* Shoulders */}
      <ellipse cx="95" cy="175" rx="20" ry="12" fill="#1a3a6b"/>
      <ellipse cx="185" cy="175" rx="20" ry="12" fill="#1a3a6b"/>
      {/* Badge / medal */}
      <circle cx="105" cy="195" r="10" fill="#f5a623" opacity="0.7"/>
      <text x="105" y="199" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">IT</text>
      {/* Bottom decorative line */}
      <line x1="70" y1="270" x2="210" y2="270" stroke="#0057FF" strokeWidth="1.5" opacity="0.5"/>
      {/* Name plate */}
      <rect x="80" y="278" width="120" height="28" rx="4" fill="#0057FF" opacity="0.2" stroke="#0057FF" strokeWidth="1"/>
      <text x="140" y="296" textAnchor="middle" fontSize="9" fill="#60a5fa" fontWeight="bold">DIRECTOR</text>
    </svg>
  );
}

export default function AboutContent() {
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">Who We Are</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white font-[var(--font-plus-jakarta)]">
              About Pravartee Sales
            </h1>
            <p className="mt-5 text-white/60 text-lg max-w-2xl">
              A decade of trust, technology, and transformation — empowering government with world-class IT infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">Our Story</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
                Built for Government. Trusted Across India.
              </h2>
              <div className="mt-5 space-y-4 text-[#0A1F44]/70 leading-relaxed">
                <p>
                  Pravartee Sales was founded with a singular focus: to bridge the gap between advanced IT technology and
                  the unique needs of Indian government institutions. Over the past decade, we have grown from a regional
                  IT solutions provider to a trusted national partner for government digital infrastructure.
                </p>
                <p>
                  Our team of certified engineers and IT specialists brings deep domain knowledge in networking,
                  cybersecurity, server infrastructure, data center design, and emerging technologies like Artificial
                  Intelligence — all contextualized for the public sector environment.
                </p>
                <p>
                  We have successfully delivered 100+ projects across central government ministries, state departments,
                  defence establishments, municipal bodies, and public sector undertakings — making government operations
                  faster, safer, and more resilient.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-5">
              {[
                { value: "10+", label: "Years of Experience", color: "#0057FF" },
                { value: "50+", label: "Government Clients", color: "#0057FF" },
                { value: "100+", label: "Projects Delivered", color: "#0057FF" },
                { value: "7", label: "IT Domains", color: "#F5A623" },
              ].map((s) => (
                <div key={s.label} className="bg-[#F8F9FA] rounded-2xl p-8 text-center">
                  <div className="text-4xl font-bold font-[var(--font-plus-jakarta)]" style={{ color: s.color }}>
                    {s.value}
                  </div>
                  <div className="text-[#0A1F44]/60 text-sm mt-2">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Letter from the Director */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">Leadership</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
              Letter from the Director
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Director illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-56 h-72 rounded-3xl overflow-hidden border-2 border-[#0057FF]/30 shadow-xl shadow-blue-900/10"
              >
                <DirectorIllustration />
              </motion.div>
              <div className="mt-5 text-center">
                <div className="font-bold text-[#0A1F44] text-lg font-[var(--font-plus-jakarta)]">Director</div>
                <div className="text-[#0057FF] text-sm mt-1">Pravartee Sales</div>
              </div>
            </motion.div>

            {/* Letter content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm relative">
                {/* Quote icon */}
                <div className="absolute -top-5 left-8">
                  <div className="w-10 h-10 bg-[#0057FF] rounded-full flex items-center justify-center shadow-lg">
                    <Quote size={18} className="text-white" />
                  </div>
                </div>

                <div className="space-y-5 text-[#0A1F44]/70 leading-relaxed text-[15px] pt-4">
                  <p>
                    <span className="font-semibold text-[#0A1F44]">Dear Stakeholders and Partners,</span>
                  </p>
                  <p>
                    When we founded Pravartee Sales, we had a clear conviction — that government institutions in India
                    deserve the same quality of IT infrastructure that powers the world''s most advanced enterprises.
                    Over the past decade, that conviction has shaped every project we have undertaken, every team member
                    we have brought onboard, and every relationship we have built.
                  </p>
                  <p>
                    The digital transformation of India''s public sector is not merely a technology challenge — it is a
                    nation-building mission. Roads, hospitals, defence, elections, taxation — these pillars of governance
                    increasingly depend on the reliability and security of IT systems. Pravartee Sales exists to be the
                    trusted backbone of this transformation.
                  </p>
                  <p>
                    We have delivered 100+ projects, served 50+ government institutions, and built a team of engineers
                    and specialists who take immense pride in the work they do. But more importantly, we have earned
                    trust — and that is the metric we value above all others.
                  </p>
                  <p>
                    As we look to the future, we are investing in Artificial Intelligence, next-generation cybersecurity,
                    and cloud infrastructure — not because they are trends, but because government institutions need
                    solutions that will serve them for the next decade, not just today.
                  </p>
                  <p>
                    To our clients, partners, and investors — thank you for believing in our mission. The best is yet to come.
                  </p>
                  <p className="pt-2">
                    <span className="font-bold text-[#0A1F44]">With commitment,</span>
                    <br />
                    <span className="text-[#0057FF] font-semibold">Director, Pravartee Sales</span>
                  </p>
                </div>

                {/* Decorative signature line */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                  <div className="h-0.5 w-16 bg-[#0057FF]" />
                  <span className="text-xs text-[#0A1F44]/40 uppercase tracking-widest">Official Communication</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">Our Journey</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
              Company Milestones
            </h2>
            <p className="mt-3 text-[#0A1F44]/60 max-w-xl mx-auto">
              A decade of growth, trust, and transformation — delivered one milestone at a time.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0057FF] via-[#0057FF]/50 to-transparent -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Card */}
                    <div className={`w-full md:w-5/12 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="bg-[#F8F9FA] rounded-2xl p-7 border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-[#0057FF] font-[var(--font-plus-jakarta)]">{m.year}</span>
                          <div className="h-px flex-1 bg-[#0057FF]/20 group-hover:bg-[#0057FF]/40 transition-colors" />
                        </div>
                        <h3 className="font-bold text-[#0A1F44] text-lg mb-2 font-[var(--font-plus-jakarta)]">{m.title}</h3>
                        <p className="text-[#0A1F44]/60 text-sm leading-relaxed">{m.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex w-2/12 justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#0057FF] border-4 border-white shadow-md shadow-blue-200 z-10" />
                    </div>

                    {/* Empty opposite side */}
                    <div className="hidden md:block w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">Our Foundation</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
              Mission, Vision & Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0057FF]/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-[#0057FF]" />
                  </div>
                  <h3 className="font-bold text-[#0A1F44] mb-3 font-[var(--font-plus-jakarta)]">{v.title}</h3>
                  <p className="text-[#0A1F44]/60 text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}