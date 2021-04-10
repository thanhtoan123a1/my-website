import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  apiEndpoint,
  getApiRequest,
} from '../helpers/api';

// Actions
const GET_VLOGS = 'GET_VLOGS';
const GET_VLOGS_SUCCESS = 'GET_VLOGS_SUCCESS';
const GET_VLOGS_FAILED = 'GET_VLOGS_FAILED';

export const vlogsActions = createActions(
  GET_VLOGS,
  GET_VLOGS_SUCCESS,
  GET_VLOGS_FAILED
);

// Reducer
const initialState = {
  vlogs: [],
  isChecking: false,
  error: '',
};
export const vlogsReducer = handleActions(
  {
    [GET_VLOGS]: state => ({
      ...state,
      isChecking: true,
    }),
    [GET_VLOGS_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      vlogs: action.payload.data,
    }),
    [GET_VLOGS_FAILED]: (state, action) => ({
      ...state,
      isChecking: false,
      error: action.payload,
    }),
  },
  initialState,
);



// Sagas

function* getVlogs() {
  try {
    const response = yield call(getApiRequest, apiEndpoint.getVlogs());
    yield put(vlogsActions.getVlogsSuccess(response));
  } catch (err) {
    yield put(vlogsActions.getVlogsFailed(err));
  }
}


export const vlogsSagas = [
  takeEvery(GET_VLOGS, getVlogs),
];
