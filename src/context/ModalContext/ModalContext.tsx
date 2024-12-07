import { createContext } from 'react';

export const ModalContext = createContext<{ isOpen: boolean } | undefined>(
  undefined,
);
