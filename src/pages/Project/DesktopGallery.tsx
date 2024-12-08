import { motion } from 'motion/react';
import { useRouteTransition } from '../../hooks/use-route-transition';
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
  const { scope, variants } = useRouteTransition();

  return (
    <main>
      <motion.div
        ref={scope}
        className="sticky top-0 flex h-screen items-center overflow-hidden pt-[9.5rem]"
        {...variants}
      >
        <ProjectInfo
          title={title}
          date={date}
          medium={medium}
          description={description}
        />
        <div className="flex flex-row gap-4 overflow-x-auto pl-80 pr-4">
          {gallery.map(
            ({ type, filename, desktopUrl, aspectRatio, height }, index) => (
              <div
                key={index}
                style={{
                  height: `calc(((100vh - 9.5rem) * ${String(height)} / 100))`,
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
            ),
          )}
        </div>
      </motion.div>
    </main>
  );
};
