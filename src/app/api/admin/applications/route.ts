import { NextRequest, NextResponse } from "next/server";
import { sql, ensureApplicationsTable } from "@/lib/db";

function isAuthed(req: NextRequest) {
  const cookie = req.cookies.get("admin_session")?.value;
  return cookie && cookie === process.env.ADMIN_PASSWORD;
}

/* GET /api/admin/applications — list applications (no resume payload) */
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    await ensureApplicationsTable();
    const rows = await sql`
      SELECT
        id, job_id, job_title, name, email, phone, linkedin, cover_letter,
        resume_filename, resume_mime, created_at
      FROM job_applications
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ applications: rows });
  } catch (err) {
    console.error("[GET /api/admin/applications]", err);
    return NextResponse.json({ error: "Database error. Check DATABASE_URL." }, { status: 500 });
  }
}
