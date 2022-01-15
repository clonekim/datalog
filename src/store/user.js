const initialState = {
  username: null,
  email: null,
  uid: null,
  isLogin: false,
};

export const USER_LOGIN = 'user/login';
export const USER_LOGOUT = 'user/logout';

export default function userReduder(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
        isLogin: true,
      };

    default:
      return state;
  }
}
