import { createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getEntries, getEntry } from 'redux/helpers/contentful';

// Actions
const GET_COURSES = 'GET_COURSES';
const GET_COURSES_DETAILS = 'GET_COURSES_DETAILS';
const GET_COURSES_DETAILS_SUCCESS = 'GET_COURSES_DETAILS_SUCCESS';
const GET_COURSES_DETAILS_FAILED = 'GET_COURSES_DETAILS_FAILED';
const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
const GET_COURSES_FAILED = 'GET_COURSES_FAILED';

// default 
const defaultParams = {
  'content_type': 'article',
}

export const coursesActions = createActions(
  GET_COURSES,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILED,
  GET_COURSES_DETAILS,
  GET_COURSES_DETAILS_SUCCESS,
  GET_COURSES_DETAILS_FAILED
);

// Reducer
const initialState = {
  courses: [],
  coursesDetails: {},
  isChecking: false,
  error: '',
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
    }),
    [GET_COURSES_DETAILS_FAILED]: (state, action) => ({
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
    const response = yield call(getEntries, {...defaultParams, ...params.payload});
    yield put(coursesActions.getCoursesSuccess(response));
  } catch (err) {
    yield put(coursesActions.getCoursesFailed(err));
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


export const coursesSagas = [
  takeEvery(GET_COURSES, getCourses),
  takeEvery(GET_COURSES_DETAILS, getCoursesDetails),
];
