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

export default (state, action) => {
  switch (action.type) {
    case NOTE_CREATE_SUCCESS:
      return {
        loading: false,
        note: action.payload,
      };

    case NOTE_CREATE_FAIL:
      return {
        loading: false,
        note: null,
        error: action.payload,
      };

    case NOTE_UPDATE_SUCCESS:
      return {
        loading: false,
        note: action.payload,
      };

    case NOTE_UPDATE_FAIL:
      return {
        loading: false,
        note: null,
        error: action.payload,
      };

    case NOTE_LIST_SUCCESS:
      return {
        loading: false,
        notes: action.payload,
      };
    case NOTE_LIST_FAIL:
      return {
        loading: false,
        notes: null,
        error: action.payload,
      };

    default: {
      return state;
    }
  }
};
