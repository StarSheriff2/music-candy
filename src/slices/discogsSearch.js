/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import discogsApiService from '../services/discogs.service';

export const getSearchResults = createAsyncThunk(
  'discogsSearch/getSearchResults',
  async (query, thunkAPI) => {
    try {
      const response = await discogsApiService.search(query);
      return response.data[1];
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
  results: [],
};

const discogsSearchSlice = createSlice({
  name: 'discogsSearch',
  initialState,
  extraReducers: {
    [getSearchResults.pending]: (state) => {
      state.status = 'pending';
    },
    [getSearchResults.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.entities = action.payload;
    },
    [getSearchResults.rejected]: (state) => {
      state.status = 'rejected';
      state.entities = [];
    },
  },
});

export const discogsSearchState = (state) => state.results;
const { reducer } = discogsSearchSlice;
export default reducer;
