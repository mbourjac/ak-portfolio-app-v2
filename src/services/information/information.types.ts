import type { z } from 'zod';
import type { informationSchema } from './information.schemas';

export type Information = z.infer<typeof informationSchema>;
