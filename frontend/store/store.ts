import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  noteCreationReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer,
} from './reducers/noteReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  noteCreate: noteCreationReducer,
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
  noteList: noteListReducer,
});

const userInfoFromStorage = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userInfo') || '{}');

const initialNotes = '{}';

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  notes: initialNotes,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
