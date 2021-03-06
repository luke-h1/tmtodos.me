import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../constants/UserConstants';

export default (state, action) => {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };

    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_LIST_RESET:
      return {
        users: [],
      };

    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case USER_DELETE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case USER_UPDATE_RESET:
      return {
        user: {},
      };

    case USER_DETAILS_REQUEST:
    case USER_UPDATE_PROFILE_REQUEST:
    case USER_LIST_REQUEST:
    case USER_DELETE_REQUEST:
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };

    default: {
      return state;
    }
  }
};
