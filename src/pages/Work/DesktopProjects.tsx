import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouteTransition } from '../../hooks/use-route-transition';
import { useVerticalScroll } from '../../hooks/use-vertical-scroll';
import type { WorkProject } from '../../services/work/work.types';
type DesktopProjectsProps = {
  projects: WorkProject[];
};

export const DesktopProjects = ({ projects }: DesktopProjectsProps) => {
  const {
    containerRef,
    elementRef: galleryRef,
    elementWidth: galleryWidth,
    x: galleryX,
  } = useVerticalScroll();
  const { handleNavigate, scope, variants } = useRouteTransition();

  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <main
      ref={containerRef}
      style={{
        height: `${String(galleryWidth)}px`,
      }}
    >
      <motion.div
        ref={scope}
        className="sticky top-0 flex h-screen items-center overflow-hidden pt-[9.5rem]"
        {...variants}
      >
        <motion.div
          className="flex flex-row gap-4 px-4"
          ref={galleryRef}
          style={{ x: galleryX }}
        >
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
                className="flex h-fit shrink-0 flex-col gap-2"
                onMouseEnter={() => setHoveredProjectId(id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                style={{
                  height: `calc(((100vh - 9.5rem) * ${String(height)} / 100))`,
                  aspectRatio,
                }}
              >
                <h2>
                  <img src={svgTitle} alt={title} className="h-6" />
                </h2>
                <motion.img
                  src={desktopUrl}
                  alt={title}
                  animate={{
                    filter: hoveredProjectId === id ? 'blur(6px)' : 'blur(0px)',
                    opacity: hoveredProjectId === id ? 0.8 : 1,
                    transition: {
                      duration: 0.2,
                      ease: [0.12, 0, 0.39, 0],
                    },
                  }}
                />
              </a>
            ),
          )}
        </motion.div>
      </motion.div>
    </main>
  );
};
