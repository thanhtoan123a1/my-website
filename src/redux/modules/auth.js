import { createActions, handleActions } from 'redux-actions';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { getUser, updateUserDetail } from 'redux/helpers/firebase';

// Actions
const UPDATE_USER = 'UPDATE_USER';
const GET_USER_DETAIL = 'GET_USER_DETAIL';
const GET_USER_DETAIL_SUCCESS = 'GET_USER_DETAIL_SUCCESS';
const GET_USER_DETAIL_FAILED = 'GET_USER_DETAIL_FAILED';


export const authActions = createActions(
  UPDATE_USER,
  GET_USER_DETAIL,
  GET_USER_DETAIL_FAILED,
  GET_USER_DETAIL_SUCCESS,
);

// Reducer
const initialState = {
  user: {},
  isChecking: false,
  error: '',
};
export const authReducer = handleActions(
  {
    [GET_USER_DETAIL]: state => ({
      ...state,
      isChecking: true,
    }),
    [GET_USER_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      user: action.payload,
    }),
    [GET_USER_DETAIL_FAILED]: (state, action) => ({
      ...state,
      error: action.payload,
      isChecking: false,
    }),
  },
  initialState,
);



// Sagas

function* getUserDetail(params) {
  try {
    const userId = params.payload;
    const response = yield call(getUser, userId);
    yield put(authActions.getUserDetailSuccess(response));
  } catch (err) {
    yield put(authActions.getUserDetailFailed(err));
  }

}
function* updateUser(params) {
  try {
    const { payload } = params;
    yield call(updateUserDetail, payload);
    yield delay(100);
    yield put(authActions.getUserDetail(payload.userId));
  } catch (err) {
    yield put(authActions.getUserDetailFailed(err));
  }
}


export const authSagas = [
  takeEvery(UPDATE_USER, updateUser),
  takeEvery(GET_USER_DETAIL, getUserDetail),
];
