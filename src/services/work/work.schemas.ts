import { z } from 'zod';
import { baseProjectSchema } from '../project/project.schemas';

export const homeCoverSchema = z.object({
  imageUrl: z.string(),
  position: z.object({
    top: z.number(),
    left: z.number(),
    zIndex: z.number(),
  }),
  size: z.object({
    width: z.number(),
    aspectRatio: z.number(),
  }),
});

export const homeWorkSchema = z.object({
  projects: z.array(
    baseProjectSchema.extend({
      cover: homeCoverSchema,
    }),
  ),
});

export const workSchema = z.object({
  projects: z.array(
    baseProjectSchema.extend({
      cover: z.object({
        imageUrl: z.string(),
        size: z.object({
          height: z.number(),
          aspectRatio: z.number(),
        }),
      }),
    }),
  ),
});
