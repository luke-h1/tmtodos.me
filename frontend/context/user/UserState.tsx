import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import AuthContext from 'context/auth/authContext';
import UserContext from './userContext';
import userReducer from './userReducer';
import {
  MY_USER_DETAILS_FAIL,
  MY_USER_DETAILS_REQUEST,
  MY_USER_DETAILS_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../constants/UserConstants';

const UserState = (props) => {
  const authContext = useContext(AuthContext);
  const { user: AuthenticatedUser } = authContext;
  const initialState = {
    users: [],
    user: {},
    loading: false,
    success: false,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  //   get user details
  const getUserDetails = async (id) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthenticatedUser.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/${id}`,
        config,
      );
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

  const getMyUserDetails = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthenticatedUser.token}`,
      },
    };
    try {
      dispatch({ type: MY_USER_DETAILS_REQUEST });
      const { data } = await axios.get(
        `http://localhost:5000/api/users/me/${id}`,
        config,
      );
      dispatch({ type: MY_USER_DETAILS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: MY_USER_DETAILS_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

  const updateUserProfile = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthenticatedUser.token}`,
      },
    };
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
      const { data } = await axios.put(
        'http://localhost:5000/api/users/profile',
        config,
        user,
      );
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthenticatedUser.token}`,
      },
    };
    try {
      dispatch({ type: USER_LIST_REQUEST });
      const { data } = await axios.get(
        'http://localhost:5000/api/users',
        config,
      );
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthenticatedUser.token}`,
      },
    };
    try {
      dispatch({ type: USER_DELETE_REQUEST });
      await axios.delete(`http://localhost:5000/api/users/${id}`, config);
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

  const resetUpdateUser = async () => {
    try {
      dispatch({ type: USER_UPDATE_RESET });
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AuthenticatedUser.token}`,
      },
    };
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
      const { data } = await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        user,
        config,
      );
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
    <UserContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        getUserDetails,
        getMyUserDetails,
        listUsers,
        deleteUser,
        updateUser,
        resetUpdateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
