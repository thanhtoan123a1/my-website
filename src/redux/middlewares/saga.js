  
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authSagas } from 'redux/modules/auth';
import { coursesSagas } from 'redux/modules/courses';
import { vlogsSagas } from 'redux/modules/vlog';

export function* rootSaga() {
  yield all([
    ...authSagas,
    ...vlogsSagas,
    ...coursesSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;
