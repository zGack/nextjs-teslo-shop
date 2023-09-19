import { FC, PropsWithChildren, useReducer } from 'react';

import { UiContext, uiReducer } from './';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export interface UiState {
  isSideMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
  isSideMenuOpen: false,
}

export const UiProvider: FC<PropsWithChildren<Props>> = ({ children }) => {

 const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE );

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - ToggleMenu'})
  }

 return (
   <UiContext.Provider value={{
      ...state,

      // Methods
      toggleSideMenu,
    }}>
     { children }
   </UiContext.Provider>
  )
}