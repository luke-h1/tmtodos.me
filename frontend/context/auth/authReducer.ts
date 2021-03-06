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
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        user: action.payload,
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
      localStorage.removeItem('user');
      return {
        user: {},
        error: null,
        loading: false,

      };
    default: {
      return state;
    }
  }
};
