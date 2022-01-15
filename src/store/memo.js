import { create, fetch } from '../api/memo';

export const MEMO_ADDED = 'memo/added';
export const MEMO_FETCHED = 'memo/fetched';

const initialState = [];

export function addMemo(payload) {
  return async function addMemo(dispatch, getState) {
    const response = await create({ body: payload });
    console.log('Response =>', response);
    dispatch({ type: MEMO_ADDED, payload });
  };
}

export function fetchMemo() {
  return async function fetchMemo(dispatch, getState) {
    const response = await fetch();
    console.log('Response =>', response);
    dispatch({ type: MEMO_FETCHED, payload: response });
  };
}

export default function memoReduder(state = initialState, action) {
  switch (action.type) {
    case MEMO_FETCHED:
      return action.payload;

    case MEMO_ADDED:
      return [...state, action.payload];

    default:
      return state;
  }
}
