import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { addNewMessage, updateNewMessage, addRoom } from 'redux/helpers/firebase';

// Actions
const ADD_MESSAGES = 'ADD_MESSAGES';
const ADD_MESSAGES_SUCCESS = 'ADD_MESSAGES_SUCCESS';
const ADD_MESSAGES_FAILED = 'ADD_MESSAGES_FAILED';
const CREATE_ROOM = 'CREATE_ROOM';


export const messagesAction = createActions(
  ADD_MESSAGES,
  ADD_MESSAGES_FAILED,
  ADD_MESSAGES_SUCCESS,
  CREATE_ROOM,
);

// Reducer
const initialState = {
  isChecking: false,
  error: '',
};
export const messagesReducer = handleActions(
  {
    [ADD_MESSAGES]: state => ({
      ...state,
      isChecking: true,
    }),
    [ADD_MESSAGES_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
    }),
    [ADD_MESSAGES_FAILED]: (state, action) => ({
      ...state,
      error: action.payload,
      isChecking: false,
    }),
  },
  initialState,
);



// Sagas
function* addMessages(params) {
  try {
    yield call(updateNewMessage, params.payload);
    yield call(addNewMessage, params.payload);
    yield put(messagesAction.addMessagesSuccess());
  } catch (err) {
    yield put(messagesAction.addMessagesFailed(err));
  }
}

function* createRoom(params) {
  try {
    yield call(addRoom, params.payload);
    yield put(messagesAction.addMessagesSuccess());
  } catch (err) {
    yield put(messagesAction.addMessagesFailed(err));
  }
}


export const messagesSagas = [
  takeEvery(ADD_MESSAGES, addMessages),
  takeEvery(CREATE_ROOM, createRoom),
];
