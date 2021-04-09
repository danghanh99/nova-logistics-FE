import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const todo = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    isLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      return (state = payload);
    },
  },
});

const { reducer, actions } = todo;
export const { isLoggedIn } = actions;

export default reducer;
