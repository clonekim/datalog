import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
const logger = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunkMiddleware),
);

export default store;
