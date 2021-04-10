  
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { authSagas } from 'redux/modules/auth';

export function* rootSaga() {
  yield all([
    ...authSagas,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;
