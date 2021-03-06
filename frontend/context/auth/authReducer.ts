import { useRouter } from 'next/router';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
} from '../constants/AuthContstants';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        user: action.payload,
        loading: false,
        token: action.payload.token,

      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: {},
      };
    }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        user: {},
        error: null,
        loading: false,
        token: {},

      };
    default: {
      return state;
    }
  }
};
