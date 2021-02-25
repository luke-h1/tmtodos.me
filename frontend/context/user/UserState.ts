import React, { useReducer } from 'react';
import axios from 'axios';
import {
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from 'constants/authConstants';
import userReducer from './UserReducer';
import userContext from './userContext';

const userState = (props) => {
  const userInfoFromStroage = JSON.parse(
    localStorage.getItem('userInfo') || '{}',
  );

  const initialState = {
    userLogin: { userInfo: userInfoFromStroage },
    loading: false,
    error: null,
  };
  const [state, dispatch] = userReducer(userReducer, initialState);

  const login = async (email, password) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config,
      );
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (e) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

  const logout = async () => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });
  };

  const register = async (name, email, password) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config,
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (e) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };
};
