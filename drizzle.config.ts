import { defineConfig } from "drizzle-kit";
import "./envConfig.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_NEON_DATABASE_URL!,
  },
});
