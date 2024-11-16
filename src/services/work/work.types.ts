import type { z } from 'zod';
import type { homeCoverSchema } from './work.schemas';

export type HomeCover = z.infer<typeof homeCoverSchema>;
