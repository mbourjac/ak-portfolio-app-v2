import { z } from 'zod';

export const baseProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  medium: z.string(),
  videoUrl: z.string().optional(),
});
