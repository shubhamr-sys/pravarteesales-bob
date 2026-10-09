import { NextRequest, NextResponse } from "next/server";
import { sql, ensureJobsTable } from "@/lib/db";

function isAuthed(req: NextRequest) {
  const cookie = req.cookies.get("admin_session")?.value;
  return cookie && cookie === process.env.ADMIN_PASSWORD;
}

/* PATCH /api/admin/jobs/[id] — update or toggle active */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const { title, department, location, type, experience, description, responsibilities, requirements, active } = body;

  await ensureJobsTable();
  const rows = await sql`
    UPDATE job_openings SET
      title            = COALESCE(${title ?? null},            title),
      department       = COALESCE(${department ?? null},       department),
      location         = COALESCE(${location ?? null},         location),
      type             = COALESCE(${type ?? null},             type),
      experience       = COALESCE(${experience ?? null},       experience),
      description      = COALESCE(${description ?? null},      description),
      responsibilities = COALESCE(${responsibilities != null ? JSON.stringify(responsibilities) : null}::jsonb, responsibilities),
      requirements     = COALESCE(${requirements != null ? JSON.stringify(requirements) : null}::jsonb,     requirements),
      active           = COALESCE(${active ?? null},           active)
    WHERE id = ${id}
    RETURNING *
  `;
  if (!rows.length) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ job: rows[0] });
}

/* DELETE /api/admin/jobs/[id] — permanently remove */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  await ensureJobsTable();
  await sql`DELETE FROM job_openings WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
