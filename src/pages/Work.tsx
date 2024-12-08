import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useRouteTransition } from '../hooks/use-route-transition';
import { useSmallDevice } from '../hooks/use-small-device';

export const Work = () => {
  const getWorkQuery = useRouteContext({
    from: '/_layout/work/',
    select: (context) => context.getWorkQuery,
  });
  const {
    data: { projects },
  } = useSuspenseQuery(getWorkQuery);

  const { handleNavigate, scope, variants } = useRouteTransition();
  const isSmallDevice = useSmallDevice();

  return (
    <main>
      <motion.div
        ref={scope}
        className="flex items-center pt-[9.5rem] md:sticky md:top-0 md:h-screen md:overflow-hidden"
        {...variants}
      >
        <div className="flex flex-col gap-8 p-4 md:flex-row md:gap-4 md:overflow-x-auto md:py-0">
          {projects.map(
            ({
              id,
              slug,
              svgTitle,
              title,
              cover: {
                desktopUrl,
                size: { height, aspectRatio },
              },
            }) => (
              <a
                key={id}
                href={`/work/${slug}`}
                onClick={(event) =>
                  handleNavigate(event, {
                    to: '/work/$projectSlug',
                    params: { projectSlug: slug },
                  })
                }
                className="flex shrink-0 flex-col gap-2"
              >
                <h2>
                  <img src={svgTitle} alt={title} className="h-6" />
                </h2>
                <img
                  src={desktopUrl}
                  alt={title}
                  style={{
                    height:
                      isSmallDevice ? 'auto' : (
                        `calc(((100vh - 9.5rem) * ${String(height)} / 100))`
                      ),
                    aspectRatio,
                  }}
                />
              </a>
            ),
          )}
        </div>
      </motion.div>
    </main>
  );
};
