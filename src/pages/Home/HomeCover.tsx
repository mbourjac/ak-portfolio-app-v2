import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/use-media-query';
import type { BaseProject } from '../../services/project/project.types';
import type { HomeCover as HomeCoverType } from '../../services/work/work.types';
import { HomeCoverInfo } from './HomeCoverInfo';

type HomeCoverProps = BaseProject & {
  cover: HomeCoverType;
};

export const HomeCover = ({
  slug,
  title,
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
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <motion.div
        className="absolute w-fit"
        style={{
          left: `${String(isVerticalDevice ? mobilePosition.left : desktopPosition.left)}%`,
          top: `${String(isVerticalDevice ? mobilePosition.top : desktopPosition.top)}%`,
          width: `${String(isVerticalDevice ? mobileWidth : desktopWidth)}%`,
          aspectRatio,
        }}
        onHoverStart={() => setShowInfo(true)}
        onHoverEnd={() => setShowInfo(false)}
      >
        <Link
          to="/work/$projectSlug"
          className="relative hover:cursor-none"
          params={{ projectSlug: slug }}
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
          : <motion.img
              src={isVerticalDevice ? mobileUrl : desktopUrl}
              alt={title}
              whileHover={{ filter: 'blur(6px)', opacity: 0.8 }}
            />
          }
        </Link>
      </motion.div>
      {showInfo && (
        <HomeCoverInfo
          title={title}
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
