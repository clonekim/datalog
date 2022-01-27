import { create, fetch } from '../api/post';
import { POST_ADDED, POST_FETCHED } from './actionType';

const initialState = [];

export function addPost(payload) {
  return async (dispatch, getState) => {
    const response = await create(payload);
    console.log('Response =>', response.id);

    dispatch({ type: POST_ADDED, payload });
  };
}

export function fetchPost() {
  return async (dispatch, getState) => {
    const response = await fetch();
    dispatch({ type: POST_FETCHED, payload: response });
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
