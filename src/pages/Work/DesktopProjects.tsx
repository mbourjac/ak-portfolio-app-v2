import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
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

  return (
    <main ref={containerRef} style={{ height: `${String(galleryWidth)}px` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-[9.5rem]">
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
              <Link
                key={id}
                to="/work/$projectSlug"
                params={{ projectSlug: slug }}
                className="flex flex-col gap-2"
                style={{
                  height: `calc(((100vh - 9.5rem) * ${String(height)} / 100))`,
                  aspectRatio,
                }}
              >
                <h2>
                  <img src={svgTitle} alt={title} className="h-6" />
                </h2>
                <img src={desktopUrl} alt={title} />
              </Link>
            ),
          )}
        </motion.div>
      </div>
    </main>
  );
};
