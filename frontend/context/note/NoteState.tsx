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
} from '../constants/NoteConstants';

const NoteState = (props) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const initialState = {
    note: {},
    notes: [],
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
      // console.log(user.token)
      const { data } = await axios.post('http://localhost:5000/api/notes', { id, title, body }, config);
      dispatch({ type: NOTE_CREATE_SUCCESS });
    } catch (e) {
      dispatch({ type: NOTE_CREATE_FAIL });
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
      const { data } = await axios.get(`http://localhost:5000/api/notes/me/${user._id}`, config);
      dispatch({ type: NOTE_LIST_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: NOTE_LIST_FAIL });
    }
  };

  return (
    <NoteContext.Provider
      value={{
        note: state.note,
        notes: state.notes,
        createNote,
        listNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
