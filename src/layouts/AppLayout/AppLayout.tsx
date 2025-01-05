import { useState, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Outlet, useLocation, useRouteContext } from '@tanstack/react-router';
import { Seo } from '../../components/Seo';
import { LoaderContextProvider } from '../../context/LoaderContext/LoaderContextProvider';
import { ModalContext } from '../../context/ModalContext/ModalContext';
import { RouteTransitionContextProvider } from '../../context/RouteTransitionContext/RouteTransitionContextProvider';
import { Header } from './Header';

export const AppLayout = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const getSeoQuery = useRouteContext({
    from: '/_layout',
    select: (context) => context.getSeoQuery,
  });
  const { data: seo } = useSuspenseQuery(getSeoQuery);

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  useEffect(() => {
    setIsAboutModalOpen(false);
  }, [pathname]);

  return (
    <LoaderContextProvider>
      <RouteTransitionContextProvider>
        <Seo {...seo} />
        <Header
          isAboutModalOpen={isAboutModalOpen}
          setIsAboutModalOpen={setIsAboutModalOpen}
        />
        <ModalContext.Provider value={{ isOpen: isAboutModalOpen }}>
          <Outlet />
        </ModalContext.Provider>
      </RouteTransitionContextProvider>
    </LoaderContextProvider>
  );
};
