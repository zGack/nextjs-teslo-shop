
import { createContext } from 'react';

interface ContextProps {
  isSideMenuOpen: boolean;

  // Methods
  toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);