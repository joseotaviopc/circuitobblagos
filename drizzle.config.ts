import { safeEnv } from "@/utils/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: safeEnv.TURSO_DATABASE_URL,
    authToken: safeEnv.TURSO_AUTH_TOKEN,
  },
} satisfies Config;