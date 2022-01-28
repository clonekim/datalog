import { fetch } from '../api/tag';
import { ERROR_FIRED, TAG_FETCHED } from './actionType';

const initialState = [];

export function fetchTags() {
  return async dispatch => {
    try {
      const payload = await fetch();

      dispatch({ type: TAG_FETCHED, payload });
    } catch (err) {
      dispatch({ type: ERROR_FIRED, payload: err });
    }
  };
}

export default function userReduder(state = initialState, action) {
  switch (action.type) {
    case TAG_FETCHED:
      return action.payload;

    default:
      return state;
  }
}
