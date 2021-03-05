import axios from 'axios';
import { Error, Note } from 'store/types/types';
import {
  CREATE_NOTE_FAIL,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAIL,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  LIST_NOTES_FAIL,
  LIST_NOTES_REQUEST,
  LIST_NOTES_SUCCESS,
} from '../constants/noteConstants';

export type NoteActionTypes =
| { type: typeof CREATE_NOTE_SUCCESS; payload: Note}
| { type: typeof CREATE_NOTE_FAIL; payload: Error[] }
| { type: typeof CREATE_NOTE_REQUEST; }

export const createNote = (id, title, body): NoteActionTypes => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_NOTE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      'http://localhost:5000/api/notes',
      { id, title, body },
      config,
    );
    dispatch({ type: CREATE_NOTE_SUCCESS, payload: data });
    dispatch({ type: LIST_NOTES_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: CREATE_NOTE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const updateNote = (user, id, title, body) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: UPDATE_NOTE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/notes/${id}`,
      config,
    );
    dispatch({ type: UPDATE_NOTE_SUCCESS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({
      type: UPDATE_NOTE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const deleteNote = (user, id, title, body) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: DELETE_NOTE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:5000/api/notes/${id}`,
      config,
    );
    dispatch({ type: DELETE_NOTE_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: DELETE_NOTE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_NOTES_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/notes/me/${userInfo._id}`,
      config,
    );
    dispatch({ type: LIST_NOTES_SUCCESS, payload: data });
    console.log(data);
  } catch (e) {
    dispatch({
      type: LIST_NOTES_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
