export * from './lib/contract';
import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  website: z.string().url(),
  location: z.string(),
  facebookUrl: z.string().url(),
  instagramUrl: z.string().url(),
  timetable: z.string(),
  categoryId: z.string(),
});

export type Business = z.infer<typeof BusinessSchema>;
