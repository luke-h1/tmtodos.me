import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from './types';

const UserState = ({ children }) => {
  const initialState = {
    userInfo: {
      token:
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('token')
        : '{}',
      isAuthenticated: null,
      error: null,
    },
    userDetails: {
      user: {},
    },
    users: [],
    userList: [],
    loading: false,

  };

  const [state, dispatch] = useReducer(userReducer, initialState);



  return (
    <UserContext.Provider
      value={{
        userInfo: state.userInfo,
        userDetails: state.userDetails,
        users: state.users,
        userList: state.userList,
        loading: state.loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
