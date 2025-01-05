import type { Dispatch } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useLoaderContext } from '../../context/LoaderContext/LoaderContext.hook';
import { useRouteTransition } from '../../hooks/use-route-transition';
import { useSmallDevice } from '../../hooks/use-small-device';
import type { DefinedRoute } from '../../router/router.types';
import { AboutModal } from './AboutModal';
import { DesktopLogo } from './DesktopLogo';
import { MobileLogo } from './MobileLogo';

type HeaderProps = {
  isAboutModalOpen: boolean;
  setIsAboutModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({
  isAboutModalOpen,
  setIsAboutModalOpen,
}: HeaderProps) => {
  const getInformationQuery = useRouteContext({
    from: '/_layout',
    select: (context) => context.getInformationQuery,
  });
  const { data: information } = useSuspenseQuery(getInformationQuery);

  const isSmallDevice = useSmallDevice();
  const { handleNavigate, pathname } = useRouteTransition();
  const { showLoader, loaderDuration } = useLoaderContext();

  const links: { label: string; to: DefinedRoute }[] = [
    { label: 'Gallery', to: '/' },
    { label: 'Work', to: '/work' },
  ];

  const isLogoHidden = pathname === '/';

  const toggleAboutModal = () => {
    setIsAboutModalOpen((prevIsAboutModalOpen) => !prevIsAboutModalOpen);
  };

  return (
    <motion.header
      initial={{
        opacity: showLoader ? 0 : 1,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: loaderDuration / 1000,
          duration: 0.8,
        },
      }}
      className="pointer-events-none fixed z-50 flex w-full items-center justify-between pt-12 md:gap-4 md:pt-16"
    >
      <div className="flex h-4 items-center">
        {isSmallDevice ?
          <MobileLogo />
        : !isLogoHidden && (
            <DesktopLogo className="absolute w-[30rem] lg:w-[40rem] xl:w-[50rem]" />
          )
        }
      </div>
      <AnimatePresence>
        {isAboutModalOpen && (
          <AboutModal
            {...information}
            isOpen={isAboutModalOpen}
            setIsOpen={setIsAboutModalOpen}
          />
        )}
      </AnimatePresence>
      <nav className="relative z-50 self-end px-6 md:px-12">
        <ul className="flex gap-4 uppercase leading-none">
          {links.map(({ label, to }) => (
            <li key={label}>
              <a
                href={to}
                onClick={(event) => handleNavigate(event, { to })}
                className="pointer-events-auto"
                aria-current={pathname === to ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggleAboutModal}
              className="pointer-events-auto uppercase"
            >
              About
            </button>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};
