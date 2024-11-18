import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouteContext } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useVerticalScroll } from '../../hooks/use-vertical-scroll';
import { ProjectInfo } from './ProjectInfo';

export const Project = () => {
  const getProjectQuery = useRouteContext({
    from: '/_layout/work/$projectSlug',
    select: (context) => context.getProjectQuery,
  });
  const {
    data: { images, title, date, medium, description },
  } = useSuspenseQuery(getProjectQuery);

  const {
    containerRef,
    elementRef: galleryRef,
    elementWidth: galleryWidth,
    x: galleryX,
  } = useVerticalScroll();

  return (
    <main ref={containerRef} style={{ height: `${String(galleryWidth)}px` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-[9.5rem]">
        <ProjectInfo
          title={title}
          date={date}
          medium={medium}
          description={description}
        />
        <motion.div
          className="flex flex-row gap-4 pl-80 pr-4"
          ref={galleryRef}
          style={{ x: galleryX }}
        >
          {images.map(({ imageUrl, aspectRatio }, index) => (
            <div
              key={index}
              style={{
                height: `calc(100vh - 9.5rem)`,
                aspectRatio,
              }}
            >
              <img src={imageUrl} alt="" />
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};
