import { UiState } from './'

type UiActionType = 
  | { type: '[UI] - ToggleMenu' }

export const uiReducer = ( state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case '[UI] - ToggleMenu':
      return {
        ...state,
        isSideMenuOpen: !state.isSideMenuOpen
      }

      default: 
        return state;
  }
}