import { type RefObject, useLayoutEffect, useState } from 'react';

export const useElementSize = <T extends HTMLElement>(
  elementRef: RefObject<T>,
) => {
  const [elementSize, setElementSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) {
      throw new Error('elementRef is not assigned');
    }

    const updateElementSize = () => {
      setElementSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    };

    updateElementSize();
    window.addEventListener('resize', updateElementSize);

    return () => {
      window.removeEventListener('resize', updateElementSize);
    };
  }, [elementRef]);

  return elementSize;
};
