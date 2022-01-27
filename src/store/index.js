import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

const loggerMiddleware = storeAPI => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', storeAPI.getState());
  return result;
};

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, thunkMiddleware),
);

export default store;
