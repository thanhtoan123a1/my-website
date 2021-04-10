import { applyMiddleware, createStore, compose } from 'redux';
import sagaMiddleware, { rootSaga } from 'redux/middlewares/saga';
import createReducers from './reducers';

let store = null;

const configureStore = () => {

  const middleware = [
    sagaMiddleware,
  ];


  let composeEnhancers = compose;
  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middleware.push(logger);
    composeEnhancers = (global.window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  }

  const reducers = createReducers();
  store = createStore(reducers, {}, composeEnhancers(applyMiddleware(...middleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
