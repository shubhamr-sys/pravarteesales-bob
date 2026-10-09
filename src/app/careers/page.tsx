import type { Metadata } from "next";
import CareersContent, { JobOpening } from "./CareersContent";
import { sql, ensureJobsTable } from "@/lib/db";

export const metadata: Metadata = {
  title: "Careers | Pravartee Sales",
  description:
    "Join Pravartee Sales and help build the digital infrastructure of India's government. View open positions in sales, engineering, finance, and more.",
};

/* Seed the original 5 openings on first load if table is empty */
const SEED_JOBS = [
  {
    title: "Business Development Executive",
    department: "Sales & Business Development",
    location: "Noida, UP",
    type: "Full-time",
    experience: "1–3 years",
    description: "Drive new business opportunities across government and public sector accounts. You will identify leads, prepare proposals, represent Pravartee Sales at GEM portals and government procurement events, and build long-term client relationships.",
    responsibilities: ["Identify and pursue new government accounts through GEM, tenders, and direct outreach","Prepare and present proposals, quotations, and technical bids","Maintain and grow relationships with existing clients","Coordinate with technical and delivery teams to ensure successful project handoffs","Meet and exceed monthly and quarterly revenue targets"],
    requirements: ["1–3 years of B2G or B2B sales experience, preferably in IT hardware or solutions","Familiarity with Government e-Marketplace (GEM) portal is a strong plus","Strong communication and negotiation skills","Proficiency in MS Office; CRM experience is a bonus","Self-motivated, target-driven, and comfortable working independently"],
  },
  {
    title: "Network Engineer",
    department: "Engineering & Delivery",
    location: "Noida, UP",
    type: "Full-time",
    experience: "2–5 years",
    description: "Design, deploy, and support enterprise network infrastructure for government clients. You will work hands-on with switches, routers, firewalls, and wireless systems — ensuring high availability and security for mission-critical government networks.",
    responsibilities: ["Design and implement LAN, WAN, and wireless network solutions for government sites","Configure and manage switches, routers, firewalls (Cisco, Fortinet, HP Aruba)","Perform network audits, capacity planning, and performance optimisation","Respond to and resolve network incidents and escalations","Prepare technical documentation, network diagrams, and handover reports"],
    requirements: ["2–5 years of hands-on network engineering experience","Proficiency with Cisco IOS, FortiOS, or HP Comware","CCNA/CCNP or equivalent certification preferred","Experience with government or defence network environments is a plus","Strong troubleshooting skills and ability to work on-site at client locations"],
  },
  {
    title: "GeM & Tender Specialist",
    department: "Procurement & Compliance",
    location: "Noida, UP",
    type: "Full-time",
    experience: "1–4 years",
    description: "Manage end-to-end participation in Government e-Marketplace (GEM) bids and government tenders. You will ensure timely, accurate, and competitive bid submissions while staying compliant with all government procurement regulations.",
    responsibilities: ["Monitor and track GEM portal for relevant bids, tenders, and opportunities","Prepare and submit accurate bid documents, price bids, and technical bids","Coordinate with OEM partners for authorisation letters and compliance documents","Maintain bid calendar and ensure zero missed deadlines","Liaise with clients and buyers for clarifications and order processing"],
    requirements: ["1–4 years of experience specifically with GEM portal or government tendering","Strong attention to detail and ability to manage multiple bids simultaneously","Knowledge of GeM policies, L1 bidding, and government procurement rules","Proficiency in MS Excel, Word, and PDF document handling","Good written communication for preparing bid narratives and compliance statements"],
  },
  {
    title: "IT Support & Field Engineer",
    department: "Engineering & Delivery",
    location: "Noida / Delhi NCR (Field)",
    type: "Full-time",
    experience: "1–3 years",
    description: "Provide on-site and remote IT support to government clients across Delhi NCR. You will handle hardware installation, configuration, troubleshooting, and maintenance for desktops, laptops, printers, servers, and networking equipment.",
    responsibilities: ["Install, configure, and commission IT equipment at government client sites","Provide first- and second-level support for hardware, software, and network issues","Maintain asset registers and update service records","Coordinate with OEM service centres for warranty repairs and replacements","Travel to client sites as required within Delhi NCR"],
    requirements: ["1–3 years of IT support or field engineering experience","Hands-on experience with Windows OS, MS Office, and basic networking","Ability to handle physical hardware installation and cabling","Good communication and professional conduct at client government premises","Valid driver's licence or willingness to commute across NCR"],
  },
  {
    title: "Accounts Executive",
    department: "Finance & Accounts",
    location: "Noida, UP",
    type: "Full-time",
    experience: "1–3 years",
    description: "Handle day-to-day financial operations including invoicing, GST compliance, vendor payments, and reconciliation. You will work closely with the sales and procurement teams to ensure accurate and timely financial records.",
    responsibilities: ["Raise invoices, process purchase orders, and manage accounts receivable/payable","Prepare and file GST returns and maintain tax compliance records","Perform monthly bank reconciliations and ledger entries in Tally","Assist in preparation of MIS reports and financial summaries for management","Coordinate with vendors, clients, and the CA for audit requirements"],
    requirements: ["1–3 years of accounting experience, preferably in a trading or IT company","Proficiency in Tally ERP and MS Excel","Working knowledge of GST, TDS, and basic accounting principles","High accuracy and attention to detail in financial data entry","B.Com or equivalent degree in Accounting/Finance"],
  },
];

async function getOpenings(): Promise<JobOpening[]> {
  try {
    await ensureJobsTable();
    const count = await sql`SELECT COUNT(*) AS c FROM job_openings`;
    if (Number(count[0].c) === 0) {
      for (const j of SEED_JOBS) {
        await sql`
          INSERT INTO job_openings (title, department, location, type, experience, description, responsibilities, requirements)
          VALUES (${j.title}, ${j.department}, ${j.location}, ${j.type}, ${j.experience}, ${j.description},
                  ${JSON.stringify(j.responsibilities)}::jsonb, ${JSON.stringify(j.requirements)}::jsonb)
        `;
      }
    }
    const rows = await sql`
      SELECT id, title, department, location, type, experience, description, responsibilities, requirements
      FROM job_openings WHERE active = TRUE ORDER BY created_at DESC
    `;
    return rows as JobOpening[];
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const openings = await getOpenings();
  return <CareersContent openings={openings} />;
}
