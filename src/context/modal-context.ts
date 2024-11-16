import { useContext, createContext } from 'react';

export const ModalContext = createContext<{ isOpen: boolean } | undefined>(
  undefined,
);

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error(
      'useModalContext must be used within the scope of ModalContextProvider',
    );
  }

  return modalContext;
};
