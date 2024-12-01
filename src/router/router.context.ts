import type { QueryClient } from '@tanstack/react-query';
import type { useInformationService } from '../services/information/information.service';
import type { useProjectService } from '../services/project/project.service';
import type { useSeoService } from '../services/seo/seo.service';
import type { useWorkService } from '../services/work/work.service';

export type RouterContext = {
  queryClient: QueryClient;
  informationService: ReturnType<typeof useInformationService>;
  workService: ReturnType<typeof useWorkService>;
  projectService: ReturnType<typeof useProjectService>;
  seoService: ReturnType<typeof useSeoService>;
};

export const routerContext: RouterContext = {
  queryClient: undefined!,
  informationService: undefined!,
  workService: undefined!,
  projectService: undefined!,
  seoService: undefined!,
};
