import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useElementSize } from './use-element-size';
import { useWindowSize } from './use-window-size';

export const useVerticalScroll = () => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const { windowWidth } = useWindowSize();
  const { width: elementWidth } = useElementSize(elementRef);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, windowWidth - elementWidth],
  );

  return { containerRef, elementRef, elementWidth, x };
};
