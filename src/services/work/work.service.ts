import { queryOptions } from '@tanstack/react-query';
import type { WorkRepository } from './work.repository';
import { homeWorkSchema, workSchema } from './work.schemas';

export const useWorkService = (workRepository: WorkRepository) => {
  const getHomeWorkQueryOptions = () =>
    queryOptions({
      queryKey: ['home', 'work'],
      queryFn: async () => {
        const projects = await workRepository.getHomeWork();
        return homeWorkSchema.parse(projects);
      },
    });

  const getWorkQueryOptions = () =>
    queryOptions({
      queryKey: ['work'],
      queryFn: async () => {
        const projects = await workRepository.getWork();
        return workSchema.parse(projects);
      },
    });

  return {
    getHomeWorkQueryOptions,
    getWorkQueryOptions,
  };
};
