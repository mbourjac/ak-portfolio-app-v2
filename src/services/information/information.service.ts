import { queryOptions } from '@tanstack/react-query';
import type { InformationRepository } from './information.repository';
import { informationSchema } from './information.schemas';

export const useInformationService = (
  informationRepository: InformationRepository,
) => {
  const getInformationQueryOptions = () =>
    queryOptions({
      queryKey: ['information'],
      queryFn: async () => {
        const information = await informationRepository.getInformation();
        return informationSchema.parse(information);
      },
    });

  return {
    getInformationQueryOptions,
  };
};
