/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import discogsApiService from '../services/discogs.service';

export const get = createAsyncThunk(
  'discogsCollection/get',
  async (thunkAPI) => {
    try {
      const response = await discogsApiService.getCollection();
      return response.data;
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage({message, type: 'danger'}));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const addRelease = createAsyncThunk(
  'discogsCollection/addRelease',
  async (releaseId, thunkAPI) => {
    try {
      const response = await discogsApiService.addToCollection(releaseId);
      thunkAPI.dispatch(get());
      thunkAPI.dispatch(setMessage({ message: 'Release Added', type: 'success' }))
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
      state.status = 'pending';
    },
    [addRelease.fulfilled]: (state) => {
      state.status = 'fulfilled';
    },
    [addRelease.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});

export const discogsCollectionState = (state) => state.discogsCollection;
const { reducer } = discogsCollectionSlice;
export default reducer;
