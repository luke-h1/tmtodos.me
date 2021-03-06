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
} from '../constants/AuthContstants';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
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
      localStorage.removeItem('token');
      return {
        isAuthenticated: false,
        loading: false,
        user: null,
        name: null,
        email: null,
        _id: null,
        error: action.payload,
        ...state,
        token: null,

      };
    default: {
      return state;
    }
  }
};
