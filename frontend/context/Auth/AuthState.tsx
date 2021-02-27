import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './AuthReducer';
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
} from '../../constants/AuthConstants';

// /api/users/profile
const AuthState = (props) => {
  const initialState = {
    token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : '{}',
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // load current logged in user & get JWT token
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('http://localhost:5000/api/users/profile');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (e) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const register = async (name, email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/api/users', { name, email, password }, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
      });
    }
  };
};
