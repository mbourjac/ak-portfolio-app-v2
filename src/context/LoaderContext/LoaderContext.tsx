import { createContext } from 'react';

type LoaderContextProps = {
  showLoader: boolean;
  setShowLoader: (showLoader: boolean) => void;
  loaderDuration: number;
  logosCount: number;
  stagger: number;
};

export const LoaderContext = createContext<LoaderContextProps | null>(null);
