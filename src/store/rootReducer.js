import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import userReducer from './userReducer';
import tagReducer from './tagReducer';
import postReducer from './postReducer';
import optionReducer from './optionReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  user: userReducer,
  tags: tagReducer,
  posts: postReducer,
  option: optionReducer,
  error: errorReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['option'],
};

export default persistReducer(persistConfig, rootReducer);
