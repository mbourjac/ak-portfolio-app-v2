import { queryOptions } from '@tanstack/react-query';
import type { SeoRepository } from './seo.repository';
import { seoSchema } from './seo.schemas';

export const useSeoService = (seoRepository: SeoRepository) => {
  const getSeoQueryOptions = () =>
    queryOptions({
      queryKey: ['seo'],
      queryFn: async () => {
        const seo = await seoRepository.getSeo();
        return seoSchema.parse(seo);
      },
    });

  return {
    getSeoQueryOptions,
  };
};
