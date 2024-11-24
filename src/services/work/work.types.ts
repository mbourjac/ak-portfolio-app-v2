import type { z } from 'zod';
import type { homeCoverSchema, workProjectSchema } from './work.schemas';

export type HomeCover = z.infer<typeof homeCoverSchema>;
export type WorkProject = z.infer<typeof workProjectSchema>;
