import { useContext } from 'react';
import { LoaderContext } from './LoaderContext';

export const useLoaderContext = () => {
  const loaderContext = useContext(LoaderContext);

  if (!loaderContext) {
    throw new Error(
      'useLoaderContext must be used within the scope of LoaderContextProvider',
    );
  }

  return loaderContext;
};
