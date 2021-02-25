import React, { useReducer } from 'react';
import axios from 'axios';
import userReducer from './UserReducer';
import userContext from './userContext';

const userState = (props) => {
  const userInfoFromStroage = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    loading: false,
    error: null,
  };
  const [state, dispatch] = userReducer(userReducer, initialState);
};
