import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
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
    imageUrl,
    position: { top, left, zIndex },
    size: { width, aspectRatio },
  },
}: HomeCoverProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <motion.div
        className="absolute w-fit"
        style={{
          left: `${String(left)}%`,
          top: `${String(top)}%`,
          width: `${String(width)}%`,
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
          <motion.img
            src={imageUrl}
            alt={title}
            whileHover={{ filter: 'blur(6px)', opacity: 0.8 }}
          />
        </Link>
      </motion.div>
      {showInfo && (
        <HomeCoverInfo
          title={title}
          date={date}
          medium={medium}
          zIndex={zIndex}
        />
      )}
    </>
  );
};
