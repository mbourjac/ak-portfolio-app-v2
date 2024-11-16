import type { QueryClient } from '@tanstack/react-query';
import type { useInformationService } from '../services/information/information.service';

export type RouterContext = {
  queryClient: QueryClient;
  informationService: ReturnType<typeof useInformationService>;
};

export const routerContext: RouterContext = {
  queryClient: undefined!,
  informationService: undefined!,
};
