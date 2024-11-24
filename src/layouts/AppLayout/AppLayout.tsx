import { useState, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Outlet, useLocation, useRouteContext } from '@tanstack/react-router';
import { ModalContext } from '../../context/modal-context';
import { cn } from '../../lib/tailwind.utils';
import { AboutModal } from './AboutModal';
import { Header } from './Header';

export const AppLayout = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const getInformationQuery = useRouteContext({
    from: '/_layout',
    select: (context) => context.getInformationQuery,
  });
  const { data: information } = useSuspenseQuery(getInformationQuery);

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const isReducedLogo = isAboutModalOpen ? false : pathname.includes('work');

  const toggleAboutModal = () => {
    setIsAboutModalOpen((prevIsAboutModalOpen) => !prevIsAboutModalOpen);
  };

  useEffect(() => {
    setIsAboutModalOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed z-50 flex w-full flex-col gap-8',
          isAboutModalOpen &&
            'h-dvh bg-secondary/75 backdrop-blur-md md:h-auto',
        )}
      >
        <Header
          isReducedLogo={isReducedLogo}
          toggleAboutModal={toggleAboutModal}
        />
        {isAboutModalOpen && (
          <AboutModal
            {...information}
            isOpen={isAboutModalOpen}
            setIsOpen={setIsAboutModalOpen}
          />
        )}
      </div>
      <ModalContext.Provider value={{ isOpen: isAboutModalOpen }}>
        <Outlet />
      </ModalContext.Provider>
    </>
  );
};
