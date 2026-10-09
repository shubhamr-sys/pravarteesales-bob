import { NextResponse } from "next/server";
import { sql, ensureJobsTable } from "@/lib/db";

/* GET /api/jobs — public list of active job openings */
export async function GET() {
  await ensureJobsTable();
  const rows = await sql`
    SELECT id, title, department, location, type, experience, description, responsibilities, requirements
    FROM job_openings
    WHERE active = TRUE
    ORDER BY created_at DESC
  `;
  return NextResponse.json({ jobs: rows });
}
