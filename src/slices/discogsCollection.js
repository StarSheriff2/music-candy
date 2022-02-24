/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import discogsApiService from '../services/discogs.service';

export const get = createAsyncThunk(
  'discogsCollection/get',
  async (sort, thunkAPI) => {
    try {
      const response = await discogsApiService.getCollection(sort);
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

export const addRelease = createAsyncThunk(
  'discogsCollection/addRelease',
  async ({releaseId, sort}, thunkAPI) => {
    try {
      const response = await discogsApiService.addToCollection(releaseId);
      thunkAPI.dispatch(setMessage({ message: 'Release Added', type: 'success' }));
      thunkAPI.dispatch(get(sort));
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

const initialState = {
  status: 'idle',
  collection: [],
  pagination: {},
  addReleaseStatus: 'idle',
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
    [addRelease.pending]: (state) => {
      state.addReleaseStatus = 'pending';
    },
    [addRelease.fulfilled]: (state) => {
      state.addReleaseStatus = 'fulfilled';
    },
    [addRelease.rejected]: (state) => {
      state.addReleaseStatus = 'rejected';
    },
  },
});

export const discogsCollectionState = (state) => state.discogsCollection;
const { reducer } = discogsCollectionSlice;
export default reducer;
