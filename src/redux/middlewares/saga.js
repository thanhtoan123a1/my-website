  
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authSagas } from 'redux/modules/auth';
import { coursesSagas } from 'redux/modules/courses';
import { entertainmentSagas } from 'redux/modules/entertainment';

export function* rootSaga() {
  yield all([
    ...authSagas,
    ...entertainmentSagas,
    ...coursesSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;
