import type { z } from 'zod';
import type { baseProjectSchema, projectSchema } from './project.schemas';

export type BaseProject = z.infer<typeof baseProjectSchema>;
export type Project = z.infer<typeof projectSchema>;
