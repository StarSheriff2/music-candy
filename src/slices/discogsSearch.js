/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import discogsApiService from '../services/discogs.service';

export const search = createAsyncThunk(
  'discogsSearch/search',
  async (query, thunkAPI) => {
    try {
      const response = await discogsApiService.search(query);
      return response.data.results;
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
    [search.pending]: (state) => {
      state.status = 'pending';
    },
    [search.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.results = action.payload.filter((el) => el.type !== 'label');
    },
    [search.rejected]: (state) => {
      state.status = 'rejected';
      state.results = [];
    },
  },
});

export const discogsSearchState = (state) => state.discogsSearch;
const { reducer } = discogsSearchSlice;
export default reducer;
