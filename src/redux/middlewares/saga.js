  
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authSagas } from 'redux/modules/auth';
import { vlogsSagas } from 'redux/modules/vlog';

export function* rootSaga() {
  yield all([
    ...authSagas,
    ...vlogsSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;
