import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import AuthContext from 'context/auth/authContext';
import NoteContext from './noteContext';
import noteReducer from './noteReducer';

import {
  NOTE_CREATE_SUCCESS,
  NOTE_CREATE_FAIL,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_SUCCESS,
  NOTE_DELETE_FAIL,
  NOTE_DELETE_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_LIST_SUCCESS,
  NOTE_CREATE_REQUEST,
  NOTE_LIST_REQUEST,
  NOTE_DELETE_REQUEST,
} from '../constants/NoteConstants';

const NoteState = (props) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const initialState = {
    note: {},
    notes: [],
    loading: true,
  };
  const [state, dispatch] = useReducer(noteReducer, initialState);

  //   create a single note
  const createNote = async (id, title, body) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({ type: NOTE_CREATE_REQUEST });
      const { data } = await axios.post('http://localhost:5000/api/notes', { id, title, body }, config);
      dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
      listNotes();
    } catch (e) {
      dispatch({
        type: NOTE_CREATE_FAIL,
        payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
      });
    }
  };

  // list a user's notes
  const listNotes = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({ type: NOTE_LIST_REQUEST });
      const { data } = await axios.get(`http://localhost:5000/api/notes/me/${user._id}`, config);
      dispatch({ type: NOTE_LIST_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: NOTE_LIST_FAIL,
        payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
      });
    }
  };

  // delete a single note
  const deleteNote = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({ type: NOTE_DELETE_REQUEST });
      const { data } = await axios.delete(`http://localhost:5000/api/notes/${id}`, config);
      dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
    } catch (e) {
      dispatch({
        type: NOTE_DELETE_FAIL,
        payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
      });
    }
  };

  return (
    <NoteContext.Provider
      value={{
        note: state.note,
        notes: state.notes,
        loading: state.loading,
        createNote,
        listNotes,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
