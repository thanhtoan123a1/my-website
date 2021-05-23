import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authSagas } from 'redux/modules/auth';
import { coursesSagas } from 'redux/modules/courses';
import { entertainmentSagas } from 'redux/modules/entertainment';
import { messagesSagas } from 'redux/modules/messages';
import { newsFeedSagas } from 'redux/modules/newsFeed';
import { usersSagas } from 'redux/modules/users';

export function* rootSaga() {
  yield all([
    ...authSagas,
    ...entertainmentSagas,
    ...coursesSagas,
    ...usersSagas,
    ...messagesSagas,
    ...newsFeedSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;
