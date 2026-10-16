import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureApplicationsTable } from "@/lib/db";

const MAX_RESUME_BYTES = 4 * 1024 * 1024; // 4 MB (under typical serverless body limits)
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXT = /\.(pdf|doc|docx)$/i;

function safeFilename(name: string) {
  const cleaned = name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 100);
  return cleaned || "resume.pdf";
}

/* POST /api/applications — public job application with resume upload to Vercel Blob */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const linkedin = String(form.get("linkedin") ?? "").trim();
    const coverLetter = String(form.get("cover_letter") ?? "").trim();
    const jobTitle = String(form.get("job_title") ?? "").trim();
    const jobIdRaw = form.get("job_id");
    const resume = form.get("resume");

    if (!name || !email || !jobTitle) {
      return NextResponse.json(
        { error: "name, email and job title are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ error: "Please upload your resume." }, { status: 400 });
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume must be 4 MB or smaller." }, { status: 400 });
    }

    const mime = resume.type || "application/octet-stream";
    if (!ALLOWED_MIME.has(mime) && !ALLOWED_EXT.test(resume.name)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document (.pdf, .doc, .docx)." },
        { status: 400 }
      );
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
      console.error("[POST /api/applications] Missing Blob credentials (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID)");
      return NextResponse.json(
        { error: "Resume storage is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const filename = safeFilename(resume.name);
    const pathname = `resumes/${Date.now()}-${filename}`;
    const blob = await put(pathname, resume, {
      access: "private",
      addRandomSuffix: false,
      contentType: mime,
      ...(process.env.BLOB_READ_WRITE_TOKEN
        ? { token: process.env.BLOB_READ_WRITE_TOKEN }
        : {}),
    });

    const jobId =
      jobIdRaw != null && String(jobIdRaw).trim() !== ""
        ? Number(jobIdRaw)
        : null;

    await ensureApplicationsTable();
    const rows = await sql`
      INSERT INTO job_applications (
        job_id, job_title, name, email, phone, linkedin, cover_letter,
        resume_filename, resume_mime, resume_url, resume_pathname
      )
      VALUES (
        ${Number.isFinite(jobId) ? jobId : null},
        ${jobTitle},
        ${name},
        ${email},
        ${phone},
        ${linkedin},
        ${coverLetter},
        ${resume.name.slice(0, 255)},
        ${mime},
        ${blob.url},
        ${blob.pathname}
      )
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: rows[0]?.id }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/applications]", err);
    return NextResponse.json({ error: "Could not submit application. Please try again." }, { status: 500 });
  }
}
