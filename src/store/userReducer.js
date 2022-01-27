import { watchUser } from '../api/user';
import { USER_INVALID, USER_LOGIN } from './actionType';

const initialState = {
  username: null,
  uid: null,
  isLogin: false,
};

export default function userReduder(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
        isLogin: true,
      };

    case USER_INVALID:
      return {
        username: null,
        uid: null,
        isLogin: false,
      };

    default:
      return state;
  }
}

export const userLogined = dispatch => {
  watchUser()
    .then(user => dispatch({ type: USER_LOGIN, payload: user }))
    .catch(err => dispatch({ type: USER_INVALID }));
};
