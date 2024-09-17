import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

if (!process.env.NEON_DATABASE_URL) {
  throw new Error("Neon database connection string is not found.");
}

const sql = neon(process.env.NEON_DATABASE_URL);

export const db = drizzle(sql);
