import { z } from 'zod';

export const informationSchema = z.object({
  bio: z.string(),
  email: z.string(),
  instagram: z.object({
    label: z.string(),
    link: z.string(),
  }),
  copyright: z.string(),
});
