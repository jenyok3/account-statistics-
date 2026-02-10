import { z } from 'zod';
import { users } from './schema';

export const api = {
  stats: {
    get: {
      method: 'GET' as const,
      path: '/api/stats' as const,
      responses: {
        200: z.object({
          total: z.number(),
          active: z.number(),
          blocked: z.number(),
        }),
      },
    },
  },
};
