import { createRouter } from '@tanstack/react-router';
import { routerContext } from './router.context';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  defaultPreloadStaleTime: 0,
  context: routerContext,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
