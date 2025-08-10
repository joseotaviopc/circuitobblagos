import { safeEnv } from "@/utils/env";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const turso = createClient({
  url: safeEnv.TURSO_DATABASE_URL,
  authToken: safeEnv.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);