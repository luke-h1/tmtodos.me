import React, { ReactNode, useReducer, useContext } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from '../constants/AuthContstants';

import { USER_DETAILS_RESET, USER_LIST_RESET } from '../constants/UserConstants';

const AuthState = ({ children }: ReactNode) => {
  const router = useRouter();

  const initialState = {
    token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : '{}',
    user: typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem('user')),
    loading: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //   register user
  const register = async (name: string, email: string, password: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch({ type: REGISTER_REQUEST });

      const { data } = await axios.post(
        'https://take-my-notes-dev.herokuapp.com/api/users',
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
  const login = async (email: string, password: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await axios.post(
        'https://take-my-notes-dev.herokuapp.com/api/users/login',
        { email, password },
        config,
      );
      dispatch({ type: LOGIN_SUCCESS, payload: data });
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
    dispatch({ type: LOGOUT_REQUEST });
    dispatch({ type: LOGOUT });
    router.push('/');
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
      {children}
    </AuthContext.Provider>
  );
};
export default AuthState;
