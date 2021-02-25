import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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
  USER_LOADED,
  CLEAR_ERRORS,
} from '../../constants/userConstants';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // REGISTER A USER
  const register = async (name: string, email: string, password: string) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/users', { name, email, password }, config);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
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
      localStorage.setItem('token', JSON.stringify(data));
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
    localStorage.removeItem('token');
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });
  };

  const getUserDetails = async (id) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      });
      const token = localStorage.getItem('token') && localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/api/users/${id}`, config);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
      });
    }
  };

  const updateUserProfile = async (user) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });
      const token = localStorage.getItem('token') && localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put('/api/users/profile', user, config);
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
      });
    }
  };

  const listUsers = async () => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });
      const token = localStorage.getItem('token') && localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('/api/users', config);
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
      });
    }
  };
  const deleteUser = async (id) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      });
      const token = localStorage.getItem('token') && localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/api/users/${id}`, config);
      dispatch({ type: USER_DELETE_SUCCESS });
    } catch (e) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
      });
    }
  };

  const updateUser = async (user) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,

      });
      const token = localStorage.getItem('token') && localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(`/api/users/${user._id}`, user, config);
      dispatch({ type: USER_UPDATE_SUCCESS });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
              e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        getUserDetails,
        updateUserProfile,
        listUsers,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
