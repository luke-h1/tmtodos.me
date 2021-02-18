import { Note } from "../../types/noteTypes";

import {
  ADD_NOTE,
  DELETE_NOTE,
  SAVE_NOTE,
} from "../../constants/noteConstants";

export type NoteTypes =
  | { type: typeof SAVE_NOTE; payload: Note[] }
  | { type: typeof ADD_NOTE }
  | { type: typeof DELETE_NOTE; payload: number };

const noteState = (props) => {
  const initialState = {
    users: [],
    user: {},
    notes: [],
    loading: false,
    isAuthenticated: false,
  };
};
