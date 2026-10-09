import { NextRequest, NextResponse } from "next/server";
import { sql, ensureJobsTable } from "@/lib/db";

function isAuthed(req: NextRequest) {
  const cookie = req.cookies.get("admin_session")?.value;
  return cookie && cookie === process.env.ADMIN_PASSWORD;
}

/* GET /api/admin/jobs — list all jobs (admin) */
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  await ensureJobsTable();
  const rows = await sql`
    SELECT * FROM job_openings ORDER BY created_at DESC
  `;
  return NextResponse.json({ jobs: rows });
}

/* POST /api/admin/jobs — create a new job */
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await req.json();
  const { title, department, location, type, experience, description, responsibilities, requirements } = body;

  if (!title || !department) {
    return NextResponse.json({ error: "title and department are required." }, { status: 400 });
  }

  await ensureJobsTable();
  const rows = await sql`
    INSERT INTO job_openings (title, department, location, type, experience, description, responsibilities, requirements)
    VALUES (
      ${title},
      ${department},
      ${location ?? "Noida, UP"},
      ${type ?? "Full-time"},
      ${experience ?? ""},
      ${description ?? ""},
      ${JSON.stringify(responsibilities ?? [])}::jsonb,
      ${JSON.stringify(requirements ?? [])}::jsonb
    )
    RETURNING *
  `;
  return NextResponse.json({ job: rows[0] }, { status: 201 });
}
