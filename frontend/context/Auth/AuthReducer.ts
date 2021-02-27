import { USER_UPDATE_RESET } from 'constants/userConstants';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  CLEAR_ERRORS,
} from '../../constants/userConstants';

export default (state, action) => {
  switch (action.type) {
    default: {
      return state;
    }

    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };

    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS: {
      localStorage.setItem('token', action.payload.token);
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
        success: true,
        user: action.payload,
      };
    }

    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };

    case USER_LOGIN_FAIL: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    }
    case USER_LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    case USER_DETAILS_FAIL: {
      return {
        error: action.payload,
        loading: false,
      };
    }
    case USER_DETAILS_REQUEST: {
      return {
        loading: true,
      };
    }
    case USER_DETAILS_SUCCESS: {
      return {
        success: true,
        loading: false,
        user: action.payload,
      };
    }
    case USER_LIST_REQUEST: {
      return {
        loading: true,

      };
    }
    case USER_LIST_SUCCESS: {
      return {
        loading: false,
        success: true,
        users: action.payload,
      };
    }
    case USER_LIST_FAIL: {
      return {
        loading: false,
        success: false,
        users: [],
        error: action.payload,
      };
    }
    case USER_LIST_RESET: {
      return {
        users: [],
        errors: action.payload,
        loading: false,
      };
    }
    case USER_UPDATE_PROFILE_FAIL: {
      return { loading: false, error: action.payload, success: false };
    }
    case USER_UPDATE_PROFILE_REQUEST:
      return { success: true, loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };

    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_RESET:
      return {
        user: {},
      };
  }
};
