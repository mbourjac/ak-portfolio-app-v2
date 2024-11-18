import type { QueryClient } from '@tanstack/react-query';
import type { useInformationService } from '../services/information/information.service';
import type { useProjectService } from '../services/project/project.service';
import type { useWorkService } from '../services/work/work.service';

export type RouterContext = {
  queryClient: QueryClient;
  informationService: ReturnType<typeof useInformationService>;
  workService: ReturnType<typeof useWorkService>;
  projectService: ReturnType<typeof useProjectService>;
};

export const routerContext: RouterContext = {
  queryClient: undefined!,
  informationService: undefined!,
  workService: undefined!,
  projectService: undefined!,
};
