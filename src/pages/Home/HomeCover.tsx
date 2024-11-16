import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import type { BaseProject } from '../../services/project/project.types';
import type { HomeCover as HomeCoverType } from '../../services/work/work.types';

type HomeCoverProps = BaseProject & {
  cover: HomeCoverType;
};

export const HomeCover = ({
  slug,
  title,
  cover: {
    imageUrl,
    position: { top, left },
    size: { width, aspectRatio },
  },
}: HomeCoverProps) => {
  return (
    <motion.div
      className="absolute w-fit"
      style={{
        left: `${String(left)}%`,
        top: `${String(top)}%`,
        width: `${String(width)}%`,
        aspectRatio,
      }}
    >
      <Link
        to="/work/$projectSlug"
        className="relative"
        params={{ projectSlug: slug }}
      >
        <motion.img
          src={imageUrl}
          alt={title}
          whileHover={{ filter: 'blur(6px)', opacity: 0.8 }}
        />
      </Link>
    </motion.div>
  );
};
