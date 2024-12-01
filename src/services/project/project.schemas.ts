import { z } from 'zod';

export const baseProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  svgTitle: z.string(),
  slug: z.string(),
  date: z.string(),
  medium: z.string(),
});

export const projectFileSchema = z.object({
  type: z.union([z.literal('image'), z.literal('video')]),
  filename: z.string(),
  mobileUrl: z.string(),
  desktopUrl: z.string(),
  alt: z.string().optional(),
  height: z.number().optional().default(100),
  aspectRatio: z.number(),
});

export const projectSchema = baseProjectSchema.extend({
  description: z.string(),
  gallery: z.array(projectFileSchema),
});
