import { combineReducers } from 'redux';
import { authReducer } from 'redux/modules/auth';

const createReducers = () =>
  combineReducers({
    auth: authReducer,
  });

export default createReducers;
