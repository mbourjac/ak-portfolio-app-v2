import { z } from 'zod';

export const baseProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  medium: z.string(),
});

export const projectImageSchema = z.object({
  imageUrl: z.string(),
  alt: z.string().optional(),
  aspectRatio: z.number(),
});

export const projectSchema = baseProjectSchema.extend({
  description: z.string(),
  images: z.array(projectImageSchema),
});
