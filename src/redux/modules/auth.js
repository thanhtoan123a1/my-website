import { createActions, handleActions } from 'redux-actions';
import { call, takeEvery } from 'redux-saga/effects';
import {
  postApiRequest,
  apiEndpoint,
} from '../helpers/api';

// Actions
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const INIT_SIGNUP = 'INIT_SIGNUP';
const SIGNUP_EMAIL = 'SIGNUP_EMAIL';
const SIGNUP_FACEBOOK = 'SIGNUP_FACEBOOK';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILED = 'SIGNUP_FAILED';
const CHECK_REDIRECT = 'CHECK_REDIRECT';
const CHECK_REDIRECT_END = 'CHECK_REDIRECT_END';
const INIT_PASSWORD_RESET = 'INIT_PASSWORD_RESET';
const PASSWORD_RESET = 'PASSWORD_RESET';
const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
const INIT_UNSUBSCRIBE = 'INIT_UNSUBSCRIBE';
const UNSUBSCRIBE = 'UNSUBSCRIBE';
const UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS';
const UNSUBSCRIBE_FAILED = 'UNSUBSCRIBE_FAILED';

const CHECK_LOGIN = 'CHECK_LOGIN';
const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS';
const CHECK_LOGIN_FAILED = 'CHECK_LOGIN_FAILED';
const CHECK_LOGIN_FINISHED = 'CHECK_LOGIN_FINISHED';

const SET_USER = 'SET_USER';

const FETCH_HAS_REQUESTED = 'FETCH_HAS_REQUESTED';
const FETCH_HAS_REQUESTED_SUCCESS = 'FETCH_HAS_REQUESTED_SUCCESS';

export const authActions = createActions(
  LOGIN_EMAIL,
  LOGIN_FACEBOOK,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILED,
  CHECK_LOGIN_FINISHED,
  INIT_SIGNUP,
  SIGNUP_EMAIL,
  SIGNUP_FACEBOOK,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  INIT_PASSWORD_RESET,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  SET_USER,
  INIT_UNSUBSCRIBE,
  UNSUBSCRIBE,
  UNSUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_FAILED,
  CHECK_REDIRECT,
  CHECK_REDIRECT_END,
  FETCH_HAS_REQUESTED,
  FETCH_HAS_REQUESTED_SUCCESS,
);

// Reducer
const initialState = {
  isLogin: false,
  isChecking: false,
  error: '',
};
export const authReducer = handleActions(
  {
    [LOGIN_EMAIL]: state => ({
      ...state,
      isChecking: true,
    }),
    [LOGIN_SUCCESS]: state => ({
      ...state,
      isLogin: true,
      isChecking: false,
    }),
    [LOGIN_FAILED]: (state, action) => ({
      ...state,
      error: action.payload,
      isChecking: false,
    }),
  },
  initialState,
);



// Sagas

function* loginEmail({ payload: body }) {
  try {
    yield call(postApiRequest, apiEndpoint.login(), body);
  } catch (err) {
    console.log("loginEmail", err);
  }
}


export const authSagas = [
  takeEvery(LOGIN_EMAIL, loginEmail),
];
