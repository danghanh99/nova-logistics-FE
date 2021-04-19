import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const user = localStorage.getItem('user');
const initialState = user ? true : false;

const todo = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      return (state = payload);
    },
  },
});

const { reducer, actions } = todo;
export const { isLoggedIn } = actions;

export default reducer;
