/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import discogsApiService from '../services/discogs.service';

export const get = createAsyncThunk(
  'discogsCollection/get',
  async (query, thunkAPI) => {
    try {
      const response = await discogsApiService.getCollection();
      return response.data;
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

// export const newReminder = createAsyncThunk(
//   'reminders/newReminder',
//   async (params, thunkAPI) => {
//     try {
//       const response = await weatherAppCalendarApi.createReminder(params);
//       thunkAPI.dispatch(fetchReminders());
//       return response.data;
//     } catch (error) {
//       const message = (error.response
//           && error.response.data
//           && error.response.data.message)
//         || error.message
//         || error.toString();
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   },
// );

const initialState = {
  status: 'idle',
  collection: [],
  pagination: {},
};

const discogsCollectionSlice = createSlice({
  name: 'discogsCollection',
  initialState,
  extraReducers: {
    [get.pending]: (state) => {
      state.status = 'pending';
    },
    [get.fulfilled]: (state, action) => {
      const { releases, pagination } = action.payload;

      state.status = 'fulfilled';
      state.collection = releases;
      state.pagination = pagination;
    },
    [get.rejected]: (state) => {
      state.status = 'rejected';
      state.collection = [];
      state.pagination = {};
    },
  },
});

export const discogsCollectionState = (state) => state.discogsCollection;
const { reducer } = discogsCollectionSlice;
export default reducer;
