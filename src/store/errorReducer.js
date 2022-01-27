import { create, fetch } from '../api/post';

export const ERROR_FIRED = 'error/fired';

const initialState = {};

export default function errorReduder(state = initialState, action) {
  switch (action.type) {
    case ERROR_FIRED:
      return action.payload;

    default:
      return state;
  }
}
