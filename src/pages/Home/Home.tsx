import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useLoaderContext } from '../../context/LoaderContext/LoaderContext.hook';
import { useRouteTransition } from '../../hooks/use-route-transition';
import { useSmallDevice } from '../../hooks/use-small-device';
import { DesktopLogo } from '../../layouts/AppLayout/DesktopLogo';
import { HomeCover } from './HomeCover';

export const Home = () => {
  const getHomeWorkQuery = useRouteContext({
    from: '/_layout/',
    select: (context) => context.getHomeWorkQuery,
  });
  const {
    data: { projects },
  } = useSuspenseQuery(getHomeWorkQuery);

  const { showLoader, logosCount, loaderDuration, stagger } =
    useLoaderContext();
  const { scope, variants } = useRouteTransition(0.2);
  const isSmallDevice = useSmallDevice();

  return (
    <>
      <AnimatePresence>
        {showLoader &&
          (isSmallDevice ?
            <div className="fixed top-0 flex h-dvh w-full items-center justify-center">
              <p className="overflow-hidden uppercase">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%', transition: { duration: 0.2 } }}
                  exit={{ y: '-100%', transition: { duration: 0.4 } }}
                  className="block"
                >
                  Amandine Kuhlmann
                </motion.span>
              </p>
            </div>
          : <div className="pointer-events-none fixed top-0 z-10 w-full pt-[96px]">
              {Array.from({ length: logosCount }).map((_, index) => (
                <DesktopLogo
                  key={index}
                  className="absolute"
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: stagger * index },
                  }}
                  style={{ y: `${String(-100 + index * 100)}%` }}
                />
              ))}
            </div>)}
      </AnimatePresence>
      <motion.main
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
        className="h-dvh"
      >
        <div className="relative h-dvh overflow-hidden">
          <motion.h1
            ref={scope}
            {...variants}
            className="pointer-events-none fixed top-0 z-10 hidden w-full pt-[96px] md:block"
          >
            <span className="sr-only">Amandine Kuhlmann</span>
            <DesktopLogo />
          </motion.h1>
          {projects.map((project) => (
            <HomeCover key={project.id} {...project} />
          ))}
        </div>
      </motion.main>
    </>
  );
};
