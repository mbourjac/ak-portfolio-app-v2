import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/use-mouse-position';

type HomeCoverInfoProps = {
  title: string;
  date: string;
  medium: string;
  zIndex: number;
};

export const HomeCoverInfo = ({
  title,
  date,
  medium,
  zIndex,
}: HomeCoverInfoProps) => {
  const mousePosition = useMousePosition();
  const offsetX = -4;
  const offsetY = -38;

  return (
    mousePosition && (
      <motion.div
        style={{
          zIndex: zIndex + 1,
          x: `${String(mousePosition.x + offsetX)}px`,
          y: `${String(mousePosition.y + offsetY)}px`,
        }}
        className="pointer-events-none fixed left-0 top-0 flex flex-col"
      >
        <p className="text-xl"> {title}</p>
        <p className="text-xs uppercase">
          Year <span className="font-semibold">{date}</span>
        </p>
        <p className="text-xs uppercase">
          Medium <span className="font-semibold">{medium}</span>
        </p>
      </motion.div>
    )
  );
};
