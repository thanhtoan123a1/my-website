import { createActions, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';

// Actions
const GET_USERS = 'GET_USERS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILED = 'GET_USERS_FAILED';


export const usersAction = createActions(
  GET_USERS,
  GET_USERS_FAILED,
  GET_USERS_SUCCESS,
);

// Reducer
const initialState = {
  users: [],
  isChecking: false,
  error: '',
};
export const usersReducer = handleActions(
  {
    [GET_USERS]: state => ({
      ...state,
      isChecking: true,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      users: action.payload,
    }),
    [GET_USERS_FAILED]: (state, action) => ({
      ...state,
      error: action.payload,
      isChecking: false,
    }),
  },
  initialState,
);



// Sagas
function* getUsers(payload) {
  const { users } = payload;
  try {
    yield put(usersAction.getUsersSuccess(users));
  } catch (err) {
    yield put(usersAction.getUsersFailed(err));
  }
}


export const usersSagas = [
  takeEvery(GET_USERS, getUsers),
];
