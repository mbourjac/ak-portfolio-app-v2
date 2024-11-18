import { queryOptions } from '@tanstack/react-query';
import type { ProjectRepository } from './project.repository';
import { projectSchema } from './project.schemas';

export const useProjectService = (projectRepository: ProjectRepository) => {
  const getProjectQueryOptions = (slug: string) =>
    queryOptions({
      queryKey: ['projects', { slug }],
      queryFn: async () => {
        const projects = await projectRepository.getProjectBySlug(slug);
        return projectSchema.parse(projects);
      },
    });

  return {
    getProjectQueryOptions,
  };
};
