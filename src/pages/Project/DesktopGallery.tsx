import { motion } from 'framer-motion';
import { useVerticalScroll } from '../../hooks/use-vertical-scroll';
import type { Project } from '../../services/project/project.types';
import { ProjectInfo } from './ProjectInfo';

type DesktopGalleryProps = Project;

export const DesktopGallery = ({
  gallery,
  title,
  date,
  medium,
  description,
}: DesktopGalleryProps) => {
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
          {gallery.map(({ type, filename, desktopUrl, aspectRatio }, index) => (
            <div
              key={index}
              style={{
                height: `calc(100vh - 9.5rem)`,
                aspectRatio,
              }}
            >
              {
                type === 'image' ?
                  <img src={desktopUrl} alt="" />
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                : <video controls className="h-full">
                    <source src={`/${filename}`} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>

              }
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};