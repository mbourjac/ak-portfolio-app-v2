import type { z } from 'zod';
import type { seoSchema } from './seo.schemas';

export type Seo = z.infer<typeof seoSchema>;
