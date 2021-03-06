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
    token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : '{}',
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //   load a user (hits the auth endpoint)
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth');
      dispatch({ type: USER_LOADED, payload: data });
    } catch (e) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const register = async (name, email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post('http://localhost:5000/api/users', { name, email, password }, config);
      loadUser();
    } catch (e) {
        dispatch({ type: REGISTER_FAIL, payload:  e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
  };
};
