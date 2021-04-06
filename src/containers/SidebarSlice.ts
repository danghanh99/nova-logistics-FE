import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const todo = createSlice({
  name: 'todos',
  initialState: true,
  reducers: {
    sidebarStatus: (state, { payload }: PayloadAction<boolean>) => {
      return (state = payload);
    },
  },
});

const { reducer, actions } = todo;
export const { sidebarStatus } = actions;

export default reducer;
