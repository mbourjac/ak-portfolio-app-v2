import { queryOptions } from '@tanstack/react-query';
import type { WorkRepository } from './work.repository';
import { homeWorkSchema } from './work.schemas';

export const useWorkService = (workRepository: WorkRepository) => {
  const getHomeWorkQueryOptions = () =>
    queryOptions({
      queryKey: ['home', 'work'],
      queryFn: async () => {
        const projects = await workRepository.getHomeWork();
        return homeWorkSchema.parse(projects);
      },
    });

  return {
    getHomeWorkQueryOptions,
  };
};
