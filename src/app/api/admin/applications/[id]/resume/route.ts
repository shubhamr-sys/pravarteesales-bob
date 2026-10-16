import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureApplicationsTable } from "@/lib/db";

function isAuthed(req: NextRequest) {
  const cookie = req.cookies.get("admin_session")?.value;
  return cookie && cookie === process.env.ADMIN_PASSWORD;
}

/* GET /api/admin/applications/[id]/resume — download resume from Vercel Blob */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const { id } = await params;
    await ensureApplicationsTable();
    const rows = await sql`
      SELECT resume_filename, resume_mime, resume_pathname, resume_url
      FROM job_applications
      WHERE id = ${id}
      LIMIT 1
    `;
    if (!rows.length) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const row = rows[0] as {
      resume_filename: string;
      resume_mime: string;
      resume_pathname: string;
      resume_url: string;
    };

    const pathname = row.resume_pathname?.trim();
    if (!pathname) {
      return NextResponse.json(
        { error: "Resume file is not available for this application." },
        { status: 404 }
      );
    }

    const result = await get(pathname, {
      access: "private",
      ...(process.env.BLOB_READ_WRITE_TOKEN
        ? { token: process.env.BLOB_READ_WRITE_TOKEN }
        : {}),
    });

    if (!result || result.statusCode !== 200) {
      return NextResponse.json({ error: "Resume file not found in storage." }, { status: 404 });
    }

    const filename = row.resume_filename || `resume-${id}.pdf`;

    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type": result.blob.contentType || row.resume_mime || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/applications/[id]/resume]", err);
    return NextResponse.json({ error: "Could not download resume." }, { status: 500 });
  }
}
