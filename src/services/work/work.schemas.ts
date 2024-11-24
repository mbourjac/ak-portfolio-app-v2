import { z } from 'zod';
import { baseProjectSchema } from '../project/project.schemas';

const coverPositionSchema = z.object({
  top: z.number(),
  left: z.number(),
  zIndex: z.number(),
});

export const homeCoverSchema = z.object({
  desktopUrl: z.string(),
  mobileUrl: z.string(),
  videoFilename: z.string().optional(),
  desktopPosition: coverPositionSchema,
  mobilePosition: coverPositionSchema,
  size: z.object({
    desktopWidth: z.number(),
    mobileWidth: z.number(),
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

export const workProjectSchema = baseProjectSchema.extend({
  cover: z.object({
    mobileUrl: z.string(),
    desktopUrl: z.string(),
    size: z.object({
      height: z.number(),
      aspectRatio: z.number(),
    }),
  }),
});

export const workSchema = z.object({
  projects: z.array(workProjectSchema),
});
