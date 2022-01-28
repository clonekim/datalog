import { ERROR_FIRED, ERROR_NONE } from './actionType';

const initialState = {
  hasError: false,
  message: null,
  stack: null,
};

export default function errorReduder(state = initialState, action) {
  switch (action.type) {
    case ERROR_FIRED:
      const { message, stack } = action.payload;

      return {
        hasError: true,
        message: message || action.payload,
        stack,
      };

    case ERROR_NONE:
      return {
        hasError: false,
        messager: null,
        statck: null,
      };

    default:
      return state;
  }
}
