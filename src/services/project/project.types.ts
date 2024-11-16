import type { z } from 'zod';
import type { baseProjectSchema } from './project.schemas';

export type BaseProject = z.infer<typeof baseProjectSchema>;
