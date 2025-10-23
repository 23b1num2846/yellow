export * from './lib/config';
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url({
    message: "DATABASE_URL is missing or not a valid URL",
  }),
  PORT: z.string().default("5050"),
  JWT_SECRET: z.string().optional(), 
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const env = EnvSchema.parse(process.env);
