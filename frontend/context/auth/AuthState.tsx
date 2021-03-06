import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from 'utils/setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
} from '../constants/AuthContstants';

const AuthState = (props) => {
  const initialState = {
    token:
        typeof localStorage !== 'undefined'
          ? localStorage.getItem('token')
          : '{}',
    user: typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem('user')),
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //   register user
  const register = async (name, email, password) => {
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
      dispatch({ type: LOGIN_SUCCESS });
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
      localStorage.setItem('user', JSON.stringify(data));
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

  //   logout a user & destroy their token
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT });
  };

  //   clear errors (clear any errors in state)
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token:
        typeof localStorage !== 'undefined'
          ? localStorage.getItem('token')
          : '{}',
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        isAdmin: state.isAdmin,
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
