
import * as types from "../actions/actionTypes";
import { ISession } from "../model/session.model";


export const initialState = {
  loggedIn: false,
  isLoggingIn: false,
  user: {
    first_name: 'Shen',
    last_name: 'Zhi',
    email: 'demo@devias.io',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director',
    role: 'ADMIN' // ['GUEST', 'USER', 'ADMIN']
  }
} as ISession;

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SESSION_LOGIN: {
      return {
        ...state,
        loggedIn: true
      };
    }

    case types.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          role: 'GUEST'
        }
      };
    }

    case types.SESSION_REGISTER: {
      return {
        ...state,
        loggedIn: true,
        isLoggingIn: true,
        user: action.user
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
