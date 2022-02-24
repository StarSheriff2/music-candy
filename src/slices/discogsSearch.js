/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import discogsApiService from '../services/discogs.service';

export const search = createAsyncThunk(
  'discogsSearch/search',
  async (query, thunkAPI) => {
    try {
      const response = await discogsApiService.search(query);
      return response.data;
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage({ message, type: 'danger' }));
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
  results: [],
  pagination: {},
};

const discogsSearchSlice = createSlice({
  name: 'discogsSearch',
  initialState,
  extraReducers: {
    [search.pending]: (state) => {
      state.status = 'pending';
    },
    [search.fulfilled]: (state, action) => {
      const { results, pagination } = action.payload;

      state.status = 'fulfilled';
      state.results = results.filter((el) => el.type !== 'label');
      state.pagination = pagination;
    },
    [search.rejected]: (state) => {
      state.status = 'rejected';
      state.results = [];
      state.pagination = {};
    },
  },
});

export const discogsSearchState = (state) => state.discogsSearch;
const { reducer } = discogsSearchSlice;
export default reducer;
