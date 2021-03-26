import React, { ReactNode, useContext, useReducer } from 'react';
import axios from 'axios';
import AuthContext from 'context/auth/authContext';
import NoteContext from './noteContext';
import noteReducer from './noteReducer';

import {
  NOTE_CREATE_SUCCESS,
  NOTE_CREATE_FAIL,
  NOTE_DELETE_FAIL,
  NOTE_DELETE_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_LIST_SUCCESS,
  NOTE_CREATE_REQUEST,
  NOTE_LIST_REQUEST,
  NOTE_DELETE_REQUEST,
  CLEAR_NOTES_FROM_STATE,
} from '../constants/NoteConstants';

export type Note = {
  title: string;
  body: string;
  id: string;
}

export interface initNoteStateProps {
  note: Note;
  notes: Note[];
  loading: boolean;
}

const NoteState = ({ children }: ReactNode) => {
  const API_URL = process.env.NODE_ENV === 'production' ? 'https://take-my-notes-api.xyz' : 'http://localhost:5000'
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const initialState: initNoteStateProps = {
    note: {},
    notes: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(noteReducer, initialState);

  //   create a single note
  const createNote = async (id: string, title: string, body: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({ type: NOTE_CREATE_REQUEST });
      const { data } = await axios.post(`${API_URL}/api/notes`, { id, title, body }, config);
      listNotes();
      dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
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
      const { data } = await axios.get(`${API_URL}/api/notes/me/${user._id}`, config);
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
  const deleteNote = async (id: string) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({ type: NOTE_DELETE_REQUEST });
      const { data } = await axios.delete(`${API_URL}/api/notes/${id}`, config);
      dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
      listNotes();
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

  const clearNotesFromState = async () => {
    dispatch({ type: CLEAR_NOTES_FROM_STATE });
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
        clearNotesFromState,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
export default NoteState;
