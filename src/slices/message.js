import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => ({ message: action.payload.message, type: action.payload.type }),
    clearMessage: () => (initialState),
  },
});

const { reducer, actions } = messageSlice;

export const messageState = (state) => state.message;
export const { setMessage, clearMessage } = actions;

export default reducer;
