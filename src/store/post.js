import { create, fetch } from '../api/post';

export const POST_ADDED = 'post/added';
export const POST_FETCHED = 'post/fetched';

const initialState = [];

export function addPost(payload) {
  return async function addPost(dispatch, getState) {
    const response = await create(payload);
    console.log('Response =>', response);
    return await dispatch({ type: POST_ADDED, payload });
  };
}

export function fetchPost() {
  return async function fetchPost(dispatch, getState) {
    const response = await fetch();
    return await dispatch({ type: POST_FETCHED, payload: response });
  };
}

export default function postReduder(state = initialState, action) {
  switch (action.type) {
    case POST_FETCHED:
      return action.payload;

    case POST_ADDED:
      return [...state, action.payload];

    default:
      return state;
  }
}
