import { createActions, handleActions } from 'redux-actions';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { updatePost } from 'redux/helpers/firebase';
import { uploadImage } from 'redux/helpers/firebase';
import { uploadMultipleImage } from 'redux/helpers/firebase';
import { getAllPosts, addNewPost } from 'redux/helpers/firebase';

// Actions
const GET_NEWS_FEED = 'GET_NEWS_FEED';
const GET_NEWS_FEED_SUCCESS = 'GET_NEWS_FEED_SUCCESS';
const GET_NEWS_FEED_FAILED = 'GET_NEWS_FEED_FAILED';
const ADD_POST = 'ADD_POST';
const UPLOAD_MULTIPLE_IMAGES = 'UPLOAD_MULTIPLE_IMAGES';
const UPLOAD_SINGLE_FILE = 'UPLOAD_SINGLE_FILE';
const UPDATE_NEW_POST = 'UPDATE_NEW_POST';

export const newsFeedActions = createActions(
  GET_NEWS_FEED,
  GET_NEWS_FEED_FAILED,
  GET_NEWS_FEED_SUCCESS,
  ADD_POST,
  UPLOAD_MULTIPLE_IMAGES,
  UPLOAD_SINGLE_FILE,
  UPDATE_NEW_POST
);

// Reducer
const initialState = {
  isChecking: false,
  error: '',
};
export const newsFeedReducer = handleActions(
  {
    [GET_NEWS_FEED]: (state) => ({
      ...state,
      isChecking: true,
    }),
    [UPDATE_NEW_POST]: (state) => ({
      ...state,
      isChecking: true,
    }),
    [UPLOAD_SINGLE_FILE]: (state) => ({
      ...state,
      isChecking: true,
    }),
    [UPLOAD_MULTIPLE_IMAGES]: (state) => ({
      ...state,
      isChecking: true,
    }),
    [GET_NEWS_FEED_SUCCESS]: (state) => ({
      ...state,
      isChecking: false,
    }),
    [GET_NEWS_FEED_FAILED]: (state, action) => ({
      ...state,
      error: action.payload,
      isChecking: false,
    }),
  },
  initialState
);

// Sagas
function* getNewsFeed(params) {
  const callback = params.payload;
  try {
    const response = yield call(getAllPosts);
    if (callback) {
      callback(response);
    }
    yield put(newsFeedActions.getNewsFeedSuccess());
  } catch (err) {
    yield put(newsFeedActions.getNewsFeedFailed(err));
  }
}

function* addPost(params) {
  const { callback } = params.payload;
  try {
    yield call(addNewPost, params.payload);
    yield delay(300);
    if (callback) {
      callback();
    }
    yield put(newsFeedActions.getNewsFeedSuccess());
  } catch (err) {
    yield put(newsFeedActions.getNewsFeedFailed(err));
  }
}

function* updateNewPost(body) {
  const { callback } = body.payload;
  try {
    yield call(updatePost, body.payload);
    yield delay(300);
    if (callback) {
      callback();
    }
    yield put(newsFeedActions.getNewsFeedSuccess());
  } catch (err) {
    yield put(newsFeedActions.getNewsFeedFailed(err));
  }
}

function* uploadMultipleImages(params) {
  const { callback } = params.payload;
  try {
    const urls = yield call(uploadMultipleImage, params.payload);
    if (callback) callback(urls);
    yield put(newsFeedActions.getNewsFeedSuccess());
  } catch (err) {
    yield put(newsFeedActions.getNewsFeedFailed(err));
  }
}

function* uploadSingleFile(params) {
  const { callback, path, file } = params.payload;
  try {
    const url = yield call(uploadImage, path, file, () => {});
    if (callback) callback(url);
    yield put(newsFeedActions.getNewsFeedSuccess());
  } catch (err) {
    yield put(newsFeedActions.getNewsFeedFailed(err));
  }
}

export const newsFeedSagas = [
  takeEvery(GET_NEWS_FEED, getNewsFeed),
  takeEvery(ADD_POST, addPost),
  takeEvery(UPLOAD_MULTIPLE_IMAGES, uploadMultipleImages),
  takeEvery(UPLOAD_SINGLE_FILE, uploadSingleFile),
  takeEvery(UPDATE_NEW_POST, updateNewPost),
];
