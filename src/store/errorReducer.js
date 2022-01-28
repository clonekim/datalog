import { ERROR_FIRED } from './actionType';

const initialState = {
  message: null,
  stack: null,
};

export default function errorReduder(state = initialState, action) {
  switch (action.type) {
    case ERROR_FIRED:
      const { message, stack } = action.payload;

      return {
        message: message || action.payload,
        stack,
      };

    default:
      return state;
  }
}
