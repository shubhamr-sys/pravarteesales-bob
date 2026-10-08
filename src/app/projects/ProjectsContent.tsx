"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MergedProject } from "@/lib/getProjects";

/* ── sector derivation ───────────────────────────────────────── */

function sectorOf(p: MergedProject): string {
  const m = p.ministry.toLowerCase();
  const o = p.organisation.toLowerCase();
  if (m.includes("defence"))                                                                                       return "Defence";
  if (m.includes("home affairs") || o.includes("police") || o.includes("ncrb") || o.includes("nia") || o.includes("itbp")) return "Home Affairs";
  if (m.includes("finance") || m.includes("revenue") || o.includes("bank") || o.includes("cbdt") || o.includes("cbec") || o.includes("epfo")) return "Finance";
  if (m.includes("education") || o.includes("ugc") || o.includes("university") || o.includes("gims") || o.includes("institute") || o.includes("medical sciences")) return "Education";
  if (m.includes("environment") || o.includes("botanical"))                                                       return "Environment";
  if (m.includes("culture"))                                                                                       return "Culture";
  if (m.includes("statistics"))                                                                                    return "Statistics";
  if (m.includes("youth") || m.includes("sports") || o.includes("sports authority"))                             return "Sports";
  if (m.includes("labour") || m.includes("employment"))                                                           return "Labour";
  if (m.includes("pmo") || m.includes("space"))                                                                   return "Space";
  if (m.includes("commerce") || m.includes("industry") || o.includes("economic zone"))                           return "Commerce";
  if (m.includes("ports") || m.includes("shipping") || m.includes("waterways") || o.includes("iwai"))            return "Transport";
  if (m.includes("cabinet"))                                                                                       return "Cabinet";
  return "Government";
}

const SECTOR_COLORS: Record<string, string> = {
  Defence:        "bg-red-50     text-red-700",
  "Home Affairs": "bg-orange-50  text-orange-700",
  Finance:        "bg-green-50   text-green-700",
  Education:      "bg-blue-50    text-blue-700",
  Environment:    "bg-emerald-50 text-emerald-700",
  Culture:        "bg-purple-50  text-purple-700",
  Statistics:     "bg-gray-100   text-gray-700",
  Sports:         "bg-yellow-50  text-yellow-700",
  Labour:         "bg-teal-50    text-teal-700",
  Space:          "bg-indigo-50  text-indigo-700",
  Commerce:       "bg-cyan-50    text-cyan-700",
  Transport:      "bg-sky-50     text-sky-700",
  Cabinet:        "bg-rose-50    text-rose-700",
  Government:     "bg-gray-100   text-gray-600",
};

/* ── solution classification ─────────────────────────────────── */

function solutionTitleOf(item: string): string {
  const t = item.toLowerCase();
  if (t.includes("laptop") || (t.includes("notebook") && !t.includes("pages"))) return "Laptop Procurement & Deployment";
  if (t.includes("all in one") || t.includes("all-in-one") || t.includes("aio"))  return "All-in-One Desktop Supply";
  if (t.includes("desktop") || t.includes("tower") || t.includes("sff"))          return "Desktop Computer Infrastructure";
  if (t.includes("workstation"))                                                    return "Professional Workstation Deployment";
  if (t.includes("server"))                                                         return "Server Infrastructure Setup";
  if ((t.includes("storage") || t.includes("san") || t.includes("nas")) && !t.includes("hard disk") && !t.includes("ssd") && !t.includes("hdd")) return "Enterprise Storage Solution";
  if (t.includes("switch") || t.includes("router") || t.includes("poe") || t.includes("access point")) return "Network Infrastructure Deployment";
  if (t.includes("firewall") || t.includes("appscan") || t.includes("cybersecurity"))                  return "Cybersecurity Solution";
  if (t.includes("antivirus") || t.includes("endpoint protection"))                return "Endpoint Security Deployment";
  if ((t.includes("multifunction") || t.includes("mfp") || t.includes("mfm")) && (t.includes("print") || t.includes("laser") || t.includes("a3") || t.includes("a4"))) return "Multifunction Printer Solution";
  if (t.includes("printer") || t.includes("laser printer"))                        return "Printing Solution Supply";
  if (t.includes("scanner"))                                                        return "Document Scanning Solution";
  if (t.includes("projector"))                                                      return "Projection & Presentation Solution";
  if (t.includes("display") || t.includes("monitor"))                              return "Display & Visual Solution";
  if (t.includes("camera") || t.includes("dslr") || t.includes("camcorder") || t.includes("surveillance")) return "Imaging & Surveillance Equipment";
  if (t.includes("microsoft office") || t.includes("office suite") || t.includes("office ltsc") || t.includes("csp")) return "Productivity Software Licensing";
  if (t.includes("software") || t.includes("licence") || t.includes("license"))   return "Software Licensing & Deployment";
  if (t.includes("air conditioner") || t.includes("split") || t.includes("inverter ac")) return "Climate Control Equipment";
  if (t.includes("conferenc") || t.includes("ptz") || t.includes("meetup"))       return "Video Conferencing Solution";
  if (t.includes("mobile") || t.includes("iphone") || t.includes("smartphone"))   return "Mobile Device Procurement";
  if (t.includes("rack"))                                                           return "Data Centre Rack Infrastructure";
  if (t.includes("eoffice") || t.includes("e-office") || (t.includes("hardware") && t.includes("software"))) return "Digital Office Transformation";
  if (t.includes("dispenser") || t.includes("water cooler"))                       return "Facility Equipment Supply";
  if (t.includes("ink") || t.includes("toner") || t.includes("cartridge"))        return "Printing Consumables Supply";
  if (t.includes("hard disk") || t.includes("ssd") || t.includes("hdd"))          return "Storage Device Supply";
  if (t.includes("chair") || t.includes("table") || t.includes("furniture") || t.includes("almirah") || t.includes("pedestal")) return "Office Furniture Supply";
  if (t.includes("pen") || t.includes("stationery") || t.includes("planner"))     return "Office Stationery Supply";
  if (t.includes("chain saw") || t.includes("brush cutter") || t.includes("trimmer")) return "Grounds & Maintenance Equipment";
  if (t.includes("skipping") || t.includes("fitness"))                             return "Sports & Fitness Equipment";
  return "IT Infrastructure Supply";
}

/** Build a single verbose description for all solutions in a merged card */
function buildDescription(titles: string[], org: string): string {
  const dept = org || "the department";
  if (titles.length === 1) {
    return descriptionFor(titles[0], dept);
  }
  // Multi-solution: list them out in one paragraph
  const listed = titles.slice(0, -1).join(", ") + " and " + titles[titles.length - 1];
  return `Executed a comprehensive IT procurement engagement for ${dept}, covering ${listed}. Each component was sourced, configured, and commissioned to meet government-grade quality and compliance standards.`;
}

function descriptionFor(title: string, dept: string): string {
  const d: Record<string, string> = {
    "Laptop Procurement & Deployment":       `Supplied and commissioned laptops with pre-configured operating systems, security policies, and warranty support for day-to-day operations at ${dept}.`,
    "All-in-One Desktop Supply":             `Delivered all-in-one desktop systems with integrated displays, enabling compact and efficient workstation setups across ${dept}.`,
    "Desktop Computer Infrastructure":       `Procured and deployed desktop computers with licensed operating systems and productivity software, supporting administrative IT modernisation at ${dept}.`,
    "Professional Workstation Deployment":   `Supplied high-performance workstations configured for compute-intensive tasks, including data analysis and technical applications at ${dept}.`,
    "Server Infrastructure Setup":           `Installed and commissioned enterprise servers to host applications, databases, and internal services with high-availability configurations for ${dept}.`,
    "Enterprise Storage Solution":           `Deployed scalable storage systems to centralise and secure data at ${dept}, enabling faster access, redundancy, and long-term data retention.`,
    "Network Infrastructure Deployment":     `Supplied and configured networking equipment — including managed switches and access points — establishing a reliable, high-speed internal network for ${dept}.`,
    "Cybersecurity Solution":                `Deployed cybersecurity tools covering application security testing, threat detection, and policy enforcement to protect critical digital assets at ${dept}.`,
    "Endpoint Security Deployment":          `Rolled out endpoint protection software across devices at ${dept} to safeguard against malware, ransomware, and unauthorised access.`,
    "Multifunction Printer Solution":        `Supplied and installed multifunction laser printers with print, scan, copy, and fax capabilities, supporting document-heavy administrative workflows at ${dept}.`,
    "Printing Solution Supply":              `Procured and deployed laser printers configured for high-volume government document printing with OEM warranty support at ${dept}.`,
    "Document Scanning Solution":            `Deployed high-speed document scanners to digitise paper records, supporting paperless office and digital archiving initiatives at ${dept}.`,
    "Projection & Presentation Solution":    `Supplied and installed multimedia projectors for conference rooms, training halls, and briefing rooms within ${dept}.`,
    "Display & Visual Solution":             `Delivered professional-grade monitors and display systems to enhance visibility and ergonomics at workstations and control rooms in ${dept}.`,
    "Imaging & Surveillance Equipment":      `Supplied digital cameras and imaging equipment for documentation, field operations, and surveillance activities across ${dept}.`,
    "Productivity Software Licensing":       `Procured and deployed enterprise office suite licences, enabling staff at ${dept} with word processing, spreadsheets, presentations, and collaboration tools.`,
    "Software Licensing & Deployment":       `Managed procurement and deployment of software licences for ${dept}, ensuring compliance, activation, and ongoing support coverage.`,
    "Climate Control Equipment":             `Supplied and commissioned split air conditioning units to maintain optimal temperature and environmental conditions in offices and server rooms at ${dept}.`,
    "Video Conferencing Solution":           `Installed video conferencing systems enabling seamless remote meetings, inter-departmental coordination, and virtual briefings for ${dept}.`,
    "Mobile Device Procurement":             `Procured mobile devices for field personnel and senior officials at ${dept}, enabling secure communication and access to government applications on the move.`,
    "Data Centre Rack Infrastructure":       `Supplied and installed server racks and enclosures to organise and secure IT hardware within the data centre at ${dept}.`,
    "Digital Office Transformation":         `Executed an end-to-end digital office transformation for ${dept}, encompassing hardware, software, networking, and implementation services to modernise administrative systems.`,
    "Facility Equipment Supply":             `Supplied water dispensers and facility equipment to support the daily operational needs of staff at ${dept}.`,
    "Printing Consumables Supply":           `Procured and delivered printing consumables including inks, toners, and cartridges to maintain uninterrupted printing operations at ${dept}.`,
    "Storage Device Supply":                 `Supplied solid-state and hard disk drives for data storage expansion, backup, and replacement across computing infrastructure at ${dept}.`,
    "Office Furniture Supply":               `Procured and delivered ergonomic office furniture including workstations, chairs, and storage units to improve the working environment at ${dept}.`,
    "Office Stationery Supply":              `Supplied stationery items including pens, planners, and writing materials to support day-to-day administrative functions at ${dept}.`,
    "Grounds & Maintenance Equipment":       `Supplied professional-grade maintenance equipment including brush cutters and chain saws for upkeep of campuses and establishments under ${dept}.`,
    "Sports & Fitness Equipment":            `Procured sports and physical training equipment to support fitness and wellness programmes at ${dept}.`,
    "IT Infrastructure Supply":              `Delivered government-grade IT infrastructure and equipment to enhance operational efficiency, digital connectivity, and service delivery at ${dept}.`,
  };
  return d[title] ?? `Delivered ${title.toLowerCase()} for ${dept}, meeting government-grade quality and compliance standards.`;
}

/* ── component ───────────────────────────────────────────────── */

interface Props {
  projects: MergedProject[];
}

export default function ProjectsContent({ projects }: Props) {
  const sectors = useMemo(() => {
    const set = new Set(projects.map(sectorOf));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const [activeSector, setActiveSector] = useState("All");

  const filtered = useMemo(
    () =>
      activeSector === "All"
        ? projects
        : projects.filter((p) => sectorOf(p) === activeSector),
    [projects, activeSector]
  );

  const uniqueOrgs = useMemo(
    () => new Set(projects.map((p) => p.organisation || p.ministry)).size,
    [projects]
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
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
              Our Work · FY 2023–26
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white font-[var(--font-plus-jakarta)]">
              Key Projects
            </h1>
            <p className="mt-5 text-white/60 text-lg max-w-2xl">
              A track record of successful IT deployments across government
              departments, defence, municipal bodies, and public enterprises.
            </p>

            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: projects.length + "+", label: "Projects Delivered"  },
                { value: uniqueOrgs + "+",       label: "Government Clients"  },
                { value: String(sectors.length - 1), label: "Sectors Served" },
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

      {/* ── Projects Grid ────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Sector filter pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSector(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  s === activeSector
                    ? "bg-[#0057FF] text-white border-[#0057FF]"
                    : "bg-white text-[#0A1F44]/60 border-gray-200 hover:border-[#0057FF] hover:text-[#0057FF]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const sector = sectorOf(project);
              const sectorColor = SECTOR_COLORS[sector] ?? "bg-gray-100 text-gray-600";
              const dept = project.organisation || project.ministry;

              // Derive unique solution titles from all items in this merged project
              const solutionTitles = Array.from(
                new Set(project.items.map(solutionTitleOf))
              );

              // Primary title: first (or only) solution
              const primaryTitle = solutionTitles[0] ?? "IT Infrastructure Supply";

              // Verbose description
              const description = buildDescription(solutionTitles, dept);

              return (
                <motion.div
                  key={dept + project.monthYear}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 9) * 0.06 }}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#0057FF]/30 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 flex flex-col"
                >
                  {/* Sector badge + month */}
                  <div className="flex items-start justify-between mb-5">
                    <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${sectorColor}`}>
                      {sector}
                    </span>
                    <span className="text-xs text-[#0A1F44]/40">
                      {project.monthYear}
                    </span>
                  </div>

                  {/* Primary solution title */}
                  <h3 className="font-bold text-[#0A1F44] text-lg mb-3 font-[var(--font-plus-jakarta)] leading-snug">
                    {primaryTitle}
                  </h3>

                  {/* Additional solution tags (if merged) */}
                  {solutionTitles.length > 1 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {solutionTitles.slice(1).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#0057FF]/8 text-[#0057FF]"
                        >
                          + {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-[#0A1F44]/60 leading-relaxed mb-5 flex-1">
                    {description}
                  </p>

                  {/* Department */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-[#0057FF] font-semibold uppercase tracking-wide">
                      {dept}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#0A1F44]/40 py-16">
              No projects found for this sector.
            </p>
          )}
        </div>
      </section>
    </>
  );
}