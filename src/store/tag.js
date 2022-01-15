const initialState = [];

export const TAG_FETCHED = 'tag/fetched';
export const TAG_ADDED = 'tag/added';
export const TAG_UPDATED = 'tag/updated';
export const TAG_DELETED = 'tag/deleted';

export default function userReduder(state = initialState, action) {
  switch (action.type) {
    case TAG_FETCHED:
      return state;

    default:
      return state;
  }
}
