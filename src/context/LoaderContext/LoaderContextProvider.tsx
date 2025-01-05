import { useState, useEffect, type ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useWindowSize } from '../../hooks/use-window-size';
import { LoaderContext } from './LoaderContext';

type LoaderContextProviderProps = {
  children: ReactNode;
};

export const LoaderContextProvider = ({
  children,
}: LoaderContextProviderProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const { windowWidth, windowHeight } = useWindowSize();

  const logoRatio = 167 / 1349;
  const logoPadding = 96;
  const logoHeight = (windowWidth - logoPadding) * logoRatio;
  const logosCount = Math.ceil(windowHeight / logoHeight) + 1;
  const loaderDuration = 1000;
  const stagger = (loaderDuration - 200) / logosCount / 1000;

  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const isHome = pathname === '/';

  useEffect(() => {
    if (!showLoader) return;

    if (isHome) {
      const loaderTimeout = setTimeout(() => {
        setShowLoader(false);
      }, loaderDuration);

      return () => clearTimeout(loaderTimeout);
    } else {
      setShowLoader(false);
    }
  }, [showLoader, isHome, loaderDuration]);

  return (
    <LoaderContext.Provider
      value={{ showLoader, setShowLoader, loaderDuration, logosCount, stagger }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
