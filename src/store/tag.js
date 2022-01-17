import { fetch } from '../api/tag';

const initialState = [];

export const TAG_FETCHED = 'tag/fetched';
export const TAG_ADDED = 'tag/added';
export const TAG_UPDATED = 'tag/updated';
export const TAG_DELETED = 'tag/deleted';

export function fetchTags() {
  return async function fetchTags(dispatch, getState) {
    const payload = await fetch();
    dispatch({ type: TAG_FETCHED, payload });
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
