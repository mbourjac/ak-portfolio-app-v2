import defaultTheme from 'tailwindcss/defaultTheme';
import { useMediaQuery } from './use-media-query';

export const useSmallDevice = () => {
  const isSmallDevice = useMediaQuery(
    `(max-width: ${defaultTheme.screens.md})`,
  );

  return isSmallDevice;
};
