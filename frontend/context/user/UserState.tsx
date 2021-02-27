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

const UserState = (props) => {
  const initialState = {
   
    userInfo: {
      token:
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('token')
        : '{}',
      isAuthenticated: null,
      error: null,
      user: null,
    },
    loading: false,

  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // LOAD USER (HIT AUTH ENDPOINT)
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data }); // USER DATA
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_ERROR });
    }
  };

  // REGISTER USER
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // LOGIN USER
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // LOGOUT (DESTROY TOKEN)
  const logout = () => dispatch({ type: LOGOUT });

  // CLEAR ERRORS (CLEAR ERRORS IN STATE)
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <UserContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        userInfo: state.userInfo,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
