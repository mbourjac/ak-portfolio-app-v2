import { useContext } from 'react';
import { ModalContext } from './ModalContext';

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error(
      'useModalContext must be used within the scope of ModalContextProvider',
    );
  }

  return modalContext;
};
