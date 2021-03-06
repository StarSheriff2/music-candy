import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import messageReducer from './slices/message';
import discogsSearchReducer from './slices/discogsSearch';
import discogsCollectionReducer from './slices/discogsCollection';

const rootReducer = combineReducers({
  discogsSearch: discogsSearchReducer,
  discogsCollection: discogsCollectionReducer,
  message: messageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
