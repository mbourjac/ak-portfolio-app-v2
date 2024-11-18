import { createFileRoute } from '@tanstack/react-router';
import { Project } from '../../../pages/Project/Project';

export const Route = createFileRoute('/_layout/work/$projectSlug')({
  component: Project,
  beforeLoad: ({ context: { projectService }, params: { projectSlug } }) => {
    return {
      getProjectQuery: projectService.getProjectQueryOptions(projectSlug),
    };
  },
  loader: async ({ context: { queryClient, getProjectQuery } }) => {
    await queryClient.ensureQueryData(getProjectQuery);
  },
});
