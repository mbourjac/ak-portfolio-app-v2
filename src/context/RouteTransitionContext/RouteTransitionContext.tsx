import { createContext } from 'react';

type RouteTransitionContextProps = {
  isRouteTransition: boolean;
  setIsRouteTransition: (isTransition: boolean) => void;
};

export const RouteTransitionContext =
  createContext<RouteTransitionContextProps | null>(null);
