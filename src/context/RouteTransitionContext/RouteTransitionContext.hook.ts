import { useContext } from 'react';
import { RouteTransitionContext } from './RouteTransitionContext';

export const useRouteTransitionContext = () => {
  const routeTransitionContext = useContext(RouteTransitionContext);

  if (!routeTransitionContext) {
    throw new Error(
      'useRouteTransitionContext must be used within the scope of RouteTransitionContextProvider',
    );
  }

  return routeTransitionContext;
};
