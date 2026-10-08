import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set.");
    }
    _sql = neon(process.env.DATABASE_URL);
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