import { EDITOR_TOGGLE, THEME_TOGGLE } from './actionType';

const initialState = {
  theme: 'light',
  showEditor: false,
};

export default function optionReduder(state = initialState, action) {
  switch (action.type) {
    case THEME_TOGGLE:
      return {
        ...state,
        theme: action.payload,
      };

    case EDITOR_TOGGLE:
      return {
        ...state,
        showEditor: action.payload,
      };

    default:
      return state;
  }
}
