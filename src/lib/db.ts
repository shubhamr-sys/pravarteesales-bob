import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

export const sql = neon(process.env.DATABASE_URL);

/**
 * Ensures the contact_queries table exists.
 * Called once at server startup via the API routes.
 */
export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_queries (
      id          SERIAL PRIMARY KEY,
      name        TEXT        NOT NULL,
      email       TEXT        NOT NULL,
      organisation TEXT,
      service     TEXT,
      message     TEXT        NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}
