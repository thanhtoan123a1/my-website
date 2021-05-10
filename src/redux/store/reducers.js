import { combineReducers } from 'redux';
import { authReducer } from 'redux/modules/auth';
import { coursesReducer } from 'redux/modules/courses';
import { entertainmentReducer } from 'redux/modules/entertainment';

const createReducers = () =>
  combineReducers({
    auth: authReducer,
    entertainment: entertainmentReducer,
    courses: coursesReducer,
  });

export default createReducers;
