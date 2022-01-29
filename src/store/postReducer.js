import { create, update, fetch, fetchById, remove } from '../api/post';
import {
  POST_ADDED,
  POST_UPDATED,
  POST_FETCHED,
  SOURCE_SELECTED,
  POST_DELETED,
  ERROR_FIRED,
} from './actionType';

const initialState = {
  list: [],
  id: null,
};

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
        id: action.payload,
      };

    default:
      return state;
  }
}

export function addPost(payload) {
  return async dispatch => {
    try {
      const response = await create(payload);
      dispatch({ type: POST_ADDED, payload: response });
    } catch (err) {
      dispatch({ type: ERROR_FIRED, payload: err });
    }
  };
}

export function updatePost(payload) {
  return async dispatch => {
    try {
      const response = await update(payload);
      dispatch({ type: POST_UPDATED, payload: response });
    } catch (err) {
      dispatch({ type: ERROR_FIRED, payload: err });
    }
  };
}

export function deletePost(payload) {
  return async dispatch => {
    try {
      await remove(payload);
      dispatch({ type: POST_DELETED, payload });
    } catch (err) {
      dispatch({ type: ERROR_FIRED, payload: err });
    }
  };
}

export function fetchPosts() {
  return async dispatch => {
    try {
      const response = await fetch();
      dispatch({ type: POST_FETCHED, payload: response });
    } catch (err) {
      dispatch({ type: ERROR_FIRED, payload: err });
    }
  };
}

export function selectSource(payload) {
  return dispatch => dispatch({ type: SOURCE_SELECTED, payload });
}
