import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
    if (!url) {
      throw new Error(
        "No database connection string found. Set DATABASE_URL or POSTGRES_URL."
      );
    }
    _sql = neon(url);
  }
  return _sql;
}

export function sql(...args: Parameters<NeonQueryFunction<false, false>>) {
  return getClient()(...args);
}

export async function ensureTable() {
  const client = getClient();
  await client`
    CREATE TABLE IF NOT EXISTS contact_queries (
      id           SERIAL PRIMARY KEY,
      name         TEXT        NOT NULL,
      email        TEXT        NOT NULL,
      organisation TEXT,
      service      TEXT,
      message      TEXT        NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function ensureJobsTable() {
  const client = getClient();
  await client`
    CREATE TABLE IF NOT EXISTS job_openings (
      id               SERIAL PRIMARY KEY,
      title            TEXT        NOT NULL,
      department       TEXT        NOT NULL,
      location         TEXT        NOT NULL DEFAULT 'Noida, UP',
      type             TEXT        NOT NULL DEFAULT 'Full-time',
      experience       TEXT        NOT NULL DEFAULT '',
      description      TEXT        NOT NULL DEFAULT '',
      responsibilities JSONB       NOT NULL DEFAULT '[]',
      requirements     JSONB       NOT NULL DEFAULT '[]',
      active           BOOLEAN     NOT NULL DEFAULT TRUE,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}