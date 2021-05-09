import { createActions, handleActions } from 'redux-actions';
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { getEntries, getEntry } from 'redux/helpers/contentful';
import { loveClicks, deleteAComment } from 'redux/helpers/firebase';
import { uploadImage, getCoursesComments, addCoursesComment } from 'redux/helpers/firebase';

// Actions
const GET_COURSES = 'GET_COURSES';
const GET_COURSES_DETAILS = 'GET_COURSES_DETAILS';
const GET_COURSES_DETAILS_SUCCESS = 'GET_COURSES_DETAILS_SUCCESS';
const GET_COURSES_DETAILS_FAILED = 'GET_COURSES_DETAILS_FAILED';
const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
const GET_COURSES_FAILED = 'GET_COURSES_FAILED';
const GET_LANDING_PAGE_ASSET = 'GET_LANDING_PAGE_ASSET';
const GET_LANDING_PAGE_ASSET_SUCCESS = 'GET_LANDING_PAGE_ASSET_SUCCESS';
const GET_LANDING_PAGE_ASSET_FAILED = 'GET_LANDING_PAGE_ASSET_FAILED';
const UPLOAD_FILE = 'UPLOAD_FILE';
const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
const UPLOAD_FILE_FAILED = 'UPLOAD_FILE_FAILED';
const GET_COMMENTS = 'GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const GET_COMMENTS_FAILED = 'GET_COMMENTS_FAILED';
const ADD_COMMENT = 'ADD_COMMENT';
const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED';
const LOVE_COMMENT = 'LOVE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const coursesActions = createActions(
  GET_COURSES,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILED,
  GET_COURSES_DETAILS,
  GET_COURSES_DETAILS_SUCCESS,
  GET_COURSES_DETAILS_FAILED,
  GET_LANDING_PAGE_ASSET,
  GET_LANDING_PAGE_ASSET_SUCCESS,
  GET_LANDING_PAGE_ASSET_FAILED,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILED,
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILED,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILED,
  LOVE_COMMENT,
  DELETE_COMMENT,
);

// Reducer
const initialState = {
  courses: [],
  coursesDetails: {},
  isChecking: false,
  error: '',
  landingPageAccess: [],
  comments: [],
};
export const coursesReducer = handleActions(
  {
    [GET_COURSES]: state => ({
      ...state,
      isChecking: true,
    }),
    [GET_COURSES_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      courses: action.payload.items,
      error: '',
    }),
    [GET_COURSES_FAILED]: (state, action) => ({
      ...state,
      isChecking: false,
      error: action.payload,
    }),
    [GET_COURSES_DETAILS]: state => ({
      ...state,
      isChecking: true,
    }),
    [GET_COURSES_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      coursesDetails: action.payload,
      error: '',
    }),
    [ADD_COMMENT]: state => ({
      ...state,
      isChecking: true,
    }),
    [ADD_COMMENT_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      error: '',
    }),
    [ADD_COMMENT_FAILED]: (state, action) => ({
      ...state,
      isChecking: false,
      error: action.payload,
    }),
    [GET_COMMENTS]: state => ({
      ...state,
      isChecking: true,
    }),
    [GET_COMMENTS_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      comments: action.payload,
      error: '',
    }),
    [GET_COMMENTS_FAILED]: (state, action) => ({
      ...state,
      isChecking: false,
      error: action.payload,
    }),
    [GET_COURSES_DETAILS_FAILED]: (state, action) => ({
      ...state,
      isChecking: false,
      error: action.payload,
    }),
    [GET_LANDING_PAGE_ASSET]: state => ({
      ...state,
      isChecking: true,
    }),
    [GET_LANDING_PAGE_ASSET_SUCCESS]: (state, action) => ({
      ...state,
      isChecking: false,
      landingPageAccess: action.payload.items,
      error: '',
    }),
    [GET_LANDING_PAGE_ASSET_FAILED]: (state, action) => ({
      ...state,
      isChecking: false,
      error: action.payload,
    }),
    [UPLOAD_FILE]: state => ({
      ...state,
      isChecking: true,
    }),
    [UPLOAD_FILE_SUCCESS]: (state) => ({
      ...state,
      isChecking: false,
      error: '',
    }),
    [UPLOAD_FILE_FAILED]: (state, action) => ({
      ...state,
      isChecking: false,
      error: action.payload,
    }),
  },
  initialState,
);



// Sagas

function* getCourses(params) {
  try {
    const response = yield call(getEntries, params.payload);
    yield put(coursesActions.getCoursesSuccess(response));
  } catch (err) {
    yield put(coursesActions.getCoursesFailed(err));
  }
}

function* getLandingPageAsset(params) {
  try {
    const response = yield call(getEntries, params.payload);
    yield put(coursesActions.getLandingPageAssetSuccess(response));
  } catch (err) {
    yield put(coursesActions.getLandingPageAssetFailed(err));
  }
}

function* getCoursesDetails(params) {
  try {
    const response = yield call(getEntry, params.payload);
    yield put(coursesActions.getCoursesDetailsSuccess(response));
  } catch (err) {
    yield put(coursesActions.getCoursesDetailsFailed(err));
  }
}

function* uploadFile(params) {
  const image = params.payload.image;
  const courseId = params.payload.courseId;
  const callback = params.payload.callback;
  const setProgress = params.payload.setProgress;
  try {
    const imgUrl = yield call(() => uploadImage(`courses/${courseId}/${image.name}`, image, setProgress));
    if (callback) callback(imgUrl);
    yield put(coursesActions.uploadFileSuccess());
  } catch (err) {
    yield put(coursesActions.uploadFileFailed(err));
  }
}

function* getComments(params) {
  const courseId = params.payload;
  try {
    const comments = yield call(getCoursesComments, courseId);
    yield put(coursesActions.getCommentsSuccess(comments));
  } catch (err) {
    yield put(coursesActions.getCommentsFailed(err));
  }
}

function* addComment(params) {
  try {
    yield call(addCoursesComment, params.payload);
    //delay to update database
    yield delay(100);
    yield put(coursesActions.getComments(params.payload.courseId));
  } catch (err) {
    yield put(coursesActions.getCommentsFailed(err));
  }
}

function* loveComment(params) {
  try {
    yield call(loveClicks, params.payload);
    //delay to update database
    yield delay(100);
    yield put(coursesActions.getComments(params.payload.courseId));
  } catch (err) {
    yield put(coursesActions.getCommentsFailed(err));
  }
}

function* deleteComment(params) {
  try {
    yield call(deleteAComment, params.payload);
    //delay to update database
    yield delay(100);
    yield put(coursesActions.getComments(params.payload.courseId));
  } catch (err) {
    yield put(coursesActions.getCommentsFailed(err));
  }
}


export const coursesSagas = [
  takeEvery(GET_COURSES, getCourses),
  takeEvery(GET_LANDING_PAGE_ASSET, getLandingPageAsset),
  takeEvery(GET_COURSES_DETAILS, getCoursesDetails),
  takeEvery(UPLOAD_FILE, uploadFile),
  takeEvery(GET_COMMENTS, getComments),
  takeEvery(ADD_COMMENT, addComment),
  takeEvery(LOVE_COMMENT, loveComment),
  takeEvery(DELETE_COMMENT, deleteComment),
];
