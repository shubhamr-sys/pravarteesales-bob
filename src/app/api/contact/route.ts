import { NextRequest, NextResponse } from "next/server";
import { sql, ensureTable } from "@/lib/db";

/* ------------------------------------------------------------------ */
/*  POST /api/contact  — submit a contact query                        */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organisation, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "name, email and message are required." },
        { status: 400 }
      );
    }

    await ensureTable();

    await sql`
      INSERT INTO contact_queries (name, email, organisation, service, message)
      VALUES (${name}, ${email}, ${organisation ?? null}, ${service ?? null}, ${message})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

/* ------------------------------------------------------------------ */
/*  GET /api/contact  — list all queries (admin only)                  */
/*  Requires header:  x-admin-secret: <CONTACT_ADMIN_SECRET>           */
/* ------------------------------------------------------------------ */
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.CONTACT_ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await ensureTable();

    const rows = await sql`
      SELECT id, name, email, organisation, service, message, created_at
      FROM contact_queries
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ queries: rows }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/contact]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
