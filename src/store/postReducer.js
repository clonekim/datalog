import { create, update, fetch, fetchById, remove } from '../api/post';
import {
  POST_ADDED,
  POST_UPDATED,
  POST_FETCHED,
  SOURCE_SELECTED,
  POST_DELETED,
} from './actionType';

const initialState = {
  list: [],
  source: null,
};
export function addPost(payload) {
  return async dispatch => {
    const response = await create(payload);
    dispatch({ type: POST_ADDED, payload: response });
  };
}

export function updatePost(payload) {
  return async dispatch => {
    const response = await update(payload);
    dispatch({ type: POST_UPDATED, payload: response });
  };
}

export function deletePost(payload) {
  return async dispatch => {
    const response = await remove(payload);
    dispatch({ type: POST_DELETED, payload });
  };
}

export function fetchPosts() {
  return async (dispatch, getState) => {
    const response = await fetch();
    dispatch({ type: POST_FETCHED, payload: response });
  };
}

export default function postReduder(state = initialState, action) {
  switch (action.type) {
    case POST_FETCHED:
      return {
        ...state,
        list: action.payload,
      };

    case POST_ADDED:
      return {
        ...state,
        list: [action.payload, ...state.list],
      };

    case POST_UPDATED:
      return {
        ...state,
        list: state.list.map(post => {
          return post.id === action.payload.id ? action.payload : post;
        }),
      };

    case POST_DELETED:
      return {
        ...state,
        list: state.list.filter(i => action.payload !== i.id),
      };

    case SOURCE_SELECTED:
      return {
        ...state,
        source: action.payload,
      };

    default:
      return state;
  }
}
