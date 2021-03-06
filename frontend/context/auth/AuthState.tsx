import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
} from '../constants/AuthContstants';

import { USER_DETAILS_RESET, USER_LIST_RESET } from '../constants/UserConstants';

const AuthState = (props) => {
  const initialState = {
    token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : '{}',
    user: typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem('user')),
    loading: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //   register user
  const register = async (name, email, password) => {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/users',
        { name, email, password },
        config,
      );
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

  //   login user
  const login = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/users/login',
        { email, password },
        config,
      );
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      // set item in local storage here before moved to reducer...
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

  //   logout a user & destroy their token / info from local storage
  const logout = () => {
    dispatch({ type: LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });
    // need to destroy any notes before logout
  };

  //   clear errors (clear any errors in state)
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        user: state.user,
        token: state.token,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
