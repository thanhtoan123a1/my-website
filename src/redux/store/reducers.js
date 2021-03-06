import { combineReducers } from 'redux';
import { authReducer } from 'redux/modules/auth';
import { coursesReducer } from 'redux/modules/courses';
import { entertainmentReducer } from 'redux/modules/entertainment';
import { messagesReducer } from 'redux/modules/messages';
import { newsFeedReducer } from 'redux/modules/newsFeed';
import { usersReducer } from 'redux/modules/users';

const createReducers = () =>
  combineReducers({
    auth: authReducer,
    entertainment: entertainmentReducer,
    courses: coursesReducer,
    users: usersReducer,
    messages: messagesReducer,
    newsFeed: newsFeedReducer,
  });

export default createReducers;
