import { combineReducers } from 'redux';
import { authReducer } from 'redux/modules/auth';
import { vlogsReducer } from 'redux/modules/vlog';

const createReducers = () =>
  combineReducers({
    auth: authReducer,
    vlogs: vlogsReducer,
  });

export default createReducers;
