import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import messageReducer from './slices/message';
import discogsSearchReducer from './slices/discogsSearch';

const rootReducer = combineReducers({
  discogsSearch: discogsSearchReducer,
  message: messageReducer,
  reminders: remindersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
