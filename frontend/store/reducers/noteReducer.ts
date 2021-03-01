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

export const noteCreationReducer = (state = { note: {} }, action) => {
  switch (action.type) {
    case CREATE_NOTE_REQUEST:
      return { loading: true };

    case CREATE_NOTE_SUCCESS:
      return { loading: false, note: action.payload };

    case CREATE_NOTE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const noteUpdateReducer = (state = { note: {} }, action) => {
  switch (action.type) {
    case UPDATE_NOTE_REQUEST:
      return { loading: true };

    case UPDATE_NOTE_SUCCESS:
      return { loading: false, note: action.payload };

    case UPDATE_NOTE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const noteDeleteReducer = (state = { note: {} }, action) => {
  switch (action.type) {
    case DELETE_NOTE_REQUEST:
      return { loading: true };

    case DELETE_NOTE_SUCCESS:
      return { loading: false, message: action.payload };

    case DELETE_NOTE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const noteListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case LIST_NOTES_REQUEST:
      return { loading: true };

    case LIST_NOTES_SUCCESS:
      return { loading: false, notes: action.payload };

    case LIST_NOTES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
