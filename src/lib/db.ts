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