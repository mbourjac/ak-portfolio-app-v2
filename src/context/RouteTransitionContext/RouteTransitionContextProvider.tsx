import { useState } from 'react';
import type { ReactNode } from '@tanstack/react-router';
import { RouteTransitionContext } from './RouteTransitionContext';

type RouteTransitionContextProviderProps = {
  children: ReactNode;
};

export const RouteTransitionContextProvider = ({
  children,
}: RouteTransitionContextProviderProps) => {
  const [isRouteTransition, setIsRouteTransition] = useState(false);

  return (
    <RouteTransitionContext.Provider
      value={{
        isRouteTransition,
        setIsRouteTransition,
      }}
    >
      {children}
    </RouteTransitionContext.Provider>
  );
};
