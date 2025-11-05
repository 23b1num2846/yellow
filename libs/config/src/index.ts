export * from './lib/config';
import { config } from "dotenv";
import { z } from "zod";


config(); 

const EnvSchema = z.object({
  DATABASE_URL: z.string().url({
    message: "DATABASE_URL is missing or not a valid URL",
  }),
  PORT: z.string().default("5050"),
  JWT_SECRET: z.string().optional(), 
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
   AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

export const env = EnvSchema.parse(process.env);
