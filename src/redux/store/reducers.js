import { combineReducers } from 'redux';
import { authReducer } from 'redux/modules/auth';
import { coursesReducer } from 'redux/modules/courses';
import { vlogsReducer } from 'redux/modules/vlog';

const createReducers = () =>
  combineReducers({
    auth: authReducer,
    vlogs: vlogsReducer,
    courses: coursesReducer,
  });

export default createReducers;
