import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getEntries } from 'redux/helpers/contentful';

// Actions
const GET_ENTERTAINMENT = 'GET_ENTERTAINMENT';
const GET_ENTERTAINMENT_SUCCESS = 'GET_ENTERTAINMENT_SUCCESS';
const GET_ENTERTAINMENT_FAILED = 'GET_ENTERTAINMENT_FAILED';

export const entertainmentActions = createActions(
  GET_ENTERTAINMENT,
  GET_ENTERTAINMENT_SUCCESS,
  GET_ENTERTAINMENT_FAILED
);

// Reducer
const initialState = {
  entertainments: [],
  isChecking: false,
  error: '',
};
export const entertainmentReducer = handleActions(
  {
    [GET_ENTERTAINMENT]: state => ({
      ...state,
      isChecking: true,
    }),
    [GET_ENTERTAINMENT_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      entertainments: action.payload.items,
    }),
    [GET_ENTERTAINMENT_FAILED]: (state, action) => ({
      ...state,
      isChecking: false,
      error: action.payload,
    }),
  },
  initialState,
);



// Sagas

function* getEntertainment(params) {
  try {
    const response = yield call(getEntries, params.payload);
    yield put(entertainmentActions.getEntertainmentSuccess(response));
  } catch (err) {
    yield put(entertainmentActions.getEntertainmentFailed(err));
  }
}

export const entertainmentSagas = [
  takeEvery(GET_ENTERTAINMENT, getEntertainment),
];
