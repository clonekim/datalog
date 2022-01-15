import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import userReducer from './user';
import tagReducer from './tag';
import memoReducer from './memo';
import optionReducer from './option';

const rootReducer = combineReducers({
  user: userReducer,
  tags: tagReducer,
  memos: memoReducer,
  option: optionReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

export default persistReducer(persistConfig, rootReducer);
