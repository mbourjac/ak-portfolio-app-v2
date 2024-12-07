import { useState } from 'react';
import { motion } from 'motion/react';
import { useMediaQuery } from '../../hooks/use-media-query';
import { useRouteTransition } from '../../hooks/use-route-transition';
import type { BaseProject } from '../../services/project/project.types';
import type { HomeCover as HomeCoverType } from '../../services/work/work.types';
import { HomeCoverInfo } from './HomeCoverInfo';

type HomeCoverProps = BaseProject & {
  cover: HomeCoverType;
};

export const HomeCover = ({
  slug,
  title,
  svgTitle,
  date,
  medium,
  cover: {
    desktopUrl,
    mobileUrl,
    videoFilename,
    desktopPosition,
    mobilePosition,
    size: { desktopWidth, mobileWidth, aspectRatio },
  },
}: HomeCoverProps) => {
  const isVerticalDevice = useMediaQuery(`(orientation: portrait)`);
  const { scope, handleNavigate, variants } = useRouteTransition();

  const [showInfo, setShowInfo] = useState(false);
  const [isDragged, setIsDragged] = useState(false);

  return (
    <>
      <motion.div
        ref={scope}
        {...variants}
        className="absolute w-fit"
        style={{
          left: `${String(isVerticalDevice ? mobilePosition.left : desktopPosition.left)}%`,
          top: `${String(isVerticalDevice ? mobilePosition.top : desktopPosition.top)}%`,
          width: `${String(isVerticalDevice ? mobileWidth : desktopWidth)}%`,
          zIndex:
            isVerticalDevice ? mobilePosition.zIndex : desktopPosition.zIndex,
          aspectRatio,
        }}
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragged(true)}
        onDragEnd={() => setIsDragged(false)}
        onHoverStart={() => setShowInfo(true)}
        onHoverEnd={() => setShowInfo(false)}
      >
        <button
          className="relative hover:cursor-none"
          onClick={(event) => {
            if (isDragged) return;

            handleNavigate(event, {
              to: '/work/$projectSlug',
              params: { projectSlug: slug },
            });
          }}
        >
          {videoFilename ?
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <motion.video
              muted
              loop
              autoPlay
              className="h-full"
              whileHover={{ filter: 'blur(6px)', opacity: 0.8 }}
            >
              <source src={`/${videoFilename}`} type="video/mp4" />
              Your browser does not support HTML5 video.
            </motion.video>
          : <motion.div whileHover={{ filter: 'blur(6px)', opacity: 0.8 }}>
              <img
                src={isVerticalDevice ? mobileUrl : desktopUrl}
                alt={title}
                className="pointer-events-none"
              />
            </motion.div>
          }
        </button>
      </motion.div>
      {showInfo && (
        <HomeCoverInfo
          title={title}
          svgTitle={svgTitle}
          date={date}
          medium={medium}
          zIndex={
            isVerticalDevice ? mobilePosition.zIndex : desktopPosition.zIndex
          }
        />
      )}
    </>
  );
};
