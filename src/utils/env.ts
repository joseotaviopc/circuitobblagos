import z from "zod";

const env = z.object({
	TURSO_DATABASE_URL: z.string(),
	TURSO_AUTH_TOKEN: z.string(),
});

export const safeEnv = env.parse(process.env);
