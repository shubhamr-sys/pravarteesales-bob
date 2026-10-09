"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import directorImage from "@/assets/Director's Image.png";
// Team member imports
import deepikaSingh from "@/assets/Team Images/Deepika Singh -  Commercial Executive.png";
import prachiTyagi from "@/assets/Team Images/Prachi  Tyagi - Business Development Manager.png";
import rajKumar from "@/assets/Team Images/Raj Kumar - Accounts Executive.png";
import sauravBisht from "@/assets/Team Images/SAURAV BISHT - GeM Tender Manager.png";
import shailendraSahani from "@/assets/Team Images/shailendra sahani - Network Engineer.png";
import shivamJha from "@/assets/Team Images/shivam jha -  Jr. Accounts executive.png";
import shubhamRawat from "@/assets/Team Images/Shubham Rawat - Technology Officer.png";
import sureshMehr from "@/assets/Team Images/suresh  mehr -  business development manager.png";

const teamMembers = [
  { name: "Deepika Singh",      designation: "Commercial Executive",          image: deepikaSingh      },
  { name: "Prachi Tyagi",       designation: "Business Development Manager",  image: prachiTyagi       },
  { name: "Raj Kumar",          designation: "Accounts Executive",            image: rajKumar          },
  { name: "Saurav Bisht",       designation: "GeM Tender Manager",            image: sauravBisht       },
  { name: "Shailendra Sahani",  designation: "Network Engineer",              image: shailendraSahani  },
  { name: "Shivam Jha",         designation: "Jr. Accounts Executive",        image: shivamJha         },
  { name: "Shubham Rawat",      designation: "Technology Officer",            image: shubhamRawat      },
  { name: "Suresh Mehr",        designation: "Business Development Manager",  image: sureshMehr        },
];

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
      "To be India's most trusted IT solutions partner for government, driving digital transformation across every tier of public administration.",
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
    year: "2017",
    title: "Founded",
    description:
      "Pravartee Sales established with a vision to deliver enterprise IT infrastructure to government institutions in India.",
  },
  {
    year: "2018",
    title: "Strong Market Entry",
    description:
      "Successfully established the company with a strong initial focus on the sale of Electronics goods and IT hardware, quickly building a reputation for quality and reliability in the market.",
  },
  {
    year: "2021",
    title: "Full-Service System Integrator",
    description:
      "Transitioned from a hardware vendor to a full-service system integrator. Successfully designed and deployed our first major integrated IT infrastructure project for a key client.",
  },
  {
    year: "2024",
    title: "Strategic Technology Partnerships",
    description:
      "Forged strategic partnerships with leading technology manufacturers to broaden our solutions portfolio, introducing advanced automation and cloud integration services to our clients.",
  },
  {
    year: "2025",
    title: "US $1 Million Revenue & AI",
    description:
      "Expanded our client base by 50%, crossed US $1 Million in revenue and started building AI models for the use case of defence and government agencies.",
  },
];


const DESKTOP_VISIBLE = 8;
const AUTO_INTERVAL = 3000; // ms

function TeamCarousel() {
  const total = teamMembers.length;
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── detect mobile ─────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── auto-scroll (mobile only) ─────────────────────────────── */
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTO_INTERVAL);
  }, [total]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      startAuto();
    } else {
      stopAuto();
    }
    return stopAuto;
  }, [isMobile, startAuto, stopAuto]);

  /* ── manual nav ─────────────────────────────────────────────── */
  const maxIndex = isMobile ? total - 1 : total - 1;

  const prev = () => {
    setCurrent((c) => (isMobile ? (c - 1 + total) % total : Math.max(c - 1, 0)));
    if (isMobile) { stopAuto(); startAuto(); }
  };
  const next = () => {
    setCurrent((c) => (isMobile ? (c + 1) % total : Math.min(c + 1, maxIndex)));
    if (isMobile) { stopAuto(); startAuto(); }
  };
  const goTo = (i: number) => {
    setCurrent(i);
    if (isMobile) { stopAuto(); startAuto(); }
  };

  /* ── translate calculation ──────────────────────────────────── */
  // Mobile: each card is 100% of the track width (gap is 0)
  // Desktop: each card is 1/DESKTOP_VISIBLE of the track width
  const translateX = isMobile
    ? `calc(-${current} * 100%)`
    : `calc(-${current} * (100% / ${DESKTOP_VISIBLE} + 6px))`;

  return (
    <div className="relative">
      {/* Prev button */}
      <button
        onClick={prev}
        disabled={!isMobile && current === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-[#0A1F44] hover:border-[#0057FF] hover:text-[#0057FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next button */}
      <button
        onClick={next}
        disabled={!isMobile && current === maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-[#0A1F44] hover:border-[#0057FF] hover:text-[#0057FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Track */}
      <div className="overflow-hidden mx-6">
        <motion.div
          className="flex"
          style={{ gap: isMobile ? 0 : "1.5rem" }}
          animate={{ x: translateX }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 group ${
                isMobile
                  ? "flex-none w-full"
                  : "flex-none w-[calc((100%-18px*7)/8)] sm:w-[calc((100%-18px*4)/5)]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#F0F4FF]">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#0A1F44] text-sm font-[var(--font-plus-jakarta)] leading-snug">
                  {member.name}
                </h3>
                <p className="text-[#0057FF] text-xs mt-1 font-medium">
                  {member.designation}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {teamMembers.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-[#0057FF]"
                : "w-2 h-2 bg-[#0A1F44]/20 hover:bg-[#0057FF]/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
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
                { value: "9+", label: "Years of Experience", color: "#0057FF" },
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
            {/* Director image */}
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
                <Image
                  src={directorImage}
                  alt="Director, Pravartee Sales"
                  className="w-full h-full object-cover object-top"
                />
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
                    deserve the same quality of IT infrastructure that powers the world's most advanced enterprises.
                    Over the past decade, that conviction has shaped every project we have undertaken, every team member
                    we have brought onboard, and every relationship we have built.
                  </p>
                  <p>
                    The digital transformation of India's public sector is not merely a technology challenge — it is a
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

                    <div className="hidden md:flex w-2/12 justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#0057FF] border-4 border-white shadow-md shadow-blue-200 z-10" />
                    </div>

                    <div className="hidden md:block w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team — Carousel */}
      <section className="py-24 bg-[#F8F9FA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#0057FF] text-sm font-semibold uppercase tracking-widest">
              The People Behind the Work
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0A1F44] font-[var(--font-plus-jakarta)]">
              Meet Our Team
            </h2>
            <p className="mt-3 text-[#0A1F44]/60 max-w-xl mx-auto">
              A dedicated group of specialists committed to delivering excellence across every government IT engagement.
            </p>
          </motion.div>

          <TeamCarousel />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
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
                  className="bg-[#F8F9FA] rounded-2xl p-8 border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-lg transition-all duration-300"
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
