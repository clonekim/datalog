export const EDITOR_TOGGLE = 'editor/toggle';

const initialState = {
  showEditor: false,
};

export default function optionReduder(state = initialState, action) {
  switch (action.type) {
    case EDITOR_TOGGLE:
      return {
        ...state,
        showEditor: action.payload,
      };

    default:
      return state;
  }
}
